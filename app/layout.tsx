import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { CartSidebar } from "@/components/shop/CartSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mozart Fitness",
  description: "Equipamentos de saúde e fitness premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.variable, "antialiased")}>
        <Providers>
          <CartSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
