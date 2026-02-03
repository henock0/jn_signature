// lib/api/products.ts - Version Firebase
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, Category } from '@/lib/firebase';

export const productsAPI = {
  // Récupérer tous les produits actifs
  async getProducts(filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }) {
    try {
      let productsQuery = query(
        collection(db, 'products'),
        where('active', '==', true),
        orderBy('created_at', 'desc')
      );

      if (filters?.featured) {
        productsQuery = query(
          collection(db, 'products'),
          where('active', '==', true),
          where('featured', '==', true),
          orderBy('created_at', 'desc')
        );
      }

      if (filters?.limit) {
        productsQuery = query(productsQuery, firestoreLimit(filters.limit));
      }

      const querySnapshot = await getDocs(productsQuery);
      let products: any[] = [];

      for (const docSnap of querySnapshot.docs) {
        const productData = { id: docSnap.id, ...docSnap.data() };
        
        // Récupérer la catégorie si category_id existe
        if (productData.category_id) {
          const categoryDoc = await getDoc(doc(db, 'categories', productData.category_id));
          if (categoryDoc.exists()) {
            productData.categories = { id: categoryDoc.id, ...categoryDoc.data() };
          }
        }

        products.push(productData);
      }

      // Filtrer par catégorie si nécessaire
      if (filters?.category) {
        products = products.filter(p => 
          p.categories?.name === filters.category
        );
      }

      return { data: products, error: null };
    } catch (error: any) {
      console.error('Error fetching products:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer un produit par ID
  async getProductById(id: string) {
    try {
      const productDoc = await getDoc(doc(db, 'products', id));
      
      if (!productDoc.exists()) {
        return { data: null, error: 'Produit non trouvé' };
      }

      const productData: any = { id: productDoc.id, ...productDoc.data() };

      // Récupérer la catégorie si category_id existe
      if (productData.category_id) {
        const categoryDoc = await getDoc(doc(db, 'categories', productData.category_id));
        if (categoryDoc.exists()) {
          productData.categories = { id: categoryDoc.id, ...categoryDoc.data() };
        }
      }

      return { data: productData, error: null };
    } catch (error: any) {
      console.error('Error fetching product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer les catégories
  async getCategories() {
    try {
      const categoriesQuery = query(
        collection(db, 'categories'),
        orderBy('name')
      );
      
      const querySnapshot = await getDocs(categoriesQuery);
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { data: categories, error: null };
    } catch (error: any) {
      console.error('Error fetching categories:', error.message || error);
      return { data: [], error: error.message || 'Erreur inconnue' };
    }
  },

  // Récupérer une catégorie par slug
  async getCategoryBySlug(slug: string) {
    try {
      const categoryQuery = query(
        collection(db, 'categories'),
        where('slug', '==', slug)
      );
      
      const querySnapshot = await getDocs(categoryQuery);
      
      if (querySnapshot.empty) {
        return { data: null, error: 'Catégorie non trouvée' };
      }

      const categoryDoc = querySnapshot.docs[0];
      const data = { id: categoryDoc.id, ...categoryDoc.data() };

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching category:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Créer un produit (Admin)
  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const newProduct = {
        ...productData,
        created_at: Timestamp.now().toDate().toISOString(),
        updated_at: Timestamp.now().toDate().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      return { data: { id: docRef.id, ...newProduct }, error: null };
    } catch (error: any) {
      console.error('Error creating product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Mettre à jour un produit (Admin)
  async updateProduct(id: string, productData: Partial<Product>) {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...productData,
        updated_at: Timestamp.now().toDate().toISOString(),
      });

      return { data: { id, ...productData }, error: null };
    } catch (error: any) {
      console.error('Error updating product:', error.message || error);
      return { data: null, error: error.message || 'Erreur inconnue' };
    }
  },

  // Supprimer un produit (Admin)
  async deleteProduct(id: string) {
    try {
      await deleteDoc(doc(db, 'products', id));
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting product:', error.message || error);
      return { error: error.message || 'Erreur inconnue' };
    }
  },
};
