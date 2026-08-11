import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SetRbtService {

  constructor(private http: HttpClient) {}

  getCatalog(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/catalog`
    );
  }
  activateRbt(payload: any) {
  return this.http.post(
    `${environment.apiUrl}/activate`,
    payload
  );
}
}
