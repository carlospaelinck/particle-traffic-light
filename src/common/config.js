/**
 * LightApp
 * Application Configuration
 * Carlos Paelinck
 */

import {Translations} from './constants';

export default function AppConfiguration($stateProvider, $urlRouterProvider, $translateProvider) {
  $translateProvider
    .translations('en', Translations.EN)
    .translations('es', Translations.ES)
    .preferredLanguage('en')
    .useSanitizeValueStrategy('sanitize');

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
