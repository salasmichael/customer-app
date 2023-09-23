import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { IdentificationTypeService } from 'src/app/services/identification-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formSubmitted = false;
  types: any[] = [];
  customerID!: number;

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customersService: CustomersService,
    private identificationTypeService: IdentificationTypeService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(({ id }) => this.getCustomer(id));
    this.editForm = this.fb.group({
      identificationTypeID: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getIdentificationsType();
  }

  getIdentificationsType() {
    this.identificationTypeService.getAllCustomers().subscribe((res: any) => {
      this.types = res?.data;
    });
  }

  getCustomer(id: number) {
    this.customersService.getCustomer(id).subscribe({
      next: (data: any) => {
        this.customerID = id;
        const customerData = data.data[0];
        this.editForm.patchValue({
          identificationTypeID: customerData.identificationTypeID,
          identificationNumber: customerData.identificationNumber,
          name: customerData.name,
          gender: customerData.gender,
        });
      },
      error: (e) => console.error(e),
    });
  }

  update() {
    this.formSubmitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.customersService.updateCustomer(this.customerID, this.editForm.value).subscribe({
      next: (res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Editar cliente',
            text: res.data,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/');
            }
          });
          this.formSubmitted = true;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Editar cliente',
            text: res.message,
            showConfirmButton: true,
          });
        }
      },
      error: (e) => console.log(e),
    });
  }

  campoNoValido(campo: string) {
    return this.editForm.get(campo)?.invalid && this.formSubmitted;
  }
}
