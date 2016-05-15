import { Component } from '@angular/core';

@Component({
    selector: 'question-delete-dialog',
    inputs: [ ],
    template: `
<dialog class="mdl-dialog" id="delete-question">
    <h4 class="mdl-dialog__title">Delete Question?</h4>
    <div class="mdl-dialog__content">
      <p>
        Are you really sure you want to delete a question?
      </p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button confirm">Yes</button>
      <button type="button" class="mdl-button close">Cancel</button>
    </div>
</dialog>
  `
})
export class QuestionDeleteDialogComponent {
    constructor() {
    }

    ngOnChanges() {
    }
}