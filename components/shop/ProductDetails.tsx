'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag, Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function ProductDetails({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
    const [isAdding, setIsAdding] = useState(false);
    const [mainImage, setMainImage] = useState(product.image);

    // Reset image when product changes
    if (mainImage !== product.image && !product.gallery?.includes(mainImage)) {
        setMainImage(product.image);
    }

    // Check if all variations are selected
    const allVariationsSelected = product.variations
        ? product.variations.every(v => selectedVariations[v.type])
        : true;

    // Dynamic Price Calculation
    const calculatePrice = () => {
        let price = product.price;

        // Logic for Halteres (ID 3 or category Musculação + Name)
        if (product.id === '3') { // Halteres Sextavados
            const weight = selectedVariations['Peso'];
            if (weight === '5kg') price = 60.00;
            if (weight === '10kg') price = 90.00;
            if (weight === '15kg') price = 120.00;
        }

        // Logic for Whey (ID 4)
        if (product.id === '4') { // Whey Protein
            const size = selectedVariations['Tamanho'];
            if (size === '1.8kg') price = 349.90;
        }

        // Logic for Yoga Mat (ID 1)
        if (product.id === '1') { // Tapete de Yoga
            const thickness = selectedVariations['Espessura'];
            if (thickness === '6mm') price = 159.90; // Price increase for thicker mat
        }

        return price;
    };

    const currentPrice = calculatePrice();

    const handleAddToCart = () => {
        if (!allVariationsSelected) return;

        setIsAdding(true);
        // Add to cart with the calculated price
        addToCart({ ...product, price: currentPrice }, quantity, selectedVariations);

        // Visual feedback
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const toggleVariation = (type: string, value: string) => {
        setSelectedVariations(prev => ({
            ...prev,
            [type]: prev[type] === value ? '' : value
        }));
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-100">
                        <Image
                            src={mainImage}
                            alt={product.name}
                            fill
                            className="object-contain mix-blend-multiply p-4"
                            priority
                        />
                    </div>
                    {product.gallery && product.gallery.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.gallery.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(img)}
                                    className={cn(
                                        "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all hover:scale-105",
                                        mainImage === img ? "border-primary ring-2 ring-primary ring-offset-2" : "border-gray-200"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info & Actions */}
                <div className="flex flex-col justify-center">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm font-bold text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{product.rating}</span>
                        </div>
                    </div>

                    <h1 className="mb-4 text-3xl font-extrabold text-text-main md:text-5xl lg:text-6xl">
                        {product.name}
                    </h1>

                    <div className="mb-8 space-y-6 border-y border-gray-100 py-8">
                        {/* Variations */}
                        {product.variations?.map((variation) => (
                            <div key={variation.type}>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
                                    {variation.type}: <span className="text-primary">{selectedVariations[variation.type]}</span>
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {variation.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => toggleVariation(variation.type, option)}
                                            className={cn(
                                                "rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all",
                                                selectedVariations[variation.type] === option
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity */}
                        <div>
                            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">Quantidade</h3>
                            <div className="flex w-fit items-center gap-4 rounded-xl border border-gray-200 bg-white p-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center text-lg font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400">Preço Total</span>
                            <span className="text-4xl font-bold text-primary">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice * quantity)}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!allVariationsSelected}
                            className={cn(
                                "flex flex-1 items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-all",
                                !allVariationsSelected
                                    ? "cursor-not-allowed bg-gray-300 shadow-none"
                                    : isAdding
                                        ? "bg-green-700 scale-95"
                                        : "bg-primary shadow-green-200 hover:bg-green-600 hover:shadow-green-300 hover:-translate-y-1 active:scale-95"
                            )}
                        >
                            {isAdding ? (
                                <>
                                    <Check className="h-6 w-6 animate-bounce" />
                                    Adicionado
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="h-6 w-6" />
                                    {allVariationsSelected ? 'Adicionar ao Carrinho' : 'Selecione as opções'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Description Section Moved Below */}
            <div className="max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold text-text-main">Sobre o Produto</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </div>
        </div>
    );
}
