import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import {
  MapPin,
  Phone,
  User,
  Building,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;
  const grandTotal = cartTotal + shippingFee;

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const INDIAN_STATES = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi NCR', 'Gujarat',
    'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const validate = () => {
    const errs = {};
    if (!shippingData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    if (!shippingData.phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(shippingData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!shippingData.address.trim()) {
      errs.address = 'Street address / House number is required';
    }

    if (!shippingData.city.trim()) {
      errs.city = 'City / Town is required';
    }

    if (!shippingData.postalCode.trim()) {
      errs.postalCode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(shippingData.postalCode.trim())) {
      errs.postalCode = 'Enter a valid 6-digit Pincode';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) {
      setServerError('Your cart is empty. Please add items before checking out.');
      return;
    }

    setSubmitting(true);
    setServerError('');

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: shippingData.fullName.trim(),
        phone: shippingData.phone.trim(),
        address: shippingData.address.trim(),
        city: shippingData.city.trim(),
        state: shippingData.state,
        postalCode: shippingData.postalCode.trim(),
      },
      paymentMethod: 'Cash on Delivery (COD)',
      itemsPrice: cartTotal,
      shippingPrice: shippingFee,
      totalPrice: grandTotal,
    };

    const result = await orderService.createOrder(orderPayload);
    setSubmitting(false);

    if (result.success) {
      // 1. Successfully clears the cart
      clearCart();
      // 2. Redirects to /my-orders
      navigate('/my-orders', { state: { orderSuccess: true, orderId: result.order?._id } });
    } else {
      setServerError(result.error || 'Failed to place order. Please check your details and try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Items to Checkout</h2>
        <p className="text-slate-500 mb-6">
          Your cart is currently empty. Add items from our catalog to place an order.
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout & Delivery Details
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Provide your delivery address to place your order with guaranteed Cash on Delivery.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Delivery Address Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={shippingData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                        errors.fullName
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">⚠ {errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mobile Number (10 digits) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength={10}
                      value={shippingData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">⚠ {errors.phone}</p>}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Flat / House No. / Street / Area *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={shippingData.address}
                    onChange={handleChange}
                    placeholder="Flat 402, Sunshine Heights, M.G. Road"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                      errors.address
                        ? 'border-red-300 focus:ring-red-100'
                        : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1">⚠ {errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    City / Town *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={shippingData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                        errors.city
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  {errors.city && <p className="text-xs text-red-600 mt-1">⚠ {errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={shippingData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pincode */}
                <div className="sm:col-span-2 sm:w-1/2">
                  <label htmlFor="postalCode" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pincode (6 digits) *
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    maxLength={6}
                    value={shippingData.postalCode}
                    onChange={handleChange}
                    placeholder="400001"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                      errors.postalCode
                        ? 'border-red-300 focus:ring-red-100'
                        : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-600 mt-1">⚠ {errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selection: Highlighted COD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Payment Option</h2>

              <div className="p-4 rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      Cash on Delivery (COD)
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">
                      Available
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pay with Cash or UPI directly to our delivery courier when the order is safely
                    handed over at your address. No advance payment required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Order Summary Review */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Order Items ({cartItems.length})</h2>

              {/* Items Thumbnails List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item._id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200/60"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity} × {productService.formatINR(item.price)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {productService.formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {productService.formatINR(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
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
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {productService.formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Placing Your COD Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order (COD)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Safe & Secure Checkout • Free Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
