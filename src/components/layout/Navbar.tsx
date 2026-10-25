import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-navy-900 flex items-center gap-1.5">
                Scholix
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 tracking-wider">
                  CEP DEMO
                </span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium">Smart School Monitoring System</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollTo('hero')} className="hover:text-navy-900 transition">
              Home
            </button>
            <button onClick={() => scrollTo('features')} className="hover:text-navy-900 transition">
              Features
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-navy-900 transition">
              How It Works
            </button>
            <button onClick={() => scrollTo('benefits')} className="hover:text-navy-900 transition">
              Benefits
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-navy-900 transition">
              Contact
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => navigate(role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-sm shadow-md hover:bg-navy-800 hover:shadow-lg transition-all"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-sm shadow-md hover:bg-navy-800 hover:shadow-lg transition-all"
              >
                Login to Portal
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('hero')}
            className="block w-full text-left py-2 font-semibold text-slate-700"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left py-2 font-semibold text-slate-700"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 font-semibold text-slate-700"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('benefits')}
            className="block w-full text-left py-2 font-semibold text-slate-700"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="block w-full text-left py-2 font-semibold text-slate-700"
          >
            Contact
          </button>
          <div className="pt-2">
            <Link
              to={isAuthenticated ? (role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard') : '/login'}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Login to Portal'}
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
