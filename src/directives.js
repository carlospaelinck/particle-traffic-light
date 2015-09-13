/**
 * LightApp
 * Directives Module
 * Carlos Paelinck
 */

 import ControlsDirective from './directives/controlsDirective';

 export default angular.module('lightApp.directives', [])
   .directive('lightAppControls', ControlsDirective)
