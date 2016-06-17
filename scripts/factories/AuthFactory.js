'use strict';
raoweb.factory('AuthFactory', function ($http, $location, LocalStorageFactory, $state, $rootScope) {
    return{
        IfAuthenticated: function (url) { //key and value -> of params
            var token = LocalStorageFactory.get('token');
//            console.log(token);
            if (token) {
                console.log('ALLOW'); 
                
                if(url === "/login"){
                    $location.path('/dashboard/courses'); 
                }
            } else {
                console.log('DENY');
                event.preventDefault();
                $location.path('/login');
            }
        },
        login: function (user) {
            var promise = $http.post('http://raoapi.utbvirtual.edu.co:8082/token?username=' + user.username + '&password=' + user.password);
            /*.success(function(response) {
             //console.log(response);
             user = user.username;
             })
             .error(function(err) {
             user = "null";
             //console.log("error service");
             //console.log(err);
             });*/
            return promise;
        },
        logout: function () {
            $http.post('http://raoapi.utbvirtual.edu.co:8082/tokenlogout?username=' + LocalStorageFactory.get('user') + '&token=' + LocalStorageFactory.get('token'))
                    .success(function (data) {
                        deleteLocalStorage();
                        //console.log(data);
                    })
                    .error(function (err) {
                        //console.log("error " + err);
                        swal({
                            title: "Error",
                            text: "No se pudo cerrar sesión correctamente, inténtelo nuevamente",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: false
                        });

                        $location.path('/dashboard/courses');
                    });
        },
        destroyLocalStorage: function () {
            deleteLocalStorage();
        }
    };

    function deleteLocalStorage() {
        LocalStorageFactory.destroy('user');
        LocalStorageFactory.destroy('token');
        //console.log(data);
        $location.path('/login');
    }
});



