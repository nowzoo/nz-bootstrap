import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzbModalComponent } from './nzb-modal.component';

describe('NzbModalComponent', () => {
  let component: NzbModalComponent;
  let fixture: ComponentFixture<NzbModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzbModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzbModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
