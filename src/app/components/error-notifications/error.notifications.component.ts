import { Component } from '@angular/core';
declare var componentHandler: any;

@Component({
    selector: 'error-nofications',
    inputs: [ 'errors' ],
    template: `
<div id="application-errors" class="mdl-js-snackbar mdl-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button class="mdl-snackbar__action" type="button"></button>
</div>
  `
})
export class ErrorNotificationsComponent {
    showing: boolean = false;
    errors: Array<any>;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(change) {
//        componentHandler.upgradeAllRegistered();

        if (!this.showing) {
            let snackbarContainer = document.querySelector('#application-errors');
            let snackbar = snackbarContainer['MaterialSnackbar'];

            if (this.errors.length > 0) {
                let topError = this.errors[0];

                let data = {
                    message: 'Error: ' + topError.status + ' ' + topError.error['detailMessage'],
                    timeout: 2000,
//                actionHandler: this.handleErrorTimeout,
//                actionText: 'Undo'
                };

                snackbar.showSnackbar(data);
            }
        }
    }

    handleErrorTimeout() {
        console.log('handleErrorTimeout');
    }
}

