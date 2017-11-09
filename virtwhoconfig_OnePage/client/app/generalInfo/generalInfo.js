/*global angular*/

angular.module('virtwhoconfigApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('main.generalInfo', {
        url: '',
        templateUrl: 'app/generalInfo/generalInfo.html',
        controller: 'generalInfoCtrl'
    });
});
