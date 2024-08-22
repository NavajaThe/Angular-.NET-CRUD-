import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef,  } from '@angular/core';

import { Movie } from '../../../models/movie_model';
import { NgForm } from '@angular/forms';
import { Director } from '../../../models/director_model'; 
import { DirectorService } from '../../../services/director.service';
import { MovieService } from '../../../services/movie.service';

import { MovieUpload } from 'src/app/models/movie_up_model';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
  styleUrls: ['./director-create.component.scss']
})
export class DirectorCreateComponent implements OnInit {

  movies: Movie[] = [];

  directors: Director[] = []

  constructor(private directorService: DirectorService, private changeDetectorRef: ChangeDetectorRef, ) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  selectedActive: boolean | null = null;

  @Output() close = new EventEmitter<void>();

  @Output() directorCreated = new EventEmitter<Director>(); 


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
    const button = document.querySelector('#myCreateButtonDirector') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onSubmit(form: NgForm,) {
    if (form.valid) {
    let newDirector : Director = form.value; 
    newDirector.active = Boolean(this.selectedActive);
    form.resetForm(); // Reset the form
    this.directorService.createDirector(newDirector)
      .subscribe({
        next: createDirector => {
          this.directorCreated.emit(createDirector);
        },
      });
    
    console.log(newDirector);

    

    this.closeCreateModal();
    }
  }

}
