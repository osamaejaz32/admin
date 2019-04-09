import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  public files: UploadFile[] = [];
  private eventForm: FormGroup;
  eventPlaceHolder:any = `Name\r\n
						  Phone
						  Email`;
  uploaded:boolean = false;
  image:any;
  constructor(public formBuilder: FormBuilder,
    private api: ApiService,
    public router: Router) { }

  ngOnInit() {
  	this.eventForm = this.formBuilder.group({
  		event_title: ['',Validators.compose([Validators.required])],
  		event_venue: ['',Validators.compose([Validators.required])],
  		event_start_date: ['',Validators.compose([Validators.required])],
  		event_end_date: ['',Validators.compose([Validators.required])],
  		event_start_time: ['',Validators.compose([Validators.required])],
  		event_end_time: ['',Validators.compose([Validators.required])],
  		event_speakers: ['',Validators.compose([])],
  		event_fee: ['0',Validators.compose([Validators.required])],
  		event_contact_info: ['',Validators.compose([Validators.required])],
  		show_uninvited: ['',Validators.compose([Validators.required])],
  		allow_non_members: ['',Validators.compose([Validators.required])],
  		last_data_confirm: ['',Validators.compose([Validators.required])],
  		last_date_cancel: ['',Validators.compose([Validators.required])],
  	})
  }
  saveEvent(){
    console.log(this.eventForm.value)
    this.api.addEvent(this.eventForm.value).subscribe(res=>{
      console.log(res);
      if(res.status){
        // this.router.navigate[('/dashboard')];
        this.router.navigate[('/dashboard')];
      }
    })
  }
   public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(file)
          this.uploaded = true;
            const formData = new FormData()
            // Here you can access the real file
            this.image = droppedFile.relativePath;
            console.log(droppedFile.relativePath, file);
            formData.append('logo', file, droppedFile.relativePath)
            // this.http.post('http://192.168.0.128:3000/product/files',formData).subscribe(res=>{

            // });
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
}
