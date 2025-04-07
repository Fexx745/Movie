import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { QRCodeSVG } from 'qrcode.react';

interface CheckoutModalProps {
    cart: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    totalInfo: {
        subtotal: number;
        discount: number;
        total: number;
        totalItems: number;
    };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onClear, totalInfo, cart }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [orderReference, setOrderReference] = useState<string>('');

    useEffect(() => {
        if (!isOpen) return;
        setOrderReference(generateOrderReference());
        setTimeLeft(60);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onClear(); 
                    onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    const generateOrderReference = () => {
        return `MOV-${Math.floor(Math.random() * 10000)}`;
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle><span>กรุณาทำการชำระเงิน</span></DialogTitle>
            <DialogContent>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">รายการสินค้าที่ต้องชำระ:</h3>
                    <ul className="space-y-2">
                        {cart.map(item => (
                            <li key={item.movie.id} className="flex justify-between">
                                <div className='flex gap-2'>
                                    <img
                                        src={item.movie.poster_path ? `https://image.tmdb.org/t/p/w92${item.movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Image'}
                                        alt={item.movie.title}
                                        className="w-12 h-12 object-cover"
                                    />
                                    <span>{item.movie.title} x {item.quantity}</span>
                                </div>
                                <span className="text-gray-600">{(item.movie?.price ?? 0) * item.quantity} ฿</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-1">
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
                        <p className="text-lg font-medium mb-2">จำนวนเงินที่ต้องชำระ: <span className="text-lg font-medium mb-2 text-black-600">{totalInfo.total.toFixed(2)} ฿</span></p>
                        <p className="text-sm text-gray-600 mb-4">กรุณาทำการสแกน QR CODE เพื่อชำระเงิน:</p>
                    </div>
                    <div className="flex-shrink-0">
                        <QRCodeSVG value={orderReference} size={200} />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">กรุณาทำการชำระเงินภายในเวลา:</p>
                    <p className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
