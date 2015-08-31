/**
 * LightApp
 * Dashboard Controller
 * Carlos Paelinck
 */

import {assign, bind} from 'lodash';
import {Colors} from '../common/constants';

export default class DashboardController {
  constructor($ionicLoading, $interval, $rootScope, $scope, $translate, ParticleService) {
    assign(this, {$ionicLoading, $interval, $rootScope, $scope, $translate, ParticleService});
    ParticleService.addEventListener(s => this.updateStatusSignal(s));

    this.device = null;
    this.connectToDevice();
    this.resetStatusSingal();
  }

  connectToDevice() {
    this.device = null;

    this.$ionicLoading.show({
      template: `{{'messageConnecting' | translate}}`
    });

    this.ParticleService.login().then(() => {
      return this.ParticleService.connectToDevice();

    }).then(device => {
      this.device = device;

    }).finally(() => {
      this.$ionicLoading.hide();
    });
  }

  resetStatusSingal() {
    this.lightSVGColors = {
      red: Colors.Transparent,
      yellow: Colors.Transparent,
      green: Colors.Transparent
    };
  }

  updateStatusSignal(sender) {
    this.$scope.$apply(() => {
      this.lightSVGColors = {
        red: `${sender.red ? Colors.Red : Colors.Transparent}`,
        yellow: `${sender.yellow ? Colors.Yellow : Colors.Transparent}`,
        green: `${sender.green ? Colors.Green : Colors.Transparent}`
      };
    });
  }

  toggleLight(sender) {
    this.ParticleService.toggleLight(sender);
  }

  lightSequence() {
    this.ParticleService.lightSequence();
  }

  resetLights() {
    this.ParticleService.resetLights();
    this.resetStatusSingal();
  }
}
