import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public files: UploadFile[] = [];
  showAlert:boolean = false;
  constructor(public http: HttpClient) { }

  ngOnInit() {
  }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(file)
          if(file.type == 'application/zip' && file.size < 6000000){
            const formData = new FormData()
            // Here you can access the real file
            console.log(droppedFile.relativePath, file);
            formData.append('logo', file, droppedFile.relativePath)
            this.http.post('http://192.168.0.128:3000/product/files',formData).subscribe(res=>{

            });
          }
        	else{
            this.showAlert = true;
            this.files = [];
          }
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
}
