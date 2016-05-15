import { Component } from '@angular/core';

@Component({
    selector: 'question-answers',
    inputs: [ 'answers' ],
    template: `
      <pre>{{answers | json}}</pre>
  `
})
export class QuestionAnswersComponent {
    constructor() {
    }

    ngOnInit() {
    }
}