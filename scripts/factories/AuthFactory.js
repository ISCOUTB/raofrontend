'use strict';
raoweb.factory('AuthFactory', function ($http, $location, LocalStorageFactory, $state) {
    return{
        IfAuthenticated: function() {
            var token = LocalStorageFactory.get('token');
//            console.log(token);
            if(token){
                console.log('ALLOW');
                $location.path('/dashboard/courses'); 
            }else{
                console.log('DENY');
                event.preventDefault();
                $location.path('/login');
            }
        },
        
        login: function (user) {
            var promise = $http.post('http://raoapi.utbvirtual.edu.co:8082/token?username='+ user.username+'&password='+ user.password);
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
            $http.post('http://raoapi.utbvirtual.edu.co:8082/tokenlogout?username='+LocalStorageFactory.get('user')+'&token='+ LocalStorageFactory.get('token'))
                .success(function(data) {
                    LocalStorageFactory.destroy('user');
                    LocalStorageFactory.destroy('token');   
                    //console.log(data);
                    $location.path('/login');
                })
                .error(function(err) {
                    //console.log("error " + err);
                    $location.path('/dashboard/courses'); 
                    swal({
                        title: "Error",
                        text: "No se pudo cerrar sesión correctamente, inténtelo nuevamente",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: false
                    });
                });
        }
    };
});



