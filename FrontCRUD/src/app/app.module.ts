import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCreateComponent } from './components/movie-create/movie-create.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    MovieEditComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
