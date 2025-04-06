import React from 'react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface MovieListProps {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    onAddToCart: (movie: Movie) => void;
    onUpdatePrice: (movieId: number, price: number) => void;
}

export const MovieList: React.FC<MovieListProps> = ({
    movies,
    loading,
    error,
    onAddToCart,
    onUpdatePrice
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-8">
                {error}
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center text-gray-500 p-8">
                No movies found. Try a different search term.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddToCart={onAddToCart}
                    onUpdatePrice={onUpdatePrice}
                />
            ))}
        </div>
    );
};