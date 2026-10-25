import React, { useState, useEffect, useMemo } from 'react';
import {
  CalendarCheck,
  Check,
  X,
  Save,
  Users,
  RotateCcw,
  Calendar,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { Faculty, Student, AttendanceStatus } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyAttendance: React.FC = () => {
  const { profile } = useAuth();
  const faculty = profile as Faculty;
  const { toast } = useToast();
  const state = dataService.getState();

  const [activeTab, setActiveTab] = useState<'mark' | 'history'>('mark');

  // Form State
  const [selectedClassId, setSelectedClassId] = useState<string>('class-10a');
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Student attendance status mapping: studentId -> 'Present' | 'Absent'
  const [studentStatuses, setStudentStatuses] = useState<Record<string, AttendanceStatus>>({});
  const [isSaving, setIsSaving] = useState(false);

  // History detail modal
  const [historyDetailDate, setHistoryDetailDate] = useState<string | null>(null);

  // Filter students for the selected class
  const classStudents = useMemo(() => {
    return state.students
      .filter((s) => s.classId === selectedClassId)
      .sort((a, b) => Number(a.rollNo) - Number(b.rollNo));
  }, [state.students, selectedClassId]);

  // Load existing attendance for this class and date if already saved
  useEffect(() => {
    const existing = state.attendance.filter(
      (a) => a.classId === selectedClassId && a.date === selectedDate
    );

    const initialMap: Record<string, AttendanceStatus> = {};
    for (const student of classStudents) {
      const match = existing.find((e) => e.studentId === student.id);
      initialMap[student.id] = match ? match.status : 'Present'; // Default to Present
    }
    setStudentStatuses(initialMap);
  }, [selectedClassId, selectedDate, classStudents, state.attendance]);

  // Live counters
  const counts = useMemo(() => {
    let present = 0;
    let absent = 0;
    for (const s of classStudents) {
      if (studentStatuses[s.id] === 'Present') present++;
      else absent++;
    }
    return { present, absent, total: classStudents.length };
  }, [studentStatuses, classStudents]);

  // Toggle single student
  const toggleStatus = (studentId: string) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    for (const s of classStudents) {
      updated[s.id] = status;
    }
    setStudentStatuses(updated);
  };

  const handleSaveAttendance = async () => {
    if (new Date(selectedDate) > new Date(todayStr)) {
      toast.error('Attendance cannot be marked for future dates.');
      return;
    }

    setIsSaving(true);
    const records = classStudents.map((s) => ({
      studentId: s.id,
      status: studentStatuses[s.id] || 'Present',
    }));

    await dataService.saveAttendance(
      selectedClassId,
      selectedDate,
      records,
      faculty?.name || 'Class Teacher'
    );
    setIsSaving(false);

    const cls = state.classes.find((c) => c.id === selectedClassId);
    toast.success(
      `Attendance saved successfully for Class ${cls?.grade}-${cls?.section} on ${selectedDate}!`
    );
  };

  // History aggregated records
  const historySummary = useMemo(() => {
    const map: Record<string, { present: number; absent: number; total: number }> = {};
    const classRecs = state.attendance.filter((a) => a.classId === selectedClassId);

    for (const r of classRecs) {
      if (!map[r.date]) {
        map[r.date] = { present: 0, absent: 0, total: 0 };
      }
      map[r.date].total++;
      if (r.status === 'Present') map[r.date].present++;
      else map[r.date].absent++;
    }

    return Object.entries(map)
      .map(([date, d]) => ({
        date,
        ...d,
        percent: Math.round((d.present / d.total) * 100),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [state.attendance, selectedClassId]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            Class Attendance Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mark daily roll call and inspect historical attendance logs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300">
          <button
            onClick={() => setActiveTab('mark')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mark'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            View History
          </button>
        </div>
      </div>

      {activeTab === 'mark' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Select Class
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy-900 outline-none focus:border-teal-500"
                >
                  {state.classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      Class {c.grade}-{c.section} ({c.roomNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Attendance Date
                </label>
                <input
                  type="date"
                  max={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy-900 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Live Counter & Bulk helpers */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                <span className="text-teal-700">Present: {counts.present}</span>
                <span className="text-slate-300">|</span>
                <span className="text-rose-600">Absent: {counts.absent}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">Total: {counts.total}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleMarkAll('Present')}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition"
                >
                  All Present
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll('Absent')}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition"
                >
                  All Absent
                </button>
              </div>
            </div>
          </div>

          {/* Student Roster Table Card */}
          <Card
            title={`Roster for Class ${
              state.classes.find((c) => c.id === selectedClassId)?.grade
            }-${state.classes.find((c) => c.id === selectedClassId)?.section}`}
            subtitle="Click toggle buttons or use keyboard to switch status"
            headerAction={
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition active:scale-95"
              >
                <Save className="w-4 h-4 text-teal-400" />
                <span>{isSaving ? 'Saving...' : 'Save Attendance'}</span>
              </button>
            }
          >
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4 w-16">Roll No</th>
                    <th className="py-3 px-4">Student Details</th>
                    <th className="py-3 px-4">Guardian Contact</th>
                    <th className="py-3 px-4 text-center w-40">Status Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {classStudents.map((s) => {
                    const status = studentStatuses[s.id] || 'Present';
                    const isPresent = status === 'Present';
                    return (
                      <tr
                        key={s.id}
                        className={`transition ${
                          isPresent ? 'hover:bg-slate-50' : 'bg-rose-50/30 hover:bg-rose-50/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-navy-900">
                          #{s.rollNo}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={s.avatar}
                              alt={s.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-navy-900">{s.name}</p>
                              <p className="text-[10px] text-slate-400">Adm: {s.admissionNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          <div>{s.guardianName}</div>
                          <div className="text-[10px] text-slate-400">{s.contactPhone}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleStatus(s.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black shadow-2xs transition-all ${
                              isPresent
                                ? 'bg-teal-500 text-white hover:bg-teal-600'
                                : 'bg-rose-600 text-white hover:bg-rose-700'
                            }`}
                          >
                            {isPresent ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Present</span>
                              </>
                            ) : (
                              <>
                                <X className="w-3.5 h-3.5" />
                                <span>Absent</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100 mt-4">
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white font-black text-xs shadow-lg transition active:scale-95"
              >
                <Save className="w-4 h-4 text-teal-400" />
                <span>{isSaving ? 'Saving...' : 'Save & Confirm Attendance'}</span>
              </button>
            </div>
          </Card>
        </div>
      ) : (
        /* History Tab */
        <Card title="Attendance Record History" subtitle="Aggregated daily logs for the selected class">
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Date Recorded</th>
                  <th className="py-3 px-4">Present Count</th>
                  <th className="py-3 px-4">Absent Count</th>
                  <th className="py-3 px-4">Attendance Rate</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {historySummary.map((h) => (
                  <tr key={h.date} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-navy-900">{h.date}</td>
                    <td className="py-3.5 px-4 text-teal-700 font-bold">{h.present}</td>
                    <td className="py-3.5 px-4 text-rose-600 font-bold">{h.absent}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              h.percent >= 75 ? 'bg-teal-600' : 'bg-amber-500'
                            }`}
                            style={{ width: `${h.percent}%` }}
                          />
                        </div>
                        <span className="font-bold">{h.percent}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedDate(h.date);
                          setActiveTab('mark');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                      >
                        Edit Roster
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
