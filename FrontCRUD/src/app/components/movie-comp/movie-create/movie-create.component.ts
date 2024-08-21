import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef,  } from '@angular/core';

import { Movie } from '../../../models/movie_model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/director_model'; 
import { DirectorService } from '../../../services/director.service';
import { MovieService } from '../../../services/movie.service';

import { MovieUpload } from 'src/app/models/movie_up_model';


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit {
  movies: Movie[] = [];

  directors: Director[] = []

  selectedDirector: number | null = null;


  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  @Output() close = new EventEmitter<void>();

  @Output() movieCreated = new EventEmitter<Movie>(); 


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

  closeCreateModal() {
    const button = document.querySelector('#myButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onSubmit(form: NgForm,) {
    if (form.valid) {
    let newMovie:MovieUpload = form.value; 
    newMovie.fKDirector = Number(this.selectedDirector);
    form.resetForm(); // Reset the form
    this.movieService.createMovie(newMovie)
      .subscribe({
        next: createdMovie => {
          this.movieCreated.emit(createdMovie);
        },
      });

    

    this.closeCreateModal();
    }
  }

}
