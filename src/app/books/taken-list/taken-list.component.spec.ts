import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenListComponent } from './taken-list.component';

describe('TakenListComponent', () => {
  let component: TakenListComponent;
  let fixture: ComponentFixture<TakenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
