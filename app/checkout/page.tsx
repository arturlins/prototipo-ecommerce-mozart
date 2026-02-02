'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from '@/context/SessionContext';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CreditCard, QrCode, Barcode, CheckCircle2, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, subtotal, shippingCost, shippingMethod } = useCart();
    const { user } = useSession();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Mock Data State
    const [address, setAddress] = useState({
        cep: '57035-400',
        street: 'Rua das Acacias',
        number: '123',
        district: 'Ponta Verde',
        city: 'Maceió',
        state: 'AL'
    });

    const [card, setCard] = useState({
        number: '1234 5678 1234 5678',
        name: 'ARTUR LINS',
        expiry: '12/30',
        cvv: '123'
    });

    const total = subtotal + shippingCost;

    const handlePayment = () => {
        setError('');

        // Validate Address
        if (!address.cep || !address.street || !address.number || !address.district || !address.city || !address.state) {
            setError('Por favor, preencha todos os campos do endereço.');
            return;
        }

        // Validate Card
        if (paymentMethod === 'card') {
            if (!card.number || !card.name || !card.expiry || !card.cvv) {
                setError('Por favor, preencha todos os dados do cartão.');
                return;
            }
        }

        setIsProcessing(true);
        setProcessingStep('Processando pagamento...');

        setTimeout(() => {
            setProcessingStep('Enviando para o Gateway...');
            setTimeout(() => {
                setProcessingStep('Confirmando transação...');
                setTimeout(() => {
                    // Generate random order ID
                    const orderId = `PED-${Math.floor(1000 + Math.random() * 9000)}`;
                    router.push(`/order-confirmed?id=${orderId}&method=${paymentMethod}`);
                }, 800);
            }, 800);
        }, 1000);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-text-main md:text-3xl">Finalizar Compra</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="h-4 w-4" />
                        Ambiente Seguro
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column: Data */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* User Identity */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
                            <p className="text-sm font-medium text-gray-500">Comprando como</p>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                                    {user?.name?.[0] || 'U'}
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">{user?.name}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address Form */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-text-main">Endereço de Entrega</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={address.cep}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border-green-500 border-2 bg-green-50/50 p-3 outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="00000-000"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Rua</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={address.street}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Número</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={address.number}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Bairro</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={address.district}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Cidade</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Estado</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={address.state}
                                        onChange={handleAddressChange}
                                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-xl font-bold text-text-main">Pagamento</h2>

                            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={cn(
                                        "flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 font-bold transition-all",
                                        paymentMethod === 'card' ? "border-primary bg-green-50 text-primary" : "border-gray-100 hover:bg-gray-50 text-gray-500"
                                    )}
                                >
                                    <CreditCard className="h-6 w-6" />
                                    Cartão
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('pix')}
                                    className={cn(
                                        "flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 font-bold transition-all",
                                        paymentMethod === 'pix' ? "border-primary bg-green-50 text-primary" : "border-gray-100 hover:bg-gray-50 text-gray-500"
                                    )}
                                >
                                    <QrCode className="h-6 w-6" />
                                    Pix
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('boleto')}
                                    className={cn(
                                        "flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 font-bold transition-all",
                                        paymentMethod === 'boleto' ? "border-primary bg-green-50 text-primary" : "border-gray-100 hover:bg-gray-50 text-gray-500"
                                    )}
                                >
                                    <Barcode className="h-6 w-6" />
                                    Boleto
                                </button>
                            </div>

                            <div className="mt-6">
                                {paymentMethod === 'card' && (
                                    <div className="grid gap-4 animate-in fade-in slide-in-from-left-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Número do Cartão</label>
                                            <input
                                                type="text"
                                                name="number"
                                                value={card.number}
                                                onChange={handleCardChange}
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Nome no Cartão</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={card.name}
                                                onChange={handleCardChange}
                                                placeholder="Como impresso no cartão"
                                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Validade</label>
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={card.expiry}
                                                    onChange={handleCardChange}
                                                    placeholder="MM/AA"
                                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={card.cvv}
                                                    onChange={handleCardChange}
                                                    placeholder="123"
                                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="h-fit space-y-6 lg:sticky lg:top-24">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-text-main">Resumo</h2>

                            <div className="mb-4 max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                {items.map(item => (
                                    <div key={item.cartId} className="flex justify-between gap-4 text-sm">
                                        <span className="text-gray-600 line-clamp-2 w-2/3">{item.quantity}x {item.name}</span>
                                        <span className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Frete ({shippingMethod})</span>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-500 border border-red-200 animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="mt-6 w-full rounded-full bg-primary py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-600 hover:shadow-green-300 hover:-translate-y-1 disabled:opacity-80"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        {processingStep}
                                    </span>
                                ) : 'Pagar Agora'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
