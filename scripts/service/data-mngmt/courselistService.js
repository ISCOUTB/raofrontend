raoweb.factory('courselistService', function ($http, $rootScope, $location, loginService, sessionService) {
    return{
        teachercourses: function () {
            $rootScope.loading = true;

            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/teacher/" + sessionStorage.getItem('user') + "/courses?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET"
            }).success(function (response) {
                console.log(response);
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

        var msg = "El usuario " + sessionStorage.getItem('user') + " no tiene cursos"; //REVISAR ESTE MENSAJE DE ERROR
        var msg2 = "El usuario con el código" + sessionStorage.getItem('user') + " no existe o no es un docente.";
        var msg3 = "401 - Acceso no autorizado";

        var type = sessionStorage.getItem('type');
        var message, swal_type, title, color;

        switch(response){
            case msg:
                title = "Info";
                message = msg;
                swal_type = "info";
                color = "#8CD4F5";
                break;
            case msg2:
                title = "Info";
                message = msg2;
                swal_type = "info";
                color = "#8CD4F5";
                break;
            case msg3:
                title = "Error";
                message = msg3;
                swal_type = "error";
                color = "#DD6B55";
                break;
        }

        if (response !== msg && response !== msg2 && response !== msg3) {
            $rootScope.json = response;
            $rootScope.courses = response.courses;
            $rootScope.id = $rootScope.json.id;
            $rootScope.names = $rootScope.json.names;
            $rootScope.lastnames = $rootScope.json.lastnames;
            $rootScope.resources_uri = $rootScope.json.resources_uri;
        } else {
            swal({   
                title: title,   
                text: message,   
                type: swal_type,     
                confirmButtonColor: color,   
                confirmButtonText: "Aceptar",   
                closeOnConfirm: false 
            });
            
            /*if (response != msg) {
                loginService.logout();
             }*/
        }
    }

    function error(msg) {
        var message = msg.status + " - " + msg.data;
        swal({   
            title: "Error",   
            text: message,   
            type: "error",    
            confirmButtonColor: "#DD6B55", 
            confirmButtonText: "Aceptar",   
            closeOnConfirm: false 
        });
        
        if (msg.status === 401) {
            loginService.logout();
        }
    }
});



