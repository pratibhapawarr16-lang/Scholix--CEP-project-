import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSpreadsheet,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { Faculty, Student, ResultStatus } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const FacultyResults: React.FC = () => {
  const { profile } = useAuth();
  const faculty = profile as Faculty;
  const { toast } = useToast();
  const state = dataService.getState();

  // Selection states (Default to 10-A, Math, Midterm for Step 4 of PRD)
  const [selectedClassId, setSelectedClassId] = useState<string>('class-10a');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-math');
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-mid');

  // Student marks map: studentId -> string representation of marks
  const [marksMap, setMarksMap] = useState<Record<string, string>>({});
  const [statusMap, setStatusMap] = useState<ResultStatus>('Draft');
  const [isSaving, setIsSaving] = useState(false);

  // Maximum marks for selected exam & subject
  const maxMarks = useMemo(() => {
    const es = state.examSubjects.find(
      (s) => s.examId === selectedExamId && s.subjectId === selectedSubjectId
    );
    return es ? es.maxMarks : 100;
  }, [selectedExamId, selectedSubjectId, state.examSubjects]);

  // Students in selected class
  const classStudents = useMemo(() => {
    return state.students
      .filter((s) => s.classId === selectedClassId)
      .sort((a, b) => Number(a.rollNo) - Number(b.rollNo));
  }, [state.students, selectedClassId]);

  // Load existing results for selected class, subject, and exam
  useEffect(() => {
    const existingResults = state.results.filter(
      (r) => r.examId === selectedExamId && r.subjectId === selectedSubjectId
    );

    const newMarks: Record<string, string> = {};
    let currentStatus: ResultStatus = 'Draft';

    for (const student of classStudents) {
      const match = existingResults.find((r) => r.studentId === student.id);
      if (match) {
        newMarks[student.id] = String(match.marks);
        if (match.status === 'Published') currentStatus = 'Published';
      } else {
        // Default suggestions for demo
        if (student.id === 'stu-10a-01') newMarks[student.id] = '88';
        else if (student.id === 'stu-10a-02') newMarks[student.id] = '95';
        else if (student.id === 'stu-10a-07') newMarks[student.id] = '62';
        else newMarks[student.id] = '78';
      }
    }

    setMarksMap(newMarks);
    setStatusMap(currentStatus);
  }, [selectedClassId, selectedSubjectId, selectedExamId, classStudents, state.results]);

  // Validation: Check for invalid marks
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    for (const student of classStudents) {
      const valStr = marksMap[student.id];
      if (valStr !== undefined && valStr !== '') {
        const num = Number(valStr);
        if (isNaN(num)) {
          errors[student.id] = 'Must be a valid number.';
        } else if (num < 0) {
          errors[student.id] = 'Cannot be negative.';
        } else if (num > maxMarks) {
          errors[student.id] = `Exceeds max allowable marks (${maxMarks}).`;
        }
      }
    }
    return errors;
  }, [marksMap, maxMarks, classStudents]);

  const hasErrors = Object.keys(validationErrors).length > 0;

  const handleMarksChange = (studentId: string, val: string) => {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: val,
    }));
  };

  const handleSave = async (status: 'Draft' | 'Published') => {
    if (hasErrors) {
      toast.error('Please fix highlighted errors before saving.');
      return;
    }

    setIsSaving(true);
    const results = classStudents.map((s) => ({
      studentId: s.id,
      marks: Number(marksMap[s.id] || 0),
      status,
    }));

    await dataService.saveResults(
      selectedExamId,
      selectedSubjectId,
      results,
      faculty?.name || 'Faculty Member',
      status
    );
    setStatusMap(status);
    setIsSaving(false);

    if (status === 'Published') {
      toast.success('Examination marks have been published! Students can now view their report cards.');
    } else {
      toast.info('Marks draft saved successfully. Not yet visible to students.');
    }
  };

  const selectedExam = state.exams.find((e) => e.id === selectedExamId);
  const selectedSub = state.subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            Examination Results & Mark Entry
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Input subject evaluation scores, validate thresholds, and publish report cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Current Status:</span>
          <Badge variant={statusMap === 'Published' ? 'success' : 'warning'} dot>
            {statusMap}
          </Badge>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
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
                  Class {c.grade}-{c.section}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy-900 outline-none focus:border-teal-500"
            >
              {state.subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Examination
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy-900 outline-none focus:border-teal-500"
            >
              {state.exams.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="navy">Max Marks: {maxMarks}</Badge>
        </div>
      </div>

      {/* Marks Table Card */}
      <Card
        title={`Marks Entry: ${selectedSub?.name} • ${selectedExam?.name}`}
        subtitle={`Class 10-A • Maximum Marks: ${maxMarks}`}
        headerAction={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave('Draft')}
              disabled={isSaving || hasErrors}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95 disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('Published')}
              disabled={isSaving || hasErrors}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs shadow-md transition active:scale-95 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Results</span>
            </button>
          </div>
        }
      >
        {/* Error warning box if any */}
        {hasErrors && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">
              Please correct the marks exceeding the maximum limit ({maxMarks}) before saving.
            </span>
          </div>
        )}

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4 w-16">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Marks Obtained (Out of {maxMarks})</th>
                <th className="py-3 px-4">Calculated Percentage</th>
                <th className="py-3 px-4">Subject Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {classStudents.map((s) => {
                const markVal = marksMap[s.id] || '';
                const error = validationErrors[s.id];
                const num = Number(markVal);
                const pct = !isNaN(num) && markVal !== '' ? Math.round((num / maxMarks) * 100) : 0;

                let grade = 'F';
                if (pct >= 90) grade = 'A+';
                else if (pct >= 80) grade = 'A';
                else if (pct >= 70) grade = 'B+';
                else if (pct >= 60) grade = 'B';
                else if (pct >= 50) grade = 'C';
                else if (pct >= 35) grade = 'D';

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
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
                          <p className="text-[10px] text-slate-400">{s.admissionNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="max-w-[140px]">
                        <input
                          type="number"
                          value={markVal}
                          onChange={(e) => handleMarksChange(s.id, e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold outline-none transition ${
                            error
                              ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-300 text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                          }`}
                        />
                        {error && (
                          <span className="block text-[10px] text-rose-600 font-bold mt-1">
                            {error}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {!error && markVal !== '' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                pct >= 35 ? 'bg-teal-600' : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="font-bold">{pct}%</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {!error && markVal !== '' ? (
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                            pct >= 35
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {grade}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action footer */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
          <button
            onClick={() => handleSave('Draft')}
            disabled={isSaving || hasErrors}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('Published')}
            disabled={isSaving || hasErrors}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs shadow-md transition active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Publish Examination Results</span>
          </button>
        </div>
      </Card>
    </div>
  );
};
