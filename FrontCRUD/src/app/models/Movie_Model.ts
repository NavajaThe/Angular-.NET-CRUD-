export interface Movie {
    pKMovies: number;
    name: string;
    gender: string;
    duration: string;

    fKDirector: number;
    director: string;
}