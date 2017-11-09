/*global angular*/

angular.module('virtwhoconfigApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
    });
});
