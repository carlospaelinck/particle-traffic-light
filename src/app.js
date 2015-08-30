/**
 * LightApp
 * Application Module
 * Carlos Paelinck
 */

import AppConfiguration from './common/config';
import AppRun from './common/run';
import controllers from './controllers';
import ngTranslate from 'angular-translate';
import services from './services';

angular.module('lightApp', [
    'ionic',
    'lightApp.controllers',
    'lightApp.services',
    'pascalprecht.translate'
  ])
  .config(AppConfiguration)
  .run(AppRun);
