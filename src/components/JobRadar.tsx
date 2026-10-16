import React, { useState } from 'react';
import {
  Search,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Send,
  Briefcase,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { JobOpportunity, ApplicationStatus } from '../types';

interface JobRadarProps {
  jobs: JobOpportunity[];
  onSelectJob: (job: JobOpportunity) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onSendToTelegram: (job: JobOpportunity) => void;
  onFeedback: (job: JobOpportunity, sentiment: 'liked' | 'disliked', reason?: string) => void;
  telegramReady: boolean;
  onOpenDiagnostic: () => void;
}

export const JobRadar: React.FC<JobRadarProps> = ({
  jobs,
  onSelectJob,
  onUpdateStatus,
  onSendToTelegram,
  onFeedback,
  telegramReady,
  onOpenDiagnostic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nysc_lagos' | 'us_remote'>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [hideExpired, setHideExpired] = useState<boolean>(true);

  // Today timestamp for filtering expired positions
  const todayTimestamp = new Date().setHours(0, 0, 0, 0);

  // Filter jobs
  const filteredJobs = jobs.filter((j) => {
    // 1. Expiration Filter
    if (hideExpired && j.deadline) {
      const deadlineDate = new Date(j.deadline).getTime();
      if (!isNaN(deadlineDate) && deadlineDate < todayTimestamp) {
        return false;
      }
    }

    // 2. Search query
    const textToMatch = `${j.title} ${j.company} ${j.location} ${j.category} ${j.source} ${j.notes}`.toLowerCase();
    if (searchQuery && !textToMatch.includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 3. Category Filter: NYSC Lagos vs US Remote (No mainland/island division)
    const isUsRemote = j.salaryStipend.includes('$') || j.jobType === 'Remote Contractor' || /remote/i.test(j.workType) || /us /i.test(j.title);
    const isLagosNysc = /lagos/i.test(j.location) || j.nyscPpaFriendly || j.jobType === 'NYSC PPA' || !isUsRemote;

    if (selectedCategory === 'nysc_lagos' && !isLagosNysc) {
      return false;
    }
    if (selectedCategory === 'us_remote' && !isUsRemote) {
      return false;
    }

    // 4. Work type filter (Onsite vs Hybrid vs Remote)
    if (selectedWorkType !== 'all' && j.workType !== selectedWorkType) {
      return false;
    }

    // 5. Application Pipeline status
    if (selectedStatus !== 'all' && j.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const nyscLagosCount = jobs.filter((j) => {
    const isUsRemote = j.salaryStipend.includes('$') || j.jobType === 'Remote Contractor' || /remote/i.test(j.workType) || /us /i.test(j.title);
    return (/lagos/i.test(j.location) || j.nyscPpaFriendly || j.jobType === 'NYSC PPA') && !isUsRemote;
  }).length;

  const usRemoteCount = jobs.filter((j) =>
    j.salaryStipend.includes('$') || j.jobType === 'Remote Contractor' || /remote/i.test(j.workType) || /us /i.test(j.title)
  ).length;

  return (
    <div className="space-y-4">
      {/* Placement Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Placements · Active This Cycle
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 text-xs font-medium">
              NYSC Lagos Placements & US Remote USD Contracts
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            Lagos NYSC & US Remote Placement Directory
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            All positions categorized strictly by <strong>NYSC Lagos Opportunities</strong> and <strong>US Remote Contracts</strong>. Expired listings are automatically filtered out.
          </p>
        </div>

        {/* Live Search Shortcut Engines */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://ng.indeed.com/jobs?q=NYSC+OR+%22Graduate+Trainee%22+OR+Procurement&l=Lagos&fromage=7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Indeed Lagos (Past 7 Days)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.jobberman.com/jobs?q=graduate+trainee&location=lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Jobberman Live</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Control Bar: Categories & Work-Type Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified company, role (e.g. Seven-Up, Cadbury, Moniepoint, Proposal Specialist)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Segmented Category Buttons: NYSC Lagos vs US Remote */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Opportunities ({jobs.length})
            </button>
            <button
              onClick={() => setSelectedCategory('nysc_lagos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedCategory === 'nysc_lagos'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
              }`}
            >
              <span>🇳🇬 NYSC Lagos Opportunities</span>
              <span className="opacity-80">({nyscLagosCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('us_remote')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedCategory === 'us_remote'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200'
              }`}
            >
              <span>🇺🇸 US Remote Contracts ($USD)</span>
              <span className="opacity-80">({usRemoteCount})</span>
            </button>
          </div>

          {/* Work-Type Dropdown & Expired Toggle */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">All Work Types</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="saved">Saved (To Apply)</option>
              <option value="applied">Applied</option>
            </select>

            <label className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-slate-600 cursor-pointer pl-1">
              <input
                type="checkbox"
                checked={hideExpired}
                onChange={(e) => setHideExpired(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span>Hide Expired</span>
            </label>
          </div>
        </div>
      </div>

      {/* Clean Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isSaved = job.status === 'saved' || job.status === 'preparing';
          const isApplied = job.status === 'applied' || job.status === 'interview';

          return (
            <div
              key={job.id}
              className={`bg-white rounded-2xl border transition-all duration-150 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-md ${
                isApplied
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : isSaved
                  ? 'border-sky-300 bg-sky-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Body */}
              <div className="p-5 space-y-3">
                {/* Header: Title & Category Badge */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      onClick={() => onSelectJob(job)}
                      className="text-base font-bold text-slate-900 hover:text-sky-600 cursor-pointer transition-colors leading-snug"
                    >
                      {job.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 shrink-0">
                      {job.workType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                    <span className="font-semibold text-slate-900">{job.company}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{job.location}</span>
                  </div>
                </div>

                {/* Salary & Deadlines Strip */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 py-1.5 border-y border-slate-100">
                  <span className="font-bold text-emerald-700">{job.salaryStipend}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">
                    Deadline: <strong className="text-slate-800 font-semibold">{job.deadline || 'Ongoing'}</strong>
                  </span>
                  {job.nyscPpaFriendly && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-sky-700 font-semibold">NYSC PPA Ready</span>
                    </>
                  )}
                </div>

                {/* Role Responsibilities Preview (Indeed Style) */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                    Key Role Responsibilities:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    {(job.responsibilities?.slice(0, 2) || job.requirements?.slice(0, 2) || []).map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* Pipeline Status Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateStatus(job.id, isSaved ? 'new' : 'saved')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                      isSaved
                        ? 'bg-sky-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>{isSaved ? 'In Pipeline' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => onUpdateStatus(job.id, isApplied ? 'new' : 'applied')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isApplied ? 'Applied' : 'Mark Applied'}</span>
                  </button>
                </div>

                {/* Right Action: View Full Details */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSendToTelegram(job)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-colors cursor-pointer"
                    title="Send alert to your iPhone via Telegram"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                  </button>

                  <button
                    onClick={() => onSelectJob(job)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900 text-sm">No Active Listings in This Category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, switching between NYSC Lagos and US Remote, or unchecking &quot;Hide Expired&quot;.
          </p>
        </div>
      )}
    </div>
  );
};
