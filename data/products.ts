// src/data/products.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  image: string;
  stock: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
}

export const products: Product[] = [
  // VÊTEMENTS HOMME
  {
    id: 1,
    name: "Chemise Moderne Homme",
    description: "Chemise élégante pour homme, tissu premium",
    price: 20,
    category: "Vêtements",
    subCategory: "Homme",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Bleu", "Noir"]
  },
  {
    id: 2,
    name: "Pantalon Élégant Homme",
    description: "Pantalon classique, coupe moderne",
    price: 20,
    category: "Vêtements",
    subCategory: "Homme",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    stock: 35,
    sizes: ["38", "40", "42", "44"],
    colors: ["Noir", "Marron", "Beige"]
  },
  {
    id: 3,
    name: "Pantalon Jeans Homme",
    description: "Jeans décontracté, confortable et stylé",
    price: 13,
    category: "Vêtements",
    subCategory: "Homme",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop",
    stock: 40,
    sizes: ["38", "40", "42", "44"],
    colors: ["Bleu", "Noir"]
  },
  {
    id: 4,
    name: "T-Shirt Homme",
    description: "T-shirt basique de qualité premium",
    price: 15,
    category: "Vêtements",
    subCategory: "Homme",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    stock: 60,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Noir", "Gris", "Bleu"]
  },
  {
    id: 5,
    name: "Ensemble Homme",
    description: "Ensemble complet style Zara",
    price: 40,
    category: "Vêtements",
    subCategory: "Homme",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Bleu marine", "Gris"]
  },

  // VÊTEMENTS FEMME
  {
    id: 6,
    name: "Ensemble Femme",
    description: "Ensemble élégant pour femme",
    price: 35,
    category: "Vêtements",
    subCategory: "Femme",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop",
    stock: 30,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Rouge", "Blanc", "Rose"]
  },
  {
    id: 7,
    name: "Culotte Femme",
    description: "Culotte confortable et stylée",
    price: 10,
    category: "Vêtements",
    subCategory: "Femme",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=500&h=500&fit=crop",
    stock: 100,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Blanc", "Rouge", "Rose"]
  },

  // CHAUSSURES
  {
    id: 8,
    name: "Babouche Traditionnelle",
    description: "Confort et style traditionnel",
    price: 15,
    originalPrice: 25,
    category: "Chaussures",
    subCategory: "Babouche",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
    stock: 45,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Marron", "Noir", "Beige"]
  },
  {
    id: 9,
    name: "Mocassins Chic Homme",
    description: "Casual chic, élégant et pratique",
    price: 25,
    category: "Chaussures",
    subCategory: "Mocassins",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
    stock: 30,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Marron", "Noir", "Bordeaux"]
  },
  {
    id: 10,
    name: "Baskets Classiques",
    description: "Modèles simples et confortables",
    price: 20,
    category: "Chaussures",
    subCategory: "Baskets",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    stock: 50,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Blanc", "Noir", "Gris"]
  },
  {
    id: 11,
    name: "Baskets Tendance",
    description: "Style urbain et moderne",
    price: 25,
    category: "Chaussures",
    subCategory: "Baskets",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
    stock: 35,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Noir", "Blanc", "Rouge", "Bleu"]
  },
  {
    id: 12,
    name: "Chaussures Habillées",
    description: "Élégantes pour les sorties ou le travail",
    price: 25,
    category: "Chaussures",
    subCategory: "Habillées",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
    stock: 25,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Noir", "Marron", "Bordeaux"]
  },

  // ACCESSOIRES
  {
    id: 13,
    name: "Cravate Élégante",
    description: "Cravate en soie de haute qualité",
    price: 10,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1594637378028-0d3c0ec0ab56?w=500&h=500&fit=crop",
    stock: 80,
    colors: ["Rouge", "Bleu", "Noir", "Rayé"]
  },
  {
    id: 14,
    name: "Sac Chrisbella Premium",
    description: "Sac de marque Chrisbella, design exclusif",
    price: 50,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 15,
    colors: ["Noir", "Marron", "Rouge"]
  },
  {
    id: 15,
    name: "Sac Original",
    description: "Sac design unique et moderne",
    price: 45,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 20,
    colors: ["Noir", "Beige", "Bleu"]
  },

  // PARFUMS
  {
    id: 16,
    name: "Parfum Haut de Gamme",
    description: "Fragrance exclusive, longue tenue",
    price: 60,
    category: "Parfums",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    stock: 25,
    featured: true
  },
  {
    id: 17,
    name: "Parfum Élégance",
    description: "Notes florales et boisées",
    price: 35,
    category: "Parfums",
    image: "https://images.unsplash.com/photo-1590736969955-1d0c97adee59?w=500&h=500&fit=crop",
    stock: 40
  },
  {
    id: 18,
    name: "Eau de Toilette",
    description: "Frais et léger, parfait quotidien",
    price: 25,
    category: "Parfums",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop",
    stock: 60
  },
  {
    id: 19,
    name: "Parfum Économique",
    description: "Qualité à prix abordable",
    price: 6,
    category: "Parfums",
    image: "https://images.unsplash.com/photo-1615634260167-046c6c6d14e6?w=500&h=500&fit=crop",
    stock: 100
  }
];

export const categories = [
  {
    name: "Vêtements Homme",
    slug: "vetements-homme",
    image: "https://images.unsplash.com/photo-1441984904996-e0b51ba765e3?w=400&h=300&fit=crop",
    count: products.filter(p => p.subCategory === "Homme").length
  },
  {
    name: "Vêtements Femme",
    slug: "vetements-femme",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
    count: products.filter(p => p.subCategory === "Femme").length
  },
  {
    name: "Chaussures",
    slug: "chaussures",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop",
    count: products.filter(p => p.category === "Chaussures").length
  },
  {
    name: "Accessoires",
    slug: "accessoires",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
    count: products.filter(p => p.category === "Accessoires").length
  },
  {
    name: "Parfums",
    slug: "parfums",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
    count: products.filter(p => p.category === "Parfums").length
  }
];