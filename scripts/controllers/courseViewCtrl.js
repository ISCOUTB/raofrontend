angular.module('raoweb').
controller('courseViewCtrl', ['$scope', '$location','$stateParams','courseviewService','sessionService','$state', function ($scope, $location,   $stateParams,courseviewService,sessionService, $state) {
        $scope.course = $stateParams.course;
        $scope.user = sessionService.get('user');
        if(sessionStorage.length === 0){
            $location.path('/login');
        }
        if (sessionService.get('type') === 'teacher'){
            courseviewService.teachercourseview($scope.course);
            $state.go('courseview',{course:$scope.course});
        }
        else{
            courseviewService.studentcourseview($scope.course);    
            $state.go('studentcourseview',{course:$scope.course})
            courseviewService.studentstatistics($scope.user,$scope.course);
        }
        $scope.modalStatistics = function(){
            courseviewService.getattendance($scope.course);
        };
}]);