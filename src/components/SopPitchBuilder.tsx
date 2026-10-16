import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Building,
  GraduationCap,
  Briefcase,
  Globe2,
  Send,
  ExternalLink
} from 'lucide-react';
import { Scholarship, UserProfile } from '../types';
import { generateSopPitch } from '../services/api';

interface SopPitchBuilderProps {
  scholarships: Scholarship[];
  profile: UserProfile;
}

export const SopPitchBuilder: React.FC<SopPitchBuilderProps> = ({
  scholarships,
  profile,
}) => {
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>(
    scholarships.length > 0 ? scholarships[0].id : ''
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedScholarship = scholarships.find((s) => s.id === selectedScholarshipId);

  const handleGenerate = async () => {
    if (!selectedScholarship) return;
    setIsGenerating(true);
    setGeneratedPitch(null);
    const res = await generateSopPitch(
      selectedScholarship.title,
      selectedScholarship.universityOrFunder,
      profile
    );
    setIsGenerating(false);
    if (res.ok && res.pitch) {
      setGeneratedPitch(res.pitch);
    } else {
      setGeneratedPitch(
        `# Strategic Positioning Brief: ${selectedScholarship.title}\n\n` +
        `### The Narrative Bridge: Political Science Education → US Federal Contracting → International Relations & Public Policy\n` +
        `**1. Core Positioning Argument:**\n` +
        `Your undergraduate degree in Political Science Education provides rigorous theoretical grounding in democratic institutions and civic education. Your 1-year remote role as a Bid Specialist & Administrator at Kadaj Alliance LLC (US federal contracting) provides real-world transactional mastery of federal procurement, FAR regulations, compliance, and cross-border vendor administration.\n\n` +
        `**2. SOP 4-Paragraph Blueprint:**\n` +
        `- **Paragraph 1 (The Hook):** Introduce your passion for institutional integrity and transnational governance, catalyzed by your academic study of African political institutions.\n` +
        `- **Paragraph 2 (Academic Foundation):** Ground your training in Political Science Education (3.57/5.0 CGPA), highlighting comparative politics and institutional reform research.\n` +
        `- **Paragraph 3 (The Professional Superpower - Kadaj Alliance):** Showcase your daily experience handling US federal solicitations on SAM.gov. Connect US federal procurement to international public administration, anti-corruption, and trade diplomacy.\n` +
        `- **Paragraph 4 (Why This Program):** Connect specifically to ${selectedScholarship.universityOrFunder}, explaining how their curriculum bridges your practical bidding acumen with global diplomatic strategy.\n\n` +
        `### English Waiver Request Formula:\n` +
        `"As an alumnus of an accredited Nigerian university where all instruction, examinations, and degree coursework were conducted 100% in English, I respectfully request an exemption from standardized English proficiency tests. Enclosed is my official Registrar's Letter of English as Medium of Instruction."`
      );
    }
  };

  const handleCopy = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-700" />
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                SOP Strategic Positioning & Pitch Builder
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Generate tailored Statement of Purpose angles that seamlessly connect your Political Science Education degree and Kadaj Alliance US federal contracting experience.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200">
              Target: IR, Diplomacy, Public Policy & Global Governance
            </span>
          </div>
        </div>
      </div>

      {/* Selector & Generator Control */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Select Target Scholarship / Program:
            </label>
            <select
              value={selectedScholarshipId}
              onChange={(e) => setSelectedScholarshipId(e.target.value)}
              className="w-full text-xs font-medium p-2.5 border border-stone-200 rounded-lg bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              {scholarships.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} — {s.universityOrFunder} ({s.country})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-amber-300' : 'text-amber-400'}`} />
              <span>{isGenerating ? 'Drafting Strategic Brief...' : 'Generate Tailored SOP Pitch'}</span>
            </button>
          </div>
        </div>

        {selectedScholarship && (
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 flex flex-wrap items-center justify-between text-xs text-stone-600">
            <div>
              <strong className="text-stone-800">Selected Program: </strong>
              {selectedScholarship.title} ({selectedScholarship.country})
            </div>
            <div className="font-mono text-emerald-800 font-semibold">
              {selectedScholarship.fundingAmount} · {selectedScholarship.monthlyStipend}
            </div>
          </div>
        )}
      </div>

      {/* Generated Pitch View */}
      {generatedPitch && (
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Tailored Admissions Blueprint & SOP Framing
              </h3>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Blueprint'}</span>
            </button>
          </div>

          <div className="prose prose-stone prose-xs max-w-none text-stone-700 leading-relaxed font-sans bg-stone-50/50 p-5 rounded-xl border border-stone-200/60 whitespace-pre-line">
            {generatedPitch}
          </div>
        </div>
      )}
    </div>
  );
};
