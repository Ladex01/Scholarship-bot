import React, { useState } from 'react';
import {
  Search,
  Filter,
  Send,
  Bookmark,
  CheckCircle2,
  Clock,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Building,
  Globe2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Scholarship, Region, ApplicationStatus } from '../types';

interface ScholarshipRadarProps {
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onSendToTelegram: (scholarship: Scholarship) => void;
  onFeedback: (scholarship: Scholarship, sentiment: 'liked' | 'disliked', reason?: string) => void;
  telegramReady: boolean;
}

export const ScholarshipRadar: React.FC<ScholarshipRadarProps> = ({
  scholarships,
  onSelectScholarship,
  onUpdateStatus,
  onSendToTelegram,
  onFeedback,
  telegramReady,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [filterSource, setFilterSource] = useState<'all' | 'scholarsregion'>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [expandedSpecId, setExpandedSpecId] = useState<string | null>(null);
  const [feedbackModalId, setFeedbackModalId] = useState<string | null>(null);
  const [feedbackSentiment, setFeedbackSentiment] = useState<'liked' | 'disliked'>('liked');
  const [feedbackReason, setFeedbackReason] = useState('');

  // Calculate days left
  const getDaysLeft = (deadlineStr: string) => {
    try {
      const deadline = new Date(deadlineStr);
      const today = new Date();
      const diffTime = deadline.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  };

  const scholarsRegionCount = scholarships.filter((s) => s.sourceHandle === '@scholarsregion').length;

  const filtered = scholarships.filter((s) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(query) ||
      s.universityOrFunder.toLowerCase().includes(query) ||
      s.country.toLowerCase().includes(query) ||
      s.targetFields.some((f) => f.toLowerCase().includes(query)) ||
      s.notes.toLowerCase().includes(query);

    const matchesRegion =
      selectedRegion === 'All' ||
      s.region === selectedRegion ||
      (selectedRegion === 'Europe' && (s.region === 'Europe' || s.region === 'UK'));

    const matchesStatus =
      selectedStatus === 'All' || s.status === selectedStatus;

    const matchesSource =
      filterSource === 'all' || s.sourceHandle === '@scholarsregion';

    const matchesScore = s.relevanceScore >= minScore;

    return matchesSearch && matchesRegion && matchesStatus && matchesScore && matchesSource;
  });

  const handleOpenFeedback = (scholarship: Scholarship, sentiment: 'liked' | 'disliked') => {
    setFeedbackModalId(scholarship.id);
    setFeedbackSentiment(sentiment);
    setFeedbackReason(
      sentiment === 'liked'
        ? 'Great living stipend + Kadaj Alliance federal contracting background is valued.'
        : 'Requires too many years of experience or requires mandatory return without post-study work.'
    );
  };

  const handleSubmitFeedback = () => {
    if (!feedbackModalId) return;
    const item = scholarships.find((s) => s.id === feedbackModalId);
    if (item) {
      onFeedback(item, feedbackSentiment, feedbackReason);
    }
    setFeedbackModalId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Controls */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by degree, country (Canada, UK, Germany...), university, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800 placeholder-stone-400"
            >
            </input>
          </div>

          {/* Filter Bar Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Region Selector */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
              {['All', 'North America', 'Europe', 'UK'].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
              {[
                { id: 'All', label: 'All Status' },
                { id: 'new', label: 'New' },
                { id: 'saved', label: 'Saved' },
                { id: 'applied', label: 'Applied' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedStatus === st.id
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Sourced from @scholarsregion Toggle */}
            <button
              onClick={() => setFilterSource(filterSource === 'all' ? 'scholarsregion' : 'all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 border ${
                filterSource === 'scholarsregion'
                  ? 'bg-amber-900 text-amber-100 border-amber-800 shadow-xs'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <span>📢 @scholarsregion Feed</span>
              <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${filterSource === 'scholarsregion' ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-800'}`}>
                {scholarsRegionCount}
              </span>
            </button>

            {/* Score Threshold */}
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              aria-label="Filter by minimum match score"
              className="text-xs bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none"
            >
              <option value={0}>All Match Scores</option>
              <option value={95}>95%+ Top Fit Only</option>
              <option value={90}>90%+ High Match</option>
              <option value={85}>85%+ Strong Match</option>
            </select>
          </div>
        </div>

        {/* Live Filter Summary Line */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-stone-800">{filtered.length}</strong> fully funded scholarships</span>
            <span>·</span>
            <span>Applicant Target: IR, Diplomacy, Public Policy & Global Governance</span>
            {filterSource === 'scholarsregion' && (
              <>
                <span>·</span>
                <span className="font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-mono">
                  Filtered by @scholarsregion Twitter Feed
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Tuition Waived
            </span>
            <span>·</span>
            <span>Monthly Living Stipends Included</span>
          </div>
        </div>
      </div>

      {/* Scholarships Grid / Feed */}
      <div className="space-y-4">
        {filtered.map((s) => {
          const daysLeft = getDaysLeft(s.deadline);
          const isUrgent = daysLeft !== null && daysLeft > 0 && daysLeft <= 30;

          return (
            <div
              key={s.id}
              className={`bg-white border rounded-xl p-5 transition-all hover:border-stone-400 hover:shadow-xs ${
                s.status === 'applied'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : s.status === 'saved'
                  ? 'border-blue-200 bg-blue-50/10'
                  : 'border-stone-200'
              }`}
            >
              {/* Card Header & Unboxed Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-medium text-stone-800">{s.universityOrFunder}</span>
                    <span>·</span>
                    <span>{s.country} ({s.region})</span>
                    <span>·</span>
                    <span>{s.degreeLevel}</span>
                    <span>·</span>
                    <span>Intake: {s.intake}</span>
                  </div>

                  {s.sourceHandle === '@scholarsregion' && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[11px] bg-amber-100 text-amber-900 font-mono font-medium px-2 py-0.5 rounded border border-amber-200">
                        📢 @scholarsregion Verified
                      </span>
                      {s.specCrossReference?.verdict && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-900 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                          ✓ {s.specCrossReference.verdict}
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 tracking-tight">
                    {s.title}
                  </h3>
                </div>

                {/* Match Score & Deadline */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-stone-900 font-mono">
                        {s.relevanceScore}% MATCH
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Profile & Experience Fit
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                      {s.relevanceScore}
                    </div>
                  </div>

                  {daysLeft !== null && (
                    <div className="flex items-center gap-1 text-[11px] mt-1 font-medium">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span className={daysLeft <= 0 ? 'text-stone-400' : isUrgent ? 'text-red-700 font-semibold' : 'text-stone-700'}>
                        {daysLeft <= 0
                          ? 'Passed'
                          : daysLeft <= 14
                          ? `Urgent: ${daysLeft} days left`
                          : `${daysLeft} days left (${s.deadline})`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Funding & Financial Highlights */}
              <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-2.5 bg-stone-50 rounded-lg p-3 border border-stone-200/60 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Tuition & Costs</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{s.fundingAmount}</div>
                  <div className="text-stone-500 text-[11px]">{s.fundingType}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Monthly Living Stipend</div>
                  <div className="font-semibold text-emerald-800 mt-0.5">{s.monthlyStipend}</div>
                  {s.travelAllowance && (
                    <div className="text-stone-500 text-[11px] truncate">{s.travelAllowance}</div>
                  )}
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Post-Study Work Opportunity</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{s.postStudyWorkOpportunity}</div>
                  <div className="text-stone-500 text-[11px]">GRE: {s.greRequired}</div>
                </div>
              </div>

              {/* Kadaj Alliance & Profile Strategic Synergy Box */}
              <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 font-medium text-amber-900 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kadaj Alliance Federal Contracting Strategic Advantage:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {s.workExperienceFit}
                </p>
                <div className="mt-1.5 pt-1.5 border-t border-amber-200/50 flex flex-wrap items-center gap-3 text-[11px] text-amber-950 font-medium">
                  <span>CGPA Evaluation: {s.cgpaRequirement}</span>
                  <span>·</span>
                  <span>English: {s.ieltsRequirement}</span>
                </div>
              </div>

              {/* Spec Cross-Reference Breakdown (from @scholarsregion) */}
              {s.specCrossReference && (
                <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5 font-mono text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>SPEC CROSS-REFERENCE AUDIT (@scholarsregion)</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {s.specCrossReference.verdict}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="font-medium text-stone-800">Degree Match: </span>
                      <span className="text-stone-600">{s.specCrossReference.degreeFit}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">CGPA (3.57/5.0): </span>
                      <span className="text-stone-600">{s.specCrossReference.cgpaAudit}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">Work Experience: </span>
                      <span className="text-stone-600">{s.specCrossReference.workExpAudit}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">Testing & Waivers: </span>
                      <span className="text-stone-600">{s.specCrossReference.testAudit}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons & Pipeline Status */}
              <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectScholarship(s)}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Full Strategy & Checklist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>

                  {/* Send directly to Telegram */}
                  <button
                    onClick={() => onSendToTelegram(s)}
                    title={telegramReady ? 'Send alert to your phone via Telegram' : 'Configure Telegram in the Phone Alerts tab'}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors flex items-center gap-1.5 cursor-pointer ${
                      telegramReady
                        ? 'border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100'
                        : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                    <span>Send to Phone</span>
                  </button>
                </div>

                {/* Pipeline Status toggles & Training feedback */}
                <div className="flex items-center gap-2">
                  {/* Status buttons */}
                  {s.status === 'new' && (
                    <button
                      onClick={() => onUpdateStatus(s.id, 'saved')}
                      className="px-2.5 py-1 text-xs rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                  )}

                  {s.status === 'saved' && (
                    <button
                      onClick={() => onUpdateStatus(s.id, 'applied')}
                      className="px-2.5 py-1 text-xs rounded-md bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Mark Applied</span>
                    </button>
                  )}

                  {s.status === 'applied' && (
                    <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </span>
                  )}

                  {s.status !== 'skipped' && s.status !== 'applied' && (
                    <button
                      onClick={() => onUpdateStatus(s.id, 'skipped')}
                      className="px-2 py-1 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      Skip
                    </button>
                  )}

                  {/* Agent Training / Feedback triggers */}
                  <div className="pl-2 border-l border-stone-200 flex items-center gap-1">
                    <button
                      onClick={() => handleOpenFeedback(s, 'liked')}
                      title="Train Agent: I want to see more scholarships like this"
                      className="p-1 rounded text-stone-400 hover:text-emerald-700 hover:bg-stone-100 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenFeedback(s, 'disliked')}
                      title="Train Agent: Deprioritize or adjust criteria"
                      className="p-1 rounded text-stone-400 hover:text-red-700 hover:bg-stone-100 cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-10 text-center text-stone-500 space-y-3">
            <Filter className="w-8 h-8 text-stone-400 mx-auto" />
            <div className="font-semibold text-stone-800">No scholarships match this filter</div>
            <p className="text-xs max-w-sm mx-auto">
              Try broadening your region or match score filters, or run a live web scan with the agent.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
                setSelectedStatus('All');
                setMinScore(0);
              }}
              className="text-xs text-stone-900 underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Feedback Modal for Training the Agent */}
      {feedbackModalId && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {feedbackSentiment === 'liked' ? (
                  <ThumbsUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                )}
                <h4 className="font-semibold text-stone-900 text-sm">
                  {feedbackSentiment === 'liked' ? 'Train Agent: Boost Similar' : 'Train Agent: Deprioritize'}
                </h4>
              </div>
              <button
                onClick={() => setFeedbackModalId(null)}
                className="text-stone-400 hover:text-stone-700 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Tell the agent why you {feedbackSentiment === 'liked' ? 'like' : 'dislike'} this scholarship.
              The agent will adapt its screening model and keyword weights.
            </p>

            <textarea
              rows={3}
              value={feedbackReason}
              onChange={(e) => setFeedbackReason(e.target.value)}
              placeholder="e.g. Love the CAD $2,000 stipend and 3-year PGWP, or requires in-person interview in London..."
              className="w-full p-2.5 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setFeedbackModalId(null)}
                className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-3.5 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800"
              >
                Save Feedback & Train Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
