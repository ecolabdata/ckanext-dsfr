var pkgsearch = {
    filters: {
        themes: {},
        initThemes: function() {
            //document.querySelector('#filter-subcategory').closest('section.module').remove();
            fetch('/api/themes').then(function(data) {return data.json()})
            .then(function(data) {
                pkgsearch.filters.themes = data;
                pkgsearch.filters.initThemesAsync();
            });
        },
        initThemesAsync() {
            var list = "";
            for(var key in pkgsearch.filters.themes) {
                var theme = pkgsearch.filters.themes[key];
                var thref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&subcategory=" + theme.label;
                list += '<option class="grouptitle" value="' + theme.label + '" data-href="' + thref + '">' + theme.label + '</option>';
                if(theme.child.length > 0) {
                    for(var i = 0; i < theme.child.length; i++) {
                        var shref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&subcategory=" + theme.child[i].label;
                        list += '<option class="sub" value="' + theme.child[i].label + '" data-href="' + shref + '">' + theme.child[i].label + '</option>';
                    }
                }
            }
            document.querySelector("#filter-category").innerHTML = list;
            new Select(document.querySelector("#filter-category"));
        },
        initTerritoires: function() {
            fetch('/api/territoires').then(function(data) {return data.json()})
            .then(function(data) {
                pkgsearch.filters.territoires = data.territoires;
                pkgsearch.filters.initTerritoiresAsync();
            });
        },
        initTerritoiresAsync() {
            var list = '';
            for(var i = 0; i < pkgsearch.filters.territoires.length; i++) {
                var territoire = pkgsearch.filters.territoires[i];
                var thref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&territory=" + territoire.label;
                list += '<option value="' + territoire.label + '" data-href="' + thref + '">' + territoire.label + '</option>';
            }
            document.querySelector("#filter-territory").innerHTML = list;
            new Select(document.querySelector("#filter-territory"));
        },
        initOrganisations: function() {
            fetch('/api/organizations').then(function(data) {return data.json()})
            .then(function(data) {
                pkgsearch.filters.organisations = data;
                pkgsearch.filters.initOrganisationsAsync();
            });
        },
        initOrganisationsAsync() {
            var list = "";
            for(cat in pkgsearch.filters.organisations) {
                list += '<option class="grouptitle" value="' + cat + '" disabled>' + cat + '</option>';
                for(var i = 0; i < pkgsearch.filters.organisations[cat].orgs.length; i++) {
                    var org = pkgsearch.filters.organisations[cat].orgs[i];
                    var ohref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&organization=" + org.name;
                    list += '<option class="sub" value="' + org.name + '" data-href="' + ohref + '">' + org.title + '</option>';
                }
            }
            document.querySelector("#filter-organization").innerHTML = list;
            new Select(document.querySelector("#filter-organization"));
        }

    },
    filterlist: [
        "organization",
        "category",
        "subcategory",
        "territory",
        "res_format"
    ],
    init: function () {
        this.searchParams = new URLSearchParams(window.location.search);
        this.initSearchParams();
        this.form = document.querySelector('form.filterblock');
        this.filters["ext_startdate"] = document.querySelector('#filter-ext_startdate');
        this.filters["ext_enddate"] = document.querySelector('#filter-ext_enddate');
        this.date.init();
        this.filters.initOrganisations();
        this.filters.initThemes();
        this.filters.initTerritoires();
        if(document.querySelector("#filter-res_format"))
            new Select(document.querySelector("#filter-res_format"));
    },
    initSearchParams: function() {
        pkgsearch.searchParams.deleteOne = function(key, value) {
            var items = pkgsearch.searchParams.getAll(key);
            pkgsearch.searchParams.delete(key);
            for(var i = 0; i < items.length; i++) 
            {
                if(items[i] != value)
                pkgsearch.searchParams.append(key, items[i]);
            }
        }
    },
    date: {
        init: function() {
            document.querySelector('#filter-ext_startdate').addEventListener('change', pkgsearch.date.change);
            document.querySelector('#filter-ext_enddate').addEventListener('change', pkgsearch.date.change);
            if(pkgsearch.searchParams.has('ext_startdate')) {
                var startdate = new Date(pkgsearch.searchParams.get('ext_startdate')).toISOString().substring(0,10);
                pkgsearch.filters["ext_startdate"].value = startdate;
            }
            if(pkgsearch.searchParams.has('ext_enddate')) {
                var enddate = new Date(pkgsearch.searchParams.get('ext_enddate')).toISOString().substring(0,10);
                pkgsearch.filters["ext_enddate"].value = enddate;
            }
                
        },
        change: function (e) {
            pkgsearch.filters.ext_startdate.classList.remove('fr-input--error');
            pkgsearch.filters.ext_enddate.classList.remove('fr-input--error');
            if (
                pkgsearch.filters.ext_startdate.value != ""
                && pkgsearch.filters.ext_enddate.value != ""
                && pkgsearch.filters.ext_startdate.value > pkgsearch.filters.ext_enddate.value
            ) {
                pkgsearch.filters.ext_enddate.classList.add('fr-input--error');
                return;
            }
            else {
                pkgsearch.searchParams.delete('ext_startdate');
                pkgsearch.searchParams.delete('ext_enddate');
                //startdate
                if (pkgsearch.filters.ext_startdate.value != "") {
                    var startdate = new Date(pkgsearch.filters.ext_startdate.value);
                    pkgsearch.searchParams.append('ext_startdate', startdate.toISOString())
                }
                //enddate
                if (pkgsearch.filters.ext_enddate.value != "") {
                    var startdate = new Date(pkgsearch.filters.ext_enddate.value);
                    pkgsearch.searchParams.append('ext_enddate', startdate.toISOString())
                }
                window.location.search = pkgsearch.searchParams.toString();
            }
        }
    }
};