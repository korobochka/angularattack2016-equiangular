import { Component } from '@angular/core';

@Component({
    selector: 'question-edit-dialog',
    inputs: [ 'question' ],
    template: `
<dialog class="mdl-dialog" id="edit-question" style="width: 60%">
    <h4 class="mdl-dialog__title">Question</h4>
    <div class="mdl-dialog__content">
        <div class="mdl-textfield mdl-js-textfield" style="width:100%;">
            <input class="mdl-textfield__input" type="text" style="width:100%;" [(ngModel)]="question.title" id="question-edit-text">
            <label class="mdl-textfield__label" for="question-edit-text">Title...</label>
        </div>
        
        <div class="mdl-textfield mdl-js-textfield" style="width:100%;">
            <textarea class="mdl-textfield__input" type="text" style="width:100%;" rows= "3" [(ngModel)]="question.body" id="question-edit-body" ></textarea>
            <label class="mdl-textfield__label" for="question-edit-body">Text...</label>
        </div>
        
        <div class="two-col-container">
            <div>
                <table class="mdl-data-table mdl-data-table-dense mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">Answers</th>
                            <th>
                                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-button--colored mdl-js-ripple-effect" 
                                        (click)="handleAddAnswer()">
                                    <i class="material-icons">add</i>
                                </button>
                            </th>
                        </tr>
                    </thead>
        
                    <tbody>
                        <tr *ngFor="let answer of question.answers">
                            <td class="mdl-data-table__cell--non-numeric">
                                <span *ngIf="!answer.new">
                                    {{answer.title}}
                                </span>

                                <div *ngIf="answer.new">
                                    <input type="text" class="input-no-decoration" [(ngModel)]="answer.title" />
                                </div>
                            </td>
                            <td>
                                <button class="mdl-button mdl-js-button mdl-button--icon" (click)="handleDeleteAnswer()" *ngIf="!answer.new">
                                    <i class="material-icons">clear</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div class="mdl-textfield mdl-js-textfield" style="width:100%;">
                    <textarea class="mdl-textfield__input" type="text" style="width:100%;height:100%;" rows= "3" id="question-edit-body" ></textarea>
                    <label class="mdl-textfield__label" for="question-edit-body">Text...</label>
                </div>
            </div>
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
    question: any = {
        title: '',
        body: '',
        skills: [],
        answers: []
    };

    constructor() {
    }

    ngOnChanges() {
        console.log('ngOnChanges question', this.question);

        if (this.question) {
        }
        else {
            this.question = {
                title: '',
                body: '',
                skills: [],
                answers: []
            }
        }
    }

    handleAddAnswer() {
        let answers = this.question.answers.slice();
        answers.push({
            title: 'new',
            correct: false,
            new: true
        });
        this.question.answers = answers;

        console.log(this.question.answers);
    }
}