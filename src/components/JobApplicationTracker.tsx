import React, { useState } from 'react';
import {
  Bookmark,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Building,
  Briefcase
} from 'lucide-react';
import { JobOpportunity, ApplicationStatus } from '../types';

interface JobApplicationTrackerProps {
  jobs: JobOpportunity[];
  onSelectJob: (job: JobOpportunity) => void;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
  onToggleChecklist: (jobId: string, itemId: string) => void;
  onSendToTelegram: (job: JobOpportunity) => void;
}

export const JobApplicationTracker: React.FC<JobApplicationTrackerProps> = ({
  jobs,
  onSelectJob,
  onUpdateStatus,
  onToggleChecklist,
  onSendToTelegram,
}) => {
  const [activeStage, setActiveStage] = useState<string>('all');

  const stages: { id: ApplicationStatus; label: string; count: number; color: string }[] = [
    { id: 'saved', label: 'To Apply / Saved', count: jobs.filter((j) => j.status === 'saved').length, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { id: 'preparing', label: 'Preparing Materials', count: jobs.filter((j) => j.status === 'preparing').length, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { id: 'applied', label: 'Applied', count: jobs.filter((j) => j.status === 'applied').length, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { id: 'interview', label: 'Interview Scheduled', count: jobs.filter((j) => j.status === 'interview').length, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { id: 'skipped', label: 'Skipped', count: jobs.filter((j) => j.status === 'skipped').length, color: 'text-stone-700 bg-stone-100 border-stone-200' },
  ];

  const filteredJobs = jobs.filter((j) => {
    if (activeStage === 'all') return j.status !== 'skipped' && j.status !== 'new';
    return j.status === activeStage;
  });

  return (
    <div className="space-y-6">
      {/* Tracker Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <span>Lagos NYSC & Remote Job Application Pipeline</span>
          </h2>
          <p className="text-xs text-stone-500">
            Track your progress across PPA request letters, HR email submissions, interviews, and accepted offers before camp starts on the 4th of next month.
          </p>
        </div>

        {/* Stage Filter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {stages.map((stage) => {
            const isSelected = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? `${stage.color} ring-2 ring-stone-900/10 font-bold`
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium truncate">{stage.label}</span>
                  <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-white/60 text-xs">
                    {stage.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tracked Jobs List */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
            <p className="text-xs text-stone-500">No jobs in this pipeline stage yet.</p>
            <p className="text-[11px] text-stone-400">
              Browse the <strong>Job Radar</strong> and click <strong>To Apply</strong> to add opportunities to this pipeline!
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const completedCount = job.checklist.filter((i) => i.completed).length;
            const progressPct = job.checklist.length > 0 ? Math.round((completedCount / job.checklist.length) * 100) : 0;

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4 hover:border-emerald-400 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 hover:text-emerald-700 cursor-pointer" onClick={() => onSelectJob(job)}>
                        {job.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700">
                        {job.workType} · {job.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                      <span className="font-semibold text-stone-900">{job.company}</span>
                      <span>·</span>
                      <span className="font-mono text-emerald-700">{job.salaryStipend}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Deadline: {job.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Stage Switcher */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <select
                      value={job.status}
                      onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
                      className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="saved">To Apply</option>
                      <option value="preparing">Preparing Materials</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="skipped">Skipped</option>
                    </select>

                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      PPA Kit
                    </button>
                  </div>
                </div>

                {/* Progress bar & Checklist preview */}
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">
                      Checklist Progress ({completedCount}/{job.checklist.length} items)
                    </span>
                    <span className="font-mono text-stone-700 font-bold">{progressPct}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {job.checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onToggleChecklist(job.id, item.id)}
                        className={`p-2 rounded-md border flex items-center gap-2 text-xs cursor-pointer transition-colors ${
                          item.completed
                            ? 'bg-emerald-50/70 border-emerald-200 text-stone-800'
                            : 'bg-stone-50 border-stone-200 hover:bg-white text-stone-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                            item.completed ? 'bg-emerald-600 text-white' : 'border border-stone-300 bg-white'
                          }`}
                        >
                          {item.completed && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                        <span className={`truncate ${item.completed ? 'line-through text-stone-400' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
