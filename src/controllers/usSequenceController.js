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
}
