import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/Director_Mode'; 

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private apiUrl = 'http://localhost:5095/director'; 

  constructor(private http: HttpClient) { }

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.apiUrl);
  }

  getDirector(id: number): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/${id}`);
  }

  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(this.apiUrl, director);
  }

  updateDirector(director: Director): Observable<any> {
    return this.http.put(`${this.apiUrl}/${director.pkDirector}`, director); 
  }

  deleteDirector(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}