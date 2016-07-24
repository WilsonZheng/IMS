import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'bracketDateTransform' })
export class BracketDateTransformPipe implements PipeTransform {
    transform(value: string): Date {
        let datenumber: number = parseInt(value.replace(/\D/g, ''));
        return new Date(datenumber);
    }
}