import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  username='';
  password='';
  constructor(private auth:AuthService,private router:Router){}
  // login(){
  //   let data={
  //     username:this.username,
  //     password:this.password
  //   }
  //   this.auth.login(data).subscribe((response:any)=>{
  //     console.log(response)
  //     localStorage.setItem('access',response.access);
  //     localStorage.setItem('refresh',response.refresh);
  //     this.router.navigate(['/dashboard']);
  //   })
  //   console.log(this.username)
  //   console.log(this.password)
  // }
  login(){

  let data = {
    username:this.username,
    password:this.password
  }

  this.auth.login(data).subscribe((response:any)=>{

    localStorage.setItem('access',response.access);
    localStorage.setItem('refresh',response.refresh);

    this.auth.getCurrentUser().subscribe((user:any)=>{

      if(user.is_staff){

        this.router.navigate(['/admin-dashboard']);

      }
      else{

        this.router.navigate(['/dashboard']);

      }

    });

  });

}
}
