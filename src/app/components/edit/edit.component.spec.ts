import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { IdentificationTypeService } from 'src/app/services/identification-type.service';
import { of } from 'rxjs';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let mockCustomersService: CustomersService;
  let mockIdentificationTypeService: IdentificationTypeService;
  let mockRouter: Router;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: 1 }), // You can adjust the customer ID as needed for your test case.
    } as any;

    mockCustomersService = {
      getCustomer: jasmine.createSpy('getCustomer').and.returnValue(of({ data: [{ /* customer data here */ }] })),
      updateCustomer: jasmine.createSpy('updateCustomer').and.returnValue(of({ status: true, data: 'Updated' })),
    } as any;

    mockIdentificationTypeService = {
      getAllCustomers: jasmine.createSpy('getAllCustomers').and.returnValue(of({ data: [{ /* types data here */ }] })),
    } as any;

    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Import the ReactiveFormsModule for working with forms.
      declarations: [EditComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CustomersService, useValue: mockCustomersService },
        { provide: IdentificationTypeService, useValue: mockIdentificationTypeService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
