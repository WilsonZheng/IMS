import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RestResult } from '../shared/rest-result';
import { AccountUser } from '../shared/account-user';

@Injectable()
export class AccountService {

    private headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {

    }

    release(userId: number): Promise<void> {
        return this.http.post("/ImsAccount/ReleaseLock", JSON.stringify({ userId: userId }), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return;
                }

            }).catch((error) => {
                return Promise.reject(error);
            });
    }

    lock(userId: number): Promise<void> {
        return this.http.post("/ImsAccount/Lock", JSON.stringify({ userId: userId }), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return;
                }

            }).catch((error) => {
                return Promise.reject(error);
            });
    }


    resetPassword(userId: number): Promise<void> {
        return this.http.post("/ImsAccount/ResetPassword", JSON.stringify({ userId: userId }), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return;
                }

            }).catch((error) => {
                return Promise.reject(error);
            });
    }

    getUsers(): Promise<AccountUser[]> {
        return this.http.post("/ImsAccount/GetUsers", JSON.stringify({}), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return result.Data;
                }

            }).catch((error) => {
                return Promise.reject(error);
            });
    }

}