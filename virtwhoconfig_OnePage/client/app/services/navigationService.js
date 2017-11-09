/*global angular, document*/

angular.module('virtwhoconfigApp').factory('NavigationService', function (UtilityService) {
    'use strict';

    var navigation = {
        maxStep: 1,
        menuItems: [
            {
                title: 'NAVIGATION_GENERAL_INFO',
                link: UtilityService.GENERAL_INFO_STATE_NAME,
                step: 1
            },
            {
                title: 'NAVIGATION_HYPERVISOR_BACKEND',
                link: UtilityService.HYPERVISOR_STATE_NAME,
                step: 2
            }
        ]
    };
    return {
        navigation: navigation,
        updateMaxStep: function (targetStep) {
            if (targetStep > navigation.maxStep) {
                navigation.maxStep = targetStep;
            }
        }
    };
});
