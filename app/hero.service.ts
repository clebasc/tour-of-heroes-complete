import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import config = require('./globalConfig');
import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = `${config.apiUrl}/heroes`;  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
                .toPromise()
                .then(function(response){
                    let data = response.json().message;
                    let heroes:Hero[] = [];
                    for(var i = 0; i < data.length; i++){
                        var hero: Hero = new Hero();
                        hero.id = data[i]._id;
                        hero.name = data[i].nom;
                        heroes.push(hero); 
                    }
                    return heroes;
                })
                //.then(response => response.json().data as Hero[])
                .catch(this.handleError);
    }
    getHero(id: string): Promise<Hero> {
        return this.getHeroes()
             .then(function(heroes){
                 //heroes => heroes.find(hero => hero.id === id));
                 console.log(heroes);
                 return heroes.find(hero => hero.id === id);
        });
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(function(res){
                 let data = res.json().message;
                 var hero: Hero = new Hero();
                 hero.id = data._id;
                 hero.name = data.nom;
                 return hero;
            })
            //.then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        let url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
