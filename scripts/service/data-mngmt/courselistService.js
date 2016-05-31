raoweb.factory('courselistService', function ($http, $rootScope, $location, loginService, sessionService) {
    return{
        teachercourses: function () {
            $rootScope.courses_empty = false;
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
                console.log(response);
                returnData(response);

            }).catch(function (msg) {
                error(msg);
            });
        }
    };

    function returnData(response) {
        $rootScope.loading = false;

        var msg = "El usuario no tiene ningún curso."; //REVISAR ESTE MENSAJE DE ERROR
        var msg2 = "El estudiante no existe o no está matriculado como estudiante en ningún curso.";
        var msg3 = "El usuario no existe o no es un docente.";
        var msg4 = "401 - Acceso no autorizado";

        var type = sessionStorage.getItem('type');
        var message, swal_type, title, color;

        switch(response){
            case msg2:
                title = "Error";
                message = msg2;
                swal_type = "error";
                color = "#DD6B55";
                break;
            case msg3:
                title = "Error";
                message = msg3;
                swal_type = "error";
                color = "#DD6B55";
                break;
            case msg4:
                title = "Error";
                message = msg4;
                swal_type = "error";
                color = "#DD6B55";
                break;    
        }
        
        
        if (response.courses !== msg && response !== msg2 && response !== msg3 && response !== msg4) {   
            $rootScope.json = response;
            $rootScope.courses = response.courses;
            $rootScope.id = $rootScope.json.id;
            $rootScope.names = $rootScope.json.names;
            $rootScope.lastnames = $rootScope.json.lastnames;
            $rootScope.resources_uri = $rootScope.json.resources_uri;
        } else {
            
            if (response.courses === msg) {
                console.log(msg);
                $rootScope.courses_empty = true; //Mostrar mensaje de que no existen cursos activos para el usuario
            }else{
                showSweetAlert(title, message, swal_type, color);
                loginService.logout();
            } 
        }
    }
    
    function error(msg) {
        var message = msg.status + " - " + msg.data;     
        showSweetAlert("Error", message, "error", "#DD6B55");

        if (msg.status === 401) {
            loginService.logout();
        }
    }
    
    function showSweetAlert(title, message, swal_type, color){
        swal({   
            title: title,   
            text: message,   
            type: swal_type,     
            confirmButtonColor: color,   
            confirmButtonText: "Aceptar",   
            closeOnConfirm: false 
        });
    }
});



