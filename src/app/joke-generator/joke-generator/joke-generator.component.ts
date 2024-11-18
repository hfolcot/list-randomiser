import { Component, inject, OnInit, signal } from '@angular/core';
import { JokeService } from '../joke.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-joke-generator',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './joke-generator.component.html',
  styleUrls: ['./joke-generator.component.scss']
})
export class JokeGeneratorComponent implements OnInit{
  private jokeService = inject<JokeService>(JokeService);
  joke = signal<string>('');
  
  ngOnInit(): void {
    this.getJoke();
  }

  getJoke(): void {
    this.jokeService.getJoke().subscribe(joke => {
      this.joke.set(joke.joke);
    });
  }
}
