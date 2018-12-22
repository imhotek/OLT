'use strict';

function Profile_Page(ref,userType){
    var $outer = ref;
    var user_type = userType;
    var header, picBox, usernameBox, detailBox, banner, nameBox, phoneBox, emailBox, idBox;
    header = picBox = usernameBox = detailBox = banner = nameBox = phoneBox = emailBox = idBox = null;
    var height = window.innerHeight;
    var width = window.innerWidth;
    var default_img_src = "/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/avatar.png";
    var banner_src = "/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/collapsed_logo.png";
    var obj = {
        page: null,
        _set_page: function(){
            this.page = document.createElement("div");
            this.page.setAttribute("id",user_type+"_page");
            this.page.style.display = "flex";
            this.page.style.flex = "1";
            this.page.style.order = "1";
            this.page.style.flexFlow = "column";
            this.page.style.justifyContent = "flex-start";
            this.page.style.alignItems = "flex-start";
            this.page.style.backgroundColor = "#D3D3D3";
            this.page.style.maxWidth = (width*0.7)+"px";
            this.page.style.border = "5px solid black";
            this._set_header();
            $outer[0].appendChild(this.page);
        },
        set_new_picBox_src: function(img){
            if(arguments.length === 0){
                var img = new Image();
                img.onload = function(){
                    ctx.drawImage(img,0,0,img.width,img.height,0,0,pic.width,pic.height);
                };
                img.src = default_img_src;
                return;
            }
            var ctx = $(picBox).find('canvas')[0].getContext('2d');
            ctx.fillStyle = "#000000";
            ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
            ctx.drawImage(img,0,0,img.width,img.height,0,0,ctx.canvas.width,ctx.canvas.height);            
        },
        _set_picBox: function(){
            picBox = document.createElement("div");
            picBox.setAttribute("id",user_type+"_picBox");
            picBox.style.flex = "1";
            picBox.style.order = "1";
            picBox.style.display = "flex";
            picBox.style.flexFlow = "column";
            picBox.style.justifyContent = "flex-start";
            picBox.style.alignItems = "flex-start";
            picBox.style.width = "40%";
            picBox.style.height = "99%";
            var pic = document.createElement('canvas');
            var ctx = pic.getContext('2d');
            pic.style.flex = "0 1 auto";
            pic.style.order = "1";
            pic.style.width = "99%";
            pic.style.height = "90%";
            pic.style.borderRight = "5px solid black";
            pic.style.borderBottom = "5px solid black";
            pic.style.backgroundColor = "white";
            usernameBox = document.createElement("div");
            usernameBox.style.flex = "0 1 auto";
            usernameBox.style.order = "2";
            usernameBox.style.width = "99%";
            usernameBox.style.height = "10%";
            usernameBox.style.paddingBottom = "1%";
            usernameBox.setAttribute("id",user_type+"_usernameBox");
            usernameBox.style.backgroundColor = "black";
            usernameBox.style.color = "white";
            usernameBox.style.borderRight = "5px solid black";
            usernameBox.style.font = "3vh bold tahoma";
            var label = document.createElement("label");
            label.innerHTML = "user: ";
            usernameBox.appendChild(label);
            picBox.appendChild(pic);
            picBox.appendChild(usernameBox);
            header.appendChild(picBox);
        },
        _set_nameBox: function(){
            nameBox = document.createElement("div");
            nameBox.setAttribute("id",user_type+"_nameBox");
            nameBox.style.flex = "1";
            nameBox.style.order = "2";
            nameBox.style.display = "flex";
            nameBox.style.flexFlow = "row";
            nameBox.style.justifyContent = "flex-start";
            nameBox.style.alignItems = "flex-start";
            nameBox.style.padding = "1%";
            nameBox.style.color = "black";
            nameBox.style.font = "2.5vh bold tahoma";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","name");
            input.setAttribute("placeholder","Name");
            input.style.flex = "1";
            input.style.order = "1"; 
            nameBox.appendChild(input);
            detailBox.appendChild(nameBox);
        },
        _set_ssn: function(){
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","ssn");
            input.setAttribute("placeholder","SSN");
            input.style.order = "2";
            phoneBox.appendChild(input);
        },
        _set_phoneBox: function(){
            phoneBox = document.createElement("div");
            phoneBox.setAttribute("id",user_type+"_phoneBox");
            phoneBox.style.flex = "1";
            phoneBox.style.order = "3";
            phoneBox.style.display = "flex";
            phoneBox.style.flexFlow = "row";
            phoneBox.style.justifyContent = "flex-start";
            phoneBox.style.alignItems = "flex-start";
            phoneBox.style.padding = "1%";
            phoneBox.style.color = "black";
            phoneBox.style.font = "2.5vh bold tahoma";
            this._set_ssn();
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","phone");
            input.setAttribute("placeholder","Phone");
            input.style.order = "2"; 
            phoneBox.appendChild(input);
            detailBox.appendChild(phoneBox);
        },
        _set_emailBox: function(){
            emailBox = document.createElement("div");
            emailBox.setAttribute("id",user_type+"_emailBox");
            emailBox.style.flex = "1";
            emailBox.style.order = "4";
            emailBox.style.display = "flex";
            emailBox.style.flexFlow = "row";
            emailBox.style.justifyContent = "flex-start";
            emailBox.style.alignItems = "flex-start";
            emailBox.style.padding = "1%";
            emailBox.style.color = "black";
            emailBox.style.font = "2.5vh bold tahoma";
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","email");
            input.setAttribute("placeholder","Email");
            emailBox.appendChild(input);
            detailBox.appendChild(emailBox);
        },
        _set_idBox_label1:function(){
            var input_1 = document.createElement("input");
            input_1.setAttribute("type","text");
            input_1.setAttribute("id","dob");
            input_1.setAttribute("placeholder","DOB");
            input_1.style.maxWidth = (width*0.05)+"px";
            input_1.style.flex = "1";
            input_1.style.order = "1";
            idBox.appendChild(input_1);   
        },
        _set_idBox_label2:function(){
            var input_2 = document.createElement("input");
            input_2.setAttribute("placeholder","Age");
            input_2.setAttribute("type","text");
            input_2.setAttribute("id","age");
            input_2.style.maxWidth = (width*0.05)+"px";
            input_2.style.flex = "1";
            input_2.style.order = "2";
            idBox.appendChild(input_2); 
        },
        _set_idBox_label3:function(){
            var input_3 = document.createElement("input");
            input_3.setAttribute("type","text");
            input_3.setAttribute("id","position");
            input_3.setAttribute("placeholder","Position");
            input_3.style.flex = "1";
            input_3.style.order = "3";
            idBox.appendChild(input_3);
        },
        _set_idBox: function(){
            idBox = document.createElement("div");
            idBox.setAttribute("id",user_type+"_idBox");
            idBox.style.flex = "1";
            idBox.style.order = "5";
            idBox.style.display = "flex";
            idBox.style.flexFlow = "row nowrap";
            idBox.style.justifyContent = "space-between";
            idBox.style.alignItems = "flex-start";
            idBox.style.alignContent = "space-between";
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
            detailBox.style.flex = "1";
            detailBox.style.order = "2";
            detailBox.style.width = "60%";
            detailBox.style.height = "99%";
            detailBox.style.display = "flex";
            detailBox.style.flexFlow = "column";
            detailBox.style.justifyContent = "flex-start";
            detailBox.style.alignItems = "flex-start";
            detailBox.style.padding = "1%";            
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
            banner.style.flex = "0 1 auto";
            banner.style.order = "1";
            banner.style.backgroundColor = "black";
            banner.style.minWidth = 0.5*(width*0.7)+"px";
            banner.style.minHeight = (height*0.05)+"px";
            banner.style.backgroundImage = "url('"+banner_src+"')"; 
            banner.style.backgroundPosition = "center center";
            banner.style.backgroundSize = "100% 100%";            
            detailBox.appendChild(banner);
        },
        _set_header: function(){
            header = document.createElement("div");
            header.setAttribute("id",user_type+"_page_header");
            header.style.flex = "0 1 auto";
            header.style.order = "1";
            header.style.display = "flex";
            header.style.flexFlow = "row";
            header.style.justifyContent = "flex-start";
            header.style.alignItems = "flex-start";
            header.style.width = "100%";
            header.style.height = "70%";
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
        }        
    };
    return obj;
};