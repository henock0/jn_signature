// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data/products';

const featuredProducts = products.filter(product => product.featured || product.id <= 8);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0"> {/* Padding pour la nav mobile */}
      {/* Hero Section Responsive */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[600px] bg-gradient-to-r from-gray-900 to-black safe-area-top">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop)',
            backgroundPosition: isMobile ? 'center center' : 'center center'
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

      {/* Valeurs Responsive */}
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

      {/* Produits en Vedette Responsive */}
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

      {/* Catégories Responsive */}
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
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/boutique?categorie=${category.name}`}
                className="group relative overflow-hidden rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-target"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 text-white">
                  <h3 className="text-sm lg:text-lg font-semibold text-center mb-1 leading-tight">{category.name}</h3>
                  <p className="text-gold-light text-xs lg:text-sm text-center">{category.count} produits</p>
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

      {/* Statistiques Responsive */}
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

      {/* Processus d'achat Responsive */}
      <section className="bg-white py-8 lg:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 lg:mb-4">
              Comment <span className="text-gold-primary">Commander</span> ?
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">Un processus simple et sécurisé en 3 étapes</p>
            <div className="w-20 lg:w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 px-4 lg:px-0">
            {[
              {
                step: "01",
                title: "Parcourir & Choisir",
                description: "Explorez nos collections et sélectionnez vos articles préférés",
                icon: "🛍️",
                action: "Voir la boutique"
              },
              {
                step: "02",
                title: "Commander en Ligne",
                description: "Remplissez le formulaire de commande avec vos informations",
                icon: "📱",
                action: "Passer commande"
              },
              {
                step: "03",
                title: "Livraison & Satisfaction",
                description: "Recevez vos articles et profitez de votre nouveau style",
                icon: "🚚",
                action: "Nous contacter"
              }
            ].map((step, index) => (
              <div key={index} className="card-mobile lg:card-desktop text-center">
                <div className="text-4xl lg:text-5xl mb-3 lg:mb-4">{step.icon}</div>
                <div className="text-gold-primary text-xs lg:text-sm font-bold mb-2">ÉTAPE {step.step}</div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">{step.description}</p>
                <Link
                  href={index === 0 ? "/boutique" : index === 1 ? "/boutique" : "/contact"}
                  className="inline-block bg-gray-900 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg font-semibold hover:bg-gold-primary hover:text-black transition-colors text-xs lg:text-sm"
                >
                  {step.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Responsive */}
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