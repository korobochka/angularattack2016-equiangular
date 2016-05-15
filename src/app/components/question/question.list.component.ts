import { Component } from '@angular/core';
declare var componentHandler: any;

@Component({
    selector: 'question-list',
    providers: [
    ],
    template: `
<table class="mdl-data-table mdl-js-data-table" style="width: 100%">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Material</th>
      <th>Quantity</th>
      <th>Unit price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
      <td>25</td>
      <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
      <td>50</td>
      <td>$1.25</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
      <td>10</td>
      <td>$2.35</td>
    </tr>
  </tbody>
</table>
  `
})
export class QuestionListComponent {
    constructor() {
        console.log('QuestionListComponent');
    }

    ngOnChanges() {
    }
}