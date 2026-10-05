import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../environment';
import { Customer, PageResponse } from './customer.model';
import { CustomerFormValue, customerSchema } from './customer.schema';

@Injectable()
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE_URL}/api/customers`;

  getPage(page: number, size: number, search: string): Observable<PageResponse<Customer>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (search.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<PageResponse<Customer>>(`${this.baseUrl}/page`, { params });
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(payload: CustomerFormValue): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customerSchema.parse(payload));
  }

  update(id: number, payload: CustomerFormValue): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customerSchema.parse(payload));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}