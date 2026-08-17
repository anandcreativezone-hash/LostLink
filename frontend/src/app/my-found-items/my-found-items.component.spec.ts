import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFoundItemsComponent } from './my-found-items.component';

describe('MyFoundItemsComponent', () => {
  let component: MyFoundItemsComponent;
  let fixture: ComponentFixture<MyFoundItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFoundItemsComponent]
    });
    fixture = TestBed.createComponent(MyFoundItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
