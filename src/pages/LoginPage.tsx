import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  School,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('faculty'); // Default to faculty for Step 2 of Section 18
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, quickLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password, role);
      toast.success(`Welcome back! Logged in as ${role === 'faculty' ? 'Faculty' : 'Student'}.`);
      navigate(role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = async (acc: 'meera' | 'rajesh' | 'aarav' | 'diya') => {
    setError(null);
    setIsLoading(true);
    try {
      await quickLogin(acc);
      toast.success(`Quick sign-in successful!`);
      navigate(acc === 'meera' || acc === 'rajesh' ? '/faculty/dashboard' : '/student/dashboard');
    } catch (err: any) {
      setError(err.message || 'Quick login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Back to home link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Scholix Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 mb-3 shadow-lg shadow-teal-500/10">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Scholix Portal Sign In
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your academic dashboard and records
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8">
          {/* Segmented Control Role Selector */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setError(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'student'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-teal-400" />
              Student Login
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('faculty');
                setError(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'faculty'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <School className="w-4 h-4 text-teal-400" />
              Faculty Login
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Username or Registered Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={
                    role === 'student'
                      ? 'aarav.sharma@scholix.demo'
                      : 'meera.kulkarni@scholix.demo'
                  }
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs text-slate-900 placeholder:text-slate-400 transition outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Account Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter demo password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs text-slate-900 placeholder:text-slate-400 transition outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 active:scale-[0.98] text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {role === 'student' ? 'Student' : 'Faculty'}</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-teal-600" /> Demo Credentials Helper
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                Instant 1-Click
              </span>
            </div>

            <div className="space-y-2">
              {role === 'faculty' ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('meera')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-navy-900 group-hover:text-teal-900">
                        Mrs. Meera Kulkarni (Class 10-A Teacher)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        meera.kulkarni@scholix.demo • Pass: faculty123
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      Sign In →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('rajesh')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-navy-900 group-hover:text-teal-900">
                        Dr. Rajesh Deshmukh (Science / 9-B Teacher)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        rajesh.deshmukh@scholix.demo • Pass: faculty123
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      Sign In →
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('aarav')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-navy-900 group-hover:text-teal-900">
                        Aarav Sharma (10-A, Roll 01)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        aarav.sharma@scholix.demo • Pass: student123
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      Sign In →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('diya')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-navy-900 group-hover:text-teal-900">
                        Diya Patel (10-A, Roll 02)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        diya.patel@scholix.demo • Pass: student123
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      Sign In →
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
