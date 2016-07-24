import { TaskToDo } from './task-to-do';
import { Supervisor } from './supervisor';

export class Intern {
    public Id: number;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public CommenceAt: Date;
    public ExpiryAt: Date;
    public TaskToDos: TaskToDo[];
    public Supervisors: Supervisor[];
}