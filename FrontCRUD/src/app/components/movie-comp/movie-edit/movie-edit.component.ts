import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input,  } from '@angular/core';

import { Movie } from '../../../models/Movie_Model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/Director_Mode'; 
import { DirectorService } from '../../../services/director.service';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  movies: Movie[] = [];
  @Input() movieInput: Movie = {
    pkMovies: 0,
    name: "",
    gender: "",
    duration: "",
    fkDirector: 0,
    director: 0
}

  directors: Director[] = []

  selectedDirector: number | null = null; 

  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getDirectors();
  }
  

  @Output() close = new EventEmitter<void>();

  @Output() movieUpdated = new EventEmitter<Movie>(); 

  getDirectors(): void {
    this.directorService.getDirectors()
      .subscribe({
        next: directors => {
          this.directors = directors; 
          this.changeDetectorRef.detectChanges();
        },
        error: error => {
          console.error('Error fetching directors:', error);
        }
      });
  }

  closeEditModal() {
    const button = document.querySelector('#myEditButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onEditSubmit(form: NgForm) {
    if (form.valid) {
      let updatedMovie:Movie = form.value; 
      updatedMovie.pkMovies = Number(this.movieInput.pkMovies);
      updatedMovie.fkDirector = Number(updatedMovie.fkDirector);
      form.resetForm();

      console.log(updatedMovie);
      this.movieService.updateMovie(updatedMovie)
        .subscribe({
          next: updatedMovie => {
            this.movieUpdated.emit(updatedMovie);
          },
        });

      this.closeEditModal();
    }
  }

}
