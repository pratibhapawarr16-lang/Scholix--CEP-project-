import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  FileSpreadsheet,
  Bell,
  CalendarDays,
  FileText,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  ArrowRightLeft,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Student, Faculty } from '../../types';

interface PortalLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'faculty';
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, role }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, logout, quickLogin, resetAllData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
    navigate('/login');
  };

  const handleResetData = async () => {
    await resetAllData();
    toast.success('Demo data reset to initial state!');
  };

  const studentNavItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile & Portfolio', path: '/student/profile', icon: User },
    { label: 'My Attendance', path: '/student/attendance', icon: CalendarCheck },
    { label: 'My Results', path: '/student/results', icon: FileSpreadsheet },
    { label: 'Notices', path: '/student/notices', icon: Bell },
    { label: 'Timetable', path: '/student/timetable', icon: CalendarDays },
    { label: 'Document Requests', path: '/student/documents', icon: FileText },
  ];

  const facultyNavItems = [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Attendance Management', path: '/faculty/attendance', icon: CalendarCheck },
    { label: 'Examination Results', path: '/faculty/results', icon: FileSpreadsheet },
    { label: 'Notice Management', path: '/faculty/notices', icon: Bell },
    { label: 'Timetable Management', path: '/faculty/timetable', icon: CalendarDays },
    { label: 'Document Requests', path: '/faculty/documents', icon: FileText },
  ];

  const navItems = role === 'student' ? studentNavItems : facultyNavItems;

  const studentProfile = role === 'student' ? (profile as Student) : null;
  const facultyProfile = role === 'faculty' ? (profile as Faculty) : null;

  const displayName = profile?.name || user?.username || 'User';
  const displaySubtitle =
    role === 'student'
      ? `Grade 10-A • Roll ${studentProfile?.rollNo || '01'}`
      : facultyProfile?.designation || 'Faculty Member';

  const avatarUrl =
    profile?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-navy-950 text-white shrink-0 border-r border-navy-900 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-6 border-b border-navy-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              Scholix
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/30 text-teal-300">
                {role === 'student' ? 'STUDENT' : 'FACULTY'}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Smart School Monitoring</p>
          </div>
        </div>

        {/* User Card in Sidebar */}
        <div className="px-5 py-4 mx-4 mt-4 rounded-xl bg-navy-900/80 border border-navy-800 flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-teal-500/60 shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">{displayName}</h4>
            <p className="text-[10px] text-teal-400 truncate">{displaySubtitle}</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-500 text-navy-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-navy-900 space-y-2">
          {/* Quick role switch for demo */}
          <div className="p-2.5 rounded-xl bg-navy-900/90 border border-navy-800 text-[11px]">
            <span className="text-slate-400 block font-medium mb-1.5 flex items-center gap-1.5">
              <ArrowRightLeft className="w-3 h-3 text-teal-400" />
              Quick Demo Switch:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={async () => {
                  await quickLogin('meera');
                  navigate('/faculty/dashboard');
                  toast.success('Switched to Mrs. Meera Kulkarni (Faculty)');
                }}
                className={`px-2 py-1.5 rounded-lg text-center font-bold text-[10px] transition ${
                  role === 'faculty'
                    ? 'bg-teal-600 text-white'
                    : 'bg-navy-800 hover:bg-navy-700 text-slate-300'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={async () => {
                  await quickLogin('aarav');
                  navigate('/student/dashboard');
                  toast.success('Switched to Aarav Sharma (Student)');
                }}
                className={`px-2 py-1.5 rounded-lg text-center font-bold text-[10px] transition ${
                  role === 'student'
                    ? 'bg-teal-600 text-white'
                    : 'bg-navy-800 hover:bg-navy-700 text-slate-300'
                }`}
              >
                Student
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/30 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Scholix High School
              </span>
              <h2 className="text-base font-bold text-navy-900 capitalize">
                {role} Portal
              </h2>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              title="Reset Demo Data"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Data</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-navy-900 leading-tight">{displayName}</div>
                  <div className="text-[10px] text-teal-600 font-semibold">{displaySubtitle}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-navy-900">{displayName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.username}</p>
                  </div>

                  {role === 'student' ? (
                    <NavLink
                      to="/student/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      View Portfolio
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/faculty/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Faculty Home
                    </NavLink>
                  )}

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-navy-950/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-72 bg-navy-950 text-white flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-5 border-b border-navy-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-teal-400" />
                  <span className="font-bold text-white">Scholix Mobile</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-teal-500 text-navy-950 font-bold'
                          : 'text-slate-300 hover:bg-navy-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-navy-900">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-rose-950/50 text-rose-300 border border-rose-900/60"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
