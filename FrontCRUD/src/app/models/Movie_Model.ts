export interface Movie {
    pkMovies: number;
    name: string;
    gender: string;
    duration: string;

    fkDirector: number;
    director: number;
}