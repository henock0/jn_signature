// app/page.tsx - Version corrigée avec meilleure gestion d'erreurs
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { productsAPI } from '@/lib/api';
import { Product, Category } from '@/lib/firebase';

// Données temporaires améliorées
const temporaryProducts: Product[] = [
  {
    id: '1',
    name: "Chemise Signature Homme",
    description: "Chemise élégante pour homme, tissu premium, confort exceptionnel",
    price: 20,
    original_price: null,
    category_id: '1',
    sub_category: "Homme",
    image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Bleu", "Noir"],
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '1',
      name: 'Vêtements Homme',
      slug: 'vetements-homme',
      description: 'Collection de vêtements pour homme',
      image_url: 'https://images.unsplash.com/photo-1441984904996-e0b51ba765e3?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '2',
    name: "Ketchs Limited Edition",
    description: "Baskets premium édition limitée, confort exceptionnel, style unique",
    price: 25,
    original_price: 30,
    category_id: '3',
    sub_category: "Ketchs",
    image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    stock: 30,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Noir", "Blanc", "Rouge"],
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '3',
      name: 'Chaussures',
      slug: 'chaussures',
      description: 'Collection de chaussures et baskets',
      image_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '3',
    name: "Parfum JN Élixir",
    description: "Fragrance exclusive aux notes boisées et épicées, tenue longue durée",
    price: 60,
    original_price: null,
    category_id: '5',
    sub_category: null,
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    stock: 25,
    sizes: null,
    colors: null,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '5',
      name: 'Parfums',
      slug: 'parfums',
      description: 'Collection de parfums et fragrances',
      image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '4',
    name: "Sac Chrisbella Premium",
    description: "Sac de marque Chrisbella, design exclusif, cuir véritable",
    price: 50,
    original_price: 60,
    category_id: '4',
    sub_category: null,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 15,
    sizes: null,
    colors: ["Noir", "Marron", "Rouge"],
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '4',
      name: 'Accessoires',
      slug: 'accessoires',
      description: "Collection d'accessoires mode",
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '5',
    name: "Pantalon Élégant Homme",
    description: "Pantalon classique, coupe moderne, tissu stretch",
    price: 20,
    original_price: null,
    category_id: '1',
    sub_category: "Homme",
    image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    stock: 35,
    sizes: ["38", "40", "42", "44"],
    colors: ["Noir", "Marron", "Beige"],
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '1',
      name: 'Vêtements Homme',
      slug: 'vetements-homme',
      description: 'Collection de vêtements pour homme',
      image_url: 'https://images.unsplash.com/photo-1441984904996-e0b51ba765e3?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '6',
    name: "Ensemble Femme Élégant",
    description: "Ensemble complet pour femme, style moderne et raffiné",
    price: 35,
    original_price: 40,
    category_id: '2',
    sub_category: "Femme",
    image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop",
    stock: 25,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Rouge", "Blanc", "Rose"],
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '2',
      name: 'Vêtements Femme',
      slug: 'vetements-femme',
      description: 'Collection de vêtements pour femme',
      image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '7',
    name: "Mocassins Chic Homme",
    description: "Mocassins en cuir, style casual chic, confort optimal",
    price: 25,
    original_price: null,
    category_id: '3',
    sub_category: "Mocassins",
    image_url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
    stock: 20,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Marron", "Noir", "Bordeaux"],
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '3',
      name: 'Chaussures',
      slug: 'chaussures',
      description: 'Collection de chaussures et baskets',
      image_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '8',
    name: "Cravate Élégante",
    description: "Cravate en soie, design classique, qualité premium",
    price: 10,
    original_price: 15,
    category_id: '4',
    sub_category: null,
    image_url: "https://images.unsplash.com/photo-1594637378028-0d3c0ec0ab56?w=500&h=500&fit=crop",
    stock: 50,
    sizes: null,
    colors: ["Rouge", "Bleu", "Noir", "Rayé"],
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      id: '4',
      name: 'Accessoires',
      slug: 'accessoires',
      description: "Collection d'accessoires mode",
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

const temporaryCategories: Category[] = [
  {
    id: '1',
    name: 'Vêtements Homme',
    slug: 'vetements-homme',
    description: 'Collection de vêtements pour homme',
    image_url: 'https://images.unsplash.com/photo-1441984904996-e0b51ba765e3?w=400&h=300&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Vêtements Femme',
    slug: 'vetements-femme',
    description: 'Collection de vêtements pour femme',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Chaussures',
    slug: 'chaussures',
    description: 'Collection de chaussures et baskets',
    image_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Accessoires',
    slug: 'accessoires',
    description: "Collection d'accessoires mode",
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Parfums',
    slug: 'parfums',
    description: 'Collection de parfums et fragrances',
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setError(null);
      
      // Essayer de charger depuis l'API, sinon utiliser les données temporaires
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getProducts({ featured: true, limit: 8 }),
        productsAPI.getCategories()
      ]);

      // Vérifier si on a des erreurs et utiliser les données temporaires si nécessaire
      if (productsResponse.error) {
        console.warn('Using temporary products due to error:', productsResponse.error);
        setFeaturedProducts(temporaryProducts.filter(p => p.featured).slice(0, 8));
      } else {
        setFeaturedProducts(productsResponse.data || []);
      }

      if (categoriesResponse.error) {
        console.warn('Using temporary categories due to error:', categoriesResponse.error);
        setCategories(temporaryCategories);
      } else {
        setCategories(categoriesResponse.data || []);
      }

    } catch (error) {
      console.error('Error loading home data:', error);
      setError('Erreur lors du chargement des données');
      // Utiliser les données temporaires en cas d'erreur
      setFeaturedProducts(temporaryProducts.filter(p => p.featured).slice(0, 8));
      setCategories(temporaryCategories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 text-center">
          <p className="text-yellow-800">
            Mode démonstration activé - Données temporaires affichées
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[600px] bg-gradient-to-r from-gray-900 to-black safe-area-top">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center container-responsive">
          <div className="text-white max-w-4xl mx-auto px-2 sm:px-4">
            <div className="flex justify-center mb-4 lg:mb-6">
              <div className="w-16 h-16 lg:w-24 lg:h-24 relative">
                <img 
                  src="/images/logo.png" 
                  alt="JN SIGNATURE"
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold mb-4 lg:mb-6 leading-tight">
              <span className="text-gold-primary">JN</span> SIGNATURE
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-4">Votre style, notre signature</p>
            <p className="text-gold-light mb-6 lg:mb-8 text-base lg:text-xl font-light">Beauté • Confiance • Élégance</p>
            <p className="text-sm sm:text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
              Découvrez notre collection exclusive de vêtements, chaussures et accessoires 
              soigneusement sélectionnés pour vous offrir le meilleur du style.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-stretch sm:items-center">
              <Link
                href="/boutique"
                className="btn-mobile bg-gold-primary text-black hover:bg-gold-light lg:btn-desktop text-center"
              >
                Découvrir la Collection
              </Link>
              <Link
                href="/categories"
                className="btn-mobile border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-black lg:btn-desktop text-center"
              >
                Voir les Catégories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-gray-light py-8 lg:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 lg:mb-4 px-4">
              Pourquoi Choisir <span className="text-gold-primary">JN SIGNATURE</span> ?
            </h2>
            <div className="w-20 lg:w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 px-4 lg:px-0">
            {[
              {
                title: "Qualité Premium",
                description: "Des matériaux soigneusement sélectionnés pour un confort et une durabilité exceptionnels",
                icon: "⭐",
                features: ["Tissus haute qualité", "Finitions impeccables", "Durabilité garantie"]
              },
              {
                title: "Style Unique",
                description: "Des pièces qui reflètent votre personnalité avec élégance et raffinement",
                icon: "👑",
                features: ["Designs exclusifs", "Tendances actuelles", "Pièces intemporelles"]
              },
              {
                title: "Service Exceptionnel",
                description: "Notre équipe dédiée est là pour vous accompagner dans chaque achat",
                icon: "💝",
                features: ["Conseils personnalisés", "Support réactif", "Satisfaction garantie"]
              }
            ].map((value, index) => (
              <div key={index} className="card-mobile lg:card-desktop text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl lg:text-5xl mb-3 lg:mb-4">{value.icon}</div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-3">{value.title}</h3>
                <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">{value.description}</p>
                <ul className="text-xs lg:text-sm text-gray-500 space-y-1">
                  {value.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits en Vedette */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 lg:mb-4">
              Produits <span className="text-gold-primary">Populaires</span>
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base max-w-2xl mx-auto">
              Découvrez nos best-sellers, des pièces appréciées pour leur qualité et leur style intemporel
            </p>
            <div className="w-20 lg:w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid-responsive px-4 lg:px-0">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12 px-4 lg:px-0">
            <Link
              href="/boutique"
              className="btn-mobile bg-gray-900 text-white hover:bg-gold-primary hover:text-black lg:btn-desktop inline-block max-w-xs mx-auto"
            >
              Voir Tous les Produits
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="bg-gray-light py-8 lg:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 lg:mb-4">
              Explorez nos <span className="text-gold-primary">Univers</span>
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">Découvrez nos collections organisées par catégories</p>
            <div className="w-20 lg:w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 px-4 lg:px-0">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/boutique?categorie=${category.name}`}
                className="group relative overflow-hidden rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-target"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image_url || '/images/placeholder-category.jpg'} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 text-white">
                  <h3 className="text-sm lg:text-lg font-semibold text-center mb-1 leading-tight">{category.name}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gold-primary text-black px-3 py-1 lg:px-4 lg:py-2 rounded-lg font-semibold text-xs lg:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Voir
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-gold-primary py-8 lg:py-16">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 text-center px-4 lg:px-0">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "100+", label: "Produits disponibles" },
              { number: "98%", label: "Satisfaction client" },
              { number: "24h", label: "Support réactif" }
            ].map((stat, index) => (
              <div key={index} className="text-black">
                <div className="text-2xl lg:text-4xl font-serif font-bold mb-1 lg:mb-2">{stat.number}</div>
                <div className="text-gray-800 font-medium text-xs lg:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-gold-primary to-gold-light py-8 lg:py-16">
        <div className="container-responsive text-center px-4 lg:px-0">
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-black mb-3 lg:mb-4 leading-tight">
            Prêt à Adopter le Style <span className="text-gray-900">JN SIGNATURE</span> ?
          </h2>
          <p className="text-gray-800 text-sm lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez nos clients satisfaits et découvrez la différence JN SIGNATURE. 
            Qualité, style et service exceptionnel vous attendent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto">
            <Link
              href="/boutique"
              className="btn-mobile bg-black text-white hover:bg-gray-800 lg:btn-desktop text-center flex-1"
            >
              Commencer mes Achats
            </Link>
            <Link
              href="/contact"
              className="btn-mobile bg-white text-black hover:bg-gray-100 lg:btn-desktop text-center flex-1"
            >
              Nous Contacter
            </Link>
          </div>
          <p className="text-gray-700 text-xs lg:text-sm mt-4 lg:mt-6">
            🚚 Livraison rapide • 🔄 Retours faciles • 💬 Support 7j/7
          </p>
        </div>
      </section>
    </div>
  );
}