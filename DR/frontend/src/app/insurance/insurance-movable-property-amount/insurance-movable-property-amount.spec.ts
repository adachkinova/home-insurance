import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMovablePropertyAmount } from './insurance-movable-property-amount';

describe('InsurerDataComponent', () => {
  let component: InsuranceMovablePropertyAmount;
  let fixture: ComponentFixture<InsuranceMovablePropertyAmount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceMovablePropertyAmount ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMovablePropertyAmount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
