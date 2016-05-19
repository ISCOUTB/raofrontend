'use strict';
angular.module('raoweb').controller('DashboardCtrl', function($scope, $state) {
	$scope.id = sessionStorage.getItem('user');
    $scope.$state = $state;
  });
