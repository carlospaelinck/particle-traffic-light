/**
 * LightApp
 * Dashboard Controller
 * Carlos Paelinck
 */

import {assign, bind} from 'lodash';
import {ParticleConnectionStatus} from '../services/particleService';

export default class DashboardController {
  constructor($interval, $scope, ParticleService) {
    assign(this, {$interval, $scope, ParticleService, ParticleConnectionStatus});
    this.updateStatusSignal = this.updateStatusSignal.bind(this);
    this.connectToDevice();
    this.resetStatusSingal();
  }

  connectToDevice() {
    this.connectionStatus = ParticleConnectionStatus.Pending;

    this.ParticleService.login().then(() => {
      return this.ParticleService.connectToDevice();

    }).then(() => {
      this.connectionStatus = ParticleConnectionStatus.Connected;
      this.ParticleService.signalCallback = this.updateStatusSignal;

    }).catch(() => {
      this.connectionStatus = ParticleConnectionStatus.NotConnected;
    });
  }

  resetStatusSingal() {
    this.lightSVGColors = {
      red: '#fff',
      yellow: '#fff',
      green: '#fff'
    };
  }

  updateStatusSignal(sender) {
    this.$scope.$apply(() => {
      this.lightSVGColors = {
        red: `${sender.red ? '#ff0000' : '#fff'}`,
        yellow: `${sender.yellow ? '#ffff00' : '#fff'}`,
        green: `${sender.green ? '#00ff00' : '#fff'}`
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
