import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
    selector: 'about',
    styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    md-card{
      margin: 25px;
    }
  `],
    template: `
  <md-card>
    For hot module reloading run
    <pre>npm run start:hmr</pre>
  </md-card>
  <md-card>
    <h1>
      hello to all!
    </h1>
    <markdown>
    # H1
    ## H2
    Some text here
    #### Emphasis
    *single asterisks*
    
    _single underscores_
    
    **double asterisks**
    
    __double underscores__
    
    #### Code
    \`\`There is a literal backtick (\`) here.\`\`
    
    #### Lists and horizontal seprators
    This is [an example](http://example.com/ "Title") inline link.
    * * *
    *   Red
    *   Green
    *   Blue
    ***
    +   Red
    +   Green
    +   Blue
    *****
    -   Red
    -   Green
    -   Blue

    #### Images
    ![Alt text](http://s2.quickmeme.com/img/d0/d0374478557798edfc964afd006512de457207f70346d8e2ef524a98afd73578.jpg "Optional title")
    </markdown>
  </md-card>

  `
})
export class About {
    constructor() {

    }

    ngOnInit() {
        // static data that is bundled
        // var mockData = require('assets/mock-data/mock-data.json');
        // console.log('mockData', mockData);
        // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
        // this.asyncDataWithWebpack();
    }

    asyncDataWithWebpack() {
        // you can also async load mock data with 'es6-promise-loader'
        // you would do this if you don't want the mock-data bundled
        // remember that 'es6-promise-loader' is a promise
        // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
        // setTimeout(() => {
        //
        //   let asyncDataPromise = asyncMockDataPromiseFactory();
        //   asyncDataPromise.then(json => {
        //     console.log('async mockData', json);
        //   });
        //
        // });
    }

}