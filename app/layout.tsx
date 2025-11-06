// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { CartProvider } from '@/context/CartContext';
import MobileNavBar from '@/components/ui/MobileNavBar';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false 
});

export const metadata = {
  title: 'JN SIGNATURE - Votre style, notre signature',
  description: 'Boutique en ligne JN SIGNATURE - Vêtements, chaussures, accessoires et parfums de qualité',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
            {/* Navigation mobile - visible seulement sur mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
              <MobileNavBar />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}