import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Send,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Search,
  Mail,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
  FileText
} from 'lucide-react';
import { JobOpportunity, UserProfile, ApplicationStatus } from '../types';
import { generateJobPitch } from '../services/api';

interface JobDetailModalProps {
  job: JobOpportunity;
  profile: UserProfile;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onToggleChecklist: (jobId: string, itemId: string) => void;
  onSendToTelegram: (job: JobOpportunity) => void;
  onFeedback: (job: JobOpportunity, sentiment: 'liked' | 'disliked', reason?: string) => void;
  telegramReady: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  profile,
  onClose,
  onUpdateStatus,
  onToggleChecklist,
  onSendToTelegram,
  onFeedback,
  telegramReady,
}) => {
  const [activeTab, setActiveTab] = useState<'job_description' | 'ppa_materials' | 'checklist'>('job_description');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Generate live query URLs for Indeed Nigeria, Jobberman, and LinkedIn
  const indeedSearchUrl = `https://ng.indeed.com/jobs?q=${encodeURIComponent(job.company + ' ' + job.title)}&l=Lagos`;
  const jobbermanSearchUrl = `https://www.jobberman.com/jobs?q=${encodeURIComponent(job.title)}&location=lagos`;
  const linkedInSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.company + ' ' + job.title)}&location=Lagos%2C%20Nigeria`;

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    const res = await generateJobPitch(job, profile);
    setIsGeneratingPitch(false);
    if (res.ok && res.pitch) {
      setGeneratedPitch(res.pitch);
    }
  };

  const handleCopyPitch = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  // Derive comprehensive responsibilities if not explicitly provided
  const responsibilities = job.responsibilities || [
    `Analyze incoming requisitions, review technical specifications, and ensure alignment with institutional standards.`,
    `Liaise with approved vendors, verify supplier quotations, and assist in price/terms negotiations.`,
    `Maintain and update the procurement/operations registry and supplier documentation databases.`,
    `Collaborate with cross-functional department leads to monitor order fulfillment, delivery schedules, and compliance.`,
    `Prepare structured weekly administrative reports, purchase orders (POs), and audit-ready verification files.`,
    `Support senior management with competitive research, vendor onboarding, and contract compliance reviews.`
  ];

  // Derive benefits if not explicitly provided
  const benefits = job.benefits || [
    `Monthly Corporate Stipend: ${job.salaryStipend}`,
    `Eligible for Federal NYSC Allawee supplement (₦77,000/month)`,
    `Practical exposure to enterprise supply chain, vendor governance, and institutional bidding`,
    `Mentorship from senior corporate directors and potential post-service retention consideration`,
    `Official Corporate PPA Placement Letter for NYSC Camp relocation protocol`
  ];

  const completedChecklistCount = job.checklist?.filter((i) => i.completed).length || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Indeed-Style Top Header Banner */}
        <div className="p-5 sm:p-6 bg-white border-b border-slate-200 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                  {job.workType} · {job.location}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Recruiting
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {job.title}
              </h1>

              {/* Company & Location */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-sky-600 inline" />
                  {job.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 inline" />
                  {job.location}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Indeed Pay & Deadline Strip */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Estimated Pay</span>
                <span className="font-bold text-slate-900 text-sm sm:text-base text-emerald-700">
                  {job.salaryStipend}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Application Deadline</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {job.deadline || 'Ongoing / Until Filled'}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={job.officialPortalUrl || job.sourceUrl || indeedSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply on {job.source || 'Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <select
                value={job.status}
                onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="new">Status: New</option>
                <option value="saved">Status: Saved</option>
                <option value="preparing">Status: Preparing</option>
                <option value="applied">Status: Applied</option>
                <option value="interview">Status: Interviewing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Secondary Navigation */}
        <div className="px-5 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab('job_description')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'job_description'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Job Description & Duties
            </button>
            <button
              onClick={() => setActiveTab('ppa_materials')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ppa_materials'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>PPA Request & Cover Letter</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Application Checklist ({completedChecklistCount}/{job.checklist?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700 leading-relaxed">
          
          {/* TAB 1: Real Indeed-Style Job Details */}
          {activeTab === 'job_description' && (
            <div className="space-y-6">
              
              {/* Job Details Quick Specs */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Job Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500">Pay / Stipend:</span>
                    <span className="font-semibold text-slate-900">{job.salaryStipend}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500">Job Type:</span>
                    <span className="font-semibold text-slate-900">{job.jobType}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500">Work Schedule:</span>
                    <span className="font-semibold text-slate-900">
                      {job.workType === 'Remote' ? 'Flexible US/Remote Hours' : 'Full-time, Monday to Friday'}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-semibold text-slate-900">{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Full Job Description Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  Full Job Description
                </h3>
                <p className="text-slate-600">
                  {job.roleSummary || (
                    `${job.company} is actively accepting applications for the role of ${job.title} based in ${job.location}. This placement offers comprehensive operational exposure, mentorship within a corporate environment, and direct involvement in organizational workflows.`
                  )}
                </p>
              </div>

              {/* Key Responsibilities & Day-to-Day Duties */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  Key Responsibilities & Duties
                </h4>
                <ul className="space-y-2 pl-1">
                  {responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements & Qualifications */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Qualifications & Requirements
                </h4>
                <ul className="space-y-2 pl-1">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits & Allowances */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Benefits & Working Package
                </h4>
                <ul className="space-y-2 pl-1">
                  {benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live Direct Access Links Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-sky-600" />
                    Direct Job Search & Verified Links
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Job postings expire and rotate frequently. Click below to view live vacancies for this role across major recruitment engines:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={indeedSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span>Indeed Nigeria</span>
                    <ExternalLink className="w-3 h-3 text-sky-600" />
                  </a>

                  <a
                    href={jobbermanSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span>Jobberman Lagos</span>
                    <ExternalLink className="w-3 h-3 text-sky-600" />
                  </a>

                  <a
                    href={linkedInSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span>LinkedIn Jobs</span>
                    <ExternalLink className="w-3 h-3 text-sky-600" />
                  </a>
                </div>

                {job.contactEmail && (
                  <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-[11px] text-slate-600">
                        Recruiter Contact: <strong className="font-mono text-slate-800">{job.contactEmail}</strong>
                      </span>
                    </div>
                    <a
                      href={`mailto:${job.contactEmail}?subject=Application for ${encodeURIComponent(job.title)}`}
                      className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 underline"
                    >
                      Send Direct Email
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Official PPA Request Letter Builder */}
          {activeTab === 'ppa_materials' && (
            <div className="space-y-4">
              {!generatedPitch ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-3">
                  <FileText className="w-8 h-8 text-sky-600 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Generate Official Corporate PPA Request & Cover Letter
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-xs leading-relaxed">
                    Generate the formal PPA Request Letter to submit to the Lagos State NYSC Coordinator / Camp Director, along with a tailored cold outreach email for {job.company}'s HR department.
                  </p>
                  <button
                    onClick={handleGeneratePitch}
                    disabled={isGeneratingPitch}
                    className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 mx-auto disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isGeneratingPitch ? 'Drafting Official Materials...' : 'Draft Application Materials Now'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Draft Application Package for {job.company}
                    </span>
                    <button
                      onClick={handleCopyPitch}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPitch ? 'Copied to Clipboard' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-800">
                    {generatedPitch}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Application Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Application Milestones
              </h4>
              <div className="space-y-2">
                {job.checklist?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleChecklist(job.id, item.id)}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        item.completed
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {item.completed && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </div>
                    <span className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'font-medium text-slate-800'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px]">Save for later:</span>
            <button
              onClick={() => onUpdateStatus(job.id, 'saved')}
              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-medium text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Job</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSendToTelegram(job)}
              className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Send to Telegram Bot</span>
            </button>

            <a
              href={job.officialPortalUrl || job.sourceUrl || indeedSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>Apply on {job.source || 'Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
