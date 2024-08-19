import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/Movie_Model'; // Import your Movie interface

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  //styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  deleteMovie(movie: Movie): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movie.PKMovies)
        .subscribe(() => {
          this.movies = this.movies.filter(m => m !== movie);
        });
    }
  }
}