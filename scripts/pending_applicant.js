'use strict';

function Pending_Applicant(ref){
    var user_ref = ref;
    var stub = "/var/www/html/users/applicants/"+user_ref['username']+"/";
    var img = new Image();
    var profile_img_added = false;
    
    
    var obj = {
        _user_init_callback:function(data){
            
        },
        _createXMLHttpRequest:function(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }else{
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        },
        _user_init_query:function(){
            if(user_ref['user_type'] === 'new_applicant'){
                
            }else if(user_ref['user_type'] === 'pending_applicant'){
                
            }
        },
        init:function(){
            this._user_init_query();
        },
        construct:function(){
            this.init();
        }
    };
    return obj;
}