var app = angular.module('raoweb');
app.controller('AuthCtrl', function($scope, AuthFactory, LocalStorageFactory, $location) {
    $scope.login = function (user) {
        AuthFactory.login(user)
            .then(function(response) {
                /*console.log("response");
                console.log(response.data);*/
                //Save data in localStorage
                var username = user.username;
                var token = response.data.token;
                LocalStorageFactory.set('user', username);
                LocalStorageFactory.set('token', token);
                
                $location.path('/dashboard/courses');
            })
            .catch(function(err) {
                /*console.log("error");
                console.log(err);*/
                swal({
                    title: "Error",
                    text: "Datos incorrectos, inténtelo nuevamente",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: false
                });
            });
    };
});