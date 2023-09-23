import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ListComponent } from './list.component';
import { CustomersService } from 'src/app/services/customers.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockCustomersService: Partial<CustomersService>;
  let data = {
        "identificationName": "NIT",
        "customerID": 1,
        "identificationTypeID": 2,
        "identificationNumber": "000",
        "name": "Angel",
        "gender": "Masculino"
    }

  beforeEach(async () => {
    mockCustomersService = {
      getAllCustomers: jasmine.createSpy('getAllCustomers').and.returnValue(of({ data: [data] })),
      deleteCustomer: jasmine.createSpy('deleteCustomer').and.returnValue(of({ status: true, data: 'Deleted' })),
      searchCustomer: jasmine.createSpy('searchCustomer').and.returnValue(of({ status: true, data: [data] })),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListComponent],
      providers: [{ provide: CustomersService, useValue: mockCustomersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve customers on initialization', () => {
    expect(mockCustomersService.getAllCustomers).toHaveBeenCalled();
    expect(component.customers).toEqual([data]);
  });

  // it('should delete a customer', () => {
  //   const customerId = 1; // Adjust the customer ID as needed for your test case.
  //   component.delete(customerId, 'Angel');
  //   console.log('customerId:', customerId);
  //   console.log('data:', data);
  //   expect(mockCustomersService.deleteCustomer).toHaveBeenCalledWith(customerId);
  //   expect(component.customers).toEqual([data]); // Ensure that customers are refreshed after deletion.
  // });
  

  it('should search for a customer', () => {
    const searchQuery = 'Angel';
    component.search({ target: { value: searchQuery } });
    expect(mockCustomersService.searchCustomer).toHaveBeenCalledWith(searchQuery);
    expect(component.customers).toEqual([data]);
  });


  afterEach(() => {
    TestBed.resetTestingModule(); // Reset the testing module after each test.
  });
});
