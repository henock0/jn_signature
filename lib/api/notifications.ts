// lib/api/notifications.ts - Version Firebase
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Notification } from '@/lib/firebase';

export const notificationsAPI = {
  // Récupérer les notifications d'un utilisateur
  async getUserNotifications(userId: string, unreadOnly = false) {
    try {
      let notificationsQuery = query(
        collection(db, 'notifications'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );

      if (unreadOnly) {
        notificationsQuery = query(
          collection(db, 'notifications'),
          where('user_id', '==', userId),
          where('is_read', '==', false),
          orderBy('created_at', 'desc')
        );
      }

      const querySnapshot = await getDocs(notificationsQuery);
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { data: notifications, error: null };
    } catch (error: any) {
      console.error('Error fetching notifications:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Créer une notification
  async createNotification(notificationData: {
    user_id: string | null;
    type: 'order' | 'product' | 'system' | 'promotion';
    title: string;
    message: string;
    link?: string;
  }) {
    try {
      const newNotification = {
        ...notificationData,
        is_read: false,
        link: notificationData.link || null,
        created_at: Timestamp.now().toDate().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'notifications'), newNotification);
      return { data: { id: docRef.id, ...newNotification }, error: null };
    } catch (error: any) {
      console.error('Error creating notification:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Marquer une notification comme lue
  async markAsRead(id: string) {
    try {
      const notificationRef = doc(db, 'notifications', id);
      await updateDoc(notificationRef, {
        is_read: true,
      });

      return { data: { id, is_read: true }, error: null };
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead(userId: string) {
    try {
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('user_id', '==', userId),
        where('is_read', '==', false)
      );

      const querySnapshot = await getDocs(notificationsQuery);
      
      const updatePromises = querySnapshot.docs.map(docSnap => 
        updateDoc(doc(db, 'notifications', docSnap.id), {
          is_read: true,
        })
      );

      await Promise.all(updatePromises);

      return { error: null };
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error.message || error);
      return { error: error.message || 'Erreur inconnue' };
    }
  },

  // Supprimer une notification
  async deleteNotification(id: string) {
    try {
      await deleteDoc(doc(db, 'notifications', id));
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting notification:', error.message || error);
      return { error: error.message || 'Erreur inconnue' };
    }
  },
};
