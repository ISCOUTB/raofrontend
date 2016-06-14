'use strict';
var raoweb = angular.module('raoweb', ['ui.router']); //define app name

raoweb.config(function ($stateProvider, $urlRouterProvider) {
    // if the path doesn't match any of the urls you configured
    // otherwise will take care of routing the user to the specified url
    $urlRouterProvider.otherwise('/login');

    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthCtrl',
                resolve: {
                    auth: function (AuthFactory) {
                        return AuthFactory.IfAuthenticated("/login");
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: function (AuthFactory) {
                    return AuthFactory.logout();
                }
            })
            //Base html
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            //Home: courses list
            .state('courses', {
                url: '/courses',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/courses.html',
                controller: 'CourseCtrl',
                resolve: {
                    auth: function (AuthFactory) {
                        return AuthFactory.IfAuthenticated("/dashboard");
                    }
                }
            })
            //Home: teacher course view and student list
            .state('courseview', {
                url: '/courseview/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/courseview.html',
                controller: 'CourseViewCtrl'
            })
            .state('studentcourseview', {
                url: '/student/:student/course/:course/statistics',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/student/courseview.html',
                controller: 'StudentCourseViewCtrl'
            })
            .state('studentlist', {
                url: '/course/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/studentlist.html',
                controller: 'StudentListCtrl'
            })
            .state('coursestatistics', {
                url: '/course/:course/statistics',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/coursestatistics.html',
                controller: 'StatisticsCtrl'
            });

});//.run(['$rootScope', function ($rootScope) {
//        $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
//            $rootScope.previousState = from;
//            //console.log($rootScope.previousState);
//        });
//    }])

