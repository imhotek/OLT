'use strict';

var signin = (function(){
    
    var $container = $('#container');
    var topDiv = document.createElement('div');
    topDiv.setAttribute('id', 'topDiv');
    var loginDiv = document.createElement('div');
    var frontDiv = document.createElement('div');
    frontDiv.setAttribute('id','front');
    var backDiv = document.createElement('div');
    backDiv.setAttribute('id', 'back');
    loginDiv.appendChild(frontDiv);
    loginDiv.appendChild(backDiv);
    loginDiv.setAttribute('id', 'loginDiv');
    topDiv.appendChild(loginDiv);
    $container.get(0).appendChild(topDiv);
    var $topDiv = $container.find('#topDiv');
    TileFactory.render($topDiv);
    var $loginDiv = $container.find('#loginDiv');
    var $front = $container.find('#front');
    var $back = $container.find('#back');
    var select_type = document.createElement('div');
    select_type.setAttribute('id', 'select_type');
    var ret_user, guest_user, employee, carrier;  
        
    function _setTop(){
        $topDiv.css({
            "position" : "absolute",
            "order" : "1",
            "width" : "100%",
            "height" : "100%",
            "opacity" : "1.0",
            "z-index" : "2",
            "overflow" : "hidden"
        });
    }
    function _setLogin(){
        $loginDiv.css({
            "position": "absolute",
            "width" : "40%",
            "height" : "55%",
            "top" : "-60%",
            "left" : "30%"
        });
        $loginDiv.find("#front, #back").css({
            "position": "absolute",
            "width" : "100%",
            "height" : "100%",
            "border-radius" : "5px",
            "background-color" : "gray",
            "backface-visibility" : "hidden",
            "transition" : "transform 0.5s linear"
        });
        setTimeout(function(){
            $loginDiv.animate({
                top : "30%"
            },500);
        },500);
    }
    function _setFront(){
        $front.css({
            "transform":"perspective(600px) rotateX(0deg)"
        });
        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('id', 'header');
        $front.get(0).appendChild(headerDiv);
        $front.find("#header").css({
            "width" : "100%",
            "height" : "30%",
            "background-color" : "#000000",
            "border-radius" : "5px 5px 0px 0px",
	    "background-image" : "url(pics/collapsed_logo.png)",
            "background-size" : "100% 100%"
        });
        
        var bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id','bodyDiv');
        $front.get(0).appendChild(bodyDiv);
        var $bodyDiv = $front.find("#bodyDiv");
        $bodyDiv.css({
            "width" : "100%",
            "height" : "70%",
            "background-color" : "#52565b",
            "border-radius" : "0px 0px 5px 5px"
        });
        
        $bodyDiv.append("<h1 class='text' style='font-size: 150%; font-weight: bold; \n\
                        font-family: Times New Roman; margin: 0.5% 0% 0.5% 3.5%; position: absolute;'>SIGN IN</h1><br/>\n\
                        <p class='text' style='font-size: 100%; font-family: Times New Roman; margin-left: 3.5%;'>\n\
                        Enter your username and password below</p><hr class='hr_class' style='margin-left: 3.5%;'>\n\
                <form style='margin-left: 3.5%; width: 96%; height: 96%' class='form' action=''><fieldset><legend>login</legend>\n\
                <p><label>username:  </label><input id='user_input' type='text' placeholder='username'/></p>\n\
                <p><label>password:  </label><input id='pass_input' type='password' placeholder='password'/></p><div id='button_div' style='width: 75%; display: inline;'>\n\
                <button class='button_class' id='signin_button' type='button'>sign in</button>  or \n\
                <button class='button_class'  id='signup_button' type='button'>sign up</button></div></fieldset></form>");
        $bodyDiv.find('.button_class').css({
            "color" : "#000000"
        });
        $bodyDiv.find('#signup_button').click(function(){
            TileFactory.launch();
            $front.css({
                "transform" : "perspective(600px) rotateX(-180deg)"
            });
            $back.css({
                "transform" : "perspective(600px) rotateX(0deg)"
            });
        });
        $bodyDiv.find('#signin_button').click(function(){
            var name = $bodyDiv.find('#user_input').val();
            var pass = $bodyDiv.find('#pass_input').val();
            guest.setUsername(name);
            guest.setPassword(pass);
            guest.signin_check();
            var handle = setInterval(function(){
                    if(guest.getResult() === false){
                        $loginDiv.find("#user_input").val('');
                	$loginDiv.find("#pass_input").val('');
                        guest.setResult(null);
                        return;
                    }else if(guest.getResult() === true){
			clearInterval(handle);
                        handle = null;
                        $loginDiv.find('.text, .hr_class, .form').remove();
                        $loginDiv.animate({
                            width : "0%",
                            height : "0%",
                            left : "50%"
                        },750,function(){
			    guest.setResult(null);
                            $loginDiv.remove();
		            init.video.pause();
                            if(guest.getUsername() === 'mrexec' || guest.getUsername() === 'mrsexec' || guest.getUsername() === 'admin'){
                                exec.init(guest.getUsername(),guest.getPassword());
                            }else{
                                ret_user = (guest.getRet_User());
                                if(ret_user['user_type'] === 'ret_applicant'){
                                    
                                }else if(ret_user['user_type'] === 'new_applicant'){
                                    
                                }else{}// Add employees, clients, etc
                            }
		            //console.log(guest.getRet_User());
                            // Now you have to check user_type. If it's "undefined", then we have to go to set_type page.
                            // If it's "new_applicant" we need to check "last_page_completed" and go to application_sequence
                            // page that corresponds to it. 
                        });
                        return;
                    }else{}
            },25);
        });
    }
    function _setBack(){
        $back.css({
            "transform":"perspective(600px) rotateX(180deg)"
        });
        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('id', 'back_header');
        $back.get(0).appendChild(headerDiv);
        $back.find("#back_header").css({
            "width" : "100%",
            "height" : "30%",
            "background-color" : "#52565b",
            "border-radius" : "5px 5px 0px 0px",
	    "background-image" : "url(pics/collapsed_logo.png)",
            "background-size" : "100% 100%"
        });
             
        var bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id','back_bodyDiv');
        $back.get(0).appendChild(bodyDiv);
        var $bodyDiv = $back.find("#back_bodyDiv");
        $bodyDiv.css({
            "width" : "100%",
            "height" : "70%",
            "background-color" : "#000000",
            "border-radius" : "0px 0px 5px 5px"
        });
        
        $bodyDiv.append("<h1 class='text' style='font-size: 150%; color: #ffffff; font-weight: bold; font-family: Times New Roman; \n\
                                                margin: 0.5% 0% 0.5% 3.5%; position: absolute;'>SIGN UP</h1><br/>\n\
                        <p class='text' style='color: #ffffff; font-size: 100%; font-family: Times New Roman; margin-left: 3.5%;'>\n\
                        Enter a username and password of your own choosing</p><hr class='hr_class' style='margin-left: 3.5%;'>\n\
                <form style='color: #ffffff; margin-left: 3.5%; width: 96%; height: 96%' class='form' action=''><fieldset><legend>register</legend>\n\
                <p><label>username:  </label><input id='back_user_input' type='text' placeholder='Enter a new username'/></p>\n\
                <p><label>password:  </label><input id='back_pass_input' type='password' placeholder='Enter a new password'/></p><div id='button_div' style='width: 75%; display: inline;'>\n\
                <button class='button_class' id='back_signup_button' type='button'>sign up</button>  or \n\
                <button class='button_class'  id='back_signin_button' type='button'>sign in</button></div></fieldset></form>");
        $bodyDiv.find('.button_class').css({
            "color" : "#000000"
        });
        $bodyDiv.find('#back_signin_button').click(function(){
            TileFactory.retract();
            $back.css({
                "transform" : "perspective(600px) rotateX(180deg)"
            });
            $front.css({
                "transform" : "perspective(600px) rotateX(0deg)"
            });
        });
        $bodyDiv.find('#back_signup_button').click(function(){ 
            var name = $bodyDiv.find('#back_user_input').val();
            var pass = $bodyDiv.find('#back_pass_input').val();
            guest.setUsername(name);
            guest.setPassword(pass);
            guest.signup_check();
            var handle = setInterval(function(){
                    if(guest.getResult() === false){
                        $bodyDiv.find('form').get(0).reset();
                        guest.setResult(null);
                        return;
                    }else if(guest.getResult() === true){
			clearInterval(handle);
                        handle = null;
                        guest.setResult(null);
                        $loginDiv.find('.text, .hr_class, .form').remove();
                        $loginDiv.animate({
                            width : "0%",
                            height : "0%",
                            left : "50%"
                        },750,function(){
                            $loginDiv.remove();
                            _setType();
                        });
                        return;
                    }else{}
            },25);
        });
    }
    function _setType(){ 
        init.video.pause();
        $topDiv.get(0).appendChild(select_type);
        var $select = $topDiv.find('#select_type');
        $select.css({
            "position": "absolute",
            "width" : "40%",
            "height" : "40%",
            "left" : "30%",
            "top" : "105%",
            "background-color" : "#000000",
            "border-radius" : "5px",
            "transition" : "top 0.75s linear"
        });
        $select.append(
             "<form style='color: #ffffff; font: 17px bold Times New Roman; width: 95%; height: 95%; margin-left: 3%;' action=''>\n\
                <fieldset><legend>Purpose</legend><h2>Which best describes your reason for using this platform?</h2>\n\
                <input id='apply_box' type='checkbox' name='purpose' value='new_applicant'>Apply for a job</input><br/>\n\
                <input id='b2b_box' type='checkbox' name='purpose' value='carrier'>B2B (Business to Business) Services for carriers</input><br/>\n\
                <input id='request_box' type='checkbox' name='purpose' value='client'>Request a bid</input><br/>\n\
\n\             <input id='employee_box' type='checkbox' name='purpose' value='employee'>Set up my employee dashboard</input><br/>\n\
                <div style='text-align: center;' ><button type='button' id='type_submit' style='width: 13.5%; height: 10%; text-align: center; \n\
                margin: 0px; padding: 0px;'>submit</button></div></fieldset></form>"   
        );
        var $apply = $select.find('#apply_box');
        var $b2b = $select.find('#b2b_box');
        var $request = $select.find('#request_box');
        var $dash = $select.find('#employee_box');
        var $submit = $select.find('#type_submit');
        
        $apply.click(function(){
            $(this).prop('checked',true);
            $b2b.prop('checked',false);
            $request.prop('checked',false);
            $dash.prop('checked',false);
        });
        $b2b.click(function(){
            $(this).prop('checked',true);
            $apply.prop('checked',false);
            $request.prop('checked',false);
            $dash.prop('checked',false);
        });
        $request.click(function(){
            $(this).prop('checked',true);
            $apply.prop('checked',false);
            $b2b.prop('checked',false);
            $dash.prop('checked',false);
        });
        $dash.click(function(){
            $(this).prop('checked',true);
            $apply.prop('checked',false);
            $b2b.prop('checked',false);
            $request.prop('checked',false);
        });
        $submit.click(function(){
            var checked = false;
            $select.find("input:checkbox").each(function(item){
                if($(this).is(':checked')){
                    checked = true;
                    guest.setType($(this).val());
                    guest.register_type();
                    guest_user = User_Factory.init(guest);
                }
            });
            if(!checked){
                alert("You must check a box to continue");
                return;
            }
            $select.animate({
                "top":"105%"
            },function(){
                setTimeout(function(){
                    $select.remove();
                    _start_application();
                },750);
            });            
        });
        $select.animate({
            "top" : "30%"
        });
    };    
    function _start_application(){
        if(guest_user && !ret_user){
            Application_Sequence.init(TileFactory.get_all(),guest_user);
        }else if(!guest_user && ret_user){
            Application_Sequence.init(TileFactory.get_all(),ret_user);
        }
    }    
    function _setpage(){             
        _setTop();
        _setLogin();
        _setFront();
        _setBack(); 
    }    
    function render(){
        _setpage();
    }    
    return{
        render: render
    };
    
})();
