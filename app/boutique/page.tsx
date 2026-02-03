// app/boutique/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import { productsAPI } from '@/lib/api';
import { Product, Category } from '@/lib/firebase';

export default function Boutique() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('categorie') || 'all',
    priceRange: [0, 1000],
    sortBy: 'created_at'
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getProducts({
        category: filters.category !== 'all' ? filters.category : undefined
      });
      if (response.data) {
        // Appliquer les filtres supplémentaires
        let filteredProducts = response.data;
        
        // Filtrer par prix
        filteredProducts = filteredProducts.filter(
          product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        // Trier
        filteredProducts.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'name':
              return a.name.localeCompare(b.name);
            default:
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
        });

        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const response = await productsAPI.getCategories();
    if (response.data) setCategories(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            Notre <span className="text-gold-primary">Boutique</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Découvrez notre collection complète de vêtements, chaussures et accessoires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtres */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
              
              {/* Catégories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Catégories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.category === 'all' 
                        ? 'bg-gold-primary text-black' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Tous les produits
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters(prev => ({ ...prev, category: cat.name }))}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.category === cat.name 
                          ? 'bg-gold-primary text-black' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Prix (€)</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 €</span>
                    <span>Jusqu'à {filters.priceRange[1]} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produits */}
          <div className="lg:col-span-3">
            {/* Barre de tri */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white rounded-xl shadow-md p-4">
              <p className="text-gray-600">
                {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-primary min-w-[200px]"
              >
                <option value="created_at">Nouveautés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Ordre alphabétique</option>
              </select>
            </div>

            {/* Grille des produits */}
            {loading ? (
              <div className="grid-responsive">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid-responsive">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos filtres pour voir plus de produits
                </p>
                <button
                  onClick={() => setFilters({
                    category: 'all',
                    priceRange: [0, 1000],
                    sortBy: 'created_at'
                  })}
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