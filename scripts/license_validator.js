'use strict';

var License_Validator = (function(){
    var obj = {
        1:/[A-Za-z0-9]{1}[0-9]{0,6}/,
        2:/[0-9]{1,7}/,
        3:/[A-Za-z0-9]{1}[0-9]{8}/,
        4:/[0-9]{9}/,
        5:/[A-Za-z]{1}[0-9]{7}/,
        6:/[A-Za-z0-9]{1,9}[A-Za-z0-9]{0,2}[A-Za-z0-9]{0,6}/,
        7:/[0-9]{9}/,
        8:/[0-9]{1,7}/,
        9:/[A-Za-z]{1}[0-9]{12}/,
        10:/[0-9]{7,9}/,
        11:/[H0-9]{1,9}[0-9]{0,8}/,
        12:/[0-9]{0,9}[A-Za-z]{0,2}[0-9]{0,6}[A-Za-z]{0,1}/,
        13:/[A-Za-z]{1}[0-9]{11,12}/,
        14:/[A-Za-z]{0,1}[0-9]{9,10}/,//1Alpha+9Numeric or 9Numeric or 10Numeric
        15:/[0-9]{3,9}[0-9]{0,3}[A-Za-z]{0,2}[0-9]{0,4}/,//9Numeric or 3Numeric+2Alpha+4Numeric
        16:/[0-9]{0,9}[K]{0,1}[0-9]{0,8}/,//9 digits, or "K" + 8 digits
        17:/[A-Za-z]{0,1}[0-9]{8,9}/,//1Alpha+8Numeric or 1Alpha+9Numeric or 9Numeric
        18:/[0-9]{9}/,//9 digits
        19:/[0-9]{7,8}[A-Za-z]{0,1}/,//7Numeric or 7Numeric+1Alpha or 8Numeric
        20:/[A-Za-z]{1}[0-9]{12}/,//1Alpha+12Numeric
        21:/[A-Za-z]{0,1}[0-9]{8,9}/,//1Alpha+8Numeric or 9Numeric
        22:/[A-Za-z]{1}[0-9]{10,12}/,//1Alpha+10Numeric or 1Alpha+12Numeric
        23:/[A-Za-z]{1}[0-9]{12}/,//1Alpha+12Numeric
        24:/[0-9]{9}/,//9 digits
        25:/[A-Za-z]{0,1}[0-9]{5,9}/,//9 digits or 1 letter + 5-9 digits
        26:/[A-Za-z]{0,1}[0-9]{8,14}/,//1Alpha+8Numeric or 13Numeric or 9Numeric or 14Numeric
        27:/[A-Za-z]{1}[0-9]{3,8}/,//1 Alpha 3-8 Numeric
        28:/[X]{0,1}[0-9]{8,12}/,//9Numeric or 10Numeric or 12Numeric or X+8Numeric
        29:/[0-9]{0,2}[A-Za-z]{3}[0-9]{5,8}/,//Prior to 10/11/17 - 2#'s +3 Let +5#'s: AFTER 10/11/2017 3 Let + 8 #'s
        30:/[A-Za-z]{1}[0-9]{14}/,//1Alpha+14Numeric
        31:/[0-9]{8,9}/,//8Numeric or 9Numeric
        32:/[A-Za-z]{0,8}[0-9]{0,18}/,//1Alpha+7Numeric or 1Alpha+18Numeric or 8Numeric or 9Numeric or 16 Numeric or 8Alpha
        33:/[0-9]{1,12}/,//1-12 digits
        34:/[A-Za-z]{0,3}[0-9]{6,9}/,//9 digits, or 3 letters + 6 digits
        35:/[A-Za-z]{2}[0-9]{6}/,//2 letters + 6 digits
        36:/[A-Za-z]{0,1}[0-9]{9}/,//1Alpha+9Numeric or 9Numeric
        37:/[0-9]{1,9}/,//1-9Numeric
        38:/[0-9]{8}/,//8 digits
        39:/[A-Za-z]{0,1}[0-9]{6,7},/,//7Numeric or 1Alpha+6Numeric
        40:/[0-9]{1,11}/,//1 to 11 digits
        41:/[0-9]{6,12}/,//6 or 12 digits
        42:/[0-9]{7,9}/,//7-9 digits
        43:/[0-9]{7,8}/,//7-8Numeric
        44:/[0-9]{4,10}/,//4-10Numeric
        45:/[0-9]{7,8}[A-Za-z]{0,1}/,//8 digits, or 7 digits + 1 letter
        46:/[A-Za-z]{0,1}[0-9]{8,9}/,//9 digits, or 1 letter and 8 digits
        47:/[A-Za-z]{1,7}[A-Za-z0-9\*]{5,11}/,//1-7Alpha+any combination of Alpha, Numeric, or * for a total of 12 characters
        48:/[A-Za-z]{0,2}[0-9]{5,7}/,//7Numeric or 1-2Alpha+5-6Numeric
        49:/[A-Za-z]{1}[0-9]{13}/,//1Alpha+13Numeric
        50:/[0-9]{9,10}/,//9-10Numeric
        51:/[0-9]{7,9}/
    };
    function validate_state(val,str){
        if(str.match(obj[val])){
            return true;
        }else{
            return false;
        }
    }
    return {
        validate_state:validate_state
    };
})();