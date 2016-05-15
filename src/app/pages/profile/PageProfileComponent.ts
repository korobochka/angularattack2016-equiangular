import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { Router } from '@angular/router-deprecated';
import { AppState } from '../..//app.service';
declare var componentHandler: any;

@Component({
    selector: 'md',
    template: `
    <h3 class="page-title">
        Profile
        <span class="mdl-typography--headline">
            {{profile.name}}
        </span>
    </h3>
    
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <ul class="mdl-list">
                <li class="mdl-list__item" *ngFor="let skill of profile.intendedSkills">
                    <span class="mdl-list__item-primary-content">
                        <i class="material-icons">done</i> {{skill.title}}
                    </span>
        
                    <span class="mdl-list__item-secondary-action">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" (click)="handleRemoveSkill(skill)">
                            <i class="material-icons">remove</i>
                        </button>
                    </span>
                </li>
            </ul>

            <div style="padding: 0 20px;">
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="add_skill" [(ngModel)]="add_skill_name">
                    <label class="mdl-textfield__label" for="add_skill">Skill To Add...</label>
                </div>
  
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect" (click)="handleAddSkill()">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </div>

        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <ul class="mdl-list">
                <li class="mdl-list__item" *ngFor="let skill of profile.intendedSkills">
                    <span class="mdl-list__item-primary-content">
                        <i class="material-icons">done</i> {{skill.title}}
                    </span>
        
                    <span class="mdl-list__item-secondary-action">
                        <div *ngIf="inPendingStatus(skill)" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                    </span>
                </li>
            </ul>
        </div>

        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                    <tr>
                      <th class="mdl-data-table__cell--non-numeric">Skills</th>
                      <th>Score</th>
                      <th>Uncertainity</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr *ngFor="let skill of profile.intendedSkills">
                      <td class="mdl-data-table__cell--non-numeric">{{skill.title}}</td>
                      <td>25</td>
                      <td>$2.90</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

  `
})
export class PageProfileComponent {
    inProgress: boolean = false;
    requestCompleted: boolean = false;
    response: string = '';
    profile: any = {}
    add_skill_name: string = '';
    pendingAddSkills: string[] = [];
    pendingRemovalSkills: string[] = [];

    constructor(private api: API, private router: Router, private appState: AppState) {
        this.api.profile().subscribe((res) => {
            this.profile = res;
            console.log('profile', this.profile);
            this.appState['loggedin'] = true;
            console.log(this.appState._state);
        }, (err) => {
        });
    }

    ngOnInit() {
        if (!this.appState['loggedin']) {
            this.router.navigateByUrl("/");
        }
        else {
            this.reloadSkills();
        }
    }

    inPendingStatus(skill: string) {
        return (this.pendingRemovalSkills.concat(this.pendingAddSkills).indexOf(skill) != -1);
    }

    reloadSkills() {
        this.api.getSkills().subscribe((res) => {
            this.profile.intendedSkills = res;
            this.pendingAddSkills = this.pendingAddSkills.filter(skill =>
                this.profile.intendedSkills.indexOf(skill) != -1
            );
            //componentHandler.upgradeDom();
        }, (err) => {
        });
    }

    handleAddSkill() {
        if (this.add_skill_name) {
            this.profile.intendedSkills.push(this.add_skill_name);
            this.pendingAddSkills.push(this.add_skill_name);
            this.api.createSkill(this.add_skill_name).subscribe((res) => {
                this.pendingAddSkills = this.pendingAddSkills.filter(skill => skill != this.add_skill_name);
                this.reloadSkills();
                this.add_skill_name = '';
            }, (err) => {
            });
        }
    }

    handleRemoveSkill(tag) {
        this.pendingRemovalSkills.push(tag);
        this.api.deleteSkill(tag).subscribe((res) => {
            this.pendingRemovalSkills = this.pendingRemovalSkills.filter(skill => skill != tag);
            this.profile.intendedSkills = this.profile.intendedSkills.filter(skill => skill != tag);
        }, (err) => {
        });
    }
}