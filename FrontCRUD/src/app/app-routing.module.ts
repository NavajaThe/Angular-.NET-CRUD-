import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-comp/movie-list/movie-list.component';
import { DirectorListComponent } from './components/director-comp/director-list/director-list.component';


const routes: Routes = [
  //{ path: '', component: MovieListComponent }, // Ruta principal
  { path: 'movies', component: MovieListComponent }, 
  { path: 'director', component: DirectorListComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
