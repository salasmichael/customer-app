import { Component } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  endowments?: any[];
  tempEndowments?: any[];
  serial = '';


  constructor( private customersService:CustomersService) { }
  
  ngOnInit(): void {
    this.retrieve()
  }

  retrieve(): void {
    this.customersService.getAllEndowments()
      .subscribe({
        next: (data:any) => {
          this.endowments = data.data;
          this.tempEndowments = this.endowments; 
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieve();
  }

  search(ev:any){
    ev.target.value == '' && (this.endowments = this.tempEndowments)
  }

  searchTitle(): void {
    let found = this.endowments?.filter(f=> f.serial == this.serial);
    this.endowments =  found?.length !=  0 ? found : this.tempEndowments;
  }


}
