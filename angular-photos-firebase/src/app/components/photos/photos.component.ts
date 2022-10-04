import { Component } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})

export class PhotosComponent {
//  private itemsCollection: AngularFirestoreCollection<Item>;
//  items: Observable<Item[]>;
  constructor() {
  //  this.itemsCollection = afs.collection<Item>('items');
    //this.items = this.itemsCollection.valueChanges();
  }

}