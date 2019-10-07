import { TestBed } from '@angular/core/testing';

import { MapquestService } from './mapquest.service';

describe('MapquestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapquestService = TestBed.get(MapquestService);
    expect(service).toBeTruthy();
  });
});
