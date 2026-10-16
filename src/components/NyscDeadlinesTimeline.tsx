import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import {
  Calendar,
  Clock,
  Sparkles,
  Building,
  MapPin,
  ExternalLink,
  Send,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { JobOpportunity, ApplicationStatus } from '../types';

interface NyscDeadlinesTimelineProps {
  jobs: JobOpportunity[];
  onSelectJob: (job: JobOpportunity) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onSendToTelegram: (job: JobOpportunity) => void;
  onSendDigest: () => void;
  campDate?: string; // default '2026-11-04'
}

export const NyscDeadlinesTimeline: React.FC<NyscDeadlinesTimelineProps> = ({
  jobs,
  onSelectJob,
  onUpdateStatus,
  onSendToTelegram,
  onSendDigest,
  campDate = '2026-11-04',
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'to-apply' | 'urgent'>('all');

  // Filter jobs based on status
  const relevantJobs = jobs.filter((j) => {
    if (selectedFilter === 'to-apply') {
      return j.status === 'saved' || j.status === 'preparing' || j.status === 'new';
    }
    if (selectedFilter === 'urgent') {
      // Due before or around camp date
      return j.deadline <= '2026-11-15';
    }
    return true;
  });

  // Calculate days remaining to camp
  const targetCamp = new Date(campDate);
  const now = new Date('2026-10-13'); // local reference date
  const diffTime = Math.max(0, targetCamp.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Timeline breakdown by month / window
  const timelineBuckets = [
    { window: 'Late Oct (Pre-Camp)', count: 0, jobs: [] as JobOpportunity[] },
    { window: 'Early Nov (Camp Wk 1)', count: 0, jobs: [] as JobOpportunity[] },
    { window: 'Mid Nov (Camp Wk 2-3)', count: 0, jobs: [] as JobOpportunity[] },
    { window: 'Late Nov (PPA Post-Camp)', count: 0, jobs: [] as JobOpportunity[] },
    { window: 'Dec (Full Resumption)', count: 0, jobs: [] as JobOpportunity[] },
  ];

  jobs.forEach((j) => {
    const d = j.deadline;
    if (d <= '2026-10-31') {
      timelineBuckets[0].count++;
      timelineBuckets[0].jobs.push(j);
    } else if (d <= '2026-11-07') {
      timelineBuckets[1].count++;
      timelineBuckets[1].jobs.push(j);
    } else if (d <= '2026-11-18') {
      timelineBuckets[2].count++;
      timelineBuckets[2].jobs.push(j);
    } else if (d <= '2026-11-30') {
      timelineBuckets[3].count++;
      timelineBuckets[3].jobs.push(j);
    } else {
      timelineBuckets[4].count++;
      timelineBuckets[4].jobs.push(j);
    }
  });

  // Chart data
  const chartData = timelineBuckets.map((b) => ({
    name: b.window,
    openings: b.count,
  }));

  // Work type breakdown
  const workTypeData = [
    { type: 'Hybrid Lagos', count: jobs.filter((j) => j.workType === 'Hybrid').length },
    { type: 'Onsite Lagos', count: jobs.filter((j) => j.workType === 'Onsite').length },
    { type: '100% Remote', count: jobs.filter((j) => j.workType === 'Remote').length },
  ];

  return (
    <div className="space-y-6">
      {/* Camp Mobilization Countdown Hero */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 rounded-2xl p-4 sm:p-6 text-white border border-emerald-800/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 font-mono uppercase">
                NYSC Orientation Countdown
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                Lagos State Iyana-Ipaja Camp
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Reporting on the 4th of Next Month ({campDate})
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              You have <strong>{diffDays} days</strong> before entering orientation camp. Secure your corporate PPA Request Letters from companies like Flour Mills, KPMG, and Moniepoint now so you can present them at camp registration and bypass secondary school postings.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3 sm:p-4 rounded-xl text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest block font-medium">Days To Orientation Camp</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono block">
              {diffDays}
            </span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">Lagos Batch Mobilization</span>
          </div>
        </div>
      </div>

      {/* Deadlines Distribution Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Deadlines Timeline Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Lagos Job Deadlines Timeline by Placement Window</span>
              </h3>
              <p className="text-xs text-stone-500">
                Distribution of application closings relative to camp entry and PPA deployment
              </p>
            </div>
            <button
              onClick={onSendDigest}
              className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Send Deadlines to Phone</span>
            </button>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efe9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716c' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#78716c' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1917',
                    borderColor: '#292524',
                    borderRadius: '8px',
                    color: '#fafaf9',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Bar dataKey="openings" name="Job Openings" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Type Distribution Card */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Work Type Mix</span>
            </h3>
            <p className="text-xs text-stone-500">
              Lagos Commute vs Remote Flexibility
            </p>
          </div>

          <div className="space-y-3 py-2">
            {workTypeData.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-700">{item.type}</span>
                  <span className="font-mono font-bold text-stone-900">{item.count} roles</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-amber-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${(item.count / jobs.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-950">
            <strong>Strategic Tip:</strong> Hybrid VI/Ikoyi roles offer staff buses, allowing comfortable commutes from Mainland corridors.
          </div>
        </div>
      </div>

      {/* Filterable Chronological Deadlines List */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Chronological Placement Application Deadlines</span>
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Deadlines
            </button>
            <button
              onClick={() => setSelectedFilter('urgent')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFilter === 'urgent'
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Urgent (Pre-Camp)
            </button>
            <button
              onClick={() => setSelectedFilter('to-apply')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFilter === 'to-apply'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              To Apply / Saved Only
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {relevantJobs
            .sort((a, b) => a.deadline.localeCompare(b.deadline))
            .map((job) => {
              const isPreCamp = job.deadline <= campDate;
              return (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-400 bg-stone-50/50 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {job.deadline}
                      </span>
                      {isPreCamp && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          Due Before Camp Starts
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] bg-stone-200 text-stone-800">
                        {job.workType} · {job.location}
                      </span>
                    </div>

                    <h4
                      onClick={() => onSelectJob(job)}
                      className="font-bold text-stone-900 hover:text-emerald-700 cursor-pointer text-sm"
                    >
                      {job.title}
                    </h4>
                    <div className="text-stone-600 flex items-center gap-2 text-xs">
                      <span className="font-semibold text-stone-800">{job.company}</span>
                      <span>·</span>
                      <span className="font-mono text-emerald-700">{job.salaryStipend}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onSendToTelegram(job)}
                      className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Send job alert to phone"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-medium hover:bg-emerald-800 transition-colors cursor-pointer text-xs"
                    >
                      View PPA Kit
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
