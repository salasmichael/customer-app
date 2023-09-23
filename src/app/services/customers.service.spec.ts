import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersService],
    });

    service = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes después de cada prueba.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all customers', () => {
    const mockCustomers = [{ /* customer data here */ }];
    service.getAllCustomers().subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/customers');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should retrieve a specific customer', () => {
    const customerId = 1; // Adjust the customer ID as needed for your test case.
    const mockCustomer = { /* customer data here */ };
    service.getCustomer(customerId).subscribe((customer) => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/customers/${customerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });

  it('should create a customer', () => {
    const mockCustomer = { /* customer data here */ };
    service.createCustomer(mockCustomer).subscribe((response) => {
      expect(response).toEqual(mockCustomer);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/create');
    expect(req.request.method).toBe('POST');
    req.flush(mockCustomer);
  });

  it('should update a customer', () => {
    const customerId = 1; // Adjust the customer ID as needed for your test case.
    const mockUpdatedCustomer = { /* updated customer data here */ };
    service.updateCustomer(customerId, mockUpdatedCustomer).subscribe((response) => {
      expect(response).toEqual(mockUpdatedCustomer);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/update/${customerId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUpdatedCustomer);
  });

  it('should delete a customer', () => {
    const customerId = 1; // Adjust the customer ID as needed for your test case.
    service.deleteCustomer(customerId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/delete/${customerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should search for a customer', () => {
    const query = 'searchQuery'; // Adjust the search query as needed for your test case.
    const mockSearchResult = { /* search result data here */ };
    service.searchCustomer(query).subscribe((result) => {
      expect(result).toEqual(mockSearchResult);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/search/${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchResult);
  });
});
