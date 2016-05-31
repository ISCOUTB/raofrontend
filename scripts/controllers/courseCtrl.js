'use strict';	
raoweb.controller('courseCtrl', ['$scope', '$location', '$http', '$rootScope', 'sessionService', 'courselistService', 'loginService' ,function($scope, $location, $http, $rootScope, sessionService, courselistService, loginService) {
    if(sessionStorage.length === 0){
        $location.path('/login');
    }
    else{
        if (sessionService.get('type') === 'teacher'){
            $location.path("/dashboard/teacher/home"); 
            courselistService.teachercourses();
        } 
        else if (sessionService.get('type') === 'student'){ 
            $location.path("/dashboard/student/home");
            courselistService.studentcourses();
        }else{
            swal({   
                title: "Error",   
                text: "401 - Acceso no autorizado",   
                type: "error",     
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Aceptar",   
                closeOnConfirm: false 
            });
            loginService.logout();
        }
    }
}]);