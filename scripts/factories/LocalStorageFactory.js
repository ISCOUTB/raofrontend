'use strict';
raoweb.factory('LocalStorageFactory', function(){
    return{
        set:function(key,value){
            return localStorage.setItem(key,value);
        },
        get:function(key){
            return localStorage.getItem(key);
        },
        destroy:function(key){
            return localStorage.removeItem(key);
        }
    };
});