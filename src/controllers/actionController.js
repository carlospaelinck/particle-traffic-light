/**
 * LightApp
 * Action Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class ActionController {
  constructor(ParticleService) {
    assign(this, {ParticleService});

    if (ionic.Platform.isAndroid()) {
      this.icons = {
        chevron: 'ion-android-arrow-forward'
      };
    } else {
      this.icons = {
        chevron: 'ion-chevron-right'
      };
    }

    // if (ParticleService.isConnected()) {
    //   console.log(ParticleService.connectedDevice);
    // }
  }
}
