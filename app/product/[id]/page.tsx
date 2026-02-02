import { products } from '@/data/products';
import { ProductDetails } from '@/components/shop/ProductDetails';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { CartSidebar } from '@/components/shop/CartSidebar';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <CartSidebar />

            <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 animate-in fade-in duration-500">
                <ProductDetails product={product} />
            </main>
        </div>
    );
}
