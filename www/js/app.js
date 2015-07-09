// Ionic Starter App
'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $interval) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }

    spark.login({
      accessToken: '16a0d7ed246856bbdc39dc1b8c16c5b670fc6526'
    }, function(err) {
      if (err) { return; }

      spark.listDevices().then(
        function(devices) {
          var device = devices[0];

          if (!!device) {
            var red = 0xFF;
            var green = 0x00;
            var blue = 0x82;

            device.callFunction('analogWrite', 'A0:' + (0xFF - blue), function(error, response) {
              console.log(error);
              console.log(response);
            });

            device.callFunction('analogWrite', 'A1:' + (0xFF - green), function(error, response) {
              console.log(error);
              console.log(response);
            });

            device.callFunction('analogWrite', 'A5:' + (0xFF - red), function(error, response) {
              console.log(error);
              console.log(response);
            });
          }
        }
      );
    });

  });
});
