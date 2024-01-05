import { TestBed } from '@angular/core/testing';

import { GeoObjectService } from './geo-object.service';

describe('GeoObjectService', () => {
  let service: GeoObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
