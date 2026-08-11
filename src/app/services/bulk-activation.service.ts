import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BulkActivationService {

 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  downloadTemplate(): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/template/download`,
      {
        responseType: 'blob'
      }
    );
  }

   previewFile(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/bulk/preview`,
      formData
    );

  }
processBulk(request: any): Observable<string> {
  return this.http.post(
    `${this.apiUrl}/bulk/process`,
    request,
    {
      responseType: 'text'
    }
  );
}

getBulkHistory(
  page: number = 0,
  size: number = 5,
  previewId: string = ''
): Observable<any> {

  return this.http.get<any>(
    `${this.apiUrl}/bulk/history`,
    {
      params: {
        page: page,
        size: size,
        previewId: previewId
      }
    }
  );
}

downloadReport(previewId: string) {
  return this.http.get(
    `${this.apiUrl}/bulk/report/${previewId}`,
    {
      responseType: 'blob'
    }
  );
}
exportHistory() {
  return this.http.get(
    `${this.apiUrl}/bulk/history/export`,
    {
      responseType: 'blob'
    }
  );
}
}