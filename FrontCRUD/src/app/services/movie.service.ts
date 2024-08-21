import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie_Model'; 
import { MovieUpload } from '../models/Movie_Up_Model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5095/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: MovieUpload): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.apiUrl}/${movie.pkMovies}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}