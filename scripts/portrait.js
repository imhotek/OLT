'use strict';

var portrait = (function(){
    var width;
    var height;
    function init(w,h){
        width = w*1.15;
        height = h*1.3;
    }
    var done = false;
    var frame_count = 6.25;
    var frame_rate = 2.5;
    var counter = 0;
    var ctx = null;
    var ctx2 = null;
    var imageArray = ["pics/00.png", "pics/01.png", "pics/02.png"];
    var imageIndex = 0;
    var c2image = new Image();
    c2image.onload = function(){
        ctx2.mozImageSmoothingEnabled = true;
        ctx2.webkitImageSmoothingEnabled = true;;
        ctx2.msImageSmoothingEnabled = true;
        ctx2.imageSmoothingEnabled = true;
    };
    c2image.src = imageArray[imageIndex];
    function set_status(bool){
        done = bool;
    }
    function get_status(){
        return done;
    }
    function _clear_canvas(){
        ctx.fillStyle = "#000000";
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;
        ctx.fillRect(0,0,w,h);
        ctx.lineWidth = 1.0;
        frame_count = 6.25;
        frame_rate = 2.5;
        counter = 0;
        imageIndex = 0;
        set_status(true);
    }
    function _ptX(x){
        return ((x/1509)*width);
    };
    function _ptY(y){
        return ((y/667)*height)*0.8;
    };
    
    function _drawPts(x1,y1,x2,y2){ 
        var distx = x2 - x1;
        var disty = y2 - y1;
        var incX = distx/frame_count;
        var incY = disty/frame_count;
        var destx = x1+incX, desty = y1+incY;
        setTimeout(function(){ 
            var handle = setInterval(function(){ 
                    ctx.clearRect(0,0,width, height);
                    ctx2.clearRect(0,0,width, height);
                    ctx.moveTo(x1,y1);
                    ctx.lineTo(destx, desty);
                    ctx.stroke();
                    destx+=incX;
                    desty+=incY;                    
                    if((x2<x1)){
                        if(destx <= x2){
                            clearInterval(handle);
                            handle = 0;
                            return;
                        }
                    }else if((x2>x1)){
                        if(destx >= x2){
                            clearInterval(handle);
                            handle = 0;
                            return;
                        }
                    }else if(x2 === x1){
                        if(destx >= x2){
                            clearInterval(handle);
                            handle = 0;
                            return;
                        }
                    }
            },frame_rate);
        }, counter);
        counter += (frame_count*frame_rate);
    };
    
    function _drawCir(x,y,r){
        // At an increment of 14.4 degrees every 2.5 secs, each wheel takes 250 millisecs to draw
        // 14.4 multiplied by 3 means each tire will be comprised of 3 circles
        var inc = 14.4*3; 
        var end = inc;
        setTimeout(function(){
            var handle = setInterval(function(){
                ctx.clearRect(0,0,width,height);
                ctx2.clearRect(0,0,width,height);
                ctx.moveTo(_ptX(x), _ptY(y));
                ctx.arc(_ptX(x),_ptY(y),_ptX(r),0,end,false);
                ctx.stroke();
                end += inc;
                if(end >= 360){
                    clearInterval(handle);
                    handle = 0;
                }
            },frame_rate);
        },counter);
        counter += (frame_count*frame_rate);
    };
    
    function _tires(){
        // Tire 1
        _drawCir(1111,548,5);
        _drawCir(1111,548,12);
        _drawCir(1111,548,24);
        _drawCir(1111,548,30);
        
        // Tire 2
         _drawCir(889,551,5);
        _drawCir(889,551,12);
        _drawCir(889,551,24);
        _drawCir(889,551,30);
        
        // Tire 3
         _drawCir(265,558,5);
        _drawCir(265,558,12);
        _drawCir(265,558,24);
        _drawCir(265,558,30);
        
        // Tire 4
         _drawCir(165,558,5);
        _drawCir(165,558,12);
        _drawCir(165,558,24);
        _drawCir(165,558,30);
    };
    
    function _cabFront(){
        _drawPts(_ptX(1078), _ptY(556), _ptX(1081),_ptY(528));
        setTimeout(function(){
                ctx.moveTo(_ptX(1081),_ptY(528));                
                ctx.quadraticCurveTo(_ptX(1110.5),_ptY(500),_ptX(1140),_ptY(540));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1140),_ptY(540), _ptX(1146),_ptY(540));
        _drawPts(_ptX(1146),_ptY(540), _ptX(1146),_ptY(509));
        setTimeout(function(){
                ctx.moveTo(_ptX(1146),_ptY(509));                
                ctx.quadraticCurveTo(_ptX(1135),_ptY(502),_ptX(1135),_ptY(495));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1135),_ptY(495),_ptX(1134),_ptY(482));
        _drawPts(_ptX(1134),_ptY(482),_ptX(1083),_ptY(464));
        _drawPts(_ptX(1083),_ptY(464),_ptX(1062),_ptY(420));
        _drawPts(_ptX(1062),_ptY(420),_ptX(1016),_ptY(417));
        _drawPts(_ptX(1016),_ptY(417),_ptX(1016),_ptY(415));
        _drawPts(_ptX(1016),_ptY(415),_ptX(962),_ptY(415));
        _drawPts(_ptX(962),_ptY(415), _ptX(962),_ptY(424));
        _drawPts(_ptX(962),_ptY(424), _ptX(951),_ptY(424));
        _drawPts(_ptX(959),_ptY(453), _ptX(964),_ptY(431));
        _drawPts(_ptX(964),_ptY(431),_ptX(989),_ptY(427));
        _drawPts(_ptX(989),_ptY(427), _ptX(988),_ptY(453));
        _drawPts(_ptX(988),_ptY(453),_ptX(959),_ptY(453));
        _drawPts(_ptX(949),_ptY(507),_ptX(954),_ptY(506));
        _drawPts(_ptX(954),_ptY(506),_ptX(1001),_ptY(512)); // white side panel starts at 1001,512 bottom left
        _drawPts(_ptX(795),_ptY(523), _ptX(841), _ptY(530));
        _drawPts(_ptX(841), _ptY(530), _ptX(844), _ptY(565));
        _drawPts(_ptX(844), _ptY(565), _ptX(830), _ptY(565));
        _drawPts(_ptX(830), _ptY(565), _ptX(830),_ptY(530));
        _drawPts(_ptX(804), _ptY(530), _ptX(804),_ptY(556));
        _drawPts(_ptX(804),_ptY(556), _ptX(801),_ptY(566));
        _drawPts(_ptX(801),_ptY(566), _ptX(792),_ptY(556));
        _drawPts(_ptX(792),_ptY(556), _ptX(794),_ptY(527));
        _drawPts(_ptX(808),_ptY(520), _ptX(996),_ptY(520));
        _drawPts(_ptX(889),_ptY(517), _ptX(919),_ptY(518));
        setTimeout(function(){
                ctx.moveTo(_ptX(919),_ptY(518));                
                ctx.quadraticCurveTo(_ptX(934),_ptY(529),_ptX(936),_ptY(553));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(936),_ptY(535), _ptX(996),_ptY(535));
        setTimeout(function(){
                ctx.moveTo(_ptX(976),_ptY(518));                
                ctx.quadraticCurveTo(_ptX(1009),_ptY(388),_ptX(1003),_ptY(369));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        setTimeout(function(){
                ctx.moveTo(_ptX(951),_ptY(535));                
                ctx.quadraticCurveTo(_ptX(974),_ptY(553),_ptX(995),_ptY(502)); 
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1023),_ptY(419), _ptX(1023),_ptY(512));
        _drawPts(_ptX(1023),_ptY(512),_ptX(1001),_ptY(512));
        _drawPts(_ptX(1001),_ptY(512), _ptX(1001),_ptY(419));
        _drawPts(_ptX(1001),_ptY(419), _ptX(1023),_ptY(419));
        _drawPts(_ptX(1001),_ptY(500), _ptX(989),_ptY(500));
        _drawPts(_ptX(989),_ptY(500), _ptX(989),_ptY(430));
        _drawPts(_ptX(989),_ptY(430), _ptX(1001),_ptY(430));
        _drawPts(_ptX(1023), _ptY(512),_ptX(1071), _ptY(512));
        setTimeout(function(){
                ctx.moveTo(_ptX(1071),_ptY(512));                
                ctx.quadraticCurveTo(_ptX(1075),_ptY(502),_ptX(1083),_ptY(500));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        setTimeout(function(){
                ctx.moveTo(_ptX(1083),_ptY(500));                
                ctx.quadraticCurveTo(_ptX(1087),_ptY(482),_ptX(1083),_ptY(464));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1023), _ptY(419),_ptX(1023), _ptY(512));
        _drawPts(_ptX(1027), _ptY(427),_ptX(1032), _ptY(461));
        _drawPts(_ptX(1032), _ptY(461), _ptX(1058), _ptY(461));
        _drawPts(_ptX(1058), _ptY(461),_ptX(1058), _ptY(427));
        _drawPts(_ptX(1058), _ptY(427),_ptX(1027), _ptY(427));
        _drawPts(_ptX(1060), _ptY(427),_ptX(1060), _ptY(466));
        _drawPts(_ptX(1060), _ptY(466), _ptX(1080), _ptY(466));
        _drawPts(_ptX(1080), _ptY(466), _ptX(1060), _ptY(427));
        _drawPts(_ptX(1040), _ptY(423), _ptX(1077), _ptY(422));
        _drawPts(_ptX(1077), _ptY(422), _ptX(1076), _ptY(472));
        _drawPts(_ptX(1076), _ptY(472), _ptX(1062), _ptY(472));
        _drawPts(_ptX(1070), _ptY(430), _ptX(1080), _ptY(430));
        _drawPts(_ptX(1080), _ptY(430), _ptX(1080), _ptY(467));
        _drawPts(_ptX(1060), _ptY(466), _ptX(1080), _ptY(466));
        _drawPts(_ptX(1080), _ptY(466), _ptX(1060), _ptY(466));
        _drawPts(_ptX(1060), _ptY(466), _ptX(1080), _ptY(466));
        _drawPts(_ptX(1080), _ptY(466), _ptX(1070), _ptY(430));
    };
    
    function _drawStep(startx,starty,cpx1,cpy1,cpx2,cpy2,endx,endy){
        _drawPts(_ptX(startx),_ptY(starty),_ptX(cpx1),_ptX(starty));
        setTimeout(function(){ 
                ctx.moveTo(_ptX(cpx1),_ptY(starty));
                ctx.bezierCurveTo(_ptX(cpx1),_ptY(cpy1),_ptX(cpx2),_ptY(cpy2),_ptX(cpx2),_ptY(endy));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(cpx2),_ptY(endy),_ptX(endx),_ptY(endy));
        _drawPts(_ptX(996),_ptY(550),_ptX(996),_ptY(526));
        _drawPts(_ptX(996),_ptY(526), _ptX(1017),_ptY(526));
        _drawPts(_ptX(1017),_ptY(526), _ptX(1017),_ptY(530));
        _drawPts(_ptX(1017),_ptY(530), _ptX(1067),_ptY(530));
        _drawPts(_ptX(1067),_ptY(530), _ptX(1055),_ptY(526));
        setTimeout(function(){ 
                ctx.moveTo(_ptX(1066),_ptY(starty));
                ctx.bezierCurveTo(_ptX(1066),_ptY(cpy1),_ptX(1066),_ptY(cpy2),_ptX(1066),_ptY(endy));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1066),_ptY(endy), _ptX(1078), _ptY(556));
        _drawPts(_ptX(1078), _ptY(556),_ptX(1027),_ptY(556));
        _drawPts(_ptX(1027),_ptY(556), _ptX(1020), _ptY(553));
        _cabFront();
    };
    
    function _box(){
        _drawPts(_ptX(25), _ptY(308),_ptX(954),_ptY(344));
        _drawPts(_ptX(954),_ptY(344),_ptX(951),_ptY(509));
        _drawPts(_ptX(951),_ptY(509),_ptX(47),_ptY(516));
        _drawPts(_ptX(47),_ptY(516),_ptX(47),_ptY(520));
        _drawPts(_ptX(47),_ptY(520),_ptX(31),_ptY(520));
        _drawPts(_ptX(31),_ptY(520),_ptX(23),_ptY(324));
        _drawPts(_ptX(23),_ptY(324),_ptX(25),_ptY(323));
        _drawPts(_ptX(25),_ptY(323),_ptX(25),_ptY(308));
        _drawPts(_ptX(40),_ptY(310),_ptX(47),_ptY(520));
        ctx.lineWidth = 1.0;
        _drawPts(_ptX(40),_ptY(318),_ptX(954),_ptY(350));
        ctx.lineWidth = 0.05;
        _drawPts(_ptX(948),_ptY(495),_ptX(47),_ptY(496));
        _drawPts(_ptX(47),_ptY(505),_ptX(948),_ptY(503));        
    };
    
    function _sidelights(){
        _drawPts(_ptX(942),_ptY(490),_ptX(929),_ptY(490));
        _drawPts(_ptX(935),_ptY(498),_ptX(920),_ptY(498));
        _drawPts(_ptX(885),_ptY(498),_ptX(869),_ptY(499));
        _drawPts(_ptX(830),_ptY(499),_ptX(813),_ptY(499));
        _drawPts(_ptX(774),_ptY(499),_ptX(758),_ptY(499));
        _drawPts(_ptX(717),_ptY(499),_ptX(700),_ptY(499));
        _drawPts(_ptX(657),_ptY(499),_ptX(639),_ptY(499));
        _drawPts(_ptX(593),_ptY(499),_ptX(574),_ptY(499));
        _drawPts(_ptX(536),_ptY(498),_ptX(517),_ptY(498));
        _drawPts(_ptX(471),_ptY(498),_ptX(451),_ptY(498));
        _drawPts(_ptX(405),_ptY(498),_ptX(384),_ptY(498));
        _drawPts(_ptX(336),_ptY(498),_ptX(315),_ptY(498));
        _drawPts(_ptX(264),_ptY(498),_ptX(242),_ptY(498));
        _drawPts(_ptX(197),_ptY(498),_ptX(175),_ptY(498));
        _drawPts(_ptX(138),_ptY(498),_ptX(114),_ptY(498));
        _drawPts(_ptX(70),_ptY(498),_ptX(47),_ptY(498));
    };
    
    function _panels(){
        _drawPts(_ptX(65),_ptY(318),_ptX(70),_ptY(495));
        _drawPts(_ptX(171),_ptY(323),_ptX(176),_ptY(495));
        _drawPts(_ptX(271),_ptY(328),_ptX(276),_ptY(495));
        _drawPts(_ptX(369),_ptY(333),_ptX(374),_ptY(495));
        _drawPts(_ptX(462),_ptY(335),_ptX(467),_ptY(495));
        _drawPts(_ptX(553),_ptY(340),_ptX(558),_ptY(495));
        _drawPts(_ptX(637),_ptY(343),_ptX(642),_ptY(495));
        _drawPts(_ptX(719),_ptY(344),_ptX(724),_ptY(495));
        _drawPts(_ptX(797),_ptY(346),_ptX(802),_ptY(495));
        _drawPts(_ptX(873),_ptY(349),_ptX(878),_ptY(496));
        _drawPts(_ptX(948),_ptY(349),_ptX(945),_ptY(496));
    };
    
    function _cab(){
        _drawStep(996,526,1008,530,1008,546,996,550);
    };
    
    function _hiddenTrucks(x,y){
        _drawPts(_ptX(x),_ptY(y), _ptX(x), _ptY(y)+_ptY(5));
        _drawPts(_ptX(x), _ptY(y)+_ptY(5), _ptX(x)+_ptX(15), _ptY(y)+_ptY(5));
        _drawPts(_ptX(x)+_ptX(15), _ptY(y)+_ptY(5), _ptX(x)+_ptX(16), _ptY(y));
        
        _drawPts(_ptX(x)+_ptX(-2), _ptY(y), _ptX(x)+_ptX(-2), _ptY(y)+_ptY(14));
        _drawPts(_ptX(x)+_ptX(-2), _ptY(y)+_ptY(14), _ptX(x)+_ptX(8), _ptY(y)+_ptY(19));
        _drawPts(_ptX(x)+_ptX(8), _ptY(y)+_ptY(19), _ptX(x)+_ptX(12), _ptY(y)+_ptY(8));
        _drawPts(_ptX(x)+_ptX(12), _ptY(y)+_ptY(8), _ptX(x)+_ptX(15), _ptY(y)+_ptY(18));
        
        _drawPts(_ptX(x)+_ptX(18), _ptY(y)+_ptY(31), _ptX(x)+_ptX(36), _ptY(y)+_ptY(31));
        _drawPts(_ptX(x)+_ptX(36), _ptY(y)+_ptY(31), _ptX(x)+_ptX(36), _ptY(y)+_ptY(17));
        _drawPts(_ptX(x)+_ptX(36), _ptY(y)+_ptY(17), _ptX(x)+_ptX(105), _ptY(y)+_ptY(17));
        _drawPts(_ptX(x)+_ptX(105), _ptY(y)+_ptY(17), _ptX(x)+_ptX(105), _ptY(y)+_ptY(32));
        _drawPts(_ptX(x)+_ptX(105), _ptY(y)+_ptY(32), _ptX(x)+_ptX(22), _ptY(y)+_ptY(32));
        _drawPts(_ptX(x)+_ptX(22), _ptY(y)+_ptY(32), _ptX(x)+_ptX(22), _ptY(y)+_ptY(2));
        
        _drawPts(_ptX(x)+_ptX(67), _ptY(y)+_ptY(2), _ptX(x)+_ptX(67), _ptY(y)+_ptY(9));
        _drawPts(_ptX(x)+_ptX(67), _ptY(y)+_ptY(9), _ptX(x)+_ptX(80), _ptY(y)+_ptY(9));
        _drawPts(_ptX(x)+_ptX(80), _ptY(y)+_ptY(9), _ptX(x)+_ptX(80), _ptY(y)+_ptY(2));
        _drawPts(_ptX(x)+_ptX(80), _ptY(y)+_ptY(2), _ptX(x)+_ptX(67), _ptY(y)+_ptY(2));
    };
    
    function _drawHiddenTrucks(){
        _hiddenTrucks(362,517);
        _hiddenTrucks(508,514);
        _hiddenTrucks(636,512);
    };
    
    function _underCarriage(){
        setTimeout(function(){
                ctx.moveTo(_ptX(677),_ptY(512));                
                ctx.quadraticCurveTo(_ptX(737),_ptY(530),_ptX(767),_ptY(512));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(732),_ptY(512), _ptX(732), _ptY(566));
        _drawPts(_ptX(732),_ptY(566), _ptX(742), _ptY(566));
        _drawPts(_ptX(742), _ptY(566), _ptX(742), _ptY(512));
        _drawPts(_ptX(702),_ptY(522), _ptX(732),_ptY(552));
        _drawPts(_ptX(765),_ptY(516), _ptX(742),_ptY(552));
        _drawPts(_ptX(703),_ptY(522), _ptX(703), _ptY(560));
        _drawPts(_ptX(703),_ptY(560), _ptX(711), _ptY(560));
        _drawPts(_ptX(711), _ptY(560), _ptX(703), _ptY(522));
        _drawPts(_ptX(83), _ptY(515), _ptX(55), _ptY(550));
        _drawPts(_ptX(55), _ptY(550), _ptX(66), _ptY(550));
        _drawPts(_ptX(55), _ptY(550), _ptX(99), _ptY(515));
        _drawPts(_ptX(37), _ptY(561), _ptX(83), _ptY(546));
    };
    
    function _drawSideTrucks(){
        _drawPts(_ptX(1062),_ptY(410), _ptX(1117),_ptY(410));
        _drawPts(_ptX(1117),_ptY(410), _ptX(1122),_ptY(476));
        
        _drawPts(_ptX(1062),_ptY(418), _ptX(1111),_ptY(472));
        _drawPts(_ptX(1111),_ptY(472), _ptX(1111),_ptY(470));
        
        _drawPts(_ptX(1118), _ptY(410), _ptX(1185),_ptY(410));
        setTimeout(function(){
                ctx.moveTo(_ptX(1185),_ptY(410));                
                ctx.quadraticCurveTo(_ptX(1178),_ptY(412),_ptX(1185),_ptY(448));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        setTimeout(function(){
                ctx.moveTo(_ptX(1126),_ptY(475));                
                ctx.quadraticCurveTo(_ptX(1130),_ptY(450),_ptX(1203),_ptY(451));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1203), _ptY(451), _ptX(1218),_ptY(478));
        _drawPts(_ptX(1218), _ptY(478), _ptX(1241),_ptY(493));
        _drawPts(_ptX(1241), _ptY(493), _ptX(1244),_ptY(521));
        _drawPts(_ptX(1244), _ptY(521), _ptX(1175),_ptY(521));
        setTimeout(function(){
                ctx.moveTo(_ptX(1175),_ptY(521));                
                ctx.quadraticCurveTo(_ptX(1161.5),_ptY(494),_ptX(1148),_ptY(509));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawCir(1159,522,13.5);
        setTimeout(function(){
                ctx.moveTo(_ptX(1240),_ptY(524));                
                ctx.quadraticCurveTo(_ptX(1224),_ptY(544),_ptX(1210),_ptY(530));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawPts(_ptX(1158), _ptY(447), _ptX(1159),_ptY(447));
        _drawPts(_ptX(1161), _ptY(447), _ptX(1163),_ptY(447));
        _drawPts(_ptX(1165), _ptY(447), _ptX(1167),_ptY(447));
        _drawPts(_ptX(1169), _ptY(447), _ptX(1171),_ptY(447));
        _drawPts(_ptX(1218), _ptY(513), _ptX(1229),_ptY(513));
        _drawPts(_ptX(1229), _ptY(513), _ptX(1229),_ptY(520));
        _drawPts(_ptX(1229), _ptY(520), _ptX(1218),_ptY(520));
        _drawPts(_ptX(1218), _ptY(520), _ptX(1218),_ptY(513));
        _drawPts(_ptX(1176), _ptY(499), _ptX(1179),_ptY(505));
        _drawPts(_ptX(1179), _ptY(505), _ptX(1197),_ptY(505));
        _drawPts(_ptX(1197), _ptY(505), _ptX(1176),_ptY(499));
        _drawPts(_ptX(1204), _ptY(493), _ptX(1206),_ptY(509));
        _drawPts(_ptX(1206), _ptY(509), _ptX(1239),_ptY(509));
        _drawPts(_ptX(1239), _ptY(509), _ptX(1241),_ptY(493));
        _drawPts(_ptX(1241), _ptY(493), _ptX(1204),_ptY(493));
        
        _drawPts(_ptX(1210), _ptY(496), _ptX(1212),_ptY(496));
        _drawPts(_ptX(1210), _ptY(498), _ptX(1212),_ptY(498));
        _drawPts(_ptX(1210), _ptY(500), _ptX(1212),_ptY(500));
        _drawPts(_ptX(1210), _ptY(502), _ptX(1212),_ptY(502));
        
        _drawPts(_ptX(1213), _ptY(496), _ptX(1217),_ptY(496));
        _drawPts(_ptX(1213), _ptY(498), _ptX(1217),_ptY(498));
        _drawPts(_ptX(1213), _ptY(500), _ptX(1217),_ptY(500));
        _drawPts(_ptX(1213), _ptY(502), _ptX(1217),_ptY(502));
        
        _drawPts(_ptX(1218), _ptY(496), _ptX(1220),_ptY(496));
        _drawPts(_ptX(1218), _ptY(498), _ptX(1220),_ptY(498));
        _drawPts(_ptX(1218), _ptY(500), _ptX(1220),_ptY(500));
        _drawPts(_ptX(1218), _ptY(502), _ptX(1220),_ptY(502));
        
        _drawPts(_ptX(1218), _ptY(478), _ptX(1160),_ptY(478));
        _drawPts(_ptX(1160), _ptY(478), _ptX(1154),_ptY(456));
        _drawPts(_ptX(1154), _ptY(456), _ptX(1203),_ptY(456));
        
        _drawPts(_ptX(1134), _ptY(459), _ptX(1134),_ptY(479));
        _drawPts(_ptX(1134), _ptY(479), _ptX(1150),_ptY(479));
        _drawPts(_ptX(1150), _ptY(479), _ptX(1148),_ptY(459));
        _drawPts(_ptX(1148), _ptY(459), _ptX(1134),_ptY(459));
        
        _drawPts(_ptX(1126), _ptY(410), _ptX(1268),_ptY(400));
        _drawPts(_ptX(1268),_ptY(400), _ptX(1268), _ptY(496));
        _drawPts(_ptX(1268),_ptY(496), _ptX(1242), _ptY(496));
        _drawPts(_ptX(1268),_ptY(400), _ptX(1337), _ptY(404));
        _drawPts(_ptX(1337),_ptY(404), _ptX(1335), _ptY(449));//rightmost edge of rightmost box
        _drawPts(_ptX(1201),_ptY(450), _ptX(1201), _ptY(424));
        _drawPts(_ptX(1201),_ptY(424), _ptX(1229), _ptY(424));
        _drawPts(_ptX(1229),_ptY(424), _ptX(1224), _ptY(482));
        
        _drawPts(_ptX(1357),_ptY(454), _ptX(1369), _ptY(482)); // window lower right
        _drawPts(_ptX(1369), _ptY(482), _ptX(1310),_ptY(482));
        _drawPts(_ptX(1310),_ptY(482), _ptX(1304), _ptY(454));
        _drawPts(_ptX(1304), _ptY(454), _ptX(1357),_ptY(454));
        
        _drawPts(_ptX(1284),_ptY(454), _ptX(1300), _ptY(454)); // left window
        _drawPts(_ptX(1300), _ptY(454), _ptX(1302),_ptY(479));
        _drawPts(_ptX(1302),_ptY(479), _ptX(1284), _ptY(479));
        _drawPts(_ptX(1284), _ptY(479), _ptX(1284),_ptY(454));
        
        _drawPts(_ptX(1357),_ptY(450), _ptX(1300), _ptY(450)); 
        _drawPts(_ptX(1300), _ptY(450), _ptX(1279),_ptY(450));
        _drawPts(_ptX(1279),_ptY(450), _ptX(1272), _ptY(508));
        _drawPts(_ptX(1272), _ptY(508), _ptX(1294),_ptY(508));
        // tire
        setTimeout(function(){
                ctx.moveTo(_ptX(1294),_ptY(508));                
                ctx.quadraticCurveTo(_ptX(1310),_ptY(494),_ptX(1329),_ptY(526));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        _drawCir(1310,522,17.5);
        
        _drawPts(_ptX(1329),_ptY(526), _ptX(1397), _ptY(526)); // grill
        _drawPts(_ptX(1397),_ptY(526), _ptX(1397), _ptY(495));
        _drawPts(_ptX(1397),_ptY(495), _ptX(1369), _ptY(482));
        
        _drawPts(_ptX(1357),_ptY(493), _ptX(1392), _ptY(493)); 
        _drawPts(_ptX(1392), _ptY(493), _ptX(1389),_ptY(510));
        _drawPts(_ptX(1389),_ptY(510), _ptX(1357), _ptY(510));
        _drawPts(_ptX(1357), _ptY(510), _ptX(1357),_ptY(493));
        
        _drawPts(_ptX(1360), _ptY(496), _ptX(1362),_ptY(496));
        _drawPts(_ptX(1360), _ptY(498), _ptX(1362),_ptY(498));
        _drawPts(_ptX(1360), _ptY(500), _ptX(1362),_ptY(500));
        _drawPts(_ptX(1360), _ptY(502), _ptX(1362),_ptY(502));
        
        _drawPts(_ptX(1363), _ptY(496), _ptX(1367),_ptY(496));
        _drawPts(_ptX(1363), _ptY(498), _ptX(1367),_ptY(498));
        _drawPts(_ptX(1363), _ptY(500), _ptX(1367),_ptY(500));
        _drawPts(_ptX(1363), _ptY(502), _ptX(1367),_ptY(502));
        
        _drawPts(_ptX(1368), _ptY(496), _ptX(1370),_ptY(496));
        _drawPts(_ptX(1368), _ptY(498), _ptX(1370),_ptY(498));
        _drawPts(_ptX(1368), _ptY(500), _ptX(1370),_ptY(500));
        _drawPts(_ptX(1368), _ptY(502), _ptX(1370),_ptY(502)); // grill
        
        _drawPts(_ptX(1372), _ptY(515), _ptX(1381),_ptY(515)); // license plate
        _drawPts(_ptX(1381), _ptY(515), _ptX(1381),_ptY(521));
        _drawPts(_ptX(1381), _ptY(521), _ptX(1372),_ptY(521));
        _drawPts(_ptX(1372), _ptY(521), _ptX(1372),_ptY(515));
        
        _drawPts(_ptX(1328), _ptY(499), _ptX(1328),_ptY(505)); // headlight
        _drawPts(_ptX(1328), _ptY(505), _ptX(1348),_ptY(505));
        _drawPts(_ptX(1348), _ptY(505), _ptX(1328),_ptY(499));
        
        // hidden tire
        setTimeout(function(){
                ctx.moveTo(_ptX(1389),_ptY(528));                
                ctx.quadraticCurveTo(_ptX(1374),_ptY(544),_ptX(1356),_ptY(530));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
    };
    
    function _drawBuilding(){
        _drawPts(_ptX(0),_ptY(287), _ptX(10),_ptY(290));
        _drawPts(_ptX(10),_ptY(290), _ptX(10),_ptY(266));
        _drawPts(_ptX(10),_ptY(266), _ptX(34),_ptY(277));
        _drawPts(_ptX(34),_ptY(277), _ptX(34),_ptY(252));
        _drawPts(_ptX(34),_ptY(252), _ptX(56),_ptY(263));
        _drawPts(_ptX(56),_ptY(263), _ptX(55),_ptY(240));
        _drawPts(_ptX(55),_ptY(240), _ptX(75),_ptY(252));
        _drawPts(_ptX(75),_ptY(252), _ptX(75),_ptY(230));
        _drawPts(_ptX(75),_ptY(230), _ptX(100),_ptY(246));
        _drawPts(_ptX(100),_ptY(246), _ptX(99),_ptY(265));
        _drawPts(_ptX(99),_ptY(265), _ptX(118),_ptY(274));
        _drawPts(_ptX(118),_ptY(274), _ptX(117),_ptY(294));
        _drawPts(_ptX(117),_ptY(294), _ptX(133),_ptY(301));
        _drawPts(_ptX(133),_ptY(301), _ptX(133),_ptY(311));
        _drawPts(_ptX(0),_ptY(247), _ptX(54),_ptY(247));
        
        _drawPts(_ptX(0),_ptY(342), _ptX(26),_ptY(351));
        _drawPts(_ptX(0),_ptY(354), _ptX(27),_ptY(363));
        _drawPts(_ptX(0),_ptY(370), _ptX(26),_ptY(375));
        _drawPts(_ptX(0),_ptY(381), _ptX(27),_ptY(386));
        _drawPts(_ptX(0),_ptY(389), _ptX(27),_ptY(393));
        _drawPts(_ptX(0),_ptY(403), _ptX(28),_ptY(407));
        _drawPts(_ptX(0),_ptY(420), _ptX(29),_ptY(424));
        _drawPts(_ptX(0),_ptY(436), _ptX(30),_ptY(438));
        _drawPts(_ptX(0),_ptY(447), _ptX(30),_ptY(449));
        _drawPts(_ptX(0),_ptY(573), _ptX(124),_ptY(539));
        
        _drawPts(_ptX(0),_ptY(504), _ptX(18),_ptY(461));
        _drawPts(_ptX(3),_ptY(534), _ptX(30),_ptY(475));
        _drawPts(_ptX(0),_ptY(535), _ptX(11),_ptY(535));
        _drawPts(_ptX(11),_ptY(535), _ptX(7),_ptY(573));
        _drawPts(_ptX(7),_ptY(573), _ptX(0),_ptY(573));
    };
    
    function _drawWires(){
        _drawPts(_ptX(242),_ptY(317), _ptX(237),_ptY(188));
        _drawPts(_ptX(237),_ptY(188), _ptX(0),_ptY(242));
        _drawPts(_ptX(237),_ptY(188), _ptX(1509),_ptY(316));
        
        _drawPts(_ptX(237),_ptY(237), _ptX(108),_ptY(268));
        _drawPts(_ptX(237),_ptY(237), _ptX(1509),_ptY(385));
        _drawPts(_ptX(237),_ptY(212), _ptX(164),_ptY(311));
        
        _drawPts(_ptX(237),_ptY(188), _ptX(239),_ptY(178));
        setTimeout(function(){
                ctx.moveTo(_ptX(220),_ptY(197));                
                ctx.quadraticCurveTo(_ptX(239),_ptY(178),_ptX(257),_ptY(197));
                ctx.stroke();
        },counter);
        counter += (frame_count*frame_rate);
        
    };
    
    function _drawPosts(x,y){
        _drawPts(_ptX(x),_ptY(y), _ptX(x)+_ptX(12),_ptY(y));
        _drawPts(_ptX(x)+_ptX(12),_ptY(y), _ptX(x)+_ptX(12),_ptY(y)+_ptY(94));
        _drawPts(_ptX(x)+_ptX(12),_ptY(y)+_ptY(94), _ptX(x),_ptY(y)+_ptY(94));
        _drawPts(_ptX(x),_ptY(y)+_ptY(94), _ptX(x),_ptY(y));
        
        setTimeout(function(){ 
            var handle = setInterval(function(){ 
                    ctx.fillRect(_ptX(x),_ptY(y), _ptX(12),_ptY(94));
                    clearInterval(handle);
                    handle = 0;
            },frame_rate);
        }, counter);
        counter += (frame_count*frame_rate);
        
    };
    
    function _drawFence(){
        _drawPts(_ptX(0),_ptY(572), _ptX(1509),_ptY(572));
        _drawPts(_ptX(0),_ptY(592), _ptX(1509),_ptY(592));
        _drawPts(_ptX(0),_ptY(620), _ptX(1509),_ptY(620));
        _drawPts(_ptX(0),_ptY(640), _ptX(1509),_ptY(640));
        _drawPosts(223,564);
        _drawPosts(508,564);
        _drawPosts(774,564);
        _drawPosts(1002,564);
        _drawPosts(1228,564);
        _drawPosts(1426,564);
        _clear_canvas();
    };
    
    // The init module will obtain what amounts to a global ref to the cavas context to be exported to other modules
    // for the application to use as a whole. 
    function setContext(context){
        ctx = context;
    };
    function setContext2(context){
        ctx2 = context;
    };
    
    function _draw(){ 
        ctx2.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 0.05;
        ctx.beginPath();
        _box();
        ctx.lineWidth = 1.0;
        _sidelights();
        ctx.lineWidth = 0.05;
        _panels();
        _cab();
        _tires();
        _drawHiddenTrucks();
        _underCarriage();
        _drawSideTrucks();
        _drawBuilding();
        _drawWires();
        _drawFence();
    };
    
    function render(){
        _draw();
        /*
        setTimeout(function(){
            //ctx.canvas.style.opacity = 1.0;
            ctx2.canvas.style.opacity = 0;
            var accum = 0.02;
            ctx2.drawImage(c2image,0,0,1556,667,0,0,ctx2.canvas.width,ctx2.canvas.height);
            var handle = setInterval(function(){
                //ctx.canvas.style.opacity -= 0.02;
                ctx2.canvas.style.opacity = accum;
                accum += 0.02;
                if(ctx2.canvas.style.opacity >= 1.0){
                    clearInterval(handle);
                    handle = 0;
                }
            },50);
        },5625);*/
    };
    
    return{
        init:init,
        setContext: setContext,
        setContext2: setContext2,
        render: render,
        get_status:get_status,
        set_status:set_status
    };
})();


// Images
// 00.png 1556 * 667
// 01.png 1600 * 457
// 02.png 799 * 635