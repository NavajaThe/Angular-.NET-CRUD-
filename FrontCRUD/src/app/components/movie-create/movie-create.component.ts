import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Movie } from '../../models/Movie_Model';
import { NgForm } from '@angular/forms';
import { Director } from '../../models/Director_Mode'; 


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit {
  movies: Movie[] = [];

  director: Director[] = []

  constructor() { }

  ngOnInit(): void {
  }

  @Output() close = new EventEmitter<void>();

  closeModal() {
    console.log("bye bye")
    const button = document.querySelector('#myButton') as HTMLButtonElement;
    if (button) {
      button.click();
    }
     this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newMovie = form.value; // Get the form values
      this.movies.push(newMovie); // Add the new movie to your movies array
      form.resetForm(); // Reset the form
      // You might also want to close the modal here using Bootstrap's JavaScript API
      this.closeModal();
    }
  }

}
