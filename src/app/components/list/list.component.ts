import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  customers?: any[];
  tempEndowments?: any[];

  constructor( private customersService:CustomersService,
              private router:Router) { }
  
  ngOnInit(): void {
    this.getAllCustomers();
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

  getCustomer(id:number){
    this.router.navigateByUrl(`/customer/${id}`);     
  }
  

  delete(id:number,name:string){
    Swal.fire({
      title: 'Eliminar cliente',
      text: `¿Deseas eliminar al cliente ${name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.customersService.deleteCustomer(id)
          .subscribe({
            next: (res) => {
              if(res.status){
                Swal.fire(
                  'Eliminado!',
                   res.data
                )
                this.getAllCustomers()
              }
            },
            error: (e) => console.log(e)
          });
      }
    })
  }

  search(ev:any){
    
    if(ev.target.value == ''){
      this.getAllCustomers();
      return;
    } 

    this.customersService.searchCustomer(ev.target.value)
      .subscribe({
        next: (res) => {
          if(res.status){
            this.customers = res.data;
          }
        }
      })
  }

}
