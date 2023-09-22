import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { IdentificationTypeService } from 'src/app/services/identification-type.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let customersService: CustomersService;
  let identificationTypeService: IdentificationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            createCustomer: () => of({ status: true, data: 'Customer created' })
          }
        },
        {
          provide: IdentificationTypeService,
          useValue: {
            getAllCustomers: () => of({ data: [{ identificationTypeID: 1, identificationName: 'Type 1' }] })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    customersService = TestBed.inject(CustomersService);
    identificationTypeService = TestBed.inject(IdentificationTypeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.registerForm).toBeDefined();
  });

  it('should call getIdentificationsType on ngOnInit', () => {
    spyOn(component, 'getIdentificationsType');
    component.ngOnInit();
    expect(component.getIdentificationsType).toHaveBeenCalled();
  });

  it('should set types on getIdentificationsType', () => {
    component.getIdentificationsType();
    expect(component.types).toEqual([{ identificationTypeID: 1, identificationName: 'Type 1' }]);
  });

  it('should create customer', () => {
    spyOn(customersService, 'createCustomer').and.callThrough();
    component.registerForm.setValue({
      identificationTypeID: 1,
      identificationNumber: '12345',
      name: 'John Doe',
      gender: 'Male'
    });
    component.create();
    expect(customersService.createCustomer).toHaveBeenCalledWith({
      identificationTypeID: 1,
      identificationNumber: '12345',
      name: 'John Doe',
      gender: 'Male'
    });
  });

  // Agrega más pruebas según tus necesidades
});
