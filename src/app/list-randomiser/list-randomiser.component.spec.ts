import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRandomiserComponent } from './list-randomiser.component';

describe('ListRandomiserComponent', () => {
  let component: ListRandomiserComponent;
  let fixture: ComponentFixture<ListRandomiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRandomiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRandomiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
