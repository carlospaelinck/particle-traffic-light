/**
 * LightApp
 * Light Actions Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class UsSequenceController {
  constructor($scope, ParticleService) {
    assign(this, {$scope, ParticleService});
  }

  performSequence() {
    let sequenceOptions = {
      red: 4,
      yellow: 2,
      green: 4,
      repeat: 2,
      uk: false
    };

    this.ParticleService.lightSequence(sequenceOptions)
      .then(() => {
        console.log('Yay!');
      })
      .catch(() => {
        console.error('Boo!');
      });
  }
}
