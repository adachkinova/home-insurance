import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAmountComponent } from './insurance-amount.component';

describe('InsurerDataComponent', () => {
  let component: InsuranceAmountComponent;
  let fixture: ComponentFixture<InsuranceAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
