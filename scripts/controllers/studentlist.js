angular.module('raoweb')
.controller('studentsByCourseCtrl', ['$scope','$element', '$location','$http', '$stateParams','studentlistService','$rootScope','sessionService',function($scope,$element, $location,$http, $stateParams, studentlistService,$rootScope,sessionService) {
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
        var msgtxt = 'Las credenciales no concuerdan. Ingrese nuevamente.';
        Materialize.toast(msgtxt, 5000, 'rounded');
        $location.path("/login");
    }
}]);