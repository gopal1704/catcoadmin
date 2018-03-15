import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwalletbalanceComponent } from './addwalletbalance.component';

describe('AddwalletbalanceComponent', () => {
  let component: AddwalletbalanceComponent;
  let fixture: ComponentFixture<AddwalletbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwalletbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwalletbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
