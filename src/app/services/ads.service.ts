import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Ads } from '../models/ads.model';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private dbPath = '/ads';

  adsRef: AngularFireList<Ads>;
  constructor(private db: AngularFireDatabase) {
    this.adsRef = db.list(this.dbPath)
  }

  getAll(): AngularFireList<Ads> {
    return this.adsRef;
  }

}
