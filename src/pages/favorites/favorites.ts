import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoritesModalPage} from './favorites-modal/favorites-modal';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Favorite } from './models/favorite';
import { FavoritesService } from './favorite.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  private favoritesService: FavoritesService;
  /*private favorites: Favorite[];*/
  favoritesList$: Observable<Favorite[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, _favoritesServce: FavoritesService) {
  this.favoritesService = _favoritesServce;

  this.favoritesList$ = this.favoritesService
  .GetAllFavoriteAF()
  .snapshotChanges().map(
    changes => {
      return changes.map( c => ({
key: c.payload.key, ...c.payload.val()
      }))
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  //  this.favorites = this.favoritesService.GetAllFavoriteAF();
  }

  OnNew(){

    let newRestaurant: Favorite = { nombre: '',direccion:''};
    let modal = this.modalCtrl.create(FavoritesModalPage, {restaurant: newRestaurant});
    console.log(modal);
    modal.present();
  }
  OnDelete(restaurant: Favorite){
    console.log(restaurant.key)
    this.favoritesService.DeleteFavoriteAF(restaurant.key);
  }
  OnUpdate(restaurant: Favorite){

    let modal = this.modalCtrl.create(FavoritesModalPage, { restaurant: restaurant});
    modal.present();
  }
}
