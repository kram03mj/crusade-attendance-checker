import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent  {

  constructor(private http: HttpClient) {}

  loading:boolean = false;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  onFileDropped(event: any) {
    const file: File = event.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.http.post<any>('http://localhost:5000/upload', formData).subscribe(
      response => {
        this.loading = true;
        console.log(response);
        // Navigate to result component or display result here
      },
      error => {
        console.error('Error uploading file', error);
      }
    );
  }
}