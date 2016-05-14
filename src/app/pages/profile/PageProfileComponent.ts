import { Component } from '@angular/core';
import { API } from '../../services/api.service';

@Component({
    selector: 'md',
    template: `
  <md-card>
    <h1>
      {{profile.name}}
    </h1>
    
    <ul class="mdl-list">
        <li class="mdl-list__item" *ngFor="let tag of profile.intendedSkills">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons  mdl-list__item-avatar">person</i>
                {{tag}}
            </span>

            <span class="mdl-list__item-secondary-action">
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-1">
                    <input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input" checked />
                </label>
            </span>
        </li>
    </ul>
    
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">Skills</th>
              <th>Score</th>
              <th>Uncertainity</th>
            </tr>
        </thead>
        
        <tbody>
            <tr *ngFor="let tag of profile.intendedSkills">
              <td class="mdl-data-table__cell--non-numeric">{{tag}}</td>
              <td>25</td>
              <td>$2.90</td>
            </tr>
        </tbody>
    </table>

    <md-progress-circle mode="indeterminate" *ngIf="inProgress"></md-progress-circle>
    
    <pre *ngIf="requestCompleted">{{response | json}}</pre>
  </md-card>

  `
})
export class PageProfileComponent {
    inProgress: boolean = false;
    requestCompleted: boolean = false;
    response: string = '';
    profile: any = {}

    constructor(private api: API) {
        this.api.profile().subscribe((res) => {
            this.profile = res;
            console.log('profile', this.profile);
        }, (err) => {
            console.log('err', err);
        });
    }

    ngOnInit() {
    }
}