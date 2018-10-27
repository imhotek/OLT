'use strict';

(function(){
    window.addEventListener('unload',function(){
        events.emit('on_window_close');
        events.removeAll();
    });
    document.getElementById("background_div").setAttribute("width",window.innerWidth);
    document.getElementById("background_div").setAttribute("height",window.innerHeight);
    init.render();
})();
