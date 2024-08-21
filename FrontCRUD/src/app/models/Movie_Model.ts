export interface Movie {
    pkMovies: number;
    name: string;
    gender: string;
    duration: string;

    fKDirector: number;
    director: number;
}