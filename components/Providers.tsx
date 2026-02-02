'use client';

import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from '@/context/SessionContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </SessionProvider>
    );
}
