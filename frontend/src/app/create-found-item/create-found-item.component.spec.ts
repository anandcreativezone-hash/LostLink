import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoundItemComponent } from './create-found-item.component';

describe('CreateFoundItemComponent', () => {
  let component: CreateFoundItemComponent;
  let fixture: ComponentFixture<CreateFoundItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFoundItemComponent]
    });
    fixture = TestBed.createComponent(CreateFoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
