import { Movie } from './movie_model'; // Import your Movie interface

export interface Director {
    pkDirector: number;
    name: string;
    age: number;
    active: boolean;

    movies: Movie;
}



