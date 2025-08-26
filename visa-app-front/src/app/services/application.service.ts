import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5226/api/Application';

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getApplication(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  softDelete(id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/soft-delete`, { isDeleted: true });  
  }

  uploadDocument(id: number, formData: FormData) {
  return this.http.post(`http://localhost:5226/api/application/${id}/upload`, formData);
  }

  downloadPdf(id: number): Observable<Blob> {
  return this.http.get(`http://localhost:5226/api/application/${id}/download`, {
    responseType: 'blob'
  });
}

getPaymentStatusSummary(): Observable<{ status: string, count: number }[]> {
  return this.http.get<{ status: string, count: number }[]>('http://localhost:5226/api/application/payment-status-summary');
}

updatePaymentStatus(id: number, isPaid: boolean) {
  return this.http.put(`http://localhost:5226/api/applications/${id}/payment`, { isPaid });
}

}
