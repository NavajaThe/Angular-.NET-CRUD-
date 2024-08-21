import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef,  } from '@angular/core';

import { Movie } from '../../models/Movie_Model';
import { NgForm } from '@angular/forms';
import { Director } from '../../models/Director_Mode'; 
import { DirectorService } from '../../services/director.service';

import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  movies: Movie[] = [];
  directors: Director[] = []

  //directors$: Observable<Director[]>;
  directors$: Observable<Director[]> = of([]);
  selectedDirector: number | null = null; // Declare and optionally initialize selectedDirector


  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getDirectors();
    this.directors$ = this.directorService.getDirectors(); // Assign a value later
    //console.log(this.directors);
  }

  @Output() close = new EventEmitter<void>();

  getDirectors(): void {
    this.directorService.getDirectors()
      .subscribe({
        next: directors => {
          this.directors = directors; 
          this.changeDetectorRef.detectChanges();
          console.log(directors);
        },
        error: error => {
          console.error('Error fetching directors:', error);
          // Handle the error appropriately (e.g., display an error message to the user)
        }
      });
  }

  closeModal() {
    const button = document.querySelector('#myEditButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onEditSubmit(form: NgForm) {
    if (form.valid) {
      const newMovie = form.value; // Get the form values
      this.movies.push(newMovie); // Add the new movie to your movies array
      form.resetForm(); // Reset the form
      // You might also want to close the modal here using Bootstrap's JavaScript API
      this.closeModal();
    }
  }

}
