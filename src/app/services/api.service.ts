import { Inject, Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AppState } from '../app.service';

@Injectable()
export class API {
    API_URL = '/api';
    pingURL = this.API_URL + '/ping';
    wrongURL = this.API_URL + '/throw';
    skillsURL = this.API_URL + '/skills';
    logoutURL = this.API_URL + '/auth/logout';
    loginLinkedInURL = this.API_URL + '/auth/li';
    profileURL = this.API_URL + '/auth/profile';
    http: Http;
    appState: AppState;

    constructor(@Inject(AppState) appState, @Inject(Http) http) {
        this.appState = appState;
        this.http = http;
    }

    ping() : any {
        return this.http
            .get(this.pingURL)
            .catch(this.handleError);
    }

    logout() : any {
        return this.http
            .get(this.logoutURL)
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

        let appState = window['appState'];
        if (appState) {
            appState.addErrorNotification(error.status, err);
        }

        return Observable.throw(err);
    }
}