import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Send,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  Building,
  Globe2,
  Calendar,
  DollarSign,
  FileText,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Scholarship, ApplicationStatus } from '../types';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onToggleChecklist: (scholarshipId: string, itemId: string) => void;
  onSendToTelegram: (scholarship: Scholarship) => void;
  onFeedback: (scholarship: Scholarship, sentiment: 'liked' | 'disliked', reason: string) => void;
  telegramReady: boolean;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  onClose,
  onUpdateStatus,
  onToggleChecklist,
  onSendToTelegram,
  onFeedback,
  telegramReady,
}) => {
  const [feedbackSentiment, setFeedbackSentiment] = useState<'liked' | 'disliked'>('liked');
  const [feedbackReason, setFeedbackReason] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

  const daysLeft = getDaysLeft(scholarship.deadline);

  const handleFeedbackSubmit = () => {
    onFeedback(scholarship, feedbackSentiment, feedbackReason || (feedbackSentiment === 'liked' ? 'High relevance' : 'Not well aligned'));
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="font-semibold text-stone-900">{scholarship.universityOrFunder}</span>
              <span>·</span>
              <span>{scholarship.country} ({scholarship.region})</span>
              <span>·</span>
              <span>Intake: {scholarship.intake}</span>
              {scholarship.sourceHandle === '@scholarsregion' && (
                <>
                  <span>·</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-amber-200">
                    📢 @scholarsregion Verified
                  </span>
                </>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {scholarship.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Key Metrics / Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
            <div>
              <div className="text-[10px] uppercase font-mono text-stone-500 font-semibold">Match Score</div>
              <div className="text-base font-bold text-stone-900 font-mono mt-0.5">
                {scholarship.relevanceScore}%
              </div>
              <div className="text-[11px] text-stone-500">Tier 1 Match</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-stone-500 font-semibold">Application Deadline</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">
                {scholarship.deadline}
              </div>
              <div className="text-[11px] font-medium text-amber-800">
                {daysLeft !== null && daysLeft > 0 ? `${daysLeft} days remaining` : 'Passed / Rolling'}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-stone-500 font-semibold">Monthly Living Stipend</div>
              <div className="text-xs font-bold text-emerald-800 mt-0.5">
                {scholarship.monthlyStipend}
              </div>
              <div className="text-[11px] text-stone-500">Tax-free allowance</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-stone-500 font-semibold">Post-Study Work</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">
                {scholarship.postStudyWorkOpportunity.split(' ')[0]} {scholarship.postStudyWorkOpportunity.split(' ')[1] || ''}
              </div>
              <div className="text-[11px] text-stone-500 truncate">{scholarship.postStudyWorkOpportunity}</div>
            </div>
          </div>

          {/* Kadaj Alliance & Profile Strategic Synergy Box */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Why This Scholarship Fits Your Background (Kadaj Alliance + Pol Sci Ed):</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              {scholarship.workExperienceFit}
            </p>
            <div className="pt-2 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-950 font-medium">
              <div><strong>CGPA Analysis:</strong> {scholarship.cgpaRequirement}</div>
              <div><strong>English Proficiency:</strong> {scholarship.ieltsRequirement}</div>
            </div>
          </div>

          {/* Spec Cross-Reference Audit from @scholarsregion */}
          {scholarship.specCrossReference && (
            <div className="p-4 bg-stone-900 text-stone-100 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="font-semibold text-amber-300 flex items-center gap-2 font-mono text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SPEC CROSS-REFERENCE AUDIT (@scholarsregion)</span>
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-400 bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
                  {scholarship.specCrossReference.verdict}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-stone-300">
                <div>
                  <strong className="text-stone-100">1. Degree Match:</strong>
                  <p className="text-stone-400 mt-0.5">{scholarship.specCrossReference.degreeFit}</p>
                </div>
                <div>
                  <strong className="text-stone-100">2. CGPA (3.57/5.0) Audit:</strong>
                  <p className="text-stone-400 mt-0.5">{scholarship.specCrossReference.cgpaAudit}</p>
                </div>
                <div>
                  <strong className="text-stone-100">3. Kadaj Alliance Contracting Fit:</strong>
                  <p className="text-stone-400 mt-0.5">{scholarship.specCrossReference.workExpAudit}</p>
                </div>
                <div>
                  <strong className="text-stone-100">4. Testing &amp; Waiver Viability:</strong>
                  <p className="text-stone-400 mt-0.5">{scholarship.specCrossReference.testAudit}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300">
                <strong className="text-amber-300">5. Post-Study Economic Pathway:</strong> {scholarship.specCrossReference.postStudyAudit}
              </div>
            </div>
          )}

          {/* Funding Package Breakdown */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Full Funding Breakdown
            </h4>
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-600">Tuition Coverage:</span>
                <span className="font-semibold text-stone-900">{scholarship.fundingAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Living Allowance:</span>
                <span className="font-semibold text-emerald-800">{scholarship.monthlyStipend}</span>
              </div>
              {scholarship.travelAllowance && (
                <div className="flex justify-between">
                  <span className="text-stone-600">Travel & Relocation:</span>
                  <span className="font-semibold text-stone-900">{scholarship.travelAllowance}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-600">GRE Requirement:</span>
                <span className="font-semibold text-stone-900">{scholarship.greRequired}</span>
              </div>
            </div>
          </div>

          {/* Application Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Application Document Checklist
            </h4>
            <div className="space-y-1.5">
              {scholarship.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-2.5 p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggleChecklist(scholarship.id, item.id)}
                    className="mt-0.5 rounded text-stone-900 focus:ring-stone-400"
                  />
                  <span className={item.completed ? 'line-through text-stone-400' : 'text-stone-800'}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Feedback & Training for AI Agent */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>Rate Relevance for the AI Agent</span>
              </h4>
              {feedbackSubmitted && (
                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <p className="text-[11px] text-stone-500">
              Your feedback is used by the agent to refine future scholarship search parameters and alert delivery.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFeedbackSentiment('liked')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  feedbackSentiment === 'liked'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-stone-200 text-stone-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Relevant</span>
              </button>
              <button
                onClick={() => setFeedbackSentiment('disliked')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  feedbackSentiment === 'disliked'
                    ? 'bg-red-700 text-white'
                    : 'bg-white border border-stone-200 text-stone-700'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Not Relevant</span>
              </button>

              <input
                type="text"
                value={feedbackReason}
                onChange={(e) => setFeedbackReason(e.target.value)}
                placeholder="Optional: Why is this relevant or not?"
                className="flex-1 min-w-[200px] p-1.5 bg-white border border-stone-200 rounded-lg text-xs"
              />

              <button
                onClick={handleFeedbackSubmit}
                className="px-3 py-1.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Mark Applied / To Apply / Skipped) */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          {/* Status Pipeline Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Mark status:</span>

            <button
              onClick={() => onUpdateStatus(scholarship.id, 'applied')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                scholarship.status === 'applied'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Applied</span>
            </button>

            <button
              onClick={() => onUpdateStatus(scholarship.id, 'saved')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                scholarship.status === 'saved' || scholarship.status === 'preparing'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>To Apply (Saved)</span>
            </button>

            <button
              onClick={() => onUpdateStatus(scholarship.id, 'skipped')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                scholarship.status === 'skipped'
                  ? 'bg-stone-400 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Skipped</span>
            </button>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSendToTelegram(scholarship)}
              className="px-3 py-1.5 text-xs font-medium bg-sky-50 text-sky-800 border border-sky-300 rounded-lg hover:bg-sky-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Send to Phone</span>
            </button>

            <a
              href={scholarship.url}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 flex items-center gap-1.5 shadow-xs"
            >
              <span>Open Portal</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
