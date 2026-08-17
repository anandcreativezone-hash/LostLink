import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  message = '';

  constructor(private auth: AuthService) {}

  register() {

    if(this.password !== this.confirmPassword){

      this.message = "Passwords do not match";
      return;

    }

    let data = {

      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password

    };

    this.auth.register(data).subscribe({

      next:(response:any)=>{

        console.log(response);

        this.message =
        "Registration submitted. Wait for admin approval.";

      },

      error:(error)=>{

        console.log(error);

        this.message =
        "Registration failed.";

      }

    });

  }

}