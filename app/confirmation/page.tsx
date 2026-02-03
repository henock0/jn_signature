// app/confirmation/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Confirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement de la commande
    setTimeout(() => {
      setOrder({
        order_number: orderNumber,
        total_amount: 0, // Serait chargé depuis l'API
        customer_name: 'Client',
        created_at: new Date().toISOString()
      });
      setLoading(false);
    }, 1000);
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-responsive text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-responsive">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Commande Confirmée !
          </h1>
          
          <p className="text-gray-600 mb-6 text-lg">
            Merci pour votre commande. Nous vous contacterons bientôt pour finaliser la livraison.
          </p>

          {order && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Détails de la commande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de commande:</span>
                  <span className="font-medium">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{order.total_amount} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="bg-gold-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Continuer mes achats
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Un email de confirmation vous sera envoyé sous peu.
          </p>
        </div>
      </div>
    </div>
  );
}