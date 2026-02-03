// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Vérifier si les variables d'environnement sont configurées
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Créer le client Supabase seulement si les variables sont configurées
export const supabase = supabaseUrl && supabaseAnonKey && 
                       supabaseUrl !== 'votre_url_supabase_ici' && 
                       supabaseAnonKey !== 'votre_anon_key_supabase_ici'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types pour TypeScript (inchangés)
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'client' | 'admin';
  phone: string | null;
  address: any | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category_id: string | null;
  sub_category: string | null;
  image_url: string;
  stock: number;
  sizes: string[] | null;
  colors: string[] | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
};

export type Order = {
  id: string;
  user_id: string | null;
  order_number: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  selected_size: string | null;
  selected_color: string | null;
  created_at: string;
  products?: Product;
};

export type AdminNotification = {
  id: string;
  type: 'new_order' | 'low_stock' | 'system';
  title: string;
  message: string;
  read: boolean;
  metadata: any | null;
  created_at: string;
};