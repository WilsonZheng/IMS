import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { DataTable, Column, Header, Button, Editor } from 'primeng/primeng';

import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';
import { SupervisingRequest } from './supervising-request';
import { ManageInternUpdateCode } from './manage-intern-update-code';
import { SupervisingComment } from './supervising-comment';

import { GlobalConstant } from '../shared/global-constant'

import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';

@Component({
    templateUrl: '/app/admin/intern-comment.component.html',
    styles: [`

.ims-body-container{
    margin-bottom:0px;
}

.ims-comment-container{
    padding:0px;
    margin-top:2px;
}

.ims-comment-container .ims-comment-input{
     height:8em;
 }

.ims-comment-container .ims-comment-control{
    padding-top:2px;
}

.ims-content-display-area{
    white-space:pre-line;
}

.ims-comment-date{
    font-style:italic;
    font-weight:700;
}


    `],
    directives: [DataTable, Column, Header, Button, Editor],
    providers: [],
    pipes: [BracketDateTransformPipe]
})
export class InternCommentComponent implements OnInit {

    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;

    //reset commentToBeEditted into add mode whenever internId changes.
    private resetCommentInputSub: Subscription;



    //hint for whether or not to display view.
    private get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }

    //global queryParams.
    private queryParams: any;


    private headerRows: any[];

    private supervisingComments: SupervisingComment[] = [];
    private commentSelected: SupervisingComment;
    private commentToBeEditted: SupervisingComment = new SupervisingComment();
    
    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute) { }



    ngOnInit() {
        this.headerRows = [
            {
                columns: [
                    { header: "Search", filter: true, field: "Comment", filterMatchMode: "contains"}
                ]
            }
        ];

        //When selected intern changes, reset commentInput to be in create comment mode.
        this.resetCommentInputSub = this.router.routerState.queryParams.subscribe((params) => {
            let internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
            if (internId != this.internId) {
                this.resetCommentInput();
            }
        });

        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                let internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                //only when getting a new internId in queryParams, fetch fresh supervising comments.
                //otherwise, do nothing.
                if (internId != GlobalConstant.NUMBER_NOTHING && this.internId != internId) {
                    this.supervisingComments.splice(0, this.supervisingComments.length);
                    this.internService.getSupervisingComments(internId)
                        .then((comments) => this.supervisingComments=comments)
                        .catch((error) => this.handleError(error));
                }
                //update internId
                this.internId = internId;
            });
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
        this.resetCommentInputSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }

    private onSelected(comment: SupervisingComment) {
        let commentToBeEditted = new SupervisingComment();
        commentToBeEditted.Id = comment.Id;
        commentToBeEditted.Comment = comment.Comment;
        this.commentToBeEditted = commentToBeEditted;
    }

    private onUnselected(comment: SupervisingComment) {
        this.resetCommentInput();
    }


    //The view for manipulating comment must be in the create mode if no comment is not selected now.
    private resetCommentInput() {
        this.commentToBeEditted = new SupervisingComment();
    }
    
    private create() {
        //When creating a new one, set the internId mannually.
        this.commentToBeEditted.InternshipId = this.internId;
        this.internService.createComment(this.commentToBeEditted).then((comment) => {
            this.supervisingComments.splice(0, 0, comment);
            this.resetCommentInput();
        })
        .catch((error) => this.handleError(error));
    }

    private delete() {
        this.internService.deleteComment(this.commentToBeEditted).then(() => {
            for (let i = 0; i < this.supervisingComments.length; i++) {
                if (this.supervisingComments[i].Id == this.commentToBeEditted.Id) {
                    this.supervisingComments.splice(i, 1);
                    this.resetCommentInput();
                    break;
                }
            }
        }).catch((error) => this.handleError(error));
    }
    
    private update() {
        this.internService.updateComment(this.commentToBeEditted).then(() => {
            this.commentSelected.Comment = this.commentToBeEditted.Comment;
        }).catch((error) => this.handleError(error));
    }
}