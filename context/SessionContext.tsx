'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface SessionContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate auto-login for "Artur Lins"
        const artur: User = {
            id: 'u1',
            name: 'Artur Lins',
            email: 'artur.lins@exemplo.com',
            // Generating initials avatar or using a placeholder if needed, user asked for "AL" placeholder avatar.
            avatar: undefined
        };

        // Check if we have a saved session, if not, force Artur
        const saved = localStorage.getItem('mozart-session');
        if (saved) {
            setUser(JSON.parse(saved));
        } else {
            setUser(artur);
            localStorage.setItem('mozart-session', JSON.stringify(artur));
        }
        setIsLoading(false);
    }, []);

    const login = () => {
        const mockUser: User = {
            id: 'u1',
            name: 'Artur Lins',
            email: 'artur.lins@exemplo.com',
            avatar: undefined
        };
        setUser(mockUser);
        localStorage.setItem('mozart-session', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mozart-session');
    };

    return (
        <SessionContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
