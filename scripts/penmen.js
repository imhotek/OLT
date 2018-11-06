'use strict';

function Penmen(str,canvas,top_x1,top_y1,top_x2,top_y2,bot_x3,bot_y3,bot_x4,bot_y4,time){
    var snd_obj = {
        text:str,
        x1:top_x1,
        y1:top_y1,
        x2:top_x2,
        y2:top_y2,
        x3:bot_x3,
        y3:bot_y3,
        x4:bot_x4,
        y4:bot_y4,
        duration:time
    };
    function _createXMLHttp(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    function _parse(obj){
        
    }    
    var ctx = canvas[0].getContext('2d');
    function _draw(){}
    function init(){
        var req = _createXMLHttp();
        req.open('post','http://olthompson.com:6600',true);
        req.onreadystatechange = function(){
           if(req.status === 200 && req.readyState === 4){
               var obj = JSON.parse(req.responseText);
               if(!obj['error']){
                    _parse();
                    _draw();
                }
           }
        };
        req.send(JSON.stringify(snd_obj));
    }
    return {
        init:init
    };
}