import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualFoundItemsComponent } from './manual-found-items.component';

describe('ManualFoundItemsComponent', () => {
  let component: ManualFoundItemsComponent;
  let fixture: ComponentFixture<ManualFoundItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualFoundItemsComponent]
    });
    fixture = TestBed.createComponent(ManualFoundItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
