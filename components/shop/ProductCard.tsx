'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        // For prototype, we default to first variation if exists
        const defaultVariations: Record<string, string> = {};
        if (product.variations) {
            product.variations.forEach(v => {
                defaultVariations[v.type] = v.options[0];
            });
        }
        addToCart(product, 1, defaultVariations);
    };

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Link href={`/product/${product.id}`} className="block h-full w-full"> {/* Wrapped Image and Rating Badge in Link */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                    </div>
                </Link>

                {/* Quick Add Button (Overlay) */}
                <div className={cn(
                    "absolute inset-x-4 bottom-4 translate-y-[120%] transition-transform duration-300",
                    isHovered && "translate-y-0"
                )}>
                    <button
                        onClick={handleAddToCart}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-text-main shadow-lg hover:bg-gray-50 active:scale-95"
                    >
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</div>
                <h3 className="mb-2 text-base font-bold text-text-main leading-tight line-clamp-2">{product.name}</h3>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                    {/* Mobile Add Button (Visible if no hover capability or simple access) */}
                    <button
                        onClick={handleAddToCart}
                        className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
