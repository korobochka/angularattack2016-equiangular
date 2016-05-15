import { Component } from '@angular/core';

@Component({
    selector: 'question-title',
    inputs: [ 'title' ],
    template: `
        <h3>
          {{title}}
          <ng-content></ng-content>
        </h3>
  `
})
export class QuestionTitleComponent {
}