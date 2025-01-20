import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredPropertyComponent } from './insured-property.component';

describe('InsurerDataComponent', () => {
  let component: InsuredPropertyComponent;
  let fixture: ComponentFixture<InsuredPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuredPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
