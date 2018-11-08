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
    var ctx = canvas[0].getContext('2d');
    function _draw(obj){console.log(obj);
        ctx.strokeStyle = "white";
        ctx.beginPath();
        var i,j;
        j = i = 0;
        var handle = setInterval(function(){
            if(i < obj['paths'].length){
                if(j < obj['paths'][i].length-1 && !obj['paths'][i][j]['pen_up']){
                    ctx.moveTo(obj['paths'][i][j]['x'],obj['paths'][i][j]['y']);
                    ctx.lineTo(obj['paths'][i][j+1]['x'],obj['paths'][i][j+1]['y']);
                    ctx.stroke();
                    j++;
                }else if(j >= obj['paths'][i].length-1){
                    i++;j=0;
                }else if(j < obj['paths'][i].length-1 && obj['paths'][i][j]['pen_up']){
                    j++;
                }
            }else{
                ctx.closePath();
                clearInterval(handle);
                handle = null; 
                console.log('done');
            }
        },0.5);
    }
    function init(){
        var req = _createXMLHttp();
        req.open('post','http://localhost:6600'/*'http://olthompson.com:6600'*/,true);
        req.onreadystatechange = function(){
           if(req.status === 200 && req.readyState === 4){
               var obj = JSON.parse(req.responseText);
               //if(!obj['error']){console.log(obj);
                   console.log(obj); _draw(obj);
                //}
           }
        };
        req.send(JSON.stringify(snd_obj)); 
       // _draw(obj);
    }
    return {
        init:init
    };
}