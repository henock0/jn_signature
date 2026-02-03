// components/admin/AdminDashboard.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { productsAPI, ordersAPI, notificationsAPI } from '@/lib/api';
import { Product, Order, Notification as AdminNotification } from '@/lib/firebase';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import NotificationsPanel from './NotificationsPanel';

export default function AdminDashboard() {
  const { signOut, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    unreadNotifications: 0,
  });

  const loadStats = async () => {
    try {
      // Charger les statistiques
      const [productsResponse, ordersResponse] = await Promise.all([
        productsAPI.getProducts(),
        ordersAPI.getAllOrders()
      ]);

      setStats({
        totalProducts: productsResponse.data?.length || 0,
        totalOrders: ordersResponse.data?.length || 0,
        pendingOrders: ordersResponse.data?.filter((o: Order) => o.status === 'pending').length || 0,
        unreadNotifications: 0, // À implémenter plus tard
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const tabs = [
    { id: 'dashboard', name: 'Tableau de bord', icon: '📊' },
    { id: 'products', name: 'Produits', icon: '🛍️' },
    { id: 'orders', name: 'Commandes', icon: '📦' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 relative mr-3">
                <img 
                  src="/images/JN-Signature-gold-transparent-small.png" 
                  alt="JN SIGNATURE"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold">Admin JN Signature</h1>
                <p className="text-sm text-gray-500">Bonjour, {profile?.full_name || 'Admin'}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gold-primary hover:text-black transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg shadow p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gold-primary text-black'
                    : 'text-gray-600 hover:text-gold-primary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'dashboard' && <DashboardContent stats={stats} />}
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'notifications' && <NotificationsPanel />}
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ stats }: { stats: any }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif font-bold mb-6">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{stats.totalProducts}</div>
          <div className="text-blue-100">Produits</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{stats.totalOrders}</div>
          <div className="text-green-100">Commandes totales</div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{stats.pendingOrders}</div>
          <div className="text-yellow-100">En attente</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{stats.unreadNotifications}</div>
          <div className="text-red-100">Notifications</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gold-primary transition-colors">
              ➕ Ajouter un nouveau produit
            </button>
            <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gold-primary transition-colors">
              📦 Voir les commandes en attente
            </button>
            <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gold-primary transition-colors">
              🔔 Marquer les notifications comme lues
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Statistiques récentes</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Produits en vedette:</span>
              <span className="font-semibold">{stats.totalProducts}</span>
            </div>
            <div className="flex justify-between">
              <span>Commandes ce mois:</span>
              <span className="font-semibold">{stats.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span>Taux de conversion:</span>
              <span className="font-semibold">--%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}