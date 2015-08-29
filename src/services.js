/**
 * LightApp
 * Services Module
 * Carlos Paelinck
 */

import {ParticleService} from './services/particleService';

export default angular.module('lightApp.services', [])
  .service('ParticleService', ParticleService);
