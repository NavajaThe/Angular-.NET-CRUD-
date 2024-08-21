import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './components/movie-comp/movie-list/movie-list.component';
import { MovieCreateComponent } from './components/movie-comp/movie-create/movie-create.component';
import { MovieEditComponent } from './components/movie-comp/movie-edit/movie-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { DirectorListComponent } from './components/director-comp/director-list/director-list.component';
import { DirectorCreateComponent } from './components/director-comp/director-create/director-create.component';
import { DirectorEditComponent } from './components/director-comp/director-edit/director-edit.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    MovieEditComponent,
    DirectorListComponent,
    DirectorCreateComponent,
    DirectorEditComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
