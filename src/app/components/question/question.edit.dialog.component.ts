import { Component } from '@angular/core';

@Component({
    selector: 'question-edit-dialog',
    inputs: [ 'question' ],
    template: `
<dialog class="mdl-dialog" id="edit-question" style="width: 50%">
    <h4 class="mdl-dialog__title">Question</h4>
    <div class="mdl-dialog__content">
        Title
        <div class="mdl-textfield mdl-js-textfield" style="width:100%; padding: 0 0 1em 0; ">
            <input class="mdl-textfield__input" type="text" style="width:100%;" [(ngModel)]="question.title" id="question-edit-text">
        </div>
        
        Body
        <div class="mdl-textfield mdl-js-textfield" style="width:100%; padding: 0 0 1em 0;">
            <textarea class="mdl-textfield__input" type="text" style="width:100%;" rows= "3" [(ngModel)]="question.body" id="question-edit-body" ></textarea>
        </div>
        
        <div class="two-col-container">
            <div>
                <table class="mdl-data-table mdl-data-table-dense mdl-js-data-table mdl-shadow--2dp" style="width:100%">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">Answers</th>
                            <th class="mdl-data-table__cell--non-numeric" style="width:0%">
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
                            <td class="mdl-data-table__cell--non-numeric" style="width:0%">
                                <button class="mdl-button mdl-js-button mdl-button--icon" (click)="handleDeleteAnswer(answer)" *ngIf="!answer.new">
                                    <i class="material-icons">clear</i>
                                </button>

                                <button class="mdl-button mdl-js-button mdl-button--icon" (click)="handleSubmitAnswer(answer)" *ngIf="answer.new">
                                    <i class="material-icons">done</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <textarea class="mdl-textfield__input input-no-decoration" type="text" style="width:100%;height:100%; position:absolute; left: 0; top: 0; right: 0; bottom: 0;" rows= "3" id="question-edit-body" placeholder="Please enter skills here one per line" [(ngModel)]="question.skillsText"></textarea>
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
        skillsText: '',
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
                skillsText: '',
                answers: []
            }
        }
    }

    handleAddAnswer() {
        let answers = this.question.answers.slice();

        // if any questions are new - add them to list
        answers = answers.map( (el) => {
            el.new = false;
            return el;
        });

        answers.push({
            title: 'new',
            correct: false,
            new: true
        });
        this.question.answers = answers;

        console.log(this.question.answers);
    }

    handleDeleteAnswer(answer) {
        let index = this.question.answers.indexOf(answer);
        if (index >= 0) {
            this.question.answers.splice(index, 1);
        }
    }

    handleSubmitAnswer(answer) {
        answer.new = false;
    }

    getQuestion() {
        if (this.question.skillsText && (this.question.skillsText != '')) {
            let skills = this.question.skillsText.split("\n");
            let index = 0;

            this.question.skills = skills.map( (el) => {
                return {
                    id: ++index,
                    title: el
                };
            });

            delete this.question.skillsText;
        }

        let index = 0;
        this.question.answers = this.question.answers.map( (el) => {
            return {
                id: ++index,
                body: el.title,
                isCorrect: el.correct
            };
        });

        return this.question;
    }
}