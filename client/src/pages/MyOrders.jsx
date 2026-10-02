import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import {
  Package,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

const MyOrders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessBanner, setShowSuccessBanner] = useState(
    Boolean(location.state?.orderSuccess)
  );

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      const res = await orderService.getMyOrders();
      if (mounted && res.success) {
        setOrders(res.orders || []);
      }
      if (mounted) setLoading(false);
    };

    fetchOrders();
    return () => {
      mounted = false;
    };
  }, []);

  const getStatusBadge = (status = 'Pending') => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Order Placed (Pending)
          </span>
        );
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Order History
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track the status and details of your past and ongoing orders.
        </p>
      </div>

      {/* Checkout Success Banner */}
      {showSuccessBanner && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-emerald-950">
                Order Placed Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
                Thank you for your order! Your Cash on Delivery order has been registered and is
                being prepared for dispatch.
              </p>
              {location.state?.orderId && (
                <p className="text-xs font-mono text-emerald-700 mt-1 font-semibold">
                  Order Reference: {location.state.orderId}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccessBanner(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Orders List or Empty State */}
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
          <p className="text-slate-600 font-medium">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="min-h-[400px] bg-white rounded-3xl border border-slate-200/80 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">No Orders Yet</h2>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            You haven't placed any orders with QuickCart yet. Start exploring our catalog to make
            your first purchase with Cash on Delivery!
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const items = order.orderItems || [];
            const shipping = order.shippingAddress || {};

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                {/* Order Card Header */}
                <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Order ID
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                        {order._id}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Date Placed
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Total Amount
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {productService.formatINR(order.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge & Payment Method */}
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                      Cash on Delivery
                    </span>
                    {getStatusBadge(order.status || 'Pending')}
                  </div>
                </div>

                {/* Card Body: Items List & Shipping Info */}
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 Cols: Itemized list */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Ordered Items ({items.length})
                    </h4>

                    <div className="divide-y divide-slate-100">
                      {items.map((item, idx) => (
                        <div key={idx} className="py-3 first:pt-0 flex items-center gap-4">
                          <img
                            src={
                              item.image ||
                              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400'
                            }
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200/60 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-slate-900 truncate">
                              {item.name}
                            </h5>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Quantity: <strong className="text-slate-800">{item.quantity}</strong>{' '}
                              × {productService.formatINR(item.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-slate-900">
                              {productService.formatINR(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Col: Delivery Address & Summary */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/60 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span>Delivery Address</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {shipping.fullName || 'Customer'}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {shipping.address}
                        <br />
                        {shipping.city}, {shipping.state || 'India'} - {shipping.postalCode}
                      </p>
                      {shipping.phone && (
                        <p className="text-xs text-slate-500 mt-2">
                          Phone: <span className="font-medium text-slate-800">{shipping.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> COD Verified
                      </span>
                      <Link
                        to="/products"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Shop Again →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
