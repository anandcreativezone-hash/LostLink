import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accessToken = '';

  unreadCount = 0;

  constructor(
    private router: Router,
    private auth: AuthService
  ){
    this.accessToken =
    localStorage.getItem('access') || '';
  }

  ngOnInit(): void {

    this.loadUnreadCount();

  }

  loadUnreadCount(): void {

    this.auth.getUnreadCount().subscribe(

      (response:any)=>{

        this.unreadCount =
        response.count;

        console.log(
          'Unread Messages:',
          response.count
        );

      },

      (error)=>{

        console.log(error);

      }

    );

  }

  createLostItem(){
    this.router.navigate(['/createlostitem']);
  }

  viewMyLostItems(){
    this.router.navigate(['/mylostitems']);
  }

  createFoundItem(){
    this.router.navigate(['/create-found-item']);
  }

  viewMyFoundItems(){
    this.router.navigate(['/myfounditems']);
  }

  logout(){

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    this.router.navigate(['/login']);

  }

}