raoweb.factory('courselistService', function ($http, $rootScope, $location, loginService, sessionService) {
    return{
        teachercourses: function () {
            $rootScope.loading = true;

            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/teacher/" + sessionStorage.getItem('user') + "/courses?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET"
            }).success(function (response) {
                //console.log(response);
                returnData(response);

            }).catch(function (msg) {
                error(msg);
            });
        },
        studentcourses: function () {
            $rootScope.loading = true;

            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/student/" + sessionStorage.getItem('user') + "/courses?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET"
            }).success(function (response) {
                //console.log(response);
                returnData(response);

            }).catch(function (msg) {
                error(msg);
            });
        }
    };

    function returnData(response) {
        $rootScope.loading = false;

        var msg = "El usuario " + sessionStorage.getItem('user') + " no tiene cursos";
        var msg2 = "El usuario con el código" + sessionStorage.getItem('user') + " no existe o no es un docente.";
        var msg3 = "401 - Acceso no autorizado";

        var type = sessionStorage.getItem('type');
        var message;

        if (response == msg) {
            message = msg;
        } else if (response == msg2) {
            message = msg2;
        } else {
            message = msg3;
        }

        if (response != msg && response != msg2 && response != msg3) {
            $rootScope.json = response;
            $rootScope.courses = response.courses;
            $rootScope.id = $rootScope.json.id;
            $rootScope.names = $rootScope.json.names;
            $rootScope.lastnames = $rootScope.json.lastnames;
            $rootScope.resources_uri = $rootScope.json.resources_uri;
        } else {
            Materialize.toast(message, 5000, 'rounded');
            /*if (response != msg) {
                loginService.logout();
             }*/
        }
    }

    function error(msg) {
        var msgtxt = msg.status + " - " + msg.data;
        Materialize.toast(msgtxt, 6000, 'rounded');
        if (msg.status === 401) {
            loginService.logout();
        }
    }
});



