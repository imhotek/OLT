'use strict';

var init = (function(){
    
    // Cache DOM 
    var $body = $("body");
    var $beep = new Audio("sound/beep.wav");
    $beep.volume = 0.25;
    var $click = new Audio("sound/click.mp3");
    $click.volume = 0.125;
    var $container = $body.find("#container");
    var $nav = $body.find("#nav");
    var $nav_class = $body.find(".nav_button");
    var $header = $body.find("#header");
    var $logo_link = $body.find("#logo_link");
    var $pic_frame = $body.find("#pic_frame");
    var $pic_box = $body.find("#pic_box");
    var $pic_box2 = $body.find("#pic_box2");
    var $pic_class = $body.find(".pic_switcher");
    var $main = $body.find("#main");
    var $footer = $body.find("#footer");
    
    function _setPage(){
        $body.css({
            "min-height" : "100vh"//(2*height)+"px"
        });
        $container.css({
            "min-height" : "100vh",//(2*height)+"px",
            "overflow-x" : "hidden"
        });
        $header.css({
            "width" : "100vw",//"100%",
            "height" : "30vh"//height*0.15+"px"
        });
        $logo_link.click(function(){
            window.location.href = "index.html";
            $beep.play();
        });
        $nav_class.hover(function(){
            $(this).css({"background-color" : "#52565b", "cursor" : "pointer", "font-size" : "5.5vh"});
            $click.play();
        }).mouseleave(function(){
            $(this).css({"background-color" : "black", "font-size" : "5vh"});
            $click.pause();
        }).click(function(){
            $beep.play();
            events.removeAll();
        });
        // redirect from buttons
        $nav.find('#apply').click(function(){
            window.location.href = "apply.html";
        });
        
        $nav.find('#signin').click(function(){
            window.location.href = "apply.html";
        });
        
        $pic_frame.css({
            "min-width" : "75vw",//(width*0.75)+"px",
            "min-height" : "40vh",//(height*0.4)+"px",
            "background-image" : "url('pics/frame.png')",
            "background-repeat": "no-repeat",
            "background-size" : "100% 100%"//"75vw 40vh"//"100% 100%"
        });
        $pic_class.css({
            "width" : "75vw",//(width*0.75)+"px",
            "height" : "40vh",//(height*0.4)+"px",
            "background-repeat": "no-repeat",
            "background-size" : "75vw 40vh"//"100% 100%"
        });
        $main.css({
            "width" : "75vw",//(width*0.75)+"px",
            "min-height" : "75vh",//(height*0.75)+"px",
            "border-radius" : "5px"
        });
        $footer.css({
            "width" : "100vw",//100%",
            "height" : "20vh"//(height*0.15)/2+"px"
        });
        _registerEvents();
        window.addEventListener("scroll", function(){
            events.emit('yScroll');
        });
    }
    
    function _scroll(){
        if(window.pageYOffset > 15){
                    $header.css({
                        "z-index" : "50",
                        "height" : "15vh",
                        "position" : "fixed"
                    });
                    $logo_link.attr("src", "pics/collapsed_logo.png");
                    $logo_link.css({
                        "width" : "10%",
                        "height" : "37.5%"
                    });
                    $nav.css({
                        "height" : "50%",
                        "min-width" : "15%"
                    });
                    $nav_class.css({
                        "height" : "95%",
                        "width" : "15%",
                        "font-size" : "3.5vh"
                    }).hover(function(){
                        $(this).css({"background-color" : "#52565b", "cursor" : "pointer", "font-size" : "4.25vh"});
                        $click.play();
                    }).mouseleave(function(){
                        $(this).css({"background-color" : "black", "font-size" : "3.5vh"});
                        $click.pause();
                    }).click(function(){
                        $beep.play();
                    });
                }else{
                    $header.css({
                        "z-index" : "1",
                        "height" : "30vh",
                        "position" : "static"
                    });
                    $logo_link.attr("src", "pics/logo_link.png");
                    $logo_link.css({
                        "width" : "20%",
                        "height" : "75%"
                    });
                    $nav.css({
                        "height" : "100%",
                        "min-width" : "50%"
                    });
                    $nav_class.css({
                        "height" : "75%",
                        "width" : "20%",
                        "font-size" : "5vh"
                    }).hover(function(){
                        $(this).css({"background-color" : "#52565b", "cursor" : "pointer", "font-size" : "5.5vh"});
                        $click.play();
                    }).mouseleave(function(){
                        $(this).css({"background-color" : "black", "font-size" : "5vh"});
                        $click.pause();
                    }).click(function(){
                        $beep.play();
                    });
                }
    }
    
    function _registerEvents(){
        events.on('yScroll', _scroll);
    }
    
    function _imageSwitcher(){
        var counter = 0;
        var swap = true;
        var pics = ["pics/00.png","pics/01.png","pics/02.png"];
        $pic_box.css("background-image", "url("+pics[counter]+")")
                .animate({opacity: 1}, {duration: 5000 }).animate({opacity: 0}, {duration: 5000 });
        setInterval(function(){
            counter += 1;
            if(swap){
                if(counter%2 === 0){  
                    $pic_box.css({"background-image" : "url("+pics[counter]+")", "opacity": "0.0"})
                            .animate({opacity: 1}, {duration: 5000 }).animate({opacity: 0}, {duration: 5000 }); 
                }else{   
                    $pic_box2.css({"background-image" : "url("+pics[counter]+")", "opacity": "0.0"})
                            .animate({opacity: 1}, {duration: 5000 }).animate({opacity: 0}, {duration: 5000 }); 
                }  
                if(counter === 2){
                    counter = -1;
                    swap = false;
                }
            }else if(!swap){
                if(counter%2 === 0){  
                    $pic_box2.css({"background-image" : "url("+pics[counter]+")", "opacity": "0.0"})
                            .animate({opacity: 1}, {duration: 5000 }).animate({opacity: 0}, {duration: 5000 }); 
                }else{   
                    $pic_box.css({"background-image" : "url("+pics[counter]+")", "opacity": "0.0"})
                            .animate({opacity: 1}, {duration: 5000 }).animate({opacity: 0}, {duration: 5000 }); 
                }  
                if(counter === 2){
                    counter = -1;
                    swap = true;
                }
            }
        },7000);
    };
    
    function render(){
        _setPage();
        content_fill.render();
        _imageSwitcher();/*
	var data0 = {
		first_name : "Deontay", last_name : "Wilson", age : 37	
	};
	var data = JSON.stringify(data0);
	$.ajax({type: "POST", url:"http://localhost:6379", data: data, 
		error: function(){alert("Error!");},
        	success: function(data){ alert("Sent back: "+data); }});*/
    }
    
    return{
        render : render
    };
    
})();


