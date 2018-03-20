import { TestBed, inject } from '@angular/core/testing';

import { SharedMapService } from './shared-map.service';

describe('SharedMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMapService]
    });
  });

  it('should be created', inject([SharedMapService], (service: SharedMapService) => {
    expect(service).toBeTruthy();
  }));
});
