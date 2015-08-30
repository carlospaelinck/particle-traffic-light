/**
 * LightApp
 * Particle Service (SparkJS SDK)
 * Carlos Paelinck
 */

import {assign, isFunction, isString, keys, noop} from 'lodash';

const LightBitMask = {
  Red:    1 << 1,
  Yellow: 1 << 2,
  Green:  1 << 3
};

const ParticleConnectionStatus = {
  Pending: 1,
  Connected: 2,
  NotConnected: 3
};

class ParticleService {
  constructor($rootScope, $q) {
    assign(this, {$rootScope, $q});
    this.connectedDevice = null;
    this.signalCallback = null;
  }

  login() {
    return this.$q.when(spark.login({
      accessToken: '16a0d7ed246856bbdc39dc1b8c16c5b670fc6526'
    }));
  }

  isConnected() {
    return !!this.connectedDevice && this.connectedDevice.name === 'CarlosCore';
  }

  connectToDevice() {
    return this.$q.when(spark.listDevices()).then(devices => {
      let
        device = _.findWhere(devices, {name: 'CarlosCore'}),
        deferred = this.$q.defer();

      if (!!device && device.connected) {
        this.connectedDevice = device;
        this.fetchLightStatus();

        device.onEvent('event:lightChange', responseObj => this.updateLightStatus(responseObj.data));
        deferred.resolve(device);

      } else {
        deferred.reject();
      }

      return deferred.promise;
    });
  }

  toggleLight(pin) {
    if (!this.connectedDevice) return;

    let signal = this.lights[pin];

    this.connectedDevice.callFunction('togglelight', pin, () => {
      this.lights[pin] = !signal;
      this.signalCallback(this.lights);
    });
  }

  lightSequence() {
    if (!this.connectedDevice) return;

    // this.connectedDevice.callFunction('yellowon', null, () => {
    // });
  }

  updateLightStatus(sender) {
    let
      redStatus = Boolean(parseInt(sender) & LightBitMask.Red),
      yellowStatus = Boolean(parseInt(sender) & LightBitMask.Yellow),
      greenStatus = Boolean(parseInt(sender) & LightBitMask.Green);

    this.lights.red = redStatus;
    this.lights.yellow = yellowStatus;
    this.lights.green = greenStatus;

    this.signalCallback(this.lights);
  }

  fetchLightStatus() {
    this.lights = {
      red: false,
      yellow: false,
      green: false
    };

    this.connectedDevice.getVariable('lightstatus', (err, data) => {
      if (isString(data.result)) {
        this.updateLightStatus(data.result);
      }
    });
  }

  resetLights() {
    if (!this.connectedDevice) return;

    this.lights = {
      red: false,
      yellow: false,
      green: false
    };

    this.connectedDevice.callFunction('resetLights', null, () => {
      this.signalCallback(this.lights);
    });
  }
}

export default {ParticleService, ParticleConnectionStatus, LightBitMask};
