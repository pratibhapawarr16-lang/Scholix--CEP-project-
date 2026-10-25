import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileSpreadsheet,
  Bell,
  CalendarDays,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Sparkles,
  School,
  GraduationCap,
  Layers,
  Award,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: CalendarCheck,
      title: 'Digital Attendance Tracking',
      desc: 'Daily roll-call marking with instant percentage calculation and monthly attendance summaries for students and teachers.',
      color: 'text-teal-600 bg-teal-50',
    },
    {
      icon: UserCheck,
      title: 'Student Profile & Portfolios',
      desc: 'Official academic data combined with an editable student portfolio showcasing skills, achievements, activities, and certificates.',
      color: 'text-navy-600 bg-navy-50',
    },
    {
      icon: FileSpreadsheet,
      title: 'Examination Results',
      desc: 'Subject-wise mark entry with validation, draft saving, and instant grade calculation once published by faculty.',
      color: 'text-sky-600 bg-sky-50',
    },
    {
      icon: Bell,
      title: 'School-Wide Notices',
      desc: 'Categorized digital circulars for exams, events, and holidays, eliminating lost paperwork and missed announcements.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: CalendarDays,
      title: 'Dynamic Weekly Timetables',
      desc: 'Interactive schedule grids with teacher assignments, period timings, and conflict warnings during scheduling.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: FileText,
      title: 'Document Request Management',
      desc: 'Students request bonafide or transfer certificates online and track live approval status and remarks without visiting the office.',
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const studentSteps = [
    'Log in with your roll number or student email.',
    'View your attendance percentage and subject results in real time.',
    'Update your academic portfolio with new skills and awards.',
    'Submit certificate requests and track live approval status.',
  ];

  const facultySteps = [
    'Log in to view assigned classes, subjects, and daily lectures.',
    'Mark attendance in seconds with one-click toggles.',
    'Enter exam marks with instant validation and publish to students.',
    'Broadcast school notices and process certificate applications.',
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Zero Paper Delays',
      desc: 'Eliminates lost paper slips, manual registers, and physical notice board congestion.',
    },
    {
      icon: Zap,
      title: 'Instant Data Flow',
      desc: 'Marks, attendance, and announcements entered by faculty reflect immediately in student portals.',
    },
    {
      icon: Shield,
      title: 'Transparent Records',
      desc: 'Students always know their exact attendance percentage and certificate request statuses.',
    },
    {
      icon: Layers,
      title: 'Single Unified Portal',
      desc: 'Consolidates 5 core school management activities under one intuitive, lightweight interface.',
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-50/60 to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 text-teal-300 text-xs font-semibold shadow-sm border border-navy-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>College CEP Demonstration Prototype • Grades 8–10</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-navy-900 tracking-tight leading-[1.1]">
              Scholix – A Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-navy-700">
                School Monitoring System
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Digitizing physical registers, exam results, notice boards, timetables, and certificate requests into a seamless student–faculty digital workflow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Launch Portal Login
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-navy-900 font-bold text-sm border border-slate-300 shadow-sm transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Quick Demo Credentials Info */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Pre-loaded Demo Accounts
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Live REST API + Local Sync
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> 1-Click Role Switch
              </span>
            </div>
          </div>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-0" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
              Five Core Records Digitized
            </h2>
            <h3 className="text-3xl font-black text-navy-900 tracking-tight">
              Everything Needed for Modern School Administration
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Replaces physical paperwork with instant, transparent digital workflows for teachers and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl border border-slate-200/80 bg-surface/50 hover:bg-white hover:shadow-cardHover transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-base font-bold text-navy-900 mb-2">{f.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
              Simple & Cohesive
            </h2>
            <h3 className="text-3xl font-black text-navy-900 tracking-tight">
              How Scholix Operates
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Two distinct roles connected through a single synchronized data model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Students */}
            <Card className="p-8 border-t-4 border-t-teal-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy-900">For Students</h4>
                  <p className="text-xs text-slate-500">Personalized Academic Hub</p>
                </div>
              </div>
              <ul className="space-y-4">
                {studentSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* For Faculty */}
            <Card className="p-8 border-t-4 border-t-navy-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy-900">For Faculty</h4>
                  <p className="text-xs text-slate-500">Classroom Administration</p>
                </div>
              </div>
              <ul className="space-y-4">
                {facultySteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-navy-100 text-navy-900 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
              Why Scholix
            </h2>
            <h3 className="text-3xl font-black text-navy-900 tracking-tight">
              Designed for Immediate Academic Impact
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Eliminating friction between students and teachers through transparent, instant record management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-surface border border-slate-200/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-navy-900">{b.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section id="contact" className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <Badge variant="info" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
            College Demonstration Ready
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Experience the Scholix Live Demo?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Test the end-to-end student and faculty workflows with pre-seeded demo accounts. Click below to begin.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Sign In to Demo Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
