import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Menu,
  X,
  Search,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-150 ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Quick<span className="text-indigo-600">Cart</span>
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 rounded">
                  COD India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                All Products
              </NavLink>
            </nav>
          </div>

          {/* Right Section: Search link, Cart, User controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick search shortcut link */}
            <Link
              to="/products"
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Icon with Counter */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in fade-in zoom-in duration-150">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Dynamic Auth State - Desktop */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-slate-800 max-w-[120px] truncate">
                      {user?.name || 'Customer'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {user?.email}
                        </p>
                        {isAdmin && (
                          <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 text-indigo-700 rounded-md">
                            <ShieldCheck className="w-3 h-3" /> Admin Account
                          </span>
                        )}
                      </div>

                      <Link
                        to="/my-orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Orders
                      </Link>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
            >
              All Products
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Shopping Cart</span>
              {totalItems > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <Link
                to="/my-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-slate-500" />
                <span>My Orders</span>
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800">{user?.name} ({user?.email})</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
