// lib/api/products.ts - Version corrigée
import { supabase, Product, Category } from '@/lib/supabase';

export const productsAPI = {
  // Récupérer tous les produits actifs
  async getProducts(filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }) {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            image_url
          )
        `)
        .eq('active', true);

      if (filters?.category) {
        query = query.eq('categories.name', filters.category);
      }

      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching products:', error);
        // Retourner des données vides plutôt que de throw
        return { data: [], error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error: any) {
      console.error('Error fetching products:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer un produit par ID
  async getProductById(id: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            image_url
          )
        `)
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error) {
        console.error('Supabase error fetching product:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer les catégories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Supabase error fetching categories:', error);
        return { data: [], error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error: any) {
      console.error('Error fetching categories:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Admin: Créer un produit
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating product:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Admin: Mettre à jour un produit
  async updateProduct(id: string, updates: Partial<Product>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating product:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Admin: Supprimer un produit (désactiver)
  async deleteProduct(id: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ active: false })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error deleting product:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error deleting product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },
};