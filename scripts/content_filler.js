'use strict';

var content_fill = (function(){
    
    var $body = $("body");
    var $main = $body.find("#main");
    var $footer = $body.find("#footer");
    
    function _content_scroll(){
        $main.find('.content_class').each(function(i){
            var offset = $(this).offset().top/8; 
            if($(document).scrollTop() > offset){
                $(this).css({
                   "height" : "25vh",
                   "width" : "70vw",
                   "margin" : "2vh 2vw"
                });
                $(this).find('#content_pic_div_1').animate({opacity:1.0},{duration: 750});
                $(this).find('#content_pic_div_2').animate({opacity:1.0},{duration: 750});
                $(this).find('#content_pic_div_3').animate({opacity:1.0},{duration: 750});
                $(this).find('.content_pics').css({
                    "height" : "95%",
                    "width" : "25%",
                    "margin" : "1.5% 1.5%"
                });
                $(this).find('#content_text_div_1').html("Since 1984, O.L. Thompson Transport Service Inc. has been a contractor to the United States Postal Service. We deliver locally and take great pride in delivering mail safely and on time.");
                $(this).find('#content_text_div_2').html("Our drivers are our company's most valued assets. O.L. Thompson Transport Service Inc. has been honored with several Eagle Spirit Awards over the years from the postal service.");
                $(this).find('#content_text_div_3').html("Our mission is to work well with our partners and to give exceptional service to our customers in a safe and responsible manner.");
                $(this).find('.content_text').css({
                    "height" : "50%",
                    "width" : "70%"
                });
            }
        });
        $footer.find('#foot_div').each(function(i){
            var offset = $(this).offset().top/8; 
            if($(document).scrollTop() > offset){
                $(this).css({
                   "height" : "18vh",
                   "width" : "80vw",
                   "margin" : "2vh 2vw"
                });
                $(this).find('#contact_div').css({
                    "height" : "95%",
                    "width" : "25%",
                    "margin" : "0.45v 0.8vw"
                }).html("<br />O.L. Thompson Transport<br />1351 Brandon Rd.<br />Rockdale, IL 60436<br />(815) 726-2569");
                $(this).find('#copyright_div').css({
                    "height" : "20%",
                    "width" : "65%",
                    "margin" : "14.4vh 0vw 0.45vh 0.8vw"
                }).html("COPYRIGHT &copy 1984-2018 O.L. Thompson Transport Services Inc.");
                $(this).find('#imhotek_div').css({
                    "height" : "95%",
                    "width" : "17.5%",
                    "margin" : "0.45vh 0vw 0.45vh 0.8vw"
                });
                $(this).find('#imhotek_div > #powered_by, #imhotek_gif').css({
                    "height" : "25%",
                    "width" : "100%",
                    "background-size" : "100% 100%",
                    "opacity": "1.0"
                });
                $(this).find('#imhotek_div > #imhotek_canvas').css({
                    "height" : "50%",
                    "width" : "100%",
                    "background-size" : "100% 100%",
                    "opacity": "1.0"                   
                });
            }
        });
        events.off('yScroll',this);        
    }
    
    function _registerEvents(){
        events.on('yScroll', _content_scroll);
    }
    
    function render(){
        _registerEvents();
    }
    
    return {
        render : render
    };
    
})();