'use strict';

function tile(sx,sy,ex,ey,fx,fy,$class,outer,id){
    this.startX = sx;
    this.startY = sy;
    this.endX = ex;
    this.endY = ey;
    this.width = "5%";
    this.height = "10%";
    this.final_width = "45%";
    this.final_height = "30%";
    this.final_x = fx;
    this.final_y = fy;
    this.div = "";
    this.$class = $class;
    this.$outer = outer;
    this.id = id;
    this.running = false;
    this.run_me = false;
    this.init = function(){
        this.div = document.createElement('div');
        this.$outer.get(0).appendChild(this.div);
        this.div.setAttribute('class',this.$class);
        this.div.setAttribute('id', this.id);
        this.$outer.find("#"+this.id).css({
            "position" : "absolute",
            "width" : this.width,
            "height" : this.height,
            "top" : this.startY,
            "left" : this.startX,
            "background-color" : "black",
            "border-radius" : "100%",
            "transition" : "right 0.25s linear"
        });
        this.$outer.find("#"+this.id).addClass('stop');
    };
    this.deploy = function(){
        this.$outer.find("#"+this.id).animate({
                "left" : this.endX
        });
    };
    this.retract = function(){
        this.$outer.find("#"+this.id).animate({
                "left" : this.startX
        });
    };
    this.run_seq = function(qObj,user){
        this.$outer.find("#"+this.id).append(qObj[this.id]["text"]);
        qObj[this.id].update(this,user);
    };
    this.final_seq = function(){
        this.$outer.find("#"+this.id).animate({
            "border-radius" : "0px",
            "width" : this.final_width,
            "height" : this.final_height,
            "top" : this.final_y,
            "left" : this.final_x            
        },1000);
    };
};

var TileFactory = (function(){
    
    var tile_names = ["top left","top right","mid left","mid right","bottom left","bottom right"];
    var tiles = [];
    var $outer_div;
    
    function _createTiles(){ 
        for(var i = 0 ; i < tile_names.length; i++){
            var tmp_class = tile_names[i];
            var sx,sy,ex,ey,fx,fy;

            if(tmp_class.includes("top")){
                sy ="15%";ey = "15%";
                fy = "5%";
            }else if(tmp_class.includes("mid")){
                sy = "45%";ey = "45%";
                fy = "35%";
            }else if(tmp_class.includes("bottom")){
                sy = "75%";ey = "75%";
                fy = "65%";
            }

            if(tmp_class.includes("left")){
                // if left, set the right prop
                sx = "-5%";
                ex = "2%";
                fx = "5%";
            }else if(tmp_class.includes("right")){
                // if right, set the left prop
                sx = "105%";
                ex = "93%";
                fx = "50%";
            }
            var id = ""+i+"";
            var tmptile = new tile(sx,sy,ex,ey,fx,fy,tmp_class,$outer_div, id);
            tiles[i] = tmptile;
        }
    }
    function launch_tiles(){
        var i;
        var len = tiles.length;
            for(i = 0; i < len; i++){
                (function(cur){
                        setTimeout(function(){
                            tiles[cur].init();    
                            tiles[cur].deploy();
                    },500);
                })(i);
            }
    }
    function retract_tiles(){
        var i;
        var len = tiles.length;
            for(i = 0; i < len; i++){
                (function(cur){
                        setTimeout(function(){
                            tiles[cur].retract();
                    },500);
                })(i);
            }
    }
    function render(outer){
        $outer_div = outer;
        _createTiles();
    }
    function get_all(){
        return tiles;
    }
    return {
        render: render,
        launch : launch_tiles,
        retract : retract_tiles,
        get_all: get_all
    };
})();