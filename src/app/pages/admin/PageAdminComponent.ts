import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { QuestionListComponent } from '../../components/question/question.list.component';

declare var dialogPolyfill: any;

@Component({
    selector: 'page-admin',
    directives: [
        QuestionListComponent
    ],
    template: `
    <h3 class="page-title">Question Editor</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
            <question-list>
            </question-list>
        </div>

        <div class="mdl-cell mdl-cell--12-col">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                    (click)="handleAddClick()">
                Add Question
            </button>
        </div>
    </div>

<dialog class="mdl-dialog" id="add-question">
    <h4 class="mdl-dialog__title">Allow data collection?</h4>
    <div class="mdl-dialog__content">
      <p>
        Allowing us to collect data will let us get you the information you want faster.
      </p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button close">Disagree</button>
    </div>
</dialog>
  `
})
export class PageAdminComponent {
    constructor(private api: API) {
    }

    ngOnInit() {
    }

    handleAddClick() {
        // TODO: Add Click
        let dialog : any = document.querySelector('#add-question');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        dialog.querySelector('button:not([disabled])').addEventListener('click', function () {
            dialog.close();
        });

        dialog.showModal();
    }
}