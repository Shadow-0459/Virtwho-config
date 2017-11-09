/*global angular*/

angular.module('virtwhoconfigApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('downloadConfigFile', {
        templateUrl: 'app/downloadConfigFile/downloadConfigFile.html',
        controller: 'downloadConfigFileCtrl'
    });
});
