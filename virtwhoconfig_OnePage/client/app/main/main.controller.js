/*global angular, window*/

angular.module('virtwhoconfigApp').controller('MainCtrl', function ($scope, $state, NavigationService) {
    'use strict';
    $scope.navigation = NavigationService.navigation;
    $scope.isShown = function (step) {
        return step <= NavigationService.navigation.maxStep;
    };

    $scope.isActive = function (route) {
        return $state.is(route);
    };
});
