import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeGeneratorComponent } from './joke-generator.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('JokeGeneratorComponent', () => {
  let component: JokeGeneratorComponent;
  let fixture: ComponentFixture<JokeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeGeneratorComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
