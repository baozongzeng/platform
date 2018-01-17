(function($) {
    $(function() {
        var sysMenu = $(".sys-menu");
        var sysMainArea = $(".sys-main-area");
        var expandIcon = $(".expand-icon");
         var arrowTop = $(".scroll-top-arrow"),
                arrowBottom = $(".scroll-bottom-arrow"),
                canScroll,tid,scrollDis=30

        sysMenu.on('click', '.js-handler', function() {
            var _self = $(this),
                parent = _self.parent();



            if (parent.is("dd")) {



                parent.toggleClass('open').siblings().removeClass('open');

                sysMenu.removeClass('hide-child-menu');
                sysMainArea.removeClass('hide-child-menu');

                if (!sysMenu.hasClass('show-child-menu') && childMenus.length) {

                    // sysMenu.addClass('show-child-menu close');
                    sysMenu.addClass('show-child-menu ');
                    // sysMainArea.addClass('show-child-menu close');
                    sysMainArea.addClass('show-child-menu');
                }

            } else {
                if(sysMenu.hasClass("hide-child-menu"))
                {
                    sysMenu.toggleClass('hide-child-menu');
                    sysMainArea.toggleClass('hide-child-menu');
                }
                parent.addClass('open').siblings().removeClass('open');

                var menuId = _self.attr('menu-id');
                var childMenus = $("[parent-menuid=" + menuId + "]");
                if (childMenus.length) {
                    $(".menu-down").hide();
                    childMenus.show();
                }
                if (!sysMenu.hasClass('show-child-menu')) {

                    // sysMenu.addClass('show-child-menu close');
                    // sysMainArea.addClass('show-child-menu close');
                    sysMenu.addClass('show-child-menu ');
                    sysMainArea.addClass('show-child-menu ');
                }
            }
             checkScroll();
            if(_self.attr("menu-id")=="menu-1"){
                sysMenu.removeClass('show-child-menu ');
                sysMainArea.removeClass('show-child-menu ');
                $("#ui-tab-home").addClass("current").siblings("li.current").removeClass("current");
                $("#frame-tab-home").show().siblings("iframe").hide();
            }
        });


        expandIcon.click(function() {
            var _self = $(this);
            sysMenu.toggleClass('hide-child-menu');
            sysMainArea.toggleClass('hide-child-menu');
        });
        $(".menu-toggle").click(function() {
            if (!$(this).hasClass("close")) {
                $(this).addClass("close");
                sysMenu.addClass('close');
                sysMainArea.addClass('close')

            } else {
                $(this).removeClass("close");
                sysMenu.removeClass('close');
                sysMainArea.removeClass('close')

            }
        });

        var config = {
                tab: $("#ui-page-tab-list"),
                iframes: $("#ui-page-tab-iframe"),
                limitSize: 10.,
                maxSize:10,
                activeEvent:tabActive
            }
            //执行
        uiTab.init(config);


        //菜单点击
        $(".sys-menu a").on('click', function(e) {
            var _self = $(this);
            if (_self.attr('open-mode')) {
                e.preventDefault();
                uiTab.addTab(_self.attr('open-id'), _self.attr('href'), _self.attr('open-text'),function(){

                });


            }


        });
        var titleTips = $('<div class="tip-title"></div>');
        titleTips.appendTo('body');

        $(".menu-handler").hover(function(e) {
            if (sysMenu.hasClass('close')) {
                var _self = $(this),
                    title = _self.attr('tip-title'),
                    offset = _self.offset();
                if (title) {
                    titleTips.html(title).css({
                        left: offset.left + _self.outerWidth() + 10,
                        top: offset.top
                    }).show();
                }
            }

        }, function(e) {
            titleTips.hide();
        });


        var noticeList = $('#child-menu-content'),childMenu=$(".child-menu")
        //模拟滚动条
        noticeList.slimscroll({
            alwaysVisible: false,
            opacity: 0,
            size:0,
            height: childMenu.outerHeight()
        }).bind('scroll', function() {
            checkScroll()
        });

        function checkScroll() {
           
            var top = 0,
                st = noticeList.scrollTop(),
                canScroll = $(".child-menu-warp").height() > noticeList.height() ? true : false;
            bottom = st + noticeList.height() >= $(".child-menu-warp").height() ? true : false;
            if (canScroll) {
                if (st <= top) {
                    arrowTop.hide();
                    arrowBottom.show();
                } else if (bottom) {
                    arrowTop.show();
                    arrowBottom.hide();
                } else {
                    arrowTop.show();
                    arrowBottom.show();
                }
            } else {
                arrowTop.hide();
                arrowBottom.hide();
            }

        }

        function tabActive(id){
            var link=$("[open-id="+id+"]"),childparent=link.parents(".child-menu-item"),ddparent=link.parents("dd"),parent=ddparent.parents(".menu-down"),menuId=parent.attr('parent-menuid');
            $(".child-menu-item.open").removeClass("open");
            childparent.addClass('open').siblings().removeClass('open');
            ddparent.addClass('open').siblings().removeClass('open');
            parent.show().siblings().hide();
            var menu=$("[menu-id="+menuId+"]").parent();
            menu.addClass('open').siblings().removeClass('open')
        }

        arrowTop.on('mousedown',function(){
            tid=setInterval(function(){
                var st=noticeList.scrollTop();
                if(st>0){
                    noticeList.scrollTop(st-scrollDis)
                }
                
            },50);
            
        }).on('mouseup mouseleave',function(){
            clearInterval(tid)
        })
         arrowBottom.on('mousedown',function(){

             tid=setInterval(function(){
                var st=noticeList.scrollTop();
                noticeList.scrollTop(st+scrollDis)
            },50);
         }).on('mouseup mouseleave',function(e){
            clearInterval(tid)
        });

         $(window).on('resize',function(){
            var height= childMenu.outerHeight()
           $(".slimScrollDiv").height(height);
           noticeList.height(height)
        })
         

    })
})(jQuery);
