/**
 * LightApp
 * Light Actions Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class AboutController {
  constructor($scope, $translate) {
    assign(this, {$scope, $translate});

    this.currentLanguage = $translate.use();
  }

  changeLanguage(language) {
    this.$translate.use(language);
  }
}
