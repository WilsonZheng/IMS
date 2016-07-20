import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Template } from '../template';
import { TemplateContent } from '../template-content';
import { RestResult } from '../../shared/rest-result';
import { RecruitStatus } from '../recruit-status';

@Injectable()
export class TemplateService {

     private headers: Headers = new Headers({
        'Content-Type': 'application/json'
     });


    constructor(private http: Http) {

    }

    getTemplates(): Promise<Template[]> {
       
        return this.http.post("/TemplateManage/Templates",JSON.stringify({}),{ headers: this.headers }).toPromise()
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


    deleteTemplate(id: number): Promise<void> {
        return this.http.delete("/TemplateManage/DeleteTemplate/"+id).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else{
                    return;
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    
    getTemplate(id: number): Promise<Template> {
        
        return this.http.post("/TemplateManage/GetTemplate",JSON.stringify({id:id}),{ headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else
                {
                    return result.Data;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    getEmailTemplateContent(id:number): Promise<TemplateContent> {
       
        return this.http.post("/TemplateManage/EmailTemplateContent", JSON.stringify({id:id}), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return result.Data;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    updateTemplate(template: Template): Promise<void> {
        
       
        return this.http.put("/TemplateManage/UpdateTemplate", JSON.stringify(template), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    createTemplate(template: Template): Promise<Template> {

       
        return this.http.post("/TemplateManage/CreateTemplate", JSON.stringify(template), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return result.Data;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }


    getRecruitStatus(id: number): Promise<RecruitStatus> {
         return this.http.post("/Invitation/RecruitStatus", JSON.stringify({ id: id }), { headers: this.headers }).toPromise()
            .then(response => {
                var result: RestResult = response.json();
                if (result.Error) {
                    return Promise.reject(result.Error);
                }
                else {
                    return result.Data;
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
    
}