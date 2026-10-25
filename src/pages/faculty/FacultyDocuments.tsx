import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Send,
  XCircle,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { DocumentRequest, DocumentRequestStatus, Faculty } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';

export const FacultyDocuments: React.FC = () => {
  const { profile } = useAuth();
  const faculty = profile as Faculty;
  const { toast } = useToast();
  const state = dataService.getState();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected request for modal review
  const [reviewRequest, setReviewRequest] = useState<DocumentRequest | null>(null);
  const [modalStatus, setModalStatus] = useState<DocumentRequestStatus>('Approved');
  const [modalRemark, setModalRemark] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const allRequests = useMemo(() => {
    return dataService.getDocumentRequests();
  }, [state.documentRequests]);

  const filteredRequests = useMemo(() => {
    return allRequests.filter((r) => {
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesSearch =
        (r.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allRequests, statusFilter, searchQuery]);

  const openReviewModal = (req: DocumentRequest) => {
    setReviewRequest(req);
    // If pending, default suggestion to Approved
    setModalStatus(req.status === 'Pending' ? 'Approved' : req.status);
    setModalRemark(req.remark || (req.status === 'Pending' ? 'Verified academic credentials and attendance record.' : ''));
    setModalError(null);
  };

  const handleUpdate = async () => {
    if (!reviewRequest) return;
    setModalError(null);

    if (modalStatus === 'Rejected' && (!modalRemark || modalRemark.trim().length === 0)) {
      setModalError('A remark is strictly mandatory when rejecting a document request.');
      return;
    }

    setIsUpdating(true);
    await dataService.updateDocumentRequest(
      reviewRequest.id,
      modalStatus,
      modalRemark,
      faculty?.name || 'Faculty Head'
    );
    setIsUpdating(false);

    toast.success(`Request ${reviewRequest.id} has been updated to "${modalStatus}"!`);
    setReviewRequest(null);
  };

  const getStatusBadgeVariant = (status: DocumentRequestStatus) => {
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
          Document Request Verification
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review, approve, reject, or mark student certificate applications ready for collection.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Pending', 'Approved', 'Ready for Collection', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Requests Table */}
      <Card title="Student Certificate Applications" subtitle="Real-time administrative verification queue">
        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Req ID</th>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Certificate Type</th>
                  <th className="py-3 px-4">Application Purpose</th>
                  <th className="py-3 px-4">Date Filed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900">
                      {req.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-navy-900">{req.studentName}</p>
                      <p className="text-[10px] text-slate-400">{req.className} • Roll {req.studentRollNo}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {req.type}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-1">{req.purpose}</p>
                      {req.remark && (
                        <p className="text-[10px] text-teal-700 font-semibold mt-0.5">
                          Remark: "{req.remark}"
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{req.dateRequested}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getStatusBadgeVariant(req.status)} dot>
                        {req.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openReviewModal(req)}
                        className="px-3.5 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-2xs transition"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No Matching Requests"
            description="There are no document requests matching your active filter criteria."
          />
        )}
      </Card>

      {/* Review Modal */}
      {reviewRequest && (
        <Modal
          isOpen={!!reviewRequest}
          onClose={() => setReviewRequest(null)}
          title={`Review Application: ${reviewRequest.id}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            {/* Student & Request Details Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Student Name:</span>
                <span className="font-bold text-navy-900">{reviewRequest.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Class & Section:</span>
                <span className="font-bold text-navy-900">{reviewRequest.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Requested Document:</span>
                <span className="font-bold text-teal-700">{reviewRequest.type} ({reviewRequest.copies} {reviewRequest.copies > 1 ? 'copies' : 'copy'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Date Filed:</span>
                <span className="font-bold text-navy-900">{reviewRequest.dateRequested}</span>
              </div>
              <div className="pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium block mb-0.5">Application Purpose:</span>
                <p className="text-slate-700 italic">"{reviewRequest.purpose}"</p>
              </div>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold">{modalError}</span>
              </div>
            )}

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Update Status
              </label>
              <select
                value={modalStatus}
                onChange={(e) => setModalStatus(e.target.value as DocumentRequestStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 bg-white outline-none focus:border-teal-500"
              >
                <option value="Pending">Pending (Under Review)</option>
                <option value="Approved">Approved (In Processing)</option>
                <option value="Ready for Collection">Ready for Collection (At Front Office)</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Remark field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Faculty Reviewer Remark
                </label>
                {modalStatus === 'Rejected' && (
                  <span className="text-[10px] text-rose-600 font-bold">* Strictly Required</span>
                )}
              </div>
              <textarea
                placeholder={
                  modalStatus === 'Rejected'
                    ? 'State the reason for rejection (required)...'
                    : 'Add instructions for collection or remarks for the student...'
                }
                value={modalRemark}
                onChange={(e) => setModalRemark(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReviewRequest(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition active:scale-95"
              >
                {isUpdating ? 'Saving...' : 'Update Application Status'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
