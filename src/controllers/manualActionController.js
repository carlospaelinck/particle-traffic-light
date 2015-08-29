/**
 * LightApp
 * Manual Action Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class ManualActionController {
  constructor(ParticleService) {
    assign(this, {ParticleService});
    console.log('hi');

    // if (ParticleService.isConnected()) {
    //   console.log(ParticleService.connectedDevice);
    // }
  }
}
