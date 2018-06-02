import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPanelComponent } from './books-panel.component';

describe('BooksPanelComponent', () => {
  let component: BooksPanelComponent;
  let fixture: ComponentFixture<BooksPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
