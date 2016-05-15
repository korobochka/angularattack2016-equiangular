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
    <div class="mdl-cell mdl-cell--12-col">
        <question-title>
            {{question.title}}
        </question-title>
    </div>
    
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <question [body]="question.body">
            </question>
        </div>

        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <question-answers [answers]="question.answers"
                              multiply="false"
                              (onChange)="handleAnswersChange($event)">
            </question-answers>
        </div>

        <div class="mdl-cell mdl-cell--12-col text-right">
            <span class="mdl-typography--headline">
                {{questionTimeLeft}}
            </span>

            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" 
                    (click)="handleAddSkill()"
                    [disabled]="!submitAnswerEnabled">
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
    timeLeft: any = 0;
    private timeExpired: boolean = false;
    private timerId: any = 0;
    questionTimeStart: Date;
    questionTimeLeft: string = '';
    question: any = {};
    questionLoaded: boolean = false;

    constructor(private api: API) {
    }

    ngOnInit() {
        console.log(this);
        if (!this.questionLoaded) {
            this.loadQuestion();
        }
    }

    loadQuestion() {
        this.api.nextQuestion().subscribe((res) => {
            this.question = res;
            //this.question.timeLimit = 75;
            this.questionLoaded = true;

            this.prepareTimers();
        }, (err) => {
        });
    }

    prepareTimers() {
        if (Number(this.question.timeLimit) > 0) {
            this.questionTimeStart = new Date();

            if (this.timerId) clearInterval(this.timerId);
            this.timeExpired = false;

            this.timerId = setInterval(() => {
                if (Number(this.question.timeLimit) > 0) {
                    let currentDate = new Date();
                    this.timeLeft = Number(this.question.timeLimit) - Math.floor((currentDate.getTime() - this.questionTimeStart.getTime()) / 1000);
                    console.log(this.timeLeft);

                    if (this.timeLeft > 0) {
                        let seconds = this.timeLeft % 60;
                        let minutes = Math.floor((this.timeLeft / 60)) % 60;

                        this.questionTimeLeft = minutes.toString() + ':' + (("0" + seconds).slice (-2)).toString();
                        this.timeExpired = false;
                    }
                    else {
                        this.questionTimeLeft = '';
                        this.timeExpired = true;
                    }
                }
            }, 500);
        }
    }

    handleAnswersChange(answers) {
        this.submitAnswerEnabled = (answers.length > 0);
    }
}