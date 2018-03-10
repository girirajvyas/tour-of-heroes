import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { HeroCustom } from '../heroCustom';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes : HeroCustom[];
    constructor(private heroService : HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5));
  }

}
