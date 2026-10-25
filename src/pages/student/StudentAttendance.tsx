import React, { useState, useMemo } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Filter, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { Student } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentAttendance: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const state = dataService.getState();

  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const records = useMemo(() => {
    if (!student) return [];
    return dataService.getAttendanceForStudent(student.id);
  }, [student, state.attendance]);

  // Overall metrics
  const stats = useMemo(() => {
    const total = records.length;
    const present = records.filter((r) => r.status === 'Present').length;
    const absent = total - present;
    const percent = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, percent };
  }, [records]);

  // Monthly breakdown
  const monthlySummary = useMemo(() => {
    const monthsMap: Record<string, { present: number; absent: number; total: number }> = {};
    for (const r of records) {
      const monthKey = r.date.substring(0, 7); // YYYY-MM
      if (!monthsMap[monthKey]) {
        monthsMap[monthKey] = { present: 0, absent: 0, total: 0 };
      }
      monthsMap[monthKey].total += 1;
      if (r.status === 'Present') monthsMap[monthKey].present += 1;
      else monthsMap[monthKey].absent += 1;
    }

    return Object.entries(monthsMap)
      .map(([key, data]) => {
        const dateObj = new Date(`${key}-01`);
        const label = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const percent = Math.round((data.present / data.total) * 100);
        return { key, label, ...data, percent };
      })
      .sort((a, b) => b.key.localeCompare(a.key));
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    if (selectedMonth === 'all') return records;
    return records.filter((r) => r.date.startsWith(selectedMonth));
  }, [records, selectedMonth]);

  const isEligible = stats.percent >= 75;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-navy-900 tracking-tight">
          My Academic Attendance
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Detailed log of your daily attendance marked by your class teacher.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Cumulative Percentage</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                className={`text-3xl font-black ${
                  isEligible ? 'text-teal-700' : 'text-amber-600'
                }`}
              >
                {stats.percent}%
              </span>
              <Badge variant={isEligible ? 'success' : 'warning'}>
                {isEligible ? 'Eligible' : 'Shortage'}
              </Badge>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-teal-50 text-teal-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Total Working Days</p>
            <span className="text-3xl font-black text-navy-900 mt-1 block">{stats.total}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Days Present</p>
            <span className="text-3xl font-black text-teal-700 mt-1 block">{stats.present}</span>
          </div>
          <div className="p-3 rounded-xl bg-teal-50 text-teal-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Days Absent</p>
            <span className="text-3xl font-black text-rose-600 mt-1 block">{stats.absent}</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <Card title="Monthly Attendance Breakdown" subtitle="Performance across academic terms">
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Academic Month</th>
                <th className="py-3 px-4">Total Days</th>
                <th className="py-3 px-4">Present</th>
                <th className="py-3 px-4">Absent</th>
                <th className="py-3 px-4">Monthly Rate</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {monthlySummary.map((m) => (
                <tr key={m.key} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-navy-900">{m.label}</td>
                  <td className="py-3.5 px-4">{m.total} days</td>
                  <td className="py-3.5 px-4 text-teal-700 font-bold">{m.present}</td>
                  <td className="py-3.5 px-4 text-rose-600 font-bold">{m.absent}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            m.percent >= 75 ? 'bg-teal-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${m.percent}%` }}
                        />
                      </div>
                      <span className="font-bold">{m.percent}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={m.percent >= 75 ? 'success' : 'warning'}>
                      {m.percent >= 75 ? 'Optimal' : 'Needs Attention'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Date-wise Detailed Table */}
      <Card
        title="Date-Wise Attendance History"
        subtitle="Chronological roll-call audit log"
        headerAction={
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-teal-500"
            >
              <option value="all">All Months</option>
              {monthlySummary.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        }
      >
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Day of Week</th>
                  <th className="py-3 px-4">Attendance Status</th>
                  <th className="py-3 px-4">Verified By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredRecords.map((r) => {
                  const dayName = new Date(r.date).toLocaleDateString('en-US', { weekday: 'long' });
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-navy-900">{r.date}</td>
                      <td className="py-3 px-4 text-slate-500">{dayName}</td>
                      <td className="py-3 px-4">
                        <Badge variant={r.status === 'Present' ? 'success' : 'danger'} dot>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        Class Teacher (Verified)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={CalendarCheck}
            title="No Attendance Records Found"
            description="There are no attendance records for the selected month."
          />
        )}
      </Card>
    </div>
  );
};
