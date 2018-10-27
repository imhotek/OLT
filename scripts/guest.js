'use strict';

var guest = (function(){
    var username = "guest";
    var password = "guest";
    var type = "guest";
    var employee_type = "";
    var ret_user = null;
    var result = null;
    
    function setRet_User(obj){ 
        ret_user = Object.create(JSON.parse(obj));
        setType(ret_user["user_type"]);
        // So now, when this object is passed to User_Factory.init() in signin.js, the switch statement within that init() function
        // can call getType() on this object and return what "user_type" got pulled from the database. Then it can 
        // call getRet_User() and return the entire json object from C that was converted to a Js object here.
    }
    function getRet_User(){
        return ret_user;
    }
    function setUsername(u){
        username = u;
    }
    function getUsername(){
        return username;
    }
    function setPassword(p){
        password = p;
    }
    function getPassword(){
        return password;
    }
    function setType(t){
        type = t;
    }
    function getType(){
        return type;
    }
    function setEmployeeType(t){
        employee_type = t;
    }
    function getEmployeeType(){
        return employee_type;
    }
    function setResult(val){
        result = val;
    }
    function getResult(){
        return result;
    }
    function _checkRegex(error_string){
        var usernameRegex = /[a-zA-Z0-9]{5,10}/;
        var passRegex = /[a-zA-Z0-9_#@$]{8,20}/;
        var user = getUsername();
        var pass = getPassword();
        if(!user.match(usernameRegex)){ 
            error_string = "Your username must consist of 5-10 letters and numbers only.";
            alert(error_string);
            return false;
        }
        if(!pass.match(passRegex)){ 
            error_string = "Your password must consist of 8-20 letters, numbers and special characters\n\
            _,#,@ or $\n";
            alert(error_string);
            return false;
        }
        return true;
    }
    function _createXMLHttpRequest(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    function register_type(){
        var pre_request = _createXMLHttpRequest();
        var obj = {
            username: (function(){ return getUsername(); })(),
            user_type: (function(){ return getType(); })()
        };
        var data = JSON.stringify(obj);
        var len = data.length;
        var size = {size:len};
        var callback = function(d){
            var request = _createXMLHttpRequest();
            request.open('post','http://olthompson.com:6365',true);
            request.onreadystatechange = function(){};
            request.send(d);
        };
        pre_request.open('post','http://olthompson.com:6364',true);
        pre_request.onreadystatechange = function(){
            if(pre_request.readyState === 4 && pre_request.status === 200){
                callback(data);
            }
        };
        pre_request.send(JSON.stringify(size));
    }
    // Check function must run before guest object is submitted to User_Factory. If the username is already taken (aka in the database), 
    // then user must be prompted to enter another username. If the username is unique, return true. If not, return false.
    function signin_check(){
        // set error_string equal to "Either the username or password you entered is incorrect." if username and password
        // pass regex check but fail to be found in database
        var error_string = "";
        var callback = function(d){
            var request = _createXMLHttpRequest();
            request.open('post', 'http://olthompson.com:6367',true);
            request.onreadystatechange = function(){
                if(request.readyState === 4 && request.status === 200){
                    // Server will check to see if username and password are found. If they are, it must construct a json object
                    // that contains what kind of user we have - an applicant, employee, carrier or client - as well as all the 
                    // pertinent information about this user that is stored in the database.
                    if(request.responseText){
                        if(JSON.parse(request.responseText)["username"] === false || 
                                JSON.parse(request.responseText)["authentication_string"] === false){
                            error_string = "That username and/or password as entered was not found in our database.";
                            alert(error_string);
                            setResult(false);
                        }else{
                            setRet_User(request.responseText);
                            setResult(true);
                        }
                    }
                }
            };
            request.send(d);
        };
        if(!_checkRegex(error_string)){ 
            setResult(false);
        }else{ 
            var obj = {
                username: (function(){
                    return getUsername();
                })(),
                authentication_string: (function(){
                    return getPassword();
                })()
            };
            var data = JSON.stringify(obj);
            var len = data.length;
            var size_obj = {size:len};
            var pre_request = _createXMLHttpRequest();
            pre_request.open('post', 'http://olthompson.com:6366',true);
	    pre_request.onreadystatechange = function(){
                if(pre_request.readyState === 4 && pre_request.status === 200){ 
                    callback(data);
                }
            };
            pre_request.send(JSON.stringify(size_obj)); 
        }
    }
    function signup_check(){
        // set error_string equal to "That username is already taken." if username passes regex and IS found in database already
        var error_string = "";
            var callback = function(d){
                var request = _createXMLHttpRequest();
                request.open('post','http://olthompson.com:6369',true);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        // C server only has to send us back username true or false for already present or not. 
                        if(JSON.parse(request.responseText)["username"] === true){
                            error_string = "That username is already taken. Please try again.";
                            alert(error_string);
                            setResult(false);
                            return;
                        }else{
                            // If false, C has to submit username and password to database.
                            setRet_User(request.responseText);
                            setResult(true);
                            return;
                        }
                    }
                };
                request.send(d);
            };
        if(!_checkRegex(error_string)){
            setResult(false);
            return;
        }else{
            var obj = {
                username : (function(){
                    return getUsername();
                })(),
                authentication_string : (function(){
                    return getPassword();
                })()
            };
            var data = JSON.stringify(obj);
            var len = data.length;
            var size = {size:len};
            var pre_request = _createXMLHttpRequest();
            pre_request.open('post','http://olthompson.com:6368',true);
            pre_request.onreadystatechange = function(){
                if(pre_request.readyState === 4 && pre_request.status === 200){
                    callback(data);
                }
            };
            pre_request.send(JSON.stringify(size));
        }
    }
    return {
        setUsername: setUsername,
        getUsername: getUsername,
        setPassword: setPassword,
        getPassword: getPassword,
        setType: setType,
        getType: getType,
        getRet_User: getRet_User,
        setEmployeeType: setEmployeeType,
        getEmployeeType: getEmployeeType,
        signin_check: signin_check,
        signup_check: signup_check,
        setResult: setResult,
        getResult: getResult,
        register_type: register_type
    };
})();
