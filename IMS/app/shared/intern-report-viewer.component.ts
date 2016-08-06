//Description: Display the intern's task report.
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Button,Header } from 'primeng/primeng';
import { TaskReport } from '../shared/task-report';

@Component({
    selector: 'intern-report-viewer',
    templateUrl: '/app/shared/intern-report-viewer.component.html',
    styles: [`
            .ims-content{
                white-space:pre-line;
            }

            .panel{
                margin-bottom:1px;
            }
      
            .ims-content-container{
                border:1px solid #e1e1e8;
                border-radius:8px;
                background-color:#f7f7f9;
                padding:8px;
            }
`],
    directives: [Header]
})
export class InternReportViewerComponent{
    @Input("report") report: TaskReport;
    @Output() viewCancelled = new EventEmitter<void>();
     

    constructor() {

    }
   

   

    cancel() {
        this.viewCancelled.emit(null);
    }

   

   
}