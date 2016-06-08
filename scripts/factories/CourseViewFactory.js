raoweb.factory('CourseViewFactory', function ($http, LocalStorageFactory) {
    return{
        courseview: function (course) {
            var promise = $http.get("http://raoapi.utbvirtual.edu.co:8082/course/" + course + "?username=" + LocalStorageFactory.get('user') + "&token=" + LocalStorageFactory.get('token'));
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
        
        studentStatistics: function (student, course) {
            var promise = $http.get("http://raoapi.utbvirtual.edu.co:8082/student/" + student + "/course/" + course + "/attendance?username=" + LocalStorageFactory.get('user') + "&token=" + LocalStorageFactory.get('token'));
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

