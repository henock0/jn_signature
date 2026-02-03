// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialiser Firebase (ne l'initialiser qu'une seule fois)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporter les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// Types pour TypeScript
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
  categories?: Category; // Relation optionnelle
};

export type Order = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: any;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[]; // Relation optionnelle
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
  products?: Product; // Relation optionnelle
};

export type Notification = {
  id: string;
  user_id: string | null;
  type: 'order' | 'product' | 'system' | 'promotion';
  title: string;
  message: string;
  is_read: boolean;
  link: string | null;
  created_at: string;
};
