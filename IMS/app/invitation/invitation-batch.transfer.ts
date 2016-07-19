export class InvitationBatchTransfer{
    constructor(public NoticeId: number, public Subject: string, public Content: string, public Emails: string[]) { }
}