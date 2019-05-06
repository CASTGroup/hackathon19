import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstViewComponent } from './my-first-view.component';

describe('MyFirstViewComponent', () => {
  let component: MyFirstViewComponent;
  let fixture: ComponentFixture<MyFirstViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFirstViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirstViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
