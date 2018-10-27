'use strict';

var date_filler = (function(){
    
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    function fillMonths(mo_sel,start,end){
        for(var i = start; i <= end; i++){
            mo_sel.append("<option value='"+i+"'>"+months[i-1]+"</option>");
        }
    }
    function fillYears(yr_sel,start,end){
        for(var i = end; i >= start; i--){
                yr_sel.append("<option value='"+i+"'>"+i+"</option>");
            }
    }
    function fillGrades(grade,start,end){
        for(var i = start; i <=end; i++){
            grade.append("<option value='"+i+"'>"+i+"</option>");
        }
    }
    function _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box){
        var len = arguments.length;
        if(mo_sel.find('option:selected').val() > 0 && mo_day_sel.find('option:selected').val() > 0  && 
                        year_sel.find('option:selected').val() > 0){
                       var yr = year_sel.find('option:selected').text();
                       var mo = mo_sel.find('option:selected').val()-1;
                       var day = mo_day_sel.find('option:selected').text();
                       var bday = new Date(yr,mo,day);
                       var age = Math.floor((new Date()-bday)/31570560000);
                       if(new Date().getMonth() === bday.getMonth() && new Date().getDate() === bday.getDate()){
                            age +=1;
                        }
                       if(len > 3){
                            $(date_div).find(age_box).val(age);
                        }else{
                            return age;
                        }
                }
    }
    function setMonthSelect(start,end,mo_sel,mo_day_sel,year_sel,date_div,age_box){
        var len = arguments.length; 
        mo_sel.change(function(){
                mo_day_sel.find('option').each(function(){
                    $(this).remove();
                });
                mo_day_sel.append("<option value='0'></option>");
                if($(this).val() === "1"|| $(this).val() === "3"|| $(this).val() === "5"|| $(this).val() === "7"|| 
                        $(this).val() === "8"|| $(this).val() === "10"|| $(this).val() === "12"){ 
                    for(var i = start; i <= (end === false ? 31:end); i++){
                        mo_day_sel.append("<option value='"+i+"'>"+i+"</option>");
                    }
                    if(len > 5){
                        _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                    }
                }else if($(this).val() === "4"|| $(this).val() === "6"|| $(this).val() === "9"|| $(this).val() === "11"){
                    for(var x = start; x <= (end === false ? 30:end); x++){ 
                        mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                    }
                    if(len > 5){
                        _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                    }
                }else if($(this).val() === "2" && year_sel.find("option:selected").val() !== "0"){ 
                    if(year_sel.find("option:selected").text()%4 === 0){
                        for(var x = start; x <= (end === false ? 29:end); x++){
                            mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                        }
                        if(len > 5){
                            _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                        }
                    }else{
                        for(var x = start; x <= (end === false ? 28:end); x++){
                            mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                        }
                        if(len > 5){
                            _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                        }
                    }
                }
            });
    }
    function setMonthFloor(start,end,mo_sel,mo_day_sel,year_sel){
                mo_day_sel.find('option').each(function(){
                    $(this).remove();
                });
                mo_day_sel.append("<option value='0'></option>");
                if(mo_sel.val() === "1"|| mo_sel.val() === "3"|| mo_sel.val() === "5"|| mo_sel.val() === "7"|| 
                        mo_sel.val() === "8"|| mo_sel.val() === "10"|| mo_sel.val() === "12"){ 
                    for(var i = start; i <= (end === false ? 31:end); i++){
                        mo_day_sel.append("<option value='"+i+"'>"+i+"</option>");
                    }
                }else if(mo_sel.val() === "4"|| mo_sel.val() === "6"|| mo_sel.val() === "9"|| mo_sel.val() === "11"){
                    for(var x = start; x <= (end === false ? 30:end); x++){ 
                        mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                    }
                }else if(mo_sel.val() === "2" && year_sel.find("option:selected").val() !== "0"){ 
                    if(year_sel.find("option:selected").text()%4 === 0){
                        for(var x = start; x <= (end === false ? 29:end); x++){
                            mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                        }
                    }else{
                        for(var x = start; x <= (end === false ? 28:end); x++){
                            mo_day_sel.append("<option value='"+x+"'>"+x+"</option>");
                        }
                    }
                }
    }
    function setYearSelect(start,year_sel,mo_sel,mo_day_sel,date_div,age_box){
        var len = arguments.length;
        year_sel.change(function(){
                if($(this).find("option:selected").text()%4 === 0){
                    if(mo_sel.val() === "2"){
                        mo_day_sel.find('option').each(function(){
                            $(this).remove();
                        });
                        mo_day_sel.append("<option></option>");
                        for(var x = start; x <= 29; x++){
                            mo_day_sel.append("<option>"+x+"</option>");
                        }
                        if(len > 4){// This was just changed from 3 to 4, so if something breaks, here's the culprit
                            _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                        }
                    }
                }else if($(this).find("option:selected").text()%4 !== 0){
                    if(mo_sel.val() === "2"){
                        mo_day_sel.find('option').each(function(){
                            $(this).remove();
                        });
                        mo_day_sel.append("<option></option>");
                        for(var x = start; x <= 28; x++){
                            mo_day_sel.append("<option>"+x+"</option>");
                        }
                    }
                    if(len > 4){// This was just changed from 3 to 4, so if something breaks, here's the culprit
                        _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
                    }
                }
            });
    }
    function setMonthDaySelect(mo_sel,mo_day_sel,year_sel,date_div,age_box){
        var len = arguments.length;
        mo_day_sel.change(function(){
            if(len > 3){
                _getAge(mo_sel,mo_day_sel,year_sel,date_div,age_box);
            }
        });
    }
    function getDate(yr,mo,mo_day){
        return new Date(yr,mo,mo_day);
    }
    function set_dates(f_mo,f_yr,f_day,t_mo,t_yr,t_day,ceil){
                f_mo.find('option').each(function(){
                            $(this).remove();
                });
                f_mo.append("<option value='0'></option>");
                f_yr.find('option').each(function(){
                            $(this).remove();
                });
                f_yr.append("<option value='0'></option>");
                f_day.find('option').each(function(){
                            $(this).remove();
                });
                f_day.append("<option value='0'></option>");
                t_mo.find('option').each(function(){
                            $(this).remove();
                });
                t_mo.append("<option value='0'></option>");
                t_yr.find('option').each(function(){
                            $(this).remove();
                });
                t_yr.append("<option value='0'></option>");
                t_day.find('option').each(function(){
                            $(this).remove();
                });
                t_day.append("<option value='0'></option>");
                
                var from_date = new Date(ceil.valueOf()-86400000);
                fillMonths(f_mo,1,12);
                fillYears(f_yr,1978,from_date.getFullYear());
                fillMonths(t_mo,1,12);
                fillYears(t_yr,1978,ceil.getFullYear());
                f_yr.change(function(){ 
                    if(parseInt($(this).find('option:selected').val()) === from_date.getFullYear() && (parseInt(f_mo.find('option:selected').val()-1) > from_date.getMonth() || f_mo.length <= 1)){
                        f_mo.find('option').each(function(){
                            $(this).remove();
                        });
                        f_mo.append("<option value='0'></option>");
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        fillMonths(f_mo,1,from_date.getMonth()+1);
                    }else if(parseInt($(this).find('option:selected').val()) !== from_date.getFullYear() && f_mo[0].length <= from_date.getMonth()+2){
                        f_mo.find('option').each(function(){
                            $(this).remove();
                        });
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        f_mo.append("<option value='0'></option>");
                        fillMonths(f_mo,1,12);
                    }else if(f_mo.find('option:selected').val() === '2'){
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,f_mo,f_day,$(this));
                    }
                });
                f_mo.change(function(){
                    if(parseInt(f_yr.find('option:selected').val()) === from_date.getFullYear() && parseInt($(this).find('option:selected').val()) === from_date.getMonth()+1){
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,from_date.getDate()-1,$(this),f_day,f_yr);
                    }else if(parseInt(f_yr.find('option:selected').val()) === from_date.getFullYear() && parseInt($(this).find('option:selected').val()) < from_date.getMonth()+1){
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),f_day,f_yr);
                    }else if(parseInt(f_yr.find('option:selected').val()) !== from_date.getFullYear()){
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),f_day,f_yr);
                    }else if(parseInt(f_yr.find('option:selected').val())%4===0){
                        f_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),f_day,f_yr);
                    }
                });
                t_yr.change(function(){ 
                    if(parseInt($(this).find('option:selected').val()) === ceil.getFullYear() && (parseInt(t_mo.find('option:selected').val()-1) > ceil.getMonth() || t_mo.length <= 1)){
                        t_mo.find('option').each(function(){
                            $(this).remove();
                        });
                        t_mo.append("<option value='0'></option>");
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        fillMonths(t_mo,1,ceil.getMonth()+1);
                    }else if(parseInt($(this).find('option:selected').val()) !== ceil.getFullYear() && t_mo[0].length <= ceil.getMonth()+2){
                        t_mo.find('option').each(function(){
                            $(this).remove();
                        });
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        t_mo.append("<option value='0'></option>");
                        fillMonths(t_mo,1,12);
                    }else if(t_mo.find('option:selected').val() === '2'){
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,t_mo,t_day,$(this));
                    }
                });
                t_mo.change(function(){
                    if(parseInt(t_yr.find('option:selected').val()) === ceil.getFullYear() && parseInt($(this).find('option:selected').val()) === ceil.getMonth()+1){
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,ceil.getDate(),$(this),t_day,t_yr);
                    }else if(parseInt(t_yr.find('option:selected').val()) === ceil.getFullYear() && parseInt($(this).find('option:selected').val()) < ceil.getMonth()+1){
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),t_day,t_yr);
                    }else if(parseInt(t_yr.find('option:selected').val()) !== ceil.getFullYear()){
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),t_day,t_yr);
                    }else if(parseInt(t_yr.find('option:selected').val())%4===0){
                        t_day.find('option').each(function(){
                            $(this).remove();
                        });
                        setMonthFloor(1,false,$(this),t_day,t_yr);
                    }
                });
            }
    function collect_dates(f_mo,f_yr,f_day,t_mo,t_yr,t_day,obj){
        for(var i = 0; i < 6; i++){
           if(arguments[i].find('option:selected').text().trim().length === 0){
               alert('From/To date fields cannot be blank.\n');
               return false;
           }
        }
        var from_date = new Date(parseInt(f_yr.find('option:selected').text()),parseInt(f_mo.find('option:selected').val()-1),parseInt(f_day.find('option:selected').text()));
        var to_date = new Date(parseInt(t_yr.find('option:selected').text()),parseInt(t_mo.find('option:selected').val()-1),parseInt(t_day.find('option:selected').text()));
        var total = (to_date.valueOf() - from_date.valueOf())/31536000000;
        if(total < 0){
            alert('The date at which you started this job cannot come after the date at which you ended it.');
            return false;
        }
        var from = f_yr.find('option:selected').text()+'-'+f_mo.find('option:selected').val()+'-'+f_day.find('option:selected').text();
        var to = t_yr.find('option:selected').text()+'-'+t_mo.find('option:selected').val()+'-'+t_day.find('option:selected').text();
        obj['from'] = from;
        obj['to'] = to;
        obj['total_time'] = total;
        set_dates(f_mo,f_yr,f_day,t_mo,t_yr,t_day,from_date);
        return true;
    }
    
    return{
        fillMonths: fillMonths,
        setMonthSelect: setMonthSelect,
        fillYears: fillYears,
        setYearSelect: setYearSelect,
        setMonthDaySelect: setMonthDaySelect,
        getDate: getDate,
        setMonthFloor: setMonthFloor,
        fillGrades: fillGrades,
        set_dates: set_dates,
        collect_dates: collect_dates
    };    
})();