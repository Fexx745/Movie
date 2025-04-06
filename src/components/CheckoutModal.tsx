import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { QRCodeSVG } from 'qrcode.react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [orderReference, setOrderReference] = useState<string>('');

    useEffect(() => {
        if (!isOpen) return;
        setOrderReference(generateOrderReference());
        setTimeLeft(60)
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onClose()
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
                <div className="flex items-start space-x-6">
                    <div className="flex-1">
                        <p className="text-lg font-medium mb-2">จำนวนเงินที่ต้องชำระ: <span className="text-lg font-medium mb-2 text-blue-500">{total.toFixed(2)} ฿</span></p>
                        <p className="text-sm text-gray-600 mb-4">กรุณาทำการโอนเงินไปยังบัญชีต่อไปนี้:</p>

                        <div className="bg-gray-100 p-4 rounded">
                            <p className="mb-1"><strong>ธนาคาร:</strong> Movie Bank</p>
                            <p className="mb-1"><strong>ชื่อบัญชี:</strong> Movie Shop Co., Ltd.</p>
                            <p className="mb-1"><strong>หมายเลขบัญชี:</strong> 123-456-7890</p>
                            <p><strong>เลขที่อ้างอิง:</strong> {orderReference}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <QRCodeSVG value={orderReference} size={256} />
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
