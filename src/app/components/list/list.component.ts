import { Component } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  customers?: any[];
  tempEndowments?: any[];
  serial = '';


  constructor( private customersService:CustomersService) { }
  
  ngOnInit(): void {
    this.getAllCustomers()
  }

  getAllCustomers(): void {
    this.customersService.getAllCustomers()
      .subscribe({
        next: (data:any) => {
          this.customers = data.data;
          this.tempEndowments = this.customers; 
        },
        error: (e) => console.error(e)
      });
  }
  

  refreshList(): void {
    this.getAllCustomers();
  }

  search(ev:any){
    ev.target.value == '' && (this.customers = this.tempEndowments)
  }

  searchTitle(): void {
    let found = this.customers?.filter(f=> f.serial == this.serial);
    this.customers =  found?.length !=  0 ? found : this.tempEndowments;
  }


}
