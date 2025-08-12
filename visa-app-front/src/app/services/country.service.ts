import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl = 'http://localhost:5226/api/Country';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(country: any): Observable<any> {
    return this.http.post(this.apiUrl, country);
  }

  update(id: number, country: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, country);
}


  softDelete(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/soft-delete`, { isDeleted: true });
  }
}