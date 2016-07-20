import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Button, Editor, Header } from 'primeng/primeng';

import {TemplateService} from './shared/template.service';
import {Template} from './template';
import {RestResult} from '../shared/rest-result';

@Component({
    selector: 'inv-notice-editor',
    templateUrl:'/app/invitation/notice-editor.component.html',
    styleUrls: ['/app/invitation/notice-editor.component.css'],
    directives: [Button,Editor,Header]
})
export class NoticeEditorComponent implements OnInit {
    @Input("notice") currentNotice: Template;
    @Input() isCreateMode: boolean;
    @Output() created = new EventEmitter<Template>();
    @Output() updated = new EventEmitter<Template>();
    @Output() canceled = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();

    private notice: Template = new Template();
    
    constructor(private templateService: TemplateService) {
        this.templateService = templateService;
    }
    ngOnInit() {
         if (!this.isCreateMode) {
            this.templateService.getTemplate(this.currentNotice.Id)
                .then(result => {
                    this.notice = result;
                })
                .catch(error => { this.handleError(error); });
        } 
    }
    
    saveNotice() {
        if (!this.isCreateMode) {
            this.updateNotice();
        }
        else {
            this.createNotice();
        }
    }

    cancelNotice() {
        this.canceled.emit(null);
    }

    private updateNotice() {
        this.templateService.updateTemplate(this.notice)
            .then(() => {
                this.updated.emit(this.notice);
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private createNotice() {
        this.templateService.createTemplate(this.notice)
            .then((notice) => {
                this.created.emit(notice);
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    
    private handleError(msg: string) {
        this.error.emit(msg);
    }
}