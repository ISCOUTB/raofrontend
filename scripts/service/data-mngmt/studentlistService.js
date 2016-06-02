'use strict';
raoweb.factory('studentlistService',function($http, $rootScope, $location, sessionService, loginService){
    return{
        attendancelist:function(course){
            $http({
            url: "http://raoapi.utbvirtual.edu.co:8082/course/"+ course +"/students?username="+ sessionStorage.getItem('user')+"&token="+sessionStorage.getItem('token'), 
            method: "GET"
            }).success(function (response){
                //console.log(response.students);
                //console.log(response);
                returnData(response, course);
            }).catch(function (msg) {
                error("0", msg);
            });
        },
        attendancechange:function(){
            $rootScope.toggleSelection = function toggleSelection(id,stat,ind) {            
                if ($rootScope.attendance[ind]){
                    if ($rootScope.attendance[ind].attendance === 0){
                        $rootScope.attendance[ind].attendance = 1;
                    }
                    else{
                        $rootScope.attendance[ind].attendance = 0;
                    }
                } 
                else{
                    $rootScope.selection.push($rootScope.attendance[ind]);
                }
            };
        },
        attendancepost:function(){
            $rootScope.studentPost = function studentPost(){
                var sendPost = JSON.stringify({nrc:$rootScope.nrc , estudiantes:$rootScope.attendance});
                var request = $http({
                    method: "post",
                    url: 'http://raoapi.utbvirtual.edu.co:8082/attendance?username='+ sessionStorage.getItem('user')+'&token='+sessionStorage.getItem('token'),
                    data: sendPost
                }).success(function(response){
                    var msgtxt='Asistencia realizada';
                    Materialize.toast(msgtxt, 5000,'rounded');
                    $location.path("dashboard/teacher/home");  
                }).catch(function(msg){
                    var msgtxt='Asistencia no realizada';
                    Materialize.toast(msgtxt, 5000,'rounded');
                    $location.path("dashboard/teacher/home");  
                });
            };
        }
    };
    
    function returnData(response, course) {
        $rootScope.loading = false;

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
            $rootScope.json = response;
            $rootScope.nrc = $rootScope.json.nrc;
            $rootScope.subject = $rootScope.json.subject;
            $rootScope.students = $rootScope.json.students;
            $rootScope.names = $rootScope.json.students.names;
            $rootScope.lastnames = $rootScope.json.students.lastnames;
            $rootScope.id = $rootScope.json.students.id;
            var size = $rootScope.json.students.length;
            $rootScope.attendance = [];
            $rootScope.selection=[];
            for (var i =0; i<size; i++){
                $rootScope.attendance.push({id:$rootScope.students[i].id, attendance: 0});
            }
        } else {
            if (response.students === msg2) {
                $rootScope.json = response;
                $rootScope.nrc = $rootScope.json.nrc;
                $rootScope.subject = $rootScope.json.subject;
                
                 $rootScope.students_empty = true; //Mostrar mensaje de que no existen estudiantes matriculados en el curso
            }else{
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
    }
    
    function error(num, msg) {
        var message;
        if(num === "0"){
            message = msg.status + " - " + msg.data;            
        }else{
            message = msg;
        }
        
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