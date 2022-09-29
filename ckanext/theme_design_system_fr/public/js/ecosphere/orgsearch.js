var orgsearch = {
    nPerPage: 4,
    filters: {
        initTerritoires: function() {
            fetch('/api/territoires').then(function(data) {return data.json()})
            .then(function(data) {
                orgsearch.filters.territoires = data.territoires;
                orgsearch.filters.initTerritoiresAsync();
            });
        },
        initTerritoiresAsync: function() {
            var list = '<option value=""> -- </option>';
            console.log(orgsearch.filters.territoires);
            for(var i = 0; i < orgsearch.filters.territoires.length; i++) {
                var territoire = orgsearch.filters.territoires[i];
                list += '<option value="' + territoire.uri + '">' + territoire.label + '</option>';
            }
            document.querySelector("#filter-territoire").innerHTML = list;
            new Select(document.querySelector("#filter-territoire"));
            document.querySelector("#filter-territoire").addEventListener('change', orgsearch.updatelist);
        },
        initTypes: function() {
            var list = '<option value=""> -- </option>';
            for(var key in orgsearch.typed) {
                var codeType = orgsearch.typed[key].orgs.length > 0 ? orgsearch.typed[key].orgs[0].Type : "";
                list +='<option value="' + codeType + '">' + key + '</option>';
            }
            document.querySelector("#filter-type").innerHTML = list;
            new Select(document.querySelector("#filter-type"));
            document.querySelector("#filter-type").addEventListener('change', orgsearch.updatelist);
        }

    },
    init: function () {
        orgsearch.filters.initTerritoires();
        var sort = document.querySelector('#field-order-by').value;
        var loaded = 0;
        fetch('/api/3/action/organization_list?all_fields=true&limit=10000&sort=' + sort).then(function(data) {return data.json()})
        .then(function(data) {
            orgsearch.data = data.success ? data.result : null;
            loaded++;
            if(loaded == 2)
                orgsearch.initAsync();
        });
        fetch('/api/organizations').then(function(data) {return data.json()})
        .then(function(data) {
            orgsearch.typed = data;
            loaded++;
            if(loaded == 2)
                orgsearch.initAsync();
        });
    },
    initAsync() {
        var tmp = {};
        for(var key in orgsearch.typed) {
            for(var i = 0; i < orgsearch.typed[key].orgs.length; i++)
                tmp[orgsearch.typed[key].orgs[i].name] = orgsearch.typed[key].orgs[i];
        }
        orgsearch.indexed = tmp;
        if(orgsearch.data)
            orgsearch.drawList();
        orgsearch.filters.initTypes();
        orgsearch.updatelist();
    },
    drawList: function() {
        var listHTML = "";
        for(var i = 0; i < orgsearch.data.length; i++) {
            listHTML += orgsearch.drawOrg(orgsearch.data[i]);
        }
        document.querySelector('.search-results').innerHTML=listHTML;
    },
    drawOrg(org) {
        // description : nettoyage et réduction
        var description = org.description;
        var regex = /#+ |\[[^[\]]+\]\([^(\)]+\)/ig;
        description = description.replaceAll(regex, "");
        var sub = description.substring(0, 200);
        if(description != sub)
            description = sub + "...";
        // image : placeholder si absente
        var image = org.image_display_url ? org.image_display_url : (org.image_url ? org.image_url : '/base/images/placeholder-organization.png');
        var type = orgsearch.indexed[org.name].Type;
        var territoire = orgsearch.indexed[org.name].Territoire ? orgsearch.indexed[org.name].Territoire : "";
        var template = '<li class="fr-enlarge-link" data-type="' + type + '" data-territoire="' + territoire + '"><div class="body"><h2 class="heading"><a href="{{ url }}" title="{{ organization.display_name }}">{{ organization.display_name }}</a></h2><div class="description"><p class="media-description">{{ organization.description }}</p></div></div><div class="img"><img src="{{ organization.image_display_url }}" alt="{{ organization.name }}" class="img-fluid"></div></li>';
        var li = template.replaceAll('{{ url }}', orgsearch.orgBaseUrl + 'about/'+org.name);
        li = li.replaceAll('{{ organization.display_name }}', org.display_name);
        li = li.replaceAll('{{ organization.name }}', org.name);
        li = li.replaceAll('{{ organization.description }}', description);
        li = li.replaceAll('{{ organization.image_display_url }}', image);
        return li;
    },
    updatelist: function() {
        //récupération de la valeur des filtres
        var type = document.querySelector("#filter-type").value;
        var territoire = document.querySelector("#filter-territoire").value;
        var list = document.querySelectorAll('.search-results > li');
        console.log('filtres:', type, territoire, list);
        for(var i = 0; i < list.length; i++) {
            var item = list[i];
            var filterShow = true;
            console.log('test', item);
            if(type != "" && item.getAttribute('data-type').indexOf(type) < 0) {
                filterShow = false;
            }
            if(territoire != "" && item.getAttribute('data-territoire').indexOf(territoire) < 0) {
                filterShow = false;
            }
            console.log(type, territoire, filterShow);
            if(filterShow)
                item.classList.remove('filter-hide');
            else
                item.classList.add('filter-hide');
        }
        var found = document.querySelectorAll('.search-results > li:not(.filter-hide)').length;
        var foundStr = found > 1 ? orgsearch.i18n.plural : orgsearch.i18n.singular;
        document.querySelector('.fr-h5').innerHTML = foundStr.replace('{number}', found);
    }
}