import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, Award, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { Student } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentResults: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const state = dataService.getState();

  const [selectedExamId, setSelectedExamId] = useState<string>('exam-mid');

  // Compute grading
  const getSubjectGrade = (marks: number, max: number) => {
    const pct = (marks / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 35) return 'D';
    return 'F';
  };

  // Published results for selected exam
  const examResults = useMemo(() => {
    if (!student) return [];
    return state.results.filter(
      (r) => r.studentId === student.id && r.examId === selectedExamId && r.status === 'Published'
    );
  }, [student, selectedExamId, state.results]);

  // Overall calculations for current exam
  const totals = useMemo(() => {
    const totalObtained = examResults.reduce((acc, curr) => acc + curr.marks, 0);
    const maxTotal = examResults.reduce((acc, curr) => {
      const es = state.examSubjects.find(
        (s) => s.examId === curr.examId && s.subjectId === curr.subjectId
      );
      return acc + (es?.maxMarks || 100);
    }, 0);

    const percent = maxTotal > 0 ? Math.round((totalObtained / maxTotal) * 100) : 0;
    const hasFailedSubject = examResults.some((r) => {
      const es = state.examSubjects.find(
        (s) => s.examId === r.examId && s.subjectId === r.subjectId
      );
      const max = es?.maxMarks || 100;
      return (r.marks / max) * 100 < 35;
    });

    const isPassed = !hasFailedSubject && percent >= 35;
    const grade = getSubjectGrade(totalObtained, maxTotal);

    return { totalObtained, maxTotal, percent, isPassed, grade };
  }, [examResults, state.examSubjects]);

  const currentExam = state.exams.find((e) => e.id === selectedExamId);

  return (
    <div className="space-y-6">
      {/* Title & Exam Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            My Examination Results
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official published academic marks and performance report card.
          </p>
        </div>

        {/* Exam Selector Tabs */}
        <div className="flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80">
          {state.exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedExamId === exam.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              {exam.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards if results exist */}
      {examResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Aggregate Percentage
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-navy-900">{totals.percent}%</span>
              <Badge variant="success">Grade {totals.grade}</Badge>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Score Obtained
            </span>
            <span className="text-3xl font-black text-teal-700 mt-1 block">
              {totals.totalObtained} / {totals.maxTotal}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Final Examination Status
            </span>
            <div className="mt-1">
              <Badge variant={totals.isPassed ? 'success' : 'danger'}>
                {totals.isPassed ? 'QUALIFIED / PASSED' : 'RETEST REQUIRED'}
              </Badge>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Evaluated Subjects
            </span>
            <span className="text-3xl font-black text-slate-800 mt-1 block">
              {examResults.length} / 6
            </span>
          </div>
        </div>
      )}

      {/* Results Table Card */}
      <Card
        title={`${currentExam?.name || 'Exam'} Mark Sheet`}
        subtitle="Subject-level breakdown with percentage and assigned grade"
      >
        {examResults.length > 0 ? (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Subject Code & Name</th>
                  <th className="py-3 px-4">Marks Obtained</th>
                  <th className="py-3 px-4">Maximum Marks</th>
                  <th className="py-3 px-4">Percentage</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {examResults.map((r) => {
                  const subject = state.subjects.find((s) => s.id === r.subjectId);
                  const es = state.examSubjects.find(
                    (s) => s.examId === r.examId && s.subjectId === r.subjectId
                  );
                  const maxMarks = es?.maxMarks || 100;
                  const pct = Math.round((r.marks / maxMarks) * 100);
                  const grade = getSubjectGrade(r.marks, maxMarks);
                  const isPassed = pct >= 35;

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-900">{subject?.name || 'Subject'}</div>
                        <div className="text-[10px] text-slate-400">{subject?.code}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-navy-900 text-sm">
                        {r.marks}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{maxMarks}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-teal-600 h-full rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-semibold">{pct}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-black px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                          {grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={isPassed ? 'success' : 'danger'}>
                          {isPassed ? 'Pass' : 'Fail'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* Grand Total Footer Row */}
              <tfoot>
                <tr className="bg-slate-50/80 font-bold border-t-2 border-slate-200 text-navy-900">
                  <td className="py-4 px-4 uppercase tracking-wider text-xs">
                    Grand Total
                  </td>
                  <td className="py-4 px-4 text-sm text-teal-700 font-black">
                    {totals.totalObtained}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {totals.maxTotal}
                  </td>
                  <td className="py-4 px-4 text-sm font-black text-navy-900">
                    {totals.percent}%
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-navy-900 text-teal-400 font-black text-xs">
                      {totals.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={totals.isPassed ? 'success' : 'danger'}>
                      {totals.isPassed ? 'Passed' : 'Failed'}
                    </Badge>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={FileSpreadsheet}
            title="Results Not Yet Published"
            description="Faculty members are currently finalizing marks evaluation for this examination. Please check back shortly."
          />
        )}
      </Card>
    </div>
  );
};
