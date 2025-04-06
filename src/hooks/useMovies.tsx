import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../types';

export const useMovies = (initialQuery = 'a') => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>(initialQuery);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const API_KEY = '1381881626a7be3a9c906accd47c2449';
    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return; 
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
                );
                const moviesWithPrices = response.data.results.map((movie: any) => ({
                    ...movie,
                    price: Math.floor(Math.random() * 150) + 50
                }));
                setMovies(moviesWithPrices);
                setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);
            } catch (err) {
                setError('Failed to fetch movies. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query, page, API_KEY]);

    const updateMoviePrice = (movieId: number, newPrice: number) => {
        setMovies(
            movies.map(movie =>
                movie.id === movieId ? { ...movie, price: newPrice } : movie
            )
        );
    };

    return {
        movies,
        loading,
        error,
        setQuery,
        updateMoviePrice,
        page,
        setPage,
        totalPages
    };
};