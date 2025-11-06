// src/components/ui/ProductCard.tsx - Version corrigée
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedSize, selectedColor);
  };

  return (
    <Link href={`/produit/${product.id}`}>
      <div 
        className="card-mobile lg:card-desktop group overflow-hidden transition-all duration-300 hover:shadow-lg active-scale lg:active:scale-100 touch-target"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image du produit */}
        <div className="relative overflow-hidden bg-gray-100 rounded-lg lg:rounded-xl mb-3 lg:mb-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Badges */}
          {product.featured && (
            <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
              <span className="bg-gold-primary text-black text-xs px-2 py-1 rounded-full font-semibold">
                Populaire
              </span>
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-2 right-2 lg:top-3 lg:right-3">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Informations du produit */}
        <div className="flex flex-col flex-1">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide truncate">{product.category}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm lg:text-base leading-tight group-hover:text-gold-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Sélecteurs (visible au hover sur desktop) */}
          {(product.sizes || product.colors) && (
            <div className={`mb-3 lg:mb-4 space-y-2 transition-all duration-300 ${
              isHovered ? 'lg:opacity-100 lg:max-h-20' : 'lg:opacity-0 lg:max-h-0 lg:overflow-hidden'
            }`}>
              {product.sizes && (
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Taille</label>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                        className={`text-xs px-2 py-1 rounded border transition-colors ${
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
                  <label className="text-xs text-gray-500 mb-1 block">Couleur</label>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedColor(color);
                        }}
                        className={`text-xs px-2 py-1 rounded border transition-colors ${
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

          {/* Prix et bouton d'ajout */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <span className="text-lg lg:text-2xl font-bold text-gold-primary font-serif">
                {product.price} $
              </span>
              {product.originalPrice && (
                <span className="text-sm lg:text-base text-gray-500 line-through hidden sm:block">
                  {product.originalPrice} $
                </span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-gray-900 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-semibold hover:bg-gold-primary hover:text-black transition-all duration-300 text-xs lg:text-sm active-scale touch-target"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}