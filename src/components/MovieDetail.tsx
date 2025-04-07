import React from 'react';
import { Movie } from '../types';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

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
                                    <span className="font-semibold">คะแนนเรตติ้ง:</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span>{movie.vote_average.toFixed(1)}/10</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">วันฉาย:</span>
                                    <span>{formatDate(movie.release_date)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">ราคา:</span>
                                    <span className="font-bold text-lg">{movie.price} ฿</span>
                                </div>
                            </div>


                            <button
                                onClick={() => onAddToCart(movie)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 font-bold flex items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    <path d="M16 10v6" />
                                    <path d="M13 13h6" />
                                </svg> 
                                เพิ่มลงตะกร้า
                            </button>
                        </div>

                        <div className="md:w-2/3">
                            <h3 className="text-xl font-semibold mb-4">เรื่องย่อ</h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {movie.overview || 'ไม่มีเรื่องย่อสำหรับภาพยนตร์เรื่องนี้'}
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};
