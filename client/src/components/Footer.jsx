import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck, Headphones, RotateCcw, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
      {/* Service Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all prepaid & COD orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-slate-800 rounded-xl text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Cash on Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pay safely at your door across India</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-slate-800 rounded-xl text-amber-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">No-hassle replacement & returns</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-slate-800 rounded-xl text-sky-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated phone & chat assistance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Quick<span className="text-indigo-400">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's trusted online shopping destination with authentic products, lightning-fast
              delivery, and guaranteed Cash on Delivery on all eligible products.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                🇮🇳 Proudly Serving Across India
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Quick Links</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-white transition">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Categories</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-white transition">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home & Kitchen" className="hover:text-white transition">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/products?category=Books" className="hover:text-white transition">
                  Bestseller Books
                </Link>
              </li>
              <li>
                <Link to="/products?category=Beauty & Care" className="hover:text-white transition">
                  Beauty & Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Help */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400">Payment: Cash on Delivery</li>
              <li className="text-slate-400">Email: support@quickcart.in</li>
              <li className="text-slate-400">Toll Free: 1800-123-4567</li>
              <li className="text-slate-400">Mon - Sat: 9 AM - 8 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QuickCart Technologies Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern React, Tailwind CSS, & Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
