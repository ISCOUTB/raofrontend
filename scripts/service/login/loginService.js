'use strict';
raoweb.factory('loginService', function ($http, $location, sessionService) {
    var sesionName; 
    var sesionToken; 
    var sesionType; 
    return{
        login: function (data, scope) {
            var $promise = $http.post('http://raoapi.utbvirtual.edu.co:8082/token?username='+ data.username+'&password='+ data.password).then(function (msg) {
                var user_id = msg.data.token;
                var user_type = msg.data.type;
                if (user_id) {
                    sessionService.set('user', data.username);
                    sessionService.set('token', user_id);
                    sessionService.set('type', user_type);
                    sesionName = data.username;
                    sesionToken = user_id;
                    sesionType = user_type;
                    if (user_type === "teacher"){
                        scope.msgtxt = 'Datos del profesor correctos';
                    }
                    else{
                        scope.msgtxt = 'Datos del estudiante correctos';
                    }
                    Materialize.toast(scope.msgtxt, 5000, 'rounded');
                    if (sessionStorage.getItem('type') === 'student') {
                        $location.path('/dashboard/student/home');
                    } else {
                        $location.path('/dashboard/teacher/home');
                    }
                }
            }).catch(function (mes) {
                scope.msgtxt = 'Datos incorrectos, intentelo nuevamente.';
                Materialize.toast(scope.msgtxt, 5000, 'rounded');
            });
        },
        logout: function () {
            $http.post('http://raoapi.utbvirtual.edu.co:8082/tokenlogout?username='+sessionService.get('user')+'&token='+ sessionService.get('token')).then(function (msg) {
                sessionService.destroy('user');
                sessionService.destroy('token');
                sessionService.destroy('type');
            });
            $location.path("/login");
        }
    }

});



