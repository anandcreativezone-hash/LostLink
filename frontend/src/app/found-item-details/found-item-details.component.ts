import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-found-item-details',
  templateUrl: './found-item-details.component.html',
  styleUrls: ['./found-item-details.component.css']
})
export class FoundItemDetailsComponent {

  item:any;

  itemId:any;

  constructor(
    private route:ActivatedRoute,
    private auth:AuthService
  ){}

  ngOnInit(){

    this.itemId =
    this.route.snapshot.paramMap.get('id');

    this.loadItem();

  }

  loadItem(){

    this.auth.getFoundItemDetails(
      this.itemId
    ).subscribe(

      (response:any)=>{

        this.item = response;

        console.log(response);

      }

    );

  }
claimItem(){

  this.auth.claimFoundItem(
    this.item.id
  ).subscribe(

    (response:any)=>{

      alert(
        'Claim Submitted'
      );

      this.loadItem();

    },

    (error)=>{

      console.log(error);

      alert(
        JSON.stringify(
          error.error
        )
      );

    }

  );

}
}