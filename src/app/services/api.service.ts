import { Inject, Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class API {
    API_URL = '/api';
    pingURL = this.API_URL + '/ping';
    wrongURL = this.API_URL + '/throw';
    skillsURL = this.API_URL + '/skills';
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

    getSkills() : any {
        return this.http
            .get(this.skillsURL)
            .map(request => request.json())
            .catch(this.handleError);
    }

    createSkill(tag) : any {
        return this.http
            .post(this.skillsURL, tag)
            .catch(this.handleError);
    }

    deleteSkill(tag) : any {
        // Workaround implementation

        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete,
        });

        return this.http
            .request(this.skillsURL + "/" + tag.id, requestOptions)
            .catch(this.handleError);
    }

    submitAnswer() : any {
    }

    nextQuestion() : any {
    }

    handleError(error) {
        let err = JSON.parse(error['_body']);
        err.error = true;
        // TODO: Add nice error handling and display
        console.log(err);
        return Observable.throw(err);
    }
}