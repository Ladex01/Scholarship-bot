import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';
import {
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Send,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { Scholarship, ApplicationStatus } from '../types';

interface DeadlinesTimelineVisualizerProps {
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onSendToTelegram: (scholarship: Scholarship) => void;
  onSendTimelineDigest: () => void;
}

export const DeadlinesTimelineVisualizer: React.FC<DeadlinesTimelineVisualizerProps> = ({
  scholarships,
  onSelectScholarship,
  onUpdateStatus,
  onSendToTelegram,
  onSendTimelineDigest,
}) => {
  const [filterMode, setFilterMode] = useState<'to_apply' | 'all'>('to_apply');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Reference base date is late 2026 (Oct 2026)
  // Define 6 months window: Oct 2026, Nov 2026, Dec 2026, Jan 2027, Feb 2027, Mar 2027
  const monthLabels = [
    { key: '2026-10', label: 'Oct 2026', title: 'October 2026' },
    { key: '2026-11', label: 'Nov 2026', title: 'November 2026' },
    { key: '2026-12', label: 'Dec 2026', title: 'December 2026' },
    { key: '2027-01', label: 'Jan 2027', title: 'January 2027' },
    { key: '2027-02', label: 'Feb 2027', title: 'February 2027' },
    { key: '2027-03', label: 'Mar 2027', title: 'March 2027' },
    { key: 'later', label: 'Apr-Jul 2027', title: 'Late Intake (Apr - Jul 2027)' },
  ];

  // Filter pool
  const candidatePool = scholarships.filter((s) => {
    if (s.status === 'skipped') return false;
    if (filterMode === 'to_apply') {
      return s.status === 'saved' || s.status === 'preparing' || s.status === 'new';
    }
    return true;
  });

  // Calculate days left relative to current date
  const getDaysLeft = (deadlineStr: string) => {
    try {
      const deadline = new Date(deadlineStr);
      const today = new Date();
      const diffTime = deadline.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 999;
    }
  };

  // Group by month
  const chartData = monthLabels.map((m) => {
    const matching = candidatePool.filter((s) => {
      if (!s.deadline) return false;
      if (m.key === 'later') {
        const ym = s.deadline.substring(0, 7);
        return ym >= '2027-04' || ym <= '2026-09';
      }
      return s.deadline.startsWith(m.key);
    });

    const northAmericaCount = matching.filter((s) => s.region === 'North America').length;
    const europeCount = matching.filter((s) => s.region === 'Europe' || s.region === 'UK').length;

    return {
      monthKey: m.key,
      month: m.label,
      fullTitle: m.title,
      total: matching.length,
      northAmerica: northAmericaCount,
      europe: europeCount,
      scholarships: matching,
    };
  });

  // Items for the selected month or all sorted chronologically
  const activeMonthData = selectedMonth
    ? chartData.find((d) => d.monthKey === selectedMonth)
    : null;

  const chronologicallySorted = [...candidatePool]
    .filter((s) => s.deadline)
    .sort((a, b) => (a.deadline > b.deadline ? 1 : -1));

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-stone-900 text-stone-100 p-3 rounded-xl shadow-xl border border-stone-700 text-xs max-w-xs font-sans">
          <div className="font-bold text-amber-400 mb-1 flex items-center justify-between">
            <span>{data.fullTitle}</span>
            <span className="font-mono bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-white">
              {data.total} Deadlines
            </span>
          </div>

          <div className="space-y-1 text-stone-300 text-[11px] mb-2">
            <div>• Europe & UK: <strong className="text-white">{data.europe}</strong> scholarships</div>
            <div>• North America: <strong className="text-white">{data.northAmerica}</strong> scholarships</div>
          </div>

          <div className="border-t border-stone-800 pt-1.5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold">Closing Programs:</span>
            {data.scholarships.slice(0, 3).map((s: Scholarship) => (
              <div key={s.id} className="text-[11px] text-stone-200 truncate">
                • {s.title} ({s.country})
              </div>
            ))}
            {data.scholarships.length > 3 && (
              <div className="text-[10px] text-stone-400 italic">
                + {data.scholarships.length - 3} more programs
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-800 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-700" />
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                Application Deadlines Timeline (Next 6 Months)
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Distribution of application deadlines for fully funded Master&apos;s programs in North America and Europe.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Toggle: To Apply vs All */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
              <button
                onClick={() => setFilterMode('to_apply')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  filterMode === 'to_apply'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                &apos;To Apply&apos; Pipeline ({candidatePool.length})
              </button>
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Opportunities ({scholarships.length})
              </button>
            </div>

            {/* Telegram Timeline Digest Push */}
            <button
              onClick={onSendTimelineDigest}
              className="px-3 py-1.5 text-xs font-medium bg-sky-50 text-sky-800 border border-sky-300 rounded-lg hover:bg-sky-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Send Timeline to Phone</span>
            </button>
          </div>
        </div>

        {/* Recharts Timeline Visualizer Chart */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
            <span className="font-medium text-stone-800">
              Monthly Deadline Density (Click any bar to filter programs):
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-700 inline-block" />
                <span>Europe & UK Programs</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                <span>North America (Canada / USA)</span>
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const key = e.activePayload[0].payload.monthKey;
                    setSelectedMonth(selectedMonth === key ? null : key);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#78716c' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d6d3d1' }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#78716c' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d6d3d1' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="europe"
                  name="Europe & UK"
                  stackId="a"
                  fill="#78350f"
                  radius={[0, 0, 0, 0]}
                  cursor="pointer"
                />
                <Bar
                  dataKey="northAmerica"
                  name="North America"
                  stackId="a"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Month Filter Reset */}
          {selectedMonth && (
            <div className="mt-2 flex items-center justify-between text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
              <span className="font-medium">
                Filtering by: <strong>{activeMonthData?.fullTitle}</strong> ({activeMonthData?.total} scholarships)
              </span>
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-[11px] underline font-bold cursor-pointer hover:text-amber-950"
              >
                Show All 6 Months
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chronological Milestone Sequence */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Chronological Deadline Timeline Sequence
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Next deadlines arranged in strict chronological order with urgency countdowns.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            {chronologicallySorted.length} Program Milestones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(activeMonthData ? activeMonthData.scholarships : chronologicallySorted).map((s) => {
            const daysLeft = getDaysLeft(s.deadline);
            const isUrgent = daysLeft <= 30 && daysLeft > 0;
            const isVeryUrgent = daysLeft <= 14 && daysLeft > 0;

            return (
              <div
                key={s.id}
                className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between hover:shadow-xs ${
                  isVeryUrgent
                    ? 'border-red-300 bg-red-50/20'
                    : isUrgent
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span className="font-semibold text-stone-700 truncate">{s.country}</span>
                    <span
                      className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        isVeryUrgent
                          ? 'bg-red-100 text-red-800'
                          : isUrgent
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {daysLeft <= 0 ? 'Passed' : `${daysLeft}d left`}
                    </span>
                  </div>

                  <h4 className="font-semibold text-stone-900 line-clamp-2 leading-tight">
                    {s.title}
                  </h4>

                  <div className="text-[11px] text-stone-500">
                    {s.universityOrFunder}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-mono text-emerald-800 font-medium">{s.monthlyStipend}</span>
                    <span className="font-mono text-stone-600 font-semibold">{s.deadline}</span>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-1">
                    <button
                      onClick={() => onSelectScholarship(s)}
                      className="px-2.5 py-1 text-[11px] font-medium bg-stone-900 text-white rounded hover:bg-stone-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Checklist</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onSendToTelegram(s)}
                      title="Send deadline alert to phone"
                      className="p-1 rounded text-sky-700 hover:bg-sky-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
