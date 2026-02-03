// lib/api/orders.ts - Version corrigée
import { supabase, Order, OrderItem } from '@/lib/supabase';

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
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: orderData.customer_name,
            customer_email: orderData.customer_email,
            customer_phone: orderData.customer_phone,
            customer_address: orderData.customer_address,
            notes: orderData.notes,
            total_amount,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error('Supabase error creating order:', orderError);
        return { data: null, error: orderError.message };
      }

      // Ajouter les éléments de commande
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        selected_size: item.selected_size,
        selected_color: item.selected_color,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Supabase error creating order items:', itemsError);
        // Rollback de la commande en cas d'erreur
        await supabase.from('orders').delete().eq('id', order.id);
        return { data: null, error: itemsError.message };
      }

      return { data: order, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer les commandes d'un utilisateur
  async getUserOrders(userId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching user orders:', error);
        return { data: [], error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error: any) {
      console.error('Error fetching user orders:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Admin: Récupérer toutes les commandes
  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching all orders:', error);
        return { data: [], error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error: any) {
      console.error('Error fetching all orders:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Admin: Mettre à jour le statut d'une commande
  async updateOrderStatus(orderId: string, status: Order['status']) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating order status:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating order status:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },
};