import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  FileSpreadsheet,
  Bell,
  CalendarDays,
  FileText,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Users,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { Faculty, DayOfWeek } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const FacultyDashboard: React.FC = () => {
  const { profile } = useAuth();
  const faculty = profile as Faculty;
  const state = dataService.getState();
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];

  // FD-2 Assigned classes & subjects
  const assignments = useMemo(() => {
    if (!faculty) return [];
    return state.facultyAssignments.filter((fa) => fa.facultyId === faculty.id);
  }, [faculty, state.facultyAssignments]);

  // FD-3 Today's Timetable for this faculty member
  const todayLectures = useMemo(() => {
    if (!faculty) return [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[new Date().getDay()];
    const lookupDay: DayOfWeek = (dayName === 'Saturday' || dayName === 'Sunday') ? 'Monday' : (dayName as DayOfWeek);

    return state.timetable
      .filter((t) => t.facultyId === faculty.id && t.day === lookupDay)
      .sort((a, b) => a.period - b.period);
  }, [faculty, state.timetable]);

  // FD-4 Today's Attendance Tasks
  const attendanceTasks = useMemo(() => {
    if (!faculty) return [];
    // If faculty is class teacher of a class (e.g. Meera for 10-A, Rajesh for 9-B)
    const myClasses = state.classes.filter((c) => c.classTeacherId === faculty.id);
    return myClasses.map((cls) => {
      const records = state.attendance.filter(
        (a) => a.classId === cls.id && a.date === todayStr
      );
      const isMarked = records.length > 0;
      return {
        classId: cls.id,
        className: `Class ${cls.grade}-${cls.section}`,
        isMarked,
        recordCount: records.length,
      };
    });
  }, [faculty, state.classes, state.attendance, todayStr]);

  // FD-5 Recent Notices
  const recentNotices = useMemo(() => {
    return dataService.getNotices().slice(0, 3);
  }, [state.notices]);

  // FD-6 Pending Document Requests
  const pendingRequests = useMemo(() => {
    return (state.documentRequests || []).filter((d) => d.status === 'Pending');
  }, [state.documentRequests]);

  return (
    <div className="space-y-6">
      {/* FD-1 Faculty Profile Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={faculty?.avatar}
              alt={faculty?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
                  Faculty Administration
                </span>
                <span className="text-xs text-slate-400">ID: {faculty?.employeeId}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {faculty?.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {faculty?.designation} • Dept. of {faculty?.department}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/faculty/attendance"
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 text-xs font-bold transition shadow-sm"
            >
              Mark Attendance
            </Link>
            <Link
              to="/faculty/results"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition"
            >
              Enter Exam Marks
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid: Attendance Task & Pending Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* FD-4 Daily Attendance Task */}
        <Card
          title="Daily Attendance Status"
          subtitle={`Class teacher duties for today (${todayStr})`}
        >
          <div className="space-y-3 pt-2">
            {attendanceTasks.length > 0 ? (
              attendanceTasks.map((task) => (
                <div
                  key={task.classId}
                  className="p-3.5 rounded-2xl border border-slate-200/90 bg-surface flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">{task.className}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {task.isMarked
                        ? `Attendance marked (${task.recordCount} students)`
                        : 'Attendance pending for today'}
                    </p>
                  </div>
                  <div>
                    {task.isMarked ? (
                      <Badge variant="success" dot>
                        Completed
                      </Badge>
                    ) : (
                      <button
                        onClick={() => navigate('/faculty/attendance')}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-sm transition"
                      >
                        Mark Now
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-3">No class teacher assignments.</p>
            )}
          </div>
        </Card>

        {/* FD-6 Pending Document Requests */}
        <Card
          title="Pending Document Requests"
          subtitle="Student applications requiring verification"
          headerAction={
            <Link
              to="/faculty/documents"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Review All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-2.5 pt-1">
            {pendingRequests.length > 0 ? (
              pendingRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
                >
                  <div>
                    <p className="text-xs font-bold text-navy-900">{req.studentName}</p>
                    <p className="text-[10px] text-slate-500">{req.type} • {req.className}</p>
                  </div>
                  <Link
                    to="/faculty/documents"
                    className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[10px] transition"
                  >
                    Review
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                All student document requests have been reviewed.
              </p>
            )}
          </div>
        </Card>

        {/* FD-2 Assigned Classes & Subjects */}
        <Card title="Assigned Teaching Modules" subtitle="Courses and sections under your supervision">
          <div className="space-y-2 pt-1">
            {assignments.map((as) => {
              const cls = state.classes.find((c) => c.id === as.classId);
              const sub = state.subjects.find((s) => s.id === as.subjectId);
              return (
                <div
                  key={as.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-navy-900">
                    Class {cls?.grade}-{cls?.section}
                  </span>
                  <span className="text-slate-600 font-semibold">{sub?.name}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Grid: Today's Timetable + Notice Management Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FD-3 Today's Timetable for Faculty */}
        <Card
          title="My Lecture Schedule Today"
          subtitle="Your scheduled teaching periods"
          headerAction={
            <Link
              to="/faculty/timetable"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Timetable Editor <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-2.5 pt-2">
            {todayLectures.length > 0 ? (
              todayLectures.map((item) => {
                const cls = state.classes.find((c) => c.id === item.classId);
                const sub = state.subjects.find((s) => s.id === item.subjectId);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface border border-slate-200/80 hover:bg-white transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-navy-900 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                        P{item.period}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-navy-900">{sub?.name}</h4>
                        <p className="text-[10px] text-slate-500">
                          Class {cls?.grade}-{cls?.section} ({cls?.roomNo})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.startTime} – {item.endTime}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No lectures scheduled today.</p>
            )}
          </div>
        </Card>

        {/* FD-5 Recent Notices Published */}
        <Card
          title="School Notice Broadcasts"
          subtitle="Recent institutional notices"
          headerAction={
            <Link
              to="/faculty/notices"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Manage Notices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-3 pt-2">
            {recentNotices.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-surface/50 hover:bg-white transition"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="navy">{n.category}</Badge>
                  <span className="text-[10px] text-slate-400">{n.date}</span>
                </div>
                <h4 className="text-xs font-bold text-navy-900">{n.title}</h4>
                <p className="text-[11px] text-slate-600 line-clamp-1 mt-1">{n.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
