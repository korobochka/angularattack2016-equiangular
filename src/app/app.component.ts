import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { RouterActive } from './router-active';

/*
 * App Component
 */
@Component({
    selector: 'app',
    pipes: [ ],
    providers: [ ],
    directives: [ RouterActive ],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('normalize.css'),
        require('../assets/css/styles.css'),
    ],
    template: `
    <md-content style="height: 100%">
      <md-toolbar color="primary">
          <button md-button router-active [routerLink]=" ['About'] ">
            About
          </button>

          <button md-button router-active [routerLink]=" ['Test'] ">
            Test
          </button>

          <button md-button router-active [routerLink]=" ['Profile'] ">
            Profile
          </button>

          <button md-button router-active [routerLink]=" ['Markdown'] ">
            Markdown
          </button>

          <button md-button router-active [routerLink]=" ['API'] ">
            API
          </button>

          <button md-button router-active [routerLink]=" ['Login'] ">
            Login
          </button>

          <span class="fill"></span>

          <button md-raised-button>
            Raised Button
          </button>
      </md-toolbar>
      
      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <div class="content-container">
          <router-outlet></router-outlet>
      </div>
      
      <footer>
        &copy; Made by Equiangular Team for&nbsp;<a href="https://www.angularattack.com/" target="_blank">Angular Attack</a>&nbsp;hackathon. May 14-15, 2016
      </footer>
  </md-content>
  `
})
@RouteConfig([
//    { path: '/',      name: 'Index', component: Home, useAsDefault: true },
//    { path: '/home',  name: 'Home',  component: Home },
    { path: '/', name: 'About', useAsDefault: true, loader: () => require('es6-promise!./pages/about/PageAboutComponent')('PageAboutComponent') },
    { path: '/test', name: 'Test', loader: () => require('es6-promise!./pages/test/PageTestComponent')('PageTestComponent') },
    { path: '/profile', name: 'Profile', loader: () => require('es6-promise!./pages/profile/PageProfileComponent')('PageProfileComponent') },
    { path: '/login', name: 'Login', loader: () => require('es6-promise!./pages/login/PageLoginComponent')('PageLoginComponent') },
    { path: '/markdown', name: 'Markdown', loader: () => require('es6-promise!./pages/markdown/PageMarkdownComponent')('PageMarkdownComponent') },
    { path: '/api', name: 'API', loader: () => require('es6-promise!./pages/api/PageAPIComponent')('PageAPIComponent') }
])
export class App {
    loading = false;

    constructor(public appState: AppState) {
    }

    ngOnInit() {
    }
}