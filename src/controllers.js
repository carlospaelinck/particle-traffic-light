/**
 * LightApp
 * Controllers Module
 * Carlos Paelinck
 */

import ActionController from './controllers/actionController';
import DashboardController from './controllers/dashboardController';
import ManualActionController from './controllers/manualActionController';
import TabController from './controllers/tabController';

export default angular.module('lightApp.controllers', [])
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController)
  .controller('ManualActionController', ManualActionController)
  .controller('TabController', TabController);
