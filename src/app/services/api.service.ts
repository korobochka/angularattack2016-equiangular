import { Inject, Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class API {
    API_URL = 'http://korobochka.org:4567/api';
    pingURL = this.API_URL + '/ping';
    wrongURL = this.API_URL + '/throw';
    http: Http;

    constructor(@Inject(Http) http) {
        this.http = http;
    }

    ping() : any {
        return this.http
            .get(this.pingURL)
            .catch(this.handleError);
    }

    wrong() : any {
        return this.http
            .get(this.wrongURL)
            .catch(this.handleError);
    }

    handleError(error) {
        let err = (error.json().error) || 'Server error';
        return Observable.throw(err);
    }
}