'use strict';
var raoweb = angular.module('raoweb', ['ui.router', 'ncy-angular-breadcrumb']); //define app name

raoweb.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
            template: 'materialize' //Customized in var $$templates declared in angular-breadcrumbs.js
        });
    })
    
    .config(function ($stateProvider, $urlRouterProvider) {
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
                controller: 'DashboardCtrl',
                abstract: true
//                 ncyBreadcrumb: {
//                  skip: true // Never display this state in breadcrumb.
//              }
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
                },
                ncyBreadcrumb: {
                    label: 'Cursos'
                }
            })
            //Home: teacher course view and student list
            .state('courseview', {
                url: '/courseview/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/courseview.html',
                controller: 'CourseViewCtrl',
                ncyBreadcrumb: {
                    label: 'Estudiantes',
                    parent: 'courses' 
                }
            })
            .state('studentcourseview', {
                url: '/student/:student/course/:course/statistics',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/student/courseview.html',
                controller: 'StudentCourseViewCtrl',
                ncyBreadcrumb: {
                    label: 'Estadísticas de estudiante',
                    parent: 'courses' 
                }
            })
            .state('studentlist', {
                url: '/course/:course',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/studentlist.html',
                controller: 'StudentListCtrl',
                ncyBreadcrumb: {
                    label: 'Tomar asistencia',
                    parent: 'courseview' 
                }
            })
            .state('coursestatistics', {
                url: '/course/:course/statistics',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/coursestatistics.html',
                controller: 'StatisticsCtrl',
                ncyBreadcrumb: {
                    label: 'Estadísticas de curso',
                    parent: 'courseview' 
                }
            });

});