/*global angular*/

angular.module('virtwhoconfigApp').controller('generalInfoCtrl', function ($scope, $state, AnswersService, NavigationService, UtilityService) {
    'use strict';
    UtilityService.scrollToElementById(UtilityService.APP_BLOCK_ID);
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    $scope.goNext = function () {
        if ($scope.virtWhoForm.$error.required) {
            $scope.virtWhoForm.$error.required.forEach(function (field) {
                field.$setDirty();
            });
            UtilityService.scrollToElementByName($scope.virtWhoForm.$error.required[0].$name);
            return false;
        }
        if (!$scope.virtWhoForm.$invalid) {
            $state.go(UtilityService.HYPERVISOR_STATE_NAME).then(function () {
                NavigationService.updateMaxStep(2);
            });
        }
    };
});
