import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import {
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Laptop,
  Shirt,
  Home as HomeIcon,
  BookOpen,
  Heart,
  TrendingUp,
  Loader2,
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Electronics',
    icon: Laptop,
    description: 'Headphones, watches, gadgets',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Fashion',
    icon: Shirt,
    description: 'Shirts, ethnic wear, accessories',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-rose-50 text-rose-600',
  },
  {
    name: 'Home & Kitchen',
    icon: HomeIcon,
    description: 'Cookware, chairs, essentials',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 text-amber-600',
  },
  {
    name: 'Books',
    icon: BookOpen,
    description: 'Bestsellers, fiction & business',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'Beauty & Care',
    icon: Heart,
    description: 'Skincare, wellness & organics',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50 text-purple-600',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchFeatured = async () => {
      setLoading(true);
      const res = await productService.getProducts();
      if (mounted && res.success) {
        // Pick first 4 to 8 products as featured
        setFeaturedProducts(res.products.slice(0, 8));
      }
      if (mounted) setLoading(false);
    };

    fetchFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-2xl shadow-indigo-950/30 mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>India's Preferred COD Shopping Store</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
              Discover Quality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-indigo-200 to-indigo-100">
                Delivered Right
              </span>{' '}
              to Your Door.
            </h1>

            <p className="text-base sm:text-lg text-indigo-100/80 max-w-xl font-normal leading-relaxed">
              Shop authentic electronics, fashion, home essentials, and bestsellers with hassle-free
              <strong className="text-white font-semibold"> Cash on Delivery</strong> across 25,000+ Indian pincodes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-900 hover:bg-slate-100 font-bold rounded-xl shadow-lg shadow-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products?category=Electronics"
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold rounded-xl border border-indigo-500/40 backdrop-blur-sm transition-all text-center"
              >
                Explore Electronics
              </Link>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl hidden lg:block text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Special Offer
              </span>
              <span className="text-xs bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Zero Prepayment Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Cash on Delivery Guaranteed
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No online card or UPI needed before dispatch. Inspect your package and pay cash or UPI directly to the courier executive upon arrival.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-200">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-300" /> Free Shipping &gt; ₹499
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-300" /> 7-Day Returns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">100% Genuine</p>
              <p className="text-xs text-slate-500">Directly sourced</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">COD Available</p>
              <p className="text-xs text-slate-500">Pay on delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">7-Day Return</p>
              <p className="text-xs text-slate-500">Hassle-free refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Fast Support</p>
              <p className="text-xs text-slate-500">Expert customer care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Popular Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse top categories crafted for modern lifestyles
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all text-center flex flex-col items-center justify-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 text-sm sm:text-base transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Featured Products
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Top rated customer favorites available for instant delivery
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>See more products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
            <p className="text-sm text-slate-500">Loading catalog items...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
