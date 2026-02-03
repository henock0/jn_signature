// app/commande/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ordersAPI } from '@/lib/api';
import Link from 'next/link';

export default function Commande() {
  const { state, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer_name: `${formData.prenom} ${formData.nom}`,
        customer_email: formData.email,
        customer_phone: formData.telephone,
        customer_address: {
          adresse: formData.adresse,
          ville: formData.ville,
          codePostal: formData.codePostal
        },
        notes: formData.notes,
        items: state.items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
          selected_size: item.selectedSize,
          selected_color: item.selectedColor
        }))
      };

      const { data: order, error } = await ordersAPI.createOrder(orderData);
      
      if (error) {
        throw error;
      }

      // Vider le panier et rediriger vers la confirmation
      clearCart();
      router.push(`/confirmation?order=${order.order_number}`);
      
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-responsive text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
          Finaliser votre commande
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations client */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="input-mobile"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="input-mobile"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-mobile"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="input-mobile"
                  placeholder="Votre numéro"
                />
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Adresse de livraison
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  className="input-mobile"
                  placeholder="Votre adresse complète"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    required
                    className="input-mobile"
                    placeholder="Votre ville"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code Postal *
                  </label>
                  <input
                    type="text"
                    name="codePostal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    required
                    className="input-mobile"
                    placeholder="Code postal"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="input-mobile"
                  placeholder="Instructions spéciales pour la livraison..."
                />
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Votre commande
              </h3>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {item.product.price} €
                      </p>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="text-xs text-gray-400">
                          {item.selectedSize && `Taille: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' • '}
                          {item.selectedColor && `Couleur: ${item.selectedColor}`}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold">
                      {item.product.price * item.quantity} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getTotalPrice()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-gold-primary">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>{getTotalPrice()} €</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-primary text-black py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Vous serez contacté pour finaliser la livraison
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}