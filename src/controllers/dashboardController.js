/**
 * LightApp
 * Dashboard Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class DashboardController {
  constructor(ParticleService) {
    assign(this, {ParticleService});
    this.isDeviceConnected = false;
    this.connectedDevice = null;
  }

  connectToDevice() {
    this.ParticleService.login().then(() => {
      return this.ParticleService.connectToDevice();
    }).then(device => {
      this.isDeviceConnected = true;
      this.connectedDevice = device;
    }).catch((err) => {
      // this.connectedStatus = 'Could not connect to a Particle device.'
    });
  }
}
