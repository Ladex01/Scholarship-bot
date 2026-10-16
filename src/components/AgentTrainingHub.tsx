import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Award,
  Zap,
  Bookmark,
  Send,
  Plus,
  Trash2
} from 'lucide-react';
import { Scholarship, AgentTrainingConfig, UserProfile } from '../types';

interface AgentTrainingHubProps {
  scholarships: Scholarship[];
  trainingConfig: AgentTrainingConfig;
  onUpdateConfig: (updated: Partial<AgentTrainingConfig>) => void;
  onRetrainAgent: () => void;
  onFeedback: (scholarship: Scholarship, sentiment: 'liked' | 'disliked', reason: string) => void;
  profile: UserProfile;
}

export const AgentTrainingHub: React.FC<AgentTrainingHubProps> = ({
  scholarships,
  trainingConfig,
  onUpdateConfig,
  onRetrainAgent,
  onFeedback,
  profile,
}) => {
  const [weights, setWeights] = useState(trainingConfig.priorityWeights);
  const [customInstructions, setCustomInstructions] = useState(trainingConfig.customInstructions);
  const [newLikedKeyword, setNewLikedKeyword] = useState('');
  const [newDislikedKeyword, setNewDislikedKeyword] = useState('');
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Selected scholarship for immediate review
  const [selectedForReview, setSelectedForReview] = useState<Scholarship | null>(
    scholarships.length > 0 ? scholarships[0] : null
  );
  const [quickReason, setQuickReason] = useState('');
  const [reviewSentiment, setReviewSentiment] = useState<'liked' | 'disliked'>('liked');

  const handleSaveWeights = () => {
    onUpdateConfig({
      priorityWeights: weights,
      customInstructions,
    });
    onRetrainAgent();
    setSavedNotice('Agent search weights and screening model updated! Scores recalculated.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handleAddLikedKeyword = () => {
    if (!newLikedKeyword.trim()) return;
    const kw = newLikedKeyword.trim().toLowerCase();
    if (!trainingConfig.likedKeywords.includes(kw)) {
      onUpdateConfig({
        likedKeywords: [...trainingConfig.likedKeywords, kw],
      });
    }
    setNewLikedKeyword('');
  };

  const handleRemoveLikedKeyword = (kw: string) => {
    onUpdateConfig({
      likedKeywords: trainingConfig.likedKeywords.filter((k) => k !== kw),
    });
  };

  const handleAddDislikedKeyword = () => {
    if (!newDislikedKeyword.trim()) return;
    const kw = newDislikedKeyword.trim().toLowerCase();
    if (!trainingConfig.dislikedKeywords.includes(kw)) {
      onUpdateConfig({
        dislikedKeywords: [...trainingConfig.dislikedKeywords, kw],
      });
    }
    setNewDislikedKeyword('');
  };

  const handleRemoveDislikedKeyword = (kw: string) => {
    onUpdateConfig({
      dislikedKeywords: trainingConfig.dislikedKeywords.filter((k) => k !== kw),
    });
  };

  const handleSubmitQuickReview = () => {
    if (!selectedForReview) return;
    const reasonText = quickReason.trim() || (reviewSentiment === 'liked' ? 'Strong relevance to my goals' : 'Not well-aligned');
    onFeedback(selectedForReview, reviewSentiment, reasonText);
    setQuickReason('');
    setSavedNotice(`Feedback recorded for "${selectedForReview.title}". Future search models will prioritize this.`);
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handleGeneralFeedbackSubmit = () => {
    if (!generalFeedback.trim()) return;
    onUpdateConfig({
      feedbackHistory: [
        {
          id: String(Date.now()),
          scholarshipTitle: `General Agent Evaluation (${rating}/5 Stars)`,
          sentiment: rating >= 4 ? 'liked' : 'disliked',
          reason: generalFeedback,
          timestamp: new Date().toISOString(),
        },
        ...trainingConfig.feedbackHistory,
      ],
    });
    setGeneralFeedback('');
    setSavedNotice('General agent feedback saved! Prompt guidelines updated.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const quickTagPresets = [
    'Great monthly living stipend',
    'Post-study work visa eligible (Canada PGWP / Germany / UK)',
    'Kadaj Alliance US federal contracting experience valued',
    'Zero application fee / Free European portal',
    'No GRE required / Waived',
    'English Medium of Instruction accepted for waiver',
    'Too high minimum GPA requirement',
    'Tuition waiver only (lacks living stipend)',
    'Mandatory return without work visa rights',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-amber-700" />
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                AI Agent Training & Feedback Hub
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Train the scholarship agent on your preferences, refine relevance scoring, and teach it exactly what to find and why.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200">
              {trainingConfig.feedbackHistory.length} Training Logs Recorded
            </span>
          </div>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}
      </div>

      {/* Immediate Scholarship Relevance Review Widget */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Interactive Relevance Review (Teach the Agent)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Rate recent suggestions and specify why they are relevant or not to refine future searches.
            </p>
          </div>

          {/* Scholarship selector */}
          <select
            value={selectedForReview?.id || ''}
            onChange={(e) => {
              const found = scholarships.find((s) => s.id === e.target.value);
              if (found) setSelectedForReview(found);
            }}
            aria-label="Select scholarship to review"
            className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-stone-800 font-medium max-w-xs truncate"
          >
            {scholarships.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.country})
              </option>
            ))}
          </select>
        </div>

        {selectedForReview && (
          <div className="space-y-3 bg-stone-50 rounded-xl p-4 border border-stone-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-stone-500 font-medium">
                  {selectedForReview.universityOrFunder} · {selectedForReview.country}
                </span>
                <h4 className="text-sm font-semibold text-stone-900">
                  {selectedForReview.title}
                </h4>
              </div>
              <div className="text-xs font-mono font-bold text-stone-800 bg-white px-2.5 py-1 rounded border border-stone-200 shrink-0">
                Current Match: {selectedForReview.relevanceScore}%
              </div>
            </div>

            <div className="text-xs text-stone-600 bg-white p-2.5 rounded border border-stone-200/60">
              <span className="font-semibold text-stone-800">Why the agent suggested this: </span>
              {selectedForReview.workExperienceFit}
            </div>

            {/* Quick rating toggles */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setReviewSentiment('liked')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  reviewSentiment === 'liked'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Relevant / High Quality Suggestion</span>
              </button>

              <button
                onClick={() => setReviewSentiment('disliked')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  reviewSentiment === 'disliked'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Not Relevant / Needs Adjustment</span>
              </button>
            </div>

            {/* Quick-tag preset chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-stone-500 font-medium">
                Click a preset reason tag to populate your explanation:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickTagPresets.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuickReason(tag)}
                    className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom explanation text */}
            <div className="space-y-1.5">
              <textarea
                rows={2}
                value={quickReason}
                onChange={(e) => setQuickReason(e.target.value)}
                placeholder="Explain why this suggestion is relevant or not for your specific profile (e.g. 3.57 CGPA, Kadaj Alliance US contracting, desired post-study work visa)..."
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmitQuickReview}
                className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 cursor-pointer shadow-xs"
              >
                Submit Feedback & Train Future Radar Scans
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Two Columns: Weighting Sliders & Screening Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Strategic Weighting Sliders */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Scoring Weight Controls (1 - 10)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Adjust how aggressively the agent weighs each criterion when computing match percentages.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-medium text-stone-800 mb-1">
                <span>100% Tuition + Living Stipend (Full Coverage)</span>
                <span className="font-mono text-stone-900">{weights.fullFundingWeight} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={weights.fullFundingWeight}
                onChange={(e) => setWeights({ ...weights, fullFundingWeight: Number(e.target.value) })}
                className="w-full accent-stone-900"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-stone-800 mb-1">
                <span>Post-Study Economic Opportunity (Canada PGWP, UK PSW, EU Jobseeker)</span>
                <span className="font-mono text-stone-900">{weights.postStudyWorkWeight} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={weights.postStudyWorkWeight}
                onChange={(e) => setWeights({ ...weights, postStudyWorkWeight: Number(e.target.value) })}
                className="w-full accent-stone-900"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-stone-800 mb-1">
                <span>Kadaj Alliance Remote Federal Contracting Synergy</span>
                <span className="font-mono text-stone-900">{weights.workExpFitWeight} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={weights.workExpFitWeight}
                onChange={(e) => setWeights({ ...weights, workExpFitWeight: Number(e.target.value) })}
                className="w-full accent-stone-900"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-stone-800 mb-1">
                <span>No GRE Required / GRE Waived</span>
                <span className="font-mono text-stone-900">{weights.noGreWeight} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={weights.noGreWeight}
                onChange={(e) => setWeights({ ...weights, noGreWeight: Number(e.target.value) })}
                className="w-full accent-stone-900"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-stone-800 mb-1">
                <span>English Proficiency Waived (MOI letter accepted)</span>
                <span className="font-mono text-stone-900">{weights.englishWaiverWeight} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={weights.englishWaiverWeight}
                onChange={(e) => setWeights({ ...weights, englishWaiverWeight: Number(e.target.value) })}
                className="w-full accent-stone-900"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveWeights}
                className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer shadow-xs"
              >
                Apply Weights & Re-Score All Scholarships
              </button>
            </div>
          </div>
        </div>

        {/* Right: Custom Instructions Prompt & Keyword Filter Training */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Natural Language Training Instructions
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Direct guidance passed to the server-side Gemini agent when running autonomous scans.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <textarea
              rows={4}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="w-full p-2.5 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono text-[11px]"
            />
            <p className="text-[11px] text-stone-500">
              The AI incorporates these instructions into all live searches, web filtering, and prompt generation.
            </p>
          </div>

          {/* Liked & Disliked Keyword Filter Training */}
          <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
            {/* Boost keywords */}
            <div className="space-y-1.5">
              <span className="font-medium text-stone-800">Keywords to Boost:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. graduate teaching assistantship, public policy"
                  value={newLikedKeyword}
                  onChange={(e) => setNewLikedKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLikedKeyword()}
                  className="flex-1 p-1.5 text-xs border border-stone-200 rounded-lg"
                />
                <button
                  onClick={handleAddLikedKeyword}
                  className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {trainingConfig.likedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200"
                  >
                    {kw}
                    <button
                      onClick={() => handleRemoveLikedKeyword(kw)}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Suppress keywords */}
            <div className="space-y-1.5 pt-2">
              <span className="font-medium text-stone-800">Keywords to Suppress / Filter Out:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. tuition only, requires gre"
                  value={newDislikedKeyword}
                  onChange={(e) => setNewDislikedKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddDislikedKeyword()}
                  className="flex-1 p-1.5 text-xs border border-stone-200 rounded-lg"
                />
                <button
                  onClick={handleAddDislikedKeyword}
                  className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {trainingConfig.dislikedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 text-[11px] bg-red-50 text-red-800 px-2 py-0.5 rounded border border-red-200"
                  >
                    {kw}
                    <button
                      onClick={() => handleRemoveDislikedKeyword(kw)}
                      className="hover:text-red-700 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* General Agent Evaluation & Feedback Section */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>General Agent Performance & Quality Feedback</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Give overarching feedback on how the agent is finding opportunities and delivering phone alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-stone-800">Overall Agent Quality Rating:</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-lg transition-transform hover:scale-110 cursor-pointer ${
                    star <= rating ? 'text-amber-500' : 'text-stone-300'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 font-mono text-stone-700 font-semibold">{rating} / 5 Stars</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="font-medium text-stone-800">Feedback & Recommendations for Next Scan:</label>
            <textarea
              rows={2}
              value={generalFeedback}
              onChange={(e) => setGeneralFeedback(e.target.value)}
              placeholder="e.g. Excellent Canadian suggestions, but please find more programs in Germany that teach entirely in English with €934/mo DAAD funding..."
              className="w-full p-2.5 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <div className="flex justify-end">
              <button
                onClick={handleGeneralFeedbackSubmit}
                className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer shadow-xs"
              >
                Submit Performance Feedback
              </button>
            </div>
          </div>
        </div>

        {/* History Log */}
        {trainingConfig.feedbackHistory.length > 0 && (
          <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
            <span className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
              Recent Training History & Adaptations:
            </span>
            <div className="space-y-1.5 max-h-44 overflow-y-auto">
              {trainingConfig.feedbackHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                      {item.sentiment === 'liked' ? (
                        <ThumbsUp className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <ThumbsDown className="w-3 h-3 text-red-600" />
                      )}
                      <span>{item.scholarshipTitle}</span>
                    </div>
                    <div className="text-stone-600 text-[11px]">{item.reason}</div>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
