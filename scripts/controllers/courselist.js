'use strict';	
raoweb
.controller('courseCtrl', ['$scope', '$location','$http','$rootScope', 'sessionService', 'courselistService','loginService' ,function($scope, $location, $http,$rootScope,sessionService,courselistService,loginService) {
    if(sessionStorage.length===0){
        $location.path('/login');
    }
    
    else{
        if (sessionService.get('type') == 'teacher'){ 
            courselistService.teachercourses(); 
            $location.path("/dashboard/teacher/home"); 
        } 
        else{ 
            courselistService.studentcourses(); 
            $location.path("/dashboard/student/home"); 
        }
    }
}]);
