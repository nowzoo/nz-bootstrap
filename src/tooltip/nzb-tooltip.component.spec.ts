import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzbTooltipComponent } from './nzb-tooltip.component';

describe('NzbTooltipComponent', () => {
  let component: NzbTooltipComponent;
  let fixture: ComponentFixture<NzbTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzbTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzbTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
