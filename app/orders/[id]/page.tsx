'use client';

import { Header } from '@/components/layout/Header';
import { Package, Truck, CheckCircle2, MapPin, Clock, Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

const steps = [
    { id: 1, title: 'Pedido Realizado', description: 'Recebemos seu pedido.', icon: Package },
    { id: 2, title: 'Pagamento Aprovado', description: 'Transação confirmada.', icon: CheckCircle2 },
    { id: 3, title: 'Em Separação', description: 'Estamos preparando seu pacote.', icon: BoxIcon }, // defined below
    { id: 4, title: 'Em Trânsito', description: 'Seu pedido está a caminho.', icon: Truck },
    { id: 5, title: 'Entregue', description: 'Pacote entregue no endereço.', icon: MapPin },
];

function BoxIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    )
}

export default function OrderTrackingPage() {
    const params = useParams();
    const [currentStep, setCurrentStep] = useState(1);

    const advanceStep = () => {
        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-text-main md:text-3xl">Acompanhar Pedido</h1>
                        <p className="text-gray-500">Pedido #{params.id || 'PED-9988'}</p>
                    </div>

                    {/* Simulation Button */}
                    <button
                        onClick={advanceStep}
                        className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-400 hover:border-primary hover:text-primary transition-all active:scale-95"
                        title="Simular Avanço de Tempo (Demo)"
                    >
                        <Clock className="h-3 w-3" />
                        <span className="hidden sm:inline">Simular Avanço</span>
                        <Play className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 ml-1 fill-primary" />
                    </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content - Timeline */}
                    <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-8 text-xl font-bold text-text-main">Status da Entrega</h2>

                        <div className="relative ml-4 space-y-8 pl-8 md:ml-8 md:pl-12">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] top-2 h-[calc(100%-40px)] w-0.5 bg-gray-100 md:left-[35px]"></div>

                            {steps.map((step, index) => {
                                const isActive = index + 1 === currentStep;
                                const isCompleted = index + 1 < currentStep;
                                const isPending = index + 1 > currentStep;
                                const Icon = step.icon;

                                return (
                                    <div key={step.id} className="relative transition-all duration-500 ease-out">
                                        {/* Dot/Icon */}
                                        <div className={cn(
                                            "absolute -left-[45px] top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-500 md:-left-[69px] md:h-14 md:w-14",
                                            isActive ? "border-green-100 bg-primary text-white scale-110 shadow-lg shadow-green-200" :
                                                isCompleted ? "border-green-100 bg-primary text-white" : "border-white bg-gray-100 text-gray-300"
                                        )}>
                                            {isCompleted ? <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" /> : <Icon className="h-5 w-5 md:h-6 md:w-6" />}
                                        </div>

                                        {/* Content */}
                                        <div className={cn(
                                            "rounded-xl p-4 transition-all border",
                                            isActive ? "bg-green-50 border-green-100 translate-x-2" : "border-transparent bg-transparent"
                                        )}>
                                            <h3 className={cn("text-lg font-bold", isActive || isCompleted ? "text-text-main" : "text-gray-400")}>
                                                {step.title}
                                            </h3>
                                            <p className={cn("text-sm", isActive || isCompleted ? "text-gray-600" : "text-gray-400")}>
                                                {isActive && step.id === 3 ? "Processando no armazém..." : step.description}
                                            </p>
                                            {isActive && (
                                                <div className="mt-2 text-xs font-semibold text-primary animate-pulse">
                                                    Em andamento...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar - Details */}
                    <div className="space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-text-main">Detalhes da Entrega</h3>
                            <div className="flex items-start gap-3 text-sm text-gray-600">
                                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                                <div>
                                    <p className="font-bold text-gray-900">Endereço Principal</p>
                                    <p>Rua Exemplo, 123 - Centro</p>
                                    <p>Maceió - AL</p>
                                    <p>57000-000</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-text-main">Resumo</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Produtos (mock)</span>
                                    <span>R$ 150,00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Frete</span>
                                    <span>R$ 12,50</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>R$ 162,50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
