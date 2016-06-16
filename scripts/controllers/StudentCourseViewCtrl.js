'use strict';
raoweb.controller('StudentCourseViewCtrl', function ($http, $scope, $location, $stateParams, CourseViewFactory) {
    var course = $stateParams.course;
    var student = $stateParams.student;

    if (localStorage.length === 0) {
        $location.path('/login');
    } else {
        $scope.loading = true;

        CourseViewFactory.studentStatistics(student, course)
                .then(function (response) {
                    response = response.data;

                    $scope.loading = false;

                    //console.log("response studentStatistics", response);

                    var msg = "No existe un curso con el NRC " + course;
                    var msg2 = "No tienes acceso a esta información.";
                    var msg3 = "No estas matriculado en este curso";
                    var msg4 = "No existe un estudiante con el código " + student;

                    if (response !== msg && response !== msg2 && response !== msg3 && response !== msg4) {
                        $scope.subject = response.subject;
                        $scope.nrc = response.nrc;

                        var attendance_array = new Array();

//                  console.log(response.attendance);

                        //Attendance percentages
                        var attendance = response.attendance;

                        //Attendance values
                        $scope.come = attendance.value[0].value;
                        $scope.notcome = attendance.value[1].value;

                        for (var i = 0; i < attendance.percent.length; i++) {
                            attendance_array.push([attendance.percent[i].key, attendance.percent[i].value]);
                        }

                        // draw chart
                        /*$('#statistics_graph').highcharts({
                         chart: {
                         plotBackgroundColor: null,
                         plotBorderWidth: null,
                         plotShadow: false
                         },
                         title: {
                         text: 'Estadísticas de asistencia'
                         },
                         tooltip: { 
                         backgroundColor: {
                         linearGradient: [0, 0, 0, 60],
                         stops: [
                         [0, '#FFFFFF'],
                         [1, '#E0E0E0']
                         ]
                         },
                         borderWidth: 1,
                         borderColor: '#AAA',
                         formatter: function() {
                         return '<strong>'+this.point.name + '</strong>' + '  ' + this.y + ' %';
                         }
                         },
                         plotOptions: {
                         pie:{                        
                         showInLegend: true,
                         dataLabels: {
                         style: {
                         color: 'black',
                         fontSize:'12px',
                         fontWeight: 'bold'
                         },     
                         enabled: true,
                         formatter: function() {
                         if (this.y !== 0) {
                         return this.y+'%';
                         } else {
                         return null;
                         }
                         }
                         }
                         },
                         series: {
                         point: {
                         events: {
                         legendItemClick: function () {
                         return false; // <== returning false will cancel the default action
                         }
                         }
                         }
                         }
                         },
                         credits: {
                         enabled: false
                         },    
                         legend: {
                         itemMarginBottom: 15,
                         itemDistance: 10
                         },
                         series: [{
                         type: 'pie',
                         name: 'Asistencia',
                         data: attendance_array
                         }]
                         });*/
                        //Set graph attributes
                        $("#statistics_graph").attr("data-text", attendance.percent[0].value +"%").attr("data-percent", attendance.percent[0].value); 
                        $('#statistics_graph').circliful();


//                    console.log(attendance_array);

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