import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { HeroendpointApi } from '../generated/api/HeroendpointApi';
import { HeroCustom } from '../heroCustom';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroCustom[];
  filteredHeroes: HeroCustom[];

  //selectedHero: Hero;
  constructor(private heroService: HeroService,
  private heroendpointApi: HeroendpointApi) {

  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    //below part shoul be in service and that should fetch
    this.heroendpointApi.searchHeroesByNameUsingGET()
    .subscribe(heroFromService => {
      console.log(heroFromService);
    })

    this.heroService.getHeroes()
    .subscribe(heroesFromService => {
      this.heroes = heroesFromService;
      this.sortHeroes();
    });
  }

  sortHeroes(){
    this.heroes.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
      }
    );
  }

  searchHero(item : string){
    this.filteredHeroes = this.heroes.filter(h => h.name.toLowerCase().indexOf(item.toLowerCase()) > -1);
  }

  /*onSelect(hero: Hero): void {
    console.debug("hero selected: " + hero.name);
    this.selectedHero = hero;
  }*/

  add(name: String) : void{
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero)
  .subscribe(hero => {this.heroes.push(hero); this.sortHeroes();})
  }

  delete(hero: Hero) : void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
