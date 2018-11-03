'use strict';

var Logger = (function(){
    function _create_XMLHttpRequest(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    //6384 size, 6385 pay
    function _log_clbk(data){
        var req = _create_XMLHttpRequest();
         req.open('post','http://localhost:6385',true);
         req.send(JSON.stringify(data));
    }
    function _snd_log_req(dir,uname){
        var pre_req = _create_XMLHttpRequest();
        var s_dir = (dir === 'in')?"login":"logout";
         var m_obj = {username:uname,log:s_dir};
         var len = JSON.stringify(m_obj).length;
         var s_obj = {size:len};
         pre_req.open('post','http://localhost:6384',true);
         pre_req.onreadystatechange = function(){
             if(pre_req.status === 200 | pre_req.readyState === 4){
                 _log_clbk(m_obj);
             }
         };
         pre_req.send(JSON.stringify(s_obj));
    }
    var obj = {
        LOG:function(dir,uname){
            _snd_log_req(dir);
        }
    };
    return obj;
})();