import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
    this.mouseOn.emit(true);
    this._peventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mouseOn.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {
    

    const transfer = this._getTransfer(event);
    if(!transfer) return;

    this._extractFiles(transfer.files);
    this._peventStop(event)

    this.mouseOn.emit(false);
  }

  private _getTransfer(event:any){
    return event.dataTransfer ? event.dataTransfer: event.originalElement.dataTransfer;
  }

  private _extractFiles(fileList: FileList){
    for(const property in Object.getOwnPropertyNames(fileList)){
      const temporalyFile = fileList[property];
      
      if(this._fileCanBeUpload(temporalyFile)){
        const newFile = new FileItem(temporalyFile);
        this.files.push(newFile);
      }
    }
  }

  private _fileCanBeUpload (file: File): boolean
{
  if(!this._elementWasDropped(file.name) && this._isImage(file.type)){
    return true;
  } else {
    return false;
  }
}
  private _peventStop(event: any){
    event.preventDefault();
    event.stopPropagation();
  }

  private _elementWasDropped(fileName:string):boolean {
    for(const file of this.files){
      if(file.fileName = fileName){
        console.log('The file ' + fileName + 'was added');
        return true;
      }
    }
    return false;
  }

  private _isImage(typeImg: string):boolean {
    return (typeImg === '' || typeImg === undefined)? false : typeImg.startsWith('image');
  }
}
