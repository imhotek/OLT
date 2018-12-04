'use strict';

function Applicant_Profile(ref){
    var $outer = ref;
    var body, res_hist,res_hist_field,res_hist_form, addr_box_order,edu, emp_hist, emp_box_order,emp_hist_field,emp_hist_form,
            exp,exp_field, exp_form,exp_box_order, lic,lic_details,lic_form,lic_field,lic_box_order,acc_hist_form,acc_hist_field,
            acc_hist_box_order, acc_hist, con_hist_form,con_hist_field,con_hist_box_order, con_hist,expl,expl_form,expl_field;
    body = res_hist = res_hist_field = res_hist_form = addr_box_order = edu = emp_hist = emp_box_order = emp_hist_field = exp = 
            exp_field = exp_form = exp_box_order =  lic = lic_details = lic_form = lic_field = lic_box_order = acc_hist_form = acc_hist_field 
            = acc_hist_box_order = acc_hist = con_hist_form = con_hist_field = con_hist_box_order = con_hist = expl 
            = expl_form = expl_field = null;
    addr_box_order = emp_box_order = exp_box_order = lic_box_order = acc_hist_box_order = con_hist_box_order = 2;
    var box_order_obj = function(){
        var obj = {
            cur_itr:null,
            dom_obj_ref_arr:[]
        };
        return obj;
    };
    var box_order_obj_arr = [];
    var update_box_order = function(index,order,box){
        if(!box_order_obj_arr[index]){
                var obj_ref = new box_order_obj();
                obj_ref['cur_itr']= 0;
                obj_ref['dom_obj_ref_arr'].push(box);
                box_order_obj_arr.push(obj_ref);
            }else{    
                order +=1;   
                box_order_obj_arr[index]['cur_itr'] +=1;;
                box_order_obj_arr[index]['dom_obj_ref_arr'].push(box);
            }
    };
    var obj = {
        _add_expl_box:function(){   
            var box = document.createElement("div");
            var exp;
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.minWidth = "85%";
            exp = document.createElement("textarea");
            exp.setAttribute("rows","4");
            exp.setAttribute("cols","120");
            box.appendChild(exp);
            expl_field.appendChild(box);
        },
        _set_explanation:function(){
            expl_form = document.createElement("form");
            expl_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Explanations";
            legend.classList.add("labelz");
            expl = document.createElement("div");
            expl.setAttribute("id","explanation");
            expl_form.style.margin = "1% 0.5% 0% 0.5%";
            expl_form.style.order = "8";
            expl.style.display = "flex";
            expl_form.style.flexDirection = "column";
            expl_form.style.justifyContent = "flex-start";
            expl_form.style.alignItems = "flex-start";
            expl_form.style.alignContent = "space-between";
            this._add_expl_box();
            expl_field.appendChild(legend);
            expl_field.appendChild(expl);
            expl_form.appendChild(expl_field);
            body.appendChild(expl_form);
        },
        _add_con_penalty:function(penalty){ 
            penalty.setAttribute("placeholder","Penalty");
            penalty.classList.add("inputs");
            penalty.style.flex = "0 1 auto";
            penalty.style.order = "4";   
            penalty.style.width = "20%";
        },
        _add_con_charge:function(charge){ 
            charge.setAttribute("placeholder","Charge");
            charge.classList.add("inputs");
            charge.style.flex = "0 1 auto";
            charge.style.order = "3";    
            charge.style.width = "20%";
        },
        _add_con_loc:function(loc){ 
            loc.setAttribute("placeholder","Location");
            loc.classList.add("inputs");
            loc.style.flex = "0 1 auto";
            loc.style.order = "2";
            loc.style.width = "20%";       
        },
        _add_con_date:function(date){  
            date.setAttribute("placeholder","Date");
            date.classList.add("inputs");
            date.style.flex = '0 1 auto';
            date.style.order = "1";
            date.style.width = "10%";          
        },
        add_con_hist_box:function(){
            var box = document.createElement("div");
            var date,loc, charge, penalty;
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.order = con_hist_box_order;
            update_box_order(5,con_hist_box_order,box);
            box.style.minWidth = "85%";
            date = document.createElement("input");
            date.setAttribute('class','date');
            loc = document.createElement("input"); 
            loc.setAttribute('class','location');
            charge = document.createElement("input");
            charge.setAttribute('class','charge');
            penalty = document.createElement("input");
            penalty.setAttribute('class','penalty');
            this._add_con_date(date);
            this._add_con_loc(loc);
            this._add_con_charge(charge);
            this._add_con_penalty(penalty);
            box.appendChild(date);
            box.appendChild(loc);
            box.appendChild(charge);
            box.appendChild(penalty);
            con_hist_field.appendChild(box);
        },
        _set_con_hist:function(){
            con_hist_form = document.createElement("form");
            con_hist_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Convictions";
            legend.classList.add("labelz");
            con_hist = document.createElement("div");
            con_hist.setAttribute("id","con_hist");
            con_hist_form.style.margin = "1% 0.5% 0% 0.5%";
            con_hist_form.style.order = "7";
            con_hist.style.display = "flex";
            con_hist_form.style.flexDirection = "column";
            con_hist_form.style.justifyContent = "flex-start";
            con_hist_form.style.alignItems = "flex-start";
            con_hist_form.style.alignContent = "space-between";
            this.add_con_hist_box();
            con_hist_field.appendChild(legend);
            con_hist_field.appendChild(con_hist);
            con_hist_form.appendChild(con_hist_field);
            body.appendChild(con_hist_form);
        },
        _add_acc_num_injrs:function(num_injrs,num_injrs_lbl){ 
            num_injrs_lbl.innerHTML = "Injuries";
            num_injrs_lbl.classList.add("sub_labelz");
            num_injrs_lbl.style.flex = "0 1 auto";
            num_injrs_lbl.style.order = "6";
            num_injrs.classList.add("inputs");
            num_injrs.setAttribute('class','num_injrs');
            num_injrs.style.flex = "0 1 auto";
            num_injrs.style.order = "7";
            num_injrs.style.width = "5%";           
        },
        _add_acc_num_fts:function(num_fts,num_fts_lbl){ 
            num_fts_lbl.innerHTML = "Deaths";
            num_fts_lbl.classList.add("sub_labelz");
            num_fts_lbl.style.flex = "0 1 auto";
            num_fts_lbl.style.order = "4";
            num_fts.classList.add("inputs");
            num_fts.setAttribute('class','num_fts');
            num_fts.style.flex = "0 1 auto";
            num_fts.style.order = "5";
            num_fts.style.width = "5%";          
        },
        _add_acc_loc:function(loc){ 
            loc.setAttribute("placeholder","Location");
            loc.setAttribute('class','location');
            loc.classList.add("inputs");
            loc.style.flex = "0 1 auto";
            loc.style.order = "3";
            loc.style.width = "15%";       
        },
        _add_acc_type:function(type){
            type.setAttribute("placeholder","Type");
            type.setAttribute('class','type');
            type.classList.add("inputs");
            type.style.flex = "0 1 auto";
            type.style.order = "2";
            type.style.width = "10%";            
        },
        _add_acc_date:function(date){  
            date.setAttribute("placeholder","Date");
            date.setAttribute('class','date');
            date.classList.add("inputs");
            date.style.flex = '0 1 auto';
            date.style.order = "1";
            date.style.width = "10%";          
        },
        add_acc_hist_box:function(){
            var box = document.createElement("div");
            var date,type, loc, num_fts, num_fts_lbl, num_injrs, num_injrs_lbl;
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.order = acc_hist_box_order;
            update_box_order(4,acc_hist_box_order,box);
            box.style.minWidth = "85%";
            date = document.createElement("input");
            type = document.createElement("input");    
            loc = document.createElement("input"); 
            num_fts_lbl = document.createElement("label");
            num_fts = document.createElement("input");      
            num_injrs_lbl = document.createElement("label");
            num_injrs = document.createElement("input");
            this._add_acc_date(date);
            this._add_acc_type(type);
            this._add_acc_loc(loc);
            this._add_acc_num_fts(num_fts,num_fts_lbl);
            this._add_acc_num_injrs(num_injrs,num_injrs_lbl);
            box.appendChild(date);
            box.appendChild(type);
            box.appendChild(loc);
            box.appendChild(num_fts_lbl);
            box.appendChild(num_fts);
            box.appendChild(num_injrs_lbl);
            box.appendChild(num_injrs);
            acc_hist_field.appendChild(box);
        },
        _set_acc_hist:function(){
            acc_hist_form = document.createElement("form");
            acc_hist_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Accidents";
            legend.classList.add("labelz");
            acc_hist = document.createElement("div");
            acc_hist.setAttribute("id","acc_hist");
            acc_hist_form.style.margin = "1% 0.5% 0% 0.5%";
            acc_hist_form.style.order = "6";
            acc_hist.style.display = "flex";
            acc_hist_form.style.flexDirection = "column";
            acc_hist_form.style.justifyContent = "flex-start";
            acc_hist_form.style.alignItems = "flex-start";
            acc_hist_form.style.alignContent = "space-between";
            this.add_acc_hist_box();
            acc_hist_field.appendChild(legend);
            acc_hist_field.appendChild(acc_hist);
            acc_hist_form.appendChild(acc_hist_field);
            body.appendChild(acc_hist_form);
        },
        _add_lic_lbl_1:function(state,box){
            var l1_div = document.createElement("div");
            l1_div.style.order = "1";
            var l1 = document.createElement("label");
            l1.innerHTML = "State";
            l1.classList.add("sub_labelz");
            l1_div.appendChild(l1);
            box.appendChild(l1_div);
            state = document.createElement("input");
            state.setAttribute('class','state');
            state.style.order = "2";
            state.classList.add("sub_inputs");
            state.style.marginLeft = "1%";
            state.style.maxWidth = "15%";
            box.appendChild(state);
        },
        _add_lic_lbl_2:function(num,box){
            var l2_div = document.createElement("div");
            l2_div.style.marginLeft = "7.5%";
            l2_div.style.order = "3";
            var l2 = document.createElement("label");
            l2.innerHTML = "License Number";
            l2.classList.add("sub_labelz");
            l2_div.appendChild(l2);
            box.appendChild(l2_div);
            num = document.createElement("input");
            num.setAttribute('class','lic_num');
            num.style.order = "4";
            num.classList.add("sub_inputs");
            num.style.marginLeft = "1%";
            num.style.maxWidth = "15%";
            box.appendChild(num);
        },
        _add_lic_lbl_3:function(type,box){
            var l3_div = document.createElement("div");
            l3_div.style.marginLeft = "7.5%";
            l3_div.style.borderLeft = "1%";
            l3_div.style.order = "5";
            var l3 = document.createElement("label");
            l3.innerHTML = "Type";
            l3.classList.add("sub_labelz");
            l3_div.appendChild(l3);
            box.appendChild(l3_div);
            type = document.createElement("input");
            type.setAttribute('class','type');
            type.style.order = "6";
            type.classList.add("sub_inputs");
            type.style.marginLeft = "1%";
            type.style.maxWidth = "10%";
            box.appendChild(type);
        },
        _add_lic_lbl_4:function(endmnts,box){
            endmnts = document.createElement("textarea");
            endmnts.setAttribute('class','endorsements');
            endmnts.setAttribute("placeholder","Endorsements");
            endmnts.setAttribute("rows","4");
            endmnts.setAttribute("cols","40");
            endmnts.style.order = "7";
            endmnts.classList.add("sub_inputs");
            box.appendChild(endmnts);
        },
        _add_lic_lbl_5:function(exp_date,box){
            var l5_div = document.createElement("div");
            l5_div.style.marginLeft = "7.5%";
            l5_div.style.borderLeft = "1%";
            l5_div.style.order = "8";
            var l5 = document.createElement("label");
            l5.innerHTML = "Exp.";
            l5.classList.add("sub_labelz");
            l5_div.appendChild(l5);
            box.appendChild(l5_div);
            exp_date = document.createElement("input");
            exp_date.setAttribute('class','exp_date');
            exp_date.style.order = "9";
            exp_date.classList.add("sub_inputs");
            exp_date.style.maxWidth = "10%";
            box.appendChild(exp_date);
        },
        _add_lic_lbl_6:function(deny,box2){
            var l6_div = document.createElement("div");
            l6_div.style.marginLeft = "7.5%";
            l6_div.style.borderLeft = "1%";
            l6_div.style.order = "1";
            var l6 = document.createElement("label");
            l6.innerHTML = "Denied License";
            l6.classList.add("sub_labelz");
            l6_div.appendChild(l6);
            box2.appendChild(l6_div);
            deny = document.createElement("input");
            deny.setAttribute("class","deny");
            deny.style.order = "2";
            deny.classList.add("sub_inputs");
            deny.style.maxWidth = "3%";
            box2.appendChild(deny);
        },
        _add_lic_lbl_7:function(suspend,box2){
            var l6_div = document.createElement("div");
            l6_div.style.marginLeft = "7.5%";
            l6_div.style.borderLeft = "1%";
            l6_div.style.order = "3";
            var l6 = document.createElement("label");
            l6.innerHTML = "Suspended License";
            l6.classList.add("sub_labelz");
            l6_div.appendChild(l6);
            box2.appendChild(l6_div);
            suspend = document.createElement("input");
            suspend.setAttribute('class','suspend');
            suspend.style.order = "4";
            suspend.classList.add("sub_inputs");
            suspend.style.maxWidth = "3%";
            box2.appendChild(suspend);
        },
        _add_lic_lbl_8:function(felony,box2){
            var l6_div = document.createElement("div");
            l6_div.style.marginLeft = "7.5%";
            l6_div.style.borderLeft = "1%";
            l6_div.style.order = "5";
            var l6 = document.createElement("label");
            l6.innerHTML = "Felony Convictions";
            l6.classList.add("sub_labelz");
            l6_div.appendChild(l6);
            box2.appendChild(l6_div);
            felony = document.createElement("input");
            felony.setAttribute('class','felony');
            felony.style.order = "6";
            felony.classList.add("sub_inputs");
            felony.style.maxWidth = "5%";
            box2.appendChild(felony);
        },
        add_lic_box:function(){
            var box = document.createElement("div");
            var state,num, type,endmnts,exp_date;
            box.classList.add("input_containers_b");
            box.style.flex = '0 1 auto';
            box.style.order = lic_box_order;
            update_box_order(3,lic_box_order,box);
            this._add_lic_lbl_1(state,box);
            this._add_lic_lbl_2(num,box);
            this._add_lic_lbl_3(type,box);
            this._add_lic_lbl_4(endmnts,box);
            this._add_lic_lbl_5(exp_date,box);
            lic.appendChild(box);
        },
        _add_lic_detail_box:function(){
            var deny,suspend,felony;
            var box2 = document.createElement("div");  
            box2.classList.add("input_containers_b");
            box2.style.flex = '0 1 auto';
            box2.style.order = "3";    
            this._add_lic_lbl_6(deny,box2);
            this._add_lic_lbl_7(suspend,box2);
            this._add_lic_lbl_8(felony,box2); 
            lic_details.appendChild(box2);     
        },
        _set_lic:function(){
            lic_form = document.createElement("form");
            lic_field = document.createElement("fieldset");
            lic_form.appendChild(lic_field);
            lic = document.createElement("div");
            lic_details = document.createElement("div");
            lic.setAttribute("id","license");
            lic_details.setAttribute("id","license_details");
            lic_form.style.margin = "1% 0.5% 0% 0.5%";
            lic_form.style.order = "5";
            lic_form.style.display = "flex";
            lic_form.style.flexDirection = "column";
            lic_form.style.justifyContent = "flex-start";
            lic_form.style.alignItems = "flex-start";
            lic_form.style.alignContent = "space-between";
            var label_div = document.createElement("legend");
            label_div.classList.add("labelz");
            label_div.innerHTML = "Licenses";
            lic_field.appendChild(label_div);
            this.add_lic_box();
            this._add_lic_detail_box();
            lic_field.appendChild(lic);
            lic_field.appendChild(lic_details);
            lic_form.appendChild(lic_field);
            body.appendChild(lic_form);
        },
        _add_exp_vclass:function(vclass){
            vclass.setAttribute("placeholder","Vehicle Class");
            vclass.classList.add("inputs");
            vclass.style.flex = '0 1 auto';
            vclass.style.order = "1";
            vclass.style.width = "25%";
        },
        _add_exp_fr:function(fr){
            fr.setAttribute("placeholder","From");
            fr.classList.add("inputs");
            fr.style.flex = '0 1 auto';
            fr.style.order = "2";
            fr.style.width = "5%";
        },
        _add_exp_to:function(to){
            to.setAttribute("placeholder","To");
            to.classList.add("inputs");
            to.style.flex = '0 1 auto';
            to.style.order = "3";
            to.style.width = "5%";
        },
        _add_exp_yrs:function(yrs){
            yrs.setAttribute("placeholder","years");
            yrs.classList.add("inputs");
            yrs.style.flex = "0 1 auto";
            yrs.style.order = "4";
            yrs.style.width = "5%";
        },
        _add_exp_miles:function(miles){
            miles.setAttribute("placeholder","miles");
            miles.classList.add("inputs");
            miles.style.flex = "0 1 auto";
            miles.style.order = "5";
            miles.style.width = "5%";
        },
        _add_exp_states:function(states){
            var opt = document.createElement("option");
            opt.setAttribute("value","0");
            var text = document.createTextNode("states");
            opt.appendChild(text);
            states.appendChild(opt);
            states.classList.add("inputs");
            states.style.flex = "0 1 auto";
            states.style.order = "6";
            states.style.width = "17.5%";
            states.multiple = true;
        },
        _add_exp_training:function(training){
            training.setAttribute("placeholder","Special Training");
            training.classList.add("inputs");
            training.style.flex = "0 1 auto";
            training.style.order = "7";
            training.setAttribute("rows","4");
            training.setAttribute("cols","30");
        },
        _add_exp_awards:function(awards){
            awards.setAttribute("placeholder","Awards");
            awards.classList.add("inputs");
            awards.style.flex = "0 1 auto";
            awards.style.order = "8";
            awards.setAttribute("rows","4");
            awards.setAttribute("cols","30");
        },
        _add_exp_sub_box:function(box){
            var states,train,awards;
            states = document.createElement("select");
            states.setAttribute('class','states');
            train = document.createElement("textarea");
            train.setAttribute('class','training');
            awards = document.createElement("textarea");
            awards.setAttribute('class','awards');
            this._add_exp_states(states);
            this._add_exp_training(train);
            this._add_exp_awards(awards);  
            box.appendChild(states);
            box.appendChild(train);
            box.appendChild(awards);
            exp.appendChild(box);
            
        },
        add_exp_box:function(){
            var box = document.createElement("div");
            var vclass,fr,to,yrs,miles;
            vclass = document.createElement("input");
            vclass.setAttribute('class','vclass');
            fr = document.createElement("input");
            fr.setAttribute('class','from');
            to = document.createElement("input");
            to.setAttribute('class','to');
            yrs = document.createElement("input");
            yrs.setAttribute('class','yrs');
            miles = document.createElement("input");
            miles.setAttribute('class','miles');
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.order = exp_box_order;
            update_box_order(2,exp_box_order,box);
            box.style.minWidth = "85%";
            this._add_exp_vclass(vclass);
            this._add_exp_fr(fr);
            this._add_exp_to(to);
            this._add_exp_yrs(yrs);
            this._add_exp_miles(miles);  
            box.appendChild(vclass);
            box.appendChild(fr);
            box.appendChild(to);
            box.appendChild(yrs);
            box.appendChild(miles);
            exp.appendChild(box);
        },
        _set_exp:function(){
            exp_form = document.createElement("form");
            exp_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Experience";;
            legend.classList.add("labelz");
            exp = document.createElement("div");
            var box = document.createElement("div");
            exp.setAttribute("id","exp");
            box.setAttribute("id","exp_states_and_awards_box");
            exp_form.style.margin = "1% 0.5% 0% 0.5%";
            exp_form.style.order = "4";
            exp.style.display = "flex";
            exp.style.flexDirection = "column";
            exp.style.flex = "0 1 auto";
            exp.style.order = "1";
            box.style.display = "flex";
            box.style.flexDirection = "row wrap";
            box.style.flex = "0 1 auto";
            box.style.order = "2";
            exp_form.style.flexDirection = "row wrap";
            exp_form.style.justifyContent = "flex-start";
            exp_form.style.alignItems = "flex-start";
            exp_form.style.alignContent = "flex-start";
            exp_form.style.width = "99%";
            this.add_exp_box();
            this._add_exp_sub_box(box);
            exp_field.appendChild(legend);
            exp_field.appendChild(exp);
            exp_field.appendChild(box);
            exp_form.appendChild(exp_field);
            body.appendChild(exp_form);
        },
        _add_employer:function(employer){
            employer.setAttribute("placeholder","Employer");
            employer.classList.add("inputs");
            employer.style.flex = '0 1 auto';
            employer.style.order = "1";
            employer.style.width = "25%";
        },
        _add_emp_addr:function(addr){
            addr.setAttribute("placeholder","Address");
            addr.classList.add("inputs");
            addr.style.flex = '0 1 auto';
            addr.style.order = "2";
            addr.style.width = "25%";
        },
        _add_emp_phone:function(phone){
            phone.setAttribute("placeholder","Phone");
            phone.classList.add("inputs");
            phone.style.flex = '0 1 auto';
            phone.style.order = "3";
            phone.style.width = "15%";
        },
        _add_emp_addr_fr:function(addr_fr){
            addr_fr.setAttribute("placeholder","From");
            addr_fr.classList.add("inputs");
            addr_fr.style.flex = "0 1 auto";
            addr_fr.style.order = "4";
            addr_fr.style.width = "12.5%";
        },
        _add_emp_addr_to:function(addr_to){
            addr_to.setAttribute("placeholder","To");
            addr_to.classList.add("inputs");
            addr_to.style.flex = "0 1 auto";
            addr_to.style.order = "5";
            addr_to.style.width = "12.5%";
        },
        _add_emp_pos:function(position){
            position.setAttribute("placeholder","Position");
            position.classList.add("inputs");
            position.style.flex = "0 1 auto";
            position.style.order = "6";
            position.style.width = "12.5%";
        },
        _add_emp_reason:function(reason){
            reason.setAttribute("placeholder","Reason for leaving");
            reason.classList.add("inputs");
            reason.style.flex = "0 1 auto";
            reason.style.order = "7";
            reason.setAttribute("rows","4");
            reason.setAttribute("cols","40");
        },
        _add_emp_mregs:function(motor_regs){
            motor_regs.classList.add("inputs");
            motor_regs.style.flex = "0 1 auto";
            motor_regs.style.order = "9";
            motor_regs.style.width = "5%";
        },
        _add_emp_cfr:function(cfr){
            cfr.classList.add("inputs");
            cfr.style.flex = "0 1 auto";
            cfr.style.order = "11";
            cfr.style.width = "5%";
        },
        add_emp_box:function(){
            var box = document.createElement("div");
            var employer,addr,phone,addr_fr, addr_to,position,reason,motor_regs,cfr;
            employer = document.createElement("input");
            employer.setAttribute('class','employer');
            addr = document.createElement("input");
            addr.setAttribute('class','address');
            phone = document.createElement("input");
            phone.setAttribute('class','phone');
            addr_fr = document.createElement("input");
            addr_fr.setAttribute('class','from');
            addr_to = document.createElement("input");
            addr_to.setAttribute('class','to');
            position = document.createElement("input");
            position.setAttribute('class','position');
            reason = document.createElement("textarea");
            reason.setAttribute('class','reason');
            motor_regs = document.createElement("input");
            motor_regs.setAttribute('class','regs');
            cfr = document.createElement("input");
            cfr.setAttribute('class','cfr');
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.order = emp_box_order;
            update_box_order(1,emp_box_order,box);
            box.style.minWidth = "85%";
            this._add_employer(employer);
            this._add_emp_addr(addr);
            this._add_emp_phone(phone);
            this._add_emp_addr_fr(addr_fr);
            this._add_emp_addr_to(addr_to);
            this._add_emp_pos(position);
            this._add_emp_reason(reason);
            this._add_emp_mregs(motor_regs);
            this._add_emp_cfr(cfr);            
            box.appendChild(employer);
            box.appendChild(addr);
            box.appendChild(phone);
            box.appendChild(addr_fr);
            box.appendChild(addr_to);
            box.appendChild(position);
            box.appendChild(reason);
            var l1 = document.createElement("label");
            l1.classList.add("sub_labelz");
            l1.innerHTML = "Subject to Federal Motor Carrier Regs: ";
            l1.style.order = "8";
            var l2 = document.createElement("label");
            l2.classList.add("sub_labelz");
            l2.innerHTML = "49 CFR Part 40 Testing: ";
            l2.style.order = "10";
            box.appendChild(l1);
            box.appendChild(motor_regs);
            box.appendChild(l2);
            box.appendChild(cfr);
            emp_hist_field.appendChild(box);
        },
        _set_emp_hist:function(){
            emp_hist_form = document.createElement("form");
            emp_hist_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Employment History";;
            legend.classList.add("labelz");
            emp_hist = document.createElement("div");
            emp_hist.setAttribute("id","emp_hist");
            emp_hist_form.style.margin = "1% 0.5% 0% 0.5%";
            emp_hist_form.style.order = "3";
            emp_hist.style.display = "flex";
            emp_hist_form.style.flexDirection = "column";
            emp_hist_form.style.justifyContent = "flex-start";
            emp_hist_form.style.alignItems = "flex-start";
            emp_hist_form.style.alignContent = "space-between";
            this.add_emp_box();
            emp_hist_field.appendChild(legend);
            emp_hist_field.appendChild(emp_hist);
            emp_hist_form.appendChild(emp_hist_field);
            body.appendChild(emp_hist_form);
        },
        _add_edu_lbl_1:function(grade,box){
            var l1_div = document.createElement("div");
            l1_div.style.order = "1";
            var l1 = document.createElement("label");
            l1.innerHTML = "Grade School";
            l1.classList.add("sub_labelz");
            l1_div.appendChild(l1);
            box.appendChild(l1_div);
            grade = document.createElement("input");
            grade.setAttribute("id","grade_input");
            grade.style.order = "2";
            grade.classList.add("sub_inputs");
            grade.style.marginLeft = "1%";
            grade.style.maxWidth = "5%";
            box.appendChild(grade);
        },
        _add_edu_lbl_2:function(col,box){
            var l2_div = document.createElement("div");
            l2_div.style.marginLeft = "7.5%";
            l2_div.style.order = "3";
            var l2 = document.createElement("label");
            l2.innerHTML = "College";
            l2.classList.add("sub_labelz");
            l2_div.appendChild(l2);
            box.appendChild(l2_div);
            col = document.createElement("input");
            col.setAttribute("id","college_input");
            col.style.order = "4";
            col.classList.add("sub_inputs");
            col.style.marginLeft = "1%";
            col.style.maxWidth = "5%";
            box.appendChild(col);
        },
        _add_edu_lbl_3:function(grad,box){
            var l3_div = document.createElement("div");
            l3_div.style.marginLeft = "7.5%";
            l3_div.style.borderLeft = "1%";
            l3_div.style.order = "5";
            var l3 = document.createElement("label");
            l3.innerHTML = "Post-Grad";
            l3.classList.add("sub_labelz");
            l3_div.appendChild(l3);
            box.appendChild(l3_div);
            grad = document.createElement("input");
            grad.setAttribute("id","grad_input");
            grad.style.order = "6";
            grad.classList.add("sub_inputs");
            grad.style.marginLeft = "1%";
            grad.style.maxWidth = "5%";
            box.appendChild(grad);
        },
        _add_edu_lbl_4:function(ephone,box){
            var l4_div = document.createElement("div");
            l4_div.style.marginLeft = "7.5%";
            l4_div.style.borderLeft = "1%";
            l4_div.style.order = "1";
            var l4 = document.createElement("label");
            l4.innerHTML = "Emergency";
            l4.classList.add("sub_labelz");
            l4_div.appendChild(l4);
            box.appendChild(l4_div);
            ephone = document.createElement("input");
            ephone.setAttribute("id","ephone_input");
            ephone.style.order = "2";
            ephone.classList.add("sub_inputs");
            ephone.style.maxWidth = "10%";
            box.appendChild(ephone);
        },
        _add_edu_lbl_5:function(exam,box){
            var l5_div = document.createElement("div");
            l5_div.style.marginLeft = "7.5%";
            l5_div.style.borderLeft = "1%";
            l5_div.style.order = "3";
            var l5 = document.createElement("label");
            l5.innerHTML = "Last Physical Exam";
            l5.classList.add("sub_labelz");
            l5_div.appendChild(l5);
            box.appendChild(l5_div);
            exam = document.createElement("input");
            exam.setAttribute("id","exam_input");
            exam.style.order = "4";
            exam.classList.add("sub_inputs");
            exam.style.maxWidth = "5%";
            box.appendChild(exam);
        },
        _add_edu_lbl_6:function(lims,box){
            var l6_div = document.createElement("div");
            l6_div.style.marginLeft = "7.5%";
            l6_div.style.borderLeft = "1%";
            l6_div.style.order = "5";
            var l6 = document.createElement("label");
            l6.innerHTML = "Physical Limitations";
            l6.classList.add("sub_labelz");
            l6_div.appendChild(l6);
            box.appendChild(l6_div);
            lims = document.createElement("input");
            lims.setAttribute("id","phys_lim_input");
            lims.style.order = "6";
            lims.classList.add("sub_inputs");
            lims.style.maxWidth = "5%";
            box.appendChild(lims);
        },
        _add_edu_box:function(){
            var box = document.createElement("div");
            var box2 = document.createElement("div");
            var grade,col, grad,ephone,exam,lims;
            box.classList.add("input_containers_b");
            box.style.flex = '0 1 auto';
            box.style.order = "2";
            box2.classList.add("input_containers_b");
            box2.style.flex = '0 1 auto';
            box2.style.order = "3";
            this._add_edu_lbl_1(grade,box);
            this._add_edu_lbl_2(col,box);
            this._add_edu_lbl_3(grad,box);
            this._add_edu_lbl_4(ephone,box2);
            this._add_edu_lbl_5(exam,box2);
            this._add_edu_lbl_6(lims,box2);
            edu.appendChild(box);
            edu.appendChild(box2);
        },
        _set_edu:function(){
            var form = document.createElement("form");
            var field = document.createElement("fieldset");
            form.appendChild(field);
            edu = document.createElement("div");
            edu.setAttribute("id","edu");
            form.style.margin = "1% 0.5% 0% 0.5%";
            form.style.order = "2";
            form.style.display = "flex";
            form.style.flexDirection = "column";
            form.style.justifyContent = "flex-start";
            form.style.alignItems = "flex-start";
            form.style.alignContent = "space-between";
            var label_div = document.createElement("legend");
            label_div.classList.add("labelz");
            label_div.innerHTML = "Education";
            field.appendChild(label_div);
            this._add_edu_box();
            field.appendChild(edu);
            form.appendChild(field);
            body.appendChild(form);
        },
        add_res_hist_box:function(){
            var box = document.createElement("div");
            var addr,addr_fr, addr_to;
            box.classList.add("input_containers");
            box.style.flex = '0 1 auto';
            box.style.order = addr_box_order;
            update_box_order(0,addr_box_order,box);
            box.style.minWidth = "85%";
            addr = document.createElement("input");
            addr.setAttribute("placeholder","Address");
            addr.setAttribute("class","address");
            addr.classList.add("inputs");
            addr.style.flex = '0 1 auto';
            addr.style.order = "1";
            addr.style.width = "50%";
            addr_fr = document.createElement("input");
            addr_fr.setAttribute("placeholder","From");
            addr_fr.setAttribute("class","from");
            addr_fr.classList.add("inputs");
            addr_fr.style.flex = "0 1 auto";
            addr_fr.style.order = "2";
            addr_fr.style.width = "15%";
            addr_to = document.createElement("input");
            addr_to.setAttribute("placeholder","To");
            addr_to.setAttribute("class","to");
            addr_to.classList.add("inputs");
            addr_to.style.flex = "0 1 auto";
            addr_to.style.order = "3";
            addr_to.style.width = "15%";
            box.appendChild(addr);
            box.appendChild(addr_fr);
            box.appendChild(addr_to);
            res_hist_field.appendChild(box);
        },
        _set_res_hist:function(){
            res_hist_form = document.createElement("form");
            res_hist_field = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = "Residential History";;
            legend.classList.add("labelz");
            res_hist = document.createElement("div");
            res_hist.setAttribute("id","res_hist");
            res_hist_form.style.margin = "1% 0.5% 0% 0.5%";
            res_hist_form.style.order = "1";
            res_hist.style.display = "flex";
            res_hist_form.style.flexDirection = "column";
            res_hist_form.style.justifyContent = "flex-start";
            res_hist_form.style.alignItems = "flex-start";
            res_hist_form.style.alignContent = "space-between";
            this.add_res_hist_box();
            res_hist_field.appendChild(legend);
            res_hist_field.appendChild(res_hist);
            res_hist_form.appendChild(res_hist_field);
            body.appendChild(res_hist_form);
        },
        _set_body:function(){
            body = document.createElement("div");
            body.setAttribute("id","profile_body");
            body.style.display = "flex";
            body.style.flex = "0 1 auto";
            body.style.order = "2";
            body.style.flexFlow = "column";
            body.style.justifyContent = "flex-start";
            body.style.alignItems = "flex-start";
            body.style.maxWidth = (window.innerWidth*0.7)+"px"; 
            this._set_res_hist();
            this._set_edu();
            this._set_emp_hist();
            this._set_exp();
            this._set_lic();
            this._set_acc_hist();
            this._set_con_hist();
            this._set_explanation();           
            this.page.appendChild(body);
            
        },
        clear: function(){
            $('body').find('#profile_body').find('input').each(function(){
                $(this)[0].value = '';
            });
            $('body').find('#profile_body').find('textarea').each(function(){
                $(this)[0].value = '';
            });
            box_order_obj_arr.forEach(function(item){
                if(item['cur_itr'] > 0){
                    for(var i = item['cur_itr']; i > 0; i--){
                        item['dom_obj_ref_arr'][i].parentNode.removeChild(item['dom_obj_ref_arr'][i]);
                    }
                }
            });
        },
        _populate_con_inputs:function(acc_date,acc_loc,charge,penalty,jobj){
            jobj.find('.date').val(acc_date);
            jobj.find('.location').val(acc_loc);
            jobj.find('.charge').val(charge);
            jobj.find('.penalty').val(penalty);
        },
        _populate_con:function(user){
            var acc_date = '';
            var acc_loc = '';
            var charge = '';
            var penalty = '';
            user["convictions"].forEach(function(item,index){
                acc_date += item["date"];
		var len = Object.keys(item["location"]).length;
		for(var i = 0; i < len; i++){
                    if(len > 4){
			if(i === 0){
                            acc_loc += item["location"][i]["long_name"]+" ";		
			}else if(i === 2 || i === 4){}
			else if(i > 0 && i < 7){
                            acc_loc += item["location"][i]["long_name"]+", ";
			}else if(i === 7){
                            acc_loc += item["location"][i]["long_name"];
			}else if(i === 8 && item["location"][i]["long_name"]){
                            acc_loc += ("-"+ item["location"][i]["long_name"]);
			}
                    }else{
			if(i === 0 || i === 2){
                            acc_loc += item["location"][i]["long_name"]+", ";		
			}else if(i === 3){
                            acc_loc += item["location"][i]["long_name"];
			}
                    }	
                }
		charge += item["charge"];
		penalty +=  item["penalty"];
                if(index === 0){	
                    var jobj = $(box_order_obj_arr[5]['dom_obj_ref_arr'][index]);
                    _populate_con_inputs(acc_date,acc_loc,charge,penalty,jobj);
                }else if(index > 0){
                    add_exp_box(); 	
                    var jobj = $(box_order_obj_arr[5]['dom_obj_ref_arr'][index]);                       
                    _populate_con_inputs(acc_date,acc_loc,charge,penalty,jobj);
                }
		acc_date = '';
		acc_loc = '';
		charge = '';
		penalty = '';
            });
        },
        _populate_acc_inputs:function(acc_date,acc_type,acc_loc,fatalities,injuries,jobj){
            jobj.find('.date').val(acc_date);
            jobj.find('.type').val(acc_type);
            jobj.find('.location').val(acc_loc);
            jobj.find('.num_fts').val(fatalities);
            jobj.find('.num_injrs').val(injuries);
        },
        _populate_acc:function(user){
            var acc_date = '';
            var acc_type = '';
            var acc_loc = '';
            var fatalities = '';
            var injuries = '';
            user["accidents"].forEach(function(item,index){
                acc_date += item["date"];
		acc_type += item["type"];
		var len = Object.keys(item["location"]).length;
		for(var i = 0; i < len; i++){
                    if(len > 4){
			if(i === 0){
                            acc_loc += item["location"][i]["long_name"]+" ";		
			}else if(i === 2 || i === 4){}
			else if(i > 0 && i < 7){
                            acc_loc += item["location"][i]["long_name"]+", ";
			}else if(i === 7){
                            acc_loc += item["location"][i]["long_name"];
			}else if(i === 8 && item["location"][i]["long_name"]){
                            acc_loc += ("-"+ item["location"][i]["long_name"]);
			}
                    }else{
			if(i === 0 || i === 2){
                            acc_loc += item["location"][i]["long_name"]+", ";		
			}else if(i === 3){
                            acc_loc += item["location"][i]["long_name"];
			}
                    }	
		}
                fatalities += item["num_fatalities"];
		injuries +=  item["num_injuries"];
                if(index === 0){	
                    var jobj = $(box_order_obj_arr[4]['dom_obj_ref_arr'][index]);
                    _populate_acc_inputs(acc_date,acc_type,acc_loc,fatalities,injuries,jobj);
                }else if(index > 0){
                    add_exp_box(); 	
                    var jobj = $(box_order_obj_arr[4]['dom_obj_ref_arr'][index]);                       
                    _populate_acc_inputs(acc_date,acc_type,acc_loc,fatalities,injuries,jobj);
                }			
		acc_date = '';
		acc_type = '';
		acc_loc = '';
		fatalities = '';
		injuries = '';
            });
        },
        _populate_lic_inputs:function(state,num,type,en,ex,jobj){
            jobj.find('.state').val(state);
            jobj.find('.lic_num').val(num);
            jobj.find('.type').val(type);
            jobj.find('.endorsements').val(en);
            jobj.find('.exp_date').val(ex);
        },
        _populate_lic:function(user){
        var obj = JSON.parse(JSON.stringify(user['licenses']));
	var deny = (obj['denied_license'] === 'T' ? 'Yes':'No');
	var suspend = (obj['suspended_license'] === 'T' ? 'Yes':'No');
	var felony = (obj['felony_conviction'] === 'T' ? 'Yes':'No');
	var len = obj.licenses.length;
	var state = '';
	var num;
	var type = '';
	var en = '';
	var ex = '';
            for(var i = 0; i < len; i++){
                state = obj['licenses'][i].state;
                num = obj['licenses'][i].number;
                type = obj['licenses'][i].type;
                en = obj['licenses'][i].endorsements;
                ex = new Date(obj['licenses'][i].expiration_date).toDateString();
                if(i === 0){	
                    var jobj = $(box_order_obj_arr[3]['dom_obj_ref_arr'][i]);
                    _populate_lic_inputs(state,num,type,en,ex,jobj);
                    jobj.find('.deny').val(deny);
                    jobj.find('.suspend').val(suspend);
                    jobj.find('.felony').val(felony);
                }else if(i > 0){
                    add_exp_box(); 	
                    var jobj = $(box_order_obj_arr[3]['dom_obj_ref_arr'][i]);                       
                    _populate_lic_inputs(state,num,type,en,ex,jobj);
                }
            }
        },
        _populate_exp_inputs:function(vclass,from,to,yrs,miles,jobj){
            jobj.find('.vclass').val(vclass);
            jobj.find('.from').val(from);
            jobj.find('.to').val(to);
            jobj.find('.yrs').val(yrs);
            jobj.find('.miles').val(miles);
        },
        _populate_exp:function(user){
            var obj2 = JSON.parse(JSON.stringify(user['experience']));
            var states = [];
            var vclass,from, to, yrs, miles,training,awards;
            var state_len = Object.keys(obj2['states']).length;
            for(var i = 0; i < state_len; i++){
                    if(i >= 0 && state_len > 1 && i < state_len -1){
                            states.push(obj2['states'][i]);		
                    }else if(i === 0 && state_len === 1){
                            states.push(obj2['states'][i]);
                    }else if(i > 0 && i === state_len - 1){
                            states.push(obj2['states'][i]);
                    }	
            }
            obj2['vehicles_array'].forEach(function(item,index){
                    vclass = item["vehicle_class"];
                    from = new Date(item["from"]).toDateString();
                    to = new Date(item["to"]).toDateString();
                    yrs = item["total_time"];
                    miles = item["total_miles"];
                    training = obj2["special_training"];
                    awards = obj2["awards"];
                    if(index === 0){	
                        var jobj = $(box_order_obj_arr[2]['dom_obj_ref_arr'][index]);
                        _populate_exp_inputs(vclass,from,to,yrs,miles,jobj);
                        for(var i = 0; i < states.length;i++){
                            jobj.find('.states').append("<option value='"+(i+1)+"'>"+states[i]+"</option>");
                        }                        
                        jobj.find('.training').val(training);
                        jobj.find('.awards').val(awards);
                    }else if(index > 0){
                        add_exp_box(); 	
                        var jobj = $(box_order_obj_arr[2]['dom_obj_ref_arr'][index]);                       
                        _populate_exp_inputs(vclass,from,to,yrs,miles,jobj);
                    }
            });
        },
        _populate_emp_inputs:function(address,employer,pos,res,fed,cfr,phone,from,to,jobj){
            jobj.find('.employer').val(employer);
            jobj.find('.address').val(address);
            jobj.find('.phone').val(phone);
            jobj.find('.from').val(from);
            jobj.find('.to').val(to);
            jobj.find('.position').val(pos);
            jobj.find('.regs').val(fed);
            jobj.find('.cfr').val(cfr);
            jobj.find('.reason').val(res);
        },
        _populate_emp:function(user){
            var obj2 = JSON.parse(JSON.stringify(user['employers']));
            var len = Object.keys(obj2).length;
            for(var i = 0; i < len; i++){
                    var address = obj2[i]['postal_address'];
                    var employer = obj2[i]['employer'];
                    var pos = obj2[i]['position'];
                    var res = obj2[i]['reason_for_leaving'];
                    var fed = obj2[i]['federal_motor_carrier_safety_regs'];
                    var cfr = obj2[i]['49_CFR_part40_testing'];
                    var phone = obj2[i]['phone'];
                    var from = obj2[i]['from'];
                    var to = obj2[i]['to'];
                    if(i === 0){	
                        var jobj = $(box_order_obj_arr[1]['dom_obj_ref_arr'][i]);
                        this._populate_emp_inputs(address,employer,pos,res,fed,cfr,phone,from,to,jobj);
                    }else if(i > 0){
                        this.add_emp_box(); 	
                        var jobj = $(box_order_obj_arr[1]['dom_obj_ref_arr'][i]);                       
                        this._populate_emp_inputs(address,employer,pos,res,fed,cfr,phone,from,to,jobj);
                    }
            }
        },
        _populate_edu:function(user){
            $('#grade_input').val(user['grade_school']);
            $('#college_input').val(user['college']);
            $('#grad_input').val(user['grad_school']);
            $('#ephone_input').val(user['emergency_phone']);
            $('#exam_input').val(user['last_phys_exam']);
            var phys_lims = user['phys_limits'] === 'T' ? 'Yes':'No';
            $('#phys_lim_input').val(phys_lims);
        },
        _populate_addr_inputs:function(res,from,to,obj){
             var jobj = obj;
             jobj.find('.address').val(res);
             jobj.find('.from').val(from);
             jobj.find('.to').val(to);
        },
        _populate_addr:function(user){
            var res = "";
            var from = "";
            var to = "";
            var len = Object.keys(user['addresses']).length;
            for(var counter = 0; counter < len; counter++){
                            var o = JSON.parse(JSON.stringify(user['addresses'][counter]));
                            from = o["from"];
                            to = o["to"];
                            var arr = JSON.parse(o['address_data'][0]);
                            arr.forEach(function(item,index){
                                    if(index === 0){
                                            res += JSON.parse(JSON.stringify(item))['long_name']+" ";		
                                    }else if(index === 2 || index === 4){}
                                    else if(index > 0 && index < 7){
                                            res += JSON.parse(JSON.stringify(item))['long_name']+", ";
                                    }else if(index === 7){
                                            res += JSON.parse(JSON.stringify(item))['long_name'];
                                    }else if(index === 8 && JSON.parse(JSON.stringify(item))['long_name']){
                                            res += ("-"+JSON.parse(JSON.stringify(item))['long_name']);
                                    }

                            });//populate box 0 and then add a box if there is another iteration - populating that one as well
                            if(counter === 0){
                                var jobj = $(box_order_obj_arr[0]['dom_obj_ref_arr'][counter]);
                                _populate_addr_inputs(res,from,to,jobj);                               
                            }else if(counter > 0){
                                add_res_hist_box();
                                var jobj = $(box_order_obj_arr[0]['dom_obj_ref_arr'][counter]);
                                _populate_addr_inputs(res,from,to,jobj);
                            }
             res = '';
             from = '';
             to = '';
            }
        },
        _populate_hdr:function(user){
            $("#applicant_usernameBox").val(user['username']);
            var fullname = user['last_name']+', '+user['first_name']+' '+user['middle_name'];
            $("#applicant_nameBox").val(fullname);
            $("#ssn").val(user['ssn']);
            $("#applicant_phoneBox").val(user['phone']);
            $("#applicant_emailBox").val(user['email']);
            $("#dob").val(user['dob']);
            $("#age").val(user['age']);
            $("#position").val(user['position']);
        },
        populate:function(user){
            this._populate_hdr(user);
            this._populate_addr(user);
            this._populate_edu(user);
            this._populate_emp(user);
            this._populate_exp(user);
            this._populate_lic(user);
            this._populate_acc(user);
            this._populate_con(user);
        },
        construct:function(){
            this.__proto__ = new Profile_Page($outer,"applicant");
            this.init();
            this._set_body();
            $outer.find('input').each(function(){
                $(this)[0].disabled = true;
            });
        }
    };
    return obj;
};