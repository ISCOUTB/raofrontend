'use strict';	
raoweb.controller('CourseCtrl' ,function($scope, $location, $http, CourseListFactory, AuthFactory) {
    /******* Tabs *******/
    $scope.tabs = [{
        title: 'Profesor',
        url: 'profesor.tpl.html'
    }, {
        title: 'Estudiante',
        url: 'estudiante.tpl.html'
    }];

    $scope.currentTab = 'profesor.tpl.html';

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    };
    /******* Tabs *******/
    
    if(localStorage.length === 0){
        $location.path('/login');
    }
    else{
        $scope.courses_empty_teacher = false;
        $scope.courses_empty_student = false;
        $scope.loading_teacher = true;
        $scope.loading_student = true;
        
        CourseListFactory.teachercourses()
            .then(function(response) {
                response = response.data;
                console.log("response teacher courses", response);
        
                $scope.loading_teacher = false;
                
                var msg = "El usuario no tiene ningún curso."; 
                var msg2 = "El usuario no existe o no es un docente.";
                
                if (response !== msg && response !== msg2){
                    $scope.courses_teacher = response.courses;
                }
                if(response.courses === msg || response === msg2){
                    $scope.courses_empty_teacher = true;
                }
            })
            .catch(function(err) {
                console.log("response teacher error", err);
                error(err);  
            });  
            
        CourseListFactory.studentcourses()
            .then(function(response) {
                response = response.data;
                console.log("response student courses", response);
                
                $scope.loading_student = false;
                
                var msg = "El usuario no tiene ningún curso."; 
                var msg2 = "El estudiante no existe o no está matriculado como estudiante en ningún curso.";
                
                if (response !== msg && response !== msg2){
                    $scope.courses_student = response.courses;
                }
                if(response.courses === msg || response === msg2){
                    $scope.courses_empty_student = true;
                }
            })
            .catch(function(err) {
                console.log("response student error", err);
                error(err);  
            });  
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
            AuthFactory.destroyLocalStorage();
        }
    }
});