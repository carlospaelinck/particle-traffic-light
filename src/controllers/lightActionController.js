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
    this.lights = lights;
  }

  viewWillAppear() {
    this.lights = this.ParticleService.lights;
  }

  toggleLight(color) {
    if (!color) return;
    this.ParticleService.toggleLight(color);
  }
}
