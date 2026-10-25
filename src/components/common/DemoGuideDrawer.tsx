import React, { useState } from 'react';
import { Sparkles, Check, ChevronRight, X, RotateCcw, Server, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';

export const DemoGuideDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { quickLogin, logout, resetAllData } = useAuth();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const steps = [
    {
      num: 1,
      title: 'Landing Page Walkthrough',
      desc: 'Show Hero, Features, How It Works, Benefits, and School info.',
      action: null,
    },
    {
      num: 2,
      title: 'Login as Faculty (Meera)',
      desc: 'Show validation error with wrong password, then log in as Meera Kulkarni.',
      action: () => quickLogin('meera'),
      actionLabel: 'Log in as Meera',
    },
    {
      num: 3,
      title: 'Mark Today’s Attendance',
      desc: 'Go to Faculty Attendance, select 10-A & today, mark 2 students Absent, and Save.',
      action: null,
    },
    {
      num: 4,
      title: 'Enter & Publish Midterm Marks',
      desc: 'Go to Results, select Midterm & Math. Try entering 105 (shows error), fix to 88, and click Publish.',
      action: null,
    },
    {
      num: 5,
      title: 'Publish School Notice',
      desc: 'Create notice "Annual Sports Day on Friday" with category "Event" and publish.',
      action: null,
    },
    {
      num: 6,
      title: 'Switch to Student (Aarav)',
      desc: 'Log out and sign in as Aarav Sharma. Show live updated attendance %, Midterm score & notice.',
      action: () => quickLogin('aarav'),
      actionLabel: 'Log in as Aarav',
    },
    {
      num: 7,
      title: 'Explore Student Portal',
      desc: 'Briefly visit My Attendance, My Results, Notices, and weekly Timetable.',
      action: null,
    },
    {
      num: 8,
      title: 'Update Portfolio & Save',
      desc: 'Go to My Profile, add a skill and achievement, and click Save Portfolio.',
      action: null,
    },
    {
      num: 9,
      title: 'Submit Bonafide Certificate Request',
      desc: 'Go to Document Requests, submit a Bonafide request with purpose. Status is Pending.',
      action: null,
    },
    {
      num: 10,
      title: 'Faculty Approves Request',
      desc: 'Switch back to Meera, open Document Requests, review Aarav’s request, and set Approved.',
      action: () => quickLogin('meera'),
      actionLabel: 'Switch to Meera',
    },
    {
      num: 11,
      title: 'Student Sees Live Approval',
      desc: 'Switch back to Aarav. Document request shows Approved with faculty remark.',
      action: () => quickLogin('aarav'),
      actionLabel: 'Switch to Aarav',
    },
    {
      num: 12,
      title: 'Wrap Up Presentation',
      desc: 'Summarize system benefits, role-based workflows, and reset demo data for the next round.',
      action: null,
    },
  ];

  const toggleStep = (num: number) => {
    if (completedSteps.includes(num)) {
      setCompletedSteps(completedSteps.filter((s) => s !== num));
    } else {
      setCompletedSteps([...completedSteps, num]);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    await resetAllData();
    setCompletedSteps([]);
    setIsResetting(false);
    toast.success('Demo data restored to initial state!');
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-navy-900 to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-bold border border-white/20"
      >
        <Sparkles className="w-4 h-4 text-teal-300 animate-pulse" />
        <span>CEP Demo Presentation Guide</span>
        <span className="bg-teal-500 text-navy-950 px-2 py-0.5 rounded-full text-[10px] font-black">
          {completedSteps.length}/{steps.length}
        </span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-navy-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-r border-slate-200 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-navy-900 to-navy-800 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  College CEP Presentation
                </div>
                <h3 className="text-lg font-bold mt-1 text-white">8-Minute Live Demo Walkthrough</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2 text-xs">
              <span className="font-medium text-slate-600 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-teal-600" />
                Backend: <strong className="text-teal-700">{dataService.isBackendOnline() ? 'Connected (Port 5000)' : 'Active (Local Sync)'}</strong>
              </span>
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 text-navy-900 font-semibold rounded-lg border border-slate-300 shadow-2xs transition"
              >
                <RotateCcw className={`w-3 h-3 text-slate-500 ${isResetting ? 'animate-spin' : ''}`} />
                Reset Data
              </button>
            </div>

            {/* Steps List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {steps.map((st) => {
                const isDone = completedSteps.includes(st.num);
                return (
                  <div
                    key={st.num}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-teal-50/60 border-teal-200/80 text-slate-700'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStep(st.num)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition ${
                          isDone
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : st.num}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-navy-900'}`}>
                            {st.title}
                          </h4>
                          {st.action && (
                            <button
                              onClick={st.action}
                              className="text-[11px] font-semibold text-teal-700 hover:text-teal-800 bg-teal-100/70 hover:bg-teal-100 px-2 py-0.5 rounded-md transition"
                            >
                              {st.actionLabel}
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Completed: <strong>{completedSteps.length}</strong> of {steps.length}
              </span>
              <button
                onClick={() => setCompletedSteps(steps.map((s) => s.num))}
                className="text-teal-700 hover:underline font-semibold"
              >
                Mark all completed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
