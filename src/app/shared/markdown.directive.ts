import { Directive, Inject, ElementRef } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';

// external
var marked = require('markdown-converter');
//import { Prism } from 'prismjs';

//@Directive({
@Directive({
    selector: 'markdown',
    inputs: [ 'src', 'data' ],
    providers: [ HTTP_PROVIDERS ]
})
export class MarkdownComponent {
    element: any;
    http: Http;
    src: string;
    data: string;

    constructor (@Inject(ElementRef) elementRef, @Inject(Http) http) {
        // used for http requests
        this.http = http;
        // reference to the DOM element
        this.element = elementRef.nativeElement;
    }

    ngOnInit () {
        // element with 'data' attribute set
        if (this.data) {
            this.fromData(this.data);
        }
        // element containing markdown
        if (!this.src) {
            this.fromRAW();
        }
    }

    fromData(data) {
        let raw = data;
        let html = this.process(this.prepare(raw));
        this.element.innerHTML = html;
        this.highlight(html);
    }

    fromRAW() {
        let raw = this.element.innerHTML;
        let html = this.process(this.prepare(raw));
        this.element.innerHTML = html;
        this.highlight(html);
    }

    prepare(raw) {
        return raw.split('\n').map((line) => line.trim()).join('\n')
    }

    process(markdown) {
        let result = '';
        marked(markdown, function(err, content) {
            if (err) throw err;
            result = content;
        })
        return result;
    }

    highlight(html){
        //Prism.highlightAll();
    }
}