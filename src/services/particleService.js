/**
 * LightApp
 * Particle Service (SparkJS SDK)
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class ParticleService {
  constructor($q) {
    assign(this, {$q});
    this.connectedDevice = null;
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

      if (!!device) {
        this.connectedDevice = device;
        deferred.resolve(device);
      } else {
        deferred.reject();
      }

      return deferred.promise;
    });
  }
}
