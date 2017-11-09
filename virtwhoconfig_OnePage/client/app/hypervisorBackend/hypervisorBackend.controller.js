/*global angular, window*/

angular.module('virtwhoconfigApp').controller('hypervisorBackendCtrl', function ($timeout, $scope, $state, AnswersService, NavigationService, UtilityService) {
    'use strict';
    function scrollToErrorElementByName(elementName) {
        $scope.tab.activeTabIndex = parseInt(elementName.split('_')[1], 10);
        $timeout(function () {
            UtilityService.scrollToElementByName(elementName);
        }, 100);
    }
    UtilityService.scrollToElementById(UtilityService.APP_BLOCK_ID);
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    $scope.addHypervisor = function () {
        var hypervisor = angular.copy($scope.answer.hypervisors[$scope.answer.hypervisors.length - 1]);
        hypervisor.hypervisorConfigName = 'hypervisor' + ($scope.answer.hypervisors.length + 1);
        hypervisor.hypervisorAddress = '';
        hypervisor.hypervisorUsername = '';
        hypervisor.hypervisorEncryptedPassword = '';
        hypervisor.limitingAccessType = 'no';
        hypervisor.limitingHostsList = '';
        $scope.answer.hypervisors.push(hypervisor);
        $timeout(function () {
            $scope.tab.activeTabIndex = ($scope.answer.hypervisors.length - 1);
        }, 0);
        UtilityService.scrollToElementById(UtilityService.APP_BLOCK_ID);
    };
    $scope.removeHypervisor = function (hypervisorIndex) {
        if ($scope.answer.hypervisors.length > 1) {
            $scope.answer.hypervisors.splice(hypervisorIndex, 1);
            UtilityService.scrollToElementById(UtilityService.APP_BLOCK_ID);
        }
    };
    $scope.changeRHELVersion = function () {
        if ($scope.answer.rhelVersion === UtilityService.RHEL6) {
            $scope.answer.rhevmVersion = 3;
        }
        if ($scope.answer.rhelVersion === UtilityService.RHEL7) {
            $scope.answer.rhevmVersion = 4;
        }
    };
    $scope.changeHypervisorBackend = function (hypervisor) {
        if (hypervisor.hypervisorBackend === UtilityService.VMWARE || hypervisor.hypervisorBackend === UtilityService.RHEVM) {
            hypervisor.hypervisorIDTypes = UtilityService.hypervisorIDTypesVMAndRHVM;
        } else {
            hypervisor.hypervisorIDTypes = UtilityService.hypervisorIDTypesOthers;
        }
    };
    $scope.configNameChanged = function (configName, index) {
        var temp = 0;
        $scope.answer.hypervisors.forEach(function (hypervisor) {
            if (hypervisor.hypervisorConfigName === configName) {
                temp = temp + 1;
            }
        });
        if (temp > 1) {
            $scope.virtWhoForm['hypervisorConfigName_' + index].$setValidity('duplicate', false);
        } else {
            $scope.virtWhoForm['hypervisorConfigName_' + index].$setValidity('duplicate', true);
        }
    };
    $scope.goBack = function () {
        $state.go(UtilityService.GENERAL_INFO_STATE_NAME).then(function () {
            NavigationService.updateMaxStep(1);
        });
    };
    $scope.goNext = function () {
        if ($scope.virtWhoForm.$error.required) {
            $scope.virtWhoForm.$error.required.forEach(function (field) {
                field.$setDirty();
            });
            scrollToErrorElementByName($scope.virtWhoForm.$error.required[0].$name);
            return false;
        }
        if (!$scope.virtWhoForm.$invalid) {
            $state.go('downloadConfigFile').then(function () {
                //trigger analytics
                window.chrometwo_require(["analytics/main"], function (analytics) {
                    analytics.trigger("LabsCompletion");
                });
            });
        } else {
            scrollToErrorElementByName($scope.virtWhoForm.$error.duplicate[0].$name);
            return false;
        }
    };
});
