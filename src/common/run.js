/**
 * LightApp
 * Application Runner
 * Carlos Paelinck
 */

export default function AppRun($ionicPlatform, $interval) {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      window.StatusBar.styleLightContent();
    }

    $ionicPlatform.on('offline', () => {
      console.log('Device is offline. Boo!');
    });
  });
}
