'use strict';
raoweb.controller('StatisticsCtrl', function ($location, $stateParams, CourseViewFactory, $scope) {
    var course = $stateParams.course;

    if (localStorage.length === 0) {
        $location.path('/login');
    } else {
        $scope.loading = true;

        CourseViewFactory.getAttendance(course)
                .then(function (response) {
                    response = response.data;
                    console.log("response getAttendance", response);

                    var msg = "No existe un curso con el NRC " + course;

                    $scope.loading = false;
                    $scope.subject = response.subject;
                    $scope.nrc = response.nrc;

                    if (response !== msg) {
                        $scope.students = response.students;
                        $scope.total = $scope.students[0].attendance_value[0].value + $scope.students[0].attendance_value[1].value;
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
                    console.log("response getAttendance error ", err);
                    //error(err);  
                });
    }
});

