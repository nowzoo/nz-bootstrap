import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzbModalBackdropComponent } from './nzb-modal-backdrop.component';

describe('NzbModalBackdropComponent', () => {
  let component: NzbModalBackdropComponent;
  let fixture: ComponentFixture<NzbModalBackdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzbModalBackdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzbModalBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
