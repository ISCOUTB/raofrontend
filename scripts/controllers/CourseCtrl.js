'use strict';	
raoweb.controller('CourseCtrl' ,function($scope, $location, $http, $rootScope, sessionService, courselistService, loginService) {
    if(localStorage.length === 0){
        $location.path('/login');
    }
    else{
        
        /*courselistService.teachercourses().then(function (response) {
                    if (response.status){
                        /*swal({
                            title: "Error",
                            text: response.status + " - " + response.data,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: false
                        });*/
                    /*}else{
                        returnData(response, course); //call returnData method
                    }
                });
                
        courselistService.teachercourses();
        courselistService.studentcourses();*/
        
    }
});