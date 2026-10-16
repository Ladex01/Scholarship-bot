import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Building,
  GraduationCap,
  Briefcase,
  MapPin,
  Send,
  ExternalLink,
  Download
} from 'lucide-react';
import { JobOpportunity, UserProfile } from '../types';
import { generateJobPitch } from '../services/api';

interface NyscPpaPitchBuilderProps {
  jobs: JobOpportunity[];
  profile: UserProfile;
}

export const NyscPpaPitchBuilder: React.FC<NyscPpaPitchBuilderProps> = ({
  jobs,
  profile,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [customCompany, setCustomCompany] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('Procurement & Bidding');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleGenerate = async () => {
    setIsGenerating(true);

    const targetJob = customCompany
      ? {
          id: 'custom-job',
          title: customTitle || 'Procurement & Operations Associate (NYSC PPA)',
          company: customCompany,
          location: 'Victoria Island / Lagos',
          workType: 'Hybrid',
          category: customCategory,
          salaryStipend: '₦180,000/month',
          whyAdefolabiFits: 'B.Sc. Political Science Education (3.57/5.0) + 1-year US federal bidding at Kadaj Alliance LLC',
          contactEmail: 'careers@company.com',
        }
      : selectedJob;

    const res = await generateJobPitch(targetJob, profile);
    setIsGenerating(false);

    if (res.ok && res.pitch) {
      setGeneratedContent(res.pitch);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NYSC_PPA_Request_Kit_${(customCompany || selectedJob.company).replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 rounded-2xl p-5 sm:p-6 text-white border border-emerald-800/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 font-mono uppercase">
                PPA Kit & Request Letter Builder
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                Camp Mobilization Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Official NYSC Corporate Request Letters & HR Pitches
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Generate the formal <strong>Corporate Request Letter</strong> to submit to the Lagos State NYSC Coordinator / Camp Director on the <strong>4th of next month</strong>, alongside custom cold outreach emails and cover letters bridging your LASU degree and Kadaj Alliance LLC US federal contracting experience.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-stone-300 uppercase block font-medium">Candidate Superpower</span>
              <span className="text-xs font-bold text-amber-300 block">SAM.gov / FAR Bidding</span>
              <span className="text-[10px] text-emerald-300 block">+ LASU 3.57/5.0 CGPA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Selector & Builder Form */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
          <Building className="w-4 h-4 text-emerald-600" />
          <span>Select Target Employer or Custom Organization in Lagos</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Select from existing tracked jobs */}
          <div className="space-y-1.5">
            <label className="block font-medium text-stone-700">Choose from Tracked Job Placements:</label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setCustomCompany('');
              }}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 text-xs"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.company} — {j.title} ({j.salaryStipend})
                </option>
              ))}
            </select>
          </div>

          {/* Or enter custom organization */}
          <div className="space-y-1.5">
            <label className="block font-medium text-stone-700">Or Custom Organization Name:</label>
            <input
              type="text"
              value={customCompany}
              onChange={(e) => setCustomCompany(e.target.value)}
              placeholder="e.g. Chevron Nigeria, Sterling Bank, Lagos State Ministry, KPMG..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 text-xs placeholder:text-stone-400"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Generating kit for: <strong className="text-stone-900">{customCompany || selectedJob.company}</strong> ({customTitle || selectedJob.title})
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Drafting Official PPA Materials...' : 'Generate Complete PPA Kit'}</span>
          </button>
        </div>
      </div>

      {/* Output Display */}
      {generatedContent && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-stone-900 text-sm">
                Generated PPA Application Kit for {customCompany || selectedJob.company}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Entire Kit'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-xl whitespace-pre-wrap font-sans text-xs text-stone-800 leading-relaxed max-h-[600px] overflow-y-auto">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
};
