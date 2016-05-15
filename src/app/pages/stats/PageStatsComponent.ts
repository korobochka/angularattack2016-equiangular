import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { Router } from '@angular/router-deprecated';
import { AppState } from '../../app.service';

@Component({
    selector: 'page-stats',
    template: `
    <h3 class="page-title">Statistics</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
            <div *ngIf="statsAvailable">
                <h4>Total Answers Submitted: <strong>{{stats.answersSubmitted}}</strong></h4>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 50%">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__cell--non-numeric">Skill</th>
                      <th>Total Answers</th>
                      <th>Correct Answers</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let skill of stats.skillResults">
                      <td class="mdl-data-table__cell--non-numeric">{{skill.skill}}</td>
                      <td>{{skill.totalAnswers}}</td>
                      <td>{{skill.correctAnswers}}</td>
                      <td>{{skill.percentage}}</td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div *ngIf="!statsAvailable">
                There are no statistics available
            </div>
        </div>
    </div>

  `
})
export class PageStatsComponent {
    statsAvailable: boolean = false;
    stats: any = null;

    constructor(private api: API, private router: Router, private appState: AppState) {
    }

    ngOnInit() {
        if (!this.appState['loggedin']) {
            this.router.navigateByUrl("/");
        }
        else {
            this.loadStats();
        }
    }

    loadStats() {
        this.getStats();
    }

    getStats() {
        this.api.getStats().subscribe((res) => {
            this.statsAvailable = (res != null);

            this.stats = res;

            let skillResults = [];
            if (this.stats.skillResults) {
                for (var k in this.stats.skillResults) {
                    let v = this.stats.skillResults[k];
                    let percentage = 0;
                    if (v.totalAnswers) {
                        percentage = Math.floor((v.correctAnswers / v.totalAnswers) * 100);
                    }
                    skillResults.push(Object.assign({ skill: k, percentage: percentage }, v));
                }
            }
            this.stats.skillResults = skillResults;
        }, (err) => {
        });
    }
}