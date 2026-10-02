import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import { ShoppingCart, Star, Check, AlertCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isOutOfStock = !product.stock || product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Category & Stock Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm border border-slate-100">
          {product.category}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10">
        {isOutOfStock ? (
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
            Only {product.stock} left
          </span>
        ) : (
          <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            In Stock
          </span>
        )}
      </div>

      {/* Product Image Link */}
      <Link
        to={`/products/${product._id}`}
        className="block relative aspect-square overflow-hidden bg-slate-100"
      >
        <img
          src={imgError ? fallbackImage : (product.image || fallbackImage)}
          alt={product.name}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            isOutOfStock ? 'opacity-60 grayscale-[30%]' : ''
          }`}
          loading="lazy"
        />
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {product.rating || '4.5'}
            </span>
            <span className="text-xs text-slate-400">
              ({product.numReviews || 24})
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/products/${product._id}`}
            className="block text-slate-900 font-semibold text-sm sm:text-base leading-snug hover:text-indigo-600 transition line-clamp-2 mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400 block leading-none mb-0.5">Price</span>
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {productService.formatINR(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? 'Out of stock' : `Add ${product.name} to cart`}
            className={`py-2 px-3 sm:px-3.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : justAdded
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95'
            }`}
          >
            {isOutOfStock ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Sold Out</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
