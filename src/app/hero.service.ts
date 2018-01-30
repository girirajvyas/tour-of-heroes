import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class HeroService {
  private heroesUrl = "http://localhost:8080/heroes";
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService get heroes service called');
    return of(HEROES);
  }

  getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    this.messageService.add(`HeroService get hero service called with id= ${url}`);
    //return of(HEROES.find(hero => hero.id === id));
    
    return this.httpClient.get<Hero>(url, httpOptions).pipe();
  }

  
}
