import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleRowsNewItemComponent } from './rectangle-rows-new-item.component';

describe('RectangleRowsNewItemComponent', () => {
  let component: RectangleRowsNewItemComponent;
  let fixture: ComponentFixture<RectangleRowsNewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangleRowsNewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleRowsNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
