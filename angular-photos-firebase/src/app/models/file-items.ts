export class FileItem {

    public file: File;
    public fileName: string;
    public url: string = '';
    public uploading: boolean;
    public progess: number;

    constructor(file: File){
        this.file = file;
        this.fileName = file.name;
        this.uploading = false;
        this.progess = 0;

    }
}