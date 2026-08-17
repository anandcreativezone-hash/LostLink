import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  username='';
  password='';

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  login(){

    let data = {
      username:this.username,
      password:this.password
    };

    this.auth.login(data).subscribe((response:any)=>{

      localStorage.setItem('access',response.access);
      localStorage.setItem('refresh',response.refresh);

      this.auth.getCurrentUser().subscribe((user:any)=>{

        if(user.is_staff){

          this.router.navigate(['/admin-dashboard']);

        }
        else{

          alert('Access Denied. Authority Accounts Only');

          localStorage.removeItem('access');
          localStorage.removeItem('refresh');

        }

      });

    });

  }

}
