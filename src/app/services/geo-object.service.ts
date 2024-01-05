import { Injectable } from '@angular/core';
import { GeoObjectTypeEnum } from '../enums/geo.object.type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoObjectDto } from '../models/dto/geo.object.dto';

@Injectable({
  providedIn: 'root'
})
export class GeoObjectService {
  constructor(private http: HttpClient) { }

  searchGeoObjects(type: GeoObjectTypeEnum, text: string): Observable<GeoObjectDto[]> {
    return this.http.get(`http://localhost:3000/api/searchGeoObjects/${type}/${text}`) as Observable<GeoObjectDto[]>;
  }
}
