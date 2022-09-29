var pkgsearch = {
    filters: {
        themes: {},
        initThemes: function() {
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
                var thref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&category=" + theme.label;
                list += pkgsearch.filters.makeOption("category", theme.label, theme.label, "grouptitle" );
                if(theme.child.length > 0) {
                    for(var i = 0; i < theme.child.length; i++) {
                        //var shref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&category=" + theme.child[i].label;
                        //list += '<option class="sub" value="' + theme.child[i].label + '" data-href="' + shref + '">' + theme.child[i].label + '</option>';

                        list += pkgsearch.filters.makeOption("category", theme.child[i].label, theme.child[i].label, "sub" );
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
                list += pkgsearch.filters.makeOption("territory", territoire.label, territoire.label, "sub" );
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
                    list += pkgsearch.filters.makeOption("organization", org.title, org.name, "sub" );
                }
            }
            document.querySelector("#filter-organization").innerHTML = list;
            new Select(document.querySelector("#filter-organization"));
        },
        makeOption: function(type, label, value, itemClass, disabled) {
            var oHref = "";
            if(pkgsearch.search.hasParam(type, value)) {
                var sp2 = new URLSearchParams(pkgsearch.searchParams);
                var searchUrl = pkgsearch.search.deleteOne(sp2, type, value).toString();
                oHref = pkgsearch.baseUrl + "?" + searchUrl;
                var dataChecked = ' data-checked="true"';
            }
            else {
                oHref = pkgsearch.baseUrl + "?" + pkgsearch.searchParams.toString() + "&" + type + "=" + value;
                var dataChecked = '';
            }
            var txtDisabled = typeof disabled != "undefined" && disabled == true ? ' disabled ' : '';
            return '<option' + dataChecked + ' class="' + itemClass + '" value="' + value + '" data-href="' + oHref + '" ' + txtDisabled + '>' + label + '</option>';
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
    search: {
        hasParam: function(type, value) {
            var list = pkgsearch.searchParams.getAll(type);
            for(var i = 0; i < list.length; i++) {
                if(list[i] == value)
                    return true;
            }
            return false;
        },
        deleteOne: function(usp, key, value) { // usp : a URLSearchParams object
            console.log('deleting', key, value, usp);
            var items = usp.getAll(key);
            usp.delete(key);
            console.log("removed all", key, usp)
            for(var i = 0; i < items.length; i++) 
            {
                if(items[i] != value)
                    usp.append(key, items[i]);
                else
                    console.log('no append', items[i]);
            }
            console.log(usp, usp.toString());
            return usp;
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