import { TestBed, inject } from '@angular/core/testing';

import { NzbTooltipService } from './nzb-tooltip.service';

describe('NzbTooltipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzbTooltipService]
    });
  });

  it('should be created', inject([NzbTooltipService], (service: NzbTooltipService) => {
    expect(service).toBeTruthy();
  }));
});
