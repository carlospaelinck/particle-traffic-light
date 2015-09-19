/**
 * LightApp
 * Dashboard Controller
 * Carlos Paelinck
 */

import {assign, bind} from 'lodash';
import {Colors} from '../common/constants';

export default class DashboardController {
  constructor($ionicLoading, $ionicPlatform, $interval, $rootScope, $scope, $translate, ParticleService) {
    assign(this, {$ionicLoading, $ionicPlatform, $interval, $rootScope, $scope, $translate, ParticleService});
    ParticleService.addEventListener(s => this.updateStatusSignal(s));

    this.lightColors = {red: Colors.White, yellow: Colors.White, green: Colors.White};

    this.device = null;
    this.connectToDevice();
    this.resetStatusSingal();

    this.$ionicPlatform.on('resume', () => this.connectToDevice());
  }

  connectToDevice() {
    if (!!this.ParticleService.isConnected()) {
      this.device = this.ParticleService.connectedDevice;
      return;
    }

    this.device = null;

    this.$ionicLoading.show({
      template: `{{'messageConnecting' | translate}}`
    });

    this.ParticleService.login()
      .then(() => this.ParticleService.connectToDevice())
      .then(device => this.device = device)
      .finally(() => this.$ionicLoading.hide());
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
      this.lightColors = {
        red: `${sender.red ? Colors.Red : Colors.White}`,
        yellow: `${sender.yellow ? Colors.Yellow : Colors.White}`,
        green: `${sender.green ? Colors.Green : Colors.White}`
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
