import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Globe2,
  FileText,
  DollarSign,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { UserProfile, DiagnosticQuestion } from '../types';
import { INITIAL_DIAGNOSTIC_QUESTIONS } from '../data/diagnosticQuestions';
import { fetchAiDiagnostics } from '../services/api';

interface CandidateDiagnosticProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const CandidateDiagnostic: React.FC<CandidateDiagnosticProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>(INITIAL_DIAGNOSTIC_QUESTIONS);
  const [aiRunning, setAiRunning] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<any | null>(null);

  const handleSelectAnswer = (qId: string, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, selectedAnswer: answer } : q))
    );
  };

  const handleRunAiAudit = async () => {
    setAiRunning(true);
    const answersMap: Record<string, string> = {};
    questions.forEach((q) => {
      if (q.selectedAnswer) answersMap[q.id] = q.selectedAnswer;
    });

    const res = await fetchAiDiagnostics(answersMap);
    setAiRunning(false);
    if (res.ok && res.diagnostics) {
      setAiAdvice(res.diagnostics);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Candidacy Score Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-bold">
                <Award className="w-4 h-4 text-emerald-700" />
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                Applicant Profile & Diagnostic Audit
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Evaluated for fully funded Masters in IR, Diplomacy, Public Policy, International Affairs & Global Governance.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80">
            <div className="text-right text-xs">
              <div className="font-bold text-stone-900 font-mono text-sm">
                88 / 100
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                Competitive Tier 1 Profile
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs">
              88%
            </div>
          </div>
        </div>

        {/* 3 Core Strengths Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 mt-4 border-t border-stone-100 text-xs">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-stone-900">
              <BookOpen className="w-3.5 h-3.5 text-stone-600" />
              <span>Academic Classification</span>
            </div>
            <div className="text-stone-700 font-medium">B.Sc. Political Science Education</div>
            <div className="text-stone-500 text-[11px]">
              CGPA: <strong className="text-stone-800">3.57 / 5.0</strong> (Second Class Upper / UK 2:1 Honours equivalent; US ~3.12/4.0).
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-950">
              <Briefcase className="w-3.5 h-3.5 text-amber-700" />
              <span>Professional Superpower</span>
            </div>
            <div className="text-amber-900 font-medium">Kadaj Alliance LLC (1 Year Remote)</div>
            <div className="text-stone-600 text-[11px]">
              US federal government contracting, SAM.gov bidding, and compliance analysis. Exceptional practical governance proof.
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-stone-900">
              <Globe2 className="w-3.5 h-3.5 text-stone-600" />
              <span>Target Discipline Scope</span>
            </div>
            <div className="text-stone-700 font-medium">Expanded 5-Discipline Focus</div>
            <div className="text-stone-500 text-[11px]">
              Public Policy, International Affairs, Global Governance, International Relations & Diplomacy, Political Science.
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Questions Asked by the Agent */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-600" />
              <span>Agent Strategic Diagnostics (Missing Variables)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              The agent analyzed your initial responses and needs these strategic details to unlock maximum funding probability.
            </p>
          </div>

          <button
            onClick={handleRunAiAudit}
            disabled={aiRunning}
            className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${aiRunning ? 'animate-spin text-amber-300' : 'text-amber-400'}`} />
            <span>{aiRunning ? 'Evaluating with Gemini...' : 'Run Deep AI Diagnostic'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 space-y-2.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-stone-900">
                  {idx + 1}. {q.question}
                </div>
              </div>

              <p className="text-stone-500 text-[11px] leading-relaxed">
                <strong className="text-stone-700">Strategic Rationale: </strong>
                {q.rationale}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = q.selectedAnswer === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectAnswer(q.id, opt)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer flex items-start gap-2 ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 font-medium shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 border ${isSelected ? 'bg-amber-400 border-amber-300' : 'border-stone-400'}`} />
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Deep Diagnostic Advice (if generated) */}
      {aiAdvice && (
        <div className="bg-stone-900 text-stone-100 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Gemini Strategic Admissions Diagnostic
              </h3>
            </div>
            <span className="text-xs font-mono bg-stone-800 text-emerald-400 px-2 py-0.5 rounded">
              Score: {aiAdvice.candidacyScore || 88}/100
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-stone-200">Key Candidacy Strengths:</span>
              <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                {(aiAdvice.strengths || []).map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-stone-200">Admissions Leverage Points:</span>
              <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                {(aiAdvice.leveragePoints || []).map((l: string, i: number) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>

          {aiAdvice.strategicNiches && (
            <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
              <span className="font-semibold text-amber-300">Recommended Hidden-Gem Niches:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {aiAdvice.strategicNiches.map((n: any, idx: number) => (
                  <div key={idx} className="bg-stone-800 p-2.5 rounded border border-stone-700">
                    <div className="font-semibold text-stone-100">{n.niche}</div>
                    <div className="text-stone-400 text-[11px] mt-0.5">{n.whyItWorks}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
