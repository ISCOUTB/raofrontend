'use strict';	
raoweb.controller('CourseViewCtrl' ,function($http, $scope, $location, $stateParams, LocalStorageFactory, CourseViewFactory, courseviewService, $state) {
    var course = $stateParams.course;
    var user = LocalStorageFactory.get('user');

    if(localStorage.length === 0){
        $location.path('/login');
    }
    else{
        CourseViewFactory.courseview(course)
            .then(function(response) {
                response = response.data;
                var role = response.role; //Requesting user role in the course
                console.log("response courseview", response);
                
                var msg = "No estás matriculado en este curso.";
                var msg2 = "No existe ningún curso con el NRC " + course + ".";
                var msg3 = "No hay estudiantes matriculados en el curso con el NRC " + course;
                
                
                if (response !== msg && response !== msg2 && response.students !== msg3){
                    $scope.subject = response.subject_name;
                    $scope.nrc = response.nrc;
                    
                    
                }else{
                    
                }
                
        
            })
            .catch(function(err) {
                console.log("response courseview error ", err);
                //error(err);  
            });  
            
             
//        $scope.courses_empty_teacher = false;
//        $scope.courses_empty_student = false;
//        $scope.loading_teacher = true;
//        $scope.loading_student = true;
//        
//        CourseListFactory.teachercourses()
//            .then(function(response) {
//                response = response.data;
//                console.log("response teacher courses", response);
//        
//                $scope.loading_teacher = false;
//                
//                var msg = "El usuario no tiene ningún curso."; 
//                var msg2 = "El usuario no existe o no es un docente.";
//                
//                if (response !== msg && response !== msg2){
//                    $scope.courses_teacher = response.courses;
//                }
//                if(response.courses === msg || response === msg2){
//                    $scope.courses_empty_teacher = true;
//                }
//            })
//            .catch(function(err) {
//                console.log("response teacher error", err);
//                error(err);  
//            });  
//            
//        CourseListFactory.studentcourses()
//            .then(function(response) {
//                response = response.data;
//                console.log("response student courses", response);
//                
//                $scope.loading_student = false;
//                
//                var msg = "El usuario no tiene ningún curso."; 
//                var msg2 = "El estudiante no existe o no está matriculado como estudiante en ningún curso.";
//                
//                if (response !== msg && response !== msg2){
//                    $scope.courses_student = response.courses;
//                }
//                if(response.courses === msg || response === msg2){
//                    $scope.courses_empty_student = true;
//                }
//            })
//            .catch(function(err) {
//                console.log("response student error", err);
//                error(err);  
//            });  
    }
    
    function error(msg) {
        var message = msg.status + " - " + msg.data;     
        swal({   
            title: "Error",   
            text: message,   
            type: "error",     
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Aceptar",   
            closeOnConfirm: false 
        });

        if(msg.status === 401){
            //AuthFactory.deleteLocalStorage();
        }
    }
});