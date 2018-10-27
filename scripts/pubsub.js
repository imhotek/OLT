'use strict';

var events = {
    events : {},
    on : function(eventName, fn){
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off : function(eventName, fn){
        if(this.events[eventName]){
            for(var i = 0; i < this.events[eventName].length; i++){
                if(this.events[eventName][i] === fn){
                    this.events[eventName].splice(i,1);
                    break;
                }
            }
        }
    },
    removeAll : function(){
        for(var prop in this.events){
            if(this.events.hasOwnProperty(prop)){
                for(var i = 0; i < this.events[prop].length; i++){
                    this.events[prop].splice(i,1);
                }
            }
        }
    },
    emit : function(eventName){
        if(this.events[eventName]){
            this.events[eventName].forEach(function(fn){
                fn();
            });
        }
    }
};