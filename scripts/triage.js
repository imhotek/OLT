var res = "";
var from = "";
var to = "";
var len = Object.keys(obj['addresses']).length;
for(var counter = 0; counter < len; counter++){
		from = obj['addresses'][counter]["from"];
		to = obj['addresses'][counter]["to"];
		obj['addresses'][counter]["address_data"].forEach(function(item3){
			for(var i = 0; i < 9; i++){
				if(i === 0){
					res += JSON.parse(JSON.stringify(item3[i]))['long_name']+" ";		
				}else if(i === 2 || i === 4){
					continue;
				}else if(i > 0 && i < 7){
					res += JSON.parse(JSON.stringify(item3[i]))['long_name']+", ";
				}else if(i === 7){
					res += JSON.parse(JSON.stringify(item3[i]))['long_name'];
				}else if(i === 8 && item[i]){
					res += ("-"+JSON.parse(JSON.stringify(item3[i]))['long_name']);
				}
		
			}
	console.log(res);
	console.log("From: "+from+"   To: "+to);
	res = '';
	from = '';
	to = '';    
    });
	console.log("space.....");
}