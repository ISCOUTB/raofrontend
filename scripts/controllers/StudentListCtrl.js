'use strict';
raoweb.controller('StudentListCtrl', function ($location, $stateParams, CourseViewFactory, $scope) {
    var course = $stateParams.course;
    var students_length, attendance;

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

                            students_length = $scope.students.length;
                            attendance = new Array(students_length);

                            for (var i = 0; i < students_length; i++) {
                                attendance[i] = {};
                                attendance[i].id = $scope.students[i].id;
                                attendance[i].attendance = 0;
                            }

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

        $scope.toggleSelection = function toggleSelection(ind) {
            if (attendance[ind].attendance === 0) {
                attendance[ind].attendance = 1;
            } else {
                attendance[ind].attendance = 0;
            }

        };

        $scope.studentPost = function studentPost() {
            console.log("attendance", attendance);

            var data = JSON.stringify({nrc: course, estudiantes: attendance});

            CourseViewFactory.studentPost(data)
                    .then(function (response) {
                        swal({   
                            title: "Asistencia realizada",   
                            imageUrl: "img/thumbs-up.jpg" 
                        });

                        $location.path('dashboard/courseview/'+course);
                    })
                    .catch(function (err) {
                        console.log("response studentPost error ", err);
                        //error(err); 
                        swal({
                            title: "Error",
                            text: "No se pudieron guardar las asistencias",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: false
                        });

                    });
        };
    }
});