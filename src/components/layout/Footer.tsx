import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, RotateCcw, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const { resetAllData } = useAuth();
  const { toast } = useToast();

  const handleReset = async () => {
    await resetAllData();
    toast.success('Demo data restored to initial seed state.');
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-navy-900">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Scholix</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A Smart School Monitoring System built for College CEP demonstration. Digitizing attendance, results, timetables, and academic workflows for Grades 8–10.
            </p>
          </div>

          {/* School Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">School Campus</h4>
            <p className="text-sm font-semibold text-white">Scholix Demo High School</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>Sector 14, Knowledge Corridor, Pune, Maharashtra 411038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <span>+91 20 2589 1234 / +91 98220 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <span>admin@scholix.demo</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">System Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/login" className="hover:text-teal-300 transition">
                  Student Portal Access
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-teal-300 transition">
                  Faculty Portal Access
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-teal-300 transition">
                  Core Digitzed Records
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-teal-300 transition">
                  Demonstration Workflow
                </a>
              </li>
            </ul>
          </div>

          {/* CEP Demo Control */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Demonstration Tools</h4>
            <p className="text-xs text-slate-400">
              Evaluators can reset the demo state at any time to re-test the fresh workflow sequence.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-navy-800 hover:bg-navy-700 text-teal-300 rounded-xl text-xs font-semibold border border-navy-700 hover:border-teal-500/50 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2025-2026 Scholix – College CEP Project Prototype. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for Academic Evaluation & Demonstration
          </p>
        </div>
      </div>
    </footer>
  );
};
