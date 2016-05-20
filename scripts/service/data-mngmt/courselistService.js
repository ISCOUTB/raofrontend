raoweb.factory('courselistService',function($http,$rootScope,$location,loginService,sessionService){
    return{
        teachercourses:function(){
            var msgtxt = "";
            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/teacher/"+sessionStorage.getItem('user')+"/courses?username="+ sessionStorage.getItem('user') +"&token="+sessionStorage.getItem('token'),
                method: "GET",
            }).success(function (response){
                    $rootScope.json = response;
                    $rootScope.courses = response.courses;
                    $rootScope.id = $rootScope.json.id;
                    $rootScope.names = $rootScope.json.names;
                    $rootScope.lastnames = $rootScope.json.lastnames;
                    $rootScope.resources_uri = $rootScope.json.resources_uri;
                    if ($rootScope.courses == null){
                        $rootScope.show = {'visibility': 'hidden'};
                        $rootScope.hide = {'visibility': 'visible'};
                    }
            }).catch(function(msg){
                var msgtxt = 'Las credenciales no concuerdan. Ingrese nuevamente.';
                Materialize.toast(msgtxt, 5000, 'rounded');              
                loginService.logout();
                $location.path("/login"); 
            });
       },
        studentcourses:function(){
            $http({
                url: "http://raoapi.utbvirtual.edu.co:8082/student/"+sessionStorage.getItem('user')+"/courses?username="+ sessionStorage.getItem('user') +"&token="+sessionStorage.getItem('token'),
                method: "GET"
            }).success(function (response){
                    $rootScope.json = response;
                    $rootScope.courses = response.courses;
                    $rootScope.id = $rootScope.json.id;
                    $rootScope.names = $rootScope.json.names;
                    $rootScope.lastnames = $rootScope.json.lastnames;
                    $rootScope.resources_uri = $rootScope.json.resources_uri;
                    if ($rootScope.courses == null){
                        console.log("adasd")
                        $rootScope.show = {'visibility': 'hidden'};
                        $rootScope.hide = {'visibility': 'visible'};
                    }
            }).catch(function(msg){
                var msgtxt = 'Las credenciales no concuerdan. Ingrese nuevamente.';
                Materialize.toast(msgtxt, 5000, 'rounded');
                loginService.logout();
                $location.path("/login"); 
            });
        }
    }
});



