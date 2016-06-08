'use strict';
raoweb.controller('CourseViewCtrl', function ($scope, $location, $stateParams, courseviewService, $state) {
    var course = $stateParams.course;
    console.log(course);
    var user = sessionService.get('user');

    if (sessionStorage.length === 0) {
        $location.path('/login');
    } else {
        if (sessionService.get('type') === 'teacher') {
            courseviewService.teachercourseview(course).then(function (response) {
                if (response.status){
                    /*swal({
                        title: "Error",
                        text: response.status + " - " + response.data,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: false
                    });*/
                }else{
                    returnData(response, course); //call returnData method
                }
            });

            //To show statistics 
            $state.go('courseview',{course:course});
            $scope.modalStatistics = function(){
                courseviewService.getattendance(course);
            };

        } else if (sessionService.get('type') === 'student') {
            courseviewService.studentstatistics(user, course);
        } else {
            swal({
                title: "Error",
                text: "401 - Acceso no autorizado",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false
            });
            loginService.logout();
        }
    }

    function returnData(response, course) {
            $scope.loading = false;

            var msg = "El curso con NRC " + course + " no existe";
            var msg2 = "No hay estudiantes matriculados en el curso con el NRC " + course;
            var msg3 = "401 - Acceso no autorizado";

            var type = sessionStorage.getItem('type');
            var message, swal_type, title, color;

            switch (response) {
                case msg:
                    title = "Info";
                    message = msg;
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

            if (response !== msg && response.students !== msg2 && response !== msg3) {
                $scope.json = response;
                $scope.nrc = $scope.json.nrc;
                $scope.subject = $scope.json.subject;
                $scope.students = $scope.json.students;
                $scope.names = $scope.json.students.names;
                $scope.lastnames = $scope.json.students.lastnames;
                $scope.estudentID = $scope.json.students.id;
            } else {
                if (response.students === msg2) {
                    $scope.json = response;
                    $scope.nrc = $scope.json.nrc;
                    $scope.subject = $scope.json.subject;

                    $scope.students_empty = true; //Mostrar mensaje de que no existen estudiantes matriculados en el curso
                } else {
                    showSweetAlert(title, message, swal_type, color);

                    if (response === msg) {
                        if (type === 'teacher') {
                            $location.path("/dashboard/teacher/home");
                        } else if (type === 'student') {
                            $location.path("/dashboard/student/home");
                        } else {

                        }
                    } else if (response === msg3) {
                        error("1", response);
                    }
                }
            }
        };
});
