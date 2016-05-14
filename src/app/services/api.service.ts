import { Inject, Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class API {
    API_URL = '/api';
    pingURL = this.API_URL + '/ping';
    wrongURL = this.API_URL + '/throw';
    loginLinkedInURL = this.API_URL + '/auth/li';
    profileURL = this.API_URL + '/auth/profile';
    http: Http;

    constructor(@Inject(Http) http) {
        this.http = http;
    }

    ping() : any {
        return this.http
            .get(this.pingURL)
            .catch(this.handleError);
    }

    profile() : any {
        return this.http
            .get(this.profileURL)
            .map(request => request.json())
            .catch(this.handleError);
    }

    wrong() : any {
        return this.http
            .get(this.wrongURL)
            .catch(this.handleError);
    }

    handleError(error) {
        let err = JSON.parse(error['_body']);
        err.error = true;
        console.log(err);
        return Observable.throw(err);
    }
}