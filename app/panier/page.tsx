// src/app/panier/page.tsx
'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Panier() {
  const { state, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-600 mb-8">
            Découvrez nos collections et trouvez des pièces qui vous correspondent
          </p>
          <Link
            href="/boutique"
            className="bg-gold-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Découvrir la Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Mon Panier
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {state.items.map((item) => (
                <div key={item.product.id} className="border-b border-gray-200 last:border-b-0">
                  <div className="p-6 flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex space-x-4 mt-1">
                          {item.selectedSize && (
                            <span className="text-xs text-gray-500">Taille: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span className="text-xs text-gray-500">Couleur: {item.selectedColor}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gold-primary">
                        {item.product.price} $
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-2"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getTotalPrice()} $</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-gold-primary">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{getTotalPrice()} $</span>
                  </div>
                </div>
              </div>

              <Link
                href="/commande"
                className="w-full bg-gold-primary text-black py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors text-center block"
              >
                Passer la commande
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Livraison gratuite pour toutes les commandes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}