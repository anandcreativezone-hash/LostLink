import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  // Users waiting for approval
  pendingUsers:any[] = [];

  // Approved users
  approvedUsers:any[] = [];

  constructor(
    private auth: AuthService
  ){}

  ngOnInit(){

    // Load dashboard data
    this.loadUsers();

    this.loadApprovedUsers();

  }

  // ==================================
  // Load Pending Users
  // ==================================

  loadUsers(){

    this.auth.getPendingUsers().subscribe(

      (response:any)=>{

        console.log('Pending Users');

        console.log(response);

        this.pendingUsers = response;

      }

    );

  }

  // ==================================
  // Load Approved Users
  // ==================================

  loadApprovedUsers(){

    this.auth.getApprovedUsers().subscribe(

      (response:any)=>{

        console.log('Approved Users');

        console.log(response);

        this.approvedUsers = response;

      }

    );

  }

  // ==================================
  // Approve User
  // ==================================

  approveUser(id:number){

    this.auth.approveUser(id).subscribe(

      (response:any)=>{

        console.log(response);

        // Refresh lists
        this.loadUsers();

        this.loadApprovedUsers();

      }

    );

  }

  // ==================================
  // Delete User
  // ==================================

  deleteUser(id:number){

    this.auth.deletePendingUser(id).subscribe(

      (response:any)=>{

        console.log(response);

        // Refresh lists
        this.loadUsers();

        this.loadApprovedUsers();

      }

    );

  }

}