/**
 * LightApp
 * Action Controller
 * Carlos Paelinck
 */

import {assign} from 'lodash';

export default class ActionController {
  constructor($ionicLoading, ParticleService) {
    assign(this, {$ionicLoading, ParticleService});

    if (ionic.Platform.isAndroid()) {
      this.icons = {
        chevron: 'ion-android-arrow-forward'
      };
    } else {
      this.icons = {
        chevron: 'ion-chevron-right'
      };
    }

    this.actionsDisabled = true;

    if (!ParticleService.isConnected()) {
      this.$ionicLoading.show({
        template: `{{'messageConnecting' | translate}}`
      });

      this.ParticleService.login()
        .then(() => this.ParticleService.connectToDevice())
        .then(() => this.actionsDisabled = false)
        .finally(() => this.$ionicLoading.hide());
    }
  }
}
