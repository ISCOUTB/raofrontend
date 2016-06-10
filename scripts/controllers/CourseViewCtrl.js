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

//                            $scope.modalStatistics = function () { 
//                                
//                                CourseViewFactory.getAttendance(course)
//                                    .then(function (response2) {
//                                        console.log("response getAttendance", response2);
//                                
//                                        $('#modalStatistics').openModal();
//                                
//                                        response2 = response2.data;
//                                        $scope.students_attendance = response2.students;
//                                       
//                                        console.log("$scope.students_attendance",$scope.students_attendance);
//                                        getAttendanceGraph(response.data.students);
//                                    })
//                                    .catch(function (err) {
//                                        console.log("response getAttendance error ", err);
//                                        //error(err);  
//                                    });
//                            };
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

//    function getAttendanceGraph(students) {
//        //alert(students[0].student_id);
//
//        var students_names = new Array();
//        var came = new Array();
//        var didnotcome = new Array();
//
//        for (var i = 0; i < students.length; i++) {
//            students_names.push(students[i].student_name + " " + students[i].student_lastname);
//        }
//
//        for (var j = 0; j < students.length; j++) {
//            came.push(students[j].attendance_percent[0].value);
//            didnotcome.push(students[j].attendance_percent[1].value);
//        }
//
//        console.log("came.length", came.length);
//        console.log("students_names.length", students_names.length);
//
//        $('#modalStatistics').openModal();
//
//        $(function () {
//            $('#container').highcharts({
//                chart: {
//                    type: 'bar'
//                },
//                title: {
//                    text: ''
//                },
//                xAxis: {
//                    categories: students_names
//                },
//                yAxis: {
//                    max: 100,
//                    title: {
//                        text: 'Asistencias (%)'
//                    }
//                },
//                legend: {
//                    itemMarginBottom: 15,
//                    itemDistance: 10
//                },
//                plotOptions: {
//                    bar: {
//                        dataLabels: {
//                            enabled: true,
//                            formatter: function () {
//                                if (this.y !== 0) {
//                                    return this.y;
//                                } else {
//                                    return null;
//                                }
//                            }
//
//                        }
//                    },
//                    series: {
//                        events: {
//                            legendItemClick: function () {
//                                return false;
//                            }
//                        },
//                        stacking: 'normal'
//                    }
//                },
//                credits: {
//                    enabled: false
//                },
//                tooltip: {
//                    backgroundColor: {
//                        linearGradient: [0, 0, 0, 60],
//                        stops: [
//                            [0, '#FFFFFF'],
//                            [1, '#E0E0E0']
//                        ]
//                    },
//                    borderWidth: 1,
//                    borderColor: '#AAA',
//                    formatter: function () {
//                        return '<strong>' + this.series.name + '</strong>' + '  ' + this.y + ' %';
//                    }
//                },
//                series: [{
//                        name: 'Asistencias',
//                        data: came
//                    }, {
//                        name: 'Faltas',
//                        data: didnotcome
//                    }]
//            });
//        });
//    }
});