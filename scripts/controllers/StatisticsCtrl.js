'use strict';
raoweb.controller('StatisticsCtrl', function ($location, $stateParams, CourseViewFactory, $scope) {
    var course = $stateParams.course;
    var students_length, students_name, students_came_attendance_percent;

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

                        students_length = response.students.length;
                        
                        students_name = new Array(students_length);
                        students_came_attendance_percent = new Array(students_length);

                        for (var i = 0; i < students_length; i++) {
                            students_name[i] = response.students[i].student_name + " " + response.students[i].student_lastname;
                            students_came_attendance_percent[i] = response.students[i].attendance_percent[0].value;
                        }
                        
                        console.log("students_name", students_name);
                        console.log("students_came_attendance_percent", students_came_attendance_percent);
                        
                        var axisY = students_name; //[ "Apple", "Orange", "Banana", "Tomato", "Milk", "Potato"];
                        var axisX = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
                        var barsValue = students_came_attendance_percent; //[50, 61, 93, 76, 5, 13];
                        
                        // Data to chart
                        var data = {
                            "axisY": axisY,         // Data for axis Y labels
                            "axisX": axisX,         // Data for axis X labels
                            "bars": barsValue       // Data for bars value
                        };

                        var options = {
                            data: data,
                            showValues: true,
                            showHorizontalLines: true,
                            animation: true,
                            animationOffset: 0,
                            animationRepeat: true,
                            showArrows: false,
                            labelsAboveBars: false
                        };
                        
                        var $myChart = $('#attendance_graph').rumcaJS(options);      // Initialization horizontal chart.

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

