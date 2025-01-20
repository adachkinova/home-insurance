import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerDataComponent } from './property-owner-data.component';

describe('InsurerDataComponent', () => {
  let component: PropertyOwnerDataComponent;
  let fixture: ComponentFixture<PropertyOwnerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyOwnerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyOwnerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
