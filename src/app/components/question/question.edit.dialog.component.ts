import { Component } from '@angular/core';

@Component({
    selector: 'question-edit-dialog',
    inputs: [ ],
    template: `
<dialog class="mdl-dialog" id="edit-question" style="width: 60%">
    <h4 class="mdl-dialog__title">Question</h4>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield" style="width:100%;">
        <input class="mdl-textfield__input" type="text" style="width:100%;" id="question-edit-text">
        <label class="mdl-textfield__label" for="question-edit-text">Title...</label>
      </div>

      <div class="mdl-textfield mdl-js-textfield" style="width:100%;">
        <textarea class="mdl-textfield__input" type="text" style="width:100%;" rows= "3" id="question-edit-body" ></textarea>
        <label class="mdl-textfield__label" for="question-edit-body">Text...</label>
      </div>
    </div>

    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button confirm">Save</button>
      <button type="button" class="mdl-button close">Cancel</button>
    </div>
</dialog>
  `
})
export class QuestionEditDialogComponent {
    constructor() {
    }

    ngOnChanges() {
    }
}