import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //@Input() hero: Hero;
  hero : Hero;
  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { 
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(heroFromService => this.hero = heroFromService)
    
  }

  goBack(){
    this.location.back();
  }
}
