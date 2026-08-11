import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchTonesService {

 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

   getArtists(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/artist`);
  }

  searchCatalog(
    page: number,
    size: number,
    search?: string,
    category?: string,
    artist?: string,
    sort?: string
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (artist) {
      params = params.set('artist', artist);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<any>(`${this.apiUrl}/catalog/search`, { params });
  }

}