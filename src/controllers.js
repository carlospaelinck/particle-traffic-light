/**
 * LightApp
 * Controllers Module
 * Carlos Paelinck
 */

import AboutController from './controllers/AboutController';
import ActionController from './controllers/actionController';
import DashboardController from './controllers/dashboardController';
import TabController from './controllers/tabController';
import UkSequenceController from './controllers/usSequenceController';
import UsSequenceController from './controllers/usSequenceController';

export default angular.module('lightApp.controllers', [])
  .controller('AboutController', AboutController)
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController)
  .controller('TabController', TabController)
  .controller('UkSequenceController', UkSequenceController)
  .controller('UsSequenceController', UsSequenceController);
