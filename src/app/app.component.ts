/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
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
    <md-content>
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

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
      
      <footer>
        &copy; Made by Equiangular Team for&nbsp;<a href="https://www.angularattack.com/" target="_blank">Angular Attack</a>&nbsp;hackathon. May 14-15, 2016
      </footer>
      </md-content>
  `
})
@RouteConfig([
//    { path: '/',      name: 'Index', component: Home, useAsDefault: true },
//    { path: '/home',  name: 'Home',  component: Home },
    // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
    { path: '/', name: 'About', useAsDefault: true, loader: () => require('es6-promise!./pages/about/PageAboutComponent')('PageAboutComponent') },
    { path: '/test', name: 'Test', loader: () => require('es6-promise!./pages/test/PageTestComponent')('PageTestComponent') },
    { path: '/profile', name: 'Profile', loader: () => require('es6-promise!./pages/profile/PageProfileComponent')('PageProfileComponent') },
    { path: '/login', name: 'Login', loader: () => require('es6-promise!./pages/login/PageLoginComponent')('PageLoginComponent') },
    { path: '/markdown', name: 'Markdown', loader: () => require('es6-promise!./pages/markdown/PageMarkdownComponent')('PageMarkdownComponent') },
    { path: '/api', name: 'API', loader: () => require('es6-promise!./pages/api/PageAPIComponent')('PageAPIComponent') }
])
export class App {
    loading = false;

    constructor(
        public appState: AppState) {

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */