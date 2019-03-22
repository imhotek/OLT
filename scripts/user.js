'use strict';

function User(){
    var username = "guest";
    //var pass = "guest"; Actually, we can decouple user from his/her password after login/signup
    var type = "guest";
    var initial_registration_date = "";
    var first_name = "";
    var middle_name = "";
    var last_name = "";
    var phone_number = "";
    var phone_type = "";
    var email = "";
    var logged_in = '';
    this.setUsername = function(u){
        username = u;
    };
    this.getUsername = function(){
        return username;
    };
    this.setType = function(t){
        type = t;
    };
    this.getType = function(){
        return type;
    };
    this.set_initial_registration_date = function(timestamp){
        if(timestamp){
            var str = timestamp.split(" ");
            var date = str[0].split("-");
            var time = str[1].split(":");
            var yr = date[0];
            var mo = date[1];
            var mo_day = date[2];
            var hr = time[0];
            var minute = time[1];
            var secs = time[2];
            initial_registration_date = new Date(yr,mo-1,mo_day,hr,minute,secs);
        }else{
            initial_registration_date = null;
        }
    };
    this.get_initial_registration_date = function(){
        return initial_registration_date;
    };
    this.setFirstName = function(fname){
        first_name = fname;
    };
    this.getFirstName = function(){
        return first_name;
    };
    this.setMiddleName = function(mname){
        middle_name = mname;
    };
    this.getMiddleName = function(){
        return middle_name;
    };
    this.setLastName = function(lname){
        last_name = lname;
    };
    this.getLastName = function(){
        return last_name;
    };
    this.setPhoneNumber = function(pnum){
        phone_number = pnum;
    };
    this.getPhoneNumber = function(){
        return phone_number;
    };
    this.setPhoneType = function(pnum){
        phone_type = pnum;
    };
    this.getPhoneType = function(){
        return phone_type;
    };
    this.setEmail = function(e){
        email = e;
    };
    this.getEmail = function(){
        return email;
    };
    this.set_logged_in = function(t){
        logged_in = t;
    };
    this.get_logged_in = function(){
        return logged_in;
    };
    this.callback = function(data){
        var request = (function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        })();
        request.open('post','http://localhost:6385',true);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                if(request.responseText['true']){
                    var res = request.responseText['true'] ? true:false;
                    set_logged_in(res);
                }
            }
        };
        request.send(data);
    };
    this.logout = function(){
        var request = (function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        })();
        var obj = {
            username:(function(){})(),
            query:"logout"
        };
        var data = JSON.stringify(obj);
        var len = data.length;
        var size_obj = {size:len};
        request.open('post','http://localhost:6384',true);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 4){
                callback(data);
            }
        };
        request.send(JSON.stringify(size_obj));
    };
    this.login = function(){
        var request = (function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        })();
        var obj = {
            username:(function(){})(),
            query:"login"
        };
        var data = JSON.stringify(obj);
        var len = data.length;
        var size_obj = {size:len};
        request.open('post','http://localhost:6384',true);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 4){
                callback(data);
            }
        };
        request.send(JSON.stringify(size_obj));
    };
    this.is_logged_in = function(){
        var request = (function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        })();
        var obj = {
            username:(function(){})(),
            query:"?"
        };
        var data = JSON.stringify(obj);
        var len = data.length;
        var size_obj = {size:len};
        request.open('post','http://localhost:6384',true);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                callback(data);
            }
        };
        request.send(JSON.stringify(size_obj));
    };
};

function Applicant(){}
function Carrier(){}
function Client(){}
function Employee(){}
function Exec(){}
function Admin(){}
function Driver(){}

