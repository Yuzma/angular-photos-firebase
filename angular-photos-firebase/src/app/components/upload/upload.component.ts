import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-items';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];

  constructor( public _uploadImage: UploadImageService) { }

  ngOnInit(): void {
  }

  uploadImage() {
    this._uploadImage.uploadImageFirebase(this.files);
  }

}
