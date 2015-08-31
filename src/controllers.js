/**
 * LightApp
 * Controllers Module
 * Carlos Paelinck
 */

import ActionController from './controllers/actionController';
import DashboardController from './controllers/dashboardController';
import LightActionsController from './controllers/lightActionController';
import TabController from './controllers/tabController';

export default angular.module('lightApp.controllers', [])
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController)
  .controller('LightActionsController', LightActionsController)
  .controller('TabController', TabController);
