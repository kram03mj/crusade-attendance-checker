import { Component, OnInit } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
 

  text: any = null;
  progress: string = "";
  worker: any;
  imageSrc: string = "";
  fileToUpload: any;
  imageUrl: any;
  imageupload: any[] = [];

  loading: boolean = true;
  studentData:any;
  url: string = '/assets/members.json';
  data: any;
  memdata: any[] = [{
    
  }];


  constructor(private http: HttpClient) {}


  ngOnInit(): void {
   
  }

  async recognizeText(path: string){
    this.loading= true;
    const worker = await createWorker('eng', 1, {
      
      logger: m => this.loading= true
      , // Add logger here
      
    });
    const { data: { text } } = await worker.recognize(path);
    console.log(text);   
    this.text += text;
   
   
    await this.worker.terminate();
    this.loading= false;
  }


  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      const url:string = URL.createObjectURL(file);
      this.recognizeText(url)

      this.fileToUpload = file;

      this.imageupload.push(file.name);
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);


      
     

     
    }
  }


      validate(){
       let  _memdata: any[] = [{
    
       }];
            this.http.get(this.url).subscribe((data: any)=> {                     
              data.forEach((element: { name: any; }) => {              
                    if(this.text.toLowerCase().indexOf(element.name.toLowerCase()) > -1){
                     
                      _memdata.push(
                        {name: element.name, status: "1"});
                    }
                    else{
                     
                      // _memdata.push(
                      //   {name: element.name, status: "0"});
                    
                    }
                     
                });
            });

            this.memdata = _memdata;

      }



 
}

