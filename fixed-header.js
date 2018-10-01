
                //===================  fixed header ====================

                function equalThs(mainTh, clonedTh) {
                                      
                    var arr = [];
                    mainTh.each(function (i) {                       
                        arr.push($(this).outerWidth());
                    });
                   
                    clonedTh.each(function (k) {
                        var patt = /display: none/g;
                        var styleAttributeContent = $(this).attr('style');
                        if (!patt.test(styleAttributeContent)) {
                            $(this).outerWidth(arr[k]);
                        }
                        
                    });
                  
                    $("thead.cloned").outerWidth($('thead.mainThead').outerWidth());
                   

                }

                function fixedHeader(fixedHeader) {

                    fixedHeader.css({
                        'position': 'fixed',
                        'top': '61px',
                        'background-color': 'white',
                        'border-bottom': '1px solid #d2d2d25c',
                        'z-index': '9999'
                    });

                }

                function fixedHeaderOnOnload() {

                    var thead = $("thead");

                    var fixedThead = $("thead").clone(true).hide();

                    $("thead:first-child").addClass('mainThead');

                    fixedThead.addClass('cloned');                   

                    thead.after(fixedThead);

                    fixedHeader(fixedThead);

                    var $mainThs = $("thead.mainThead").find('th');
                    var $clonedThs = $("thead.cloned").find('th');

                    setTimeout(function () {                     
                        equalThs($mainThs, $clonedThs);
                        showHideFixedThead();
                        $('thead.cloned').width($('.table-responsive.xsmall').width());                        
                        $('thead.cloned').css('overflow', 'hidden');
                    }, 500)
                                 
                }

                function showHideFixedThead() {

                    var $clonedThead = $('thead.cloned');

                    if ($(window).scrollTop() > $("thead:first-child").offset().top) {

                        $clonedThead.show();

                    } else {

                        $clonedThead.hide();
                    }
                }

                function makefixedHeaderOnResize() {

                    $('#table3').find('.cloned').remove();

                    fixedHeaderOnOnload();

                    $(window).scroll(function () {
                        showHideFixedThead();
                    });

                }

                function makeFixedHeader() {

                    fixedHeaderOnOnload();
                    var fixedThead = $('thead.cloned');
                    $(window).scroll(function () {
                        if ($(window).scrollTop() > $("thead:first-child").offset().top) {
                            fixedThead.show();

                        } else {
                            fixedThead.hide();
                        }
                    });

                };

                //=======================
                function makeFixedHeaderTwo() {
                    setTimeout(function () {
                        fixedHeaderOnOnload();
                        var fixedThead = $('thead.cloned');
                        var labelTwoWidth = $('thead th:nth-child(2) label').width();
                        $('thead.cloned th:nth-child(2) label').width(labelTwoWidth);
                        var thFirstMainThead = $('thead th:first-child').outerWidth();
                        fixedThead.find('th:first-child').css({ 'padding-left': thFirstMainThead / 2, 'padding-right': thFirstMainThead / 2 });
                        $(window).scroll(function () {
                            if ($(window).scrollTop() > $("thead:first-child").offset().top) {
                                fixedThead.show();

                            } else {
                                fixedThead.hide();
                            }
                        });

                    }, 1000)
                    

                };


                //=======================

                function fixedHeaderOnResizeWhenClickedSorting() {

                    $('#table3').find('.cloned').remove();               
                    fixedHeaderOnOnload(); 
                    var labelTwoWidth = $('thead th:nth-child(2) label').width();
                    $('thead.cloned th:nth-child(2) label').width(labelTwoWidth);
                    var thFirstMainThead = $('thead th:first-child').outerWidth();
                    $('thead.cloned').find('th:first-child').css({ 'padding-left': thFirstMainThead / 2, 'padding-right': thFirstMainThead / 2 });
                    $(window).scroll(function () {
                        showHideFixedThead();
                    });

                }

                var fixed;
                $(window).resize(function () {
                    $('thead.cloned').css('display', 'none');
                    clearTimeout(fixed);
                    fixed = setTimeout(makefixedHeaderOnResize, 400);

                });

                var interval = setInterval(function () {
                    var tdtext = $("table").find('td:nth-child(3)').text();
                    if (tdtext) {
                        makeFixedHeader();
                        fixedHeaderOnClickSortingCloned();
                        fixedHeaderOnClickSortingMain();
                        fixedHeaderOnFiltering();
                        clearInterval(interval);
                    }

                }, 100)

                function reloadWhenFilterAndSorting() {
                    var interval = setInterval(function () {
                        var tdtext = $("table").find('td:nth-child(3)').text();
                        if (tdtext) {
                            makeFixedHeaderTwo(); 
                            $(window).resize(function () {
                                $('thead.cloned').css('display', 'none');
                                clearTimeout(fixed);
                                fixed = setTimeout(fixedHeaderOnResizeWhenClickedSorting, 400);

                            });
                            clearInterval(interval);
                        }

                    }, 100)

                }

                //======================= add event listener to sorting and filtering ==============================================

                function fixedHeaderOnClickSortingCloned() {
                    $('thead.cloned').on('click', 'th', function () {
                        $('#table3').find('.cloned').remove();
                        reloadWhenFilterAndSorting();                       
                    });
                }

                function fixedHeaderOnClickSortingMain() {
                    $('thead:first-child').on('click', 'th', function () {
                        $('#table3').find('.cloned').remove();
                        reloadWhenFilterAndSorting();
                    });
                }


                function fixedHeaderOnFiltering() {
                    var $select = $('.table-responsive').find('select');
                    $select.on('change', function () {
                        $('#table3').find('.cloned').remove();
                        reloadWhenFilterAndSorting();
                    })
                }
               
               
