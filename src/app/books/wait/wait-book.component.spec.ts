import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitBookComponent } from './wait-book.component';

describe('WaitBookComponent', () => {
  let component: WaitBookComponent;
  let fixture: ComponentFixture<WaitBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
