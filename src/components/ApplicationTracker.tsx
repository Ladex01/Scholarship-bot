import React, { useState } from 'react';
import {
  Bookmark,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Building
} from 'lucide-react';
import { Scholarship, ApplicationStatus } from '../types';

interface ApplicationTrackerProps {
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onToggleChecklist: (scholarshipId: string, itemId: string) => void;
  onSendToTelegram: (scholarship: Scholarship) => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  scholarships,
  onSelectScholarship,
  onUpdateStatus,
  onToggleChecklist,
  onSendToTelegram,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string>('all');

  const tracked = scholarships.filter((s) => s.status !== 'new');

  const columns: { id: ApplicationStatus | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Tracked', count: tracked.length },
    { id: 'saved', label: 'Saved / Shortlist', count: tracked.filter((s) => s.status === 'saved').length },
    { id: 'preparing', label: 'Drafting Docs', count: tracked.filter((s) => s.status === 'preparing').length },
    { id: 'applied', label: 'Submitted / Applied', count: tracked.filter((s) => s.status === 'applied').length },
    { id: 'under_review', label: 'Under Review', count: tracked.filter((s) => s.status === 'under_review').length },
    { id: 'skipped', label: 'Skipped / Archived', count: tracked.filter((s) => s.status === 'skipped').length },
  ];

  const filteredItems = tracked.filter((s) => {
    if (selectedColumn === 'all') return true;
    return s.status === selectedColumn;
  });

  const getDaysLeft = (deadlineStr: string) => {
    try {
      const deadline = new Date(deadlineStr);
      const today = new Date();
      const diffTime = deadline.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tracker Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Application Pipeline & Deadline Tracker
            </h2>
            <p className="text-xs text-stone-500">
              Manage your document readiness, track critical deadlines, and advance application stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
              {tracked.filter((s) => s.status === 'applied').length} Applied · {tracked.filter((s) => s.status === 'saved' || s.status === 'preparing').length} In Progress
            </span>
          </div>
        </div>

        {/* Stage Filter Tabs */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
          {columns.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedColumn(col.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedColumn === col.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>{col.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  selectedColumn === col.id ? 'bg-stone-800 text-amber-300' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {col.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {filteredItems.map((s) => {
          const daysLeft = getDaysLeft(s.deadline);
          const completedCount = s.checklist.filter((c) => c.completed).length;
          const totalCount = s.checklist.length;
          const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div
              key={s.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4"
            >
              {/* Item Top Line */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-800">{s.universityOrFunder}</span>
                    <span>·</span>
                    <span>{s.country}</span>
                    <span>·</span>
                    <span>Intake: {s.intake}</span>
                  </div>

                  <h3 className="text-base font-semibold text-stone-900">
                    {s.title}
                  </h3>
                </div>

                {/* Status Switcher & Deadline */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                  <select
                    value={s.status}
                    onChange={(e) => onUpdateStatus(s.id, e.target.value as ApplicationStatus)}
                    aria-label="Application status"
                    className="text-xs font-medium rounded-lg px-2.5 py-1.5 border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    <option value="saved">📌 Shortlisted / Saved</option>
                    <option value="preparing">📝 Drafting Documents</option>
                    <option value="applied">🚀 Application Submitted</option>
                    <option value="under_review">⏳ Under Review / Interview</option>
                    <option value="admitted">🏆 Admitted / Awarded</option>
                    <option value="skipped">🚫 Skip / Archive</option>
                  </select>

                  {daysLeft !== null && (
                    <div className="text-xs font-mono font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span className={daysLeft <= 14 ? 'text-red-700 font-bold' : 'text-stone-700'}>
                        {daysLeft <= 0 ? 'Deadline Passed' : `${daysLeft} days remaining (${s.deadline})`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Preparation Checklist */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>Application Document Readiness Checklist:</span>
                  </div>
                  <span className="font-mono text-stone-500 text-[11px]">
                    {completedCount} of {totalCount} ready ({progressPercent}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Checklist items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {s.checklist.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2 text-xs text-stone-700 hover:text-stone-900 cursor-pointer bg-white p-2 rounded border border-stone-200/60"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleChecklist(s.id, item.id)}
                        className="mt-0.5 rounded text-stone-900 focus:ring-stone-400"
                      />
                      <span className={item.completed ? 'line-through text-stone-400' : 'text-stone-800'}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectScholarship(s)}
                    className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Strategic Pitch</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs font-medium border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 flex items-center gap-1.5"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>

                  <button
                    onClick={() => onSendToTelegram(s)}
                    className="px-3 py-1.5 text-xs font-medium border border-sky-200 text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-sky-600" />
                    <span>Send Reminder to Phone</span>
                  </button>
                </div>

                <div className="text-xs text-stone-500">
                  {s.fundingType} · {s.monthlyStipend}
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-10 text-center text-stone-500 space-y-3">
            <Bookmark className="w-8 h-8 text-stone-400 mx-auto" />
            <div className="font-semibold text-stone-800">No applications in this category yet</div>
            <p className="text-xs max-w-sm mx-auto">
              Browse the Scholarship Radar tab and click &quot;Save&quot; on opportunities you wish to pursue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
