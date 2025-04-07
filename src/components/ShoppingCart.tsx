import React, { useState } from 'react';
import { CartItem } from '../types';
import { CheckoutModal } from './CheckoutModal';

interface ShoppingCartProps {
    cart: CartItem[];
    onRemove: (movieId: number) => void;
    onUpdateQuantity: (movieId: number, quantity: number) => void;
    onClear: () => void;
    totalInfo: {
        subtotal: number;
        discount: number;
        total: number;
        totalItems: number;
    };
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
    cart,
    onRemove,
    onUpdateQuantity,
    onClear,
    totalInfo
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setShowModal(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">ตะกร้าสินค้า</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">ไม่มีสินค้าในตะกร้า ....</p>
            ) : (
                <>
                    <div className="max-h-96 overflow-y-auto mb-4">
                        {cart.map(item => (
                            <div key={item.movie.id} className="flex items-center justify-between py-3 border-b">
                                <div className="flex items-center">
                                    <img
                                        src={item.movie.poster_path ? `https://image.tmdb.org/t/p/w92${item.movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Image'}
                                        alt={item.movie.title}
                                        className="w-12 h-16 object-cover mr-3"
                                    />
                                    <div>
                                        <p className="font-medium truncate max-w-xs w-40 overflow-hidden text-ellipsis">
                                            {item.movie.title}
                                        </p>
                                        <p className="text-gray-600">{item.movie.price} ฿</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <button
                                        onClick={() => onUpdateQuantity(item.movie.id, item.quantity - 1)}
                                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.movie.id, item.quantity + 1)}
                                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => onRemove(item.movie.id)}
                                        className="ml-3 text-red-500 hover:text-red-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between mb-2">
                            <span>ยอดรวม:</span>
                            <span>{totalInfo.subtotal.toFixed(2)} ฿</span>
                        </div>
                        {totalInfo.discount > 0 && (
                            <div className="flex justify-between mb-2 text-yellow-500 font-semibold">
                                <span>
                                    ลดราคา ({totalInfo.totalItems > 5 ? '20%' : '10%'}):
                                </span>
                                <span>-{totalInfo.discount.toFixed(2)} ฿</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>จำนวนที่ต้องชำระ:</span>
                            <span>{totalInfo.total.toFixed(2)} ฿</span>
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <button
                                onClick={onClear}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
                            >
                                เคลียร์ตะกร้า
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                            >
                                ชำระเงิน
                            </button>
                        </div>
                    </div>
                </>
            )}

            <CheckoutModal
                cart={cart}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                totalInfo={totalInfo}
                onClear={onClear}
            />
        </div>
    );
};
