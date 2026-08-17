import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-found-items',
  templateUrl: './my-found-items.component.html',
  styleUrls: ['./my-found-items.component.css']
})
export class MyFoundItemsComponent {

  founditems:any[] = [];

  editMode = false;

  selectedItem:any = {

    id:0,

    title:'',

    description:'',

    category:'',

    location:'',

    date_found:''

  };

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

    this.loadItems();

  }

  // =========================
  // Load Found Items
  // =========================

  loadItems(){

    this.auth.getMyFoundItems().subscribe(

      (response:any)=>{

        console.log(
          JSON.stringify(
            response,
            null,
            2
          )
        );

        this.founditems = response;

      }

    );

  }

  // =========================
  // Delete Item
  // =========================

  deleteItem(id:number){

    this.auth.deleteFoundItem(id).subscribe(

      (response:any)=>{

        console.log(response);

        this.loadItems();

      }

    );

  }

  // =========================
// Edit Item
// =========================

editItem(item:any){

  this.selectedItem = {

    ...item

  };

  this.editMode = true;

}


// =========================
// Update Item
// =========================

updateItem(){

  let data = {

    ...this.selectedItem

  };

  // remove image path before sending
  delete data.image;

  this.auth.updateFoundItem(

    this.selectedItem.id,

    data

  ).subscribe(

    (response:any)=>{

      console.log(response);

      this.loadItems();

      this.editMode = false;

    },

    (error:any)=>{

      console.log(error);

      console.log(error.error);

      alert(
        JSON.stringify(error.error)
      );

    }

  );

}

  // =========================
  // Accept Claim
  // =========================

  acceptClaim(id:number){

    this.auth.acceptClaim(id).subscribe(

      (response:any)=>{

        alert('Claim Accepted');

        this.loadItems();

      },

      (error)=>{

        console.log(error);

      }

    );

  }

  // =========================
  // Reject Claim
  // =========================

  rejectClaim(id:number){

    this.auth.rejectClaim(id).subscribe(

      (response:any)=>{

        alert('Claim Rejected');

        this.loadItems();

      },

      (error)=>{

        console.log(error);

      }

    );

  }

resolveClaim(id:number){

  this.auth.resolveClaim(id).subscribe(

    (response:any)=>{

      console.log(response);

      alert('Item Resolved');

      this.auth.getMyFoundItems().subscribe(

        (data:any)=>{

          this.founditems = data;

        }

      );

    },

    (error:any)=>{

      console.log(error);

    }

  );

}












}