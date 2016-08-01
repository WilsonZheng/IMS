import { Intern } from './intern';
export class TaskToDo {
    public Id: number;
    public SupervisorId: number;
    public SupervisorName: string;
    public Title: string;
    public Description: string;
    public Participants: Intern[];
    public IsClosed: boolean;

}