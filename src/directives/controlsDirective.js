/**
 * LightApp
 * Controls Directive
 * Carlos Paelinck
 */

export default function ControlsDirective() {
  return {
    scope: {
      region: '@'
    },

    controller: function(ParticleService) {
      this.sequenceOptions = {
        red: 4,
        yellow: 2,
        green: 4,
        repeat: 1
      };

      this.performBtnDisabled = false;

      this.performSequence = () => {
        let sequenceOptions = _.extend(this.sequenceOptions, {uk: this.region === 'uk'});
        this.performBtnDisabled = true;

        ParticleService.lightSequence(sequenceOptions)
          .catch(() => {
            console.log('Boo!');
          })
          .finally(() => this.performBtnDisabled = false);
      };
    },

    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/directive.controls.html'
  }
}
