'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
    cartId: string; // Unique ID for cart item (product ID + variations)
    quantity: number;
    selectedVariations?: Record<string, string>;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, variations?: Record<string, string>) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    itemsCount: number;
    shippingCost: number;
    shippingMethod: string | null;
    setShipping: (cost: number, method: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mozart-ecommerce-cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse cart data', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = useCallback((product: Product, quantity: number = 1, variations: Record<string, string> = {}) => {
        const variationKey = Object.entries(variations).sort().toString();
        const cartId = `${product.id}-${variationKey}`;

        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.cartId === cartId);
            if (existingItem) {
                return currentItems.map(item =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...currentItems, { ...product, cartId, quantity, selectedVariations: variations }];
        });

        setIsCartOpen(true);
    }, []);

    const removeFromCart = useCallback((cartId: string) => {
        setItems(current => current.filter(item => item.cartId !== cartId));
    }, []);

    const updateQuantity = useCallback((cartId: string, quantity: number) => {
        if (quantity < 1) {
            setItems(current => current.filter(item => item.cartId !== cartId));
            return;
        }
        setItems(current =>
            current.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

    const [shippingCost, setShippingCost] = useState(0);
    const [shippingMethod, setShippingMethod] = useState<string | null>(null);

    const setShipping = useCallback((cost: number, method: string) => {
        setShippingCost(cost);
        setShippingMethod(method);
    }, []);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const contextValue = React.useMemo(() => ({
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        isCartOpen,
        toggleCart,
        itemsCount,
        shippingCost,
        shippingMethod,
        setShipping
    }), [items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, isCartOpen, toggleCart, itemsCount, shippingCost, shippingMethod, setShipping]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
