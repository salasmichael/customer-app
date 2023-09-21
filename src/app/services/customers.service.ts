import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  baseUrl ='http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }

  createCustomer(customer: any): Observable<Customer> {
    return this.http.post(`${this.baseUrl}/create`, customer);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
