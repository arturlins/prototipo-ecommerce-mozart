'use client';

import { useCart } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, subtotal, clearCart, setShipping } = useCart();
    const router = useRouter();

    const [cep, setCep] = useState('57035-400');
    const [isCalculating, setIsCalculating] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
    const [currentShippingCost, setCurrentShippingCost] = useState(0);

    const calculateShipping = () => {
        setIsCalculating(true);
        // Simulate API call
        setTimeout(() => {
            setIsCalculating(false);
            setIsCalculated(true);
        }, 1000);
    };

    const handleSelectShipping = (cost: number, name: string, id: string) => {
        setCurrentShippingCost(cost);
        setSelectedShipping(id);
        setShipping(cost, name);
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
                <h1 className="mb-8 text-3xl font-bold text-text-main md:text-4xl">
                    Seu Carrinho de Compras
                </h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                            <ShoppingBag className="h-10 w-10 text-gray-300" />
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-text-main">Seu carrinho está vazio</h2>
                        <p className="mb-8 text-gray-500">Parece que você ainda não adicionou nenhum item.</p>
                        <Link
                            href="/"
                            className="rounded-full bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-green-600"
                        >
                            Começar a comprar
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.cartId} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-bold text-text-main">{item.name}</h3>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                            {item.selectedVariations && Object.values(item.selectedVariations).length > 0 && (
                                                <div className="mt-1 flex gap-2">
                                                    {Object.entries(item.selectedVariations).map(([key, value]) => (
                                                        <span key={key} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                                            {key}: {value}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-8 sm:justify-end">
                                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                    className="rounded-md p-1 hover:bg-white hover:shadow-sm"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    className="rounded-md p-1 hover:bg-white hover:shadow-sm"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.cartId)}
                                                className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                title="Remover item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={clearCart}
                                    className="text-sm font-medium text-red-500 hover:text-red-700 underline"
                                >
                                    Esvaziar Carrinho
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm sticky top-24">
                            <h2 className="mb-6 text-xl font-bold text-text-main">Resumo do Pedido</h2>

                            {/* Shipping Calculator */}
                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Entrega</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="CEP"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9))}
                                        className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    <button
                                        onClick={calculateShipping}
                                        disabled={cep.length < 9 || isCalculating}
                                        className="rounded-lg bg-gray-900 px-4 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {isCalculating ? '...' : 'OK'}
                                    </button>
                                </div>

                                {isCalculated && (
                                    <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-green-50">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                className="mt-1 text-primary focus:ring-primary"
                                                checked={selectedShipping === 'flash'}
                                                onChange={() => handleSelectShipping(12.50, 'Transportadora Flash', 'flash')}
                                            />
                                            <div className="flex-1 text-sm">
                                                <div className="font-bold text-gray-900">Transportadora Flash</div>
                                                <div className="text-gray-500">7 dias úteis - Econômico</div>
                                            </div>
                                            <div className="font-bold text-gray-900">R$ 12,50</div>
                                        </label>

                                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-green-50">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                className="mt-1 text-primary focus:ring-primary"
                                                checked={selectedShipping === 'sedex'}
                                                onChange={() => handleSelectShipping(25.90, 'Sedex', 'sedex')}
                                            />
                                            <div className="flex-1 text-sm">
                                                <div className="font-bold text-gray-900">Sedex</div>
                                                <div className="text-gray-500">3 dias úteis - Expresso</div>
                                            </div>
                                            <div className="font-bold text-gray-900">R$ 25,90</div>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 border-b border-gray-100 pb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Frete</span>
                                    <span className={cn("font-medium", currentShippingCost > 0 ? "text-gray-900" : (isCalculated && currentShippingCost === 0 ? "text-green-600" : "text-gray-500"))}>
                                        {isCalculating
                                            ? 'Calculando...'
                                            : isCalculated && currentShippingCost > 0
                                                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentShippingCost)
                                                : isCalculated && currentShippingCost === 0
                                                    ? 'Grátis'
                                                    : 'Calcular'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between text-xl font-bold text-text-main">
                                <span>Total</span>
                                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal + currentShippingCost)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={!selectedShipping}
                                className="mt-8 w-full rounded-full bg-primary py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-600 hover:shadow-green-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Finalizar Compra
                            </button>

                            <Link href="/" className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary">
                                <ArrowLeft className="h-4 w-4" />
                                Continuar Comprando
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
