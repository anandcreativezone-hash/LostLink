import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-message-archive',
  templateUrl: './message-archive.component.html',
  styleUrls: ['./message-archive.component.css']
})
export class MessageArchiveComponent {

  archiveMessages:any[] = [];

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

    this.loadArchive();

  }

  loadArchive(){

    this.auth.getArchiveMessages().subscribe(

      (response:any)=>{

        console.log(response);

        this.archiveMessages = response;

      },

      (error)=>{

        console.log(error);

      }

    );

  }

  deleteMessage(id:number){

    if(confirm('Delete this message permanently?')){

      this.auth.deleteArchiveMessage(id).subscribe(

        (response:any)=>{

          console.log(response);

          this.loadArchive();

        },

        (error)=>{

          console.log(error);

        }

      );

    }

  }

}
