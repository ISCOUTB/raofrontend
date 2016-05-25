'use strict';
angular.module('raoweb')
        .controller('logoutctrl', ['$scope', 'loginService', '$location', '$rootScope', function ($scope, loginService, $location, $rootScope) {
              loginService.logout();
}]);