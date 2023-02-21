
document.addEventListener('DOMContentLoaded', function() {

    // Temporaire : nettoyage des types (enlever les urls de l'affichage)
    /*
    var formats = document.querySelectorAll('[data-format], select#filter-res_format option, .filter-list .fr-tag span');
    for(var i = 0; i < formats.length; i++) {
        //console.log('formats', i, formats[i].innerHTML)
        var innherHTML = formats[i].innerHTML;
        if(innherHTML.indexOf('media-types') > 0) {
            var fullname = innherHTML.split('media-types/')[1];
            var lastnameArr = fullname.split('/');
            var lastname = lastnameArr[lastnameArr.length - 1];
            formats[i].innerHTML = lastname;
        }
    }*/

    if(typeof home !== "undefined")
        home.init();
    if(typeof pkgsearch !== "undefined")
        pkgsearch.init();
    $(".js-hide").hide();

    // Selects 
    var selects = document.querySelectorAll('select[data-select-a11y="1"]');
    Array.prototype.forEach.call(selects, function(select){
        new Select(select);
    });
    // label workaround
    var labels2 = document.querySelectorAll('span[data-for]');
    for(var i = 0; i < labels2.length; i++) {
        labels2[i].addEventListener('click', function(e) {
            var tSelect = document.querySelector('select[name="'+e.currentTarget.getAttribute('data-for')+'"]');
            console.log(tSelect);
            tSelect.closest('.select-a11y').querySelector('.btn-select-a11y').dispatchEvent(new Event('click'));
        });
    }

    // test
    // Selects 
    var selects = document.querySelectorAll('select[data-select-a11y="2"]');
    Array.prototype.forEach.call(selects, function(select){
        new Select(select, {
            help: 'helptext',
            placeholder: 'le placeholder',
            noResults: 'Aucun résultat',
            results: '{x} suggestions'
        });
    });


    // syrcharge style pagination ckan par défaut
    var pagination = document.querySelectorAll('.pagination-wrapper');
    for(var i = 0; i < pagination.length; i++) 
    {
        pagination[i].classList.add('fr-pagination');
    }
    var paginationList = document.querySelectorAll('.pagination');
    for(var i = 0; i < paginationList.length; i++) 
    {
        paginationList[i].classList.add('fr-pagination__list');
    }
    var paginationLinks = document.querySelectorAll('.pagination li a');
    for(var i = 0; i < paginationLinks.length; i++) 
    {
        paginationLinks[i].classList.add('fr-pagination__link');
    }
    var paginationActive = document.querySelectorAll('.pagination li.active a');
    for(var i = 0; i < paginationActive.length; i++) 
    {
        paginationActive[i].setAttribute('aria-current', 'page');
    }

    // page dataset & org : toggle des séries
    var links = document.querySelectorAll('.pkg-org-series-container a.toggle');
    for(var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            console.log('click');
            e.currentTarget.closest('.pkg-org-series-container').classList.toggle('open');
        });
    }

    // page dataset & org : "read more"
    var descUnwrap = document.querySelectorAll('.desc-unwrap');
    var maxWords  = 60;
    for(var i = 0; i < descUnwrap.length; i++) {
        var curWord = 0;
        var elements = descUnwrap[i].children;
        for(var j = 0; j < elements.length; j++){
            if(curWord > maxWords)
                elements[j].classList.add('hidden');
            curWord += elements[j].innerHTML.split(' ').length;
        }
        if(curWord > maxWords) {
            var a = document.createElement('a');
            a.innerHTML= descUnwrap[i].getAttribute('data-readmore');
            a.setAttribute('href', '#');
            a.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(e.currentTarget, e.currentTarget.parentNode.parentNode);
                e.currentTarget.parentNode.parentNode.querySelector('.desc-unwrap').classList.toggle('open');
            });
            var p = document.createElement('p');
            p.appendChild(a);
            descUnwrap[i].after(p);
        }
    }


    // minimaps

    function checkImgMapGroup (element) {
        var allLoaded = true;
        var objects = element.querySelectorAll('object');
        for(var i = 0; i < objects.length; i++) {
            if(!objects[i].hasAttribute('loaded'))
                allLoaded = false;
        }
        if(allLoaded) {
            if(element.querySelectorAll('object[valid]').length > 0) {
                element.querySelectorAll('object[valid]')[0].classList.add("selected");
            }
            else {
                element.closest(".swiper-slide").style.display = "none";
            }
            if(element.closest(".swiper-slide")) {
                
                // page dataset & org: slider
                var swiper = new Swiper(".swiper.imglist", {
                    navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                    el: ".swiper-pagination",
                    },
                });
            }
        }
    }
    var objects = document.querySelectorAll('.imgmap object');
    for(var i = 0; i < objects.length; i++) {
        objects[i].addEventListener('load', function(le){
            le.target.setAttribute('loaded', 'true');
            var ids = le.target.closest('.imgmap').getAttribute('data-territory');
            if(!ids)
                return;
            var oQuerySelector= "#" + ids.replaceAll(new RegExp(/[{}]/g), "").split(",").join(',#');
            var territorySvg = le.target.contentDocument.querySelectorAll(oQuerySelector);
            le.target.contentDocument.querySelector('svg').classList.add('static');
            if(territorySvg.length > 0) {
                le.target.setAttribute('valid', 'true');
                for(var j = 0; j < territorySvg.length; j++) {
                    territorySvg[j].classList.add('selected');
                }
            }
            checkImgMapGroup(le.target.closest('.imgmap'));
        });
    }


    // mobile drawer
    var mds = document.querySelectorAll(".mobile-drawer");
    for(var i = 0; i < mds.length; i++) {
        mds[i].classList.add('active');
        document.querySelector(".mobile-drawer-toggle[aria-controls='"+mds[i].getAttribute("aria-controlled-by")+"']").addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(".mobile-drawer[aria-controlled-by='"+e.currentTarget.getAttribute("aria-controls")+"']").classList.toggle('open');
        })
    }

});