export interface Movie {
    PKMovies: number;
    Name: string;
    Gender: string;
    Duration: string;

    FKDirector: number;
    Director: string;
}