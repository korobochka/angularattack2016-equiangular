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
        <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp">
            <question-list>
            </question-list>
        </div>
    </div>
  `
})
export class PageAdminComponent {
    constructor(private api: API) {
    }

    ngOnInit() {
    }
}