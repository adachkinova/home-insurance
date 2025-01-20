import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInputDataComponent } from './preview-input-data.component';

describe('InsurerDataComponent', () => {
  let component: PreviewInputDataComponent;
  let fixture: ComponentFixture<PreviewInputDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewInputDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInputDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
