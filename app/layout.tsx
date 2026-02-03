// app/layout.tsx - Version finale
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import MobileNavBar from '@/components/ui/MobileNavBar';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'JN SIGNATURE - Votre style, notre signature',
  description: 'Boutique en ligne JN SIGNATURE - Vêtements, chaussures, accessoires et parfums de qualité',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérifier si on est sur une page d'authentification
  const isAuthPage = children?.props?.childProp?.segment === 'auth';

  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-white flex flex-col">
              {/* Ne pas afficher le header et footer sur les pages d'authentification */}
              {!isAuthPage && <Header />}
              <main className={`flex-1 w-full ${isAuthPage ? '' : 'pb-20 lg:pb-0'}`}>
                {children}
              </main>
              {!isAuthPage && <Footer />}
              {/* Navigation mobile - visible seulement sur mobile et pas sur les pages auth */}
              {!isAuthPage && (
                <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
                  <MobileNavBar />
                </div>
              )}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}