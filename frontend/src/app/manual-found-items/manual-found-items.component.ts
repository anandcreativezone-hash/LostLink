import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manual-found-items',
  templateUrl: './manual-found-items.component.html',
  styleUrls: ['./manual-found-items.component.css']
})
export class ManualFoundItemsComponent {

  foundItems:any[] = [];

  filteredItems:any[] = [];

  searchText='';

  selectedCategory='';

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

    this.loadItems();

  }

  loadItems(){

    this.auth.getManualFoundItems().subscribe(

      (response:any)=>{

        this.foundItems = response;

        this.filteredItems = response;

        console.log(response);

      }

    );

  }

  applyFilter(){

    this.filteredItems = this.foundItems.filter(item=>{

      const searchMatch =
      item.title.toLowerCase().includes(
        this.searchText.toLowerCase()
      );

      const categoryMatch =
      this.selectedCategory === '' ||
      item.category === this.selectedCategory;

      return searchMatch && categoryMatch;

    });

  }

}