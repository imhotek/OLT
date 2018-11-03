'use strict'; 

var Questions = {
    // This object will have properties numbered 0-5 for each tile id. Each of these properties will contain an object with 
    // a text property, an update method that does whatever updating each separate tile might need,
    counter: 0,
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    "0":{
        user_ref: "",
        text: "<div class='q1_wrapper'>"+
                "<div id='date_div' style='margin: 2% 0% 0% 2%; color: #ffffff; font: 100% bold Times New Roman'>Date: </div>"+
            "<div id='select_position' style='margin: 2% 0% 0% 2%; color: #ffffff;  display: inline-block; \n\
             font: 100% bold Times New Roman'><label>Position: </label>"+
                "<input type='checkbox' id='contractor' value='Contractor'> Contractor <input type='checkbox' id='driver'\n\
                    value='Driver'> Driver <input type='checkbox' id='c_driver' value='ContractorsDriver'> Contractor's Driver"+
            "</div>"+
            "<div id='name_div' style='display: inline-block; margin: 2% 0% 0% 2%; color: #ffffff; font: 100% bold Times New Roman'>\n\
            <label> Name: </label>"+
                "<input type='text' id='f_name' placeholder='First'/> <input type='text' id='m_name' placeholder='Middle' style='width: 20%'/> \n\
                <input type='text' id='l_name' placeholder='Last'/> \n\
            </div> \n\
            <div id='phone_div' style=' color: #ffffff; font: 100% bold Times New Roman; display: inline-block; \n\
            margin: 2% 0% 0% 2%'><label> Phone: </label> \n\
                <input type='text' id='p_num' placeholder='(555) 555-5555' style='width: 20%'/>\n\
                <label style='color: #ffffff; font: 75% bold Times New Roman'>cell</label><input type=checkbox id='phone_type_cell' />\n\
\n\             <label style='color: #ffffff; font: 75% bold Times New Roman'>landline</label><input type=checkbox id='phone_type_land' />\n\
                <label style='margin-left: 2%'> Emergency: </label>\n\
            <input type='text' id='e_num' placeholder='(555) 555-5555'  style='width: 20%'/> \n\
\n\             <label style='color: #ffffff; font: 75% bold Times New Roman'>cell</label><input type=checkbox id='emergency_type_cell' />\n\
\n\             <label style='color: #ffffff; font: 75% bold Times New Roman'>landline</label><input type=checkbox id='emergency_type_land' />\n\
            </div> \n\
            <div id='date_picker' style='display: inline-block; margin: 2% 0% 0% 2%; color: #ffffff; \n\
            font: 100% bold Times New Roman'> \n\
                <label> Date of Birth: </label> \n\
                <select id='month'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='year'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='month_day'></select> \n\
                <input type='text' id='age' placeholder='Age' style='width: 7%; margin: 0% 2%'/> \n\
                <label>Email: </label><input type='text' id='email' placeholder='user@example.com'/></div>\n\
                <div id='ssn_div' style='display: inline-block; margin: 2% 0% 0% 2%; color: #ffffff; font: 100% bold Times New Roman'> \n\
                    <label>Social Security Number: </label><input type='text' id='ssn' placeholder='333-33-3333' style='width: 20%'/>\n\
                </div>"+
                "<div id='page1_submit_div' style='margin-top: 2%; width: 100%; text-align: center; display: inline-block'>\n\
                <button id='page1_submit_button' style='text-align: center; \n\
                margin-right: 5%'>submit</button>"+
                "<button id='page1_save_button' style='text-align: center; margin-left: 5%'>save/quit</button></div>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            var con = ref.$outer.find("#contractor");
            var driver = ref.$outer.find("#driver");
            var c_driver = ref.$outer.find("#c_driver");
            var phone_c = ref.$outer.find("#phone_type_cell");
            var phone_l = ref.$outer.find("#phone_type_land");
            var em_c = ref.$outer.find("#emergency_type_cell");
            var em_l = ref.$outer.find("#emergency_type_land");
            var date_div = ref.$outer.find("#date_div");
            var submit = ref.$outer.find("#page1_submit_button");
            var save = ref.$outer.find("#page1_save_button");
            var year_sel = ref.$outer.find("#year");
            var mo_sel = ref.$outer.find("#month");
            var mo_day_sel = ref.$outer.find("#month_day");
            date_filler.fillMonths(mo_sel,1,12);
            date_filler.fillYears(year_sel,1937,1997);
            date_filler.setMonthSelect(1,false,mo_sel,mo_day_sel,year_sel,"#date_picker","#age");
            date_filler.setYearSelect(1,year_sel,mo_sel,mo_day_sel,"#date_picker","#age");
            date_filler.setMonthDaySelect(mo_sel,mo_day_sel,year_sel,"#date_picker","#age");            
            
            con.click(function(){
                $(this).prop('checked',true);
                driver.prop('checked',false);
                c_driver.prop('checked',false);
            });
            driver.click(function(){
                $(this).prop('checked',true);
                con.prop('checked',false);
                c_driver.prop('checked',false);
            });
            c_driver.click(function(){
                $(this).prop('checked',true);
                con.prop('checked',false);
                driver.prop('checked',false);
            });
            phone_c.click(function(){
                $(this).prop('checked',true);
                phone_l.prop('checked',false);
            });
            phone_l.click(function(){
                $(this).prop('checked',true);
                phone_c.prop('checked',false);
            });
            em_c.click(function(){
                $(this).prop('checked',true);
                em_l.prop('checked',false);
            });
            em_l.click(function(){
                $(this).prop('checked',true);
                em_c.prop('checked',false);
            });
            
            var handle = setInterval(function(){
                var date = new Date();
                date_div.text("Date:  "+Questions["days"][date.getDay()]+" "
                        +Questions["months"][date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" "+date.toLocaleTimeString());
            },1000);
            
            submit.click(function(){
                if(Questions["0"].collect("done",ref)){
                    clearInterval(handle);
                    ref.$outer.find('.q1_wrapper').remove();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                    handle = null;
                }else{
                    return;
                }                
            });
            var save_and_close = function(){
                Questions["0"].collect(ref);
                clearInterval(handle);
                ref.$outer.find('.q1_wrapper').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                handle = null;
                Logger.LOG('out',Questions["0"].user_ref.getUsername());
            };
            events.on('on_window_close',save_and_close);
            save.click(function(){
                save_and_close();
                window.location.href = "index.html";
            });
        },
        validate_name: function(val){
            var regex = /[a-zA-Z']{1,30}/;
            return val.match(regex);
        },
        validate_phone: function(val){
            var regex = /\d{3}\d{3}\d{4}/;
            return val.match(regex);
        },
        validate_email: function(val){
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var regex2 = /none/i;
            return val.match(regex) || val.match(regex2);
        },
        validate_ssn: function(val){
            var regex = /[0-9]{3}[0-9]{2}[0-9]{4}/;
            return val.match(regex);
        },
        collect: function(){
            // Must return true or false
            var submit = function(){
                var obj = {
                            "user_type" : "ret_applicant",
                            "position" : (function(){ 
                                var val = Questions["0"].user_ref.getApplicantType() === "" ? "NULL" : Questions["0"].user_ref.getApplicantType(); 
                                return val;
                            })(),
                            "first_name" : (function(){
                                var val = Questions["0"].user_ref.getFirstName() === "" ? "NULL" : Questions["0"].user_ref.getFirstName(); 
                                return val;
                            })(),
                            "middle_name" : (function(){
                                var val = Questions["0"].user_ref.getMiddleName() === "" ? "NULL" : Questions["0"].user_ref.getMiddleName(); 
                                return val;
                            })(),
                            "last_name" : (function(){
                                var val = Questions["0"].user_ref.getLastName() === "" ? "NULL" : Questions["0"].user_ref.getLastName(); 
                                return val;
                            })(),
                            "phone" : (function(){
                                var val = Questions["0"].user_ref.getPhoneNumber() === "" ? "NULL" : Questions["0"].user_ref.getPhoneNumber(); 
                                return val;
                            })(),
                            "phone_type" : (function(){
                                var val = Questions["0"].user_ref.getPhoneType() === "" ? "NULL" : Questions["0"].user_ref.getPhoneType(); 
                                return val;
                            })(),
                            "emergency_phone" : (function(){
                                var val = Questions["0"].user_ref.getEmergencyPhoneNumber() === "" ? "NULL" : Questions["0"].user_ref.getEmergencyPhoneNumber(); 
                                return val;
                            })(),
                            "emergency_phone_type" : (function(){
                                var val = Questions["0"].user_ref.getEmergencyPhoneType() === "" ? "NULL" : Questions["0"].user_ref.getEmergencyPhoneType(); 
                                return val;
                            })(),
                            "dob" : (function(){
                                var val = Questions["0"].user_ref.getBirthdate() === "" ? "NULL" : Questions["0"].user_ref.getBirthdate(); 
                                return val;
                            })(),
                            "age" : (function(){
                                var val = Questions["0"].user_ref.getAge() === "" ? "NULL" : Questions["0"].user_ref.getAge(); 
                                return val;
                            })(),
                            "email" : (function(){
                                var val = Questions["0"].user_ref.getEmail() === "" ? "NULL" : Questions["0"].user_ref.getEmail(); 
                                return val;
                            })(),
                            "ssn" : (function(){
                                var val = Questions["0"].user_ref.getSSN() === "" ? "NULL" : Questions["0"].user_ref.getSSN(); 
                                return val;
                            })(),
                            "last_page_completed": (function(){
                                return Questions["0"].user_ref.getLastPageCompleted();
                            })(),
                            "username" : (function(){
                                var val = Questions["0"].user_ref.getUsername() === "" ? "NULL" : Questions["0"].user_ref.getUsername(); 
                                return val; 
                            })()
                        };
                var json = JSON.stringify(obj); 
                var len = json.length+1;
                var size_obj = {size:len};
                var _createXMLHttpRequest = function(){
                    if(window.XMLHttpRequest){
                        return new XMLHttpRequest();
                    }else{
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    }
                };
                var callback = function(d){
                    var request = _createXMLHttpRequest();
                    request.open('post','http://olthompson.com:6371',true);
                    request.send(d);
                };
                var pre_request = _createXMLHttpRequest();
                pre_request.open('post','http://olthompson.com:6370',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.readyState === 4 && pre_request.status === 200){
                        callback(json);
                    }
                };
                pre_request.send(JSON.stringify(size_obj));
            };
            if(arguments[0] === "done"){
                // submit has been pressed, so check to be sure all fields have been populated. If something is missing,
                // alert which field must be populated and return false. If all fields have been populated, return true.
                var arr = [];
                var ref = arguments[1];
                var type = {
                    val: ref.$outer.find("#select_position").find("input:checked").val(),
                    error_msg: "You must select a position.\n"
                }; 
                arr.push(type);
                var first = {
                    val: (function(){
                        var val = ref.$outer.find("#name_div").find("#f_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter a first name.\n"
                };
                arr.push(first);
                var mid = {
                    val: (function(){
                        var val = ref.$outer.find("#name_div").find("#m_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })()
                };
                arr.push(mid);
                var last = {
                    val: (function(){
                        var val = ref.$outer.find("#name_div").find("#l_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter a last name.\n"
                };
                arr.push(last);
                var phone = {
                    val: (function(){
                        var val = ref.$outer.find("#phone_div").find("#p_num").val();
                        if(Questions["0"].validate_phone(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter a three digit area code followed by a seven digit phone number - no spaces.\n",
                    phone_number: true
                };
                arr.push(phone);
                var phone_type = {
                    val: (function(){
                        var phone_c = ref.$outer.find("#phone_type_cell");
                        var phone_l = ref.$outer.find("#phone_type_land");
                        if(phone_c.is(":checked")){
                            return "cell";
                        }else if(phone_l.is(":checked")){
                            return "land";
                        }                        
                    })(),
                    error_msg: "You must select the type of phone number - cell phone or landline.\n"
                };
                arr.push(phone_type);
                var e_phone = {
                    val: (function(){
                        var val = ref.$outer.find("#phone_div").find("#e_num").val();
                        if(Questions["0"].validate_phone(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter a three digit area code followed by a seven digit emergency phone number - no spaces.\n",
                    phone_number: true
                };
                arr.push(e_phone);
                var e_type = {
                   val: (function(){
                       var em_c = ref.$outer.find("#emergency_type_cell");
                       var em_l = ref.$outer.find("#emergency_type_land");
                       if(em_c.is(":checked")){
                            return "cell";
                        }else if(em_l.is(":checked")){
                            return "land";
                        }  
                   })(),
                    error_msg: "You must select the type of emergency phone number - cell phone or landline.\n"
                };
                arr.push(e_type);
                var bday = {
                    val: (function(){
                    var yr = ref.$outer.find("#date_picker").find("#year").find("option:selected").text();
                    var mo = ref.$outer.find("#date_picker").find("#month").find("option:selected").val();
                    var day = ref.$outer.find("#date_picker").find("#month_day").find("option:selected").text();
                    if(yr.length === 0 || mo.toString().length === 0 || day.length === 0){
                        return "";
                    }else{
                        return yr+"-"+(parseInt(mo))+"-"+day;
                    }
                }()),
                    error_msg: "You cannot leave any of the Date of Birth fields empty.\n"
                };
                arr.push(bday);
                var age = {
                    val: ref.$outer.find("#date_picker").find("#age").val()
                };
                arr.push(age);
                var email = {
                    val: (function(){
                        var val = ref.$outer.find("#email").val();
                        if(Questions["0"].validate_email(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter an email address. If you don't have one, enter \"none\"."
                };
                arr.push(email);
                var ssn = {
                    val: (function(){
                        var val = ref.$outer.find("#ssn_div").find("#ssn").val();
                        if(Questions["0"].validate_ssn(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })(),
                    error_msg: "You must enter a nine digit Social Security Number - no spaces.\n",
                    ssn: true
                };
                arr.push(ssn);
                var error_string = "";
                arr.forEach(function(item){
                    if(!item.hasOwnProperty("error_msg")){}else{
                        if(item.hasOwnProperty("phone_number")){
                            if(item.val.length !== 10 || !item.val){
                                error_string += item.error_msg;
                            }
                        }else if(item.hasOwnProperty("ssn")){
                            if(item.val.length !== 9 || !item.val){
                                error_string += item.error_msg;
                            }
                        }else{
                            if(!item.val || item.val === ""){
                                error_string += item.error_msg;
                            }
                        }
                    }
                });
                if(error_string === ""){
                    Questions["0"].user_ref.setApplicantType(type.val);
                    Questions["0"].user_ref.setFirstName(first.val);
                    Questions["0"].user_ref.setMiddleName(mid.val);
                    Questions["0"].user_ref.setLastName(last.val);
                    Questions["0"].user_ref.setPhoneNumber(phone.val);
                    Questions["0"].user_ref.setPhoneType(phone_type.val);
                    Questions["0"].user_ref.setEmergencyPhoneNumber(e_phone.val);
                    Questions["0"].user_ref.setEmergencyPhoneType(e_type.val);
                    Questions["0"].user_ref.setBirthdate(bday.val);
                    Questions["0"].user_ref.setAge(age.val);
                    Questions["0"].user_ref.setEmail(email.val);
                    Questions["0"].user_ref.setSSN(ssn.val);
                    Questions["0"].user_ref.setLastPageCompleted(1); // Next time applicant logs in, he/she will go to next page.
                    // Now package all the preceding prop vals into an object to be passed to user_ref - which will
                    // submit them to the database...
                    submit();
                    Questions["counter"] = 1;
                    return true;
                }else{
                    alert(error_string);
                    return false;
                }
            }else if(arguments[0] !== "done"){
                var ref = arguments[0];
                // save and quit has been pressed, so just save whatever fields hsve been populated and return true;
                Questions["0"].user_ref.setApplicantType(ref.$outer.find("#select_position").find("input:checked").val());
                Questions["0"].user_ref.setFirstName((function(){
                        var val = ref.$outer.find("#name_div").find("#f_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setMiddleName((function(){
                        var val = ref.$outer.find("#name_div").find("#m_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setLastName((function(){
                        var val = ref.$outer.find("#name_div").find("#l_name").val();
                        if(Questions["0"].validate_name(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setPhoneNumber((function(){
                        var val = ref.$outer.find("#phone_div").find("#p_num").val();
                        if(Questions["0"].validate_phone(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setPhoneType((function(){
                        var phone_c = ref.$outer.find("#phone_type_cell");
                        var phone_l = ref.$outer.find("#phone_type_land");
                        if(phone_c.is(":checked")){
                            return "cell";
                        }else if(phone_l.is(":checked")){
                            return "land";
                        }else{
                            return "";
                        } 
                })());
                Questions["0"].user_ref.setEmergencyPhoneNumber((function(){
                        var val = ref.$outer.find("#phone_div").find("#e_num").val();
                        if(Questions["0"].validate_phone(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setEmergencyPhoneType((function(){
                        var phone_c = ref.$outer.find("#emergency_type_cell");
                        var phone_l = ref.$outer.find("#emergency_type_land");
                        if(phone_c.is(":checked")){
                            return "cell";
                        }else if(phone_l.is(":checked")){
                            return "land";
                        }else{
                            return "";
                        }
                })());
                Questions["0"].user_ref.setBirthdate((function(){
                var yr = ref.$outer.find("#date_picker").find("#year").find("option:selected").text(); 
                var mo = ref.$outer.find("#date_picker").find("#month").find("option:selected").val();
                var day = ref.$outer.find("#date_picker").find("#month_day").find("option:selected").text();
                        if(yr.length === 0 || mo.toString().length === 0 || day.length === 0){
                            return "";
                        }else{
                            return yr+"-"+(parseInt(mo))+"-"+day;
                        }
                })());
                Questions["0"].user_ref.setAge(ref.$outer.find("#date_picker").find("#age").val());
                Questions["0"].user_ref.setEmail((function(){
                        var val = ref.$outer.find("#email").val();
                        if(Questions["0"].validate_email(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setSSN((function(){
                        var val = ref.$outer.find("#ssn_div").find("#ssn").val();
                        if(Questions["0"].validate_ssn(val)){
                            return val;
                        }else{
                            return "";
                        }
                    })());
                Questions["0"].user_ref.setLastPageCompleted(0);
                submit();
                Questions["counter"] = 0;
                return true;
            }
        }
    },
    "1":{
        user_ref: "",
        text:"<div class='q2_wrapper'>"+
                "<div id='exam_div' class='application_pages' ><label>Date of last physical exam: </label>\n\
                <select id='month'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='year'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='month_day'></select>\n\
                </div>"+
                "<div class='application_pages address'><label>Current and Three Years' Previous Addresses:</label></div>"+
                "<div id='current_address' class='application_pages address'>\n\
                <input id='current' onblur=\"enter_event('current','first','0')\" class='addr_input' type='text' placeholder='Current Address'/>\n\
                <label style='margin-left:2%'> From: </label>\n\
                <select id='current_from_month' class='from_month current_select'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='current_from_year' class='from_year current_select'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='current_from_day' class='from_day current_select'></select>\n\
                <label style='margin-left:2%'> To: </label>\n\
                <select id='current_to_month' class='to_month'> \n\
                </select> \n\
                <select id='current_to_year' class='to_year'>\n\
                </select> \n\
                <select id='current_to_day' class='to_day'></select>\n\
                </div>"+
                
                "<div id='first_address' class='application_pages address'>\n\
                <input id='first' onblur=\"enter_event('first','second','1')\" class='addr_input' type='text' placeholder='Previous Address'/>\n\
                    <label style='margin-left:2%'> From: </label>\n\
                <select id='first_from_month' class='from_month first_select'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='first_from_year' class='from_year first_select'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='first_from_day' class='from_day first_select'></select>\n\
                <label style='margin-left:2%'> To: </label>\n\
                <select id='first_to_month' class='to_month first_to'> \n\
                </select> \n\
                <select id='first_to_year' class='to_year first_to'>\n\
                </select> \n\
                <select id='first_to_day' class='to_day first_to'></select>\n\
                </div>"+
                
                "<div id='second_address' class='application_pages address'>\n\
                <input id='second' onblur=\"enter_event('second','third','2')\" class='addr_input' type='text' placeholder='Second Previous Address'/>\n\
                    <label style='margin-left:2%'> From: </label>\n\
                <select id='second_from_month' class='from_month second_select'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='second_from_year' class='from_year second_select'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='second_from_day' class='from_day second_select'></select>\n\
                <label style='margin-left:2%'> To: </label>\n\
                <select id='second_to_month' class='to_month second_to'> \n\
                </select> \n\
                <select id='second_to_year' class='to_year second_to'>\n\
                </select> \n\
                <select id='second_to_day' class='to_day second_to'></select>\n\
                </div>"+
                
                "<div id='third_address' class='application_pages address'>\n\
                <input id='third' onblur=\"enter_event2('third','3')\" class='addr_input' type='text' placeholder='Third Previous Address'/>\n\
                    <label style='margin-left:2%'> From: </label>\n\
                <select id='third_from_month' class='from_month third_select'> \n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='third_from_year' class='from_year third_select'>\n\
                    <option value='0'></option> \n\
                </select> \n\
                <select id='third_from_day' class='from_day third_select'></select>\n\
                <label style='margin-left:2%'> To: </label>\n\
                <select id='third_to_month' class='to_month third_to'> \n\
                </select> \n\
                <select id='third_to_year' class='to_year third_to'>\n\
                </select> \n\
                <select id='third_to_day' class='to_day third_to'></select>\n\
                </div>"+                
                "<div id='page2_submit_div' class='application_pages' style='text-align:center'>\n\
                <button id='page2_submit_button' style='text-align: center; \n\
                margin-right: 5%'>submit</button>"+
                "<button id='page2_save_button' style='text-align: center; margin-left: 5%'>save/quit</button></div>"+
                "</div>\n\
            \n\
            <script id='main_script'>"+ 
            "function activateSearch(){"+
                "window.address_string = window.address_string || {};"+
                "window.address_errors = window.address_errors || {};"+
                "var inputs = document.getElementsByClassName('addr_input');"+
                "var auto1 = new google.maps.places.Autocomplete(inputs[0]);"+
                "var placeholder = inputs[0].getAttribute('placeholder');"+
                "window.current_dates_selected = null;"+
                    "google.maps.event.addListener(auto1, 'place_changed', function(){"+
                    "if(JSON.stringify(auto1.getPlace().address_components) === undefined){"+
                    "window.address_errors['0'] = {value: placeholder, valid: false};"+
                    "}else{"+ // Here, valid address has been selected, and valid set to true means dates are populated.
                    "window.address_errors['0'] = {value: placeholder, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    
                    "if(typeof window.address_string[0] !== 'undefined' && typeof window.address_string[0]['from'] !== 'undefined'){}else{"+
                    "window.address_string[0] = obj; "+
                    "}"+
                    
                    "window.address_string['0']['address_data'] = new Array(JSON.stringify(auto1.getPlace().address_components));"+
                    //"inputs[1].disabled = false;"+
                    "};"+
                    "});"+
                "var auto2 = new google.maps.places.Autocomplete(inputs[1]);"+
                "var placeholder1 = inputs[1].getAttribute('placeholder');"+
                    "inputs[1].addEventListener('click',function(){"+ // If user tries to move on, check to see if dates selected
                    "var selects = document.getElementsByClassName('current_select');"+
                    "var res = (function(){"+
                    "                    for(var i = 0; i < selects.length; i++){"+
                    "                        if(selects[i].selectedIndex <= 0){"+
                    "                            window.current_dates_selected = false;"+
                    "                        }"+
                    "                    }"+
                    "                    if(window.current_dates_selected === null){ window.current_dates_selected = true; }"+
                    "                    return window.current_dates_selected;"+
                    "        })();    "+
                    " if(window.address_errors['0']){}else if(!window.address_errors['0'] || window.address_errors['0'] === undefined){"+
                        "inputs[1].value = '';"+
                        "inputs[1].disabled = true; "+
                        "window.address_errors['0'] = {value: placeholder, valid: false};"+
                    "   alert('The '+placeholder+' field above is either empty or of an invalid address format.');"+
                    "}"+
                    " if(!window.current_dates_selected){"+
                        "inputs[1].value = '';"+
                        "inputs[1].disabled = true; "+
                        "window.address_errors['0'] = {value: placeholder, valid: false};"+
                    "   alert('You must also enter the dates of your residency at the '+placeholder+'.');"+
                    "}else{"+  
                        "inputs[1].value = '';"+
                        "inputs[1].disabled = false; "+                  
                        "window.address_errors['0'] = {value: placeholder, valid: true};"+
                    "}"+
                    "},false);"+
                    "google.maps.event.addListener(auto2, 'place_changed', function() {"+
                    "if(JSON.stringify(auto2.getPlace().address_components) === undefined){"+
                    "window.address_errors['1'] = {value: placeholder1, valid: false};"+
                    "}else{"+
                    "window.address_errors['1'] = {value: placeholder1, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    
                    "if(typeof window.address_string[1] !== 'undefined' && typeof window.address_string[1]['from'] !== 'undefined'){}else{"+
                    "window.address_string[1] = obj; "+
                    "}"+
                    
                    "window.address_string['1']['address_data'] = new Array(JSON.stringify(auto2.getPlace().address_components));"+
                    //"inputs[2].disabled = false;"+
                    "};"+
                    "});"+
                "var auto3 = new google.maps.places.Autocomplete(inputs[2]);"+
                "var placeholder2 = inputs[2].getAttribute('placeholder');"+
                "window.first_dates_selected = null;"+ 
                    "inputs[2].addEventListener('click',function(){"+
                    "var selects = document.getElementsByClassName('first_select');"+
                    "var res = (function(){"+
                    "                    for(var i = 0; i < selects.length; i++){"+
                    "                        if(selects[i].selectedIndex <= 0){"+
                    "                            window.first_dates_selected = false;"+
                    "                        }"+
                    "                    }"+
                    "                    if(window.first_dates_selected === null){ window.first_dates_selected = true; }"+
                    "                    return window.first_dates_selected;"+
                    "        })();    "+
                    " if(window.address_errors['1']){}else if(!window.address_errors['1'] || window.address_errors['1'] === undefined){"+
                        "inputs[2].value = '';"+
                        "inputs[2].disabled = true; "+
                        "window.address_errors['1'] = {value: placeholder1, valid: false};"+
                    "   alert('The '+placeholder1+' field above is either empty or of an invalid address format.');"+
                    "}"+
                    " if(!window.first_dates_selected){"+
                        "inputs[2].value = '';"+
                        "inputs[2].disabled = true; "+
                        "window.address_errors['1'] = {value: placeholder1, valid: false};"+
                    "   alert('You must also enter the dates of your residency at the '+placeholder1+'.');"+
                    "}else{"+  
                        "inputs[2].value = '';"+
                        "inputs[2].disabled = false; "+                  
                        "window.address_errors['1'] = {value: placeholder1, valid: true};"+
                    "}"+
                    "},false);"+
                    "google.maps.event.addListener(auto3, 'place_changed', function() {"+
                    "if(JSON.stringify(auto3.getPlace().address_components) === undefined){"+
                    "window.address_errors['2'] = {value: placeholder2, valid: false};"+
                    "}else{"+
                    "window.address_errors['2'] = {value: placeholder2, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    
                    "if(typeof window.address_string[2] !== 'undefined' && typeof window.address_string[2]['from'] !== 'undefined'){}else{"+
                    "window.address_string[2] = obj; "+
                    "}"+
                    
                    "window.address_string['2']['address_data'] = new Array(JSON.stringify(auto3.getPlace().address_components));"+
                    //"inputs[3].disabled = false;"+
                    "};"+
                   " });"+
                "var auto4 = new google.maps.places.Autocomplete(inputs[3]);"+
                "var placeholder3 = inputs[3].getAttribute('placeholder');"+
                "window.second_dates_selected = null;"+
                    "inputs[3].addEventListener('click',function(){"+
                    "var selects = document.getElementsByClassName('second_select');"+
                    "var res = (function(){"+
                    "                    for(var i = 0; i < selects.length; i++){"+
                    "                        if(selects[i].selectedIndex <= 0){"+
                    "                            window.second_dates_selected = false;"+
                    "                        }"+
                    "                    }"+
                    "                    if(window.second_dates_selected === null){ window.second_dates_selected = true; }"+
                    "                    return window.second_dates_selected;"+
                    "        })();    "+
                    " if(window.address_errors['2']){}else if(!window.address_errors['2'] || window.address_errors['2'] === undefined){"+
                        "inputs[3].value = '';"+
                        "inputs[3].disabled = true; "+
                        "window.address_errors['2'] = {value: placeholder2, valid: false};"+
                    "   alert('The '+placeholder2+' field above is either empty or of an invalid address format.');"+
                    "}"+
                    " if(!window.second_dates_selected){"+
                        "inputs[3].value = '';"+
                        "inputs[3].disabled = true; "+
                        "window.address_errors['2'] = {value: placeholder2, valid: false};"+
                    "   alert('You must also enter the dates of your residency at the '+placeholder2+'.');"+
                    "}else{"+  
                        "inputs[3].value = '';"+
                        "inputs[3].disabled = false; "+                  
                        "window.address_errors['2'] = {value: placeholder2, valid: true};"+
                    "}"+
                    "},false);"+
                    "google.maps.event.addListener(auto4, 'place_changed', function() {"+
                    "if(JSON.stringify(auto4.getPlace().address_components) === undefined){"+
                    "window.address_errors['3'] = {value: placeholder3, valid: false};"+
                    "}else{"+
                    "window.address_errors['3'] = {value: placeholder3, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    
                    "if(typeof window.address_string[3] !== 'undefined' && typeof window.address_string[3]['from'] !== 'undefined'){}else{"+
                    "window.address_string[3] = obj; "+
                    "}"+
                    
                    "window.address_string['3']['address_data'] = new Array(JSON.stringify(auto4.getPlace().address_components));"+
                    "};"+
                   " });"+
            "}"+
            "function enter_event(val,next,index){"+
            "var addr = document.getElementById(val);"+
            "var placeholder = addr.getAttribute('placeholder');"+
            "var geocoder = new google.maps.Geocoder();"+
            "geocoder.geocode({'address':addr.value}, function(results,status){"+
             "if(status === google.maps.GeocoderStatus.OK && results.length > 0){"+
                "addr.value = results[0].formatted_address;"+
                "window.address_errors[index] = {value: placeholder, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    "if(typeof window.address_string[index] !== 'undefined' && typeof window.address_string[index]['from'] !== 'undefined'){}else{"+
                    "window.address_string[index] = obj; "+
                    "}window.address_string[index]['address_data'] = results[0].address_components;"+
                    "if(window.address_string[index]['postal_format']){"+
                           "window.address_string[index]['postal_format'] = '';"+
                     "}"+
                     "window.address_string[index]['postal_format'] = window.input_array[index].val();"+
                    "console.log(window.address_string[index]);"+
                    "document.getElementById(next).disabled = false;"+
                "}else{window.address_errors[index] = {value: placeholder, valid: false};}"+
                " });"+
            "}"+
            
            "function enter_event2(val,index){ "+
            "var addr = document.getElementById(val);"+
            "var placeholder = addr.getAttribute('placeholder');"+
            "var geocoder = new google.maps.Geocoder();"+
            "geocoder.geocode({'address':addr.value}, function(results,status){"+
             "if(status === google.maps.GeocoderStatus.OK && results.length > 0){"+
                "addr.value = results[0].formatted_address;"+
                "window.address_errors[index] = {value: placeholder, valid: true};"+
                    "var obj = {'from': '', 'to': '', 'address_data': {}};"+
                    "if(typeof window.address_string[index] !== 'undefined' && typeof window.address_string[index]['from'] !== 'undefined'){}else{"+
                    "window.address_string[index] = obj; "+
                    "}window.address_string[index]['address_data'] = results[0].address_components;"+
                    "if(window.address_string[index]['postal_format']){"+
                           "window.address_string[index]['postal_format'] = '';"+
                     "}"+
                     "window.address_string[index]['postal_format'] = window.input_array[index].val();"+
                    "console.log(window.address_string[index]);"+
                "}else{window.address_errors[index] = {value: placeholder, valid: false};}"+
                " });"+
            "}"+
        "</script>"+
        "<script id='src_script' type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBpZ9Aqju_O5xIJxFd96W4OeXWmA2iRaVE&libraries=places&callback=activateSearch'>\n\
        </script>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            
            var mo_sel = ref.$outer.find("#month");
            var year_sel = ref.$outer.find("#year");
            var mo_day_sel = ref.$outer.find("#month_day");
            
            window.input_array = new Array();
            window.input_array[0] = ref.$outer.find('#current');
            window.input_array[1] = ref.$outer.find('#first');
            window.input_array[2] = ref.$outer.find('#second');
            window.input_array[3] = ref.$outer.find('#third');
            
            window.date_bools = new Array();
            window.are_any_dates_selected = new Array();
            
            var current_from_mo_sel = ref.$outer.find("#current_from_month");
            var current_from_year_sel = ref.$outer.find("#current_from_year");
            var current_from_mo_day_sel = ref.$outer.find("#current_from_day");
            
            var current_to_mo_sel = ref.$outer.find("#current_to_month");
            var current_to_year_sel = ref.$outer.find("#current_to_year");
            var current_to_mo_day_sel = ref.$outer.find("#current_to_day");
            
            var first_from_mo_sel = ref.$outer.find("#first_from_month");
            var first_from_year_sel = ref.$outer.find("#first_from_year");
            var first_from_mo_day_sel = ref.$outer.find("#first_from_day");
            
            var first_to_mo_sel = ref.$outer.find("#first_to_month");
            var first_to_year_sel = ref.$outer.find("#first_to_year");
            var first_to_mo_day_sel = ref.$outer.find("#first_to_day");
            
            var second_from_mo_sel = ref.$outer.find("#second_from_month");
            var second_from_year_sel = ref.$outer.find("#second_from_year");
            var second_from_mo_day_sel = ref.$outer.find("#second_from_day");
            
            var second_to_mo_sel = ref.$outer.find("#second_to_month");
            var second_to_year_sel = ref.$outer.find("#second_to_year");
            var second_to_mo_day_sel = ref.$outer.find("#second_to_day");
            
            var third_from_mo_sel = ref.$outer.find("#third_from_month");
            var third_from_year_sel = ref.$outer.find("#third_from_year");
            var third_from_mo_day_sel = ref.$outer.find("#third_from_day");
            
            var third_to_mo_sel = ref.$outer.find("#third_to_month");
            var third_to_year_sel = ref.$outer.find("#third_to_year");
            var third_to_mo_day_sel = ref.$outer.find("#third_to_day");
            
            var submit = ref.$outer.find("#page2_submit_button");
            var save = ref.$outer.find("#page2_save_button");
            
            date_filler.fillMonths(mo_sel,1,12);
            date_filler.fillYears(year_sel,1978,2018);
            date_filler.setMonthSelect(1,false,mo_sel,mo_day_sel,year_sel);
            date_filler.setYearSelect(1,year_sel,mo_sel,mo_day_sel);
            date_filler.setMonthDaySelect(mo_sel,mo_day_sel,year_sel);
            
            
            var remove_window_objects = function(){
                delete window.address_string;
                delete window.address_errors;
                delete window.current_dates_selected;
                delete window.first_dates_selected;
                delete window.second_dates_selected;
                delete window.input_array;
                delete window.date_bools;
                delete window.are_any_dates_selected;
            };
            
            var intervals = new Array();
            var addIntervals = function(int){
                intervals.push(int);
            };
            var clearIntervals = function(){
                for(var i = 0; i < intervals.length; i++){
                    clearInterval(intervals[i]);
                    intervals[i] = null;
                }
            };
            
            var h1 = setInterval(function(){
                if(window.address_errors === undefined || window.address_errors['0'] === undefined || !window.address_errors['0']['valid']){
                }else if(window.address_errors['0']['valid'] && (window.current_dates_selected === null || !window.current_dates_selected)){
                        date_filler.fillMonths(current_from_mo_sel,1,12);
                        date_filler.fillYears(current_from_year_sel,1978,2018);
                        date_filler.setMonthSelect(1,false,current_from_mo_sel,current_from_mo_day_sel,current_from_year_sel);
                        date_filler.setYearSelect(1,current_from_year_sel,current_from_mo_sel,current_from_mo_day_sel);
                        
                        date_filler.fillMonths(current_to_mo_sel,new Date().getMonth()+1,new Date().getMonth()+1);
                        date_filler.fillYears(current_to_year_sel,new Date().getFullYear(),new Date().getFullYear());
                        current_to_mo_day_sel.append("<option>"+new Date().getDate()+"</option>");
                        clearInterval(h1);
                        h1 = null;
                }
            },250);    
            window.date_bools[0] = {'check':true,'set':null};
            window.are_any_dates_selected[0] = null;
            current_from_mo_sel.change(function(){ window.date_bools[0]['check'] = false; });
            current_from_year_sel.change(function(){ window.date_bools[0]['check'] = false; });
            current_from_mo_day_sel.change(function(){ window.date_bools[0]['check'] = false; });
            first_from_year_sel.change(function(){
                           if($(this).find('option:selected').text() === current_from_year_sel.find('option:selected').text()){
                               first_from_mo_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               first_from_mo_sel.append("<option value='0'></option>");
                               first_from_mo_day_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               var date = date_filler.getDate(current_from_year_sel.find('option:selected').text(),
                                                                current_from_mo_sel.find('option:selected').val()-1,
                                                               current_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               if(date.getMonth() > new_date.getMonth()){
                                   first_from_mo_sel.find('option').each(function(){
                                        $(this).remove();
                                    });
                                    first_from_mo_sel.append("<option value='0'></option>");
                                    date_filler.fillMonths(first_from_mo_sel,1,new_date.getMonth()+1);
                               }else{
                                    date_filler.fillMonths(first_from_mo_sel,1,new_date.getMonth()+1);
                                }
                               if(new_date.getFullYear() !== date.getFullYear()){
                                   $(this).find('option').each(function(){
                                       $(this).remove();
                                   });
                                   $(this).append("<option value='0'></option>");
                                    date_filler.fillYears(first_from_year_sel,new_date.getFullYear(),date.getFullYear());
                                }
                           }else{
                                   first_from_mo_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   first_from_mo_sel.append("<option value='0'></option>");
                                   first_from_mo_day_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   date_filler.fillMonths(first_from_mo_sel,1,12);
                                   date_filler.setYearSelect(1,first_from_year_sel,first_from_mo_sel,first_from_mo_day_sel);
                           }
            });
            first_from_mo_sel.change(function(){
                            if($(this).find('option:selected').val() === current_from_mo_sel.find('option:selected').val()
                                    && (first_from_year_sel.find('option:selected').text() === current_from_year_sel.find('option:selected').text())){
                                
                               var date = date_filler.getDate(current_from_year_sel.find('option:selected').text(),
                                                                current_from_mo_sel.find('option:selected').val()-1,
                                                                current_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               
                               date_filler.setMonthFloor(1,new_date.getDate(),
                                                        first_from_mo_sel,first_from_mo_day_sel,first_from_year_sel);
                            }else if($(this).find('option:selected').val() < current_from_mo_sel.find('option:selected').val()
                                    && (first_from_year_sel.find('option:selected').text() === current_from_year_sel.find('option:selected').text())){
                                var date = date_filler.getDate(current_from_year_sel.find('option:selected').text(),
                                                                current_from_mo_sel.find('option:selected').val()-1,
                                                                current_from_mo_day_sel.find('option:selected').text());
                                var new_date = new Date(date.valueOf()-172800000); 
                               
                                date_filler.setMonthFloor(1,new_date.getDate(),
                                                        first_from_mo_sel,first_from_mo_day_sel,first_from_year_sel);
                            }else{
                                date_filler.setMonthFloor(1,false,
                                                        first_from_mo_sel,first_from_mo_day_sel,first_from_year_sel);
                            }
            });
            var current_selects = document.getElementsByClassName('current_select');
            var current_dates = setInterval(function(){
                var checker = 0;
                for(var i = 0; i < current_selects.length; i++){
                    if(current_selects[i].selectedIndex <= 0){
                        window.date_bools[0]['check'] = false;
                        checker += 1; 
                    }else{
                        window.are_any_dates_selected[0] = true;
                    }
                }
                if(checker === current_selects.length){window.are_any_dates_selected[0] = null;}
                if(!window.date_bools[0]['check']){
                    if(typeof window.address_string['0'] !== 'undefined'){
                        window.address_string['0']['total_time'] = null;
                    } 
                    window.date_bools[0]['set'] = false;
                    document.getElementById('first').disabled = true;
                    window.are_any_dates_selected[1] = null;
                    if(window.input_array[1].hasClass('error')){window.input_array[1].removeClass('error');}
                    window.input_array[1].val('');
                    var first_selects = ref.$outer.find('.first_select');
                    first_selects.find('option').each(function(){
                        $(this).remove();
                    });
                    first_selects.each(function(){
                        $(this).append("<option value='0'></option>");
                    });
                    ref.$outer.find('.first_to').find('option').each(function(){
                        $(this).remove();
                    });
                }else{
                        if(window.address_string['0']['total_time'] === null){ 
                            window.date_bools[0]['set'] = true;
                            if(window.input_array[0].hasClass('error')){window.input_array[0].removeClass('error');}
                            window.are_any_dates_selected[0] = null;
                            document.getElementById('first').disabled = false;
                            window.address_string['0']['from'] = current_from_year_sel.find('option:selected').text()+'-'+current_from_mo_sel.find('option:selected').val()+'-'+current_from_mo_day_sel.find('option:selected').text();
                            window.address_string['0']['to'] = current_to_year_sel.find('option:selected').text()+'-'+current_to_mo_sel.find('option:selected').val()+'-'+current_to_mo_day_sel.find('option:selected').text();
                            window.address_string['0']['total_time'] = (function(){
                                    var res = new Date(current_to_year_sel.find('option:selected').text(),current_to_mo_sel.find('option:selected').val()-1,current_to_mo_day_sel.find('option:selected').text()).valueOf() 
                                            - new Date(current_from_year_sel.find('option:selected').text(),current_from_mo_sel.find('option:selected').val()-1,current_from_mo_day_sel.find('option:selected').text()).valueOf();
                                    return res/31536000000;
                            })();
                            if(window.address_string['0']['postal_format']){
                                window.address_string['0']['postal_format'] = '';
                            }
                            window.address_string['0']['postal_format'] = (function(){return window.input_array[0].val();})();
                            console.log(window.address_string['0']);
                        }   
                    if(window.current_dates_selected && window.address_errors['1'] && window.address_errors['1']['valid']){
                        window.current_dates_selected = null;
                        
                        date_filler.fillMonths(first_from_mo_sel,1,12);
                        date_filler.fillYears(first_from_year_sel,1978,current_from_year_sel.val());
                        date_filler.setMonthFloor(1,false,first_from_mo_sel,first_from_mo_day_sel,first_from_year_sel);
                        date_filler.setYearSelect(1,first_from_year_sel,first_from_mo_sel,first_from_mo_day_sel);
                        
                        
                        var date = date_filler.getDate(current_from_year_sel.find('option:selected').text(),
                                                                current_from_mo_sel.find('option:selected').val()-1,
                                                                current_from_mo_day_sel.find('option:selected').text());
                        var new_date = new Date(date.valueOf()-86400000); 
                        date_filler.fillMonths(first_to_mo_sel,new_date.getMonth()+1,new_date.getMonth()+1);
                        date_filler.fillYears(first_to_year_sel,new_date.getFullYear(),new_date.getFullYear());
                        first_to_mo_day_sel.append("<option>"+new_date.getDate()+"</option>");
                    }                    
                }
                    window.date_bools[0]['check'] = true;
            },250);
            addIntervals(current_dates);
            var current_input = document.getElementById('current');
            var current_input_interval = setInterval(function(){
                if(current_input.value === ''){
                    document.getElementById('first').disabled = true;
                }
            },250);
            addIntervals(current_input_interval);
              
            window.date_bools[1] = {'check':true,'set':null};
            window.are_any_dates_selected[1] = null;
            first_from_mo_sel.change(function(){ window.date_bools[1]['check'] = false; });
            first_from_year_sel.change(function(){ window.date_bools[1]['check'] = false; });
            first_from_mo_day_sel.change(function(){ window.date_bools[1]['check'] = false; });
            second_from_year_sel.change(function(){
                           if($(this).find('option:selected').text() === first_from_year_sel.find('option:selected').text()){
                               second_from_mo_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               second_from_mo_sel.append("<option value='0'></option>");
                               second_from_mo_day_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               var date = date_filler.getDate(first_from_year_sel.find('option:selected').text(),
                                                                first_from_mo_sel.find('option:selected').val()-1,
                                                               first_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               if(date.getMonth() > new_date.getMonth()){
                                   second_from_mo_sel.find('option').each(function(){
                                        $(this).remove();
                                    });
                                    second_from_mo_sel.append("<option value='0'></option>");
                                    date_filler.fillMonths(second_from_mo_sel,1,new_date.getMonth()+1);
                               }else{
                                    date_filler.fillMonths(second_from_mo_sel,1,new_date.getMonth()+1);
                               }
                               if(new_date.getFullYear() !== date.getFullYear()){
                                   $(this).find('option').each(function(){
                                       $(this).remove();
                                   });
                                   $(this).append("<option value='0'></option>");
                                    date_filler.fillYears(second_from_year_sel,new_date.getFullYear(),date.getFullYear());
                                }
                           }else{
                                   second_from_mo_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   second_from_mo_sel.append("<option value='0'></option>");
                                   second_from_mo_day_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   date_filler.fillMonths(second_from_mo_sel,1,12);
                                   date_filler.setYearSelect(1,second_from_year_sel,second_from_mo_sel,second_from_mo_day_sel);
                           }
            });
            second_from_mo_sel.change(function(){
                            if($(this).find('option:selected').val() === first_from_mo_sel.find('option:selected').val()
                                    && (second_from_year_sel.find('option:selected').text() === first_from_year_sel.find('option:selected').text())){
                               var date = date_filler.getDate(first_from_year_sel.find('option:selected').text(),
                                                                first_from_mo_sel.find('option:selected').val()-1,
                                                                first_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               date_filler.setMonthFloor(1,new_date.getDate(),
                                                        second_from_mo_sel,second_from_mo_day_sel,second_from_year_sel);
                            }else if($(this).find('option:selected').val() < first_from_mo_sel.find('option:selected').val()
                                    && (second_from_year_sel.find('option:selected').text() === first_from_year_sel.find('option:selected').text())){
                                var date = date_filler.getDate(first_from_year_sel.find('option:selected').text(),
                                                                first_from_mo_sel.find('option:selected').val()-1,
                                                                first_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               date_filler.setMonthFloor(1,new_date.getDate(),
                                                        second_from_mo_sel,second_from_mo_day_sel,second_from_year_sel);
                            }else{
                                date_filler.setMonthFloor(1,false,
                                                        second_from_mo_sel,second_from_mo_day_sel,second_from_year_sel);
                            }
            });
            var first_selects = document.getElementsByClassName('first_select');
            var first_dates = setInterval(function(){
                var checker = 0;
                for(var i = 0; i < first_selects.length; i++){
                    if(first_selects[i].selectedIndex <= 0){
                        window.date_bools[1]['check'] = false;
                        checker += 1;
                    }else{
                        window.are_any_dates_selected[1] = true;
                    }
                }
                if(checker === first_selects.length){window.are_any_dates_selected[1] = null;}
                if(!window.date_bools[1]['check']){
                    if(typeof window.address_string['1'] !== 'undefined'){
                        window.address_string['1']['total_time'] = null;
                    }
                    window.date_bools[1]['set'] = false;
                    document.getElementById('second').disabled = true;
                    window.are_any_dates_selected[2] = null;
                    if(window.input_array[2].hasClass('error')){window.input_array[2].removeClass('error');}
                    window.input_array[2].val('');
                    var second_selects = ref.$outer.find('.second_select');
                    second_selects.find('option').each(function(){
                        $(this).remove();
                    });
                    second_selects.each(function(){
                        $(this).append("<option value='0'></option>");
                    });
                    ref.$outer.find('.second_to').find('option').each(function(){
                        $(this).remove();
                    });
                }else{
                    if(window.address_string['1']['total_time'] === null){
                        window.date_bools[1]['set'] = true;
                        if(window.input_array[1].hasClass('error')){window.input_array[1].removeClass('error');}
                            document.getElementById('second').disabled = false;
                            window.are_any_dates_selected[1] = null;
                            window.address_string['1']['from'] = first_from_year_sel.find('option:selected').text()+'-'+first_from_mo_sel.find('option:selected').val()+'-'+first_from_mo_day_sel.find('option:selected').text();
                            window.address_string['1']['to'] = first_to_year_sel.find('option:selected').text()+'-'+first_to_mo_sel.find('option:selected').val()+'-'+first_to_mo_day_sel.find('option:selected').text();
                            window.address_string['1']['total_time'] = (function(){
                                    var res = new Date(first_to_year_sel.find('option:selected').text(),first_to_mo_sel.find('option:selected').val()-1,first_to_mo_day_sel.find('option:selected').text()).valueOf() 
                                            - new Date(first_from_year_sel.find('option:selected').text(),first_from_mo_sel.find('option:selected').val()-1,first_from_mo_day_sel.find('option:selected').text()).valueOf();
                                    return res/31536000000;
                            })();
                            if(window.address_string['1']['postal_format']){
                                window.address_string['1']['postal_format'] = '';
                            }
                            window.address_string['1']['postal_format'] = (function(){return window.input_array[1].val();})();
                            console.log(window.address_string['1']);
                        }        
                    if(window.first_dates_selected && window.address_errors['2'] && window.address_errors['2']['valid']){
                        window.first_dates_selected = null;
                        
                        date_filler.fillMonths(second_from_mo_sel,1,12);
                        date_filler.fillYears(second_from_year_sel,1978,first_from_year_sel.val());
                        date_filler.setMonthFloor(1,false,second_from_mo_sel,second_from_mo_day_sel,second_from_year_sel);
                        date_filler.setYearSelect(1,second_from_year_sel,second_from_mo_sel,second_from_mo_day_sel);
                        
                        
                        var date = date_filler.getDate(first_from_year_sel.find('option:selected').text(),
                                                                first_from_mo_sel.find('option:selected').val()-1,
                                                                first_from_mo_day_sel.find('option:selected').text());
                        var new_date = new Date(date.valueOf()-86400000); 
                        date_filler.fillMonths(second_to_mo_sel,new_date.getMonth()+1,new_date.getMonth()+1);
                        date_filler.fillYears(second_to_year_sel,new_date.getFullYear(),new_date.getFullYear());
                        second_to_mo_day_sel.append("<option>"+new_date.getDate()+"</option>");
                    }                    
                }
                    window.date_bools[1]['check'] = true;
            },250);
            addIntervals(first_dates);
            var first_input = document.getElementById('first');
            var first_input_interval = setInterval(function(){
                if(first_input.value === ''){
                    document.getElementById('second').disabled = true;
                }
            },250);
            addIntervals(first_input_interval);
           
            window.date_bools[2] = {'check':true,'set':null};
            window.are_any_dates_selected[2] = null;
            second_from_mo_sel.change(function(){ window.date_bools[2]['check'] = false; });
            second_from_year_sel.change(function(){ window.date_bools[2]['check'] = false; });
            second_from_mo_day_sel.change(function(){ window.date_bools[2]['check'] = false; });
            third_from_year_sel.change(function(){
                           if($(this).find('option:selected').text() === second_from_year_sel.find('option:selected').text()){
                               third_from_mo_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               third_from_mo_sel.append("<option value='0'></option>");
                               third_from_mo_day_sel.find('option').each(function(){
                                   $(this).remove();
                               });
                               var date = date_filler.getDate(second_from_year_sel.find('option:selected').text(),
                                                                second_from_mo_sel.find('option:selected').val()-1,
                                                               second_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               if(date.getMonth() > new_date.getMonth()){
                                   third_from_mo_sel.find('option').each(function(){
                                        $(this).remove();
                                    });
                                    third_from_mo_sel.append("<option value='0'></option>");
                                    date_filler.fillMonths(third_from_mo_sel,1,new_date.getMonth()+1);
                               }else{
                                    date_filler.fillMonths(third_from_mo_sel,1,new_date.getMonth()+1);
                               }
                               if(new_date.getFullYear() !== date.getFullYear()){
                                   $(this).find('option').each(function(){
                                       $(this).remove();
                                   });
                                   $(this).append("<option value='0'></option>");
                                    date_filler.fillYears(third_from_year_sel,new_date.getFullYear(),date.getFullYear());
                                }
                           }else{
                                   third_from_mo_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   third_from_mo_sel.append("<option value='0'></option>");
                                   third_from_mo_day_sel.find('option').each(function(){
                                       $(this).remove();
                                   });
                                   date_filler.fillMonths(third_from_mo_sel,1,12);
                                   date_filler.setYearSelect(1,third_from_year_sel,third_from_mo_sel,third_from_mo_day_sel);
                           }
            });
            third_from_mo_sel.change(function(){
                            if($(this).find('option:selected').val() === second_from_mo_sel.find('option:selected').val()
                                    && (third_from_year_sel.find('option:selected').text() === second_from_year_sel.find('option:selected').text())){
                               var date = date_filler.getDate(second_from_year_sel.find('option:selected').text(),
                                                                second_from_mo_sel.find('option:selected').val()-1,
                                                                second_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               date_filler.setMonthFloor(1,new_date.getDate(),
                                                        third_from_mo_sel,third_from_mo_day_sel,third_from_year_sel);
                            }else if($(this).find('option:selected').val() < second_from_mo_sel.find('option:selected').val()
                                    && (third_from_year_sel.find('option:selected').text() === second_from_year_sel.find('option:selected').text())){
                                var date = date_filler.getDate(second_from_year_sel.find('option:selected').text(),
                                                                second_from_mo_sel.find('option:selected').val()-1,
                                                                second_from_mo_day_sel.find('option:selected').text());
                               var new_date = new Date(date.valueOf()-172800000); 
                               date_filler.setMonthFloor(1,new_date.getDate(),
                                                        third_from_mo_sel,third_from_mo_day_sel,third_from_year_sel);
                            }else{
                                date_filler.setMonthFloor(1,false,
                                                        third_from_mo_sel,third_from_mo_day_sel,third_from_year_sel);
                            }
            });
            var second_selects = document.getElementsByClassName('second_select');
            var second_dates = setInterval(function(){
                var checker = 0;
                for(var i = 0; i < second_selects.length; i++){
                    if(second_selects[i].selectedIndex <= 0){
                        window.date_bools[2]['check'] = false;
                    }else{
                        window.are_any_dates_selected[2] = true;
                    }
                }
                if(checker === second_selects.length) window.are_any_dates_selected[2] = null;
                if(!window.date_bools[2]['check']){
                    if(typeof window.address_string['2'] !== 'undefined'){
                        window.address_string['2']['total_time'] = null;
                    }
                    window.date_bools[2]['set'] = false;
                    document.getElementById('third').disabled = true;
                    window.are_any_dates_selected[3] = null;
                    if(window.input_array[3].hasClass('error')){window.input_array[3].removeClass('error');}
                    window.input_array[3].val('');
                    var third_selects = ref.$outer.find('.third_select');
                    third_selects.find('option').each(function(){
                        $(this).remove();
                    });
                    third_selects.each(function(){
                        $(this).append("<option value='0'></option>");
                    });
                    ref.$outer.find('.third_to').find('option').each(function(){
                        $(this).remove();
                    });
                }else{
                    if(window.address_string['2']['total_time'] === null){
                        window.date_bools[2]['set'] = true;
                        if(window.input_array[2].hasClass('error')){window.input_array[2].removeClass('error');}
                        document.getElementById('third').disabled = false;
                        window.are_any_dates_selected[2] = null;
                        window.address_string['2']['from'] = second_from_year_sel.find('option:selected').text()+'-'+second_from_mo_sel.find('option:selected').val()+'-'+second_from_mo_day_sel.find('option:selected').text();
                        window.address_string['2']['to'] = second_to_year_sel.find('option:selected').text()+'-'+second_to_mo_sel.find('option:selected').val()+'-'+second_to_mo_day_sel.find('option:selected').text();
                        window.address_string['2']['total_time'] = (function(){
                            var res = new Date(second_to_year_sel.find('option:selected').text(),second_to_mo_sel.find('option:selected').val()-1,second_to_mo_day_sel.find('option:selected').text()).valueOf() 
                                    - new Date(second_from_year_sel.find('option:selected').text(),second_from_mo_sel.find('option:selected').val()-1,second_from_mo_day_sel.find('option:selected').text()).valueOf();
                            return res/31536000000;
                        })();
                            if(window.address_string['2']['postal_format']){
                                window.address_string['2']['postal_format'] = '';
                            }
                        window.address_string['2']['postal_format'] = (function(){return window.input_array[2].val();})();
                        console.log(window.address_string['2']);
                    }
                    if(window.second_dates_selected && window.address_errors['3'] && window.address_errors['3']['valid']){
                        window.second_dates_selected = null;                        
                        
                        date_filler.fillMonths(third_from_mo_sel,1,12);
                        date_filler.fillYears(third_from_year_sel,1978,second_from_year_sel.val());
                        date_filler.setMonthFloor(1,false,third_from_mo_sel,third_from_mo_day_sel,third_from_year_sel);
                        date_filler.setYearSelect(1,third_from_year_sel,third_from_mo_sel,third_from_mo_day_sel);
                        
                        var date = date_filler.getDate(second_from_year_sel.find('option:selected').text(),
                                                        second_from_mo_sel.find('option:selected').val()-1,
                                                        second_from_mo_day_sel.find('option:selected').text());
                        var new_date = new Date(date.valueOf()-86400000);
                        date_filler.fillMonths(third_to_mo_sel,new_date.getMonth()+1,new_date.getMonth()+1);
                        date_filler.fillYears(third_to_year_sel,new_date.getFullYear(),new_date.getFullYear());
                        third_to_mo_day_sel.append("<option>"+new_date.getDate()+"</option");
                    }
                }
                    window.date_bools[2]['check'] = true;
            },250);
            addIntervals(second_dates);
            var second_input = document.getElementById('second');
            var second_input_interval = setInterval(function(){
                if(second_input.value === ''){
                    document.getElementById('third').disabled = true;
                }
            },250);
            addIntervals(second_input_interval);
            
            window.date_bools[3] = {'check':true,'set':null};
            window.are_any_dates_selected[3] = null;
            var third_selects = document.getElementsByClassName('third_select');
            var third_dates = setInterval(function(){
                var checker = 0;
                for(var i = 0; i < third_selects.length; i++){
                    if(third_selects[i].selectedIndex <= 0){
                        window.date_bools[3]['check'] = false;
                    }else{
                        window.are_any_dates_selected[3] = true;
                    }
                }
                if(checker === third_selects.length)window.are_any_dates_selected[3] = null;
                if(!window.date_bools[3]['check']){
                    if(typeof window.address_string['3'] !== 'undefined'){
                        window.address_string['3']['total_time'] = null;
                    }
                    window.date_bools[3]['set'] = false;
                }else{
                    if(window.address_string['3']['total_time'] === null){
                        window.date_bools[3]['set'] = true;
                        if(window.input_array[3].hasClass('error')){window.input_array[3].removeClass('error');}
                        window.are_any_dates_selected[3] = null;
                        window.address_string['3']['from'] = third_from_year_sel.find('option:selected').text()+'-'+third_from_mo_sel.find('option:selected').val()+'-'+third_from_mo_day_sel.find('option:selected').text();
                        window.address_string['3']['to'] = third_to_year_sel.find('option:selected').text()+'-'+third_to_mo_sel.find('option:selected').val()+'-'+third_to_mo_day_sel.find('option:selected').text();
                        window.address_string['3']['total_time'] = (function(){
                            var res = new Date(third_to_year_sel.find('option:selected').text(),third_to_mo_sel.find('option:selected').val()-1,third_to_mo_day_sel.find('option:selected').text()).valueOf() 
                                    - new Date(third_from_year_sel.find('option:selected').text(),third_from_mo_sel.find('option:selected').val()-1,third_from_mo_day_sel.find('option:selected').text()).valueOf();
                            return res/31536000000;
                        })();
                            if(window.address_string['3']['postal_format']){
                                window.address_string['3']['postal_format'] = '';
                            }
                        window.address_string['3']['postal_format'] = (function(){return window.input_array[3].val();})();
                        console.log(window.address_string['3']);
                    }
                }
                window.date_bools[3]['check'] = true;
            },250);
            addIntervals(third_dates);
            
            submit.click(function(){ 
                if(Questions["1"].collect("done",ref)){
                    clearIntervals();
                    remove_window_objects();
                    ref.$outer.find('.q2_wrapper').remove();
                    ref.$outer.find('#main_script').remove();
                    ref.$outer.find('#src_script').remove();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                }else{
                    return;
                }                
            });
            var save_and_close = function(){
                Questions["1"].collect(ref);
                remove_window_objects();
                ref.$outer.find('.q2_wrapper').remove();
                ref.$outer.find('#main_script').remove();
                ref.$outer.find('#src_script').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
            };
            events.on('on_window_close',save_and_close);
            save.click(function(){
                save_and_close();
                clearIntervals();
                remove_window_objects();
                Logger.LOG('out',Questions["1"].user_ref.getUsername());
                window.location.href = "index.html";
            });
        },
        collect: function(){
            // Must return true or false
            var submit = function(){
                var obj = {
                            "last_phys_exam" : (function(){return Questions["1"].user_ref.getLastPhysicalExam();})(),
                            "address_completed": (function(){return (Questions["1"].user_ref.RESIDENCY_COMPLETED ? 'T' : 'F');})(),
                            "last_page_completed": (function(){return Questions["1"].user_ref.getLastPageCompleted(); })(),  
                            "username" : (function(){return Questions["1"].user_ref.getUsername();})(),                          
                            "addresses" : (function(){return Questions["1"].user_ref.getAddresses();})()
                };
                var data = JSON.stringify(obj);
                var len = data.length;
                var size_obj = {size:len};           
                var callback = function(d){
                    var request = (function(){
                        if(window.XMLHttpRequest){
                            return new XMLHttpRequest();
                        }else{
                            return new ActiveXObject('Microsoft.XMLHTTP');
                        }
                    })();
                    request.open('post','http://olthompson.com:6373',true);
                    request.onreadystatechange = function(){};
                    request.send(d);
                };
                var pre_request = (function(){
                    if(window.XMLHttpRequest){
                        return new XMLHttpRequest();
                    }else{
                        return new ActiveXObject('Microsoft.XMLHTTP');
                    }
                })();
                pre_request.open('post','http://olthompson.com:6372',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.status === 200 && pre_request.readyState === 4){
                        console.log("pre_response: "+pre_request.responseText);
                        callback(data);
                    }
                };
                pre_request.send(JSON.stringify(size_obj));
            };
            var exam_error_string = "";
	    var year_accum, sum;
            year_accum = sum = 0;
            while(Questions["1"].user_ref['addresses'][sum]){
                year_accum = (Questions["1"].user_ref['addresses'][sum]['total_time']) ? (year_accum+Questions["1"].user_ref['addresses'][sum]['total_time']) : (year_accum + 0);
                sum++;
            }
	    var error_string = "";
            var ref = (arguments.length>1) ? arguments[1] : arguments[0];
	    var exam_date = (function(){
                    var yr = ref.$outer.find("#exam_div").find("#year").find("option:selected").text();
                    var mo = ref.$outer.find("#exam_div").find("#month").find("option:selected").val();
                    var day = ref.$outer.find("#exam_div").find("#month_day").find("option:selected").text();
                    var today = new Date();
                    var e_date = new Date(yr,mo-1,day);
                    if(e_date.valueOf() > today.valueOf()){
                        exam_error_string = "The date of your last exam cannot be a future date";
                        return "";
                    }
                    if(yr.length === 0 || mo.length === 0 || day.length === 0){
                        exam_error_string = "You must specify the year, month and day of your last physical exam\n";
			return "";
                    }else{
                        return yr+"-"+mo+"-"+day;
                    }
            })();
            var collect_addrs = function(){
                        for(var i = 0 ; i < 4; i++){
                            if(Questions["1"].user_ref['addresses'][i])continue;
                            if(typeof window.address_errors['0'] === 'undefined' || !window.address_errors['0']['valid']){
                                error_string = "The Current Address field is either blank or invalid.\n";
                                break;
                            }
                            if(typeof window.address_errors[i] === 'undefined'){
                                var placeholder = window.input_array[i].attr('placeholder');
                                if(year_accum >= 3){
                                    if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                        continue;
                                    }else{
                                        error_string = "You have provided at least 3 years of residency, but the value provided for your "+placeholder+" is either blank or invalid.\n";
                                        break;
                                    }
                                }else{
                                    error_string = "The value provided for your "+placeholder+" is either blank or invalid.\n";
                                    window.input_array[i].addClass('error');
                                    break;
                                }
                            }
                            if(!window.address_errors[i]['valid']){
                                if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                    if(year_accum >= 3){
                                        continue;
                                    }else{
                                        error_string = "The dates you selected add up to less than 3 years of residency. You have room in the "+window.address_errors[i]['value']+" field to add another address.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }
                                }else if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === true){
                                    if(year_accum >= 3){
                                        error_string = "You have an incomplete date in the "+window.address_errors[i]['value']+" field. Please add an address and complete the date or leave both blank.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }else{
                                        error_string = "You have an incomplete date in the "+window.address_errors[i]['value']+" field. Please add an address and complete the date.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }
                                }else if(window.date_bools[i]['set'] === true && window.are_any_dates_selected[i] === null){
                                    if(year_accum >= 3){
                                        error_string = "You have completed your length of residency for the "+window.address_errors[i]['value']+" field, but you've left the address blank. Please add an address or leave both the address and dates blank.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }else{// if value
                                        error_string = "You have completed your length of residency for the "+window.address_errors[i]['value']+" field, but you've left the address blank. Please add an address.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }
                                }
                            }else{ 
                                if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                    if(year_accum >= 3){
                                        continue;
                                    }else{
                                        error_string = "The dates for your "+window.address_errors[i]['value']+" are incomplete.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }
                                }else if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === true){
                                    if(year_accum >= 3){
                                        error_string = "You have an incomplete date for your "+window.address_errors[i]['value']+". Please complete the date or leave both the address and date on that line blank.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }else{
                                        error_string = "The dates for your "+window.address_errors[i]['value']+" are incomplete.\n";
                                        window.input_array[i].addClass('error');
                                        break;
                                    }
                                }else{ 
                                    if(i > 0 && window.input_array[i].val() === window.input_array[i-1].val()){
                                        error_string = "Your "+window.address_errors[i]['value']+" and your "+window.address_errors[i-1]['value']+" cannot be the same.\n";
                                        break;
                                    }else{
                                        year_accum += window.address_string[i]['total_time'];
                                    }
                                }
                            }
                        }
                        if(error_string.length > 0){
                            alert(error_string);
                            return false;
                        }else{
                            return true;
                        }
		};
            var save_and_collect = function(){
                for(var i = 0 ; i < 4; i++){                            
                            if(typeof window.address_errors['0'] === 'undefined' || !window.address_errors['0']['valid']){
                                break;
                            }
                            if(typeof window.address_errors[i] === 'undefined'){
                                if(year_accum >= 3){
                                    if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                        continue;
                                    }else{
                                        break;
                                    }
                                }else{
                                    break;
                                }
                            }
                            if(!window.address_errors[i]['valid']){
                                if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                    if(year_accum >= 3){
                                        continue;
                                    }else{
                                        break;
                                    }
                                }else if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === true){
                                    break;
                                }else if(window.date_bools[i]['set'] === true && window.are_any_dates_selected[i] === null){
                                    break;
                                }
                            }else{ 
                                if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === null){
                                    if(year_accum >= 3){
                                        continue;
                                    }else{
                                        break;
                                    }
                                }else if(window.date_bools[i]['set'] === false && window.are_any_dates_selected[i] === true){
                                    break;
                                }else{ 
                                    if(i > 0 && window.input_array[i].val() === window.input_array[i-1].val()){
                                        break;
                                    }else{
                                        year_accum += window.address_string[i]['total_time'];
                                    }
                                }
                            }
                        }
            };
            if(arguments[0] === "done"){
                // submit has been pressed, so check to be sure all fields have been populated. If something is missing,
                // alert which field must be populated and return false. If all fields have been populated, return true.
                if(exam_date.length === 0){
                    alert(exam_error_string);
                    return false;
                }
                var res = collect_addrs();
                if(!res){
                    return false;
                }
		if(year_accum < 3){
			alert("The dates, as entered, do not add up to three years of residency.");
			Questions["1"].user_ref.RESIDENCY_COMPLETED = false;
			return false;
		}
                if(exam_date.length > 0){
                    Questions["1"].user_ref.setLastPhysicalExam(exam_date);
                    Questions["1"].user_ref.setAddresses(window.address_string);
		    Questions["1"].user_ref.RESIDENCY_COMPLETED = true;
                    // Now package all the preceding prop vals into an object to be passed to user_ref - which will
                    // submit them to the database...
                    Questions["1"].user_ref.setLastPageCompleted("2");
                    submit();
                    return true;
                }
            }else if(arguments[0] !== "done"){
                // save and quit has been pressed, so just save whatever fields hsve been populated and return true;
                save_and_collect();
                if(year_accum < 3){
                    Questions["1"].user_ref.RESIDENCY_COMPLETED = false;
		}else if(year_accum >=3){
                    Questions["1"].user_ref.RESIDENCY_COMPLETED = true;
                }
                if(exam_date.trim().length === 0){
                    Questions["1"].user_ref.setLastPhysicalExam("NULL");
                }else{
                    Questions["1"].user_ref.setLastPhysicalExam(exam_date);
                }
		if(window.address_string.length === 0){
                    Questions["1"].user_ref.setAddresses("NULL");
                }else{
                    Questions["1"].user_ref.setAddresses(window.address_string);
                }                
                Questions["1"].user_ref.setLastPageCompleted("1");
                submit();
                return true;
            }
        }
    },
    "2":{
        user_ref: "",
        text: "<div class='q3_wrapper'>"+
"                <div id='education' class='q3_div'>"+
"                    <label>Highest grade level completed for each:  </label>"+
"                    <label style='margin-left: 1%'>Grade School </label><select id='grade'><option value='0'>0</option></select>"+
"                    <label>College </label><select id='college'><option value='0'>0</option></select>"+
"                    <label>Post Grad </label><select id='grad'><option value='0'>0</option></select>"+
"                </div>"+
"                <div id='employ_hist' class='q3_div'>"+
"                    <label>Give a record of all employment for the past three years, including any unemployment"+
"                    or self-employment. Click \"submit\" after each entry. Once you've provided three years' experience,"+
"                    you can move on to the next page. Begin with your current or most recent employer.</label>"+
"                </div>"+
"                <div id='employer' class='q3_div'>"+
"                    <input type='text' id='employer_name' placeholder='Employer'/>"+
"                    <input type='text' id='employer_address' placeholder='Employer Address'/>"+
"                    <input type='text' id='employer_phone' placeholder='Emplpoyer Phone Number'/>"+
"                </div>"+
"                <div id='prev_emp_dates' class='q3_div'>"+
"                    <label> From: </label>"+
"                    <select class='from_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='from_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='from_day'>"+
"                        <option value='0'></option>"+
"                    </select><label> To: </label>"+
"                    <select class='to_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='to_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='to_day'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <input type='text' id='position' style='width: 22.5%; margin-left: 1%' placeholder='Position held' />"+
"                    <input type='text' id='reason' style='width: 22.5%; margin-left: 1%' type='text' placeholder='Reason for leaving' />"+
"                </div>"+
"                <div id='regs' class='q3_div'>"+
"                    <label>Were you subject to the Federal Motor Carrier Safety Regulations while employed here?</label>"+
"                    <input id='regs_check_yes' type='checkbox' /><label>Yes  </label><input type='checkbox' id='regs_check_no'/><label>No</label>"+
"                </div>"+
"                <div id='dot_regs' class='q3_div'>"+
"                    <label>Was your job designated as a safety-sensitive function in any DOT-Regulated mode subject"+
"                        to the drug and alcohol testing requirements of 49 CFR Part 40?</label>"+
"                    <input type='checkbox' id='test_check_yes' /><label>Yes  </label><input type='checkbox' id='test_check_no'/><label>No</label>"+
"                    <button id='page3_submit_button' style='margin-top: 2%; text-align: center; left: 70%; position: absolute'>submit</button>"+
"                    <button id='page3_save_button' style='margin-top: 2%; text-align: center; left: 85%; position: absolute'>save/quit</button>"+
"                </div>"+
"            </div>"+
            "<script id='main_script2'>"+
               "function activateSearch(){"+
                    "window.employer_details = window.employer_details || {};"+
                    "window.employer_counter = window.employer_counter || 0;"+
                    "window.year_accum = window.year_accum || 0;"+
                    "window.employer_name = window.employer_name || null;"+
                    "window.employer_address = window.employer_address || null;"+
                    "window.employer_phone = window.employer_phone || null;"+
                    "window.unknown_address = window.unknown_address || {'postal_format':null,'adress_components':null};"+
                    "var employer = document.getElementById('employer_name');"+
                    "var address = document.getElementById('employer_address');"+
                    "var phone = document.getElementById('employer_phone');"+
                    "var auto_res = new google.maps.places.Autocomplete(employer);"+
                    "var auto_res2 = new google.maps.places.Autocomplete(address);"+
                    "google.maps.event.addListener(auto_res, 'place_changed', function(){"+
                        "if(auto_res.getPlace() === undefined){"+
                            "window.employer_name = false;"+
                            "window.employer_address = false;"+
                            "window.employer_phone = false;"+
                            "address.value = '';"+
                            "address.disabled = false;"+
                            "phone.value = '';"+
                            "phone.disabled = false;"+
                        "}else{"+ 
                            "window.employer_name = true;"+
                            "window.employer_address = true;"+
                            "window.employer_phone = true;"+
                            "employer.value = auto_res.getPlace().name;"+
                            "address.value = '';"+
                            "window.unknown_address['postal_format'] = null;"+
                            "window.unknown_address['address_components'] = null;"+
                            "address.value = auto_res.getPlace().formatted_address;"+
                            "address.disabled = true;"+
                            "google.maps.event.clearListeners(auto_res2,'place_changed');"+
                            "address.phone = '';"+
                            "phone.value = auto_res.getPlace().formatted_phone_number;"+
                            "phone.disabled = true;"+
                            "window.employer_details[window.employer_counter] = {};"+
                            "window.employer_details[window.employer_counter]['address_components'] = auto_res.getPlace().address_components;"+
                        "}"+
                    "});"+
                    
                    "employer.onblur = function(){"+
                        "if(auto_res.getPlace() === undefined || auto_res.getPlace().name === undefined){"+
                            "window.employer_name = false;"+
                            "window.employer_address = false;"+
                            "window.employer_phone = false;"+
                            "address.value = '';"+
                            "address.disabled = false;"+
                            "phone.value = '';"+
                            "phone.disabled = false;"+
                        "}else if(auto_res.getPlace().name !== employer.value && employer.value !== ''){"+
                            "window.employer_name = false;"+
                            "window.employer_address = false;"+
                            "window.employer_phone = false;"+
                            "address.value = '';"+
                            "address.disabled = false;"+
                            "phone.value = '';"+
                            "phone.disabled = false;"+
                        "}else if(auto_res.getPlace().name === employer.value && employer.value !== ''){"+ 
                            "window.employer_name = true;"+
                            "window.employer_address = true;"+
                            "window.employer_phone = true;"+
                            "employer.value = auto_res.getPlace().name;"+
                            "address.value = '';"+
                            "window.unknown_address['postal_format'] = null;"+
                            "window.unknown_address['address_components'] = null;"+
                            "address.value = auto_res.getPlace().formatted_address;"+
                            "address.disabled = true;"+
                            "google.maps.event.clearListeners(auto_res2,'place_changed');"+
                            "phone.value = auto_res.getPlace().formatted_phone_number;"+
                            "phone.disabled = true;"+
                        "}else if(employer.value === ''){"+
                            "window.employer_name = false;"+
                            "window.employer_address = false;"+
                            "window.employer_phone = false;"+
                            "address.value = '';"+
                            "address.disabled = true;"+
                            "window.unknown_address['postal_format'] = null;"+
                            "window.unknown_address['address_components'] = null;"+
                            "google.maps.event.clearListeners(auto_res2,'place_changed');"+
                            "phone.value = '';"+
                            "phone.disabled = true;"+
                        "}else if(employer.value !== '' && auto_res.getPlace() !== undefined){"+
                            "window.employer_name = true;"+
                            "window.employer_address = true;"+
                            "window.employer_phone = true;"+
                            "employer.value = auto_res.getPlace().name;"+
                            "address.value = '';"+
                            "window.unknown_address['postal_format'] = null;"+
                            "window.unknown_address['address_components'] = null;"+
                            "address.value = auto_res.getPlace().formatted_address;"+
                            "address.disabled = true;"+
                            "google.maps.event.clearListeners(auto_res2,'place_changed');"+
                            "address.phone = '';"+
                            "phone.value = auto_res.getPlace().formatted_phone_number;"+
                            "phone.disabled = true;"+
                            "window.employer_details[window.employer_counter] = {};"+
                            "window.employer_details[window.employer_counter]['address_components'] = auto_res.getPlace().address_components;"+
                        "}"+
                    "};"+
                    
                    "employer.onkeyup = function(event){"+
                        "if(this.value.length === 0){"+
                            "window.employer_name = false;"+
                            "window.employer_address = false;"+
                            "window.employer_phone = false;"+
                            "address.value = '';"+
                            "address.disabled = true;"+
                            "window.unknown_address['postal_format'] = null;"+
                            "window.unknown_address['address_components'] = null;"+
                            "google.maps.event.clearListeners(auto_res2,'place_changed');"+
                            "phone.value = '';"+
                            "phone.disabled = true;"+
                        "}"+
                    "};"+
                    
                    "address.onclick = function(){"+
                        "if(!address.disabled){"+
                            "google.maps.event.addListener(auto_res2,'place_changed',function(){"+
                                "if(auto_res2.getPlace() !== undefined){"+
                                "address.value = auto_res2.getPlace().formatted_address;"+
                                "window.unknown_address['postal_format'] = auto_res2.getPlace().formatted_address;"+
                                "window.unknown_address['address_components'] = auto_res2.getPlace().address_components;"+
                                "}"+
                            "});"+
                        "}"+
                    "};"+
                    "address.onblur = function(){"+
                        "if(!address.disabled){"+
                            "if(auto_res2.getPlace() !== undefined){"+
                                "address.value = auto_res2.getPlace().formatted_address;"+
                                "window.unknown_address['postal_format'] = auto_res2.getPlace().formatted_address;"+
                                "window.unknown_address['address_components'] = auto_res2.getPlace().address_components;"+
                            "}"+
                        "}"+
                    "};"+
                "}"+
             "</script>"+
             "<script id='src_script2' type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBpZ9Aqju_O5xIJxFd96W4OeXWmA2iRaVE&libraries=places&callback=activateSearch'>\n\
             </script>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            
            var regs_check_yes = ref.$outer.find('#regs_check_yes');
            var regs_check_no = ref.$outer.find('#regs_check_no');
            var test_check_yes = ref.$outer.find('#test_check_yes');
            var test_check_no = ref.$outer.find('#test_check_no');
            regs_check_yes.click(function(){
                $(this).prop('checked',true);
                regs_check_no.prop('checked',false);
            });
            regs_check_no.click(function(){
                $(this).prop('checked',true);
                regs_check_yes.prop('checked',false);
            });
            test_check_yes.click(function(){
                $(this).prop('checked',true);
                test_check_no.prop('checked',false);
            });
            test_check_no.click(function(){
                $(this).prop('checked',true);
                test_check_yes.prop('checked',false);
            });
            
            var grade_school = ref.$outer.find('#grade');
            var college = ref.$outer.find('#college');
            var grad_school = ref.$outer.find('#grad');
            var employer_address = ref.$outer.find('#employer_address');
            var employer_phone = ref.$outer.find('#employer_phone');
            employer_address[0].disabled = true;
            employer_phone[0].disabled = true;
            
            var from_mo = ref.$outer.find('.from_month');
            var from_yr = ref.$outer.find('.from_year');
            var from_day = ref.$outer.find('.from_day');
            var to_mo = ref.$outer.find('.to_month');
            var to_yr = ref.$outer.find('.to_year');
            var to_day = ref.$outer.find('.to_day');
            
            (function(){ 
                date_filler.set_dates(from_mo,from_yr,from_day,to_mo,to_yr,to_day,new Date());
                window.year_accum = 0;
            })();
            
            date_filler.fillGrades(grade_school,1,12);
            date_filler.fillGrades(college,1,4);
            date_filler.fillGrades(grad_school,1,4);
            
            var submit = ref.$outer.find("#page3_submit_button");
            var save = ref.$outer.find("#page3_save_button");
            
            function build_and_send(bool){
                Questions["2"].user_ref.setLastPageCompleted((function(){return (bool ? '3':'2');})());
                Questions["2"].user_ref.set_logged_in((function(){return (bool ? 'T':'F');})());
                Questions["2"].user_ref.set_grade_school((function(){return grade_school.find('option:selected').text();})());
                Questions["2"].user_ref.set_college((function(){return college.find('option:selected').text();})());
                Questions["2"].user_ref.set_grad_school((function(){return grad_school.find('option:selected').text();})());
                var obj = {
                    'grade_school': (function(){return Questions["2"].user_ref.get_grade_school();})(),
                    'college': (function(){return Questions["2"].user_ref.get_college();})(),
                    'grad_school': (function(){return Questions["2"].user_ref.get_grad_school();})(),
                    'last_page_completed': (function(){return Questions["2"].user_ref.getLastPageCompleted();})(),
                    'username': (function(){return Questions["2"].user_ref.getUsername();})(),
                    'logged_in': (function(){return Questions["2"].user_ref.get_logged_in();})(),
                    'employer_details': (function(){return JSON.stringify(window.employer_details);})()
                };
                var data = JSON.stringify(obj);
                var len = data.length;
                var size_obj = {size:len};
                var pre_request = (function(){
                    if(window.XMLHttpRequest){
                        return new XMLHttpRequest();
                    }else{
                        return ActiveXObject('Microsoft.XMLHTTP');
                    }
                })();
                var request = (function(){
                    if(window.XMLHttpRequest){
                        return new XMLHttpRequest();
                    }else{
                        return ActiveXObject('Microsoft.XMLHTTP');
                    }
                })();
                var callback = function(d){
                    request.open('post','http://olthompson.com:6375',true);
                    request.onreadystatechange = function(){};
                    request.send(d);
                };
                pre_request.open('post','http://olthompson.com:6374',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.readyState === 4 && pre_request.status === 200){
                        callback(data);
                    }
                };
                pre_request.send(JSON.stringify(size_obj));
            };
            
            function remove_window_objects(){
                delete window.employer_details;
                delete window.employer_counter;
                delete window.employer_name;
                delete window.employer_address;
                delete window.employer_phone;
                delete window.unknown_address;
                delete window.year_accum;
            }
            var save_and_close = function(){
                build_and_send(false);
                Questions["2"].collect(ref);
                ref.$outer.find('.q3_wrapper').remove();
                ref.$outer.find('#main_script2').remove();
                ref.$outer.find('#src_script2').remove();
                remove_window_objects();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
            };
            
            submit.click(function(){ 
                if(Questions["2"].collect("done",ref)){
                    build_and_send(true);
                    ref.$outer.find('.q3_wrapper').remove();
                    ref.$outer.find('#main_script2').remove();
                    ref.$outer.find('#src_script2').remove();
                    remove_window_objects();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                }else{
                    return;
                }                
            });
            events.on('on_window_close',save_and_close);
            save.click(function(){ // Address this function next...
                build_and_send(false);
                Questions["2"].collect(ref);
                ref.$outer.find('.q3_wrapper').remove();
                ref.$outer.find('#main_script2').remove();
                ref.$outer.find('#src_script2').remove();
                remove_window_objects();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                window.location.href = "index.html";
            });
        },
        collect: function(){
            var grade_school = $('body').find('#grade');
            var employer_name = $('body').find('#employer_name');
            var employer_address = $('body').find('#employer_address');
            var employer_phone = $('body').find('#employer_phone');
            var from_mo = $('body').find('.from_month');
            var from_yr = $('body').find('.from_year');
            var from_day = $('body').find('.from_day');
            var to_mo = $('body').find('.to_month');
            var to_yr = $('body').find('.to_year');
            var to_day = $('body').find('.to_day');
            var position = $('body').find('#position'); 
            var reason = $('body').find('#reason');
            var regs_check_yes = $('body').find('#regs_check_yes');
            var regs_check_no = $('body').find('#regs_check_no');
            var test_check_yes = $('body').find('#test_check_yes');
            var test_check_no = $('body').find('#test_check_no');
            
            var checker = function(obj){
                if(grade_school.find('option:selected').text() === '0'){
                    alert('Please specify the highest level of grade/high school you have completed.');
                    return false;
                }
                if(position.val().length === 0){
                    alert('You must specify your position.');
                    return false;
                }
                if(reason.val().length === 0){
                    alert('You must tell us the reason you left this position.');
                    return false;
                }
                if(!regs_check_yes.is(':checked') && !regs_check_no.is(':checked')){
                    alert('Please tell us if you were subjec to Federal Motor Carrier Safety Regulations while employed in this position.');
                    return false;
                }
                if(!test_check_yes.is(':checked') && !test_check_no.is(':checked')){
                    alert('Please tell us if this job was a safety-sensitive function in any DOT-Regulated mode subject to the drug and alcohol testing requirements of 49 CFR Part 40.');
                    return false;
                }
                obj['position'] = position.val();
                obj['reason_for_leaving'] = reason.val();
                obj['federal_motor_carrier_safety_regs'] = (regs_check_yes.is(':checked') ? 'Yes':'No');
                obj['49_CFR_part40_testing'] = (test_check_yes.is(':checked') ? 'Yes': 'No');
                regs_check_yes.prop('checked',false);
                regs_check_no.prop('checked',false);
                test_check_yes.prop('checked',false);
                test_check_no.prop('checked',false);
                return true;
            };
            
            if(window.employer_name && window.employer_address && window.employer_phone){
                if(!checker(window.employer_details[window.employer_counter])){return false;}
                window.employer_details[window.employer_counter]['employer'] = employer_name.val();
                window.employer_details[window.employer_counter]['postal_address'] = employer_address.val();
                window.employer_details[window.employer_counter]['phone'] = employer_phone.val();
                if(!date_filler.collect_dates(from_mo,from_yr,from_day,to_mo,to_yr,to_day,window.employer_details[window.employer_counter])){return false;}
                window.year_accum += window.employer_details[window.employer_counter]['total_time'];
                window.employer_counter += 1;
                position.val('');
                reason.val('');
                employer_name.val('');
                employer_address.val('');
                employer_address[0].disabled = true;
                employer_phone.val('');
                employer_phone[0].disabled = true;
                window.employer_name = null;
                window.employer_address = null;
                window.employer_phone = null;
                if(window.year_accum >= 3){
                    return true;
                }else{
                    return false;
                }
            }else if(employer_name.val().length === 0 || employer_address.val().length === 0 || employer_phone.val().length === 0){
                if(employer_name.val().length === 0){
                    alert('Employer name cannot be blank.');
                    return false;
                }else if(employer_address.val().length === 0){
                    alert('Employer address cannot be blank.');
                    return false;
                }else if(employer_phone.val().length === 0){
                    alert('Employer phone number cannot be blank.');
                    return false;
                }
            }else{
                window.employer_details[window.employer_counter] = {};
                if(!checker(window.employer_details[window.employer_counter])){return false;}
                window.employer_details[window.employer_counter]['employer'] = employer_name.val();
                window.employer_details[window.employer_counter]['postal_address'] = window.unknown_address['postal_format'];
                window.employer_details[window.employer_counter]['address_components'] = window.unknown_address['address_components'];
                window.employer_details[window.employer_counter]['phone'] = employer_phone.val();
                window.unknown_address['postal_format'] = null;
                window.unknown_address['address_components'] = null;
                if(!date_filler.collect_dates(from_mo,from_yr,from_day,to_mo,to_yr,to_day,window.employer_details[window.employer_counter])){return false;}
                window.year_accum += window.employer_details[window.employer_counter]['total_time'];
                window.employer_counter += 1;
                position.val('');
                reason.val('');
                employer_name.val('');
                employer_address.val('');
                employer_address[0].disabled = true;
                employer_phone.val('');
                employer_phone[0].disabled = true;
                window.employer_name = null;
                window.employer_address = null;
                window.employer_phone = null;
                if(window.year_accum >= 3){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    "3":{
        user_ref: "",
        text:"<div class='q4_wrapper'>"+
"                <div id='drive_history_dirs' class='q4_div'>"+
"                    <label>Provide all commercial driving experience for the past ten years. Select the class of equipment"+
"                    you've operated, then click \"add\" after each entry. "+
"                        Once you've provided ten years' experience, you can move on to the next section.</label>"+
"                </div>"+
"                <div id='class_of_equip' class='q4_div'>"+
"                    <label>Class</label><select id='equip_class' style='margin-left: 0.75%'>"+
"                        <option value='0'></option>"+
"                        <option value='1'>Straight Truck</option>"+
"                        <option value='2'>Tractor and Semi-trailer</option>"+
"                        <option value='3'>Tractor-two trailer</option>"+
"                        <option value='4'>Tractor-three trailer</option>"+
"                        <option value='5'>Other</option>"+
"                    </select>"+
"                    <label style='margin-left: 1%'>From </label>"+
"                    <select class='.from_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='.from_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='.from_day'>"+
"                        <option value='0'></option>"+
"                    </select><label style='margin-left: 1%'>To </label>"+
"                    <select class='.to_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='.to_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select class='.to_day'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <input style='width: 7.5%' type='text' id='num_miles' placeholder='Miles' />"+
"                    <button id='add_button' style='text-align: center'>add</button>"+
"                </div>"+
"                <div id='states' class='q4_div'><label>Press 'ctrl' key to select multiple states operated in for the last five years</label>"+
"                    <select id='state_sel' multiple>"+
"                        <option value='1'>Alabama</option>"+
"                        <option value='2'>Alaska</option>"+
"                        <option value='3'>Arizona</option>"+
"                        <option value='4'>Arkansas</option>"+
"                        <option value='5'>California</option>"+
"                        <option value='6'>Colorado</option>"+
"                        <option value='7'>Connecticut</option>"+
"                        <option value='8'>Delaware</option>"+
"                        <option value='9'>Florida</option>"+
"                        <option value='10'>Georgia</option>"+
"                        <option value='11'>Hawaii</option>"+
"                        <option value='12'>Idaho</option>"+
"                        <option value='13'>Illinois</option>"+
"                        <option value='14'>Indiana</option>"+
"                        <option value='15'>Iowa</option>"+
"                        <option value='16'>Kansas</option>"+
"                        <option value='17'>Kentucky</option>"+
"                        <option value='18'>Louisiana</option>"+
"                        <option value='19'>Maine</option>"+
"                        <option value='20'>Maryland</option>"+
"                        <option value='21'>Massachusetts</option>"+
"                        <option value='22'>Michigan</option>"+
"                        <option value='23'>Minnesota</option>"+
"                        <option value='24'>Mississippi</option>"+
"                        <option value='25'>Missouri</option>"+
"                        <option value='26'>Montana</option>"+
"                        <option value='27'>Nebraska</option>"+
"                        <option value='28'>Nevada</option>"+
"                        <option value='29'>New Hampshire</option>"+
"                        <option value='30'>New Jersey</option>"+
"                        <option value='31'>New Mexico</option>"+
"                        <option value='32'>New York</option>"+
"                        <option value='33'>North Carolina</option>"+
"                        <option value='34'>North Dakota</option>"+
"                        <option value='35'>Ohio</option>"+
"                        <option value='36'>Oklahoma</option>"+
"                        <option value='37'>Oregon</option>"+
"                        <option value='38'>Pennsylvania</option>"+
"                        <option value='39'>Rhode Island</option>"+
"                        <option value='40'>South Carolina</option>"+
"                        <option value='41'>South Dakota</option>"+
"                        <option value='42'>Tennessee</option>"+
"                        <option value='43'>Texas</option>"+
"                        <option value='44'>Utah</option>"+
"                        <option value='45'>Vermont</option>"+
"                        <option value='46'>Virginia</option>"+
"                        <option value='47'>Washington</option>"+
"                        <option value='48'>West Virginia</option>"+
"                        <option value='49'>Wisconsin</option>"+
"                        <option value='50'>Wyoming</option>"+
"                    </select>"+
"                </div>"+
"                <div class='q4_div'><label>List any special courses/training completed: </label>"+
"                    <input id='courses' type='text' placeholder='PTD/DDC, Haz Mat, etc.' /></div>"+
"                <div class='q4_div'><label>List any safe driving awards you hold and from whom: </label>"+
"                    <input id='awards' type='text' />"+
"                </div>"+
"                <div style='text-align: right'><button id='page4_submit_button' class='sub_butts'>submit</button>"+
"                <button id='page4_save_button' class='sub_butts'>save/quit</button></div>"+
"            </div>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            var submit = ref.$outer.find("#page4_submit_button");
            var save = ref.$outer.find("#page4_save_button");
            var equip_class = ref.$outer.find("#equip_class");
            var num_miles = ref.$outer.find("#num_miles");
            var add = ref.$outer.find("#add_button");
            var states = ref.$outer.find("#state_sel");
            var courses = ref.$outer.find("#courses");
            var awards = ref.$outer.find("#awards");
            var from_mo = ref.$outer.find('.from_month');
            var from_yr = ref.$outer.find('.from_year');
            var from_day = ref.$outer.find('.from_day');
            var to_mo = ref.$outer.find('.to_month');
            var to_yr = ref.$outer.find('.to_year');
            var to_day = ref.$outer.find('.to_day');
            
            function _populate(obj){
                var len = 0;
                if(obj['experience']['vehicles_array'] && obj['experience']['vehicles_array'].length > 0){
                   obj['experience']['vehicles_array'].forEach(function(item){
                       experience.vehicles_array.push(item);   
                       len++;
                   }); 
                   if(len === 0){}else{
                       ref.$outer.find('#equip_class').find('option[text="'+experience.vehicles_array[len-1].vehicle_class+'"]').prop('selected',true);
                       var miles = (isNaN(parseInt(experience.vehicles_array[len-1].total_miles)))?false:true;
                       if(miles)ref.$outer.find('#num_miles').val(experience.vehicles_array[len-1].total_miles);
                       var date = new Date(experience.vehicles_array[len-1].from);
                       if(date){
                           var d_str = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                       }
                       Application_Sequence.populate_date_cells(d_str,'.from_year','.from_month','.from_day',3);
                       date = new Date(experience.vehicles_array[len-1].to);
                       if(date){
                           var d_str = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                       }
                       Application_Sequence.populate_date_cells(d_str,'.to_year','.to_month','.to_day',3);
                   }
                   if(_get_total() >= 10){
                       ref.$outer.find('#class_of_equip').find('input,select,button').each(function(){$(this).prop('disabled',true);});
                   }
                }
                len = 0;
                if(obj['experience']['states'] && obj['experience']['states'].length > 0){
                   obj['experience']['states'].forEach(function(item){
                       experience.states.push(item);
                       ref.$outer.find('#state_sel').find('option[text="'+item+'"]').prop('selected',true);
                   }); 
                }
                if(obj['experience']['special_training'] && obj['experience']['special_training'].length > 0){
                    ref.$outer.find('#courses').val(obj['experience']['special_training']);
                }
                if(obj['experience']['awards'] && obj['experience']['awards'].length > 0){
                    ref.$outer.find('#awards').val(obj['experience']['awards']);
                }
            }
            (function(){ 
                date_filler.set_dates(from_mo,from_yr,from_day,to_mo,to_yr,to_day,new Date());
                _populate(Questions["3"].user_ref);
            })();
            
            function vehicles(){
                var obj = {
                    vehicle_class:'',
                    from:'',
                    to:'',
                    total_time:'',
                    total_miles: ''
                };
                return obj;
            }
            var experience = {
                username:'',
                last_page_completed:'',
                vehicles_array:[],
                states:[],
                special_training:'',
                awards:''
            };
            
            function _get_total(){
                var total = 0;
                experience.vehicles_array.forEach(function(item){
                    if(item["total_time"] !== null){
                        total += item["total_time"];
                    }
                });
                return total;
            }
            
            function check_fields(err_str,obj){
                if(equip_class.find("option:selected").val() < 1){
                    err_str = "You cannot leave equipment class unselected!";
                    return false;
                }
                var equip = equip_class.find("option:selected").text();
                var res = num_miles.val().trim().replace(/,/g,'');
                if(res === ''){
                    err_str = "You cannot leave the number of miles blank!";
                    return false;
                }
                if(isNaN(res)){
                    err_str = "You must specify a valid number of miles!";
                    return false;
                }
                if(date_filler.collect_dates(from_mo,from_yr,from_day,to_mo,to_yr,to_day,obj)){
                    obj["vehicle_class"] = equip;
                    obj["total_miles"] = res;
                    return true;
                }else{
                    return false;
                }
            }
            
            add.click(function(){
                var error_string = null;
                var obj = new vehicles();
                if(check_fields(error_string,obj)){
                    experience.vehicles_array.push(obj);
                }else{
                    if(error_string !== null){
                        alert(error_string);
                    }
                }
            });
            
            function _createXMLHttpRequest(){
                if(window.XMLHttpRequest){
                    return new XMLHttpRequest();
                }else{
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            
            function callback(data){  
                var request = _createXMLHttpRequest();
                request.open('post','http://olthompson.com:6377',true);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        var obj = JSON.parse(request.responseText);
                        if(obj['db_error'] === 'true'){
                            alert('Error connecting to database. Please try again later.');
                            window.location.href = 'index.html';
                        }
                    }
                };
                request.send(data);
            }
            
            function _write_to_file(){
                experience.username = Questions["3"].user_ref.getUsername();
                states.find("option:selected").each(function(){
                    if((experience.states.indexOf($(this).text())) < 0)
                        experience.states.push($(this).text());
                });
                experience.special_training = experience.special_training||courses.val().trim();
                experience.awards = experience.awards||awards.val().trim();
                var pre_request = _createXMLHttpRequest();
                var data = JSON.stringify(experience);
                var len = data.length;
                var obj = {size:len};
                pre_request.open('post','http://olthompson.com:6376',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.status === 200 && pre_request.readyState === 4){
                        callback(data);
                    }
                };
                pre_request.send(obj);
            }
            function save_and_close(){
                experience.last_page_completed = '3';
                _write_to_file();
                ref.$outer.find('.q4_wrapper').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
            }
            events.on('on_window_close',save_and_close);
            submit.click(function(){
                if(_get_total() >= 10){
                    if(states.find("option:selected").val() < 1){
                        alert("The list of states you have operated in over the last 10 years cannot contain a blank value!");
                        return;
                    }
                    experience.last_page_completed = '4';
                    _write_to_file();
                    ref.$outer.find('.q4_wrapper').remove();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                }else{
                    alert("The years of experience you've entered do not add up at least 10 years.");
                    return;
                }                
            });
            save.click(function(){
                save_and_close();
                window.location.href = "index.html";
            });
        }
    },
    "4":{
        user_ref: "",
        text:"<div class='q5_wrapper'>"+
"                <div id='accident_history_dirs' class='q5_div'>"+
"                    <label>Detail your accident history of the past three years. Click \"add\" after each entry. "+
"                        Once you have provided three years' history, you can move on to the next section. If you've had none, simply "+
"                       check \"done\" then click \"add\" and move ahead to the next section.</label>"+
"                </div>"+
"                <div id='date_of_accident' class='q5_div'>"+
"                    <label>Date of Accident</label>"+
"                    <select id='acc_mo' class='.from_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='acc_yr' class='.from_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='acc_day' class='.from_day'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <input type='text' id='accident_type' placeholder='Head on, rear end, etc.' />"+
"                    <input type='text' id='accident_location' placeholder='Location' />"+
"                    </div>"+
"                    <div class='q5_div'>"+
"                    <input style='width: 10%' type='text' id='fatalities' placeholder='# fatalities' />"+
"                    <input style='width: 10%' type='text' id='injuries' placeholder='# injuries' />"+
"                    <input type='checkbox' id='acc_done' /><label>done</label>"+
"                    <button id='acc_add' style='text-align: center'>add</button>"+
"                    </div>"+
"                <div id='traffic_history_dirs' class='q5_div'>"+
"                    <label>Detail your traffic convictions and forfeitures of the past three years. Click \"add\" after each entry. "+
"                        Once you have provided three years' history, check \"done\", click \"submit\" and you can move on to the next page.  If you've had none, simply "+
"                       check \"done\", click \"add\" then click \"submit\" and move on to the next page.</label>"+
"                </div>"+
"                <div class='q5_div'>"+
"                    <label>Date</label>"+
"                    <select id='con_mo' class='.from_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='con_yr' class='.from_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='con_day' class='.from_day'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <input type='text' id='traf_con_loc' placeholder='Location' />"+
"                    <input type='text' id='traffic_charge' placeholder='Charge' />"+
"                    </div>"+
"                    <div class='q5_div'>"+
"                    <input type='text' id='penalty' placeholder='Penalty' />"+
"                    <input type='checkbox' id='con_done' /><label>done</label>"+
"                    <button id='con_add' style='text-align: center'>add</button>"+
"                    <button class='sub_butts' id='page5_save_button' style='text-align: center; float: right'>save/quit</button>"+
"                    <button class='sub_butts' id='page5_submit_button' style='text-align: center; float: right'>submit</button>"+
"                   </div>"+
"                </div>"+
"<script id='main_script3'>"+
               "function activateSearch(){"+
		    "window.accidents_and_convictions = window.accidents_and_convictions || {};"+
                    "window.accidents_done = window.accidents_done || false;"+
            	    "window.convictions_done = window.convictions_done || false;"+
                    "window.tmp_acc_loc = window.tmp_acc_loc || null;"+
                    "window.tmp_con_loc = window.tmp_con_loc || null;"+
                    "var accident_location = document.getElementById('accident_location');"+
                    "var conviction_location = document.getElementById('traf_con_loc');"+
		    "var acc_mo = document.getElementById('acc_mo');"+
		    "var acc_yr = document.getElementById('acc_yr');"+
		    "var acc_day = document.getElementById('acc_day');"+
		    "var acc_type = document.getElementById('accident_type');"+
		    "var fatalities = document.getElementById('fatalities');"+
		    "var injuries = document.getElementById('injuries');"+
		    "var acc_done = document.getElementById('acc_done');"+
		    "var con_done = document.getElementById('con_done');"+
		    "var con_mo = document.getElementById('con_mo');"+
		    "var con_yr = document.getElementById('con_yr');"+
		    "var con_day = document.getElementById('con_day');"+
		    "var charge = document.getElementById('traffic_charge');"+
		    "var penalty = document.getElementById('penalty');"+
                    "var auto_res = new google.maps.places.Autocomplete(accident_location);"+
                    "var auto_res2 = new google.maps.places.Autocomplete(conviction_location);"+
                    "google.maps.event.addListener(auto_res, 'place_changed', function(){"+
                        "if(auto_res.getPlace() !== undefined && accident_location.value.trim() !== ''){"+
                            "window.tmp_acc_loc = auto_res.getPlace().address_components;"+
                        "}else{"+ 
                            "window.tmp_acc_loc = null;"+
                        "}"+
                    "});"+
                    
                    "document.getElementById('acc_add').onclick = function(){"+
                        "if(window.tmp_acc_loc !== null){"+
			    "if(acc_mo.value < 1 || acc_yr.value < 1 || acc_day.value < 1){alert('Please select a valid date.');return;}"+
                            "if(acc_type.value.trim() === ''){alert('You have specified the location of an accident. You must also specify the type of accident is was.'); return;}"+
			    "if(fatalities.value.trim() === '' || injuries.value.trim() === ''){alert('You have specified the location of an accident as well as the type of accident it was. You must include the number of fatalities and injuries that resulted - even if the answer is 0.'); return;}"+
                            "var obj = new window.accident();"+
                            "var yr = parseInt(acc_yr.options[acc_yr.selectedIndex].text);"+
                            "var mo = parseInt(acc_mo.options[acc_mo.selectedIndex].value);"+
                            "var day = parseInt(acc_day.options[acc_day.selectedIndex].text);"+
                             "obj.date = new Date(yr,mo-1,day).toDateString();"+
                             "obj.type = acc_type.value.trim();"+
                             "obj.location = window.tmp_acc_loc;"+
                             "obj.num_fatalities = fatalities.value.trim();"+
                             "obj.num_injuries = injuries.value.trim();"+
                             "window.accidents_and_convictions['accidents'].push(obj);"+
                             "if(acc_done.checked == true){window.accidents_done = true;}"+
                        "}else{"+
			    "if(acc_mo.value > 0 || acc_yr.value > 0 || acc_day.value > 0){alert('You have selected the date of an accident, but not a location.');return;}"+
                            "if(acc_type.value.trim() !== ''){alert('You have specified the type of accident, but you have not specified a valid location.'); return;}"+
			     "if(fatalities.value.trim() !== '' || injuries.value.trim() !== ''){alert('You have specified casualties that resulted from an accident, but not a valid location.'); return;}"+
			    "if(acc_done.checked == false){alert('If you have no accidents to include, please check \"done\" before clicking \"add\".'); return;}"+
			    "window.accidents_done = true;"+
                        "}"+
                    "};"+
                    
                    "google.maps.event.addListener(auto_res2, 'place_changed', function(){"+
                        "if(auto_res2.getPlace() !== undefined && conviction_location.value.trim() !== ''){"+
                            "window.tmp_con_loc = auto_res2.getPlace().address_components;"+
                        "}else{"+ 
                            "window.tmp_con_loc = null;"+
                        "}"+
                    "});"+
                    
                    "document.getElementById('con_add').onclick = function(){"+
                        "if(window.tmp_con_loc !== null){"+
			    "if(con_mo.value < 1 || con_yr.value < 1 || con_day.value < 1){alert('Please select a valid date.');return;}"+
                            "if(charge.value.trim() === ''){alert('You have specified the location of a conviction or forfeiture. You must also specify the type of charge you received.'); return;}"+
			    "if(penalty.value.trim() === ''){alert('You have specified the location of a conviction or forfeiture as well as the type of charge you received. You must also specify the penalty you received.'); return;}"+
			    "var obj = new window.conviction();"+
                            "var yr = parseInt(con_yr.options[con_yr.selectedIndex].text);"+
                            "var mo = parseInt(con_mo.options[con_mo.selectedIndex].value);"+
                            "var day = parseInt(con_day.options[con_day.selectedIndex].text);"+
                             "obj.date = new Date(yr,mo-1,day).toDateString();"+
                             "obj.location = window.tmp_con_loc;"+
                             "obj.charge = charge.value.trim();"+
                             "obj.penalty = penalty.value.trim();"+
                             "window.accidents_and_convictions['convictions'].push(obj);"+
                             "if(con_done.checked == true){window.convictions_done = true;}"+
                        "}else{"+
			    "if(con_mo.value > 0 || con_yr.value > 0 || con_day.value > 0){alert('You have selected the date of a conviction or forfeiture, but not a location.');return;}"+
                            "if(charge.value.trim() !== ''){alert('You have specified the charge you received for a conviction or forfeiture, but you have not specified a valid location.'); return;}"+
			     "if(penalty.value.trim() !== ''){alert('You have specified penalty that received from a conviction or forfeiture, but not a valid location.'); return;}"+
			    "if(con_done.checked == false){alert('If you have no a convictions or forfeitures to include, please check \"done\" before clicking \"add\".'); return;}"+
			    "window.convictions_done = true;"+
                        "}"+
                    "};"+
                "}"+
             "</script>"+
             "<script id='src_script3' type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBpZ9Aqju_O5xIJxFd96W4OeXWmA2iRaVE&libraries=places&callback=activateSearch'>"+
             "</script>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            var acc_mo = ref.$outer.find("#acc_mo");
            var acc_yr = ref.$outer.find("#acc_yr");
            var acc_day = ref.$outer.find("#acc_day");
            var con_mo = ref.$outer.find("#con_mo");
            var con_yr = ref.$outer.find("#con_yr");
            var con_day = ref.$outer.find("#con_day");
            var acc_type = ref.$outer.find("#accident_type");
            var acc_loc = ref.$outer.find("#accident_location");
            var fatalities = ref.$outer.find("#fatalities");
            var injuries = ref.$outer.find("#injuries");
            var acc_done = ref.$outer.find("#acc_done");
            var acc_add = ref.$outer.find("#acc_add");
            var con_loc = ref.$outer.find("#traf_con_loc");
            var con_charge = ref.$outer.find("#traffic_charge");
            var penalty = ref.$outer.find("#penalty");
            var con_done = ref.$outer.find("#con_done");
            var con_add = ref.$outer.find("#con_add");
            var submit = ref.$outer.find("#page5_submit_button");
            var save = ref.$outer.find("#page5_save_button");
            
            acc_add.click(function(){
                if(window.accidents_done){
                    con_mo[0].disabled = false;
                    con_yr[0].disabled = false;
                    con_day[0].disabled = false;
                    con_loc[0].disabled = false;
                    con_charge[0].disabled = false;
                    penalty[0].disabled = false;
                    con_done[0].disabled = false;
                    con_add[0].disabled = false;
                    date_filler.fillMonths(con_mo,1,12);
                    date_filler.fillYears(con_yr,2014,2018);
                    date_filler.setMonthSelect(1,false,con_mo,con_day,con_yr);
                    date_filler.setYearSelect(1,con_yr,con_mo,con_day);
                    acc_mo[0].disabled = true;
                    acc_yr[0].disabled = true;
                    acc_day[0].disabled = true;
                    acc_loc[0].disabled = true;
                    acc_type[0].disabled = true;
                    fatalities[0].disabled = true;
                    injuries[0].disabled = true;
                    acc_done[0].disabled = true;
                    acc_add[0].disabled = true;
                }
            });
            function _populate_acc(obj){
                if(obj["accidents"] && obj["accidents"].length > 0){
                    var acc_date = '';
                    var type = '';
                    var loc = '';
                    var fats, injur;fats=injur='';
                    obj["accidents"].forEach(function(item,index){
			acc_date += item["date"];
			type += item["type"];
			var len = Object.keys(item["location"]).length;
			for(var i = 0; i < len; i++){
				if(len > 4){
					if(i === 0){
						loc += item["location"][i]["long_name"]+" ";		
					}else if(i === 2 || i === 4){}
					else if(i > 0 && i < 7){
						loc += item["location"][i]["long_name"]+", ";
					}else if(i === 7){
						loc += item["location"][i]["long_name"];
					}else if(i === 8 && item["location"][i]["long_name"]){
						loc += ("-"+ item["location"][i]["long_name"]);
					}
				}else{
					if(i === 0 || i === 2){
						loc += item["location"][i]["long_name"]+", ";		
					}else if(i === 3){
						loc += item["location"][i]["long_name"];
					}
				}	
			}
			fats += item["num_fatalities"];
			injur +=  item["num_injuries"];
                        window.accidents_and_convictions.accidents.push(item);
                        acc_loc.val(loc);
                        Application_Sequence.populate_date_cells(acc_date,"#acc_yr","#acc_mo","#acc_day",4);
                        acc_type.val(type);
                        fatalities.val(fats);
                        injuries.val(injur);
                        acc_date = '';
			type = '';
			loc = '';
			fats = '';
			injur = '';
		});
                }
            }
            function _populate_con(obj){
                if(obj["convictions"] && obj["convictions"].length > 0){
                    var acc_date = '';
                    var loc = '';
                    var charge = '';var pen = '';
                    obj["convictions"].forEach(function(item,index){
			acc_date += item["date"];
			var len = Object.keys(item["location"]).length;
			for(var i = 0; i < len; i++){
				if(len > 4){
					if(i === 0){
						loc += item["location"][i]["long_name"]+" ";		
					}else if(i === 2 || i === 4){}
					else if(i > 0 && i < 7){
						loc += item["location"][i]["long_name"]+", ";
					}else if(i === 7){
						loc += item["location"][i]["long_name"];
					}else if(i === 8 && item["location"][i]["long_name"]){
						loc += ("-"+ item["location"][i]["long_name"]);
					}
				}else{
					if(i === 0 || i === 2){
						loc += item["location"][i]["long_name"]+", ";		
					}else if(i === 3){
						loc += item["location"][i]["long_name"];
					}
				}	
			}
                        window.accidents_and_convictions.convictions.push(item);
			charge += item["charge"];
                        con_charge.val(charge);
			pen +=  item["penalty"];
                        penalty.val(pen);
                        Application_Sequence.populate_date_cells(acc_date,"#con_yr","#con_mo","#con_day",4);
                        acc_loc.val(loc);
                        acc_date = '';
			loc = '';
			charge = '';
			pen = '';
		});
                }
                
            }
            (function(){ 
                date_filler.fillMonths(acc_mo,1,12);
                date_filler.fillYears(acc_yr,2014,2018);
                date_filler.setMonthSelect(1,false,acc_mo,acc_day,acc_yr);
                date_filler.setYearSelect(1,acc_yr,acc_mo,acc_day); 
                con_mo[0].disabled = true;
                con_yr[0].disabled = true;
                con_day[0].disabled = true;
                con_loc[0].disabled = true;
                con_charge[0].disabled = true;
                penalty[0].disabled = true;
                con_done[0].disabled = true;
                con_add[0].disabled = true; 
                _populate_acc(Questions["4"].user_ref);
                _populate_con(Questions["4"].user_ref);
            })();
            window.accidents_done = false;
            window.convictions_done = false;
            window.accident = function(){
                var obj = {
                    date:'',
                    type:'',
                    location:'', 
                    num_fatalities:'',
                    num_injuries: ''
                };
                return obj;
            };
            window.conviction = function(){
                var obj = {
                    date:'',
                    location:'', 
                    charge:'',
                    penalty:''
                };
                return obj;
            };
            window.accidents_and_convictions = {
                username:'',
                last_page_completed:'',
                accidents:[],
                convictions:[]
            };
            
            function remove_window_objects(){
                delete window.accident;
                delete window.conviction;
                delete window.accidents_and_convictions;
                delete window.accidents_done;
                delete window.convictions_done;
                delete window.tmp_acc_loc;
                delete window.tmp_con_loc;
            }
            function _createXMLHttpRequest(){
                if(window.XMLHttpRequest){
                    return new XMLHttpRequest();
                }else{
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
            function callback(data){
                var request = _createXMLHttpRequest();
                request.open('post','http://olthompson.com:6379',true);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        var obj = JSON.parse(request.responseText);
                        if(obj['db_error'] === 'true'){
                            alert('Error connecting to database. Please try again later.');
                            remove_window_objects();
                            window.location.href = 'index.html';
                        }
                    }
                };
                request.send(data);
            }
            function write_to_file(){
                var data = JSON.stringify(window.accidents_and_convictions);
                var len = data.length;
                var obj = {size:len};
                var pre_request = _createXMLHttpRequest();
                pre_request.open('post','http://olthompson.com:6378',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.status === 200 && pre_request.readyState === 4){
                        callback(data);
                    }
                };
                pre_request.send(JSON.stringify(obj));
            }
            function save_and_close(){
                ref.$outer.find('.q5_wrapper').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                remove_window_objects();
            }
            events.on('on_window_close',save_and_close);
            submit.click(function(){
                if(window.accidents_done && window.convictions_done){
                    window.accidents_and_convictions.username = Questions["4"].user_ref.getUsername();
                    window.accidents_and_convictions.last_page_completed = '5';
                    write_to_file();
                    ref.$outer.find('.q5_wrapper').remove();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                    remove_window_objects();                    
                }else{
                    alert("Cannot submit an incomplete form.");
                    return;
                }                
            });
            save.click(function(){
                window.accidents_and_convictions.username = Questions["4"].user_ref.getUsername();
                window.accidents_and_convictions.last_page_completed = '4';
                write_to_file();
                save_and_close();
                window.location.href = "index.html";
            });
        }
    },
    "5":{
        user_ref: "",
        text:"<div class='q6_wrapper'>"+
"                    <div class='q6_div'>"+
"                        <label>List each driver's license held over the past three years. Click \"add\" after each entry. "+
"                        Once you have provided three years' history, check \"done\" then click \"submit\" and you can move on to the next section.</label>"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                    <label>State</label>"+
"                    <select id='licensed_states'>"+
"                        <option value='0'></option>"+
"                        <option value='1'>Alabama</option>"+
"                        <option value='2'>Alaska</option>"+
"                        <option value='3'>Arizona</option>"+
"                        <option value='4'>Arkansas</option>"+
"                        <option value='5'>California</option>"+
"                        <option value='6'>Colorado</option>"+
"                        <option value='7'>Connecticut</option>"+
"                        <option value='8'>Delaware</option>"+
"                        <option value='9'>Florida</option>"+
"                        <option value='10'>Georgia</option>"+
"                        <option value='11'>Hawaii</option>"+
"                        <option value='12'>Idaho</option>"+
"                        <option value='13'>Illinois</option>"+
"                        <option value='14'>Indiana</option>"+
"                        <option value='15'>Iowa</option>"+
"                        <option value='16'>Kansas</option>"+
"                        <option value='17'>Kentucky</option>"+
"                        <option value='18'>Louisiana</option>"+
"                        <option value='19'>Maine</option>"+
"                        <option value='20'>Maryland</option>"+
"                        <option value='21'>Massachusetts</option>"+
"                        <option value='22'>Michigan</option>"+
"                        <option value='23'>Minnesota</option>"+
"                        <option value='24'>Mississippi</option>"+
"                        <option value='25'>Missouri</option>"+
"                        <option value='26'>Montana</option>"+
"                        <option value='27'>Nebraska</option>"+
"                        <option value='28'>Nevada</option>"+
"                        <option value='29'>New Hampshire</option>"+
"                        <option value='30'>New Jersey</option>"+
"                        <option value='31'>New Mexico</option>"+
"                        <option value='32'>New York</option>"+
"                        <option value='33'>North Carolina</option>"+
"                        <option value='34'>North Dakota</option>"+
"                        <option value='35'>Ohio</option>"+
"                        <option value='36'>Oklahoma</option>"+
"                        <option value='37'>Oregon</option>"+
"                        <option value='38'>Pennsylvania</option>"+
"                        <option value='39'>Rhode Island</option>"+
"                        <option value='40'>South Carolina</option>"+
"                        <option value='41'>South Dakota</option>"+
"                        <option value='42'>Tennessee</option>"+
"                        <option value='43'>Texas</option>"+
"                        <option value='44'>Utah</option>"+
"                        <option value='45'>Vermont</option>"+
"                        <option value='46'>Virginia</option>"+
"                        <option value='47'>Washington</option>"+
"                        <option value='48'>West Virginia</option>"+
"                        <option value='49'>Wisconsin</option>"+
"                        <option value='50'>Wyoming</option>"+
"                        <option value='51'>District of Columbia</option>"+
"                  </select>"+
"                    <input type='text' id='license_number' placeholder='License #' />"+
"                    <input type='text' id='license_type' placeholder='Type' />"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                    <input type='text' id='endorsements' placeholder='Endorsements' />"+
"                    <label>Expiration Date</label>"+
"                    <select id='exp_mo' class='.from_month'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='exp_yr' class='.from_year'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <select id='exp_day' class='.from_day'>"+
"                        <option value='0'></option>"+
"                    </select>"+
"                    <input type='checkbox' id='done_box' /><label>done</label>"+
"                    <button id='add' style='text-align: center'>add</button>"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                        <label>A. Have you ever been denied a license, permit or privilege to operate a vehicle? </label>"+
"                        <input id='denied_yes' type='checkbox' /><label>Yes</label><input id='denied_no' type='checkbox' /><label>No</label>"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                        <label>B. Has any license, permit or privilege ever been suspended or revoked? </label>"+
"                        <input type='checkbox' /><label>Yes</label><input type='checkbox' /><label>No</label>"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                        <label>C. Is there any reason you might be unable to perform the duties of the job for which you "+
"                            are applying? </label>"+
"                        <input type='checkbox' /><label>Yes</label><input type='checkbox' /><label>No</label>"+
"                    </div>"+
"                    <div class='q6_div'>"+
"                        <label>D. Have you ever been convicted of a felony? </label>"+
"                        <input type='checkbox' /><label>Yes</label><input type='checkbox' /><label>No</label>"+
"                    <button id='page6_save_button' class='sub_butts' style='text-align: center; float: right'>save/quit</button>"+
"                    <button id='page6_submit_button' class='sub_butts' style='text-align: center; float: right'>submit</button>"+
"                    </div>"+
"                </div>",
        update: function(tile,ur){
            this.user_ref = ur;
            var ref = tile;
            var states = ref.$outer.find("#licensed_states");
            var license_number = ref.$outer.find("#license_number");
            var license_type = ref.$outer.find("#license_type");
            var endorsements = ref.$outer.find("#endorsements");
            var exp_mo = ref.$outer.find("#exp_mo");
            var exp_yr = ref.$outer.find("#exp_yr");
            var exp_day = ref.$outer.find("#exp_day");
            var done_box = ref.$outer.find("#done_box");
            var add = ref.$outer.find("#add");
            var denied_yes = ref.$outer.find("#denied_yes");
            var denied_no = ref.$outer.find("#denied_no");
            var suspended_yes = ref.$outer.find("#suspended_yes");
            var suspended_no = ref.$outer.find("#suspended_no");
            var perform_yes = ref.$outer.find("#perform_yes");
            var perform_no = ref.$outer.find("#perform_no");
            var felony_yes = ref.$outer.find("#felony_yes");
            var felony_no = ref.$outer.find("#felony_no");
            var submit = ref.$outer.find("#page6_submit_button");
            var save = ref.$outer.find("#page6_save_button");
            
            function _populate(obj){
                if(obj['licenses'] && obj['licenses'].length > 0){
                    obj['licenses'].forEach(function(item){
                        window.licenses.licenses.push(item);
                        states.find("option[text='"+item['state']+"']").prop('selected',true);
                        license_number.val(item['number']);
                        license_type.val(item['type']);
                        endorsements.val(item['endorsements']);
                        Application_Sequence.populate_date_cells(item['expiration_date'],"#exp_yr","#exp_mo","#exp_day");
                    });
                }
                if(obj['licenses']['denied_license'] && obj['licenses']['denied_license'] === 'T'){
                    denied_yes.prop('checked',true);
                }else if(obj['licenses']['denied_license'] && obj['licenses']['denied_license'] === 'F'){
                    denied_no.prop('checked',true);
                }
                if(obj['licenses']['suspended_license'] && obj['licenses']['suspended_license'] === 'T'){
                    suspended_yes.prop('checked',true);
                }else if(obj['licenses']['suspended_license'] && obj['licenses']['suspended_license'] === 'F'){
                    suspended_no.prop('checked',true);
                }
                if(obj['licenses']['performance_issues'] && obj['licenses']['performance_issues'] === 'T'){
                    perform_yes.prop('checked',true);
                }else if(obj['licenses']['performance_issues'] && obj['licenses']['performance_issues'] === 'F'){
                    perform_no.prop('checked',true);
                }
                if(obj['licenses']['felony_conviction'] && obj['licenses']['felony_conviction'] === 'T'){
                    felony_yes.prop('checked',true);
                }else if(obj['licenses']['felony_conviction'] && obj['licenses']['felony_conviction'] === 'F'){
                    felony_no.prop('checked',true);
                }
            }
            
            (function(){
                date_filler.fillMonths(exp_mo,1,12);
                date_filler.fillYears(exp_yr,2014,2022);
                date_filler.setMonthSelect(1,false,exp_mo,exp_day,exp_yr);
                date_filler.setYearSelect(1,exp_yr,exp_mo,exp_day);
                submit[0].disabled = true;
                denied_yes[0].disabled = true;
                denied_no[0].disabled = true;
                suspended_yes[0].disabled = true;
                suspended_no[0].disabled = true;
                perform_yes[0].disabled = true;
                perform_no[0].disabled = true;
                felony_yes[0].disabled = true;
                felony_no[0].disabled = true;
                _populate(Questions["5"].user_ref);
            })();
            
            function _enable_questions(){
                submit[0].disabled = false;
                denied_yes[0].disabled = false;
                denied_no[0].disabled = false;
                suspended_yes[0].disabled = false;
                suspended_no[0].disabled = false;
                perform_yes[0].disabled = false;
                perform_no[0].disabled = false;
                felony_yes[0].disabled = false;
                felony_no[0].disabled = false;
            }
            
            add.click(function(){_add_handler();});
            function _createXMLHttpRequest(){
                if(window.XMLHttpRequest){
                    return new XMLHttpRequest();
                }else{
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
            
            denied_yes.click(function(){
                $(this).prop('checked',true);
                denied_no.prop('checked',false);
            });
            denied_no.click(function(){
                $(this).prop('checked',true);
                denied_yes.prop('checked',false);
            });
            suspended_yes.click(function(){
                $(this).prop('checked',true);
                suspended_no.prop('checked',false);
            });
            suspended_no.click(function(){
                $(this).prop('checked',true);
                suspended_yes.prop('checked',false);
            });
            perform_yes.click(function(){
                $(this).prop('checked',true);
                perform_no.prop('checked',false);
            });
            perform_no.click(function(){
                $(this).prop('checked',true);
                perform_yes.prop('checked',false);
            });
            felony_yes.click(function(){
                $(this).prop('checked',true);
                felony_no.prop('checked',false);
            });
            felony_no.click(function(){
                $(this).prop('checked',true);
                felony_yes.prop('checked',false);
            });
            
            function _clear_fields(){
                license_number[0].value = '';
                license_type[0].value = '';
                endorsements[0].value = '';
                done_box[0].checked = false;
            }
            
            function _add_handler(){
                if(_check_state() && !_check_lic_field()){alert("You've selected a state but not a license number."); return;}
                if(!_check_state() && _check_lic_field()){alert("You've entered a license number but you've not selected a state."); return;}
                if(_check_state() && _check_lic_field() && !_check_lic_num()){alert("The license number you entered does not match the format of the state you selected."); return;}
                if(_check_state() && _check_lic_field() && _check_lic_num() && !_check_type()){alert("If you specify an issuing state and license number, you must also specify the type of license.");return;}
                if(_check_state() && _check_lic_field() && _check_lic_num() && _check_type() && !_check_dates()){alert("You must select a valid expiration date.");return;}
                if(!_check_state() && !_check_lic_field() && !_check_lic_num() && !_check_type() && !_check_dates() && _check_endorsements()){alert("You cannot specify endorsements alone.");return;}
                if(!_check_state() && !_check_lic_field() && !_check_lic_num() && !_check_type() && !_check_dates() && !_check_endorsements()){alert("You cannot add a blank record.");return;}
                _add_license();
                _clear_fields();
                _enable_questions();
            }
            
            function _check_state(){
                var bool = states.find("option:selected").val() < 1 ? false:true;
                return bool;
            }
            function _check_lic_field(){
                var bool = license_number[0].value.trim() === '' ? false:true;
                return bool;
            }
            function _check_lic_num(){
                var str = license_number[0].value.trim().replace(/-/g,'');
                var val = states.find("option:selected").val();
                var bool = License_Validator.validate_state(val,str);
                return bool;
            }
            function _check_type(){
                var str = license_type[0].value.trim();
                if(str === ''){
                    return false;
                }else{
                    return true;
                }
            }
            function _check_endorsements(){
                var str = endorsements[0].value.trim();
                if(str === ''){
                    return false;
                }else{
                    return true;
                }
            }
            function _check_dates(){
                var mo = exp_mo.find("option:selected").val();
                var yr = exp_yr.find("option:selected").val();
                var day = exp_day.find("option:selected").val();
                if(mo < 1 || yr < 1 || day < 1){
                    return false;
                }else{
                    return true;
                }
            }
            function _check_questions(){
                if(!denied_yes[0].checked && !denied_no[0].checked)return false;
                if(!suspended_yes[0].checked && !suspended_no[0].checked)return false;
                if(!perform_yes[0].checked && !perform_no[0].checked)return false;
                if(!felony_yes[0].checked && !felony_no[0].checked)return false;
                return true;
            }
            function _add_license(){
                var mo = parseInt(exp_mo[0].options[exp_mo[0].selectedIndex].value)-1;
                var yr = parseInt(exp_yr[0].options[exp_yr[0].selectedIndex].text);
                var day = parseInt(exp_day[0].options[exp_day[0].selectedIndex].text); 
                var obj = new license();
                obj['state'] = states[0].options[states[0].selectedIndex].text;
                obj['number'] = license_number[0].value.trim();
                obj['type'] = license_type[0].value.trim();
                obj['endorsements'] = endorsements[0].value.trim();
                obj['expiration_date'] = new Date(yr,mo,day).toString();
                window.licenses['licenses'].push(obj);
            }
            function _set_issues(){
                var deny,suspend,perform,felony;
                if(denied_yes[0].checked)deny = 'T';
                if(denied_no[0].checked)deny = 'F';
                if(!denied_yes[0].checked && !denied_no[0].checked)deny = '';
                if(suspended_yes[0].checked)suspend = 'T';
                if(suspended_no[0].checked)suspend = 'F';
                if(!suspended_yes[0].checked && !suspended_no[0].checked)suspend = '';
                if(perform_yes[0].checked)perform = 'T';
                if(perform_no[0].checked)perform = 'F';
                if(!perform_yes[0].checked && !perform_no[0].checked)perform = '';
                if(felony_yes[0].checked)felony = 'T';
                if(felony_no[0].checked)felony = 'F';
                if(!felony_yes[0].checked && !felony_no[0].checked)felony = '';
                window.licenses['denied_license'] = deny;
                window.licenses['suspended_license'] = suspend;
                window.licenses['performance_issues'] = perform;
                window.licenses['felony_conviction'] = felony;
            }
            function license(){
                var obj = {
                    state:'',
                    number:'',
                    type:'',
                    endorsements:'',
                    expiration_date:''
                };
                return obj;
            }
            window.licenses = {
                username:'',
                last_page_completed:'',
                licenses:[],
                denied_license:'',
                suspended_license:'',
                performance_issues:'',
                felony_conviction:''
            };
            function remove_window_objects(){
                delete window.licenses;
            }
            function _callback(data){
                var request = _createXMLHttpRequest();
                request.open('post','http://olthompson.com:6381',true);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        var obj = JSON.parse(request.responseText);
                        if(obj['db_error'] === 'true'){
                            alert('Error connecting to database. Please try again later.');
                            remove_window_objects();
                            window.location.href = 'index.html';
                        }
                    }
                };
                request.send(data);
            }
            function _write_to_file(){
                _set_issues();
                var data = JSON.stringify(window.licenses);
                var len = data.length;
                var obj = {size:len};
                var pre_request = _createXMLHttpRequest();
                pre_request.open('post','http://olthompson.com:6380',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.status === 200 && pre_request.readyState === 4){
                        _callback(data);
                    }
                };
                pre_request.send(JSON.stringify(obj));
            }
            function save_and_close(){
                ref.$outer.find('.q6_wrapper').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                remove_window_objects();
            }
            events.on('on_window_close',save_and_close);
            submit.click(function(){
                if(_check_questions()){
                    window.licenses.username = Questions["5"].user_ref.getUsername();
                    window.licenses.last_page_completed = '6';
                    _write_to_file();
                    ref.$outer.find('.q6_wrapper').remove();
                    ref.run_me = true;
                    Application_Sequence.retract(ref);
                    ref.running = false;
                    remove_window_objects();
                }else{
                    alert("Questions A, B, C and D must all be answered before proceeding.");
                    return;
                }                
            });
            save.click(function(){
                window.licenses.username = Questions["5"].user_ref.getUsername();
                window.licenses.last_page_completed = '5';
                _write_to_file();
                save_and_close();
                window.location.href = "index.html";
            });
        }
    },
    "6":{
        user_ref: "",
        text: "<div id='sign_page' style='position: absolute; width: 90%; height: 90%; "+
"             background-color: black; border-radius: 5px; top: 5%; left: 5%; font: 100% bold Times New Roman; color: #ffffff'>"+
"            <div id='info_div' style='width: 95%; margin: 1% 0% 0% 2.5%'>"+
"                <label>Provide details below if you have ever been denied a license or had a license suspended, been convicted of a felony, or"+
"                if there are any reasons why you might not be able to perform the duties required by the job for which you are"+
"                applying. Disclosure of this information does not automatically exclude the driver for consideration.</label>"+
"            </div>"+
"            <div id='textarea_div'>"+
"                <textarea style='padding: 0% 0.25%; margin: 1% 0% 0% 2.5%; resize: none' rows='10' cols='100' placeholder='Enter details here'></textarea>"+
"            </div>"+
"            <div id='info_div2' style='width: 95%; margin: 1% 0% 0% 2.5%'>"+
"                <div style='margin-bottom: 1%'><label>It is agreed and understood that any misrepresentation given on this document shall be considered an act of "+
"                        dishonesty.</label></div> <div style='margin-bottom: 1%'><label>It is agreed and understood that the motor carrier or its agents may investigate my background to ascertain "+
"                any and all information of concern to my commercial driving record, whether same is of record or not. I release the "+
"                employers and persons named herein from all liability for any damages on account of their furnishing such information.</label></div> "+
"                <div style='margin-bottom: 1%'><label>It is also agreed and understood that under the Fair Credit Reporting Act, Public Law 91-508, I have been told that this "+
"                investigation may include an investigating Consumer Report, including information regarding my character, general reputation, "+
"                personal characteristics and mode of living. </label></div> <div style='margin-bottom: 1%'><label>This certifies that the above information was completed by me, and that all "+
"                        entries on it and information in it are true and complete to the best of my knowledge.</label></div>"+
"            </div>"+
"            <div id='main_sig_div' style='height: 20%; display: flex; flex-flow: row nowrap; justify-content: flex-start; align-items: flex-start'>"+
"                <div id='sig_div1' style='width: 47.5%; height: 90%; margin: 1% 0% 1% 2.5%; display: flex; flex-flow: column nowrap; justify-content: flex-start; align-items: flex-start'>"+
"                    <label style='order: 1'>Applicant Signature</label>"+
"                    <canvas id='sig_canvas' style='margin-top: 2%; background-color: white; order: 2; left: 2.5%'></canvas>"+
"                </div>"+
"                <div id='sig_div2'  style='width: 47.5%; margin: 1% 0% 1% 2.5%; display: flex; flex-flow: column nowrap; justify-content: flex-start; align-items: flex-start'>"+
"                    <label style='order: 1'>Date:</label>"+
"                    <div id='date_div' style='order: 2; margin-top: 2%'></div>"+
"                    <div style='order: 3; width: 60%; margin-top: 6.75%; display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center'>"+
"                        <button id='clear_button'>clear signature</button>"+
"                        <button id='submit_button'>submit signature</button>"+
"                    </div>"+
"                </div>"+
"            </div>"+
"        </div>",
        obj: {
                x: undefined,
                y: undefined,
                down: false
        },
        update: function(tile,ur){
            window.explanations = {
                username:'',
                last_page_completed:'',
                explanation:'',
                signature:''
            };
            function save_and_close(){
                ref.$outer.find('#sign_page').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                delete window.explanations;
                window.location.href = 'index.html';
            }
            events.on('on_window_close',save_and_close);
            this.user_ref = ur;
            var ref = tile;
            ref.$outer.append(this.text);
            var textarea = ref.$outer.find("#textarea_div").find('textarea');
            var date = new Date();
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            ref.$outer.find("#date_div").append(months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear());
            var canvas_w = ref.$outer.find("#sig_div1").width();
            var canvas_h = ref.$outer.find("#sig_div1").height();
            ref.$outer.find("#sig_canvas").attr('width',canvas_w+"px");
            ref.$outer.find("#sig_canvas").attr('height',canvas_h*0.8+"px");
            var ctx = ref.$outer.find("#sig_canvas").get(0).getContext("2d");
            ctx.canvas.addEventListener('mousemove', function(event){
                if(Questions["6"].obj.down === true){
                    var x = event.layerX - ctx.canvas.offsetLeft;
                    var y = event.layerY - ctx.canvas.offsetTop;
                    if(Questions["6"].obj.x === undefined){
                        Questions["6"].obj.x = x;
                        Questions["6"].obj.y = y;
                        ctx.beginPath();
                    }else{ 
                        ctx.strokeStyle = "#000000";
                        ctx.fillStyle = "#000000";
                        ctx.moveTo(Questions["6"].obj.x,Questions["6"].obj.y);
                        ctx.lineTo(x,y);
                        ctx.stroke(); 
                        Questions["6"].obj.x = x;
                        Questions["6"].obj.y = y;
                    }
                }
            },false);
            ctx.canvas.addEventListener('mouseup', function(){
                Questions["6"].obj.down = false;
                ctx.closePath();
                Questions["6"].obj.x = undefined;
                Questions["6"].obj.y = undefined;
            }, false);
            ctx.canvas.addEventListener('mousedown', function(){
                Questions["6"].obj.down = true;
            },false);
            var clear = ref.$outer.find("#clear_button");
            clear.click(function(){
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
            });
            var submit = ref.$outer.find("#submit_button");
            function _createXMLHttpRequest(){
                if(window.XMLHttpRequest){
                    return new XMLHttpRequest();
                }else{
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
            function _callback(data){
                var request = _createXMLHttpRequest();
                request.open('post','http://olthompson.com:6383',true);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        var obj = JSON.parse(request.responseText);
                        if(obj['db_error'] === 'true'){
                            alert('Error connecting to database. Please try again later.');
                            delete window.explanations;
                            window.location.href = 'index.html';
                        }
                    }
                };
                request.send(data);
            }
            function _write_to_file(){
                var data = JSON.stringify(window.explanations);
                var len = data.length;
                var obj = {size:len};
                var pre_request = _createXMLHttpRequest();
                pre_request.open('post','http://olthompson.com:6382',true);
                pre_request.onreadystatechange = function(){
                    if(pre_request.status === 200 && pre_request.readyState === 4){
                        _callback(data);
                    }
                };
                pre_request.send(JSON.stringify(obj));
            }
            function _check_canvas(){
                var blank = document.createElement('canvas');
                blank.width = ctx.canvas.width;
                blank.height = ctx.canvas.height;
                return ctx.canvas.toDataURL() === blank.toDataURL();
            }
            submit.click(function(){
                if(_check_canvas()){
                    alert("It appears that you have not drawn a valid signature. Please do so before submitting your application.");
                    return;
                }
                window.explanations.username = Questions["6"].user_ref.getUsername();
                window.explanations.last_page_completed = '6';
                window.explanations.signature = ctx.canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
                window.explanations.explanation = textarea[0].value.trim();
                _write_to_file();
                ref.$outer.find('#sign_page').remove();
                ref.run_me = true;
                Application_Sequence.retract(ref);
                ref.running = false;
                delete window.explanations;
                var pending_applicant = new Pending_Applicant(Questions["6"].user_ref,'test');
                pending_applicant.construct();
            });
        }
    }
};

var Application_Sequence = (function(){
    
    var tile_ref;
    var user_ref;
    function _populate_date_cells(d_str,yid,mid,did,index){
        var date = d_str.split('-');
        if(date.length > 0){
            var yr = (date[0].length > 0 && date[0].toUpperCase() !== "null".toUpperCase()) ? date[0] : null;
            var mo = (date[1].length > 0 && date[1].toUpperCase() !== "null".toUpperCase()) ? date[1]-1 : null;
            var mo_day = (date[2].length > 0 && date[2].toUpperCase() !== "null".toUpperCase()) ? date[2] : null;
            if(yr !== null)tile_ref[index].$outer.find(yid).val(yr).prop('selected',true);
            if(mo !== null)tile_ref[index].$outer.find(mid).val(mo).prop('selected',true);
            if(mo_day !== null)tile_ref[index].$outer.find(did).val(mo_day).prop('selected',true);
            if(yr !== null && mo !== null && mo_day !== null)return true;
            else return false;
        }
    }
    function _populate_pg2(){
        var grade = (isNaN(parseInt(user_ref['grade_school']))) ? 'null':user_ref['grade_school'];
        var col = (isNaN(parseInt(user_ref['college']))) ? 'null':(user_ref['college']+1);
        var grad = (isNaN(parseInt(user_ref['grad_school']))) ? 'null':user_ref['grad_school'];
        var res = col+'-'+grade+'-'+grad;
        var t_f = _populate_date_cells(res,'grade','college','grad',2);
        if(t_f)
            tile_ref[2].find('#education').find('select').each(function(){
                $(this).prop('disabled',true);
            });
        for(var i = 0; ;i++){
            if(user_ref['employers'][i]){
                window.employer_details[i] = user_ref['employers'][i];
                window.year_accum += (parseFloat(user_ref['employers'][i]['total_time']));
            }else{
                window.employer_counter = i;
                break;
            }
        }
        if(window.year_accum >= 3 && window.employer_counter > 0){
            tile_ref[2].find('#employer_name').val(user_ref['employers'][window.employer_counter-1]['employer']);
            tile_ref[2].find('#employer_address').val(user_ref['employers'][window.employer_counter-1]['postal_address']);
            tile_ref[2].find('#employer_phone').val(user_ref['employers'][window.employer_counter-1]['phone']);
            tile_ref[2].find('#employer').find('input').each(function(){
                $(this).prop('disabled',true);
            });
            var t_f1 = _populate_date_cells(user_ref['employers'][window.employer_counter-1]['from'],'.from_year','.from_month','.from_day',2);
            var t_f2 = _populate_date_cells(user_ref['employers'][window.employer_counter-1]['to'],'.to_year','.to_month','.to_day',2);
            if(t_f1 && t_f2){
                tile_ref[2].find('#prev_emp_dates').find('select').each(function(){
                    $(this).prop('disabled',true);
                });
            }
        }else if(window.year_accum < 3 && window.employer_counter > 0){
            tile_ref[2].find('#employer_name').val(user_ref['employers'][window.employer_counter-1]['employer']);
            tile_ref[2].find('#employer_address').val(user_ref['employers'][window.employer_counter-1]['postal_address']);
            tile_ref[2].find('#employer_phone').val(user_ref['employers'][window.employer_counter-1]['phone']);;
            _populate_date_cells(user_ref['employers'][window.employer_counter-1]['from'],'.from_year','.from_month','.from_day',2);
            _populate_date_cells(user_ref['employers'][window.employer_counter-1]['to'],'.to_year','.to_month','.to_day',2);            
        }
    }
    function _populate_pg1(){//This may require some tweaking
        if(user_ref['address_completed'] === 'T' && _populate_date_cells(user_ref['last_phys_exam'],'year','month','month_day',1)){
            tile_ref[1].run_me = true;
            return;
        }else{
            for(var i = 0; ;i++){
                switch(i%4){
                        case 0:
                            if(user_ref['addresses'][i]){
                                tile_ref[1].$outer.find('#current').val(user_ref['addresses'][i]['postal_format']);
                                _populate_date_cells(user_ref['addresses'][i]['from'],'#current_from_year','#current_from_month','#current_from_day',1);
                                _populate_date_cells(user_ref['addresses'][i]['to'],'#current_to_year','#current_to_month','#current_to_day',1);
                            }else return;
                            break;
                        case 1:
                            if(user_ref['addresses'][i]){
                                tile_ref[1].$outer.find('#first').val(user_ref['addresses'][i]['postal_format']);
                                _populate_date_cells(user_ref['addresses'][i]['from'],'#first_from_year','#first_from_month','#first_from_day',1);
                                _populate_date_cells(user_ref['addresses'][i]['to'],'#first_to_year','#first_to_month','#first_to_day',1);
                            }else return;
                            break; 
                        case 2:
                            if(user_ref['addresses'][i]){
                                tile_ref[1].$outer.find('#second').val(user_ref['addresses'][i]['postal_format']);
                                _populate_date_cells(user_ref['addresses'][i]['from'],'#second_from_year','#second_from_month','#second_from_day',1);
                                _populate_date_cells(user_ref['addresses'][i]['to'],'#second_to_year','#second_to_month','#second_to_day',1);
                            }else return;
                            break; 
                        case 3:
                            if(user_ref['addresses'][i]){
                                tile_ref[1].$outer.find('#third').val(user_ref['addresses'][i]['postal_format']);
                                _populate_date_cells(user_ref['addresses'][i]['from'],'#third_from_year','#third_from_month','#third_from_day',1);
                                _populate_date_cells(user_ref['addresses'][i]['to'],'#third_to_year','#third_to_month','#third_to_day',1);
                            }else return;
                            break; 
                }
            }
        }
    }
    function _populate_pg0(){
        var t_ref = tile_ref[0].$outer;
        var pos = user_ref['position'];
        if(t_ref.find('#contractor').attr('value').toUpperCase() === pos.toUpperCase()){
            t_ref.find('#contractor').prop('checked',true);
        }else if(t_ref.find('#driver').attr('value').toUpperCase() === pos.toUpperCase()){
            t_ref.find('#driver').prop('checked',true);
        }else if(t_ref.find('#c_driver').attr('value').toUpperCase() === pos.toUpperCase()){
            t_ref.find('#c_driver').prop('checked',true);
        }
        if(user_ref['first_name'].length > 0 && user_ref['first_name'].toUpperCase() !== "null".toUpperCase()){
            t_ref.find('#f_name').val(user_ref['first_name']);
        }
        if(user_ref['middle_name'].length > 0 && user_ref['middle_name'].toUpperCase() !== "null".toUpperCase()){
            t_ref.find('#m_name').val(user_ref['middle_name']);
        }
        if(user_ref['last_name'].length > 0 && user_ref['last_name'].toUpperCase() !== "null".toUpperCase()){
            t_ref.find('#l_name').val(user_ref['last_name']);
        }
        if(user_ref['phone'].length > 0 && user_ref['phone'].toUpperCase() !== "null".toUpperCase()){
            t_ref.find('#p_num').val(user_ref['phone']);
        }
        if(user_ref['emergency_phone'].length > 0 && user_ref['emergency_phone'].toUpperCase() !== "null".toUpperCase()){
            t_ref.find('#e_num').val(user_ref['emergency_phone']);
        }
        if(user_ref['phone_type']){
            if(user_ref['phone_type'] === "cell"){
                t_ref.find('#phone_type_cell').prop('checked',true);
            }else{
                t_ref.find('#phone_type_land').prop('checked',true);
            }            
        }
        if(user_ref['emergency_phone_type']){
            if(user_ref['emergency_phone_type'] === "cell"){
                t_ref.find('#emergency_type_cell').prop('checked',true);
            }else{
                t_ref.find('#emergency_type_land').prop('checked',true);
            }            
        }
        _populate_date_cells(user_ref['dob'],'#year','#month','#month_day',0);
        if(user_ref['age']){
            t_ref.find('#age').val(user_ref['age']);
        }
        if(user_ref['ssn']){
            t_ref.find('#ssn').val(user_ref['ssn']);
        }
        if(user_ref['email']){
            t_ref.find('#email').val(user_ref['email']);
        }
    }
    function _populate(counter){
        switch(counter){
            case 0:
                _populate_pg0();
                break;
            case 1:
                _populate_pg1();
                break; 
            case 2:
                _populate_pg2();
                break;
        }
    }
    function init(tiles,user){
       tile_ref = tiles;
       user_ref = user;
       var counter = 0;
       var last_pg = user_ref['last_page_completed'];
       tile_ref.forEach(function(item,index){
           if(index < last_pg){
               item.run_me = true;
               item.running = false;
           }
           if(!item.run_me){
               item.$outer.find("#"+item.id).removeClass('stop');
               item.$outer.find("#"+item.id).addClass('wait');
           }else{
               item.$outer.find("#"+item.id).removeClass('stop');
           }
           counter = index;
       });
       var handle = setInterval(function(){
           if(!tile_ref[counter].running && !tile_ref[counter].run_me){
               tile_ref[counter].running = true;
               deploy(tile_ref[counter]);
               _populate(counter);
           }else if(!tile_ref[counter].running && tile_ref[counter].run_me){
               counter +=1;
               if(counter >= tile_ref.length){
                   clearInterval(handle);
                   handle = null;
                    setTimeout(function(){
                        tile_ref.forEach(function(item){
                        item.final_seq();
                     });
                     setTimeout(function(){
                         Questions["6"].update(tile_ref[0],user_ref);
                     },1000);
                   },2000);
               }
           }
       },25);
    }
    function deploy(item){
       item.$outer.find("#"+item.id).removeClass('wait');
       item.$outer.find("#"+item.id).addClass('go');
       item.$outer.find("#"+item.id).animate({
           "height" : "50%",
           "width" : "60%",
           "left" : "20%",
           "top" : "25%",
           "border-radius" : "5px"
       },2000,function(){ 
                item.$outer.find("#"+item.id).removeClass('go');
                item.run_seq(Questions,user_ref);
       });
        
    }
    function retract(item){
        item.$outer.find("#"+item.id).animate({
            "border-radius" : "100%",
           "height" : item.height,
           "width" : item.width,
           "left" : item.endX,
           "top" : item.endY
       },2000); 
    }
    return{
      init:init,
      deploy:deploy,
      retract:retract,
      populate_date_cells:_populate_date_cells
    };   
})();