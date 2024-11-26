import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRandomiserComponent } from './list-randomiser.component';
import { provideRouter } from '@angular/router';

describe('ListRandomiserComponent', () => {
  let component: ListRandomiserComponent;
  let fixture: ComponentFixture<ListRandomiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRandomiserComponent],
      providers: [
        provideRouter([])
      ]
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
