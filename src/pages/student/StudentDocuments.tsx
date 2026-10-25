import React, { useState, useMemo } from 'react';
import { FileText, Send, CheckCircle2, Clock, AlertCircle, FileCheck, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { Student, DocumentType } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentDocuments: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const { toast } = useToast();
  const state = dataService.getState();

  const [docType, setDocType] = useState<DocumentType>('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [copies, setCopies] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const documentTypes: DocumentType[] = [
    'Bonafide Certificate',
    'Scholarship Document',
    'Transfer Certificate',
    'Character Certificate',
    'Fee Certificate',
  ];

  const myRequests = useMemo(() => {
    if (!student) return [];
    return dataService.getDocumentRequests(student.id);
  }, [student, state.documentRequests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!student) return;

    if (!purpose.trim() || purpose.trim().length < 10) {
      setFormError('Please enter a specific purpose of at least 10 characters.');
      return;
    }

    // Check duplicate pending request of the same type
    const hasDuplicate = myRequests.some(
      (r) => r.type === docType && r.status === 'Pending'
    );
    if (hasDuplicate) {
      setFormError(`You already have a Pending request for a ${docType}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await dataService.submitDocumentRequest(student.id, docType, purpose, copies);
      toast.success(`Your request for ${docType} has been submitted with status 'Pending'!`);
      setPurpose('');
      setCopies(1);
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit document request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Ready for Collection':
        return 'info';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-navy-900 tracking-tight">
          Document & Certificate Requests
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Apply online for bonafide, character, scholarship, or fee certificates and track live administrative approval.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Request Form (1 col) */}
        <div className="lg:col-span-1">
          <Card
            title="Request New Document"
            subtitle="Submit an official administrative request"
          >
            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Document Certificate Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as DocumentType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white outline-none focus:border-teal-500"
                >
                  {documentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Number of Copies Required
                </label>
                <select
                  value={copies}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white outline-none focus:border-teal-500"
                >
                  <option value={1}>1 Original Copy</option>
                  <option value={2}>2 Copies</option>
                  <option value={3}>3 Copies</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Application Purpose
                  </label>
                  <span className="text-[10px] text-slate-400">Min 10 characters</span>
                </div>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Passport application address verification, bank education loan subsidy..."
                  rows={3}
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4 text-teal-400" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
              </button>
            </form>
          </Card>
        </div>

        {/* My Requests Table (2 cols) */}
        <div className="lg:col-span-2">
          <Card
            title="My Request History & Live Status"
            subtitle="Track approval milestones and faculty reviewer remarks"
          >
            {myRequests.length > 0 ? (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-3">Req ID</th>
                      <th className="py-3 px-3">Document Details</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Reviewer Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {myRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-3 font-mono font-bold text-navy-900 text-[11px]">
                          {req.id}
                        </td>
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-navy-900">{req.type}</p>
                          <p className="text-[11px] text-slate-600 line-clamp-1">{req.purpose}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Requested: {req.dateRequested} • {req.copies} {req.copies > 1 ? 'copies' : 'copy'}
                          </p>
                        </td>
                        <td className="py-3.5 px-3">
                          <Badge variant={getStatusBadgeVariant(req.status)} dot>
                            {req.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3">
                          {req.remark ? (
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700">
                              <p className="leading-relaxed">"{req.remark}"</p>
                              {req.updatedBy && (
                                <p className="text-[10px] text-teal-700 font-semibold mt-1">
                                  — {req.updatedBy}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">
                              Awaiting faculty review
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={FileText}
                title="No Document Requests Found"
                description="You have not submitted any certificate requests yet. Use the form on the left to apply."
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
