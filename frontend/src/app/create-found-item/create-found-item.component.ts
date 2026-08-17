import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-found-item',
  templateUrl: './create-found-item.component.html',
  styleUrls: ['./create-found-item.component.css']
})
export class CreateFoundItemComponent {

  // Form Fields

  title = '';
  description = '';
  category = '';
  location = '';
  date_found = '';

  // Selected image file

  selectedFile: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}



  // Called when user selects image

  onFileSelected(event: any) {

    this.selectedFile =
    event.target.files[0];

    console.log(
      'Selected File:',
      this.selectedFile
    );

  }



  // Submit Found Item

  submit() {

    // FormData is required because
    // image uploads cannot be sent
    // as normal JSON

    let formData = new FormData();

    // Text Fields

    formData.append(
      'title',
      this.title
    );

    formData.append(
      'description',
      this.description
    );

    formData.append(
      'category',
      this.category
    );

    formData.append(
      'location',
      this.location
    );

    formData.append(
      'date_found',
      this.date_found
    );



    // Image Field

    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }



    // Send to Backend

    this.auth.createFoundItem(
      formData
    ).subscribe(

      (response: any) => {

        console.log(
          'Found Item Created Successfully'
        );

        console.log(
          JSON.stringify(
            response,
            null,
            2
          )
        );

        // Redirect user

        this.router.navigate([
          '/myfounditems'
        ]);

      },

      (error) => {

        console.log(
          'Error:'
        );

        console.log(
          error.error
        );

      }

    );

  }

}