/**
 * LightApp
 * Tab Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class TabController {
  constructor() {
    assign(this, {});
    this.createTabIcons();
  }

  createTabIcons() {
    if (ionic.Platform.isAndroid()) {
      this.tabIcons = {
        dashboardOn: 'ion-android-bulb',
        dashboardOff: 'ion-android-bulb',
        aboutOn: 'ion-information-circled',
        aboutOff: 'ion-information-circled',
        actionOn: 'ion-android-options',
        actionOff: 'ion-android-options'
      };
    } else {
      this.tabIcons = {
        dashboardOn: 'ion-ios-lightbulb',
        dashboardOff: 'ion-ios-lightbulb-outline',
        aboutOn: 'ion-ios-information',
        aboutOff: 'ion-ios-information-outline',
        actionOn: 'ion-ios-toggle',
        actionOff: 'ion-ios-toggle-outline'
      };
    }
  }
}
