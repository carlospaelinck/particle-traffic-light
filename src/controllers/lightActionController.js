/**
 * LightApp
 * Light Actions Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class LightActionsController {
  constructor($scope, ParticleService) {
    assign(this, {$scope, ParticleService});
    $scope.$on('$ionicView.beforeEnter', e => this.viewWillAppear(e));
    ParticleService.addEventListener(l => this.updateSignalButtons(l));

    this.lights = {red: false, yellow: false, green: false};
  }

  updateSignalButtons(lights) {
    assign(this.lights, lights);
  }

  viewWillAppear() {
    this.lights = this.ParticleService.lights;
  }

  toggleLight(color) {
    if (!color) return;
    this.ParticleService.toggleLight(color);
  }

  performSequence() {
    let sequenceOptions = {
      red: 4,
      yellow: 2,
      green: 4,
      repeat: 2,
      uk: true
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
