import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitListBookComponent } from './wait-list-book.component';

describe('WaitListBookComponent', () => {
  let component: WaitListBookComponent;
  let fixture: ComponentFixture<WaitListBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitListBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
