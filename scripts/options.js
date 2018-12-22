'use strict';

var options = (function(){
    var $lft_panel,$loader,$rt_panel,user_ref;
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    return {
        welcome:function(){},
        uploads:function(){},
        updates:function(){
            $rt_panel.children().each(function(){$(this).remove();});
            $rt_panel.animate({
                "max-width":"0px"
            },1000);
            $loader.children().each(function(){$(this).remove();});
            $loader.animate({
                "min-width":"50%",
                "margin-top":(height*0.05)+"px"
            },1000);
            $lft_panel.animate({
                "min-width":(width*0.22)+"px",
                "min-height":((height*0.1)*sub_options.updates.list.length)+"px",
                "margin-right":(width*0.025)+"px",
                "margin-top":(height*0.05)+"px"
            },1000);
            sub_options.updates.populate();
        },
        more_info:function(){},
        help:function(){},
        inbox:function(){},
        settings:function(){},
        init:function(lftPanel, mainPanel, rtPanel,uref){
            $lft_panel = lftPanel;
            $loader = mainPanel;
            $rt_panel = rtPanel;
            user_ref = uref;
            sub_options.init_s($lft_panel,$loader,$rt_panel,user_ref);
        }
    };
})();

var sub_options = (function(events,mapper){
    var $lft_p,$loader,$rt_p,ref;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var div_width=width*0.25;
    var div_height=height*0.1;
    var pic_width=width*0.05;
    var text_width=width*0.15;
    var pic_height=height*0.09;
    
    return {
        updates:{
            deployed: false,
            list:[
                {text:'routes', src:'/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/truck_loads.png',
                    width:500,height:201,count:3,handle:null
                },
                {text:'traffic', src:'/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/traffic.png',
                    width:200,height:200,count:3,handle:null
                },
                {text:'gas', src:'/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/gas.png',
                    width:334,height:258,count:4,handle:null
                },
                {text:'markets', src:'/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/markets.png',
                    width:263,height:204,count:6,handle:null
                },
                {text:'my updates', src:'/home/thoth/NetBeansProjects/OLTranspo/public_html/pics/my\ updates.png',
                    width:450,height:450,count:7,handle:null
                }
            ],
            init_events:function(){
                events.on('routes',function(){
                    if(!document.getElementById('map')){
                        var m = document.createElement('div');
                        m.setAttribute('id','map');
                        document.getElementById('loader').appendChild(m);
                        mapper.init_map();
                    }
                });
                events.on('traffic',this.traffic);
                events.on('gas',this.gas);
                events.on('business',this.business);
                events.on('my updates',this.my_updates);
            },
            populate:function(){
                if(this.deployed){return;}
                this.deployed = true;
                this.init_events();
                this.list.forEach(function(item){
                    var div = document.createElement('div');
                    $lft_p[0].appendChild(div);
                    $(div).css({
                        "display":"flex",
                        "flex-flow":"row nowrap",
                        "justify-content":"flex-start",
                        "align-items":"center",
                        "align-content":"space between",
                        "border-radius":"3px",
                        "background-color": "#000000",
                        "max-width":(div_width)+"px",
                        "max-height":"0px",
                        "margin":(height*0.005)+"px "+(width*0.005)+"px",
                        "padding":(height*0.005)+"px 0px",
                        "text-align":"center",
                        "overflow":"hidden"
                    });
                    $(div).addClass('lft_panel_div');
                    var pic_canvas = document.createElement('canvas');
                    pic_canvas.setAttribute('id',item['text']+'_key_frame');
                    div.appendChild(pic_canvas);
                    $(pic_canvas).css({
                        "flex":"0 1 auto",
                        "order": "1",
                        "min-width":pic_width+"px",
                        "height":"0px",
                        "border-radius":"3px"
                    });
                    var text_canvas = document.createElement('div');
                    div.appendChild(text_canvas);
                    
                    $(text_canvas).css({
                        "flex":"0 1 auto",
                        "order": "2",
                        "min-width":"80%",
                        "min-height":"0px",
                        "border-radius":"3px",
                        "text-align":"center",
                        "vertical-align":"middle",
                        "line-height":div_height+"px"
                    });
                    $(div).animate({
                        "max-height":div_height+"px"
                    },500);
                    $(pic_canvas).animate({
                        "height":pic_height+"px"
                    },500,function(){
                        var counter,itr; counter = itr = 0;
                        var ctx = pic_canvas.getContext('2d');
                        ctx.fillStyle = "#ffffff";
                        var img = new Image();
                        img.onload = function(){
                            item['handle'] = setInterval(function(){
                                ctx.fillRect(0,0,pic_canvas.width,pic_canvas.height);
                                ctx.drawImage(img,itr*item['width'],0,item['width'],item['height'],0,0,pic_canvas.width,pic_canvas.height);
                                counter += 1;
                                if(counter > 40){counter = 0; itr += 1;}
                                if(itr>=item['count'])itr = 0;
                            },25);
                        };
                        img.src = item['src'];
                    });
                    $(text_canvas).animate({
                        "min-height":pic_height+"px"
                    },500,function(){
                        $(this).text(item['text']);
                        $(this).addClass('lft_panel_text');
                    });
                    $(text_canvas).click(function(){
                        events.emit(item['text']);
                    });
                });
            }
        },
        init_s:function(lftPanel, mainPanel, rtPanel,uref){
            $lft_p = lftPanel;
            $loader = mainPanel;
            $rt_p = rtPanel;
            ref = uref;
        }
    };
})(events,mapper);