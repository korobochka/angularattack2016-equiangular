import { Component } from '@angular/core';
import { API } from '../../services/api.service';

@Component({
    selector: 'md',
    template: `
    <h1>
      API caller
    </h1>

    <button md-raised-button [disabled]="inProgress" (click)="handlePingClick()">
        Ping
    </button>

    <button md-raised-button [disabled]="inProgress" (click)="handleWrongCallClick()">
        Call wrong endpoint
    </button>

    <md-progress-circle mode="indeterminate" *ngIf="inProgress"></md-progress-circle>
    
    <pre *ngIf="requestCompleted">{{response | json}}</pre>
  `
})
export class PageAPIComponent {
    inProgress: boolean = false;
    requestCompleted: boolean = false;
    response: string = '';

    constructor(private api: API) {
    }

    handlePingClick() {
        this.inProgress = true;
        this.requestCompleted = false;
        this.response = '';
        this.api.ping().subscribe(res => {
            this.inProgress = false;
            this.requestCompleted = true;
            this.response = res;
        });
    }

    handleWrongCallClick() {
        this.inProgress = true;
        this.api.wrong().subscribe(res => {
            this.inProgress = false;
            this.requestCompleted = true;
            this.response = res;
        });
    }

    ngOnInit() {
    }
}