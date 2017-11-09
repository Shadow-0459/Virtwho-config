/*global angular, JSZip*/

angular.module('virtwhoconfigApp').controller('downloadConfigFileCtrl', function ($scope, $state, AnswersService, FileSaver, Blob, GeneratorService, NavigationService, UtilityService) {
    'use strict';
    UtilityService.scrollToElementById(UtilityService.APP_BLOCK_ID);
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    GeneratorService.generateHypervisorConfig(AnswersService);
    $scope.virtwhoConfigContent = GeneratorService.generateVirtWhoConfig(AnswersService);
    $scope.download = function (fileName, content) {
        var data = new Blob([content], {type: 'text/plain'});
        FileSaver.saveAs(data, fileName + '.conf');
    };
    $scope.downloadZipFile = function () {
        var zipPackage = new JSZip();
        $scope.answer.hypervisors.forEach(function (hypervisor) {
            zipPackage.file(hypervisor.hypervisorConfigName + '.conf', hypervisor.config);
        });
        zipPackage.generateAsync({type: "blob"}).then(function (blob) {
            FileSaver.saveAs(blob, 'AllConfigs.zip');
        });
    };
    $scope.goBack = function () {
        $state.go(UtilityService.HYPERVISOR_STATE_NAME);
    };
    $scope.goNext = function () {
        $state.go(UtilityService.GENERAL_INFO_STATE_NAME).then(function () {
            AnswersService.init();
            NavigationService.navigation.maxStep = 1;
        });
    };
});
