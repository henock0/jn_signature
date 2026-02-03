// components/admin/NotificationsPanel.tsx
'use client';
import { useState, useEffect } from 'react';
import { notificationsAPI } from '@/lib/api';
import { Notification as AdminNotification } from '@/lib/firebase';

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      // Charger toutes les notifications (on passera l'userId plus tard)
      const response = await notificationsAPI.getUserNotifications('admin-default-id', true);
      if (response.data) {
        setNotifications(response.data as AdminNotification[]);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      loadNotifications(); // Recharger les notifications
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead('admin-default-id');
      loadNotifications(); // Recharger les notifications
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'order':
        return '🛍️';
      case 'product':
        return '📦';
      case 'promotion':
        return '🎁';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: AdminNotification['type']) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 border-blue-200';
      case 'product':
        return 'bg-yellow-50 border-yellow-200';
      case 'promotion':
        return 'bg-green-50 border-green-200';
      case 'system':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Notifications</h2>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-gold-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 ${getNotificationColor(notification.type)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-2xl mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
                title="Marquer comme lu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune notification
            </h3>
            <p className="text-gray-500">
              Vous êtes à jour ! Aucune notification non lue.
            </p>
          </div>
        )}
      </div>

      {/* Statistiques des notifications */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl text-blue-600 mb-2">🛒</div>
          <div className="text-lg font-semibold text-blue-900">
            {notifications.filter(n => n.type === 'order').length}
          </div>
          <div className="text-sm text-blue-700">Commandes</div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl text-yellow-600 mb-2">📦</div>
          <div className="text-lg font-semibold text-yellow-900">
            {notifications.filter(n => n.type === 'product').length}
          </div>
          <div className="text-sm text-yellow-700">Produits</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl text-gray-600 mb-2">⚙️</div>
          <div className="text-lg font-semibold text-gray-900">
            {notifications.filter(n => n.type === 'system').length}
          </div>
          <div className="text-sm text-gray-700">Système</div>
        </div>
      </div>
    </div>
  );
}