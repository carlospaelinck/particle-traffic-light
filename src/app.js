/**
 * LightApp
 * Application Module
 * Carlos Paelinck
 */

import controllers from './controllers';
import services from './services';

angular.module('lightApp', ['ionic', 'lightApp.controllers', 'lightApp.services'])
  .config(appConfiguration)
  .run(appRun);

function appConfiguration($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      controller: 'TabController as tabController',
      templateUrl: 'templates/tabs.html'
    })
      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'tab-dashboard' : {
            controller: 'DashboardController as dashboardController',
            templateUrl: 'templates/tab.dashboard.html'
          }
        }
      })
      .state('tab.action', {
        url: '/action',
        views: {
          'tab-action' : {
            controller: 'ActionController as actionController',
            templateUrl: 'templates/tab.action.html'
          }
        }
      })
      .state('tab.manualAction', {
        url: '/manual',
        views: {
          'tab-action' : {
            controller: 'ManualActionController as manualActionController',
            templateUrl: 'templates/tab.action.manual.html'
          }
        }
      });

  $urlRouterProvider.otherwise('/tab/dashboard');
}

function appRun($ionicPlatform, $interval) {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }
  });
}
