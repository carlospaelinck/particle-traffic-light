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

        device.onEvent('event:lightChange', responseObj => this.updateLightStatus(responseObj.data));
        deferred.resolve(device);

      } else {
        deferred.reject();
      }

      return deferred.promise;
    });
  }

  toggleLight(color) {
    if (!this.connectedDevice) return;
    let signal = this.lights[color];
    this.connectedDevice.callFunction('togglelight', color, () => this.lights[color] = !signal);
  }

  lightSequence() {
    if (!this.connectedDevice) return;

    this.sequenceLight({green: 'on'}, 0)
      .then(() => this.sequenceLight({green: 'off', yellow: 'on'}, 4))
      .then(() => this.sequenceLight({yellow: 'off', red: 'on'}, 2))
      .then(() => this.sequenceLight({red: 'off'}, 4))
      .then(() => {
        console.log('Done');
      });
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

  sequenceLight(options, wait) {
    let
      deferred = this.$q.defer(),
      command = '';

    if (!this.connectedDevice) deferred.reject();

    if (has(options, 'green')) command += `g:${options.green === 'on' ? 't' : 'f'} `;
    if (has(options, 'yellow')) command += `y:${options.yellow === 'on' ? 't' : 'f'} `;
    if (has(options, 'red')) command += `r:${options.red === 'on' ? 't' : 'f'} `;

    this.$timeout(() => this.connectedDevice.callFunction('sequence', command, () => deferred.resolve()), wait * 1000);

    return deferred.promise;
  }
}

export default {ParticleService, LightBitMask};
