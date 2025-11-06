// src/app/categories/page.tsx
'use client';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Nos <span className="text-gold-primary">Catégories</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez nos différentes collections soigneusement sélectionnées pour vous
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/boutique?categorie=${category.name}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                <p className="text-gold-light mb-3">{category.count} produits</p>
                <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explorer la collection</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section informations */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous aider à trouver les pièces parfaites 
            qui correspondent à votre style et à vos besoins.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gold-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Nous Contacter
            </Link>
            <Link
              href="/boutique"
              className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Voir Tous les Produits
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}