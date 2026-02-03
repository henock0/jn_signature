// lib/api/notifications.ts
import { supabase, AdminNotification } from '@/lib/supabase';

export const notificationsAPI = {
  // Récupérer les notifications non lues
  async getUnreadNotifications() {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .select('*')
        .eq('read', false)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Erreur lors de la récupération des notifications: ${error.message}`);
      }

      return { data: data || [], error: null };
    } catch (error: any) {
      console.error('Error fetching notifications:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Marquer une notification comme lue
  async markAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) {
        throw new Error(`Erreur lors du marquage de la notification: ${error.message}`);
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead() {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) {
        throw new Error(`Erreur lors du marquage des notifications: ${error.message}`);
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer le nombre de notifications non lues
  async getUnreadCount() {
    try {
      const { count, error } = await supabase
        .from('admin_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);

      if (error) {
        throw new Error(`Erreur lors du comptage des notifications: ${error.message}`);
      }

      return { count: count || 0, error: null };
    } catch (error: any) {
      console.error('Error fetching unread count:', error.message || error);
      return { count: 0, error: error.message || 'Erreur inconnue' };
    }
  },
};