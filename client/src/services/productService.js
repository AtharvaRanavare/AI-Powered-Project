import api from './api.js';

// Curated default catalog of products with realistic INR pricing and stock levels
const DEFAULT_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling wireless headphones with Auto NC Optimizer, 30-hour battery life, and crystal-clear hands-free calling.',
    price: 29990,
    category: 'Electronics',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    numReviews: 124,
    brand: 'Sony',
  },
  {
    _id: 'prod-2',
    name: 'Apple Watch Series 9 GPS 45mm',
    description: 'Powerful health sensors, advanced safety features, bright Always-On Retina display, and carbon-neutral combinations available.',
    price: 41900,
    category: 'Electronics',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    numReviews: 89,
    brand: 'Apple',
  },
  {
    _id: 'prod-3',
    name: 'Men Premium Slim Fit Casual Cotton Shirt',
    description: 'Crafted with 100% breathable organic combed cotton. Perfect for both office casuals and evening outings.',
    price: 1499,
    category: 'Fashion',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    rating: 4.3,
    numReviews: 45,
    brand: 'UrbanCraft',
  },
  {
    _id: 'prod-4',
    name: 'Women Pure Silk Banarasi Saree with Blouse',
    description: 'Traditional jacquard woven zari work design, soft finish silk fabric ideal for wedding and festive occasions.',
    price: 3899,
    category: 'Fashion',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    numReviews: 62,
    brand: 'Varanasi Weaves',
  },
  {
    _id: 'prod-5',
    name: 'Stainless Steel Espresso Coffee Maker & Frother',
    description: '15-bar pressure pump for rich and authentic crema. Includes high-pressure steam wand for cappuccino and latte.',
    price: 8499,
    category: 'Home & Kitchen',
    stock: 6,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    numReviews: 78,
    brand: 'BaristaPro',
  },
  {
    _id: 'prod-6',
    name: 'Cast Iron Pre-Seasoned Dutch Oven (4.5 L)',
    description: 'Heavy-duty enamelled cast iron offering superior heat retention and even cooking for biryanis, roasts, and stews.',
    price: 2999,
    category: 'Home & Kitchen',
    stock: 4,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    numReviews: 34,
    brand: 'IronChef',
  },
  {
    _id: 'prod-7',
    name: 'Atomic Habits by James Clear',
    description: 'An easy & proven way to build good habits & break bad ones. The multi-million copy international bestseller.',
    price: 499,
    category: 'Books',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    numReviews: 412,
    brand: 'Penguin',
  },
  {
    _id: 'prod-8',
    name: 'The Psychology of Money by Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn’t necessarily about what you know. It’s about how you behave.',
    price: 349,
    category: 'Books',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    numReviews: 290,
    brand: 'Harriman House',
  },
  {
    _id: 'prod-9',
    name: 'Organic Vitamin C Face Serum with Hyaluronic Acid',
    description: 'Advanced brightening formula to fight pigmentation, boost collagen production, and restore youthful radiant skin.',
    price: 699,
    category: 'Beauty & Care',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    rating: 4.4,
    numReviews: 87,
    brand: 'DermaGlow',
  },
  {
    _id: 'prod-10',
    name: 'Ergonomic Mesh High-Back Office Chair',
    description: 'Adjustable lumbar support, 3D armrests, heavy-duty tilt lock mechanism, and breathable Korean mesh back.',
    price: 11990,
    category: 'Home & Kitchen',
    stock: 2,
    image: 'https://images.unsplash.com/photo-1580481077195-c22ae01a4e10?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    numReviews: 53,
    brand: 'ErgoComfort',
  },
  {
    _id: 'prod-11',
    name: 'Mechanical Gaming Keyboard RGB Backlit',
    description: 'Linear red mechanical switches, per-key RGB backlighting, detachable braided Type-C cable, and aircraft-grade aluminum top plate.',
    price: 4499,
    category: 'Electronics',
    stock: 0, // Testing out of stock
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    numReviews: 110,
    brand: 'KeyChronix',
  },
  {
    _id: 'prod-12',
    name: 'Handcrafted Genuine Leather Bifold Wallet',
    description: 'Full-grain vintage brown leather, RFID blocking technology, 8 card slots, and dual currency pockets.',
    price: 1199,
    category: 'Fashion',
    stock: 9,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    numReviews: 95,
    brand: 'HideCraft',
  }
];

export const productService = {
  // Fetch all products with search, category filter, and sorting
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      const data = response.data;
      const products = Array.isArray(data) ? data : (data.products || DEFAULT_PRODUCTS);
      return { success: true, products };
    } catch {
      // Local filtering fallback when backend is offline
      let list = [...DEFAULT_PRODUCTS];

      if (params.category && params.category !== 'All') {
        list = list.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
      }

      if (params.search && params.search.trim()) {
        const query = params.search.trim().toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      if (params.sort) {
        if (params.sort === 'price-low') {
          list.sort((a, b) => a.price - b.price);
        } else if (params.sort === 'price-high') {
          list.sort((a, b) => b.price - a.price);
        } else if (params.sort === 'rating') {
          list.sort((a, b) => b.rating - a.rating);
        } else if (params.sort === 'in-stock') {
          list.sort((a, b) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0));
        }
      }

      return { success: true, products: list, isDemo: true };
    }
  },

  // Fetch single product details
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data;
      const product = data.product || data;
      return { success: true, product };
    } catch {
      const found = DEFAULT_PRODUCTS.find((p) => p._id === id || String(p._id) === String(id));
      if (found) {
        return { success: true, product: found, isDemo: true };
      }
      return { success: false, error: 'Product not found' };
    }
  },

  // Get distinct categories
  getCategories() {
    const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Beauty & Care'];
    return categories;
  },

  // Helper to format prices into INR
  formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  },
};

export default productService;
