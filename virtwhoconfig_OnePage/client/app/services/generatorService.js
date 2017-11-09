/*global angular, document, console*/

angular.module('virtwhoconfigApp').factory('GeneratorService', function (UtilityService) {
    'use strict';
    var generator = {};
    generator.generateHypervisorConfig = function (answer) {
        answer.hypervisors.forEach(function (hypervisor) {
            var config = '# vi /etc/virt-who.d/' + hypervisor.hypervisorConfigName + '.conf' + '\n\n';
            config = config + '[' + hypervisor.hypervisorConfigName + ']\n';
            config = config + 'type=' + hypervisor.hypervisorBackend + '\n';
            config = config + 'hypervisor_id=' + hypervisor.hypervisorID + '\n';
            if (hypervisor.hypervisorBackend !== UtilityService.VDSM) {
                config = config + 'server=' + hypervisor.hypervisorAddress + '\n';
                if (hypervisor.hypervisorBackend !== UtilityService.LIBVIRT) {
                    config = config + 'username=' + hypervisor.hypervisorUsername + '\n';
                    config = config + 'encrypted_password=' + hypervisor.hypervisorEncryptedPassword + '\n';
                }
                config = config + 'owner=' + hypervisor.hypervisorOwner + '\n';
                config = config + 'env=Library' + '\n';
            }
            if (hypervisor.limitingAccessType !== 'no') {
                if (hypervisor.limitingAccessType === 'include') {
                    config = config + 'filter_hosts=' + hypervisor.limitingHostsList + '\n';
                }
                if (hypervisor.limitingAccessType === 'exclude') {
                    config = config + 'exclude_hosts=' + hypervisor.limitingHostsList + '\n';
                }
            }
            if (hypervisor.reportType === UtilityService.SATELLITE) {
                config = config + 'rhsm_hostname=' + hypervisor.satelliteHostName + '\n';
                config = config + 'rhsm_username=' + hypervisor.satelliteAdminUsername + '\n';
                config = config + 'rhsm_encrypted_password=' + hypervisor.satelliteAdminPassword + '\n';
                config = config + 'rhsm_prefix=/rhsm\n';
            }
            if (hypervisor.reportType === UtilityService.SUBSCRIPTION_ASSET_MANAGER) {
                config = config + 'rhsm_hostname=' + hypervisor.samHostName + '\n';
                config = config + 'rhsm_username=' + hypervisor.samAdminUsername + '\n';
                config = config + 'rhsm_encrypted_password=' + hypervisor.samAdminPassword + '\n';
                config = config + 'rhsm_prefix=/sam/api\n';
            }
            hypervisor.config = config + '\n';
        });
    };
    generator.generateVirtWhoConfig = function (answer) {
        var config = '';
        if (answer.isEnableDebugging) {
            config = config + 'VIRTWHO_DEBUG=1\n';
        } else {
            config = config + 'VIRTWHO_DEBUG=0\n';
        }
        config = config + 'VIRTWHO_INTERVAL=' + answer.interval + '\n';
        if (answer.hasProxy) {
            config = config + 'http_proxy=' + answer.httpProxy + '\n';
        }
        return config;
    };
    return generator;
});
