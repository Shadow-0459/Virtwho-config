/*global angular*/

angular.module('virtwhoconfigApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('main.hypervisorBackend', {
        templateUrl: 'app/hypervisorBackend/hypervisorBackend.html',
        controller: 'hypervisorBackendCtrl'
    });
});
