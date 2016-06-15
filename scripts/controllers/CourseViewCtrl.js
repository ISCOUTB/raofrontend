'use strict';
raoweb.controller('CourseViewCtrl', function ($http, $scope, $location, $stateParams, LocalStorageFactory, CourseViewFactory, $state) {
    var course = $stateParams.course;
    var user = LocalStorageFactory.get('user');

    if (localStorage.length === 0) {
        $location.path('/login');
    } else {
        $scope.loading = true;
        $scope.students_empty = false;

        CourseViewFactory.courseView(course)
            .then(function (response) {
                response = response.data;

                $scope.loading = false;

                console.log("response courseview", response);

                var msg = "No estás matriculado en este curso.";
                var msg2 = "No existe ningún curso con el NRC " + course + ".";
                var msg3 = "No hay estudiantes matriculados en el curso con el NRC " + course;

                if (response !== msg && response !== msg2) {
                    $scope.subject = response.subject_name;
                    $scope.nrc = response.nrc;

                    if (response.students !== msg3) {
                        //Student list
                        $scope.students = response.students;
                    } else {
                        $scope.students_empty = true;
                    }
                } else {
                    swal({
                        title: "Error",
                        text: response,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: false
                    });

                    $location.path('/dashboard/courses');
                }

            })
            .catch(function (err) {
                console.log("response courseview error ", err);
                //error(err);  
            });
    }
});