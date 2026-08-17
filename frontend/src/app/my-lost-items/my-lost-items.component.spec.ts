import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLostItemsComponent } from './my-lost-items.component';

describe('MyLostItemsComponent', () => {
  let component: MyLostItemsComponent;
  let fixture: ComponentFixture<MyLostItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLostItemsComponent]
    });
    fixture = TestBed.createComponent(MyLostItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
