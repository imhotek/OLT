'use strict';

function Pending_Applicant(ref,type){
    var user_ref = ref;
    var run_type = type;
    var test_script_stub ="/home/thoth/NetBeansProjects/OLTranspo/public_html/";
    var prod_script_stub = "/var/www/html/";
    var stub = "/var/www/html/users/applicants/"+user_ref['username']+"/";
    var test_stub = test_script_stub+"/users/applicants/"+user_ref['username']+"/";
    var img = new Image();
    var profile_img_added = false;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var $body = $('body');
    var $wrapper = $body.find('#wrapper');
    var $nav = $body.find('#nav');
    var $wel = $body.find('#welcome');
    var $wel_but = $wel.find('#welcome_button');
    var $nav_opts = $body.find('#nav_options');
    var $adv_opts = $body.find('#adv_options');
    var $content_background = $body.find('#content_background');
    var $content_body = $content_background.find('#content_body');
    var $action_box = $body.find('#action_box');
    var $loader = $body.find('#loader');
    var $left_panel = $body.find('#left_panel');
    var $right_panel = $body.find('#right_panel');
    
    var obj = {
        // BUILD PAGE START....
        _deploy_action_box:function(){
            $action_box.css({
                'max-width':(width*0.5)+'px',
                "display":"flex",
                "flex-flow":"column nowrap",
                "justify-content":"center",       
                "align-items":"center",
                "align-content":"space-around",
                "font":"150% bold white tahoma"
            });
            $action_box.find('canvas').attr({'width':width*0.5,'height':height*0.2});
               $action_box.find('canvas').css({
                   'flex':'0 1 auto',
                   'background-color':'black'
               });
               $action_box.find('div').css({
                   'flex':'0 1 auto',
                   'background-color':'black',
                   'min-width':'0px',
                   'max-height':'0px'
               });
           $action_box.animate({'min-height':(height*0.3)},750,function(){
               $action_box.find('div').animate({// INSTEAD, make this run after canvas animation completes.
                   'min-width':(width*0.5)+'px',
                   'max-height':(height*0.1)+'px'
               },100,function(){
                   var c_w = $action_box.find('canvas').attr('width');
                   var c_h = $action_box.find('canvas').attr('height');
                   var penmen = new Penmen('A',$action_box.find('canvas'),0,0,c_w,0,c_w,c_h,0,c_h,250);
                   penmen.init();
               });
           });
        },
        _build_body:function(){
            $content_background.css({
                'max-width':width+'px',
                'min-height':(height*0.85)+'px',
                "display":"flex",
                "flex-flow":"column nowrap",
                "justify-content":"flex-start",       
                "align-items":"center"
            });
            $content_body.css({});
        },
        _build_header:function(){
            $nav.css({
                'min-width':width+'px',
                'max-height':(height*0.15)+'px',
                'background-color':'black',
                "display":"flex",
                "flex-flow":"row nowrap",
                "justify-content":"flex-start",       
                "align-items":"center",
                "align-content":"stretch"
            });
            $wel.css({
                "flex-grow":"1",
                "flex":"0 1 auto",
                "display":"flex",
                "flex-flow":"column nowrap",
                "justify-content":"flex-start",
                "align-items":"center","align-content":"flex-start"                
            });
            $wel_but.css({
                "flex":"0 1 auto",
                "display":"flex",
                "flex-flow":"row nowrap",
                "justify-content":"space-around",
                "align-items":"center",
                "align-content":"flex-start"
            });
            $wel_but.addClass('nav_buttons');
            $wel_but.text('welcome back, '+user_ref['username']);
            $nav_opts.css({
                "flex-grow":"2",
                "display":"flex",
                "flex-flow":"row nowrap",
                "justify-content":"space-around",
                "align-items":"center","align-content":"center",
                "min-height":1.5*(height*0.1)+"px"
            });
            $nav_opts.find('div').each(function(){$(this).addClass('nav_buttons');});
            $adv_opts.css({
                "flex-grow":"1",
                "display":"flex",
                "flex-flow":"row nowrap",
                "justify-content":"space-around",
                "align-items":"center","align-content":"center",
                "min-height":1.5*(height*0.1)+"px"
            });
            $adv_opts.find('div').each(function(){$(this).addClass('nav_buttons');});
        },
        _build_wrapper:function(){
            $wrapper.css({
                'max-width':width+'px',
                'min-height':height+'px',
                'background-image': 'linear-gradient(white,#A9A9A9)'
            });
        },
        _init_page:function(){
            this._build_wrapper();
            this._build_header();
            this._build_body();
            this._deploy_action_box();
        },
        // ...END BUILD PAGE
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
            this._init_page();
        }
    };
    return obj;
}

(function(){
    var test_app = new Pending_Applicant({username:'dwilson',user_type:'new_applicant'},'test');
    test_app.construct();
})();