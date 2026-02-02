'use client';

import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/shop/ProductCard';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const categories = ['Todos', 'Musculação', 'Yoga', 'Acessórios', 'Bem-estar'];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-text-main md:text-6xl">
              Elevando seu <span className="text-primary">desempenho</span> ao nível da arte.
            </h1>
            <p className="mb-10 text-lg text-gray-600 md:text-xl">
              Equipamentos de alta performance, design minimalista e qualidade premium para quem busca o extraordinário.
            </p>
          </div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-green-100 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-50 blur-3xl opacity-50" />
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-4 md:justify-center md:px-6 font-medium no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-6 py-2 transition-all",
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>


      {/* Simple Footer */}
      <footer className="mt-32 border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="mb-2 font-bold text-text-main">Mozart Fitness</p>
          <p className="text-sm">© 2026 Mozart Fitness. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
