import { Movie } from '../models/Movie_Model'; // Import your Movie interface

export interface Director {
    pkDirector: number;
    name: string;
    age: number;
    active: boolean;

    movies: Movie;
}



