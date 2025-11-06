// src/app/produit/[id]/page.tsx
'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">😔</div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600 mb-8">
            Le produit que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link
            href="/boutique"
            className="bg-gold-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    alert('Produit ajouté au panier !');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    router.push('/panier');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gold-primary transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/boutique" className="hover:text-gold-primary transition-colors">Boutique</Link>
          <span>›</span>
          <Link href={`/boutique?categorie=${product.category}`} className="hover:text-gold-primary transition-colors">
            {product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galerie d'images */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Informations produit */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="mb-4">
                <span className="inline-block bg-gold-primary text-black text-sm px-3 py-1 rounded-full font-semibold mb-2">
                  {product.category}
                </span>
                {product.subCategory && (
                  <span className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full font-semibold mb-2 ml-2">
                    {product.subCategory}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-gray-600 mb-6 text-lg">
                {product.description}
              </p>

              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold text-gold-primary font-serif">
                  {product.price} $
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {product.originalPrice} $
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-600 text-white text-sm px-2 py-1 rounded ml-3">
                    Économisez {product.originalPrice - product.price} $
                  </span>
                )}
              </div>

              {/* Sélecteurs */}
              {(product.sizes || product.colors) && (
                <div className="space-y-6 mb-8">
                  {product.sizes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Taille *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedSize === size
                                ? 'bg-gold-primary text-black border-gold-primary'
                                : 'border-gray-300 text-gray-700 hover:border-gold-primary'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.colors && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Couleur *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedColor === color
                                ? 'bg-gold-primary text-black border-gold-primary'
                                : 'border-gray-300 text-gray-700 hover:border-gold-primary'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantité et actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantité:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gold-primary hover:text-black transition-all duration-300 text-lg"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gold-primary text-black py-4 rounded-lg font-semibold hover:bg-gold-light transition-all duration-300 text-lg"
                  >
                    Acheter maintenant
                  </button>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Livraison gratuite</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Retours sous 14 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                  <Link href={`/produit/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gold-primary">
                          {product.price} $
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}