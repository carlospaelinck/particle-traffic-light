/**
 * LightApp
 * Light Actions Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class UsSequenceController {
  constructor($scope, ParticleService) {
    assign(this, {$scope, ParticleService});

    this.timers = {
      red: 4,
      yellow: 2,
      green: 4,
      repeat: 1
    };
  }

  performSequence() {
    let sequenceOptions = _.extend(this.timers, {uk: false});

    this.ParticleService.lightSequence(sequenceOptions)
      .then(() => {
        console.log('Yay!');
      })
      .catch(() => {
        console.error('Boo!');
      });
  }
}
