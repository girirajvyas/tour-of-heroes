import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../hero';
import { HeroService } from '../hero.service'
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$ : Observable<Hero>;

  constructor(private heroService :HeroService) { }

  ngOnInit() {
  }
  
  search(item : string){
    console.log(item);
    this.heroService.searchHero(item).subscribe();
  }
}
