import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySecondViewComponent } from './my-second-view.component';

describe('MySecondViewComponent', () => {
  let component: MySecondViewComponent;
  let fixture: ComponentFixture<MySecondViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySecondViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySecondViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
