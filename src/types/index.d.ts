export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    price?: number;
}

export interface CartItem {
    movie: Movie;
    quantity: number;
}