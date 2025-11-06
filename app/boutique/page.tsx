// src/app/boutique/page.tsx
'use client';
import { useState, useMemo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data/products';

export default function Boutique() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory || 
        product.subCategory === selectedCategory
      );
    }

    // Filtre par prix
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Notre <span className="text-gold-primary">Boutique</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection complète de vêtements, chaussures et accessoires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtres */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
              
              {/* Catégories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Catégories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-gold-primary text-black' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Tous les produits
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.name 
                          ? 'bg-gold-primary text-black' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Prix</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 $</span>
                    <span>Jusqu'à {priceRange[1]} $</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produits */}
          <div className="lg:col-span-3">
            {/* Barre de tri */}
            <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-primary"
              >
                <option value="name">Trier par nom</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            {/* Grille des produits */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos filtres pour voir plus de produits
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 100]);
                  }}
                  className="bg-gold-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-gold-light transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}