import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'magicName',
})
export class NamePipe implements PipeTransform {
    transform(value: string): string {
        return value
            .split('')
            .map((c, index) => (index % 2 ? c.toLowerCase() : c.toUpperCase()))
            .join('');
    }
}
