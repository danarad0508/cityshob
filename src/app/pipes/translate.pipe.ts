import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  standalone: true,
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(key: any, params?: { [key: string]: string | number }): any {
    return this.translate.get(key, params);
  }
}
