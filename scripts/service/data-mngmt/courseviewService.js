raoweb.factory('courseviewService', function ($http, $rootScope, $location, courselistService, loginService) {
    return{
        teachercourseview: function (course) {
            $rootScope.students_empty = false;
            $rootScope.loading = true;
            
            /*$http({
             url: "http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/students?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
             method: "GET"
             }).success(function (response) {
             //console.log(response.students);
             return response;
             //returnData(response, course);
             }).catch(function (msg) {
             error("0", msg);
             });*/

            var promise = $http.get("http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/students?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'))
            .then(function (response) { 
                // The then function here is an opportunity to modify the response
                // console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            }, function (error) {
                return error;
            });
            // Return the promise to the controller
            return promise;
        },
        
        getattendance: function (course) {
            $rootScope.students_names = new Array();
            $rootScope.came = new Array();
            $rootScope.didnotcome = new Array();

            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/course/" + course + "/attendance?username=" + sessionStorage.getItem('user') + "&token=" + sessionStorage.getItem('token'),
                method: "GET"
            }).success(function (response) {
                // console.log("graph response", response);
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
                            text: ''
                        },
                        xAxis: {
                            categories: $rootScope.students_names
                        },
                        yAxis: {
                            max: 100,
                            title: {
                                text: 'Asistencias (%)'
                            }
                        },
                        legend: {
                            itemMarginBottom: 15,
                            itemDistance: 10
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
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
                                name: 'Asistencias',
                                data: $rootScope.came
                            }, {
                                name: 'Faltas',
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
                method: "GET"
            }).success(function (response) {
                //console.log(response.attendance.value);
                $rootScope.att = response.attendance;

                //Attendance values
                $rootScope.comenum = $rootScope.att.value[0].value;
                $rootScope.notcomenum = $rootScope.att.value[1].value;

                //Attendance percentages
                $rootScope.come = $rootScope.att.percent[0].value;
                $rootScope.notcome = $rootScope.att.percent[1].value;

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
                        text: 'Asistencias'
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
                                    y: $rootScope.come
                                }, {
                                    name: 'Not came',
                                    y: $rootScope.notcome
                                }]
                        }]
                });
            });
        }
    };
});