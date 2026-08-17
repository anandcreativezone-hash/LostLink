import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector:'app-admin-details',
  templateUrl:'./admin-details.component.html',
  styleUrls:['./admin-details.component.css']
})
export class AdminDetailsComponent{

  item:any;

  constructor(

    private route:ActivatedRoute,
    private auth:AuthService,
    private router:Router

  ){}

  ngOnInit(){

    let id=this.route.snapshot.params['id'];

    this.auth.getResolvedItemDetails(id).subscribe(

      (response:any)=>{

        this.item=response;

      }

    );

  }

  deleteItem(){

    this.auth.deleteFoundItem(this.item.id).subscribe(

      ()=>{

        alert("Item Permanently Deleted");

        this.router.navigate(['/admin-list']);

      }

    );

  }

}