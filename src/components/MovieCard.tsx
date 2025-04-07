import React, { useState } from 'react';
import { Movie } from '../types';
import { MovieDetail } from './MovieDetail';

interface MovieCardProps {
    movie: Movie;
    onAddToCart: (movie: Movie) => void;
    onUpdatePrice: (movieId: number, price: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddToCart, onUpdatePrice }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(movie.price || 0);
    const [showDetail, setShowDetail] = useState(false);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseInt(e.target.value);
        setPrice(isNaN(newPrice) ? 0 : newPrice);
    };

    const handlePriceUpdate = () => {
        onUpdatePrice(movie.id, price);
        setIsEditing(false);
    };

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    const openDetailPopup = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setShowDetail(true);
    };

    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                onClick={openDetailPopup}
            >
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">{movie.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                    <p className="text-sm text-gray-800 mb-4 h-12 overflow-hidden">
                        {movie.overview.substring(0, 80)}
                        {movie.overview.length > 80 ? '...' : ''}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
                        </div>

                        {isEditing ? (
                            <div className="flex items-center" onClick={e => e.stopPropagation()}>
                                <input
                                    type="number"
                                    min="0"
                                    value={price}
                                    onChange={handlePriceChange}
                                    className="w-16 p-1 border rounded mr-2"
                                />
                                <button
                                    onClick={handlePriceUpdate}
                                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    บันทึก
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="font-bold">{movie.price} ฿</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="ml-2 text-xs text-blue-500"
                                >
                                    แก้ไขราคา
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(movie);
                        }}
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
            </div>

            <MovieDetail
                movie={movie}
                isOpen={showDetail}
                onClose={() => setShowDetail(false)}
                onAddToCart={onAddToCart}
            />
        </>
    );
};
