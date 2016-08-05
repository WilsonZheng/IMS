import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { RestResult } from '../shared/rest-result';


@Injectable()
export class UserInformationService {


    private user: User;

    get User(): User {
        return this.user;
    }


    private headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });
      
    
    constructor(private http: Http) {

    }
    
    fetchUser(): Promise<User> {
       return this.http.post("/UserInfo/GetUser", JSON.stringify({}), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    let data:any = result.Data;
                    let user:any = new User();
                    user.Id = data.Id;
                    user.Roles = data.Roles;
                    user.UserName = data.UserName;
                    this.user = user;
                    return user;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }   

}