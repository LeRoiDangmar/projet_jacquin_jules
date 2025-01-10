import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCardCode',
    standalone: false
})
export class FormatCardCodePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    // Supposer que le code est une chaîne de 16 chiffres sans espaces
    return value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

}
