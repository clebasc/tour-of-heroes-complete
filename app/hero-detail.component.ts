import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls : ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) 
        {}
    @Input()
    hero: Hero;

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // + is for convert String to Int. Route parameters are always strings
            this.heroService.getHero(id)
            .then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        window.history.back();
    }

    save(): void {
        this.heroService.update(this.hero)
        .then(this.goBack);
    }
}
