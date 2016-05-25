'use strict';
angular.module('raoweb')
  .controller('teacherCtrl', ['$scope','loginService','$http', '$location', 'profile', function($scope,loginService, $http, $location,profile){
        profile.teacherprofile();
}]);
