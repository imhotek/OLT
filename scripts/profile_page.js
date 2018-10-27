'use strict';

function Profile_Page(ref,userType){
    var $outer = ref;
    var user_type = userType;
    var header, picBox, usernameBox, detailBox, banner, nameBox, phoneBox, emailBox, idBox;
    header = picBox = usernameBox = detailBox = banner = nameBox = phoneBox = emailBox = idBox = null;
    var height = $outer[0].style.minHeight;
    var default_img_src = "pics/avatar.png";
    var banner_src = "pics/collapsed_logo.png";
    var obj = {
        page: null,
        _set_page: function(){
            this.page = document.createElement("div");
            this.page.setAttribute("id",user_type+"_page");
            this.page.style.flex = "0 1 auto";
            this.page.style.order = "1";
            this.page.style.display = "flex";
            this.page.style.flexFlow = "column";
            this.page.style.justifyContent = "flex-start";
            this.page.style.alignItems = "flex-start";
            this.page.style.backgroundColor = "#D3D3D3";
            this.page.style.minWidth = "99%";
            this.page.style.minHeight = height;//"50%";
            this.page.style.border = "5px solid black";
            this._set_header();
            $outer[0].appendChild(this.page);
        },
        _set_new_picBox_src: function(img){
            picBox.style.backgroundImage = "url('"+img+"')";
        },
        _set_picBox: function(){
            picBox = document.createElement("div");
            picBox.setAttribute("id",user_type+"_picBox");
            picBox.style.position = "absolute";
            picBox.style.flex = "0 1 auto";
            picBox.style.order = "1";
            picBox.style.width = "40%";
            picBox.style.height = "79%";
            picBox.style.borderRight = "5px solid black";
            picBox.style.borderBottom = "5px solid black";
            picBox.style.backgroundColor = "white";
            picBox.style.backgroundImage = "url('"+default_img_src+"')";
            picBox.style.bacgroundRepeat = "no-repeat";
            picBox.style.backgroundPosition = "center center";
            picBox.style.backgroundSize = "85%";
            usernameBox = document.createElement("div");
            usernameBox.setAttribute("id",user_type+"_usernameBox");
            usernameBox.style.position = "absolute";
            usernameBox.style.width = "100%";
            usernameBox.style.height = "10%";
            usernameBox.style.top = "90%";
            usernameBox.style.backgroundColor = "black";
            usernameBox.style.color = "white";
            usernameBox.style.font = "3vh bold tahoma";
            var label = document.createElement("label");
            label.innerHTML = "user: ";
            usernameBox.appendChild(label);
            picBox.appendChild(usernameBox);
            header.appendChild(picBox);
        },
        _set_nameBox: function(){
            nameBox = document.createElement("div");
            nameBox.setAttribute("id",user_type+"_nameBox");
            nameBox.style.position = "absolute";
            nameBox.style.width = "100%";
            nameBox.style.height = "10%";
            nameBox.style.top = "27%";
            nameBox.style.padding = "1%";
            nameBox.style.color = "black";
            nameBox.style.font = "2.5vh bold tahoma";
            var label = document.createElement("label");
            label.innerHTML = "Name: ";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","name");
            input.style.width = "70%";
            input.style.height = "85%";            
            nameBox.appendChild(label);
            nameBox.appendChild(input);
            detailBox.appendChild(nameBox);
        },
        _set_ssn: function(){
            var label = document.createElement("label");
            label.innerHTML = "SSN: ";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","ssn");
            input.style.width = "27%";
            input.style.height = "85%";            
            phoneBox.appendChild(label);
            phoneBox.appendChild(input);
        },
        _set_phoneBox: function(){
            phoneBox = document.createElement("div");
            phoneBox.setAttribute("id",user_type+"_phoneBox");
            phoneBox.style.position = "absolute";
            phoneBox.style.width = "100%";
            phoneBox.style.height = "10%";
            phoneBox.style.top = "40%";
            phoneBox.style.padding = "1%";
            phoneBox.style.color = "black";
            phoneBox.style.font = "2.5vh bold tahoma";
            this._set_ssn();
            var label = document.createElement("label");
            label.innerHTML = "Phone: ";
            label.style.marginLeft = "1%";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","phone");
            input.style.width = "30%";
            input.style.height = "85%";            
            phoneBox.appendChild(label);
            phoneBox.appendChild(input);
            detailBox.appendChild(phoneBox);
        },
        _set_emailBox: function(){
            emailBox = document.createElement("div");
            emailBox.setAttribute("id",user_type+"_emailBox");
            emailBox.style.position = "absolute";
            emailBox.style.width = "100%";
            emailBox.style.height = "10%";
            emailBox.style.top = "53%";
            emailBox.style.padding = "1%";
            emailBox.style.color = "black";
            emailBox.style.font = "2.5vh bold tahoma";
            var label = document.createElement("label");
            label.innerHTML = "Email: ";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","email");
            input.style.width = "70%";
            input.style.height = "85%";            
            emailBox.appendChild(label);
            emailBox.appendChild(input);
            detailBox.appendChild(emailBox);
        },
        _set_idBox_label1:function(){
            var label_1 = document.createElement("label");
            label_1.innerHTML = "DOB: ";
            var input_1 = document.createElement("input");
            input_1.setAttribute("type","text");
            input_1.setAttribute("id","dob");
            input_1.style.width = "15%";
            input_1.style.height = "85%";            
            idBox.appendChild(label_1);
            idBox.appendChild(input_1);   
        },
        _set_idBox_label2:function(){
            var label_2 = document.createElement("label");
            label_2.innerHTML = "Age: ";
            label_2.style.left = "15%";
            label_2.style.marginLeft = "1%";
            var input_2 = document.createElement("input");
            input_2.setAttribute("type","text");
            input_2.setAttribute("id","age");
            input_2.style.width = "5%";
            input_2.style.height = "85%";            
            idBox.appendChild(label_2);
            idBox.appendChild(input_2); 
        },
        _set_idBox_label3:function(){
            var label_3 = document.createElement("label");
            label_3.innerHTML = "Position: ";
            label_3.style.left = "25%";
            label_3.style.marginLeft = "1%";
            var input_3 = document.createElement("input");
            input_3.setAttribute("type","text");
            input_3.setAttribute("id","position");
            input_3.style.width = "23%";
            input_3.style.height = "85%";            
            idBox.appendChild(label_3);
            idBox.appendChild(input_3);
        },
        _set_idBox: function(){
            idBox = document.createElement("div");
            idBox.setAttribute("id",user_type+"_idBox");
            idBox.style.position = "absolute";
            idBox.style.display = "inline-block";
            idBox.style.width = "100%";
            idBox.style.height = "10%";
            idBox.style.top = "66%";
            idBox.style.padding = "1%";
            idBox.style.color = "black";
            idBox.style.font = "2.5vh bold tahoma";            
            this._set_idBox_label1();         
            this._set_idBox_label2();           
            this._set_idBox_label3();
            detailBox.appendChild(idBox);
        },
        _set_detailBox: function(){
            detailBox = document.createElement("div");
            detailBox.setAttribute("id",user_type+"_detailBox");
            detailBox.style.position = "absolute";
            detailBox.style.flex = "0 1 auto";
            detailBox.style.order = "2";
            detailBox.style.minWidth = "60%";
            detailBox.style.minHeight = "99%";
            detailBox.style.left = picBox.style.width;            
            header.appendChild(detailBox);
            this._set_banner();
            this._set_nameBox();
            this._set_phoneBox();
            this._set_emailBox();
            this._set_idBox();
        },
        _set_banner: function(){
            banner = document.createElement("div");
            banner.setAttribute("id",user_type+"_banner");
            banner.style.position = "absolute";
            banner.style.backgroundColor = "black";
            banner.style.width = "100%";
            banner.style.height = "25%";
            banner.style.backgroundImage = "url('"+banner_src+"')"; 
            banner.style.backgroundPosition = "center center";
            banner.style.backgroundSize = "100% 100%";            
            detailBox.appendChild(banner);
        },
        _set_header: function(){
            header = document.createElement("div");
            header.setAttribute("id",user_type+"_page_header");
            header.style.position = "absolute";
            header.style.flex = "0 1 autp";
            header.style.order = "1";
            header.style.display = "flex";
            header.style.flexFlow = "column nowrap";
            header.style.justifyContent = "flex-start";
            header.style.alignItems = "flex-start";
            header.style.minWidth = "99%";
            header.style.minHeight = "50%";
            this._set_picBox();
            this._set_detailBox();
            this.page.appendChild(header);
        },
        _deploy_header: function(){
            $outer.find("#"+user_type+"_page_header").animate({
                "height":"50%"
            },1500);
        },
        _retract_header: function(){
            $outer.find("#"+user_type+"_page_header").animate({
                "height":"0px"
            },1500,function(){
                $outer.find("#"+user_type+"_page_header").remove();
            });
        },
        _deploy_page: function(){
            /*
            $outer.find("#"+user_type+"_page").animate({
                "height":height
            },1500);
            this._deploy_header();*/
        },
        _retract_page: function(){
            $outer.find("#"+user_type+"_page").animate({
                "height":"0px"
            },1500,function(){
                $outer.find("#"+user_type+"_page").remove();
            });
            this._retract_header();
        },
        retract: function(){
            this._retract_page();
        },
        init: function(){
            this._set_page();
            this._deploy_page();
        }        
    };
    return obj;
};