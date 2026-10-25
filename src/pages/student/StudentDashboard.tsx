import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileSpreadsheet,
  Bell,
  CalendarDays,
  FileText,
  ArrowRight,
  Clock,
  TrendingUp,
  User,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { Student, DayOfWeek } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const StudentDashboard: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const state = dataService.getState();

  // 1. Attendance calculations
  const studentAttendance = useMemo(() => {
    if (!student) return { percent: 0, present: 0, total: 0 };
    const recs = dataService.getAttendanceForStudent(student.id);
    const present = recs.filter((r) => r.status === 'Present').length;
    const total = recs.length;
    const percent = total > 0 ? Math.round((present / total) * 100) : 0;
    return { percent, present, total };
  }, [student, state.attendance]);

  // 2. Recent published exam results
  const examSummary = useMemo(() => {
    if (!student) return null;
    const publishedResults = dataService.getResultsForStudent(student.id);
    if (publishedResults.length === 0) return null;

    // Group by exam
    const midtermResults = publishedResults.filter((r) => r.examId === 'exam-mid');
    const ut1Results = publishedResults.filter((r) => r.examId === 'exam-ut1');

    // Prefer Midterm if it has published results, else UT1
    const chosenResults = midtermResults.length > 0 ? midtermResults : ut1Results;
    const examObj = state.exams.find((e) => e.id === (chosenResults[0]?.examId || ''));

    const totalMarks = chosenResults.reduce((acc, curr) => acc + curr.marks, 0);
    const maxTotal = chosenResults.reduce((acc, curr) => {
      const es = state.examSubjects.find((s) => s.examId === curr.examId && s.subjectId === curr.subjectId);
      return acc + (es?.maxMarks || 100);
    }, 0);

    const percent = maxTotal > 0 ? Math.round((totalMarks / maxTotal) * 100) : 0;
    let grade = 'F';
    if (percent >= 90) grade = 'A+';
    else if (percent >= 80) grade = 'A';
    else if (percent >= 70) grade = 'B+';
    else if (percent >= 60) grade = 'B';
    else if (percent >= 50) grade = 'C';
    else if (percent >= 35) grade = 'D';

    return {
      examName: examObj?.name || 'Examination',
      totalMarks,
      maxTotal,
      percent,
      grade,
      subjectCount: chosenResults.length,
    };
  }, [student, state.results, state.exams]);

  // 3. Today's Lectures
  const todayLectures = useMemo(() => {
    if (!student) return [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[new Date().getDay()];
    // If weekend, fallback to Monday schedule
    const lookupDay: DayOfWeek = (dayName === 'Saturday' || dayName === 'Sunday') ? 'Monday' : (dayName as DayOfWeek);

    const entries = state.timetable.filter((t) => t.classId === student.classId && t.day === lookupDay);
    return entries.sort((a, b) => a.period - b.period);
  }, [student, state.timetable]);

  // 4. Latest Notices (3)
  const latestNotices = useMemo(() => {
    return dataService.getNotices().slice(0, 3);
  }, [state.notices]);

  // 5. Document Requests
  const documentRequests = useMemo(() => {
    if (!student) return [];
    return dataService.getDocumentRequests(student.id).slice(0, 3);
  }, [student, state.documentRequests]);

  const studentClass = state.classes.find((c) => c.id === student?.classId);
  const isAttendanceGood = studentAttendance.percent >= 75;

  return (
    <div className="space-y-6">
      {/* SD-1 Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={student?.avatar}
              alt={student?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
                  Student Portal
                </span>
                <span className="text-xs text-slate-400">AY {student?.academicYear}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Welcome back, {student?.name}!
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Class {studentClass ? `${studentClass.grade}-${studentClass.section}` : '10-A'} • Roll No: {student?.rollNo} • Adm No: {student?.admissionNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/profile"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition"
            >
              My Portfolio
            </Link>
            <Link
              to="/student/documents"
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 text-xs font-bold transition shadow-sm"
            >
              Request Document
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid: Attendance + Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SD-2 Attendance Card */}
        <Card
          title="Overall Attendance"
          subtitle="Cumulative academic attendance record"
          headerAction={
            <Link
              to="/student/attendance"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              View History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-4xl font-black ${
                    isAttendanceGood ? 'text-teal-700' : 'text-amber-600'
                  }`}
                >
                  {studentAttendance.percent}%
                </span>
                <Badge variant={isAttendanceGood ? 'success' : 'warning'}>
                  {isAttendanceGood ? 'Eligible (≥75%)' : 'Shortage Alert (<75%)'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Present for <strong>{studentAttendance.present}</strong> out of{' '}
                <strong>{studentAttendance.total}</strong> recorded school days.
              </p>
            </div>

            {/* Circular representation */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={isAttendanceGood ? 'text-teal-600' : 'text-amber-500'}
                  strokeDasharray={`${studentAttendance.percent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <CalendarCheck className={`w-5 h-5 absolute ${isAttendanceGood ? 'text-teal-600' : 'text-amber-600'}`} />
            </div>
          </div>
        </Card>

        {/* SD-3 Recent Results Card */}
        <Card
          title="Recent Results"
          subtitle={examSummary ? examSummary.examName : 'No published exams yet'}
          headerAction={
            <Link
              to="/student/results"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              All Results <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          {examSummary ? (
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-navy-900">{examSummary.percent}%</span>
                  <Badge variant="success">Grade {examSummary.grade}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Total Score: <strong>{examSummary.totalMarks}</strong> / {examSummary.maxTotal} marks ({examSummary.subjectCount} subjects published).
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700">
                <Award className="w-7 h-7" />
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-slate-500">
              Exam marks are currently being evaluated by faculty.
            </div>
          )}
        </Card>

        {/* SD-7 Document Request Status Widget */}
        <Card
          title="Document Requests"
          subtitle="Recent certificates & applications"
          headerAction={
            <Link
              to="/student/documents"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Apply <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-2.5 pt-1">
            {documentRequests.length > 0 ? (
              documentRequests.map((doc) => {
                const variant =
                  doc.status === 'Ready for Collection'
                    ? 'info'
                    : doc.status === 'Approved'
                    ? 'success'
                    : doc.status === 'Rejected'
                    ? 'danger'
                    : 'warning';
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="overflow-hidden pr-2">
                      <p className="text-xs font-bold text-navy-900 truncate">{doc.type}</p>
                      <p className="text-[10px] text-slate-500">{doc.dateRequested}</p>
                    </div>
                    <Badge variant={variant} dot>
                      {doc.status}
                    </Badge>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">No document requests active.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Grid: Today's Lectures + Latest Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SD-4 & SD-6 Today's Timetable Summary */}
        <Card
          title="Today’s Lecture Schedule"
          subtitle="Periods & subject allocations for your section"
          headerAction={
            <Link
              to="/student/timetable"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Full Timetable <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-2 pt-2">
            {todayLectures.length > 0 ? (
              todayLectures.map((item) => {
                const subject = state.subjects.find((s) => s.id === item.subjectId);
                const faculty = state.faculty.find((f) => f.id === item.facultyId);
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
                        <h4 className="text-xs font-bold text-navy-900">{subject?.name || 'Subject'}</h4>
                        <p className="text-[10px] text-slate-500">{faculty?.name || 'Faculty Member'}</p>
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

        {/* SD-5 Latest Notices */}
        <Card
          title="Latest School Notices"
          subtitle="Official circulars and announcements"
          headerAction={
            <Link
              to="/student/notices"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              All Notices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-3 pt-2">
            {latestNotices.map((notice) => {
              const variant =
                notice.category === 'Exam'
                  ? 'danger'
                  : notice.category === 'Holiday'
                  ? 'warning'
                  : notice.category === 'Event'
                  ? 'info'
                  : notice.category === 'Academic'
                  ? 'success'
                  : 'neutral';
              return (
                <div
                  key={notice.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-surface/50 hover:bg-white transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge variant={variant}>{notice.category}</Badge>
                    <span className="text-[10px] text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-navy-900">{notice.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
