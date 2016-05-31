'use strict';
var raoweb = angular.module('raoweb', ['ui.router', 'ngAnimate']);
raoweb.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .state('logout', {
            url: '/logout',
            parent: 'dashboard',
            templateUrl: 'views/login.html',
            controller: 'logoutctrl'
        })
        //Base html
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        })
        //Home: courses list
        .state('home', {
            url: '/teacher/home',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/home.html',
            controller: 'courseCtrl'
        })
        .state('studenthome', {
            url: '/student/home',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/student/home.html',
            controller: 'courseCtrl'
        })
        //Home: students list by course
        .state('courseview', {
            url: '/teacher/courseview/:course',
            parent:'dashboard',
            templateUrl: 'views/dashboard/courseview.html',
            controller: 'courseViewCtrl'
        })
        .state('studentlist', {
            url: '/teacher/studentlist/:course',
            parent:'dashboard',
            templateUrl: 'views/dashboard/studentlist.html',
            controller: 'studentsByCourseCtrl'
        })
        .state('studentprofile', {
            url: '/teacher/studentprofile/:user/course/:course',
            parent:'dashboard',
            templateUrl: 'views/dashboard/student/profile.html',
            controller: 'studentProfile'
        })
        .state('studentcourseview', {
            url: '/student/courseview/:course',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/student/courseview.html',
            controller: 'courseViewCtrl'
        })
        .state('studentstudentview', {
            url: '/student/studentview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/student/studentview.html',
            controller: 'studentViewCtrl'
        });
});