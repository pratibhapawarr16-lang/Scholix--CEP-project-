import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-navy-900 text-teal-400 flex items-center justify-center shadow-lg mb-6">
        <GraduationCap className="w-8 h-8" />
      </div>

      <h1 className="text-6xl font-black text-navy-900 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mt-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
        The requested URL or record route does not exist in the Scholix School Monitoring System demo.
      </p>

      <div className="flex items-center gap-3 mt-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-md hover:bg-navy-800 transition"
        >
          <Home className="w-4 h-4 text-teal-400" />
          Back to Scholix Home
        </Link>
        <Link
          to="/login"
          className="px-5 py-2.5 rounded-xl bg-white text-navy-900 border border-slate-300 text-xs font-bold hover:bg-slate-50 transition"
        >
          Portal Sign In
        </Link>
      </div>
    </div>
  );
};
