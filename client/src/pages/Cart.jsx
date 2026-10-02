import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const shippingFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;
  const grandTotal = cartTotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our top categories and
          exclusive Cash on Delivery deals!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected items before proceeding to Cash on Delivery checkout.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {cartItems.map((item) => {
              const itemSubtotal = item.price * item.quantity;
              const isAtMaxStock = item.quantity >= item.stock;

              return (
                <div
                  key={item._id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail and Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Link
                      to={`/products/${item._id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/60"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Link
                        to={`/products/${item._id}`}
                        className="block font-semibold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-slate-500">
                        Unit Price: <span className="font-medium text-slate-700">{productService.formatINR(item.price)}</span>
                      </p>
                      {item.stock <= 5 && (
                        <p className="text-[11px] text-amber-600 font-medium">
                          Only {item.stock} left in stock
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls & Line Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded-l-xl transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        disabled={isAtMaxStock}
                        aria-label="Increase quantity"
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded-r-xl transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-slate-900 block">
                        {productService.formatINR(itemSubtotal)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 mt-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center px-2">
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Col: Order Summary & COD Note */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-slate-900">
                  {productService.formatINR(cartTotal)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-semibold text-emerald-600 uppercase text-xs">FREE</span>
                  ) : (
                    <span className="font-semibold text-slate-900">
                      {productService.formatINR(shippingFee)}
                    </span>
                  )}
                </span>
              </div>

              {shippingFee > 0 && (
                <p className="text-[11px] text-indigo-600 bg-indigo-50 p-2 rounded-lg">
                  💡 Add ₹{499 - cartTotal} more for FREE Delivery!
                </p>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Amount</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-slate-900 block">
                    {productService.formatINR(grandTotal)}
                  </span>
                  <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
                </div>
              </div>
            </div>

            {/* COD Note */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Pay safely in cash or scan UPI with the courier executive when your order arrives at
                your doorstep. No advance card payment needed!
              </p>
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Proceed to COD Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Points */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Standard delivery within 2-4 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Easy 7-day door-step return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
