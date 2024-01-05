import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  data: any = {};

  constructor(private readonly http: HttpClient) {
  }

  public use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;

      this.http.get<{}>(langPath).subscribe(
        (translation) => {

          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          reject(this.data);
        }
      );
    });
  }

  public get(keys: string, params?: { [key: string]: string | number }, value?: string): string | object | null {
    if (!keys) {
      return '';
    }
    let data: any = this.data;
    const keysArray: string[] = keys.split('.');
    for (const key of keysArray) {
      if (key in data) {
        data = data[key];
      } else if (value) {
        return value
      } else {
        return null
      }
    }

    if (!params) {
      return data;
    }

    let result: string = data.toString();
    Object.keys(params).forEach(paramKey => {
      const value = params[paramKey];
      const template = new RegExp('{' + paramKey + '}', 'gm');
      result = result.replace(template, value.toString());
    });

    return result;
  }
}
