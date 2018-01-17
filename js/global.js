(function($){

    $(function(){
        $("select").chosen({
            disable_search:true
        });

        $("input").iCheck({checkboxClass: 'icheckbox_base', radioClass: 'iradio_base'})

        $(window).resize(function(){

        	 $("select").each(function(){

        	 	var _self=$(this),w=_self.parents(".select-warp").outerWidth();
        	 	_self.next(".chosen-container ").width(w);
        	 })

        })

        $.fn.extend({
            init_input_value:function(){
                $(this).each(function()
                {
                    $(this).attr("my_value",$(this).val());
                })
                $(this).on("input",function(){
                    if($(this).val()!==$(this).attr("my_value")){
                        $(this).addClass("change");
                    }
                    else{
                        $(this).addClass("change");
                    }
                })
                $(this).on("propertychange",function(){
                    if($(this).val()!==$(this).attr("my_value")){
                        $(this).addClass("change");
                    }
                    else{
                        $(this).addClass("change");
                    }
                })
                return this;
            },
            init_select_value:function(){
                $(this).each(function()
                {
                    var text=$(this).find("option:selected").text();
                    if(text)
                    {
                        text=$(this).find("option").eq(0).text();
                    }
                    $(this).attr("my_value",text);
                })
                $(this).on('change', function() {
                    if($(this).find("option:selected").text()!=$(this).attr("my_value")){
                        $(this).next().addClass("change");
                    }
                    else{
                        $(this).next().removeClass("change");
                    }
                });
                return this;
            }
        });

    })


})(jQuery)