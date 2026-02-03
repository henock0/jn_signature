// app/auth/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@jnsignature.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 relative">
            <img 
              src="/images/JN-Signature-gold-transparent-small.png" 
              alt="JN SIGNATURE"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-white">
          Connexion Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Accès réservé aux administrateurs JN Signature
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          {/* Informations de connexion par défaut */}
          <div className="mb-6 p-4 bg-gold-primary/20 border border-gold-primary/30 rounded-lg">
            <h3 className="text-sm font-semibold text-gold-primary mb-2">Compte de test :</h3>
            <p className="text-xs text-white">
              <strong>Email:</strong> admin@jnsignature.com<br />
              <strong>Mot de passe:</strong> admin123
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-600 bg-white/5 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent text-white"
                  placeholder="admin@jnsignature.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-600 bg-white/5 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent text-white"
                  placeholder="Votre mot de passe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-gold-primary hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-primary disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-300">Retour au site</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-primary transition-colors duration-200"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>

        {/* Note de développement */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            💡 Pour un environnement de production, configurez l'authentification Supabase
          </p>
        </div>
      </div>
    </div>
  );
}