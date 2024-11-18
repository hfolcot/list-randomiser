import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jokeResponse } from './_models/jokeResponse';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
private http = inject<HttpClient>(HttpClient);
  
  getJoke(): Observable<jokeResponse> {
    return this.http.get<jokeResponse>('https://icanhazdadjoke.com/', { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } })
  }
}
