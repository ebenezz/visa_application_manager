import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = 'http://localhost:5226/api/Admin/create';
  constructor(private http: HttpClient) {}

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(this.apiUrl, adminData); // Adjust endpoint as needed
  }
}