import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-create-lost-item',
templateUrl: './create-lost-item.component.html',
styleUrls: ['./create-lost-item.component.css']
})
export class CreateLostItemComponent {

title = '';
description = '';
category = '';
location = '';
date_lost = '';
reward = 0;

selectedFile: any;

constructor(
private auth: AuthService,
private router: Router
) {}

onFileSelected(event: any) {

if (event.target.files.length > 0) {

  this.selectedFile = event.target.files[0];

  console.log(this.selectedFile);

}


}

submit() {


let formData = new FormData();

formData.append('title', this.title);
formData.append('description', this.description);
formData.append('category', this.category);
formData.append('location', this.location);
formData.append('date_lost', this.date_lost);
formData.append('reward', this.reward.toString());

if (this.selectedFile) {

  formData.append(
    'image',
    this.selectedFile
  );

}

this.auth.createLostItem(formData)
  .subscribe((response: any) => {

    console.log(response);

    alert('Lost Item Created Successfully');

    this.router.navigate(['/mylostitems']);

  });


}

}
