import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { FileItem } from '../models/file-items';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private FOLDER_IMG = 'img';

  constructor( private db: AngularFirestore) { }

  uploadImageFirebase( images: FileItem[]) {
    
    const storageRef = firebase.storage().ref();
    for( const item of images){
      item.uploading = true;
      if(item.progess >= 100){
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.FOLDER_IMG}/${item.fileName}`)
      .put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot:firebase.storage.UploadTaskSnapshot) => 
        item.progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error: any) => console.error('Error to upload', error),
        () => {
          console.log('image uploaded true')
           uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            item.url = downloadURL;
          });
          item.uploading = false;
          this.saveImage({
            name: item.fileName,
            url: item.url
          })
        });


      }
  
    }

  private saveImage(image: { name: string, url: string}){
    this.db.collection(`/${ this.FOLDER_IMG }`)
    .add(image)
  }
}
