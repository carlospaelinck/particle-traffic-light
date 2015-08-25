/**
 * LightApp
 * Controllers Module
 * Carlos Paelinck
 */

import ActionController from './controllers/actionController';
import DashboardController from './controllers/dashboardController';

export default angular.module('lightApp.controllers', [])
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController);
