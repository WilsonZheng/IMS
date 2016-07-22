import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { RestResult } from '../shared/rest-result';
import { Intern } from './intern';

@Injectable()
export class InternService {

    private headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });
    
    constructor(private http: Http) {

    }

    getInterns(): Promise<Intern[]> {

        return this.http.post("/Intern/getInterns", JSON.stringify({}), { headers: this.headers }).toPromise()
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