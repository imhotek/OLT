'use strict';

var exec = (function(){
    
    var username, password;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var $body = $("body");
    var $content, $loader, $panel;
    var $media_wrapper = null;
    var $panel_wrapper = null;
    var player_deployed = false;
    var panel_deployed = false;
    var ctx = null;
    var applicant_array = new Array();
    var applicants_loaded = false;
    var employee_array = new Array();
    var employees_loaded = false;
    var applicant_profile_page = null;
    var employee_profile_page = null;
    
    function _init_wrapper(){
        var $wrap = $body.find("#wrapper");
        $wrap.css({
            "position":"absolute",
            "width":width+"px",
            "height":height+"px"
        });
    }   
    function _init_welcome(){
        var $wel = $body.find("#welcome");
        $wel.text("welcome back, "+username);
        $wel.css({
            "width":"20%",
            "margin":((height*0.1)*0.1)+"px "+(width*0.1)+"px "+((height*0.1)*0.1)+"px "+(width*0.025)+"px"
        });
    } 
    function _init_nav(){
        var $nav = $body.find("#nav");
        $nav.css({
            "position":"relative",
            "width":width+"px",
            "height":(height*0.1)+"px",
            "top":(-height*0.1)+"px",
            "left":"0px",
            "background-color":"black",
            "padding-bottom":"2vh"
        });
        $nav.find("div").addClass("nav_buttons");
        $nav.find("div:first-child").nextAll().css({"width":"10%"});
        $nav.animate({"top":"0px"},500);
    }
    function _init_backgrounds(){
        $content = $body.find("#content_background");
        $loader = $body.find("#loader");
        $panel = $body.find("#side_panel");
        $content.css({
            "position":"absolute",
            "width":width+"px",
            "height":(height*0.9)+"px",
            "z-index":"-1"
        });
        $loader.css({
            "position":"absolute",
            "background-color": "#33ffff",
            "border-radius": "5px",
            "left":(width*0.025)+"px",
            "top":(height*0.05)+"px",
            "display":"flex",
            "flex-flow":"column",
            "justify-content":"flex-start",
            "align-items":"flex-start",
            "min-width":(width*0.7)+"px",
            "min-height":2*(height*0.8)+"px",
            "opacity":"0"
        });
        $loader.animate({"opacity":"1"},750);
        $panel.css({
            "width":(width*0.215)+"px",
            "height":(height*0.8)+"px",
            "left":(width*0.775)+"px",
            "top":(height*0.05)+"px"
        });
        $panel.addClass("backgrounds");
        $panel.animate({"opacity":"1"},750);
    }
    function _init_foreground(){
        var $content = $body.find("#content_foreground");
        $content.css({
            "position":"absolute",
            "width":width+"px",
            "height":(height*0.9)+"px",
            "z-index":"2"
        });
    }
    function _init_media(){
        $media_wrapper = $body.find("#media_wrapper");
        var $screen = $body.find("#screen");
        var $control_panel = $body.find("#control_panel");   
        $media_wrapper.css({
            "position":"absolute",
            "width":(width*0.7)+"px",
            "height":(height*0.8)+"px",
            "left":0-(width*0.7)+"px",
            "top":(height*0.05)+"px"
        });
        ctx = $screen.find("canvas")[0].getContext("2d");
        $screen.css({
            "position":"relative",
            "width":(width*0.7)+"px",
            "height":((height*0.8)*0.85)+"px"
        });
        $control_panel.css({
            "position":"relative",
            "display":"inline-block",
            "width":(width*0.7)+"px",
            "height":((height*0.8)*0.15)+"px",
            "background-color":"#A9A9A9",
            "text-align":"center"
        });
    }
    function _set_control_dimens(elem){
        elem[0].setAttribute("height",((height*0.8)*0.1));
        elem[0].setAttribute("width",((width*0.7)*0.1));
        elem.parent().css({
            "margin-top":((height*0.8)*0.025)+"px",
            "cursor":"all-scroll"
        });
    }
    function _set_back_button(){
        var $back = $media_wrapper.find("#back").find("img");
        _set_control_dimens($back);
    }
    function _set_start_stop_button(){
        var $start_stop = $media_wrapper.find("#start_stop").find("img");
        _set_control_dimens($start_stop);
        $start_stop.parent().css({
            "margin-left":((width*0.7)*0.025)+"px",
            "margin-right":((width*0.7)*0.025)+"px"
        });
        $start_stop.parent().click(function(){
            if($start_stop[0].src === "pics/record.png"){
                $start_stop[0].setAttribute("src","pics/stop.png");
            }else{
                $start_stop[0].setAttribute("src","pics/record.png");
            }
        });
    }
    function _set_forward_button(){
        var $forward = $media_wrapper.find("#forward").find("img");
        _set_control_dimens($forward);
    }
    function _set_expand(){
        var $expand = $media_wrapper.find("#expand").find("img");
        _set_control_dimens($expand);
        $expand.parent().css({
            "float":"right"
        });
    }
    function _set_controls(){
        _set_back_button();
        _set_start_stop_button();
        _set_forward_button();
        _set_expand();
    }
    function _init_canvas(){
        var w = (width*0.7);
        var h = ((height*0.8)*0.85);
        ctx.canvas.setAttribute("width",w+"px");
        ctx.canvas.setAttribute("height",h+"px");
        ctx.canvas.style.backgroundColor = "black";
    }
    function _init_panel(){  
        $panel_wrapper = $body.find("#panel"); 
        $panel_wrapper.css({
            "position":"relative",
            "display":"block",
            "padding-top":((height*0.8)*0.00625)+"px",
            "width":(width*0.215)+"px",
            "height":(height*0.8)+"px",
            "left":width+"px",
            "top":(height*0.05)+"px",
            "border-radius":"5px",
            "background-color":"black"
        });
        
    }
    function _add_details(obj){
        var details = document.createElement("div");
        details.setAttribute("class","details");
        details.style.position = "absolute";
        details.style.left = ((width*0.2)*0.3)+"px";
        details.style.width = ((width*0.2)*0.7)+"px";
        details.style.height = ((height*0.8)*0.1)+"px";
        details.style.borderRadius = "2.5px";
        var name = document.createElement("p");
        name.style.textAlign = "center";
        var name_text = document.createTextNode(obj["last_name"]+", "+obj["first_name"]);
        name.appendChild(name_text);
        var phone = document.createElement("p");
        phone.style.textAlign = "center";
        var phone_text = document.createTextNode(obj["phone"]);
        phone.appendChild(phone_text);
        var position = document.createElement("p");
        position.style.textAlign = "center";
        var pos_name = document.createTextNode(obj["position"]);
        position.appendChild(pos_name);
        details.appendChild(name);
        details.appendChild(phone);
        details.appendChild(position);
        details.style.font = "2.25vh bold tahoma";
        return details;
    }
    function _add_avatar(obj){
        var avatar = document.createElement("div");
        avatar.setAttribute("class","avatar");
        avatar.style.position = "absolute";
        avatar.style.width = ((width*0.2)*0.3)+"px";
        avatar.style.height = ((height*0.8)*0.1)+"px";
        var profile_pic = (obj["profile_pic"] ? obj["profile_pic"] :"pics/avatar.png");
        avatar.style.backgroundImage = "url('"+profile_pic+"')";
        avatar.style.backgroundPosition = "center center";
        avatar.style.backgroundRepeat = "no-repeat";
        avatar.style.backgroundSize = "contain";
        avatar.style.borderRight = "1px solid black";
        return avatar;
    }
    function _build_label(obj){
        var label = document.createElement("div");
        label.setAttribute("id",obj["username"]);
        label.setAttribute("class","label");
        label.style.width = (width*0.2)+"px";
        label.style.height = ((height*0.8)*0.1)+"px";
        label.style.marginTop = ((height*0.8)*0.003125)+"px";
        label.style.marginLeft = (width*0.0035)+"px";
        label.style.borderRadius = "2.5px";
        label.style.backgroundColor = "#A9A9A9";
        label.style.display = "inline-block";
        label.appendChild(_add_avatar(obj));
        label.appendChild(_add_details(obj));
        $loader.find("#"+obj["username"]).click(function(){
            applicant_profile_page.clear();
            applicant_profile_page.populate(obj);
        });
        return label;
    }
    function _query_applicant_db(){
        var send_obj = {send:"applicants"};
        var req = _createXMLHttp();
        req.open('post','http://localhost:6500',false); 
        req.onreadystatechange = function(){
            if(req.status === 200 && req.readyState === 4){
                User_Factory.createApplicantArray(req.responseText,applicant_array);
                applicants_loaded = true;
            }
        };
        req.send(JSON.stringify(send_obj));
    }
    function _set_applicant_content(){
        $panel_wrapper.addClass("scrollable");
        /*applicant_array.forEach(function(item){
            $panel_wrapper[0].appendChild(_build_label(item));
        });*/
    }
    function _remove_content(){
        $panel_wrapper.find(".label").each(function(){
            $(this).remove();
        });
        $panel_wrapper.removeClass("scrollable");
    }
    function _query_employee_db(){}
    function _set_employee_content(){
        /*$panel_wrapper.addClass("scrollable");
        for(var i = 0; i < 10; i++){
            $panel_wrapper[0].appendChild(_build_label());
        }*/
    }
    function _deploy_panel(str){
        if(!panel_deployed){
            $panel_wrapper.animate({"left":(width*0.775)+"px"});
            if(str === "applicants"){
                _set_applicant_content();
            }else{
                _set_employee_content();
            }
            panel_deployed = true;
        }
    }
    function _retract_panel(){
        if(panel_deployed){
            $panel_wrapper.animate({"left":width+"px"});
            _remove_content();
            panel_deployed = false;
        }
        if(applicant_profile_page){
            applicant_profile_page.retract();
        }
    }
    function _applicants_click(){
        var $applicants = $body.find("#applicants"); 
        $applicants.click(function(){  
            if(!applicants_loaded){
                //_query_applicant_db();
            }
            _retract_media_player();
            _deploy_panel("applicants");   
            applicant_profile_page = new Applicant_Profile($loader);
            applicant_profile_page.construct();
        });
    }
    function _employees_click(){
        var $employees = $body.find("#employees"); 
        $employees.click(function(){
            if(!employees_loaded){
                _query_employee_db();
            }
            _retract_media_player();
            _deploy_panel("employees");
        });        
    }
    function _calendar_click(){
        var $calendar = $body.find("#calendar"); 
        $calendar.click(function(){
            _retract_media_player();
            _deploy_panel();
        });        
    }
    function _deploy_media_player(){
        if(!player_deployed){
            $media_wrapper.animate({"left":(width*0.025)+"px"},500);
            player_deployed = true;
        }
    }
    function _retract_media_player(){
        if(player_deployed){
            $media_wrapper.animate({"left":0-(width*0.7)+"px"},500);
            player_deployed = false;
        }
    }
    function _security_click(){
        var $security = $body.find("#security"); 
        $security.click(function(){
            _retract_panel();
            _deploy_media_player();            
        });
    }
    function _add_listeners(){
        _applicants_click();
        _employees_click();
        _calendar_click();
        _security_click();
    }
    function _init_page(){
        _init_wrapper();
        _init_welcome();
        _init_nav();
        _init_backgrounds();
        _init_foreground();
        _init_media();
        _set_controls();
        _init_canvas();
        _init_panel();
        _add_listeners();
    }
    function init(u,p){
        username = u;
        password = p;
        //window.location.href = "exec.html";
        _init_page();
    }
    function _createXMLHttp(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    function _close(){
        
    }
    events.on('on_window_close',_close);
    init("admin","12345");
    /*
    return {
        init: init
    };*/
    
})();

