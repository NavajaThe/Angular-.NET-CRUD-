import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef,  } from '@angular/core';

import { Movie } from '../../models/Movie_Model';
import { NgForm } from '@angular/forms';
import { Director } from '../../models/Director_Mode'; 
import { DirectorService } from '../../services/director.service';
import { MovieService } from '../../services/movie.service';

import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit {
  movies: Movie[] = [];

  directors: Director[] = []

  //directors$: Observable<Director[]>;
  directors$: Observable<Director[]> = of([]);
  selectedDirector: number | null = null; // Declare and optionally initialize selectedDirector


  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getDirectors();
    this.directors$ = this.directorService.getDirectors(); // Assign a value later
    //console.log(this.directors);
  }

  @Output() close = new EventEmitter<void>();

  // getDirectors(): void {
  //   this.directorService.getDirectors()
  //     .subscribe(director => this.directors = director);
  // }

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

  closeModal() {
    const button = document.querySelector('#myButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onSubmit(form: NgForm,) {
    if (form.valid) {
    let newMovie:Movie = form.value; // Get the form values
    // You might also want to close the modal here using Bootstrap's JavaScript API
    newMovie.director = Number(this.selectedDirector);
    form.resetForm(); // Reset the form
    console.log(newMovie);
    this.movieService.createMovie(newMovie)
      .subscribe(  response => console.log(response));
    this.closeModal();
    }
  }

}
