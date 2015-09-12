/**
 * LightApp
 * Application Module
 * Carlos Paelinck
 */

import ionic from 'ionic';
import './common/ios9patch';
import AppConfiguration from './common/config';
import AppRun from './common/run';
import controllers from './controllers';
import ngTranslate from 'angular-translate';
import services from './services';

angular.module('lightApp', [
    'ionic',
    'lightApp.controllers',
    'lightApp.services',
    'pascalprecht.translate',
    'ngIOS9UIWebViewPatch'
  ])
  .config(AppConfiguration)
  .run(AppRun);
