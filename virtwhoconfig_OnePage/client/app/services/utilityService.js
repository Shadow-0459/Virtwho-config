/*global angular, document*/

angular.module('virtwhoconfigApp').factory('UtilityService', function ($document) {
    'use strict';
    var utility = {};
    utility.HYPERVISOR_STATE_NAME = 'main.hypervisorBackend';
    utility.GENERAL_INFO_STATE_NAME = 'main.generalInfo';
    utility.APP_BLOCK_ID = 'virtwhoconfig';
    utility.VMWARE = 'esx';
    utility.RHEVM = 'rhevm';
    utility.VDSM = 'vdsm';
    utility.HYPERV = 'hyperv';
    utility.XEN = 'xen';
    utility.LIBVIRT = 'libvirt';
    utility.RHEL7 = 'Red Hat Enterprise Linux 7';
    utility.RHEL6 = 'Red Hat Enterprise Linux 6';
    utility.SATELLITE = 'Red Hat Satellite';
    utility.CUSTOMER_PORTAL = 'Red Hat Customer Portal';
    utility.SUBSCRIPTION_ASSET_MANAGER = 'Subscription Asset Manager';
    utility.hypervisorBackends = [
        {label: 'VMware vSphere / vCenter (esx)', value: utility.VMWARE},
        {label: 'Red Hat Virtualization Hypervisor (rhevm)', value: utility.RHEVM},
        {label: 'Red Hat Enterprise Linux Hypervisor (vdsm)', value: utility.VDSM},
        {label: 'Microsoft Hyper-V (hyperv)', value: utility.HYPERV},
        {label: 'XenServer (xen)', value: utility.XEN},
        {label: 'libvirt', value: utility.LIBVIRT}
    ];
    utility.satelliteVersions = [
        '6.2',
        '6.1'
    ];
    utility.rhelVersions = [
        utility.RHEL7,
        utility.RHEL6
    ];
    utility.reportTypes = [
        utility.SATELLITE,
        utility.CUSTOMER_PORTAL,
        utility.SUBSCRIPTION_ASSET_MANAGER
    ];
    utility.rhevmVersions = [
        3,
        4
    ];
    utility.hypervisorIDTypesVMAndRHVM = [
        'hostname',
        'uuid',
        'hwuuid'
    ];
    utility.hypervisorIDTypesOthers = [
        'hostname',
        'uuid'
    ];
    utility.defaultHypervisor = {
        hypervisorConfigName: 'hypervisor1',
        hypervisorBackend: utility.VMWARE,
        hypervisorAddress: '',
        hypervisorUsername: '',
        hypervisorEncryptedPassword: '',
        hypervisorOwner: '',
        hypervisorID: 'hostname',
        rhevmVersion: 4,
        hypervisorIDTypes: utility.hypervisorIDTypesVMAndRHVM,
        reportType: utility.SATELLITE,
        satelliteVersion: '6.2',
        satelliteHostName: '',
        satelliteAdminUsername: '',
        satelliteAdminPassword: '',
        samHostName: '',
        samAdminUsername: '',
        samAdminPassword: '',
        limitingAccessType: 'no',
        limitingHostsList: ''
    };
    utility.scrollToElementById = function (targetElementId) {
        var element = angular.element(document.getElementById(targetElementId));
        $document.scrollToElementAnimated(element, 100);
    };
    utility.scrollToElementByName = function (targetElementName) {
        var element = angular.element(document.getElementsByName(targetElementName)[0]);
        $document.scrollToElementAnimated(element, 100);
    };
    return utility;
});
