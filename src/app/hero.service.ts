import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { HeroendpointApi } from './generated/api/HeroendpointApi';
import { HeroCustom } from './heroCustom';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  private heroesUrl = "http://localhost:8080/heroes";
  private heroesUrlFirebase = "https://dummydb-64a16.firebaseio.com/heroes.json";
  private urlToUse = "";
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
    private heroendpointApi: HeroendpointApi) {
      this.urlToUse = this.heroesUrl;
     }

  private log(message: string): void {
    this.messageService.add(message);
  }

  getHeroes(): Observable<HeroCustom[]> {
    this.log('HeroService get heroes service called');
    //return of(HEROES); // mock data
    console.log("inside get heroes, now calling generated api from swagger")
    return this.heroendpointApi.searchHeroesByNameUsingGET()
    .map(value => {
      let custArray : HeroCustom[];
      custArray = value;
      return custArray;
    });
    /*const url = `${this.urlToUse}`
    return this.httpClient.get(url, httpOptions)
      .pipe(
      tap(_ => this.log("heroes fetched")),
      catchError(this.handleError('getHeroes', []))
      )*/


  }

  getHero(id: Number): Observable<Hero> {
    //const url = `https://dummydb-64a16.firebaseio.com/heroes/0.json`
    const url = `${this.urlToUse}/${id}`
    this.log(url);
    //return of(HEROES.find(hero => hero.id === id));
    return this.httpClient.get<Hero>(url, httpOptions)
      .pipe(
      tap(_ => this.log(`Fetched hero with ${id}`)),
      catchError(this.handleError('getHero', []))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.urlToUse}/${hero.id}`
    this.log(url);
    return this.httpClient.put(url, hero, httpOptions)
      .pipe(
      tap(_ => this.log(`updated hero id ${hero.id}`)),
      catchError(this.handleError('update user', []))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post(`${this.urlToUse}`, hero, httpOptions)
    .pipe(
      tap((hero: Hero) => this.log(`added hero with id ${hero.id}`)),
      catchError(this.handleError('addHero', []))
    );
  }

  deleteHero(hero: Hero | number) : Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id; 
    const url = `${this.urlToUse}/${id}`;

    return this.httpClient.delete(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero with id ${id}`)),
      catchError(this.handleError(`deleteHero`, []))
    )
  }

  searchHero(item : string) : Observable<Hero[]> {
    if(!item.trim()){
      return of([]);
    }

    return this.httpClient.get(`${this.urlToUse}?name=${name}`)
    .pipe(
      tap(_ => this.log(`found heroes matching ${item}`)),
      catchError(this.handleError('searchHero with ${item} called',[]))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //log error message
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
