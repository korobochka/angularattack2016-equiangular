import { Directive, Inject, ElementRef } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';

// external
var marked = require('markdown-converter');
//import { Prism } from 'prismjs';

//@Directive({
@Directive({
    selector: 'markdown',
    inputs: [ 'src' ],
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

    ngOnInit() {
        if (this.src != '') {
            this.fromRAW(this.src);
        }
        else {
            this.fromRAW(this.element.innerHTML);
        }
    }

    ngOnChanges() {
        if (this.src != '') {
            this.fromRAW(this.src);
        }
        else {
            this.fromRAW(this.element.innerHTML);
        }
    }

    fromRAW(raw) {
        if (raw) {
            let html = this.process(this.prepare(raw));

            this.element.innerHTML = html;
            this.highlight(html);
        }
        else {
            this.element.innerHTML = '';
        }
    }

    prepare(raw) {
        if (raw) {
            return raw.split('\n').map((line) => line.trim()).join('\n')
        }
        else return '';
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