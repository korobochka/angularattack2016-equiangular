import { Component } from '@angular/core';
import { API } from '../../services/api.service';

@Component({
    selector: 'md',
    template: `
  <md-card>
    <h1>
      Test
    </h1>
    
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            <markdown>
                ### H3
                Some text here
                #### Emphasis
                *single asterisks*
            </markdown>
        </div>

        <div class="mdl-cell mdl-cell--6-col mdl-shadow--2dp">
            Answers here
        </div>

        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" (click)="handleAddSkill()" style="float: right">
            <i class="material-icons">add</i> Submit Answer
        </button>
    </div>
  </md-card>

  `
})
export class PageTestComponent {
    inProgress: boolean = false;
    requestCompleted: boolean = false;
    response: string = '';
    profile: any = {}
    add_skill_name: string = '';

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
}