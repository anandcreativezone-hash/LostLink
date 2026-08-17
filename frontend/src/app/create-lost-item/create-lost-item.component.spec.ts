import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLostItemComponent } from './create-lost-item.component';

describe('CreateLostItemComponent', () => {
  let component: CreateLostItemComponent;
  let fixture: ComponentFixture<CreateLostItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLostItemComponent]
    });
    fixture = TestBed.createComponent(CreateLostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
