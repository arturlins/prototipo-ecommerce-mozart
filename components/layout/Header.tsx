'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession } from '@/context/SessionContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Header() {
    const { toggleCart, itemsCount } = useCart();
    const { user, login, logout } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2" aria-label="Home">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <span className="font-bold text-lg">M</span>
                        </div>
                        <span className="hidden font-bold text-xl tracking-tight text-text-main md:block">
                            Mozart Fitness
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    {/* Navigation links removed as requested */}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="hidden rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary md:block">
                        <Search className="h-5 w-5" />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={logout}
                                className="hidden text-xs font-semibold text-gray-500 hover:text-red-500 md:block"
                            >
                                Sair
                            </button>
                            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2">
                                {user.avatar ? (
                                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary text-white font-bold">
                                        {user.name[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="hidden rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary md:block"
                            aria-label="Login"
                        >
                            <User className="h-5 w-5" />
                        </button>
                    )}

                    <button
                        onClick={toggleCart}
                        className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary"
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {itemsCount > 0 && (
                            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                {itemsCount}
                            </span>
                        )}
                    </button>

                    <button className="md:hidden rounded-full p-2 text-gray-500 hover:bg-gray-100">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
