import { Component, OnInit } from '@angular/core';
import { Director } from '../../../models/director_model';
import { Movie } from '../../../models/movie_model'; 
import { DirectorService } from '../../../services/director.service';


@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.scss']
})
export class DirectorListComponent implements OnInit {

  movie_null: Movie = {
    pkMovies: 0,
    name: "",
    gender: "",
    duration: "",
    fkDirector: 0,
    director: 0
  }

  directors: Director[] = [];

  director_selected: Director = {
    pkDirector: 0,
    name: "",
    age: 0,
    active: false,
    
    movies: [this.movie_null]
  }

  // director_put: Movie = {
  //   pkMovies: 0,
  //   name: "",
  //   gender: "",
  //   duration: "",
  //   fkDirector: 0,
  //   director: 0
  // }

  constructor(private directorService: DirectorService) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  getDirectors(): void {
    this.directorService.getDirectors()
      .subscribe(movies => this.directors = movies);
  }

  onDirectorCreated(newDirectors: Director) {
    this.directors.push(newDirectors);
  }

  onDirectorUpdated(updatedDirector: Director) {
    
    const index = this.directors.findIndex(m => m.pkDirector === updatedDirector.pkDirector);
  
    if (index > -1) {
      const existingDirector = this.directors[index];
  
      this.directors[index] = {
        ...existingDirector, 
        pkDirector: updatedDirector.pkDirector || existingDirector.pkDirector,
        name: updatedDirector.name || existingDirector.name, 
        age: updatedDirector.age || existingDirector.age,
        
        active: updatedDirector.active || existingDirector.active,

        movies: updatedDirector.movies || existingDirector.movies 
      };

      this.getDirectors();
    } else {
      console.error('Movie not found in the list for update.');
    }
    
  }

  deleteDirector(director: Director): void {
    if (confirm('Are you sure you want to delete this director?')) { 
      // Check if the director has any movies
      if (director.movies && director.movies.length > 0) {
        alert("Cannot delete director. There are movies associated with this director."); 
        return; 
      }
  
      this.directorService.deleteDirector(director.pkDirector)
        .subscribe(() => {
          this.getDirectors(); 
        });
    }
  }

}
