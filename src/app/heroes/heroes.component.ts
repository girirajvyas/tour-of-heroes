import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  filteredHeroes: Hero[];

  //selectedHero: Hero;
  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
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
