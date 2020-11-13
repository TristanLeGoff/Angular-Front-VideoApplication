import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlHisto = 'http://localhost:8000/api/history';
const baseUrlBookmark = 'http://localhost:8000/api/bookmark';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getAllHistory(): Observable<any> {
    return this.http.get(baseUrlHisto);
  }

  getHistory(id): Observable<any> {
    return this.http.get(`${baseUrlHisto}/${id}`);
  }

  createHistory(data): Observable<any> {
    return this.http.post(baseUrlHisto, data);
  }

  updateHistory(id, data): Observable<any> {
    return this.http.put(`${baseUrlHisto}/${id}`, data);
  }

  deleteHistory(id): Observable<any> {
    return this.http.delete(`${baseUrlHisto}/${id}`);
  }

  deleteAllHistory(): Observable<any> {
    return this.http.delete(baseUrlHisto);
  }

  getAllBookmark(): Observable<any> {
    return this.http.get(baseUrlBookmark);
  }

  getBookmark(id): Observable<any> {
    return this.http.get(`${baseUrlBookmark}/${id}`);
  }

  createBookmark(data): Observable<any> {
    return this.http.post(baseUrlBookmark, data);
  }

  updateBookmark(id, data): Observable<any> {
    return this.http.put(`${baseUrlBookmark}/${id}`, data);
  }

  deleteBookmark(id): Observable<any> {
    return this.http.delete(`${baseUrlBookmark}/${id}`);
  }

  deleteAllBookmark(): Observable<any> {
    return this.http.delete(baseUrlBookmark);
  }

  getNumberBookmark(): Observable<any> {
    return this.http.get('http://localhost:8000/api/totalbookmark');
  }
  
}