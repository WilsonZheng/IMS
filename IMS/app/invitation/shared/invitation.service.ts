import { Injectable } from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { InvitationBatchTransfer } from '../invitation-batch.transfer';
import { RestResult } from './rest-result';
import { Invitation } from '../invitation';
import { RecruitStatusCode } from '../../shared/recruit-status-code';

@Injectable()
export class InvitationService {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {

    }

    sendInvitation(batch: InvitationBatchTransfer): Promise<void> {
        return this.http.post("/Invitation/Send", JSON.stringify(batch), { headers: this.headers }).toPromise()
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

    getInvitations(noticeIds: number[], recruitStatusCodes: RecruitStatusCode[]): Promise<Invitation[]> {
        return this.http.post("/Invitation/Search", JSON.stringify({ NoticeIds: noticeIds||[], RecruitStatusCodes: recruitStatusCodes||[] }), { headers: this.headers }).toPromise()
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