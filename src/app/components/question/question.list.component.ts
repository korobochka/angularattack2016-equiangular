import { Component } from '@angular/core';
import { QuestionTagLineComponent } from './question.tagline.component';
import { API } from '../../services/api.service';
declare var componentHandler: any;

@Component({
    selector: 'question-list',
    directives: [
        QuestionTagLineComponent
    ],
    template: `
<table class="mdl-data-table mdl-js-data-table" 
       style="width: 100%"
       *ngIf="questionLoaded">

  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric" style="width: 50%;">Title</th>
      <th>Complexity</th>
      <th>No. of<br />answers</th>
      <th class="mdl-data-table__cell--non-numeric" style="width: 25%;">Skills</th>
    </tr>
  </thead>

  <tbody>
    <tr *ngFor="let question of questions" class="question-list-row">
      <td class="mdl-data-table__cell--non-numeric">{{question.title}}</td>
      <td>{{question.estimatedComplexity}}</td>
      <td>{{question.answers.length}}</td>
      <td class="mdl-data-table__cell--non-numeric">
        <question-tag-line [tags]="question.skills"></question-tag-line>
      </td>
    </tr>
  </tbody>
</table>
  `
})
export class QuestionListComponent {
    questions: Array<any> = [];
    questionLoaded: boolean = false;

    constructor(private api: API) {
    }

    refreshList() {
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit() {
        this.api.getQuestions().subscribe((res) => {
            this.questions = res;
            this.questionLoaded = (res != null);

            console.log(res);

            this.refreshList();
        }, (err) => {
        });
    }

    ngOnChanges() {
    }
}