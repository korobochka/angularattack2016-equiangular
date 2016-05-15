import { Inject, Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AppState } from '../app.service';

@Injectable()
export class API {
    API_URL = '/api';
    pingURL : string;
    wrongURL : string;
    skillsURL : string;
    logoutURL : string;
    loginLinkedInURL : string;
    profileURL : string;
    questionsUrl: string;
    nextQuestionURL : string;
    submitAnswerURL : string;

    http: Http;
    appState: AppState;

    constructor(@Inject(AppState) appState, @Inject(Http) http) {
        if (document.location.hostname != "localhost") {
            this.API_URL = "http://korobochka.org:4567/api";
        }

        this.appState = appState;
        // TODO: Use official Angular2 CORS support when merged (https://github.com/angular/angular/issues/4231).
        let _build = (<any> http)._backend._browserXHR.build;
        (<any> http)._backend._browserXHR.build = () => {
            let _xhr =  _build();
            _xhr.withCredentials = true;
            return _xhr;
        };
        this.http = http;

        this.setupEndpoints();
    }

    setupEndpoints() {
        this.pingURL = this.API_URL + '/ping';
        this.wrongURL = this.API_URL + '/throw';
        this.skillsURL = this.API_URL + '/skills';
        this.logoutURL = this.API_URL + '/auth/logout';
        this.loginLinkedInURL = this.API_URL + '/auth/li';
        this.profileURL = this.API_URL + '/profile/0';
        this.nextQuestionURL = this.API_URL + '/test/next_question';
        this.submitAnswerURL = this.API_URL + '/test/submit_answer';
        this.questionsUrl = this.API_URL + '/questions';
    }

    ping() : any {
        return this.http
            .get(this.pingURL)
            .catch(this.handleError);
    }

    logout() : any {
        return this.http
            .post(this.logoutURL, '')
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

    getQuestions() : any {
        return this.http
            .get(this.questionsUrl)
            .map(request => request.json())
            .catch(this.handleError);
    }

    getSkills() : any {
        return this.http
            .get(this.profileURL + "/skills")
            .map(request => request.json())
            .catch(this.handleError);
    }

    createSkill(tag) : any {
        return this.http
            .post(this.profileURL + "/skills", tag)
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

    submitAnswer(answers) : any {
        return this.http
            .post(this.submitAnswerURL, answers)
            .map(request => request.json())
            .catch(this.handleError);
    }

    nextQuestion() : any {
        return this.http
            .post(this.nextQuestionURL, '')
            .map(request => request.json())
            .catch(this.handleError);
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