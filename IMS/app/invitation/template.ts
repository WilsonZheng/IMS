import { TemplateContent } from './template-content';
import { RecruitStatus } from './recruit-status';
import { Invitation } from './invitation';
export class Template {
    Id: number;
    Name: string;
    Content: TemplateContent;
    RecruitStatus: RecruitStatus;
    Invitations: Invitation[];
    CreatedAt: string;
    CreatedAtDate: Date;
    constructor() {
        this.Content = new TemplateContent();
        this.RecruitStatus = new RecruitStatus();
    }
}