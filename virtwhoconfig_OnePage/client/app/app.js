/*global angular*/

angular.module('virtwhoconfigApp', [
    'duScroll',
    'ngCookies',
    'ngSanitize',
    'ngFileSaver',
    'ngMessages',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.router',
    'ui.bootstrap'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}).config(function ($translateProvider) {
    'use strict';
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/languages/messages_',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
}).filter('to_trusted', ['$sce', function ($sce) {
    'use strict';
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
