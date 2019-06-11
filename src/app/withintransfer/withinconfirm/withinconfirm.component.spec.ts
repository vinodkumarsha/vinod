import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinconfirmComponent } from './withinconfirm.component';

describe('WithinconfirmComponent', () => {
  let component: WithinconfirmComponent;
  let fixture: ComponentFixture<WithinconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
