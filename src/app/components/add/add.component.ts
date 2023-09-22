import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { IdentificationTypeService } from 'src/app/services/identification-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  formSubmitted:boolean = false;
  types?: any[];

  public registerForm = this.fb.group({
      identificationTypeID:[ '',  Validators.required  ],
      identificationNumber:[ '', Validators.required ],
      name:[ '', Validators.required ],
      gender:[ '', Validators.required ],
    }
  )
  constructor(  private fb: FormBuilder,
                private identificationTypeService: IdentificationTypeService,
                private customersService:CustomersService,
                private router:Router ) { }

  
  ngOnInit(): void {
    this.getIdentificationsType()
  }

  getIdentificationsType(){
    this.identificationTypeService.getAllCustomers()
      .subscribe((res:any)=>{
        this.types = res?.data;
    })
  }

  create(){
    this.formSubmitted = true;

    if( this.registerForm.invalid ){
     return;
    }

    this.customersService.createCustomer( this.registerForm.value )
        .subscribe( ({
          next: (res:any) => {
            if(res.status){
              Swal.fire({
                icon: 'success',
                title: "Crear cliente",
                text: res.data,
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/');
                }
              })
              this.formSubmitted = true;
            }else{
              Swal.fire({
                icon: 'warning',
                title: "Crear cliente",
                text: res.message,
                showConfirmButton: true,
              })
            }
          },
          error: (e) => {
            Swal.fire({
              icon: 'warning',
              title: "Crear cliente",
              text: e.error.message,
              showConfirmButton: true,
            })
          }
        }));
    
  }
  campoNoValido( campo:string ):boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
    
  }


}
