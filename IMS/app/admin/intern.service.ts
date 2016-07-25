import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { RestResult } from '../shared/rest-result';
import { Intern } from './intern';
import { Supervisor } from './supervisor';
import { SupervisingRequest } from './supervising-request';
import { SupervisingResponse } from './supervising-response';
import { SupervisingComment } from './supervising-comment';
import { TaskToDo } from './task-to-do';
import { ManageParticipantRequest } from './manage-participant-request';
import { InternSearchCondition } from './intern-search-condition';
import { AdjustExpiryRequest } from './adjust-expiry-request';

@Injectable()
export class InternService {

    private headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });
    
    constructor(private http: Http) {

    }

    getDetails(internId: number): Promise<Intern> {
        return this.http.post("/Intern/getDetails", JSON.stringify({internId:internId}), { headers: this.headers }).toPromise()
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


    getInterns(condition: InternSearchCondition): Promise<Intern[]> {

        return this.http.post("/Intern/getInterns", JSON.stringify(condition), { headers: this.headers }).toPromise()
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


    getSupervisors(): Promise<Supervisor[]> {
        return this.http.post("/Intern/getSupervisors", JSON.stringify({}), { headers: this.headers }).toPromise()
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

    getSupervisorsForIntern(internId:number): Promise<Supervisor[]> {
        return this.http.post("/Intern/getSupervisorsForIntern", JSON.stringify({ internId:internId}), { headers: this.headers }).toPromise()
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

    handleSupervising(model: SupervisingRequest): Promise<SupervisingResponse> {
        return this.http.post("/Intern/handleSupervising", JSON.stringify(model), { headers: this.headers }).toPromise()
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

    getSupervisingComments(internId: number): Promise<SupervisingComment[]> {
        return this.http.post("/Intern/getSupervisingComments", JSON.stringify({ internId: internId }), { headers: this.headers }).toPromise()
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

    createComment(comment: SupervisingComment): Promise<SupervisingComment> {
        return this.http.post("/Intern/createSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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

    deleteComment(comment: SupervisingComment): Promise<void> {
        return this.http.post("/Intern/deleteSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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


    updateComment(comment: SupervisingComment): Promise<void> {
        return this.http.post("/Intern/updateSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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
    

    /////////////////////////////Manage Task & Participant//////////////////////////////////////////////////////
    getTasksForIntern(internId: number): Promise<TaskToDo[]>{
        return this.http.post("/Intern/getTasksForIntern", JSON.stringify({ id: internId }), { headers: this.headers }).toPromise()
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
    

    getTasks(): Promise<TaskToDo[]> {
        return this.http.post("/Intern/getTasks", JSON.stringify({}), { headers: this.headers }).toPromise()
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
    

    createTask(task: TaskToDo): Promise<TaskToDo> {
        return this.http.post("/Intern/createTask", JSON.stringify(task), { headers: this.headers }).toPromise()
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

    deleteTask(task: TaskToDo): Promise<void> {
        let request = new TaskToDo();
        request.Id = task.Id;
        return this.http.post("/Intern/deleteTask", JSON.stringify(request), { headers: this.headers }).toPromise()
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


    updateTask(task: TaskToDo): Promise<void> {
        let request = new TaskToDo();
        request.Id = task.Id;
        request.Title = task.Title;
        request.Description = task.Description;
        return this.http.post("/Intern/updateTask", JSON.stringify(request), { headers: this.headers }).toPromise()
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

    

    manageParticipant(request: ManageParticipantRequest): Promise<Intern[]> {
        return this.http.post("/Intern/manageParticipant", JSON.stringify(request), { headers: this.headers }).toPromise()
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


    adjustExpiry(request: AdjustExpiryRequest): Promise<Date> {
        return this.http.post("/Intern/adjustExpiry", JSON.stringify(request), { headers: this.headers }).toPromise()
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