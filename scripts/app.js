'use strict';
var raoweb = angular.module('raoweb', ['ui.router']); //define app name

raoweb.config(function ($stateProvider, $urlRouterProvider) {
    // Send to login if the URL was not found
    $urlRouterProvider.otherwise('/login');

    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthCtrl',
                resolve: {
                    auth: function(AuthFactory) {
                        return AuthFactory.IfAuthenticated();
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: function(AuthFactory) {
                    return AuthFactory.logout();
                }
            })
            //Base html
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl',
                resolve: {
                    auth: function(AuthFactory) {
                        return AuthFactory.IfAuthenticated();
                    }
                }
            })
            //Home: courses list
            .state('courses', {
                url: '/courses',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/courses.html',
                controller: 'CourseCtrl'
            })
            
            //Home: teacher course view and student list
            .state('courseview', {
                url: '/teacher/courseview/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/courseview.html',
                controller: 'courseViewCtrl'
            })
            .state('studentlist', {
                url: '/teacher/studentlist/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/studentlist.html',
                controller: 'studentsByCourseCtrl'
            })
            //Home: student course view
            .state('studentcourseview', {
                url: '/student/courseview/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/student/courseview.html',
                controller: 'courseViewCtrl'
            })

            .state('studentprofile', {
                url: '/teacher/studentprofile/:user/course/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/student/profile.html',
                controller: 'studentProfile'
            })

            .state('studentstudentview', {
                url: '/student/studentview',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/student/studentview.html',
                controller: 'studentViewCtrl'
            });
});
