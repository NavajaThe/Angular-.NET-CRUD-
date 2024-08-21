import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input,  } from '@angular/core';

import { Movie } from '../../../models/Movie_Model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/Director_Mode'; 
import { DirectorService } from '../../../services/director.service';
import { MovieUpload } from 'src/app/models/Movie_Up_Model';
import { MovieService } from '../../../services/movie.service';
//import { MoviePUT } from 'src/app/models/Movie_PUT_Mode';

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
    //console.log(this.movieInput);
  }
  

  @Output() close = new EventEmitter<void>();

  @Output() movieUpdated = new EventEmitter<Movie>(); 

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

  closeEditModal() {
    const button = document.querySelector('#myEditButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onEditSubmit(form: NgForm) {
    if (form.valid) {
      let updatedMovie:Movie = form.value; // Get the form values
      // You might also want to close the modal here using Bootstrap's JavaScript API
      updatedMovie.pkMovies = Number(this.movieInput.pkMovies);
      updatedMovie.fkDirector = Number(updatedMovie.fkDirector);
      form.resetForm(); // Reset the form

      console.log(updatedMovie);
      this.movieService.updateMovie(updatedMovie)
        .subscribe({
          next: updatedMovie => {
            this.movieUpdated.emit(updatedMovie); // Emit the created movie
            // ... (rest of your logic)
          },
        });

      this.closeEditModal();
    }
  }

}
