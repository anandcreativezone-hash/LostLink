import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-lost-items',
  templateUrl: './my-lost-items.component.html',
  styleUrls: ['./my-lost-items.component.css']
})
export class MyLostItemsComponent {
  lostitems:any[]=[];
  editMode=false;

selectedItem:any={
  id:0,
  title:'',
  description:'',
  category:'',
  location:'',
  date_lost:'',
  reward:0
};





  constructor(private auth:AuthService, private router:Router){}
  ngOnInit(){
    this.auth.getMyLostItems().subscribe((response:any)=>{
      // console.log(response)
      console.log(JSON.stringify(response,null,2));
      this.lostitems=response;
    })
  }






deleteItem(id:number){

  this.auth.deleteLostItem(id).subscribe((response:any)=>{

    console.log(response);

    this.auth.getMyLostItems().subscribe((data:any)=>{

      this.lostitems=data;

    });

  });

}


editItem(item:any){

  this.selectedItem = { ...item };

  this.editMode = true;

}

updateItem(){

  let data = {...this.selectedItem};

  delete data.image;

  this.auth.updateLostItem(
    this.selectedItem.id,
    data
  ).subscribe(

    (response:any)=>{

      console.log(response);

      this.auth.getMyLostItems().subscribe((data:any)=>{

        this.lostitems = data;

      });

      this.editMode = false;

    },

    (error:any)=>{

      console.log(error);

      alert(JSON.stringify(error.error));

    }

  );

}






















viewMatches(id:number){

  this.router.navigate(
    ['/view-matches',id]
  );

}

}
