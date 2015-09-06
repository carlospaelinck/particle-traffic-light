/**
 * LightApp
 * Particle Service (SparkJS SDK)
 * Carlos Paelinck
 */

import {assign, has, isFunction, keys, noop} from 'lodash';

const LightBitMask = {
  Red:    1 << 1,
  Yellow: 1 << 2,
  Green:  1 << 3
};

class ParticleService {
  constructor($q, $rootScope, $timeout) {
    assign(this, {$q, $rootScope, $timeout});
    this.connectedDevice = null;
  }

  login() {
    return this.$q.when(spark.login({
      accessToken: '16a0d7ed246856bbdc39dc1b8c16c5b670fc6526'
    }));
  }

  addEventListener(eventListener) {
    this.$rootScope.$on('particleStateChanged', (event, data) => {
      eventListener(data);
    });
  }

  emitChange() {
    this.$rootScope.$emit('particleStateChanged', this.lights);
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

        device.onEvent('status_upd', responseObj => this.updateLightStatus(responseObj.data));
        deferred.resolve(device);

      } else {
        deferred.reject();
      }

      return deferred.promise;
    });
  }

  toggleLight(color = 'yellow') {
    if (!this.connectedDevice) return;
    let signal = this.lights[color];
    this.connectedDevice.callFunction('togglelight', color, () => this.lights[color] = !signal);
  }

  lightSequence(options = {red: 1, yellow: 1, green: 1, repeat: 1}) {
    let deferred = this.$q.defer();

    if (!this.connectedDevice) {
      return deferred.reject();
    }

    let command = `${options.red} ${options.yellow} ${options.green} ${options.repeat}`;

    this.connectedDevice.callFunction(`sequence${options.uk ? '_uk' : ''}`, command, (err, responseObj) => {
      if (!!err) {
        deferred.reject();
      } else if (responseObj.return_value === -1) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }

  updateLightStatus(sender) {
    let
      redStatus = Boolean(parseInt(sender) & LightBitMask.Red),
      yellowStatus = Boolean(parseInt(sender) & LightBitMask.Yellow),
      greenStatus = Boolean(parseInt(sender) & LightBitMask.Green);

    this.lights.red = redStatus;
    this.lights.yellow = yellowStatus;
    this.lights.green = greenStatus;

    this.emitChange();
  }

  fetchLightStatus() {
    this.lights = {
      red: false,
      yellow: false,
      green: false
    };

    this.connectedDevice.getVariable('lightstatus', (err, data) => {
      if (data.result) {
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
      this.emitChange();
    });
  }
}

export default {ParticleService, LightBitMask};
