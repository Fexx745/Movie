import { useState, useEffect } from 'react';
import { Movie, CartItem } from '../types';

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('movieCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (movie: Movie) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.movie.id === movie.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.movie.id === movie.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { movie, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (movieId: number) => {
        setCart(prevCart => prevCart.filter(item => item.movie.id !== movieId));
    };

    const updateQuantity = (movieId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(movieId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.movie.id === movieId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        const subtotal = cart.reduce(
            (sum, item) => sum + (item.movie.price || 0) * item.quantity,
            0
        ); 
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); 
        let discount = 0;
        if (totalItems > 5) {
            discount = subtotal * 0.2;  
        } else if (totalItems > 3) {
            discount = subtotal * 0.1;  
        } 
        return {
            subtotal,
            discount,
            total: subtotal - discount,
            totalItems
        };
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal
    };
};