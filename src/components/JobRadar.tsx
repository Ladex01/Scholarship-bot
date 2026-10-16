import React, { useState } from 'react';
import {
  Search,
  Building,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Send,
  Briefcase,
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { JobOpportunity, JobWorkType, JobCategory, ApplicationStatus } from '../types';

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
  const [selectedLocationCorridor, setSelectedLocationCorridor] = useState<'all' | 'mainland' | 'island' | 'remote_usd'>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter jobs
  const filteredJobs = jobs.filter((j) => {
    // Search query
    const textToMatch = `${j.title} ${j.company} ${j.location} ${j.category} ${j.whyAdefolabiFits} ${j.source} ${j.notes}`.toLowerCase();
    if (searchQuery && !textToMatch.includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Location corridor filter
    if (selectedLocationCorridor === 'mainland') {
      const isMainland = /mainland|ikeja|yaba|maryland|ilupeju|surulere|isolo|alausa|oregun|apapa|ogba/i.test(j.location);
      if (!isMainland) return false;
    } else if (selectedLocationCorridor === 'island') {
      const isIsland = /victoria island|ikoyi|lekki|\bvi\b|falomo|landmark|ozumba|marina/i.test(j.location);
      if (!isIsland) return false;
    } else if (selectedLocationCorridor === 'remote_usd') {
      const isRemoteUsd = j.salaryStipend.includes('$') || j.jobType === 'Remote Contractor' || /remote/i.test(j.workType);
      if (!isRemoteUsd) return false;
    }

    // Work type
    if (selectedWorkType !== 'all' && j.workType !== selectedWorkType) {
      return false;
    }

    // Category
    if (selectedCategory !== 'all' && j.category !== selectedCategory) {
      return false;
    }

    // Status
    if (selectedStatus !== 'all' && j.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const mainlandCount = jobs.filter((j) =>
    /mainland|ikeja|yaba|maryland|ilupeju|surulere|isolo|alausa|oregun|apapa|ogba/i.test(j.location)
  ).length;

  const remoteUsdCount = jobs.filter((j) =>
    j.salaryStipend.includes('$') || j.jobType === 'Remote Contractor' || /remote/i.test(j.workType)
  ).length;

  const islandCount = jobs.filter((j) =>
    /victoria island|ikoyi|lekki|\bvi\b|falomo|landmark|ozumba|marina/i.test(j.location)
  ).length;

  return (
    <div className="space-y-5">
      {/* Refined Executive Placement Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
              NYSC Mobilization: Nov 4th
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600 text-xs">
              Lagos State PPA & Remote US Contracts
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500 text-xs">
              Min ₦70,000/mo Stipend Threshold
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
            Lagos Corporate NYSC & Global Remote Placement Radar
          </h2>
          <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
            Curated from Jobberman, Indeed Nigeria, Glassdoor, Twitter/X alerts, and corporate portals. Optimized for your <strong>B.Sc. Political Science Education (3.57/5.0)</strong> and <strong>1-year US Federal Bidding at Kadaj Alliance LLC</strong>.
          </p>
        </div>

        <button
          onClick={onOpenDiagnostic}
          className="self-start md:self-center px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Refine Criteria</span>
        </button>
      </div>

      {/* Control Bar: Clean Search & Segmented Corridor Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3.5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company (e.g. Flour Mills, Moniepoint, PZ Cussons, Julius Berger), or area (Ikeja, Yaba, VI)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Clean Segmented Corridor Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-stone-500 mr-1">Zone:</span>
            <button
              onClick={() => setSelectedLocationCorridor('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                selectedLocationCorridor === 'all'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              All Roles ({jobs.length})
            </button>
            <button
              onClick={() => setSelectedLocationCorridor('mainland')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                selectedLocationCorridor === 'mainland'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              Mainland ₦70k+ ({mainlandCount})
            </button>
            <button
              onClick={() => setSelectedLocationCorridor('remote_usd')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                selectedLocationCorridor === 'remote_usd'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
              }`}
            >
              Remote US ($USD) ({remoteUsdCount})
            </button>
            <button
              onClick={() => setSelectedLocationCorridor('island')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                selectedLocationCorridor === 'island'
                  ? 'bg-blue-800 text-white font-semibold'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200'
              }`}
            >
              Island ({islandCount})
            </button>
          </div>

          {/* Live Direct External Search Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-medium text-slate-500 mr-1">Live Engines:</span>
            <a
              href="https://ng.indeed.com/jobs?q=NYSC+OR+%22Graduate+Trainee%22+OR+Procurement&l=Lagos&fromage=7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
            >
              <span>Indeed (Past 7 Days)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://www.jobberman.com/jobs?q=graduate+trainee&location=lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
            >
              <span>Jobberman Lagos</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://www.linkedin.com/jobs/search/?keywords=NYSC%20Lagos&location=Lagos%2C%20Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
            >
              <span>LinkedIn NYSC</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Compact Dropdown Filters */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-xs focus:outline-none"
            >
              <option value="all">All Work Types</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-xs focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Procurement & Bidding">Procurement & Bidding</option>
              <option value="Operations & SCM">Operations & SCM</option>
              <option value="Public Policy & Diplomacy">Public Policy & Diplomacy</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-xs focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="saved">To Apply</option>
              <option value="applied">Applied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clean Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isSaved = job.status === 'saved' || job.status === 'preparing';
          const isApplied = job.status === 'applied' || job.status === 'interview';
          const isSkipped = job.status === 'skipped';

          return (
            <div
              key={job.id}
              className={`bg-white rounded-xl border transition-all duration-150 flex flex-col justify-between shadow-xs hover:border-stone-400 ${
                isSkipped
                  ? 'border-stone-200 opacity-60 bg-stone-50/50'
                  : isApplied
                  ? 'border-emerald-300 ring-1 ring-emerald-500/10'
                  : isSaved
                  ? 'border-amber-300 ring-1 ring-amber-500/10'
                  : 'border-stone-200'
              }`}
            >
              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Header: Title & Company first, clean unboxed metadata */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      onClick={() => onSelectJob(job)}
                      className="text-base font-bold text-stone-900 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                    >
                      {job.title}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {job.relevanceScore}% Fit
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-1">
                    <span className="font-semibold text-stone-900">{job.company}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500">{job.location}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500">{job.workType}</span>
                  </div>
                </div>

                {/* Quiet Metadata Row without Pill Enclosures */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-500 py-1 border-y border-stone-100">
                  <span className="font-medium text-stone-900">{job.salaryStipend}</span>
                  <span className="text-stone-300">·</span>
                  <span>Deadline: <strong className="text-stone-700 font-medium">{job.deadline}</strong></span>
                  <span className="text-stone-300">·</span>
                  <span>Source: {job.source}</span>
                  {job.nyscPpaFriendly && (
                    <>
                      <span className="text-stone-300">·</span>
                      <span className="text-emerald-700 font-medium">NYSC PPA Ready</span>
                    </>
                  )}
                </div>

                {/* Role Duties & Requirements Preview */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-800 block">Key Responsibilities:</span>
                  <ul className="text-[11px] text-slate-600 space-y-1 pl-1">
                    {(job.responsibilities?.slice(0, 2) || job.requirements.slice(0, 2)).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1 shrink-0" />
                        <span className="line-clamp-1">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 sm:px-5 py-2.5 bg-stone-50/70 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* Pipeline Status Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateStatus(job.id, isSaved ? 'new' : 'saved')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      isSaved
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>{isSaved ? 'In Pipeline' : 'To Apply'}</span>
                  </button>

                  <button
                    onClick={() => onUpdateStatus(job.id, isApplied ? 'new' : 'applied')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      isApplied
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isApplied ? 'Applied' : 'Mark Applied'}</span>
                  </button>
                </div>

                {/* Right actions: Telegram & Details */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSendToTelegram(job)}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-sky-700 hover:border-sky-300 transition-colors cursor-pointer"
                    title="Send alert to your iPhone via Telegram"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                  </button>

                  <button
                    onClick={() => onSelectJob(job)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>View Job Posting</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center space-y-2">
          <p className="text-stone-700 font-medium text-sm">No opportunities match the selected filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLocationCorridor('all');
              setSelectedWorkType('all');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="text-xs text-emerald-700 font-semibold hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
