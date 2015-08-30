/**
 * LightApp
 * Dashboard Controller
 * Carlos Paelinck
 */

import {assign, bind} from 'lodash';
import {ParticleConnectionStatus} from '../services/particleService';
import {Colors} from '../common/constants';

export default class DashboardController {
  constructor($ionicLoading, $interval, $scope, $translate, ParticleService) {
    assign(this, {$ionicLoading, $interval, $scope, $translate, ParticleService, ParticleConnectionStatus});
    this.updateStatusSignal = this.updateStatusSignal.bind(this);
    this.connectToDevice();
    this.resetStatusSingal();
  }

  connectToDevice() {
    this.connectionStatus = ParticleConnectionStatus.Pending;

    this.$ionicLoading.show({
      template: `{{'messageConnecting' | translate}}`
    });

    this.ParticleService.login().then(() => {
      return this.ParticleService.connectToDevice();

    }).then(() => {
      this.connectionStatus = ParticleConnectionStatus.Connected;
      this.ParticleService.signalCallback = this.updateStatusSignal;

    }).catch(() => {
      this.connectionStatus = ParticleConnectionStatus.NotConnected;

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
