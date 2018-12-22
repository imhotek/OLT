'use strict';

var mapper = (function(google){
        
    return {
    map:null,
    set_map:function(m){this.map = m;},
    info_window:null,
    set_info_window:function(iw){this.info_window = iw;},
    traffic_layer:null,
    set_traffic_layer:function(t){this.traffic_layer = t;},
    
    init_map:function(){
        var tmp_map,info_window,traffic_layer,pos; tmp_map=info_window=traffic_layer = pos = null;
	$(document.getElementById('map')).animate({"height":"50%"},1000,function(){
                $(document.getElementById('map')).css({"height":"50%"});
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function(position){
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        tmp_map = new google.maps.Map(document.getElementById('map'),{
                            center: {lat: position.coords.latitude, lng: position.coords.longitude},
                            zoom: 6,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });
                        info_window = new google.maps.InfoWindow;
                        traffic_layer = new google.maps.TrafficLayer();
                        traffic_layer.setMap(tmp_map);
                        info_window.setPosition(pos);
                        info_window.setContent('Location found.');
                        info_window.open(tmp_map);
                        tmp_map.setCenter(pos);
                        set_map(tmp_map);
                        set_info_window(info_window);
                        set_traffic_layer(traffic_layer);
                }, function() {
                    handleLocationError(true, info_window, tmp_map.getCenter());
                });
            } else {
                handleLocationError(false, info_window, tmp_map.getCenter());
            }
        });
	
    },
    handleLocationError:function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
};
})(google);