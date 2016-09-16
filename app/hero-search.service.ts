import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero }           from './hero';
import config = require('./globalConfig');
@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`${config.apiUrl}/heroes/find/${term}`)
               .map(function(r: Response){
                 let data = r.json().message;
                    let heroes:Hero[] = [];
                    for(var i = 0; i < data.length; i++){
                        var hero: Hero = new Hero();
                        hero.id = data[i]._id;
                        hero.name = data[i].nom;
                        heroes.push(hero); 
                    }
                    return heroes;
               });
               //.map((r: Response) => r.json().data as Hero[]);
  }
}
