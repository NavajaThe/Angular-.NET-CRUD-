import { Movie } from '../models/Movie_Model'; // Import your Movie interface

interface Director {
    PKDirector: number;
    Name: string;
    Age: number;
    Active: boolean;

    Movies: Movie;
}



