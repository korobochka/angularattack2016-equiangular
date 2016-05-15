import { Component, EventEmitter, ElementRef, ViewChildren } from '@angular/core';

@Component({
    selector: 'question-answer',
    inputs: [ 'answer', 'multiply' ],
    outputs: [ 'onChange' ],
    template: `
<label class="mdl-{{elementType}} mdl-js-{{elementType}} mdl-js-ripple-effect" htmlFor="option-{{answer.id}}">
    <input [type]="elementType" [class]="elementInputClass" id="option-{{answer.id}}" name="question-answers" [value]="answer.id" (change)="handleChange(answer)">
    <span class="mdl-{{elementType}}__label">
        {{answer.body}}
    </span>
</label>
`
})
export class QuestionAnswerComponent {
    private elementType: string = 'radio';
    private elementInputClass: string = 'mdl-radio__button';
    onChange: EventEmitter<any> = new EventEmitter();
    answer: any;
    multiply: string = '';

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        if (this.multiply) {
            this.elementType = 'checkbox';
            this.elementInputClass = 'mdl-checkbox__input';
        }
    }

    handleChange(e) {
        let result = false;

        let el = this.elementRef.nativeElement;
        if (el) {
            result = el.querySelector("input").checked;
        }
        this.answer.checked = result;

        this.onChange.emit(this.answer);
    }
}