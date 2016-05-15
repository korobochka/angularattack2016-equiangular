import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { QuestionListComponent } from '../../components/question/question.list.component';

@Component({
    selector: 'page-admin',
    directives: [
        QuestionListComponent
    ],
    template: `
    <h3 class="page-title">Question Editor</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp" style="">
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
  `
})
export class PageAdminComponent {
    constructor(private api: API) {
    }

    ngOnInit() {
    }

    handleAddClick() {
        // TODO: Add Click
    }
}