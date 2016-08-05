import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Button, Editor, Header } from 'primeng/primeng';

import { InternService } from '../shared/intern.service';
import { RestResult } from '../shared/rest-result';
import { TaskReport } from '../shared/task-report';

@Component({
    selector: 'intern-report-editor',
    templateUrl: '/app/shared/intern-report-editor.component.html',
    styles: [`
        textarea[name='Content']{
            height:20em;
        }
       
      
`],
    directives: [Button, Editor, Header]
})
export class InternReportEditorComponent implements OnInit {
    @Input("report") report: TaskReport;
    @Input() taskId: number;
    @Input() isCreateMode: boolean;
    @Output() created = new EventEmitter<TaskReport>();
    @Output() updated = new EventEmitter<TaskReport>();
    @Output() canceled = new EventEmitter<void>();
    @Output() error = new EventEmitter<any>();

    private get mode(): string {
        return this.isCreateMode ? 'New' : 'Update';
    }

    constructor(private internService: InternService) {

    }
    ngOnInit() {
        if (this.isCreateMode) {
            this.report = new TaskReport();
            this.report.TaskId = this.taskId;
        }
    }

    save() {
        if (!this.isCreateMode) {
            this.update();
        }
        else {
            this.create();
        }
    }

    cancel() {
        this.canceled.emit(null);
    }

    private update() {
        this.internService.updateReport(this.report)
            .then((report) => {
                this.updated.emit(this.report);
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private create() {
        this.internService.createReport(this.report)
            .then((report) => {
                this.created.emit(report);
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private handleError(msg: string) {
        this.error.emit(msg);
    }
}