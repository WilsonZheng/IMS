
import { RoleName } from './role-name';

 
//Represents a login user.
export class User {
    Id: number;
    UserName: string;
    Roles: string[];

    public hasRole(role: string): boolean{
        return (this.Roles != undefined) &&
            (this.Roles.find(function (val) { return val == role;}) != undefined);
    }
}