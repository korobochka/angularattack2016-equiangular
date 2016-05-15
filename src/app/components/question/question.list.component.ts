import { Component, ElementRef } from '@angular/core';
import { QuestionTagLineComponent } from './question.tagline.component';
import { API } from '../../services/api.service';
declare var componentHandler: any;

@Component({
    selector: 'question-list',
    directives: [
        QuestionTagLineComponent
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
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-js-ripple-effect" (click)="handleEditQuestion()">
            <i class="material-icons">edit</i>
        </button>

        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-js-ripple-effect" (click)="handleDeleteQuestion()">
            <i class="material-icons">clear</i>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  `
})
export class QuestionListComponent {
    questions: Array<any> = [];
    questionsLoaded: boolean = false;

    constructor(private api: API, private elementRef: ElementRef) {
    }

    refreshList() {
        let el = this.elementRef.nativeElement;
        if (el) {
            let result = el.querySelector(".mdl-data-table");
            if (result) result.removeAttribute("data-upgraded")
        }
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit() {
        this.api.getQuestions().subscribe((res) => {
            this.questions = res;
            this.questionsLoaded = (res != null);

            console.log(res);

            this.refreshList();
        }, (err) => {
        });
    }

    ngOnChanges() {
    }

    handleEditQuestion() {
        // TODO: Edit handler
    }

    handleDeleteQuestion() {
        // TODO: Delete handler
    }
}