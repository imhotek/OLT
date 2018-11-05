'use strict';

function Penmen(str,canvas,start_x,start_y,end_x,end_y,time){
    var snd_obj = {
        text:str,
        left_x:start_x,
        left_y:start_y,
        right_x:end_x,
        right_y:end_y,
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