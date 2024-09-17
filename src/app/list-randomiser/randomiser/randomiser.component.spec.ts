import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomiserComponent } from './randomiser.component';

describe('RandomiserComponent', () => {
  let component: RandomiserComponent;
  let fixture: ComponentFixture<RandomiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
