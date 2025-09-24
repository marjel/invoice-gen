import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phones'
})
export class PhonesPipe implements PipeTransform {

  transform(phones: string[]): string {
    if (!phones || phones.length === 0) return '';

    return phones
      .map(phone => this.formatPhone(phone))
      .join(', ');
  }

  private formatPhone(phone: string): string {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    const parts = digits.match(/.{1,3}/g) || [];
    return parts.join('-');
  }

}
