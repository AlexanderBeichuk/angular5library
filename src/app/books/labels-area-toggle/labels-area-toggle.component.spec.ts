import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsAreaToggleComponent } from './labels-area-toggle.component';

describe('LabelsAreaToggleComponent', () => {
  let component: LabelsAreaToggleComponent;
  let fixture: ComponentFixture<LabelsAreaToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsAreaToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsAreaToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
