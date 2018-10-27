'use strict';

var init = (function(){
    
    // Cache the DOM
    var $body = $('body');
    var $background_div = $body.find('#background_div');
    var ctx = $background_div.get(0).getContext('2d');
    var videoDiv, video;
    videoDiv = document.createElement('div');
    video = document.createElement('video');
    $body.get(0).appendChild(videoDiv);
    videoDiv.setAttribute('style', 'display:none');
    videoDiv.appendChild(video);
    video.setAttribute('src', 'pics/gray.mp4');
    video.playbackRate = 0.2;
    video.autoplay = true;
    video.loop = true;
    
    function _setbackground(){
        video.addEventListener("canplaythrough",function(){
            setInterval(function(){
                ctx.drawImage(video,0,0,ctx.canvas.width,ctx.canvas.height);
            },20);
        },false);
        $background_div.css({
            "opacity" : "1.0"
        });
    }
    
    function render(){
        _setbackground();
        signin.render();
    }
    
    return{
        render: render,
        video: video
    };
    
})();
