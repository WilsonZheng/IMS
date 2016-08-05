import { Supervisor } from '../shared/supervisor';
import { Intern } from '../shared/intern';

export class SupervisingResponse {
    InternId: number;
    SupervisorId: number;
    Supervisors: Supervisor[];
    Interns: Intern[];
}