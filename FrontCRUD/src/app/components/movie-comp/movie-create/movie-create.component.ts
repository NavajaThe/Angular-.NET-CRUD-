import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef,  } from '@angular/core';

import { Movie } from '../../../models/movie_model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/director_mode'; 
import { DirectorService } from '../../../services/director.service';
import { MovieService } from '../../../services/movie.service';

import { Observable, of } from 'rxjs';
import { MovieUpload } from 'src/app/models/movie_up_model';


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit {
  movies: Movie[] = [];

  directors: Director[] = []

  //directors$: Observable<Director[]>;
  //directors$: Observable<Director[]> = of([]);
  selectedDirector: number | null = null; // Declare and optionally initialize selectedDirector


  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getDirectors();
    //this.directors$ = this.directorService.getDirectors(); // Assign a value later
    //console.log(this.directors);
  }

  @Output() close = new EventEmitter<void>();

  @Output() movieCreated = new EventEmitter<Movie>(); 


  getDirectors(): void {
    this.directorService.getDirectors()
      .subscribe({
        next: directors => {
          this.directors = directors; 
          this.changeDetectorRef.detectChanges();
          //console.log(directors);
        },
        error: error => {
          console.error('Error fetching directors:', error);
          // Handle the error appropriately (e.g., display an error message to the user)
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
    let newMovie:MovieUpload = form.value; // Get the form values
    // You might also want to close the modal here using Bootstrap's JavaScript API
    newMovie.fKDirector = Number(this.selectedDirector);
    form.resetForm(); // Reset the form
    this.movieService.createMovie(newMovie)
      .subscribe({
        next: createdMovie => {
          this.movieCreated.emit(createdMovie); // Emit the created movie
          // ... (rest of your logic)
        },
      });

    

    this.closeCreateModal();
    }
  }

}