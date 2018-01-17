var uiTab={
    tab:null,
    iframe:null,
    init:function(config){
        var _that=this,
        common_width=93;//常用标题4个字
        _that.config=config;
        _that.tab=config.tab;
        _that.iframe=config.iframes;
        _that.activeEvent=config.activeEvent;
        config.maxSize=_that.Max_Num( common_width);
        _that.config.maxSize=config.maxSize||5;


        var loading=$('<div class="hs-ui-loading-box"><div class="hs-ui-loading-mask"></div><div class="hs-ui-loading"><div class="hs-ui-loading-bg"></div><span><i class=""></i>正在加载</span></div></div>');

        $("body").append(loading);

        // _that.unLoad();

        _that.tab.on('click','li',function(){
            var _self=$(this);
            _that.activeTab(_self.attr("id"));

        }).on('click','.tab-item-close',function(e){
            var _self=$(this);
            e.stopPropagation();
            _that.removeTab(_self.parent().attr("id"));
        })
          _that.checkTab();

          var tabExtend=$(".ui-page-tab-extend");

          if(tabExtend.length){
            tabExtend.on('click','.close-all',function(){
            tabExtend.removeClass('active');
                $(".shade").addClass("none");
            $("li:not(:first-child)",_that.tab).each(function(){
                var id=$(this).data("data")[0];
                _that.removeTab(id)
            })
            $("[menu-id='menu-1']").parent().addClass("open").siblings(".open").removeClass("open");
          })
          tabExtend.on('click','.close-current',function(){
             tabExtend.removeClass('active');
              $(".shade").addClass("none");
            var length=_that.getTabLength();
            if(length>1){
                  var currentID=_that.getCurrentTab();
                 _that.removeTab(currentID)
            }
          
          });

          tabExtend.on('click','.extend-handler',function(e){
              e.stopPropagation();
              tabExtend.toggleClass('active');
              if(tabExtend.hasClass("active")){
                  $(".shade").removeClass("none");
              }
          });
              $(document).on("click",function()
              {
                  if(tabExtend.hasClass("active"))
                  {
                      $(".shade").addClass("none");
                      tabExtend.removeClass("active")
                  }
              })
          }


          

          
           // _that.setFrameHeight();

           // $(window).on('resize',function(){
           //  _that.setFrameHeight();
           // })


    },
    //添加tab，id必须是唯一不重复
    addTab:function(id,src,text,callback){
        var _that=this;

        if($("#ui-tab-"+id).length&&$("#frame-tab-"+id).length){
           _that.activeTab(id);
            return;
        }

        if(_that.getTabLength()>=_that.config.maxSize){
            _that.showTip('为了体验更流畅，请关闭一些不用的页面！');
             return;
        }


        if(_that.getTabLength()>=_that.config.limitSize){

            _that.tab.addClass('limit-item')
        }else{
             _that.tab.removeClass('limit-item')
        }
        var text_width=_that.text_width(text);
        if(!_that.compare(_that,text_width)){
            _that.showTip('为了体验更流畅，请关闭一些不用的页面！');
            return ;
        }
        var item=$('<li title="'+text+'" class="ui-page-tab-item" id="ui-tab-'+id+'"><span class="tab-item-text">'+text+'</span><i class="tab-item-close"></i></li>');
        var frame=$('<iframe id="frame-tab-'+id+'" src="'+src+'"  scrolling="yes" frameborder="0" width="100%" height="100%"></iframe>');

        // var item=$('<li title="'+text+'" class="ui-page-tab-item" id="ui-tab-'+id+'"><span class="tab-item-text">'+text+'</span><i class="tab-item-close"></i></li>');
        // var frame=$('<div id="frame-tab-'+id+'" src="'+src+'"  class="frame-tab" scrolling="yes" frameborder="0" width="100%" height="100%"></div>');
        // _that.tab.append(item);
        // _that.iframe.append(frame);
        //
        // _that.activeTab(id);
        //
        // frame.load(src+" .sys-form",function(r){
        //
        //     callback&&callback(frame);
        // });


        item.data("data",arguments);
        _that.tab.append(item);

        _that.iframe.append(frame);

        frame.load(function(){
            _that.hideLoading();
            var title_Name=$(".ui-page-tab-item.current").find("span").html();

            var Id="#frame-tab-"+$(".ui-page-tab-item.current").attr("id").split("-")[2];
            if($(Id).contents().find(".page-title label")){
                $(Id).contents().find(".page-title label").html(title_Name);
            }
        })

         _that.activeTab(id);


        callback&&callback();


         _that.checkTab();

         _that.showLoading();




    },

    activeTab:function(id,callback){
         var _that=this;

        id=id.replace("ui-tab-","");
       
         $("#ui-tab-"+id).addClass('current').siblings().removeClass('current');
         $("#frame-tab-"+id).show().siblings().hide();
         $(window).resize();
         callback&&callback();


         if(_that.activeEvent){
            typeof _that.activeEvent=="function"? _that.activeEvent(id):'';
         }

    },
    changeTab:function(){

    },
    removeTab:function(id){

        id=id.replace("ui-tab-","");

        var _that=this;
        var tabItem= $("#ui-tab-"+id),tabFrame= $("#frame-tab-"+id);
        var tabItemsLength=_that.getTabLength();
        var index=tabItem.index();

        

        if(index==0){
            return;
        }



       
        if(index==tabItemsLength-1){
            
            _that.activeTab(tabItem.prev().attr("id"));
        }else{
             _that.activeTab(tabItem.next().attr("id"));
        }




       tabItem.remove();
       tabFrame[0].contentWindow.document.write("");
       tabFrame[0].contentWindow.close();//避免iframe内存泄漏
       tabFrame.removeAttr("onload").remove();

       if(window.attachEvent&&CollectGarbage){
            CollectGarbage()
       }

        if(_that.getTabLength()>=_that.config.limitSize){
           
            _that.tab.addClass('limit-item')
        }else{
             _that.tab.removeClass('limit-item')
        }
       _that.checkTab();
    },
    scrollTab:function(){

    },
    getTabLength:function(){
        return this.tab.find("li").length;
    },
    getCurrentTab:function(){
        return this.tab.find("li.current").attr('id')
    },
    refreshTab:function(id){

        id=id.replace("ui-tab-","");
        var _that=this;
        var tabFrame= $("#frame-tab-"+id);
        tabFrame[0].contentWindow.location.reload();
    },
    refreshCurrentTab:function(){
        var _that=this;
        _that.refreshTab(_that.getCurrentTab());
    },
    checkTab:function(){
       var _that=this;
       if(_that.getTabLength()==1){
            $("body").addClass('only-home')
       }else{
            $("body").removeClass('only-home')
       }
    },
     showTip:function(msg){
        
            alert(msg)
        
    },

    setFrameHeight:function(){
       

        var _that=this,win=$(window);
        var header=$(".hs-ui-header");
        var tab=$(".ui-page-tab");
        _that.iframe.height(win.height()-header.outerHeight()-tab.outerHeight()-1);

    },
    showLoading:function(){
        $("body").addClass('hs-ui-load-page')
    },
    hideLoading:function(){
        $("body").removeClass('hs-ui-load-page')
    },
    removeAllTab:function(){

    },
    Max_Num:function( common_width){
        var list_width=$("#ui-page-tab-list").width();
        return parseInt(list_width/common_width);
    },
    text_width:function(text){

        var span_label="<span class='none test-text'>"+text+"</span>"
        $(".shc-right").append(span_label);
        var width=$(".test-text").outerWidth();

        return width;
    },
    compare:function(_that,width){
        $(".test-text").remove();
        var list_width=$("#ui-page-tab-list").width();
        var sum_width=0;
        for(var i=0;i<_that.getTabLength()+1;i++){
           sum_width+=$("#ui-page-tab-list").find("li").eq(i).innerWidth();
        }
        if(sum_width+width+50>list_width)
        {
            return false;
        }
        return true;
    },
    //不管刷新或者关闭窗口都会出现提示
    unLoad:function(){
        $(window).on('beforeunload',function(e){
            return ""
        })
    }
};
