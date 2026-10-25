import React, { useState, useMemo } from 'react';
import { CalendarDays, Clock, User, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { Student, DayOfWeek } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const StudentTimetable: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const state = dataService.getState();

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const todayIndex = new Date().getDay(); // 1=Mon, 5=Fri
  const currentDayName =
    todayIndex >= 1 && todayIndex <= 5 ? (days[todayIndex - 1] as DayOfWeek) : 'Monday';

  const [activeMobileDay, setActiveMobileDay] = useState<DayOfWeek>(currentDayName);

  const timetableEntries = useMemo(() => {
    if (!student) return [];
    return state.timetable.filter((t) => t.classId === student.classId);
  }, [student, state.timetable]);

  const periods = [
    { period: 1, startTime: '08:30 AM', endTime: '09:15 AM' },
    { period: 2, startTime: '09:15 AM', endTime: '10:00 AM' },
    { period: 3, startTime: '10:15 AM', endTime: '11:00 AM' },
    { period: 4, startTime: '11:00 AM', endTime: '11:45 AM' },
    { period: 'lunch', startTime: '11:45 AM', endTime: '12:30 PM', isBreak: true },
    { period: 5, startTime: '12:30 PM', endTime: '01:15 PM' },
    { period: 6, startTime: '01:15 PM', endTime: '02:00 PM' },
  ];

  const getEntry = (day: DayOfWeek, pNum: number) => {
    return timetableEntries.find((t) => t.day === day && t.period === pNum);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            Weekly Class Timetable
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Section 10-A daily schedule of lectures and faculty assignments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="navy">Academic Year 2025-2026</Badge>
          <Badge variant="success">Today: {currentDayName}</Badge>
        </div>
      </div>

      {/* Mobile Day Selector Tabs (< md screens) */}
      <div className="flex md:hidden p-1 bg-white rounded-2xl border border-slate-200 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveMobileDay(d)}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              activeMobileDay === d
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Mobile Day Schedule Card */}
      <div className="block md:hidden space-y-3">
        {periods.map((p, idx) => {
          if (p.isBreak) {
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs font-bold text-center"
              >
                🥗 Lunch & Recess Break ({p.startTime} – {p.endTime})
              </div>
            );
          }
          const entry = getEntry(activeMobileDay, p.period as number);
          const subject = state.subjects.find((s) => s.id === entry?.subjectId);
          const faculty = state.faculty.find((f) => f.id === entry?.facultyId);

          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-navy-900 text-teal-400 font-black text-xs flex items-center justify-center">
                  P{p.period}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-navy-900">{subject?.name || 'Open Period'}</h4>
                  <p className="text-[10px] text-slate-500">{faculty?.name || 'TBA'}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {p.startTime} – {p.endTime}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop Weekly Grid (>= md screens) */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-950 text-white text-xs font-bold">
                <th className="py-4 px-4 w-36 border-r border-navy-900">Period & Time</th>
                {days.map((d) => {
                  const isToday = d === currentDayName;
                  return (
                    <th
                      key={d}
                      className={`py-4 px-4 border-r border-navy-900 last:border-r-0 text-center ${
                        isToday ? 'bg-teal-700/50 text-teal-200 font-black' : ''
                      }`}
                    >
                      <span>{d}</span>
                      {isToday && (
                        <span className="block text-[9px] uppercase font-bold text-teal-300">
                          Today
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {periods.map((p, idx) => {
                if (p.isBreak) {
                  return (
                    <tr key={idx} className="bg-amber-50/60 font-bold text-amber-900 text-center">
                      <td className="py-2.5 px-4 font-semibold text-amber-800 border-r border-slate-200 text-left">
                        {p.startTime} – {p.endTime}
                      </td>
                      <td colSpan={5} className="py-2.5 px-4 tracking-wider uppercase text-[11px]">
                        🥗 Midday Lunch Break & Recess (45 Mins)
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    {/* Period col */}
                    <td className="py-4 px-4 border-r border-slate-200 bg-slate-50/60">
                      <div className="font-bold text-navy-900">Period {p.period}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{p.startTime} – {p.endTime}</span>
                      </div>
                    </td>

                    {/* Day cells */}
                    {days.map((d) => {
                      const entry = getEntry(d, p.period as number);
                      const subject = state.subjects.find((s) => s.id === entry?.subjectId);
                      const faculty = state.faculty.find((f) => f.id === entry?.facultyId);
                      const isToday = d === currentDayName;

                      return (
                        <td
                          key={d}
                          className={`py-3.5 px-4 border-r border-slate-100 last:border-r-0 ${
                            isToday ? 'bg-teal-50/30' : ''
                          }`}
                        >
                          {entry ? (
                            <div className="space-y-0.5">
                              <p className="font-bold text-navy-900 text-xs">{subject?.name}</p>
                              <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-400" />
                                <span>{faculty?.name}</span>
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-300 italic text-[11px]">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
