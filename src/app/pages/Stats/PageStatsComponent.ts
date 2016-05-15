import { Component } from '@angular/core';
import { API } from '../../services/api.service';

@Component({
    selector: 'page-stats',
    template: `
<div *ngIf="statsAvailable">
{{stats}}
</div>
<div *ngIf="!statsAvailable">
    There are no statistics available
</div>

  `
})
export class PageStatsComponent {
    statsAvailable: boolean = true;
    stats: any = null;

    constructor(private api: API) {
    }

    ngOnInit() {
        this.api.getStats().subscribe((res) => {
            this.statsAvailable = (res == null);
            this.stats = res;
        }, (err) => {
        });
    }
}