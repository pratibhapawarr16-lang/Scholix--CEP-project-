import React, { useState, useMemo } from 'react';
import { Bell, Send, Trash2, Calendar, User, AlertCircle, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { Notice, NoticeCategory, Faculty } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const FacultyNotices: React.FC = () => {
  const { profile } = useAuth();
  const faculty = profile as Faculty;
  const { toast } = useToast();
  const state = dataService.getState();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Event');
  const [isPublishing, setIsPublishing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const notices = useMemo(() => {
    return dataService.getNotices();
  }, [state.notices]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (title.trim().length < 3 || title.trim().length > 100) {
      setFormError('Notice title must be between 3 and 100 characters.');
      return;
    }

    if (description.trim().length < 10) {
      setFormError('Notice description must be at least 10 characters.');
      return;
    }

    setIsPublishing(true);
    try {
      await dataService.createNotice(
        title,
        description,
        category,
        faculty?.id || 'fac-01',
        faculty?.name || 'Faculty Member'
      );
      toast.success(`Notice "${title}" published school-wide!`);
      setTitle('');
      setDescription('');
      setCategory('Event');
    } catch (err: any) {
      setFormError(err.message || 'Failed to publish notice.');
    } finally {
      setIsPublishing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    await dataService.deleteNotice(deleteTargetId);
    toast.info('Notice removed from broadcast list.');
    setDeleteTargetId(null);
  };

  const getBadgeVariant = (cat: NoticeCategory) => {
    switch (cat) {
      case 'Exam':
        return 'danger';
      case 'Holiday':
        return 'warning';
      case 'Event':
        return 'info';
      case 'Academic':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-navy-900 tracking-tight">
          Notice Board Management
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Broadcast academic announcements, exam alerts, and event circulars to all students.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Notice Form (1 col) */}
        <div className="lg:col-span-1">
          <Card title="Publish New Notice" subtitle="Broadcast announcement to all grades">
            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Notice Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 bg-white outline-none focus:border-teal-500"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam</option>
                  <option value="Event">Event</option>
                  <option value="Holiday">Holiday</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Notice Title
                  </label>
                  <span className="text-[10px] text-slate-400">3-100 characters</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Annual Sports Day on Friday"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Description
                  </label>
                  <span className="text-[10px] text-slate-400">Min 10 characters</span>
                </div>
                <textarea
                  placeholder="Provide comprehensive instructions, timings, venue, or participation details..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPublishing}
                className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4 text-teal-400" />
                <span>{isPublishing ? 'Publishing...' : 'Publish Notice School-Wide'}</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Existing Notices List (2 cols) */}
        <div className="lg:col-span-2">
          <Card
            title="Published Notice Circulars"
            subtitle="All active notices visible to high school students"
          >
            <div className="space-y-3 pt-2">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-surface/40 hover:bg-white hover:shadow-subtle transition-all"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(n.category)} dot>
                        {n.category}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {n.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {n.authorName}
                      </span>
                      <button
                        onClick={() => setDeleteTargetId(n.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title="Delete notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-navy-900">{n.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        title="Delete Published Notice"
        message="Are you sure you want to remove this notice? It will immediately disappear from all student portals and dashboards."
        confirmLabel="Yes, Delete Notice"
        variant="danger"
      />
    </div>
  );
};
