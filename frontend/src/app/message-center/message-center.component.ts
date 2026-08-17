import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
selector: 'app-message-center',
templateUrl: './message-center.component.html',
styleUrls: ['./message-center.component.css']
})
export class MessageCenterComponent implements OnInit {
isAdmin = false;
messageType = 'Message';

receiver = '';
subject = '';
message = '';

selectedFile:any;

inbox:any = [];

constructor(
private auth:AuthService
){}

ngOnInit(): void {


this.loadInbox();
this.auth.getCurrentUser().subscribe(

  (response:any)=>{

    if(response.username === 'admin'){

      this.isAdmin = true;

    }

  }

);

}

loadInbox(): void {


this.auth.getInbox().subscribe(

  (response:any)=>{

    this.inbox = response;

    console.log('Inbox Loaded');

    console.log(response);

  },

  (error)=>{

    console.log(error);

  }

);


}

onMessageTypeChange(){


if(this.messageType === 'Complaint'){

  this.receiver = 'admin';

}
else{

  this.receiver = '';

}


}

onFileSelected(event:any){


this.selectedFile =
event.target.files[0];

console.log(this.selectedFile);


}

sendMessage(): void {


let formData = new FormData();

formData.append(
  'receiver',
  this.receiver
);

formData.append(
  'message_type',
  this.messageType
);

formData.append(
  'subject',
  this.subject
);

formData.append(
  'message',
  this.message
);

if(this.selectedFile){

  formData.append(
    'attachment',
    this.selectedFile
  );

}

this.auth.sendMessage(formData).subscribe(

  (response:any)=>{

    console.log(response);

    alert('Message Sent Successfully');

    this.receiver='';
    this.subject='';
    this.message='';
    this.selectedFile=null;

    this.loadInbox();

  },

  (error)=>{

    console.log(error);

    console.log(error.error);

    alert(JSON.stringify(error.error));

  }

);


}

}
