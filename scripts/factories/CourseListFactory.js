raoweb.factory('CourseListFactory', function ($http, LocalStorageFactory) {
    return{
        teachercourses: function (user) {
            var promise = $http.get('http://raoapi.utbvirtual.edu.co:8082/teacher/' + LocalStorageFactory.get('user') + "/courses?username=" + LocalStorageFactory.get('user') + "&token=" + LocalStorageFactory.get('token'));
                /*.success(function(response) {
                    //console.log(response);
                    user = user.username;
                })
                .error(function(err) {
                    user = "null";
                    //console.log("error service");
                    //console.log(err);
                });*/
            return promise;
        },
        
        
        studentcourses: function () {
            var promise = $http.get('http://raoapi.utbvirtual.edu.co:8082/student/' + LocalStorageFactory.get('user') + "/courses?username=" + LocalStorageFactory.get('user') + "&token=" + LocalStorageFactory.get('token'));
                /*.success(function(response) {
                    //console.log(response);
                    user = user.username;
                })
                .error(function(err) {
                    user = "null";
                    //console.log("error service");
                    //console.log(err);
                });*/
            return promise;
        }
    };
});





