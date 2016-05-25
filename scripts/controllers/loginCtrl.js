'use strict';
angular.module('raoweb').controller('loginCtrl', ['$scope', 'loginService', '$location', '$rootScope', function ($scope, loginService, $location, $rootScope) {
    $scope.msgtxt = '';
    $scope.login = function (data) {
        $rootScope.asd = $scope;
        loginService.login(data, $rootScope.asd); 
    };
}]);