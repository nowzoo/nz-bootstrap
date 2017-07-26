import { TestBed, inject } from '@angular/core/testing';

import { NzbModalService } from './nzb-modal.service';

describe('NzbModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzbModalService]
    });
  });

  it('should be created', inject([NzbModalService], (service: NzbModalService) => {
    expect(service).toBeTruthy();
  }));
});
