import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-matches',
  templateUrl: './view-matches.component.html',
  styleUrls: ['./view-matches.component.css']
})
export class ViewMatchesComponent {

  matches:any[]=[];

  constructor(

    private route:ActivatedRoute,

    private router:Router,

    private auth:AuthService

  ){}

  ngOnInit(){

    let id=this.route.snapshot.params['id'];

    this.auth.getMatches(id).subscribe(

      (response:any)=>{

        console.log(response);

        this.matches=response;

      }

    );

  }

  viewDetails(foundItemId:number){

    this.router.navigate(
      ['/found-item-details',foundItemId]
    );

  }

}