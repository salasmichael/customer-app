import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  baseUrl ='http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  getAllEndowments() {
    return this.http.get<any>(`${this.baseUrl}/customers`);
  }

}
