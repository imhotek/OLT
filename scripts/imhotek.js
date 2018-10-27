'use strict';

var pyramid = (function(canvas){
    
    var ctx = canvas.getContext('2d');
    var pts = new Array(149,69,178,82,149,97,122,83,91,105,150,125,206,105,237,127,149,163,
                            62,128,33,149,148,199,265,148,295,170,149,242,3,171,149,97,150,242);
    var sun_st = new Array(72,117);
    var sun_end = new Array(226,117);
    var cntl_pt = new Array(149,-70);
    var wr = 1/300;
    var hr = 1/248;
    var cw = ctx.canvas.width; 
    var ch = ctx.canvas.height; 
    
    function _draw(){
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        for(var i = 0; i <= pts.length-4; i+=4){
            var startx = pts[i]*wr*cw; 
            var starty = pts[i+1]*hr*ch;
            var endx = pts[i+2]*wr*cw;
            var endy = pts[i+3]*hr*ch;
            ctx.moveTo(startx,starty);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        var startx = sun_st[0]*wr*cw;
        var starty = sun_st[1]*hr*ch;
        var endx = sun_end[0]*wr*cw;
        var endy = sun_end[1]*hr*ch;
        var cx = cntl_pt[0]*wr*cw;
        var cy = cntl_pt[1]*hr*ch;
        ctx.moveTo(startx,starty);
        ctx.quadraticCurveTo(cx,cy,endx,endy);
        ctx.stroke();
    }
    
    function render(){
        _draw();
    }
    
    return {
        render: render
    };
})(document.getElementById('imhotek_canvas'));