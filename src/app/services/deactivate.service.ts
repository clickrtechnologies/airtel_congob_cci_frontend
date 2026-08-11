import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeactivateService {

  constructor(private http: HttpClient) {}

  deactivate(msisdn: string): Observable<any> {

    return this.http.post(
      `${environment.apiUrl}/deactivate?msisdn=${msisdn}`,
      {}
    );
  }
}
