/**
 * LightApp
 * Action Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class ActionController {
  constructor(ParticleService) {
    assign(this, {ParticleService});

    // if (ParticleService.isConnected()) {
    //   console.log(ParticleService.connectedDevice);
    // }
  }
}
