// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Page non trouvée
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-gold-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/boutique"
            className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            Explorer la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}