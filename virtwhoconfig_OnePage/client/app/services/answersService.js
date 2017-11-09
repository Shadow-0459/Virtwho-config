/*global angular, document*/

angular.module('virtwhoconfigApp').factory('AnswersService', function (UtilityService) {
    'use strict';

    var answers = {
        rhelVersion: UtilityService.RHEL7,
        interval: 3600,
        isIntervalDisabled: 'disabled',
        isEnableDebugging: false,
        hasProxy: false,
        httpProxy: '',
        hypervisors: [
            angular.copy(UtilityService.defaultHypervisor)
        ]
    };
    answers.init = function () {
        answers.rhelVersion = UtilityService.RHEL7;
        answers.interval = 3600;
        answers.isEnableDebugging = false;
        answers.hasProxy = false;
        answers.httpProxy = '';
        answers.hypervisors = [
            angular.copy(UtilityService.defaultHypervisor)
        ];
    };
    return answers;
});
