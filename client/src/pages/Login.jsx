import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previously requested page, or to home
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');

    const res = await login(formData.email.trim(), formData.password);
    setIsSubmitting(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setServerError(res.error || 'Invalid email or password.');
    }
  };

  const handleDemoFill = (role = 'customer') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@quickcart.com',
        password: 'password123',
      });
    } else {
      setFormData({
        email: 'customer@quickcart.com',
        password: 'password123',
      });
    }
    setErrors({});
    setServerError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to access your orders, cart, and account settings
          </p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">Authentication Failed</p>
              <p className="mt-0.5 text-red-600">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                    : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                    : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center mb-3">Quick demo fill:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('customer')}
              className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Admin Demo
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
