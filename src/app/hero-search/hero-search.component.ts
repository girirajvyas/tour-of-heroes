import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$ : Observable<Hero>;
  private searchTerms = new Subject<string>();

  constructor(private heroService :HeroService) { }

  ngOnInit() {
    /*this.heroes$ = this.searchTerms
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap()

    )*/
  }
  
  search(item : string){
    console.log(item);
    this.searchTerms.next(item);
    //this.heroService.searchHero(item).subscribe();
  }
}
