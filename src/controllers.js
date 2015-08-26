/**
 * LightApp
 * Controllers Module
 * Carlos Paelinck
 */

import TabController from './controllers/tabController';
import ActionController from './controllers/actionController';
import DashboardController from './controllers/dashboardController';

export default angular.module('lightApp.controllers', [])
  .controller('TabController', TabController)
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController);
