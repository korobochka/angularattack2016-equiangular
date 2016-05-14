import { Component } from '@angular/core';

@Component({
    selector: 'md',
    template: `
  <md-card>
    <h1>
      Example of Markdown
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
export class PageMarkdownComponent {
    constructor() {

    }

    ngOnInit() {
    }
}