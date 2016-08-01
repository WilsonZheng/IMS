export class TaskInvolvement {
    public TaskId: number;
    public TaskName: string;
    public SuperVisorId: number;
    public SupervisorName: string;
    public JoinAt: Date;
    public LeftAt: Date;
    public IsClosed: boolean;
    public TaskClosedAt: Date;
}