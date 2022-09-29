
var home = {
    init: function() {
        home.searchtypes.hideAll();
        // Sélection du type de recherche
        var sectionButtons = document.querySelectorAll('.home-searchby .title li button');
        for (var i = 0; i < sectionButtons.length; i++) {
            sectionButtons[i].addEventListener('click', function (e) {
                if(!e.currentTarget.classList.contains('fr-btn--secondary'))
                    home.searchtypes.hideAll()
                else
                    home.searchtypes.show(e);
            });
        }
        //document.querySelector('.home-searchby .title li button[data-section="territoire"').click();

        home.searchtypes.init();
        home.territoire.init();
        home.thematique.init();
        home.organisation.init();
        home.maps.init();
    },
    // Manipulations communes aux trois types de sélection (territoire, thématique, organisation)
    searchtypes: {
        init: function() {
            var types = ["territoire"]; // organizations et thematiques sont asynchrones -> appelés plus tard
            for(var i = 0; i < types.length; i++) {
                home.searchtypes.initTileNavigation(types[i]);
            }
        },
        initTileNavigation: function(type) {
            // Navigation par niveau
            var lvl1Btns = document.querySelectorAll('#' + type + ' .level1.tiles .fr-tile a');
            for (var i = 0; i < lvl1Btns.length; i++) {
                lvl1Btns[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var selId = e.currentTarget.getAttribute("data-id");
                    var selName = e.currentTarget.getAttribute("data-name");
                    var selColor = e.currentTarget.getAttribute("data-color");
                    if(document.querySelectorAll('#' + type + ' .level2[data-id="'+selId+'"]').length > 0) {
                        // ouverture des sous-thématiques
                        home.searchtypes.sub.hideAll(type);
                        home[type].sub.navigate(e.currentTarget);
                        if(type == "thematique")
                            home.thematique.selectedColor = selColor;
                    }
                    else {
                        // si pas de sous-élément, sélection de l'élément
                        var elt = type == "thematique" ? {id: selId, name: selName, color: selColor, level: 1} : {id: selId, name: selName};
                        home.selection.add(elt, type);
                        e.currentTarget.closest('.fr-tile').classList.add('selected');
                    }
                });
            }
            var lvl2Btns = document.querySelectorAll('#' + type + ' .level2.tiles .fr-tile a');
            for (var i = 0; i < lvl2Btns.length; i++) {
                lvl2Btns[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var selId = e.currentTarget.getAttribute("data-id");
                    var selName = e.currentTarget.getAttribute("data-name");
                    var selColor = e.currentTarget.getAttribute("data-color");
                    var parentId = e.currentTarget.closest('.level2.tiles').getAttribute('data-id');
                    var elt = type == "thematique" ? {id: selId, name: selName, color: selColor, level: 2, parent: parentId} : {id: selId, name: selName, parent: parentId};
                    home.selection.add(elt, type);
                    e.currentTarget.closest('.fr-tile').classList.add('selected');
                });
            }
        },
        hideAll: function() {
            var types = document.querySelectorAll('.types .type')
            for (var i = 0; i < types.length; i++) {
                types[i].style.display = "none";
            }
    
            var sectionButtons = document.querySelectorAll('.home-searchby .fr-container.title li button');
            for (var i = 0; i < sectionButtons.length; i++) {
                sectionButtons[i].classList.add("fr-btn--secondary");
                sectionButtons[i].querySelector('span[class]').classList.remove('arrow-up');
                sectionButtons[i].querySelector('span[class]').classList.add('arrow-down');
            }
        },
        show(e) {
            home.searchtypes.hideAll();
            document.querySelector('.type#' + e.currentTarget.getAttribute('data-section')).style.display = "block";
            e.currentTarget.classList.remove("fr-btn--secondary");
            e.currentTarget.querySelector('span[class]').classList.add('arrow-up');
            e.currentTarget.querySelector('span[class]').classList.remove('arrow-down');
            var scTop = e.currentTarget.offsetTop - 10
            setTimeout(function() {
                window.scrollTo({
                    top: scTop,
                    left: 0,
                    behavior: 'smooth'
                  });
            }, 100);
        },
        sub: {
            hideAll: function(type) {
                var st = document.querySelectorAll('#' + type + ' .level2');
                for (var i = 0; i < st.length; i++) {
                    st[i].classList.add('hidden');
                }
            },
            navigate: function(type, element) { // element = <a class="fr-tile__link" href data-id="id">title</a>
                var eltId = element.getAttribute('data-id');
                var eltTitle = element.getAttribute('data-name');
                home[type].currentLevel = 2;
                // Modifier le header
                document.querySelector('#' + type + ' .type-header .title .name').innerHTML = eltTitle;
                document.querySelector('#' + type + ' .type-header').classList.remove('hidden');
                
                //afficher la liste correspondante
                document.querySelector('#' + type + ' .level1').classList.add('hidden');
                document.querySelector('#' + type + ' .level2-container').classList.remove('hidden');
                var sousThematiques = document.querySelectorAll('#' + type + ' .level2');
                for(var i = 0; i < sousThematiques.length; i++)
                    sousThematiques[i].classList.add('hidden')
                document.querySelector('#' + type + ' .level2[data-id="'+eltId+'"]').classList.remove('hidden');

                home.selection.updateBlock(type);
            }
        }
    },
    territoire: {
        currentLevel: 1,
        init: function() {
            var maps = document.querySelectorAll('#territoire svg');
            home.selection.initType('territoire');
            var maps = document.querySelectorAll('#territoire object');
            for(var i = 0; i<maps.length; i++) {
                maps[i].addEventListener('load', function(le){
                    le.target.contentDocument.querySelector('svg').addEventListener('click', function(e) {
                        var type = e.target.closest('svg').hasAttribute('data-type') ? e.target.closest('svg').getAttribute('data-type') : "outre-mer";
                        var area = e.target.closest('g[id]');
                        if(area) {
                            if(area.classList.contains('selected')) {
                                home.territoire.removeSelection(area.getAttribute("id"));
                            }
                            else {
                                area.classList.add('selected');
                                home.selection.add({id: area.getAttribute('id'), name: territoires[type][area.getAttribute('id')].name}, "territoire");
                            }
                        }
                    })
                });
            }

        },
        removeSelection: function(id) {
            home.selection.remove(id, "territoire");
            
            var maps = document.querySelectorAll('#territoire object');
            for(var i = 0; i<maps.length; i++) {
                var selected = maps[i].contentDocument.querySelectorAll('g[id="'+id+'"]');
                for(var j = 0; j < selected.length; j++) {
                    selected[j].classList.remove('selected');
                }
            }
            home.selection.updateBlock("territoire", true);
            home.thematique.buildLink();
        },
        buildLink: function() {
            var query = "";
            for(var i = 0; i < home.selection.content["territoire"].length; i++) {
                var item = home.selection.content["territoire"][i];
                query += "&territory=" + item.name;

            }
            var linkElt = document.querySelector('#territoire .search');
            linkElt.setAttribute('href', linkElt.getAttribute('data-href') + query);
        }
    },
    thematique: {
        currentLevel: 1,
        selectedColor: "",
        init: function() {
            // load

            fetch('/api/themes').then(function(data) {return data.json()})
            .then(function(data) {
                home.thematique.data = data;
                home.thematique.initAsync();
            });
        },
        initAsync: function() {
            var tiles = "";
            var lv2content = "";
            for(var tId in home.thematique.data) {
                var theme = home.thematique.data[tId];
                var countertheme = theme.count >= 0 ? '<span class="ri-database-2-line"></span><span>0000</span>' : '<span></span>';
                var color = typeof themecolors[theme.label] != "undefined" ? themecolors[theme.label].color : "#FC0";
                var tile = '<div class="fr-tile fr-enlarge-link" style="--color-hover: ' + color + '; --tile-color: ' + color + ';"><div class="fr-tile__body"><h4 class="fr-tile__title"><a class="fr-tile__link" href data-id="'+theme.label+'" data-name="'+theme.label+'" data-color="'+color+'">'+theme.label+'</a></h4><div class="desc"></div><p class="fr-tile__desc">' + countertheme + '<span class="selected-num hidden">0</span></p></div></div>';
                tiles += tile;
                if(theme.child.length > 0) {
                    lv2content += '<div class="level2 tiles hidden" data-id="'+theme.label+'">';
                    for(var stId in theme.child) {
                        var child = theme.child[stId];
                        var countersubtheme = child.count >= 0 ? '<span class="ri-database-2-line"></span><span>0000</span>' : '<span></span>';
                        lv2content += '<div class="fr-tile fr-enlarge-link" style="--color-hover: ' + color + '"><div class="fr-tile__body"><h4 class="fr-tile__title"><a class="fr-tile__link" href data-id="'+child.label+'"  data-name="'+child.label+'" data-color="' + color + '">'+child.label+'</a></h4><p class="fr-tile__desc">' + countersubtheme + '</p></div></div>';
                    }
                    lv2content += '</div>';
                }
            }
            document.querySelector('#thematique .level1.tiles').innerHTML = tiles;
            document.querySelector('#thematique .level2-container').innerHTML = lv2content;
            /*
            var lv2content = "";
            for(var tId in types) {
                lv2content += '<div class="level2 tiles hidden" data-id="'+tId+'">';
                for(var lId in home.organisation.data.typedList[tId]) {
                    var item = home.organisation.data.typedList[tId][lId];
                    lv2content += '<div class="fr-tile fr-enlarge-link"><div class="fr-tile__body"><h4 class="fr-tile__title"><a class="fr-tile__link" href data-id="'+item.id+'" title="'+item.label+'" data-name="'+item.title+'">'+item.title+'</a></h4><p class="fr-tile__desc"><span class="ri-database-2-line"></span><span>0000</span></p></div></div>';
                }
                lv2content += '<nav role="navigation" class="fr-pagination" aria-label="Pagination" ><ul class="fr-pagination__list"></ul></nav></div>';
            }
            document.querySelector('#organisation .level2-container').innerHTML = lv2content;
            */
            document.querySelector('.thematique-super-select button').addEventListener('click', function(e) {
                var id = e.currentTarget.getAttribute('data-id');
                home.thematique.addSelection({id: id, name: e.currentTarget.getAttribute('data-name'), color: home.thematique.selectedColor, level: 1});
                document.querySelector('a[data-id="'+id+'"]').closest('.fr-tile').classList.add('selected');
                home["thematique"].back();
            });
            home.searchtypes.initTileNavigation('thematique');
            home.selection.initType('thematique');
        },
        sub: {
            hideAll: function() { 
                var st = document.querySelectorAll('.sous-thematique');
                for (var i = 0; i < st.length; i++) {
                    st[i].classList.add('hidden');
                }
            },
            navigate: function(element) { // element = <a class="fr-tile__link" href data-id="id">title</a>
                home.searchtypes.sub.navigate("thematique", element);

                document.querySelector('#thematique .thematiques-header .thematique-name .color').style["background-color"] = element.getAttribute('data-color');
                document.querySelector('.thematique-super-select button').setAttribute('data-id', element.getAttribute('data-id'));
                document.querySelector('.thematique-super-select button').setAttribute('data-name', element.getAttribute('data-name'));
                home.selection.updateBlock("thematique");
            }
        },
        back: function() {
            home.thematique.currentLevel = 1;
            document.querySelector('#thematique .level2-container').classList.add('hidden');
            var sousThematiques = document.querySelectorAll('#thematique .level2');
            for(var i = 0; i < sousThematiques.length; i++)
                sousThematiques[i].classList.add('hidden');
            document.querySelector('#thematique .level1').classList.remove('hidden');
            document.querySelector('#thematique .type-header').classList.add('hidden');
            home.selection.updateBlock("thematique");
        },
        addSelection: function(element) {
            home.selection.add(element, "thematique")
            home.selection.updateBlock("thematique", true);
            home.thematique.buildLink();
        },
        removeSelection: function(id) {
            home.selection.remove(id, "thematique");
            home.selection.updateBlock("thematique", true);
            home.thematique.buildLink();
        },
        buildLink: function() {
            // Construction de la requête pour la page recherche (paramètres en GET)
            var query = "";
            for(var i = 0; i < home.selection.content["thematique"].length; i++) {
                var item = home.selection.content["thematique"][i];
                //console.log('adding item', item, 'to link');
                var type = /*item.level == 1*/true ? 'category' : 'subcategory';
                query += "&"+type+"=" + item.name;

            }
            var linkElt = document.querySelector('#thematique .search');
            linkElt.setAttribute('href', linkElt.getAttribute('data-href') + query);
        }
    },
    organisation: {
        currentLevel: 1,
        data: {
            loaded: 0,
            getType: function(item) {
                for(var i = 0; i < item.extras.length; i++) {
                    if(item.extras[i].key == 'Type')
                        return item.extras[i].value;
                }
                return null;
            },
            typedList: []
        },
        init: function() {
            fetch('/api/organizations').then(function(data) {return data.json()})
            .then(function(data) {
                home.organisation.data.list = data;
                home.organisation.initAsync();
            });
            var mapswitchBtns = document.querySelectorAll('.org-display-select .fr-btn');
            for(var i = 0; i < mapswitchBtns.length; i++) {
                mapswitchBtns[i].addEventListener('click', function(e) {
                    if(e.currentTarget.classList.contains('btn-maps')) {
                        document.querySelector('#organisation .level2.map').classList.remove('hidden');
                        document.querySelector('#organisation .level2[data-id="Directions départementales"').classList.add('hidden');
                        document.querySelector('.org-display-select .btn-list').classList.add('fr-btn--secondary');
                        document.querySelector('.org-display-select .btn-maps').classList.remove('fr-btn--secondary');
                    }
                    else{
                        document.querySelector('#organisation .level2.map').classList.add('hidden');
                        document.querySelector('#organisation .level2[data-id="Directions départementales"').classList.remove('hidden');
                        document.querySelector('.org-display-select .btn-list').classList.remove('fr-btn--secondary');
                        document.querySelector('.org-display-select .btn-maps').classList.add('fr-btn--secondary');
                    }
                })
            }
        },
        initAsync: function() {
            var list = home.organisation.data.list;
            console.log('list loaded:', list);

            var tiles = "";
            var lv2content = "";

            for(var type in list) {
                var countertype = list[type].count >= 0 ? '<span class="ri-database-2-line"></span><span>0000</span>' : '<span></span>';
                var tile = '<div class="fr-tile fr-enlarge-link"><div class="fr-tile__body"><h4 class="fr-tile__title"><a class="fr-tile__link" href data-id="'+type+'"  data-name="'+type+'">'+type+'</a></h4><div class="desc"></div><p class="fr-tile__desc">'+countertype+'<span class="selected-num hidden">0</span></p></div></div>';
                tiles += tile;
                
                lv2content += '<div class="level2 tiles hidden" data-id="'+type+'">';
                for(var i=0; i < home.organisation.data.list[type].orgs.length; i++) {
                    var item = home.organisation.data.list[type].orgs[i];
                    var counteritem = item.count >=0 ? '<span class="ri-database-2-line"></span><span>0000</span>' : '<span></span>';
                    lv2content += '<div class="fr-tile fr-enlarge-link"><div class="fr-tile__body"><h4 class="fr-tile__title"><a class="fr-tile__link" href data-id="'+item.name+'" title="'+item.title+'" data-name="'+item.title+'">'+item.title+'</a></h4><p class="fr-tile__desc">'+counteritem+'</p></div></div>';
                }
                lv2content += '<nav role="navigation" class="fr-pagination" aria-label="Pagination" ><ul class="fr-pagination__list"></ul></nav></div>';
            }
            document.querySelector('#organisation .level1.tiles').innerHTML = tiles;
            document.querySelector('#organisation .level2-container').innerHTML = lv2content;

            home.searchtypes.initTileNavigation('organisation');
            home.selection.initType('organisation');

            home.organisation.pagination.init();

            var ddMapContainer = document.querySelector('#organisation .level2.map object');
            if(typeof ddMapContainer.contentDocument == "undefined" || ddMapContainer.contentDocument.readyState != "complete") {
                document.querySelector('#organisation .level2.map object').addEventListener('load', function(le){
                    home.organisation.initMap();
                });
            }
            else
                home.organisation.initMap();
        },
        initMap: function(le) {
            var ddMapContainer = document.querySelector('#organisation .level2.map object');
            console.log('orga map loaded', ddMapContainer.contentDocument.readyState);
            
            ddMapContainer.contentDocument.querySelector('svg').addEventListener('click', function(e) {
                var type = e.target.closest('svg').hasAttribute('data-type') ? e.target.closest('svg').getAttribute('data-type') : "outre-mer";
                var area = e.target.closest('g[id]');
                var org = area ? home.organisation.getOrgFromDpt(area.getAttribute('id')) : false;
                if(area && org) {
                    if(area.classList.contains('selected')) {
                        home.organisation.removeSelection(org.name);
                        area.classList.remove('selected');
                    }
                    else {
                        area.classList.add('selected');
                        home.selection.add({id: org.name, name: org.title}, "organisation");
                    }
                }
            })
        },
        getOrgFromDpt: function(dpt) {
            var dds = home.organisation.data.list["Directions départementales"].orgs;
            if(dds.length == 0)
                return false;
            for(var i = 0; i < dds.length; i++) {
                if(dds[i].Territoire && dds[i].Territoire.indexOf(dpt) >=0)
                    return dds[i];
                console.log(dds[i].Territoire);
            }
            return false;
        },
        back: function() {
            home.organisation.currentLevel = 1;
            document.querySelector('#organisation .level2-container').classList.add('hidden');
            var sousThematiques = document.querySelectorAll('#organisation .level2');
            for(var i = 0; i < sousThematiques.length; i++)
                sousThematiques[i].classList.add('hidden');
            document.querySelector('#organisation .level1').classList.remove('hidden');
            document.querySelector('#organisation .type-header').classList.add('hidden');
            home.selection.updateBlock("organisation");
        },
        addSelection: function(element) {
            console.log('org addselection');
            home.selection.add(element, "organisation")
            home.selection.updateBlock("organisation", true);
            home.organisation.buildLink();
        },
        removeSelection: function(id) {
            console.log('org rmselection', id);
            home.selection.remove(id, "organisation");
            home.selection.updateBlock("organisation", true);
            home.organisation.buildLink();
        },
        sub: {
            navigate: function(element) {
                console.log("navigate", element.getAttribute('data-id'));
                if(element.getAttribute('data-id') == "Directions départementales") {
                    document.querySelector('.org-display-select').classList.remove('hidden');
                    document.querySelector('.level2.map').classList.remove('hidden');
                }
                else {
                    document.querySelector('.org-display-select').classList.add('hidden');
                    document.querySelector('.level2.map').classList.add('hidden');
                }
                home.searchtypes.sub.navigate("organisation", element);
            }
        },
        pagination: {
            nPerPage: 18,
            lists: [],
            init: function() {
                var navLists = document.querySelectorAll('#organisation .fr-pagination__list');
                for(var i = 0; i < navLists.length; i++) {
                    home.organisation.pagination.lists.push({
                        id: navLists[i].closest(".tiles").getAttribute('data-id'),
                        currentPage: 0,
                        maxPages: Math.ceil(navLists[i].closest(".tiles").querySelectorAll(".fr-tile").length / home.organisation.pagination.nPerPage)
                    })
                    navLists[i].addEventListener('click', function(e) {
                        e.preventDefault();
                        var listId = e.target.closest('.tiles').getAttribute('data-id');
                        var listIdx = home.organisation.pagination.getListIndex(listId);
                        var navLink = e.target.closest('.fr-pagination__link');
                        if(navLink && listIdx >= -1) {
                            var currentList = home.organisation.pagination.lists[listIdx];
                            console.log('navlink:', navLink, ' - listId:', listId);
                            var targetPage = 0;
                            if(navLink.classList.contains("fr-pagination__link--first"))
                                targetPage = 0;
                            if(navLink.classList.contains("fr-pagination__link--prev"))
                                targetPage = Math.max(currentList.currentPage - 1, 0);
                            if(navLink.classList.contains("fr-pagination__link--next"))
                                targetPage = Math.min(currentList.currentPage + 1, currentList.maxPages - 1);
                            if(navLink.classList.contains("fr-pagination__link--last"))
                                targetPage = currentList.maxPages - 1;
                            var _t = navLink.getAttribute('data-page');
                            if(_t)
                                targetPage = parseInt(_t);
                            home.organisation.pagination.goto(listIdx, targetPage);
                        }
                    });
                    home.organisation.pagination.goto(i, 0);
                }

            },
            getListIndex: function(listId) {
                for(var i = 0; i < home.organisation.pagination.lists.length; i++) {
                    if(home.organisation.pagination.lists[i].id == listId)
                        return i;
                }
                return -1;
            },
            goto: function(listIdx, page) {
                var curList = home.organisation.pagination.lists[listIdx];
                curList.currentPage = page;
                //var container = document.querySelector('#organisation .level2:not(.hidden');
                var tiles = document.querySelectorAll('#organisation .tiles[data-id="'+curList.id+'"] .fr-tile');
                for(var i = 0; i < tiles.length; i++) {
                    var pMin = curList.currentPage * home.organisation.pagination.nPerPage;
                    var pMax = pMin + home.organisation.pagination.nPerPage;
                    if(i < pMax && i >= pMin)
                        tiles[i].classList.remove('hidden')
                    else
                    tiles[i].classList.add('hidden');
                }
                home.organisation.pagination.draw(curList);

            },
            draw: function(list) {
                var strPrevious = document.querySelector('#organisation .level2-container').getAttribute('data-prev');
                var strNext = document.querySelector('#organisation .level2-container').getAttribute('data-next');
                var nav = document.querySelector('#organisation .level2[data-id="'+list.id+'"] nav ul');
                var prevDisabled = list.currentPage == 0 ? ' aria-disabled="true" role="link"' : ' href="#"';
                var navcontent = '<li><a class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"'+prevDisabled+'>'+strPrevious+'</a></li>';
                for(var i = 0; i < list.maxPages; i++) {
                    navcontent += home.organisation.pagination.drawlink(list, i);
                }
                var nextDisabled = list.currentPage == list.maxPages - 1 ? ' aria-disabled="true" role="link"' : ' href="#"';
                nav.innerHTML = navcontent + '<li><a class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"'+nextDisabled+'>'+strNext+'</a></li>';
            },
            drawlink: function(list, page) {
                var text = (page + 1) ;
                var current = page == list.currentPage ? ' aria-current="page"' : ' href="#"';
                var link = '<li><a'+current+' class="fr-pagination__link role="link" data-page="'+page+'">'+text+'</a></li>';
                return link;
            }
        },
        buildLink: function() {
            // Construction de la requête pour la page recherche (paramètres en GET)
            
            var query = "";
            for(var i = 0; i < home.selection.content["organisation"].length; i++) {
                var item = home.selection.content["organisation"][i];
                //console.log('adding item', item, 'to link');
                var type = 'organization';
                query += "&"+type+"=" + item.id;
                console.log(item)

            }
            var linkElt = document.querySelector('#organisation .search');
            linkElt.setAttribute('href', linkElt.getAttribute('data-href') + query);
        }
    },
    // Manipulation de la zone du bas : "sélection"
    selection: {
        initType: function(type) {
            document.querySelector('#'+type+' .action-buttons .back').addEventListener('click', function(e) {
                home[type].back();
            });
            document.querySelector('#'+type+' .list-selected').addEventListener('click', function(e) {
                var btn = e.target.closest('.fr-btn');
                if(btn)
                    home[type].removeSelection(btn.getAttribute('data-id'));
            });
            home.selection.updateBlock(type);
        },
        content: {
            territoire: [],
            thematique: [],
            organisation: []
        },
        add: function(element, type) {
            var found = false;
            for(var i=0; i< home.selection.content[type].length; i++)
                if(home.selection.content[type][i].id == element.id)
                    found = true;
            if(!found)
                home.selection.content[type].push(element);
            home.selection.updateBlock(type, true);
            home.selection.updateCounter(element, type);
            home[type].buildLink();
        },
        remove: function(id, type) {
            var found = -1;
            for(var i=0; i< home.selection.content[type].length; i++)
                if(home.selection.content[type][i].id == id)
                    found = i;
            if(found >= 0) {
                var elt = home.selection.content[type].splice(found, 1);
                home.selection.updateCounter(elt[0], type);
            }
            if(document.querySelector('a[data-id="'+id+'"]')) // ne s'applique pas aux territoires dont l'id est sur un <g>, pas sur un <a>
                document.querySelector('a[data-id="'+id+'"]').closest('.fr-tile').classList.remove('selected');
        },
        // affiche ou masque les éléments du bloc recherche en fonction du niveau de navigation et de la présence d'une sélection.
        // updateContent (bool) : si on veut mettre à jour la liste des sélections
        updateBlock : function(type, updateContent) {
            var elements = {
                block: document.querySelector('#'+type+' .search-selection'),
                listSelected: document.querySelector('#'+type+' .list-selected'),
                listTitle: document.querySelector('#'+type+' .search-selection h3'),
                backButton: document.querySelector('#'+type+' .action-buttons .back'),
                searchButton: document.querySelector('#'+type+' .action-buttons .search'),
            }

            // update content
            if(typeof updateContent !== "undefined" && updateContent) {
                var content = "";
                for(var i = 0; i < home.selection.content[type].length; i++) {
                    var elt = home.selection.content[type][i];
                    var color = type == "thematique" ? ' style="--btn-color: '+elt.color+'" ' : "";
                    var style = type != 'thematique' ? 'fr-btn--secondary ' : '';
                    content += '<button class="fr-btn ' + style + 'fr-btn--rounded" data-id="' + elt.id + '" '+ color +' >' + elt.name + ' <span class="fr-fi-close-line" aria-hidden="true"></span></button>';
                }
                elements.listSelected.innerHTML = content;
            }
            // update display
            elements.block.classList.remove('hidden');
            if(home[type].currentLevel == 1)
                elements.backButton.classList.add('hidden');
            else
                elements.backButton.classList.remove('hidden');
            if(home.selection.content[type].length > 0) {
                elements.listSelected.classList.remove('hidden');
                elements.listTitle.classList.remove('hidden');
                elements.searchButton.classList.remove('hidden');
            }
            else {
                elements.listSelected.classList.add('hidden');
                elements.listTitle.classList.add('hidden');
                elements.searchButton.classList.add('hidden');
            }
        },
        // Met à jour le compteur d'enfants sélectionnés sur la tuile du parent
        // 3 cas de figure : 
        // - aucun enfant sélectionné: on masque le compteur
        // - un ou plusieurs enfants sélectionnés : on affiche le compteur avec le nombre
        // - le parent est sélectionné : on affiche le compteur avec un indicateur à définir (check ?)
        updateCounter: function(element, type) {
            var id = typeof element.parent === "undefined" ? element.id : element.parent;
            var parentTileA = document.querySelector('#'+type+' .level1.tiles a[data-id="'+id+'"]');
            if(parentTileA == null) // Pas de compteur à modifier (sur les cartes par exemple)
                return;
            var parentTile = parentTileA.closest('.fr-tile');
            var counter = parentTile.querySelector('span.selected-num');
            var selectedList = home.selection.content[type];
            var count = 0;
            var isParentSelected = false;
            for(var i = 0; i < selectedList.length; i++) {
                if(typeof selectedList[i].parent !== "undefined" && selectedList[i].parent == id)
                    count++;
                if(selectedList[i].id == id)
                    isParentSelected = true;
            }
            if(!isParentSelected) {
                if(count == 0) {
                    // masquer compteur
                    counter.innerHTML = "0";
                    counter.classList.add('hidden');
                    parentTile.classList.remove('selected');
                }
                else {
                    // afficher compteur avec count
                    counter.innerHTML = count;
                    parentTile.classList.add('selected');
                    counter.classList.remove('hidden');
                }
            }
            else {
                // afficher compteur avec indicateur parent
                counter.innerHTML = "<span class='fr-fi-check-line'></span>";
                parentTile.classList.add('selected');
                counter.classList.remove('hidden');
            }
        }
    },
    maps: {
        init: function(){
            home.maps.rollover = document.createElement('div');
            home.maps.rollover.setAttribute('id', 'rollover');
            document.querySelector('body').appendChild(home.maps.rollover);
            var maps = document.querySelectorAll('object');
            for(var i = 0; i<maps.length; i++) {
                maps[i].addEventListener('load', function(le){
                    //console.log('home.maps init:', le.target.contentDocument.querySelectorAll('svg g[id]'));
                    var zones = le.target.contentDocument.querySelectorAll('svg g[id]');
                    for(var j= 0; j < zones.length; j++) {
                        zones[j].addEventListener('mouseenter', function(e) {home.maps.hover(e, le)});
                        zones[j].addEventListener('mouseleave', function(e) {home.maps.out(e, le)});
                    }
                })
            }
        },
        hover: function(e, le) {
            var zone = e.currentTarget;
            var rect = zone.getBoundingClientRect();
            var objpos = le.target.getBoundingClientRect();
            var pos = {
                left: rect.left + objpos.left + window.scrollX + rect.width / 2,
                top: rect.top + objpos.top + window.scrollY + rect.height / 2
            }
            var type = e.target.closest('svg').hasAttribute('data-type') ? e.target.closest('svg').getAttribute('data-type') : "outre-mer";
            var zoneId = e.target.getAttribute('id');
            var label = territoires[type][zoneId].name;
            if(zoneId[0] == "D")
                label = zoneId.slice(1) + " " + label;
            if(le.target.closest('#organisation')) {
                var org = home.organisation.getOrgFromDpt(zoneId);
                label = org ? org.title : false;
            }
            if(label)
                home.maps.setRollover(pos, label, e);

            //console.log("enters", e.currentTarget, le.target);
        },
        out: function(e) {
            home.maps.rollover.style.display = 'none';
            //console.log("leaves", e.currentTarget);
        },
        setRollover: function(pos, text) {
            home.maps.rollover.innerHTML = text;
            home.maps.rollover.style.top = pos.top + "px";
            home.maps.rollover.style.left = pos.left + "px";
            home.maps.rollover.style.display = 'block';

        }
    }
};
