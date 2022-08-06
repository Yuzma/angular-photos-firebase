import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileItem } from '../models/file-items';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private FOLDER_IMG = 'img';

  constructor( private db: AngularFirestore) { }

  uploadImageFirebase( images: FileItem) {
    console.log( images );
    
  }

  private saveImage(image: { name: string, url: string}){
    this.db.collection(`/${ this.FOLDER_IMG }`)
    .add(image)
  }
}
