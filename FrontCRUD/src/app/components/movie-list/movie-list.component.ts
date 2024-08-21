import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/Movie_Model'; // Import your Movie interface


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
    fKDirector: 0,
    director: 0
}
  //showAddModal: boolean = false;

  // openAddModal() {
  //   this.showAddModal = true;
  // }

  closeAddModal() {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
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