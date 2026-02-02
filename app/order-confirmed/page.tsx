'use client';

import { Header } from '@/components/layout/Header';
import { CheckCircle2, Package, ArrowRight, QrCode, Barcode, Download } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

function OrderConfirmedContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id') || 'PED-0000';
    const method = searchParams.get('method');
    const { clearCart } = useCart();

    // Clear cart on mount
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-lg shadow-green-100">
                <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>

            <h1 className="mb-2 text-3xl font-bold text-text-main md:text-4xl">Pedido Confirmado!</h1>
            <p className="mb-8 text-lg text-gray-500">Seu pedido <span className="font-bold text-text-main">#{orderId}</span> foi processado com sucesso.</p>

            <div className="mb-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">

                {method === 'pix' && (
                    <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center animate-in fade-in slide-in-from-top-2">
                        <div className="bg-white p-4 rounded-xl border-2 border-primary shadow-sm">
                            <div className="h-48 w-48 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">QR Code Pix</div>
                        </div>
                        <p className="text-sm text-gray-500">Escaneie o QR Code para finalizar seu pagamento.</p>
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                            <QrCode className="h-4 w-4" />
                            Copiar Chave Pix
                        </button>
                    </div>
                )}

                {method === 'boleto' && (
                    <div className="mb-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-800 animate-in fade-in slide-in-from-top-2 text-left">
                        <p className="font-bold flex items-center gap-2 mb-2"><Barcode className="h-5 w-5" /> Boleto Gerado</p>
                        <p className="text-sm mb-4">Seu boleto foi gerado com sucesso. Clique abaixo para baixar ou copiar o código.</p>
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-100 border border-yellow-300 px-4 py-3 font-bold text-yellow-900 hover:bg-yellow-200 transition-colors">
                            <Download className="h-4 w-4" />
                            Baixar Boleto PDF
                        </button>
                    </div>
                )}

                {method === 'card' && (
                    <p className="text-gray-600 mb-6">O pagamento no cartão foi aprovado. Enviamos um e-mail com a confirmação e os detalhes do pedido.</p>
                )}

                {method !== 'card' && <p className="text-gray-600 mb-6">Enviamos também um e-mail com a confirmação e os detalhes do pedido.</p>}

                <Link
                    href={`/orders/${orderId}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-600 hover:shadow-green-300 hover:-translate-y-1"
                >
                    <Package className="h-5 w-5" />
                    Acompanhar Pedido
                </Link>

                <Link href="/" className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary">
                    Voltar para a Loja
                </Link>
            </div>
        </div>
    );
}

export default function OrderConfirmedPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <Suspense fallback={<div>Carregando...</div>}>
                <OrderConfirmedContent />
            </Suspense>
        </div>
    );
}
