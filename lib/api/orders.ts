// lib/api/orders.ts - Version Firebase
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
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order, OrderItem } from '@/lib/firebase';

export const ordersAPI = {
  // Créer une nouvelle commande
  async createOrder(orderData: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: any;
    notes?: string;
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
      selected_size?: string;
      selected_color?: string;
    }>;
  }) {
    try {
      const total_amount = orderData.items.reduce(
        (total, item) => total + (item.unit_price * item.quantity),
        0
      );

      // Créer la commande
      const newOrder = {
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        notes: orderData.notes || null,
        total_amount,
        status: 'pending',
        payment_status: 'pending',
        payment_method: null,
        user_id: null,
        created_at: Timestamp.now().toDate().toISOString(),
        updated_at: Timestamp.now().toDate().toISOString(),
      };

      const orderRef = await addDoc(collection(db, 'orders'), newOrder);

      // Ajouter les éléments de commande
      const batch = writeBatch(db);
      
      orderData.items.forEach(item => {
        const orderItemRef = doc(collection(db, 'order_items'));
        batch.set(orderItemRef, {
          order_id: orderRef.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          selected_size: item.selected_size || null,
          selected_color: item.selected_color || null,
          created_at: Timestamp.now().toDate().toISOString(),
        });
      });

      await batch.commit();

      return { data: { id: orderRef.id, ...newOrder }, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer les commandes d'un utilisateur
  async getUserOrders(userId: string) {
    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      const querySnapshot = await getDocs(ordersQuery);
      const orders = [];

      for (const docSnap of querySnapshot.docs) {
        const orderData: any = { id: docSnap.id, ...docSnap.data() };
        
        // Récupérer les items de la commande
        const itemsQuery = query(
          collection(db, 'order_items'),
          where('order_id', '==', docSnap.id)
        );
        const itemsSnapshot = await getDocs(itemsQuery);
        
        orderData.order_items = [];
        for (const itemDoc of itemsSnapshot.docs) {
          const itemData: any = { id: itemDoc.id, ...itemDoc.data() };
          
          // Récupérer les infos du produit
          if (itemData.product_id) {
            const productDoc = await getDoc(doc(db, 'products', itemData.product_id));
            if (productDoc.exists()) {
              itemData.products = { id: productDoc.id, ...productDoc.data() };
            }
          }
          
          orderData.order_items.push(itemData);
        }
        
        orders.push(orderData);
      }

      return { data: orders, error: null };
    } catch (error: any) {
      console.error('Error fetching user orders:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer toutes les commandes (Admin)
  async getAllOrders(filters?: {
    status?: string;
    limit?: number;
  }) {
    try {
      let ordersQuery = query(
        collection(db, 'orders'),
        orderBy('created_at', 'desc')
      );

      if (filters?.status) {
        ordersQuery = query(
          collection(db, 'orders'),
          where('status', '==', filters.status),
          orderBy('created_at', 'desc')
        );
      }

      const querySnapshot = await getDocs(ordersQuery);
      const orders = [];

      for (const docSnap of querySnapshot.docs) {
        const orderData: any = { id: docSnap.id, ...docSnap.data() };
        
        // Récupérer les items de la commande
        const itemsQuery = query(
          collection(db, 'order_items'),
          where('order_id', '==', docSnap.id)
        );
        const itemsSnapshot = await getDocs(itemsQuery);
        
        orderData.order_items = [];
        for (const itemDoc of itemsSnapshot.docs) {
          const itemData: any = { id: itemDoc.id, ...itemDoc.data() };
          
          // Récupérer les infos du produit
          if (itemData.product_id) {
            const productDoc = await getDoc(doc(db, 'products', itemData.product_id));
            if (productDoc.exists()) {
              itemData.products = { id: productDoc.id, ...productDoc.data() };
            }
          }
          
          orderData.order_items.push(itemData);
        }
        
        orders.push(orderData);
      }

      return { data: orders, error: null };
    } catch (error: any) {
      console.error('Error fetching all orders:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer une commande par ID
  async getOrderById(id: string) {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', id));
      
      if (!orderDoc.exists()) {
        return { data: null, error: 'Commande non trouvée' };
      }

      const orderData: any = { id: orderDoc.id, ...orderDoc.data() };

      // Récupérer les items de la commande
      const itemsQuery = query(
        collection(db, 'order_items'),
        where('order_id', '==', id)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      
      orderData.order_items = [];
      for (const itemDoc of itemsSnapshot.docs) {
        const itemData: any = { id: itemDoc.id, ...itemDoc.data() };
        
        // Récupérer les infos du produit
        if (itemData.product_id) {
          const productDoc = await getDoc(doc(db, 'products', itemData.product_id));
          if (productDoc.exists()) {
            itemData.products = { id: productDoc.id, ...productDoc.data() };
          }
        }
        
        orderData.order_items.push(itemData);
      }

      return { data: orderData, error: null };
    } catch (error: any) {
      console.error('Error fetching order:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Mettre à jour le statut d'une commande (Admin)
  async updateOrderStatus(id: string, status: string) {
    try {
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, {
        status,
        updated_at: Timestamp.now().toDate().toISOString(),
      });

      return { data: { id, status }, error: null };
    } catch (error: any) {
      console.error('Error updating order status:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Supprimer une commande (Admin)
  async deleteOrder(id: string) {
    try {
      // Supprimer les items de la commande d'abord
      const itemsQuery = query(
        collection(db, 'order_items'),
        where('order_id', '==', id)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      
      const batch = writeBatch(db);
      itemsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      // Supprimer la commande
      batch.delete(doc(db, 'orders', id));
      
      await batch.commit();

      return { error: null };
    } catch (error: any) {
      console.error('Error deleting order:', error.message || error);
      return { error: error.message || 'Erreur inconnue' };
    }
  },
};
