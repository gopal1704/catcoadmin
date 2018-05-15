import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornjobComponent } from './cornjob.component';

describe('CornjobComponent', () => {
  let component: CornjobComponent;
  let fixture: ComponentFixture<CornjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
