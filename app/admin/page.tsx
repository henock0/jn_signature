// app/admin/page.tsx - Version avec meilleure gestion d'erreurs
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user || !isAdmin) {
        router.push('/auth/login');
      } else {
        setCheckingAuth(false);
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-gray-600 mb-4">Vous n'avez pas les permissions nécessaires.</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-gold-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}