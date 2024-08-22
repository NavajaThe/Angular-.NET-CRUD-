import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input,  } from '@angular/core';

import { Movie } from '../../../models/movie_model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/director_model'; 
import { DirectorService } from '../../../services/director.service';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-director-edit',
  templateUrl: './director-edit.component.html',
  styleUrls: ['./director-edit.component.scss']
})
export class DirectorEditComponent implements OnInit {

  movie_null: Movie = {
    pkMovies: 0,
    name: "",
    gender: "",
    duration: "",
    fkDirector: 0,
    director: 0
  }

  director: Director[] = [];

  @Input() directorInput: Director = {
    pkDirector: 0,
    name: "",
    age: 0,
    active: false,
    movies: [this.movie_null]
}

  directors: Director[] = []

  selectedDirector: number | null = null; 

  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getDirectors();
  }
  

  @Output() close = new EventEmitter<void>();

  @Output() directorsUpdated = new EventEmitter<Director>(); 

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
      let updatedDirector : Director = form.value; 
      updatedDirector.pkDirector = Number(this.directorInput.pkDirector);
      form.resetForm();

      console.log(updatedDirector);
      this.directorService.updateDirector(updatedDirector)
        .subscribe({
          next: updatedDirector => {
            this.directorsUpdated.emit(updatedDirector);
          },
        });

      this.closeEditModal();
    }
  }

}
