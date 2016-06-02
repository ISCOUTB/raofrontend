'use strict';	
raoweb.controller('studentsByCourseCtrl', ['$scope','$element', '$location','$http', '$stateParams','studentlistService','$rootScope','sessionService', 'loginService',function($scope,$element, $location,$http, $stateParams, studentlistService, $rootScope, sessionService, loginService) {
    $scope.course = $stateParams.course;
    if(sessionStorage.length===0){
        $location.path('/login');
    }
    if (sessionService.get('type') === 'teacher'){
        studentlistService.attendancelist($scope.course);
        studentlistService.attendancechange();
        studentlistService.attendancepost();
    }
    else{
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
}]);