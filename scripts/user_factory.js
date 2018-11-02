'use strict';

// User will function as the top-level object the top of the user_object hierarchy - all other users will derive their base
// properties and methods from this object. We will begin with the four basic properties listed in user.js, then add more 
// props/methods to the object's prototype rather than to its constructor above. This will avoid re-copying properties over 
// and over for all of the instances of this "class" that we create. The bulk of their properties will be maintained by this 
// "class" - one copy of each to be shared amongst all instances.

var User_Factory = (function(){
    
    var user;
    var guestObj;
    
    function _setCoreUserProperties(){
        user.setUsername(guestObj.getUsername());
        //user.setPassword(guestObj.getPassword());
        user.setType(guestObj.getType());
        user.set_initial_registration_date();    
    }
    function _setCoreApplicantProperties(){
        user.applicant_type = "";
        user.birthdate = "";
        user.age = "";
        user.ssn = "";
        user.emergency_phone_number = "";
        user.emergency_phone_type = "";
        user.last_page_completed = "";
        user.last_physical_exam = "";
        user.grade_school = "";
        user.college = "";
        user.grad_school = "";
        // addresses will contain address objects: type, address string, from_date and to_date
        user.addresses = {};
        user.RESIDENCY_COMPLETED = false;
        user.setApplicantType = function(type){
          user.applicant_type = type;  
        };
        user.getApplicantType = function(){
            return user.applicant_type;
        };
        user.setEmergencyPhoneNumber = function(num){
            user.emergency_phone_number = num;
        };
        user.getEmergencyPhoneNumber = function(){
            return user.emergency_phone_number;
        };
        user.setEmergencyPhoneType = function(num){
            user.emergency_phone_type = num;
        };
        user.getEmergencyPhoneType = function(){
            return user.emergency_phone_type;
        };
        user.setBirthdate = function(b){
          user.birthdate = b;  
        };
        user.getBirthdate = function(){
            return user.birthdate;
        };
        user.setAge = function(a){
            user.age = a;
        };
        user.getAge = function(){
            return user.age;
        };
        user.setSSN = function(s){
            user.ssn = s;
        };
        user.getSSN = function(){
            return user.ssn;
        };
        user.setLastPageCompleted = function(cmp){
            user.last_page_completed = cmp;
        };
        user.getLastPageCompleted = function(){
            return user.last_page_completed;
        };
        user.setLastPhysicalExam = function(x){
            user.last_physical_exam = x;
        };
        user.getLastPhysicalExam = function(){
            return user.last_physical_exam;
        };
        user.setAddresses = function(addr){
            var i,j;
            i = j = 0;
            for(;;i++){
                if(user.addresses[i] && addr[j]){
                    continue;
                }else if(!user.addresses[i] && addr[j]){
                    user.addresses[i] = addr[j];
                    j++;
                }else if(user.addresses[i] && !addr[j]){
                    return;
                }
            }
        };
        user.getAddresses = function(){
            return user.addresses;
        };
        user.set_grade_school = function(g){
            user.grade_school = g;
        };
        user.set_college = function(g){
            user.college = g;
        };
        user.set_grad_school = function(g){
            user.grad_school = g;
        };        
        user.get_grade_school = function(){
            return parseInt(user.grade_school);
        };
        user.get_college = function(){
            return parseInt(user.college);
        };
        user.get_grad_school = function(){
            return parseInt(user.grad_school);
        };
    }
    function _createXMLHttp(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    function _getFile(filename){
        var req = _createXMLHttp();
        req.open('get',filename,false);
        req.onreadystatechange = function(){
            if(req.readyState === 4){
                if(req.status === 200 || req.status === 0){
                    return req.responseText;
                }
            }
        };
        req.send(null);
    }
    function _setCoreEmployeeProperties(){}
    
    function createApplicantArray(resp,arr){
        var filename_stub = "file:///usr/users/applicants/";
        var filename_tails = ["/addresses/addresses.json","/accidents/accidents.json","/convictions/convictions.json",
                                "/employers/employers.json","/experience/experience.json","/licenses/licenses.json",
                                "/explanations/explanations.txt"];
        var res = resp.split("->");
        res.forEach(function(item){
            var obj = JSON.parse(item);
            var addr = filename_stub+obj["username"]+filename_tails[0];
            obj["addresses"] = JSON.parse(_getFile(addr));
            var acc = filename_stub+obj["username"]+filename_tails[1];
            obj["accidents"] = JSON.parse(_getFile(acc));
            var con = filename_stub+obj["username"]+filename_tails[2];
            obj["convictions"] = JSON.parse(_getFile(con));
            var emp = filename_stub+obj["username"]+filename_tails[3];
            obj["employers"] = JSON.parse(_getFile(emp));
            var exp = filename_stub+obj["username"]+filename_tails[4];
            obj["experience"] = JSON.parse(_getFile(exp));
            var lic = filename_stub+obj["username"]+filename_tails[5];
            obj["licenses"] = JSON.parse(_getFile(lic));
            var expl = filename_stub+obj["username"]+filename_tails[6];
            obj["explanations"] = JSON.parse(_getFile(expl));
            obj["profile_pic"] = filename_stub+obj["username"]+"/imgs/1.png";
            arr.push(obj);
        });
    }
    function createEmployeeArray(resp,arr){}
    var init = function (g){
        guestObj = g;
        // Create an empty object of each type, then inherit from User. After that, add props as needed inside the switch case for each type, 
        // then return the result. Thus, each type will share copies of User's properties, plus include their own distinct ones. 
        switch(guestObj.getType()){
            
            case "new_applicant":
                Applicant.prototype = new User();
                user = new Applicant();
                _setCoreUserProperties();
                _setCoreApplicantProperties();
                break;
                
            case "ret_applicant":
                // guestObj.getRet_User() should return an object containing everything the database has on this applicant,
                // most notably, last_page_completed
                
                break;
                
            case "carrier":
                 Carrier.prototype = new User();
                 user = new Carrier();
                _setCoreUserProperties();
                 break;
                 
            case "client":
                 Client.prototype = new User();
                 user = new Client();
                _setCoreUserProperties();
                 break;
                 
            case "employee":
                 /*
                  * At signup, we still use a guest object that takes the entered username and password. The guest object
                  * queries the database to check if that username exists, then if the password entered matches it. If both pass validation,
                  * the guest object pulls the type and employee_type from the database and sets its respective properties with the result.
                  * The guest object is then passed here - to the User_Factory - where the appropriate Employee object is created.
                 */
                 break;
        };
        return user;
    };
    return {
        init:init,
        createApplicantArray:createApplicantArray,
        createEmployeeArray:createEmployeeArray
    };
})();
