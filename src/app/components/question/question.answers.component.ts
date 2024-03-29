import { Component, EventEmitter, ElementRef, ViewChildren } from '@angular/core';
import { QuestionAnswerComponent } from './questions.answer.component';

@Component({
    selector: 'question-answers',
    inputs: [
        'answers',
        'multiply'
    ],
    outputs: [
        'onChange'
    ],
    directives: [
        QuestionAnswerComponent
    ],
    template: `
<div class="question-answers-container">
    <div class="question-answer-option" 
         *ngFor="let answer of answers">
        <question-answer [answer]="answer" 
                         [multiply]="multiply"
                         (onChange)="handleChange($event)">
        </question-answer>
    </div>
</div>
`
})
export class QuestionAnswersComponent {
    elementType: string = 'radio';
    elementInputClass: string = 'mdl-radio__button';

    multiply: string = '';
    answers: Array<any> = [];
    onChange: EventEmitter<any> = new EventEmitter();

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.multiply = JSON.parse(this.multiply);
        if (this.multiply) {
            this.elementType = 'checkbox';
            this.elementInputClass = 'mdl-checkbox__input';
        }
    }

    handleChange(answer) {
        if (!this.multiply) {
            this.answers.map( (e) => {
                e.checked = (e == answer);
                return e;
            });
        }

        let checkedAnwers = this.answers.filter( el => el.checked );
        this.onChange.emit(checkedAnwers);
    }
}