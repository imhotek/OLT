'use strict';

function New_Applicant(uname){
    var $outer,width,height;
    var username = uname;
    
    var obj = {
        _createXMLHttpRequest:function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        },
        _callback:function(data){},
        _init:function(){
            width = window.innerWidth;
            height = window.innerHeight;
            $outer = $("body");
            $outer.css({
                "width":width+"px",
                "height":height+"px"
            });
        },
        construct:function(){
            this._init();
            this.__proto__ = new Applicant_Profile($outer);
            this.__proto__.construct();
        }
    };
    return obj;
}