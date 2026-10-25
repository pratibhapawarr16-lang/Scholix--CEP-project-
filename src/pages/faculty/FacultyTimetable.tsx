import React, { useState, useMemo } from 'react';
import { CalendarDays, Clock, Edit2, AlertTriangle, Check, X, User } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { DayOfWeek, TimetableEntry } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyTimetable: React.FC = () => {
  const { toast } = useToast();
  const state = dataService.getState();

  const [selectedClassId, setSelectedClassId] = useState<string>('class-10a');
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);

  // Modal edit form state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [
    { period: 1, startTime: '08:30 AM', endTime: '09:15 AM' },
    { period: 2, startTime: '09:15 AM', endTime: '10:00 AM' },
    { period: 3, startTime: '10:15 AM', endTime: '11:00 AM' },
    { period: 4, startTime: '11:00 AM', endTime: '11:45 AM' },
    { period: 'lunch', startTime: '11:45 AM', endTime: '12:30 PM', isBreak: true },
    { period: 5, startTime: '12:30 PM', endTime: '01:15 PM' },
    { period: 6, startTime: '01:15 PM', endTime: '02:00 PM' },
  ];

  const classEntries = useMemo(() => {
    return state.timetable.filter((t) => t.classId === selectedClassId);
  }, [state.timetable, selectedClassId]);

  const getEntry = (day: DayOfWeek, pNum: number) => {
    return classEntries.find((t) => t.day === day && t.period === pNum);
  };

  const openEditModal = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setSelectedSubjectId(entry.subjectId);
    setSelectedFacultyId(entry.facultyId);
    setConflictWarning(null);
  };

  // Conflict check helper
  const handleFacultyChange = (fId: string) => {
    setSelectedFacultyId(fId);
    if (!editingEntry) return;

    // Check if another class uses this teacher at the exact same day and period
    const conflict = state.timetable.find(
      (t) =>
        t.facultyId === fId &&
        t.day === editingEntry.day &&
        t.period === editingEntry.period &&
        t.classId !== selectedClassId
    );

    if (conflict) {
      const conflictingClass = state.classes.find((c) => c.id === conflict.classId);
      const teacher = state.faculty.find((f) => f.id === fId);
      setConflictWarning(
        `Notice: ${teacher?.name} is already assigned to Class ${conflictingClass?.grade}-${conflictingClass?.section} during Period ${editingEntry.period} on ${editingEntry.day}.`
      );
    } else {
      setConflictWarning(null);
    }
  };

  const handleSaveEntry = async () => {
    if (!editingEntry) return;
    await dataService.updateTimetableEntry(editingEntry.id, selectedSubjectId, selectedFacultyId);
    toast.success(
      `Period ${editingEntry.period} on ${editingEntry.day} updated successfully!`
    );
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            Class Timetable Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure weekly schedules, adjust period subjects, and assign faculty with conflict validation.
          </p>
        </div>

        {/* Class Selector */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Select Class
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy-900 outline-none focus:border-teal-500"
          >
            {state.classes.map((c) => (
              <option key={c.id} value={c.id}>
                Class {c.grade}-{c.section} ({c.roomNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card
        title={`Weekly Schedule Grid: Class ${
          state.classes.find((c) => c.id === selectedClassId)?.grade
        }-${state.classes.find((c) => c.id === selectedClassId)?.section}`}
        subtitle="Click any lecture cell to edit subject or faculty assignment"
      >
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-950 text-white text-xs font-bold">
                <th className="py-4 px-4 w-36 border-r border-navy-900">Period & Timing</th>
                {days.map((d) => (
                  <th key={d} className="py-4 px-4 border-r border-navy-900 last:border-r-0 text-center">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {periods.map((p, idx) => {
                if (p.isBreak) {
                  return (
                    <tr key={idx} className="bg-amber-50/70 font-bold text-amber-900 text-center">
                      <td className="py-2.5 px-4 font-semibold text-amber-800 border-r border-slate-200 text-left">
                        {p.startTime} – {p.endTime}
                      </td>
                      <td colSpan={5} className="py-2.5 px-4 tracking-wider uppercase text-[11px]">
                        🥗 Midday Lunch Break & Recess
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 border-r border-slate-200 bg-slate-50/70">
                      <div className="font-bold text-navy-900">Period {p.period}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{p.startTime} – {p.endTime}</span>
                      </div>
                    </td>

                    {days.map((d) => {
                      const entry = getEntry(d, p.period as number);
                      const subject = state.subjects.find((s) => s.id === entry?.subjectId);
                      const faculty = state.faculty.find((f) => f.id === entry?.facultyId);

                      return (
                        <td
                          key={d}
                          onClick={() => entry && openEditModal(entry)}
                          className="py-3 px-3.5 border-r border-slate-100 last:border-r-0 cursor-pointer hover:bg-teal-50/40 group transition"
                        >
                          {entry ? (
                            <div className="p-2 rounded-xl bg-surface group-hover:bg-white border border-transparent group-hover:border-teal-200 group-hover:shadow-2xs transition">
                              <div className="flex items-center justify-between">
                                <p className="font-bold text-navy-900 text-xs group-hover:text-teal-700">
                                  {subject?.name}
                                </p>
                                <Edit2 className="w-3 h-3 text-slate-300 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition" />
                              </div>
                              <p className="text-[10px] text-slate-500 truncate mt-1 flex items-center gap-1">
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
      </Card>

      {/* Edit Entry Modal */}
      {editingEntry && (
        <Modal
          isOpen={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          title={`Edit Lecture: ${editingEntry.day} • Period ${editingEntry.period}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            {conflictWarning && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-semibold">{conflictWarning}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject Allocation
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 bg-white outline-none focus:border-teal-500"
              >
                {state.subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Assigned Faculty Teacher
              </label>
              <select
                value={selectedFacultyId}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 bg-white outline-none focus:border-teal-500"
              >
                {state.faculty.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEntry}
                className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
