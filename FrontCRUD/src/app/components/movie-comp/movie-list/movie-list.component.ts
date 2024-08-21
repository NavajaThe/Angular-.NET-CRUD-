import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/Movie_Model'; // Import your Movie interface


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  //styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  movie_selected: Movie = {
    pkMovies: 0,
    name: "",
    gender: "",
    duration: "",
    fkDirector: 0,
    director: 0
  }

  movie_put: Movie = {
    pkMovies: 0,
    name: "",
    gender: "",
    duration: "",
    fkDirector: 0,
    director: 0
  }
  //showAddModal: boolean = false;

  // openAddModal() {
  //   this.showAddModal = true;
  // }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  onMovieCreated(newMovie: Movie) {
    this.movies.push(newMovie); // Add the new movie to the list
  }

  onMovieUpdated(updatedMovie: Movie) {
    
    const index = this.movies.findIndex(m => m.pkMovies === updatedMovie.pkMovies);
  
    if (index > -1) {
      const existingMovie = this.movies[index];
  
      this.movies[index] = {
        ...existingMovie, 
        name: updatedMovie.name || existingMovie.name, 
        gender: updatedMovie.gender || existingMovie.gender,
        duration: updatedMovie.duration || existingMovie.duration,
        fkDirector: updatedMovie.fkDirector || existingMovie.fkDirector,
        director: updatedMovie.fkDirector || existingMovie.fkDirector 
      };

      this.getMovies();
    } else {
      console.error('Movie not found in the list for update.');
    }
    
  }

  deleteMovie(movie: Movie): void {
    console.log(movie)
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movie.pkMovies)
        .subscribe(() => {
          this.getMovies();
        });
    }
  }

  


}