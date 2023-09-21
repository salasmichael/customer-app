import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

  baseUrl ='http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<any>(`${this.baseUrl}/identificationType`);
  }
}
