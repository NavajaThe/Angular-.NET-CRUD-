import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/Movie_Model'; // Import your Movie interface
import { MovieCreateComponent } from './../movie-create/movie-create.component';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  //styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  showAddModal: boolean = false;

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    console.log("Mi Hijo me avandono")
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  manejarEventoDelHijo(datos: any) { // <-- Cambiar 'any' por el tipo de dato que esperas recibir
    console.log('El hijo emitió un evento:', datos);
    // ... hacer algo con los datos recibidos
  }

  deleteMovie(movie: Movie): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movie.pKMovies)
        .subscribe(() => {
          this.movies = this.movies.filter(m => m !== movie);
        });
    }
  }

  


}