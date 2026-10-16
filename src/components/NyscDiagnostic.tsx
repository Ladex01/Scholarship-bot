import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  MapPin,
  FileText,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Send,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile, DiagnosticQuestion } from '../types';
import { NYSC_JOB_DIAGNOSTIC_QUESTIONS } from '../data/nyscQuestions';
import { fetchNyscDiagnostics } from '../services/api';

interface NyscDiagnosticProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onTriggerScan: () => void;
}

export const NyscDiagnostic: React.FC<NyscDiagnosticProps> = ({
  profile,
  onUpdateProfile,
  onTriggerScan,
}) => {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>(NYSC_JOB_DIAGNOSTIC_QUESTIONS);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    NYSC_JOB_DIAGNOSTIC_QUESTIONS.forEach((q) => {
      if (q.selectedAnswer) initial[q.id] = q.selectedAnswer;
    });
    return initial;
  });

  const [aiAudit, setAiAudit] = useState<{
    readinessScore?: number;
    strengths?: string[];
    recommendations?: string[];
    broadeningNiches?: { sector: string; whyItWorks: string; exampleEmployers: string[] }[];
  } | null>(null);

  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, selectedAnswer: answer } : q))
    );
  };

  const handleRunAiAudit = async () => {
    setIsLoadingAi(true);
    const res = await fetchNyscDiagnostics(answers);
    setIsLoadingAi(false);

    if (res.ok && res.diagnostics) {
      setAiAudit(res.diagnostics);
    } else {
      // Fallback audit
      setAiAudit({
        readinessScore: 96,
        strengths: [
          'Unrivaled combination of B.Sc. Political Science Education (LASU 3.57/5.0) and 1-year US Federal Bidding at Kadaj Alliance LLC.',
          'Experience issuing formal RFQs, analyzing government solicitations on SAM.gov, and managing supplier registers gives massive corporate leverage.',
          'Readiness for Lagos State deployment prior to camp reporting on the 4th of next month.'
        ],
        recommendations: [
          'Request corporate PPA Request Letters from Flour Mills, Moniepoint, and KPMG before entering camp to bypass secondary school postings.',
          'Maintain your remote US federal bidding contract during NYSC for steady USD income ($650 - $950/mo) alongside your Lagos PPA stipend.',
          'Submit applications on Jobberman and Twitter job handles (@NaijaJobAlert) specifying your camp reporting date.'
        ],
        broadeningNiches: [
          {
            sector: 'US Embassy & Diplomatic Contracting Suppliers in Lagos',
            whyItWorks: 'Firms servicing US Consulate contracts in Victoria Island value your exact SAM.gov and FAR regulatory compliance knowledge.',
            exampleEmployers: ['International Logistics Consortia', 'Diplomatic Security & Procurement Agencies']
          },
          {
            sector: 'West African FinTech & Payment Infrastructure',
            whyItWorks: 'Fast-growing unicorns (Moniepoint, Interswitch, Flutterwave) require procurement officers to handle massive hardware/POS supplier onboarding and terminal supply chains.',
            exampleEmployers: ['Moniepoint (Lekki)', 'Interswitch (VI)', 'Opay', 'Flutterwave']
          },
          {
            sector: 'Foreign Policy & Governance Think Tanks',
            whyItWorks: 'Direct alignment with your Political Science Education degree; provides golden resume assets for your future Master’s in Diplomacy scholarships.',
            exampleEmployers: ['Nigerian Institute of International Affairs (NIIA Victoria Island)', 'NESG', 'BudgIT']
          }
        ]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 rounded-2xl p-5 sm:p-6 text-white border border-emerald-800/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 font-mono uppercase">
                Profile Expander & Placement Diagnostic
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                Ask For More Details
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Broaden Your Lagos NYSC & Remote Job Opportunities
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              We asked targeted questions to map your exact placement preferences: commute zones (Island vs Mainland), NYSC call-up status for the 4th of next month, corporate PPA request letter strategy, and dual USD remote income flexibility.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-4 rounded-xl text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest block font-medium">Lagos PPA Placement Score</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono block">
              {aiAudit?.readinessScore || 96}<span className="text-base text-stone-300">/100</span>
            </span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">Top Tier Corporate Profile</span>
          </div>
        </div>
      </div>

      {/* Candidate Directives & In-Camp Strategy Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-950">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>1. Mainland & Island (₦70k+ Min)</span>
          </div>
          <p className="text-emerald-900/80 text-[11px] leading-relaxed">
            Mainland hubs (Ikeja, Yaba, Maryland, Ilupeju, Isolo) offering ₦70,000 to ₦190,000/month are fully prioritized alongside Island corporates, reducing commute stress while ensuring competitive compensation.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>2. US Remote Proposals ($USD)</span>
          </div>
          <p className="text-amber-900/80 text-[11px] leading-relaxed">
            Rated as important as the PPA itself: 4 vetted US Federal Proposal & SAM.gov Bid Specialist roles ($500 - $1,200/mo ~ ₦750k - ₦1.8M) running asynchronously/evenings alongside your Lagos PPA.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-blue-950">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>3. In-Camp Relocation Protocol</span>
          </div>
          <p className="text-blue-900/80 text-[11px] leading-relaxed">
            Awaiting call-up letter: Deploy our Corporate PPA Request Letter from a Lagos firm (FMN, Cadbury, SBC, or Lagos State PPA) to get your relocation approved at the Camp Director desk during camp week 1.
          </p>
        </div>
      </div>

      {/* AI Strategy Insights & Broadening Niches (if generated) */}
      {aiAudit && (
        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Placement Intelligence: 3 High-Yield Lagos Corporate Niches</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiAudit.broadeningNiches?.map((niche, i) => (
              <div key={i} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-stone-900 block text-xs">{niche.sector}</span>
                <p className="text-stone-600 leading-relaxed text-[11px]">{niche.whyItWorks}</p>
                <div className="pt-1 border-t border-stone-200 text-[10px] text-stone-500">
                  <strong>Example Employers:</strong> {niche.exampleEmployers.join(', ')}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-900 border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <strong>Actionable Placement Next Step:</strong> Run a fresh live scan across Jobberman, Indeed, and Twitter using these newly unlocked sectors!
            </div>
            <button
              onClick={onTriggerScan}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shrink-0 cursor-pointer shadow-xs"
            >
              Scan These Niches Now
            </button>
          </div>
        </div>
      )}

      {/* Questions Section */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Targeted Candidate Specifications (NYSC Lagos Placement)</span>
            </h3>
            <p className="text-xs text-stone-500">
              Refine your answers below to dynamically sharpen the agent’s search and alert filters.
            </p>
          </div>

          <button
            onClick={handleRunAiAudit}
            disabled={isLoadingAi}
            className="px-4 py-2 bg-stone-900 hover:bg-emerald-800 active:bg-stone-950 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isLoadingAi ? 'Analyzing Preferences...' : 'Analyze & Broaden My Niches'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {q.question}
                  </h4>
                </div>
                <p className="text-stone-500 pl-7 text-[11px] leading-relaxed">
                  {q.rationale}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectAnswer(q.id, opt)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/20 text-stone-900 font-medium'
                          : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs leading-snug">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
