import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuestionTagLineComponent } from './question.tagline.component';
import { QuestionDeleteDialogComponent } from './question.delete.dialog.component';
import { QuestionEditDialogComponent } from './question.edit.dialog.component';
import { API } from '../../services/api.service';

declare var componentHandler: any;
declare var dialogPolyfill: any;


@Component({
    selector: 'question-list',
    directives: [
        QuestionTagLineComponent,
        QuestionDeleteDialogComponent,
        QuestionEditDialogComponent
    ],
    template: `
<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" 
       style="width: 100%">

  <thead *ngIf="questionsLoaded">
    <tr>
      <th class="mdl-data-table__cell--non-numeric" style="width: 75%;">Title</th>
      <th>Complexity</th>
      <th>No. of<br />answers</th>
      <th class="mdl-data-table__cell--non-numeric" style="width: 25%;">Skills</th>
      <th class="mdl-data-table__cell--non-numeric"></th>
    </tr>
  </thead>

  <tbody *ngIf="questionsLoaded">
    <tr *ngFor="let question of questions" class="question-list-row">
      <td class="mdl-data-table__cell--non-numeric">{{question.title}}</td>
      <td>{{question.estimatedComplexity}}</td>
      <td>{{question.answers.length}}</td>
      <td class="mdl-data-table__cell--non-numeric">
        <question-tag-line [tags]="question.skills"></question-tag-line>
      </td>
      <td class="mdl-data-table__cell--non-numeric" style="width: 0%;">
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-js-ripple-effect" (click)="handleEditQuestion(question)">
            <i class="material-icons">edit</i>
        </button>

        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-js-ripple-effect" (click)="handleDeleteQuestion(question)">
            <i class="material-icons">clear</i>
        </button>
      </td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 2em">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            (click)="handleAddClick()">
        Add Question
    </button>
</div>

<question-delete-dialog>
</question-delete-dialog>

<question-edit-dialog>
</question-edit-dialog>

  `
})
export class QuestionListComponent {
    questions: Array<any> = [];
    questionsLoaded: boolean = false;

    @ViewChild(QuestionEditDialogComponent)
    editDialog: QuestionEditDialogComponent;

    constructor(private api: API, private elementRef: ElementRef) {
    }

    refreshList() {
        let el = this.elementRef.nativeElement;
        if (el) {
            let result = el.querySelector(".mdl-data-table");
            if (result) result.removeAttribute("data-upgraded")
        }

        //componentHandler.upgradeAllRegistered();
    }

    reloadList() {
        this.api.getQuestions().subscribe((res) => {
            this.questions = res;
            this.questionsLoaded = (res != null);

            console.log(res);

            this.refreshList();
        }, (err) => {
        });
    }

    ngOnInit() {
        this.reloadList();
    }

    ngOnChanges() {
    }

    handleEditQuestion(question) {
        if (question) {
            this.editDialog.question = Object.assign({}, question);
        }

        let dialog : any = document.querySelector('#edit-question');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        dialog.querySelector('button:not([disabled]).confirm').addEventListener('click', () => {
            if (this.editDialog) {
                if (question) {
                    this.editQuestion(this.editDialog.getQuestion());
                }
                else {
                    this.addQuestion(this.editDialog.getQuestion());
                }
            }
            dialog.close();
        });

        dialog.querySelector('button:not([disabled]).close').addEventListener('click', () => {
            dialog.close();
        });

        dialog.showModal();
    }

    handleAddClick() {
        this.handleEditQuestion(null);
    }

    handleDeleteQuestion(question) {
        if (question) {
            let dialog : any = document.querySelector('#delete-question');

            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }

            dialog.querySelector('button:not([disabled]).confirm').addEventListener('click', () => {
                this.deleteQuestion(question.id);
                dialog.close();
            });

            dialog.querySelector('button:not([disabled]).close').addEventListener('click', () => {
                dialog.close();
            });

            dialog.showModal();
        }
    }

    addQuestion(question) {
        this.api.addQuestion(question).subscribe((res) => {
            console.log(res);

            this.reloadList();
        }, (err) => {
        });
    }

    editQuestion(question) {
        this.api.editQuestion(question).subscribe((res) => {
            console.log(res);

            this.reloadList();
        }, (err) => {
        });
    }

    deleteQuestion(id) {
        this.api.deleteQuestion(id).subscribe((res) => {
            console.log(res);

            this.reloadList();
        }, (err) => {
        });
    }
}