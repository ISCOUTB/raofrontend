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
                controller: 'DashboardCtrl',
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
