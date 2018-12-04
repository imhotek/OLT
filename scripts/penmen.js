'use strict';

function Penmen(str,canvas,top_x1,top_y1,top_x2,top_y2,bot_x3,bot_y3,bot_x4,bot_y4,time){
    var ctx = canvas[0].getContext('2d');
    var str_arr = str;
    var index = 0;
    var limit = str_arr.length;
    var shutdown = false;
    var snd_obj = {
        text:null,
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
    function set_shutdown(bool){
        shutdown = bool;
    }
    function get_shutdown(){
        return shutdown;
    }
    
    function _clear_canvas(){
        ctx.fillStyle = "#000000";
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;
        ctx.fillRect(0,0,w,h);
    }
    function _createXMLHttp(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    
    function _draw(obj){
        console.log(obj);
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
                index+=1;
                if(index<limit){
                    setTimeout(init,1000);
                }else{
                    index = 0;
                    setTimeout(function(){
                        var w = ctx.canvas.width;
                        var h = ctx.canvas.height;
                        portrait.init(w,h);
                        portrait.setContext(ctx);
                        portrait.setContext2(ctx);
                        portrait.render();
                        var handle2 = setInterval(function(){
                            if(portrait.get_status()){
                                clearInterval(handle2);
                                handle2 = null;
                                index = 0;
                                portrait.set_status(false);
                                setTimeout(init,7000);
                            }
                        },25);
                    },1000);
                }
            }
        },obj['ref_rate']);
    }
    function init(){
        if(!get_shutdown()){
            _clear_canvas();
            var req = _createXMLHttp();
            req.open('post','http://localhost:6600'/*'http://olthompson.com:6600'*/,true);
            req.onreadystatechange = function(){
               if(req.status === 200 && req.readyState === 4){
                   var obj = JSON.parse(req.responseText);
                   if(!obj['error']){
                       _draw(obj);
                    }else{
                        alert("Error!");
                    }
               }
            };
            snd_obj.text = str_arr[index];
            req.send(JSON.stringify(snd_obj)); 
        }else{
            _clear_canvas();
        }
    }
    return {
        init:init,
        set_shutdown:set_shutdown,
        get_shutdown:get_shutdown
    };
}