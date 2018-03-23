import { Favorite } from './models/favorite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import  { Observable } from 'rxjs';
import { FAVORITES } from './data/data-favorites';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class FavoritesService {
 /* private http: Http;
  private result: any;

  constructor(http: Http){
    this.http = http;
    this.result = [];
  }*/

  private restaurantsListRef = this.db.list<Favorite>('restaurants');

  constructor(http: Http, private db: AngularFireDatabase){

  }

  GetAllFavoriteAF(){
    return this.restaurantsListRef;
  }

  AddRestaurantAF(restaurant: Favorite ){
    return this.restaurantsListRef.push(restaurant);
  }

  DeleteFavoriteAF(key: string){
    return this.restaurantsListRef.remove(key);
  }

  UpdateFavoriteAF(key: string, restaurant: Favorite){
    return this.restaurantsListRef.update(key,restaurant);
  }
}
