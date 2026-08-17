import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector:'app-admin-list',
  templateUrl:'./admin-list.component.html',
  styleUrls:['./admin-list.component.css']
})
export class AdminListComponent{

  items:any=[];

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

    this.auth.getResolvedItems().subscribe(

      (response:any)=>{

        this.items=response;

      }

    );

  }

}