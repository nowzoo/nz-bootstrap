import { TestBed, inject } from '@angular/core/testing';

import { NzbContentRefFactoryService } from './nzb-content-ref-factory.service';

describe('NzbContentRefFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzbContentRefFactoryService]
    });
  });

  it('should be created', inject([NzbContentRefFactoryService], (service: NzbContentRefFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
