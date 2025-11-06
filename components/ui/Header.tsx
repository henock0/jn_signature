// src/components/ui/Header.tsx - Version finale
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const pathname = usePathname();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Catégories', href: '/categories' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gold-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo JN SIGNATURE */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <img 
                src="/images/logo.png" 
                alt="JN SIGNATURE"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-black leading-tight">
                JN SIGNATURE
              </span>
              <span className="text-xs text-gray-500 font-light">
                Votre style, notre signature
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-300 font-medium ${
                  isActive(item.href)
                    ? 'text-gold-primary border-b-2 border-gold-primary'
                    : 'text-gray-700 hover:text-gold-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/boutique" 
              className="p-2 text-gray-700 hover:text-gold-primary transition-colors"
              title="Rechercher"
            >
              <SearchIcon />
            </Link>
            <Link 
              href="/panier" 
              className="p-2 text-gray-700 hover:text-gold-primary transition-colors relative"
              title="Panier"
            >
              <ShoppingCartIcon />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {/* Menu mobile */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-gold-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gold-light">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-gold-primary text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Icônes SVG
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);