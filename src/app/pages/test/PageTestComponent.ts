import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { QuestionComponent } from '../../components/question/question.component';
import { QuestionTitleComponent } from '../../components/question/question.title.component';
import { QuestionAnswersComponent } from '../../components/question/question.answers.component';

@Component({
    selector: 'md',
    directives: [
        QuestionComponent,
        QuestionTitleComponent,
        QuestionAnswersComponent
    ],
    template: `
    <question-title>
        {{questionTitle}}
    </question-title>
    
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <question>
                {{questionBody}}
            </question>
        </div>

        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <question-answers [answers]="questionAnswers"
                              multiply="true"
                              (onChange)="handleAnswersChange($event)">
            </question-answers>
        </div>

        <div class="mdl-cell mdl-cell--12-col">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="handleAddSkill()" style="float: right" [disabled]="!submitAnswerEnabled">
                <i class="material-icons">done</i> Submit Answer
            </button>
        </div>
    </div>
  `
})
export class PageTestComponent {
    inProgress: boolean = false;
    requestCompleted: boolean = false;
    submitAnswerEnabled = false;
    response: string = '';
    profile: any = {}
    add_skill_name: string = '';
    questionTitle = 'Some Title';
    questionAnswers = [
        {
            id: 1,
            body: 'Option 1'
        },
        {
            id: 2,
            body: 'Option 2'
        },
        {
            id: 3,
            body: 'Option 3'
        },
        {
            id: 4,
            body: 'Option 4'
        }
    ];
    questionBody = `
            ### H3
            Some text here
            #### Emphasis
            *single asterisks*
    `;

    constructor(private api: API) {
        this.api.profile().subscribe((res) => {
            this.profile = res;
            console.log('profile', this.profile);
        }, (err) => {
        });
    }

    ngOnInit() {
    }

    reloadSkills() {
        this.api.getSkills().subscribe((res) => {
            this.profile.intendedSkills = res;
        }, (err) => {
        });
    }

    handleAddSkill() {
        if (this.add_skill_name) {
            this.api.createSkill(this.add_skill_name).subscribe((res) => {
                this.reloadSkills();
                this.add_skill_name = '';
            }, (err) => {
            });
        }
    }

    handleRemoveSkill(tag) {
        this.api.deleteSkill(tag).subscribe((res) => {
            let index = this.profile.intendedSkills.indexOf(tag);
            this.profile.intendedSkills.splice(index, 1);
        }, (err) => {
        });
    }

    handleAnswersChange(answers) {
        this.submitAnswerEnabled = (answers.length > 0);
    }
}