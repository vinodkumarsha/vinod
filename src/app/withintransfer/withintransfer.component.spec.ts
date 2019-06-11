import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithintransferComponent } from './withintransfer.component';

describe('WithintransferComponent', () => {
  let component: WithintransferComponent;
  let fixture: ComponentFixture<WithintransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithintransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithintransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
