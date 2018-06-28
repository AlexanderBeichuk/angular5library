import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionBookComponent } from './description-book.component';

describe('DescriptionBookComponent', () => {
  let component: DescriptionBookComponent;
  let fixture: ComponentFixture<DescriptionBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
