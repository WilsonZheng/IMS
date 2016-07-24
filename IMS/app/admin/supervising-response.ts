import { Supervisor } from './supervisor';
import { Intern } from './intern';

export class SupervisingResponse {
    InternId: number;
    SupervisorId: number;
    Supervisors: Supervisor[];
    Interns: Intern[];
}