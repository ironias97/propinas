import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Favorite } from '../models/favorite';
import { FavoritesService } from '../favorite.service'

@IonicPage()
@Component({
  selector: 'page-favorites-modal',
  templateUrl: 'favorites-modal.html',
})
export class FavoritesModalPage {
  private viewCtrl: ViewController;
  private favoritesService: FavoritesService;
  private restaurant: Favorite;

  constructor(public navCtrl: NavController, public navParams: NavParams, _viewCtrl: ViewController, private _favoritesService: FavoritesService) {
    this.viewCtrl = _viewCtrl;
    this.favoritesService = _favoritesService;
    this.restaurant = navParams.get('restaurant');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesModalPage');
  }
  OnSave(restaurant: Favorite) {
    if (typeof (restaurant.key) === 'undefined') {
      this.favoritesService.AddRestaurantAF(restaurant).then(ref => {
        this.viewCtrl.dismiss();
      });
    } else {
      this.favoritesService.UpdateFavoriteAF(restaurant.key,restaurant).then(ref => {
        this.viewCtrl.dismiss();
      });
    }

  }
  OnClose() {
    this.viewCtrl.dismiss();
  }
}
