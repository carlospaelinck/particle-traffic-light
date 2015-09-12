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
    .useSanitizeValueStrategy('escape');

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
      .state('tab.ukSequence', {
        url: '/ukSequence',
        views: {
          'tab-action' : {
            controller: 'UkSequenceController as ukSequenceController',
            templateUrl: 'templates/tab.action.uk.sequence.html'
          }
        }
      })
      .state('tab.usSequence', {
        url: '/usSequence',
        views: {
          'tab-action' : {
            controller: 'UsSequenceController as usSequenceController',
            templateUrl: 'templates/tab.action.us.sequence.html'
          }
        }
      })
      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about' : {
            controller: 'AboutController as aboutController',
            templateUrl: 'templates/tab.about.html'
          }
        }
      });

  $urlRouterProvider.otherwise('/tab/dashboard');
}
