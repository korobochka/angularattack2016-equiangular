import { Component } from '@angular/core';

@Component({
    selector: 'question-title',
    inputs: [ 'title' ],
    template: `
        <h4>
          {{title}}
          <ng-content></ng-content>
        </h4>
  `
})
export class QuestionTitleComponent {
}