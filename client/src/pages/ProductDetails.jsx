import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      setErrorMsg('');
      const res = await productService.getProductById(id);
      if (mounted) {
        if (res.success && res.product) {
          setProduct(res.product);
          setQuantity(res.product.stock > 0 ? 1 : 0);
        } else {
          setErrorMsg(res.error || 'Failed to load product details');
        }
        setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  const maxStock = product?.stock || 0;
  const isOutOfStock = maxStock === 0;

  // Strict quantity handlers limited to available stock
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => {
      if (prev < maxStock) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (isOutOfStock || quantity < 1) return;
    const result = addToCart(product, quantity);
    setAddedMessage(result.message || 'Added to cart successfully!');
    setTimeout(() => {
      setAddedMessage('');
    }, 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || quantity < 1) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80';

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
        <p className="text-slate-600 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (errorMsg || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">{errorMsg || 'The requested product could not be located.'}</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <Link to="/products" className="hover:text-indigo-600 transition">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-indigo-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span className="text-slate-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
            <img
              src={imgError ? fallbackImage : (product.image || fallbackImage)}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-lg shadow-xl uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs font-medium text-slate-500">
                  Brand: <strong className="text-slate-700">{product.brand}</strong>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-bold text-slate-800">
                  {product.rating || 4.5}
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {product.numReviews || 32} Customer Reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Purchase
              </span>
            </div>

            {/* Price section */}
            <div className="pt-2 pb-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {productService.formatINR(product.price)}
                </span>
                <span className="text-xs text-slate-400">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Stock Status Badge */}
            <div>
              {isOutOfStock ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  <AlertCircle className="w-4 h-4" />
                  Currently Out of Stock
                </div>
              ) : maxStock <= 4 ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                  <span>⚡ Only {maxStock} left in stock — order soon!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <Check className="w-4 h-4" /> In Stock ({maxStock} units available)
                </div>
              )}
            </div>

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          {/* Quantity Selector and Purchase Controls */}
          <div className="pt-6 border-t border-slate-100 space-y-5">
            {/* Quantity Selector Limited to Available Stock */}
            {!isOutOfStock && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={quantity >= maxStock}
                      aria-label="Increase quantity"
                      className="p-2.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-500">
                    Max allowed: <strong className="text-slate-800">{maxStock}</strong>
                  </span>
                </div>
                {quantity >= maxStock && (
                  <p className="text-xs text-amber-600 mt-1.5">
                    Reached maximum available stock ({maxStock} units).
                  </p>
                )}
              </div>
            )}

            {/* Added to cart notification */}
            {addedMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in duration-150">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{addedMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now with COD</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <Truck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-slate-700 block">Fast Dispatch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-slate-700 block">Pay on Delivery</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <RotateCcw className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-slate-700 block">7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
