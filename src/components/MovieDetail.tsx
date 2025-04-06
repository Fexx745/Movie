import React from 'react';
import { Movie } from '../types';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';  
interface MovieDetailProps {
    movie: Movie;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (movie: Movie) => void;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({
    movie,
    isOpen,
    onClose,
    onAddToCart
}) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
 
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <div className="bg-white rounded-lg shadow-xl">
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-800">{movie.title}</span>
                        <IconButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            X
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <img
                                src={posterUrl}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-md"
                            />

                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Rating:</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span>{movie.vote_average.toFixed(1)}/10</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Release Date:</span>
                                    <span>{formatDate(movie.release_date)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Price:</span>
                                    <span className="font-bold text-lg">{movie.price} ฿</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onAddToCart(movie)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 font-bold"
                            >
                                เพิ่มลงตะกร้า
                            </button>
                        </div>

                        <div className="md:w-2/3">
                            <h3 className="text-xl font-semibold mb-4">Overview</h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {movie.overview || 'No overview available for this movie.'}
                            </p>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    {/* You can add other actions here if needed */}
                </DialogActions>
            </div>
        </Dialog>
    );
};
