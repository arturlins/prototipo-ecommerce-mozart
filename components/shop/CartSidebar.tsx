'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function CartSidebar() {
    const { isCartOpen, toggleCart, items, updateQuantity, removeFromCart, subtotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-md animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-text-main">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        Seu Carrinho
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-gray-500">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                                <ShoppingBag className="h-10 w-10 text-gray-300" />
                            </div>
                            <p className="text-lg font-medium">Seu carrinho está vazio</p>
                            <p className="text-sm">Explore nossos produtos e comece sua jornada fitness!</p>
                            <button
                                onClick={toggleCart}
                                className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                            >
                                Voltar às compras
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.cartId} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold text-text-main line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.cartId)}
                                                    className="text-gray-300 transition-colors hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {item.category}
                                                {item.selectedVariations && Object.values(item.selectedVariations).length > 0 && (
                                                    <span className="ml-1 border-l pl-1">
                                                        {Object.values(item.selectedVariations).join(', ')}
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-primary">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                            </p>

                                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                    className="rounded-md p-1 hover:bg-white hover:shadow-sm"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-4 text-center text-xs font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    className="rounded-md p-1 hover:bg-white hover:shadow-sm"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t bg-gray-50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-xl font-bold text-text-main">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}
                            </span>
                        </div>
                        <div className="grid gap-3">
                            <Link
                                href="/cart"
                                onClick={toggleCart}
                                className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-green-600 hover:shadow-primary/30 active:scale-[0.98]"
                            >
                                Finalizar Compra
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
