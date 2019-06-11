import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinpreconfirmComponent } from './withinpreconfirm.component';

describe('WithinpreconfirmComponent', () => {
  let component: WithinpreconfirmComponent;
  let fixture: ComponentFixture<WithinpreconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinpreconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinpreconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
