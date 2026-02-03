// app/produit/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { productsAPI } from '@/lib/api';
import { Product } from '@/lib/firebase';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const productId = params.id as string;

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getProductById(productId);
      if (response.data) {
        setProduct(response.data);
        setSelectedSize(response.data.sizes?.[0] || '');
        setSelectedColor(response.data.colors?.[0] || '');
        loadRelatedProducts(response.data.category_id);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async (categoryId: string | null) => {
    if (!categoryId) return;
    
    const response = await productsAPI.getProducts({
      category: product?.categories?.name,
      limit: 4
    });
    
    if (response.data) {
      setRelatedProducts(response.data.filter(p => p.id !== productId));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      alert('Produit ajouté au panier !');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      router.push('/panier');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-responsive">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 h-96 rounded-xl"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-responsive text-center">
          <div className="text-6xl mb-6">😔</div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600 mb-8">
            Le produit que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link
            href="/boutique"
            className="bg-gold-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gold-primary transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/boutique" className="hover:text-gold-primary transition-colors">Boutique</Link>
          <span>›</span>
          <Link 
            href={`/boutique?categorie=${product.categories?.name}`} 
            className="hover:text-gold-primary transition-colors"
          >
            {product.categories?.name}
          </Link>
          <span>›</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galerie d'images */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Informations produit */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
              <div className="mb-4">
                <span className="inline-block bg-gold-primary text-black text-sm px-3 py-1 rounded-full font-semibold mb-2">
                  {product.categories?.name}
                </span>
                {product.sub_category && (
                  <span className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full font-semibold mb-2 ml-2">
                    {product.sub_category}
                  </span>
                )}
              </div>

              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-gold-primary font-serif">
                  {product.price} €
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {product.original_price} €
                  </span>
                )}
                {product.original_price && (
                  <span className="bg-red-600 text-white text-sm px-2 py-1 rounded ml-3">
                    Économisez {product.original_price - product.price} €
                  </span>
                )}
              </div>

              {/* Sélecteurs */}
              {(product.sizes || product.colors) && (
                <div className="space-y-6 mb-8">
                  {product.sizes && product.sizes.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Taille *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedSize === size
                                ? 'bg-gold-primary text-black border-gold-primary'
                                : 'border-gray-300 text-gray-700 hover:border-gold-primary'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Couleur *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedColor === color
                                ? 'bg-gold-primary text-black border-gold-primary'
                                : 'border-gray-300 text-gray-700 hover:border-gold-primary'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Stock */}
              <div className="mb-6">
                <p className={`text-sm font-medium ${
                  product.stock > 10 ? 'text-green-600' : 
                  product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {product.stock > 10 ? 'En stock' : 
                   product.stock > 0 ? `Plus que ${product.stock} disponible(s)` : 'Rupture de stock'}
                </p>
              </div>

              {/* Quantité et actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantité:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gold-primary hover:text-black transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 bg-gold-primary text-black py-4 rounded-lg font-semibold hover:bg-gold-light transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Acheter maintenant
                  </button>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Livraison gratuite</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Retours sous 14 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}