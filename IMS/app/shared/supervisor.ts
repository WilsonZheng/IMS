import { Intern } from './intern';


export class Supervisor {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public FullName: string;
    public Interns: Intern[];
    public IsLockedout: boolean;
}