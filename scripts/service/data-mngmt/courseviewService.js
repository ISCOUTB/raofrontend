raoweb.factory('courseviewService', function ($http, $rootScope, $location, courselistService) {
    return{
        teachercourseview: function (course) {
            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/students?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET",
            }).success(function (response) {
                //console.log(response);
                var msg = "El curso con NRC " + course + " no existe";
                var msg2 = "No hay estudiantes matriculados en el curso con el NRC " + course;
        
                var type = sessionStorage.getItem('type');
                
                if (response == msg) {
                    if (type == 'teacher') {
                        Materialize.toast(msg, 5000, 'rounded');
                        $location.path("/dashboard/teacher/home");
                    } else if (type == 'student') {
                        Materialize.toast(msg, 5000, 'rounded');
                        $location.path("/dashboard/student/home");
                    } else {
                        var msgtxt = "401 - Acceso no autorizado";
                        Materialize.toast(msgtxt, 6000, 'rounded');
                        loginService.logout();
                    }

                } else if (response == msg2) {
                    //console.log("No hay estudiantes matriculados en el curso con el NRC");
                    if (type == 'teacher') {
                        Materialize.toast(msg2, 5000, 'rounded');
                        $location.path("/dashboard/student/home");
                    } else if (type == 'student') {
                        Materialize.toast(msg2, 5000, 'rounded');
                        $location.path("/dashboard/student/home");
                    } else {
                        var msgtxt = "401 - Acceso no autorizado";
                        Materialize.toast(msgtxt, 6000, 'rounded');
                        loginService.logout();
                    }
                } else {
                    $rootScope.json = response;
                    $rootScope.nrc = $rootScope.json.nrc;
                    $rootScope.subject = $rootScope.json.subject;
                    $rootScope.students = $rootScope.json.students;
                    $rootScope.names = $rootScope.json.students.names;
                    $rootScope.lastnames = $rootScope.json.students.lastnames;
                    $rootScope.estudentID = $rootScope.json.students.id;
                }
            }).catch(function (msg) {
                var msgtxt = msg.status + " - " + msg.data;
                Materialize.toast(msgtxt, 6000, 'rounded');
                if (msg.status === 401) {
                    loginService.logout();
                }
            });
        },
        studentcourseview: function (course) {
            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/students?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET",
            }).success(function (response) {
                $rootScope.courses = response;
                $rootScope.nrc = $rootScope.courses.nrc;
                $rootScope.subject = $rootScope.courses.subject;
                $rootScope.students = $rootScope.courses.students;
            }).catch(function (msg) {
                var msgtxt = 'Las credenciales no concuerdan. Ingrese nuevamente.';
                Materialize.toast(msgtxt, 5000, 'rounded');
                $location.path("/login");
            });
        },
        getattendance: function (course) {
            $rootScope.students_names = new Array();
            $rootScope.came = new Array();
            $rootScope.didnotcome = new Array();


            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/attendance?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET",
            }).success(function (response) {
                console.log("graph response",response);
                response = response["students"];
                for (i = 0; i < response.length; i++) {
                    $rootScope.students_names.push(response[i]["student_name"] + " " + response[i]["student_lastname"]);
                }
                for (i = 0; i < 5; i++) {
                    for (j = 0; j < response.length; j++) {
                        switch (i) {
                            case 0:
                                $rootScope.came.push(response[j]["attendance_percent"][0].value);
                                break;
                            case 1:
                                $rootScope.didnotcome.push(response[j]["attendance_percent"][1].value);
                                break;
                        }
                    }
                }
                $('#modalStatistics').openModal();
                $(function () {
                    $('#container').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: '',
                            style: {
                                color: 'black',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }
                        },
                        xAxis: {
                            categories: $rootScope.students_names,
                            labels: {
                                style: {
                                    color: 'black',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        yAxis: {
                            max: 100,
                            title: {
                                text: 'Attendances (%)',
                                style: {
                                    color: 'black',
                                    fontWeight: 'bold'
                                }
                            },
                            labels: {
                                style: {
                                    color: 'black',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        legend: {
                            itemMarginBottom: 15,
                            itemDistance: 10
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    style: {
                                        color: 'black',
                                        fontSize: '10px'
                                    },
                                    enabled: true,
                                    formatter: function () {
                                        if (this.y !== 0) {
                                            return this.y;
                                        } else {
                                            return null;
                                        }
                                    }

                                }
                            },
                            series: {
                                events: {
                                    legendItemClick: function () {
                                        return false;
                                    }
                                },
                                stacking: 'normal'
                            }
                        },
                        credits: {
                            enabled: false
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
                            formatter: function () {
                                return '<strong>' + this.series.name + '</strong>' + '  ' + this.y + ' %';
                            }
                        },
                        series: [{
                                name: 'Came',
                                data: $rootScope.came
                            }, {
                                name: 'Did not come',
                                data: $rootScope.didnotcome
                            }]
                    });
                });
            });
        },
        studentstatistics: function (student, course) {
            $rootScope.array = new Array();
            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/student/" + student + "/course/" + course + "/attendance?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET",
            }).success(function (response) {
                $rootScope.att = response.attendance;
                $rootScope.come = $rootScope.att.percent[0].value;
                $rootScope.notcome = $rootScope.att.percent[1].value;
                $rootScope.comenum = $rootScope.att.value[0].value;
                $rootScope.notcomenum = $rootScope.att.value[1].value;
                for (i = 0; i < $rootScope.att.length; i++) {
                    $rootScope.array.push([$rootScope.att.key, $rootScope.att.value]);
                }

                // draw chart 
                $('#containerprofile').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Attendances of ' + student
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
                        formatter: function () {
                            return '<strong>' + this.point.name + '</strong>' + '  ' + this.y + ' %';
                        }
                    },
                    plotOptions: {
                        pie: {
                            showInLegend: true,
                            dataLabels: {
                                style: {
                                    color: 'black',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                },
                                enabled: true,
                                formatter: function () {
                                    if (this.y !== 0) {
                                        return this.y + '%';
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
                            name: 'Attendance',
                            data: [{
                                    name: 'Came',
                                    y: $rootScope.come,
                                }, {
                                    name: 'Not came',
                                    y: $rootScope.notcome,
                                }]
                        }]
                });
            })
        }
    }
});