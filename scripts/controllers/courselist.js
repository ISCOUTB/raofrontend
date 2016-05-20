'use strict';	
raoweb
.controller('courseCtrl', ['$scope', '$location','$http','$rootScope', 'sessionService', 'courselistService','loginService' ,function($scope, $location, $http,$rootScope,sessionService,courselistService,loginService) {
    $rootScope.show = {'visibility': 'visible'};
    $rootScope.hide = {'visibility': 'hidden'};
    if(sessionStorage.length===0){
        $location.path('/login');
    }
    else{
        if (sessionService.get('type') == 'teacher'){ 
            $location.path("/dashboard/teacher/home"); 
            courselistService.teachercourses(); 
        } 
        else{ 
            $location.path("/dashboard/student/home");
            courselistService.studentcourses();
        }
    }
}]);
