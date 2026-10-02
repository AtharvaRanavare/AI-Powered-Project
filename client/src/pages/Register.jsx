import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

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

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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

    const res = await register(
      formData.name.trim(),
      formData.email.trim(),
      formData.password
    );
    setIsSubmitting(false);

    if (res.success) {
      navigate('/', { replace: true });
    } else {
      setServerError(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-3">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
          <p className="text-sm text-slate-500 mt-1">
            Join QuickCart to start ordering with easy Cash on Delivery
          </p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">Registration Error</p>
              <p className="mt-0.5 text-red-600">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                    : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

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
                placeholder="rahul@example.com"
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.confirmPassword
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                    : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-600'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
