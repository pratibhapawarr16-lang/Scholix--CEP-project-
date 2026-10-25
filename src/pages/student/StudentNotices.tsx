import React, { useState, useMemo } from 'react';
import { Bell, Search, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Notice, NoticeCategory } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentNotices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const state = dataService.getState();
  const allNotices = useMemo(() => {
    return dataService.getNotices();
  }, [state.notices]);

  const categories = ['All', 'Academic', 'Exam', 'Event', 'Holiday', 'General'];

  const filteredNotices = useMemo(() => {
    return allNotices.filter((n) => {
      const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allNotices, selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
          School Announcements & Circulars
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Official notices published by faculty and school administration.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search circulars by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((n) => {
            const isExpanded = expandedId === n.id;
            return (
              <div
                key={n.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(n.category)} dot>
                      {n.category}
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {n.date}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {n.authorName}
                  </span>
                </div>

                <div className="pt-3">
                  <h3 className="text-sm font-bold text-navy-900">{n.title}</h3>
                  <p
                    className={`text-xs text-slate-600 mt-2 leading-relaxed ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}
                  >
                    {n.description}
                  </p>

                  {n.description.length > 120 && (
                    <button
                      onClick={() => toggleExpand(n.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-800 mt-2"
                    >
                      <span>{isExpanded ? 'Show less' : 'Read full notice'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No Notices Match Your Filter"
          description="Try selecting a different category or clearing your search term."
        />
      )}
    </div>
  );
};
