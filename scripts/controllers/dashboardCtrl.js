'use strict';
angular.module('raoweb').controller('dashboardCtrl', function($scope, $state) {
	$scope.id = sessionStorage.getItem('user');
    $scope.$state = $state;
  });
