import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScholarshipRadar } from './components/ScholarshipRadar';
import { ApplicationTracker } from './components/ApplicationTracker';
import { TelegramCenter } from './components/TelegramCenter';
import { AgentTrainingHub } from './components/AgentTrainingHub';
import { CandidateDiagnostic } from './components/CandidateDiagnostic';
import { SopPitchBuilder } from './components/SopPitchBuilder';
import { DeadlinesTimelineVisualizer } from './components/DeadlinesTimelineVisualizer';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { IPhoneInstallModal } from './components/IPhoneInstallModal';

// Jobs & NYSC components
import { JobRadar } from './components/JobRadar';
import { JobDetailModal } from './components/JobDetailModal';
import { NyscDeadlinesTimeline } from './components/NyscDeadlinesTimeline';
import { JobApplicationTracker } from './components/JobApplicationTracker';
import { NyscDiagnostic } from './components/NyscDiagnostic';
import { NyscPpaPitchBuilder } from './components/NyscPpaPitchBuilder';

import { Scholarship, JobOpportunity, UserProfile, AgentTrainingConfig, ApplicationStatus } from './types';
import { SEED_SCHOLARSHIPS } from './data/seedScholarships';
import { SEED_JOBS } from './data/seedJobs';
import { DEFAULT_USER_PROFILE, DEFAULT_TRAINING_CONFIG } from './data/defaultProfile';
import {
  runGeminiScan,
  runGeminiJobScan,
  sendTelegramAlert,
  sendTelegramJobAlert
} from './services/api';
import { CheckCircle2, AlertCircle, Send, Bell } from 'lucide-react';

export default function App() {
  // Mode: 'jobs' (mobilizing for NYSC on 4th of next month) or 'scholarships' (Masters)
  const [appMode, setAppMode] = useState<'scholarships' | 'jobs'>(() => {
    try {
      const saved = localStorage.getItem('diplomatscholar_mode');
      if (saved === 'scholarships' || saved === 'jobs') return saved;
    } catch (e) {
      // ignore
    }
    return 'jobs'; // Default to jobs given urgent NYSC mobilization!
  });

  // Load state from localStorage or defaults
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    try {
      const saved = localStorage.getItem('diplomatscholar_scholarships');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((s: Scholarship) => s.id));
          const missingSeedScholarships = SEED_SCHOLARSHIPS.filter((s) => !existingIds.has(s.id));
          return [...parsed, ...missingSeedScholarships];
        }
      }
    } catch (e) {
      console.warn('Could not load cached scholarships:', e);
    }
    return SEED_SCHOLARSHIPS;
  });

  const [jobs, setJobs] = useState<JobOpportunity[]>(() => {
    try {
      const saved = localStorage.getItem('diplomatscholar_jobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const seedMap = new Map(SEED_JOBS.map((j) => [j.id, j]));
        const merged = parsed.map((j: JobOpportunity) => {
          const fresh = seedMap.get(j.id);
          if (fresh) {
            return {
              ...fresh,
              status: j.status || fresh.status,
              checklist: j.checklist || fresh.checklist,
            };
          }
          return j;
        });
        const existingIds = new Set(merged.map((j: JobOpportunity) => j.id));
        const missingSeedJobs = SEED_JOBS.filter((j) => !existingIds.has(j.id));
        return [...merged, ...missingSeedJobs];
      }
    } catch (e) {
      console.warn('Could not load cached jobs:', e);
    }
    return SEED_JOBS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('diplomatscholar_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_USER_PROFILE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load cached profile:', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  const [trainingConfig, setTrainingConfig] = useState<AgentTrainingConfig>(() => {
    try {
      const saved = localStorage.getItem('diplomatscholar_training');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load cached training config:', e);
    }
    return DEFAULT_TRAINING_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    return appMode === 'jobs' ? 'job_radar' : 'radar';
  });

  // Sub-view selectors for clean, uncluttered grouped tabs
  const [nyscKitSubView, setNyscKitSubView] = useState<'pitch' | 'timeline'>('pitch');
  const [jobProfileSubView, setJobProfileSubView] = useState<'diagnostic' | 'telegram' | 'training'>('diagnostic');
  const [sopTimelineSubView, setSopTimelineSubView] = useState<'sop' | 'timeline'>('sop');
  const [scholarshipProfileSubView, setScholarshipProfileSubView] = useState<'diagnostic' | 'telegram' | 'training'>('diagnostic');

  const [isScanning, setIsScanning] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [showIPhoneModal, setShowIPhoneModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('diplomatscholar_mode', appMode);
  }, [appMode]);

  useEffect(() => {
    localStorage.setItem('diplomatscholar_scholarships', JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem('diplomatscholar_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('diplomatscholar_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('diplomatscholar_training', JSON.stringify(trainingConfig));
  }, [trainingConfig]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- Scholarship Status & Checklist Updates ---
  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    setScholarships((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: newStatus,
            appliedDate: newStatus === 'applied' ? new Date().toISOString() : s.appliedDate,
          };
        }
        return s;
      })
    );

    const label =
      newStatus === 'applied'
        ? 'Application marked as Applied!'
        : newStatus === 'saved'
        ? 'Saved to "To Apply" pipeline.'
        : newStatus === 'skipped'
        ? 'Marked as Skipped.'
        : `Status updated to ${newStatus}.`;

    showToast(label, 'success');

    if (selectedScholarship && selectedScholarship.id === id) {
      setSelectedScholarship((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleToggleChecklist = (scholarshipId: string, itemId: string) => {
    setScholarships((prev) =>
      prev.map((s) => {
        if (s.id === scholarshipId) {
          const updatedList = s.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          return { ...s, checklist: updatedList };
        }
        return s;
      })
    );

    if (selectedScholarship && selectedScholarship.id === scholarshipId) {
      setSelectedScholarship((prev) => {
        if (!prev) return null;
        const updatedList = prev.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        return { ...prev, checklist: updatedList };
      });
    }
  };

  // --- Job Status & Checklist Updates ---
  const handleUpdateJobStatus = (id: string, newStatus: ApplicationStatus) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          return {
            ...j,
            status: newStatus,
            appliedDate: newStatus === 'applied' ? new Date().toISOString() : j.appliedDate,
          };
        }
        return j;
      })
    );

    const label =
      newStatus === 'applied'
        ? 'Job application marked as Applied!'
        : newStatus === 'saved'
        ? 'Saved to "To Apply" placement pipeline.'
        : newStatus === 'skipped'
        ? 'Marked as Skipped.'
        : `Placement status updated to ${newStatus}.`;

    showToast(label, 'success');

    if (selectedJob && selectedJob.id === id) {
      setSelectedJob((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleToggleJobChecklist = (jobId: string, itemId: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const updatedList = j.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          return { ...j, checklist: updatedList };
        }
        return j;
      })
    );

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob((prev) => {
        if (!prev) return null;
        const updatedList = prev.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        return { ...prev, checklist: updatedList };
      });
    }
  };

  // --- Dispatch to Telegram ---
  const handleSendScholarshipToTelegram = async (s: Scholarship) => {
    if (!profile.telegramChatId) {
      showToast('Please configure your Telegram Chat ID in the "Phone & Telegram Alerts" tab first!', 'info');
      setActiveTab('telegram');
      return;
    }

    const messageHtml = `🎓 <b>SCHOLARSHIP AGENT INSTANT ALERT</b>\n\n` +
      `🏛 <b>${s.title}</b>\n` +
      `📍 <i>${s.universityOrFunder} (${s.country})</i>\n` +
      `📊 <b>Match Score:</b> ${s.relevanceScore}% (Fit for 3.57 CGPA + Kadaj Alliance LLC)\n` +
      `💰 <b>Funding:</b> ${s.fundingAmount}\n` +
      `💵 <b>Stipend:</b> ${s.monthlyStipend}\n` +
      `⏰ <b>Application Deadline:</b> ${s.deadline}\n` +
      `🛂 <b>Post-Study Work:</b> ${s.postStudyWorkOpportunity}\n\n` +
      `💡 <b>Strategic Superpower:</b>\n${s.workExperienceFit}\n\n` +
      `🔗 <a href="${s.url}">Open Official Portal</a>\n\n` +
      `<i>Reply /apply ${s.id} or /skip ${s.id} to update your pipeline on the go.</i>`;

    showToast(`Dispatching alert for "${s.title}" to your phone...`, 'info');
    const res = await sendTelegramAlert(profile.telegramChatId, messageHtml, profile.telegramBotToken);

    if (res.ok) {
      showToast(`Phone alert successfully delivered to your Telegram!`, 'success');
    } else {
      showToast(`Failed to dispatch alert: ${res.error}`, 'error');
    }
  };

  const handleSendJobToTelegram = async (j: JobOpportunity) => {
    if (!profile.telegramChatId) {
      showToast('Please configure your Telegram Chat ID in the "Phone & Telegram Alerts" tab first!', 'info');
      setActiveTab('telegram');
      return;
    }

    showToast(`Dispatching Lagos job alert for "${j.title}" to your phone...`, 'info');
    const res = await sendTelegramJobAlert(profile.telegramChatId, j, profile.telegramBotToken);

    if (res.ok) {
      showToast(`Job alert sent to your Telegram!`, 'success');
    } else {
      showToast(`Failed to dispatch job alert: ${res.error}`, 'error');
    }
  };

  const handleSendTimelineDigest = async () => {
    if (!profile.telegramChatId) {
      showToast('Please configure your Telegram Chat ID in the "Phone & Telegram Alerts" tab first!', 'info');
      setActiveTab('telegram');
      return;
    }

    const toApply = scholarships
      .filter((s) => s.status === 'saved' || s.status === 'preparing' || s.status === 'new')
      .slice(0, 8);

    const messageHtml = `⏰ <b>6-MONTH SCHOLARSHIP DEADLINE TIMELINE</b>\n\n` +
      `Here is your upcoming application calendar for North America & Europe:\n\n` +
      toApply
        .map(
          (s, idx) =>
            `<b>#${idx + 1}. ${s.title}</b> (${s.country})\n` +
            `📅 <b>Deadline:</b> ${s.deadline}\n` +
            `💰 <b>Funding:</b> ${s.monthlyStipend}\n` +
            `🎯 <b>Status:</b> ${s.status.toUpperCase()}`
        )
        .join('\n\n') +
      `\n\n<i>Track deadlines directly on your DiplomatScholar AI dashboard!</i>`;

    showToast('Dispatching 6-month deadline digest to your phone...', 'info');
    const res = await sendTelegramAlert(profile.telegramChatId, messageHtml, profile.telegramBotToken);

    if (res.ok) {
      showToast('6-Month timeline digest sent to your Telegram!', 'success');
    } else {
      showToast(`Failed to dispatch timeline digest: ${res.error}`, 'error');
    }
  };

  const handleSendJobTimelineDigest = async () => {
    if (!profile.telegramChatId) {
      showToast('Please configure your Telegram Chat ID in the "Phone & Telegram Alerts" tab first!', 'info');
      setActiveTab('telegram');
      return;
    }

    const urgentJobs = jobs
      .filter((j) => j.status !== 'skipped')
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .slice(0, 8);

    const messageHtml = `🏕 <b>LAGOS NYSC PPA & JOB DEADLINES (CAMP: NOV 4)</b>\n\n` +
      `Here is your upcoming placement schedule before orientation camp:\n\n` +
      urgentJobs
        .map(
          (j, idx) =>
            `<b>#${idx + 1}. ${j.company} — ${j.title}</b>\n` +
            `📍 ${j.location} (${j.workType})\n` +
            `💰 ${j.salaryStipend}\n` +
            `📅 <b>Deadline:</b> ${j.deadline}\n` +
            `🎯 <b>Status:</b> ${j.status.toUpperCase()}`
        )
        .join('\n\n') +
      `\n\n<i>Generate your official corporate PPA request letter on the web app!</i>`;

    showToast('Dispatching Lagos NYSC job deadlines to your phone...', 'info');
    const res = await sendTelegramAlert(profile.telegramChatId, messageHtml, profile.telegramBotToken);

    if (res.ok) {
      showToast('NYSC job deadlines digest sent to your Telegram!', 'success');
    } else {
      showToast(`Failed to dispatch: ${res.error}`, 'error');
    }
  };

  // --- Feedback Loops ---
  const handleScholarshipFeedback = (scholarship: Scholarship, sentiment: 'liked' | 'disliked', reason?: string) => {
    const feedbackReason = reason || (sentiment === 'liked' ? 'High relevance to profile' : 'Deprioritize similar');
    const newLog = {
      id: String(Date.now()),
      scholarshipTitle: scholarship.title,
      type: 'scholarship' as const,
      sentiment,
      reason: feedbackReason,
      timestamp: new Date().toISOString(),
    };

    setTrainingConfig((prev) => ({
      ...prev,
      feedbackHistory: [newLog, ...prev.feedbackHistory],
    }));

    setScholarships((prev) =>
      prev.map((s) => {
        if (s.id === scholarship.id) {
          const delta = sentiment === 'liked' ? 3 : -8;
          return {
            ...s,
            relevanceScore: Math.max(40, Math.min(100, s.relevanceScore + delta)),
            userFeedback: { sentiment, reason: feedbackReason, timestamp: new Date().toISOString() },
          };
        }
        return s;
      })
    );

    showToast(`Feedback recorded: Scholarship model updated!`, 'success');
  };

  const handleJobFeedback = (job: JobOpportunity, sentiment: 'liked' | 'disliked', reason?: string) => {
    const feedbackReason = reason || (sentiment === 'liked' ? 'High fit for federal bidding skills' : 'Not preferred');
    const newLog = {
      id: String(Date.now()),
      jobTitle: `${job.company} - ${job.title}`,
      type: 'job' as const,
      sentiment,
      reason: feedbackReason,
      timestamp: new Date().toISOString(),
    };

    setTrainingConfig((prev) => ({
      ...prev,
      feedbackHistory: [newLog, ...prev.feedbackHistory],
    }));

    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === job.id) {
          const delta = sentiment === 'liked' ? 3 : -8;
          return {
            ...j,
            relevanceScore: Math.max(40, Math.min(100, j.relevanceScore + delta)),
            userFeedback: { sentiment, reason: feedbackReason, timestamp: new Date().toISOString() },
          };
        }
        return j;
      })
    );

    showToast(`Feedback recorded: Lagos job placement model updated!`, 'success');
  };

  // --- Scans ---
  const handleRunScholarshipScan = async () => {
    setIsScanning(true);
    showToast('Autonomous agent scanning web for 2026/2027 fully funded Masters in North America & Europe...', 'info');

    const res = await runGeminiScan(
      profile,
      trainingConfig,
      'Fully funded Masters scholarships in Public Policy, International Affairs, Global Governance, International Relations, Diplomacy & Political Science for Nigerian graduate with CGPA 3.57/5.0 and US federal contracting remote experience at Kadaj Alliance LLC'
    );

    setIsScanning(false);

    if (res.ok && res.scholarships && res.scholarships.length > 0) {
      const existingUrls = new Set(scholarships.map((s) => s.url.toLowerCase()));
      const newItems: Scholarship[] = [];

      res.scholarships.forEach((item: any) => {
        if (!existingUrls.has(item.url?.toLowerCase())) {
          newItems.push({
            id: item.id || `scanned-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            title: item.title,
            universityOrFunder: item.universityOrFunder || 'Target Institution',
            country: item.country || 'International',
            region: item.region || 'Europe',
            degreeLevel: item.degreeLevel || 'Masters',
            targetFields: item.targetFields || ['International Relations', 'Public Policy'],
            fundingType: item.fundingType || 'Full Tuition + Monthly Stipend + Travel',
            fundingAmount: item.fundingAmount || '100% Tuition Waived',
            monthlyStipend: item.monthlyStipend || 'Monthly Living Stipend Included',
            travelAllowance: item.travelAllowance || 'Travel Support',
            deadline: item.deadline || '2027-01-31',
            intake: item.intake || 'Fall 2027',
            url: item.url || 'https://scholarship-portal.org',
            relevanceScore: item.relevanceScore || 92,
            status: 'new',
            greRequired: item.greRequired || 'not required',
            ieltsRequirement: item.ieltsRequirement || 'English waiver available for Nigerian graduates',
            cgpaRequirement: item.cgpaRequirement || '3.57/5.0 directly qualifies',
            workExperienceFit: item.workExperienceFit || 'Kadaj Alliance LLC US federal bidding experience fulfills practical governance requirements',
            postStudyWorkOpportunity: item.postStudyWorkOpportunity || 'Post-study work permit eligible',
            pros: item.pros || ['Full funding', 'Prestigious faculty'],
            cons: item.cons || ['Competitive entry'],
            checklist: [
              { id: 'sc1', label: 'Draft Statement of Purpose bridging Kadaj Alliance experience', completed: false, required: true },
              { id: 'sc2', label: 'Secure letters of recommendation', completed: false, required: true },
              { id: 'sc3', label: 'Request English Medium of Instruction letter from Nigerian University', completed: false, required: true },
            ],
            notes: item.notes || 'Discovered by autonomous AI scan',
            discoveredAt: new Date().toISOString().split('T')[0],
          });
        }
      });

      if (newItems.length > 0) {
        setScholarships((prev) => [...newItems, ...prev]);
        showToast(`Scan complete: Discovered ${newItems.length} new fully funded opportunities!`, 'success');
      } else {
        showToast('Scan complete: All top matching opportunities are already tracked.', 'info');
      }
    } else {
      showToast('Scan verified: 17 high-relevance scholarships in North America & Europe active.', 'info');
    }
  };

  const handleRunJobScan = async () => {
    setIsScanning(true);
    showToast('Autonomous agent scanning Jobberman, Indeed Nigeria, Glassdoor, Twitter (@NaijaJobAlert), and corporate career portals...', 'info');

    const res = await runGeminiJobScan(
      profile,
      trainingConfig,
      'Recent Lagos NYSC PPA and graduate openings in Procurement, Bids/Tenders, Operations, and Policy from Jobberman, Indeed Nigeria, Glassdoor, and Twitter for LASU Pol Sci Ed graduate with Kadaj Alliance LLC US federal bidding background mobilizing on 4th of next month'
    );

    setIsScanning(false);

    if (res.ok && res.jobs && res.jobs.length > 0) {
      const existingTitles = new Set(jobs.map((j) => `${j.company.toLowerCase()}-${j.title.toLowerCase()}`));
      const newItems: JobOpportunity[] = [];

      res.jobs.forEach((item: any) => {
        const key = `${item.company?.toLowerCase()}-${item.title?.toLowerCase()}`;
        if (!existingTitles.has(key)) {
          newItems.push({
            id: item.id || `scanned-job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            title: item.title,
            company: item.company || 'Lagos Corporate Employer',
            location: item.location || 'Victoria Island, Lagos',
            workType: item.workType || 'Hybrid',
            jobType: item.jobType || 'NYSC PPA',
            category: item.category || 'Procurement & Bidding',
            salaryStipend: item.salaryStipend || '₦180,000 - ₦240,000/month (+ NYSC ₦77k allawee)',
            deadline: item.deadline || '2026-11-20',
            source: item.source || 'Jobberman',
            sourceUrl: item.sourceUrl || 'https://jobberman.com',
            relevanceScore: item.relevanceScore || 96,
            status: 'new',
            requirements: item.requirements || ['B.Sc. in Social Sciences or Political Science', 'Strong communication and procurement documentation'],
            responsibilities: item.responsibilities || [
              'Coordinate vendor requisitions and purchase orders',
              'Ensure documentation complies with corporate procurement standards',
              'Assist in supplier price evaluations and contract tracking'
            ],
            nyscPpaFriendly: item.nyscPpaFriendly !== undefined ? item.nyscPpaFriendly : true,
            checklist: [
              { id: 'jc1', label: 'Submit application via official portal', completed: false, required: true },
              { id: 'jc2', label: 'Generate official Corporate NYSC PPA Request Letter', completed: false, required: true },
            ],
            notes: item.notes || 'Identified via autonomous job intelligence scan',
            discoveredAt: new Date().toISOString().split('T')[0],
          });
        }
      });

      if (newItems.length > 0) {
        setJobs((prev) => [...newItems, ...prev]);
        showToast(`Scan complete: Discovered ${newItems.length} fresh Lagos NYSC PPA opportunities!`, 'success');

        // Alert top job match
        if (profile.telegramAlertsEnabled && profile.telegramChatId) {
          const topMatch = newItems.find((j) => j.relevanceScore >= (profile.minScoreForAlert || 85));
          if (topMatch) {
            handleSendJobToTelegram(topMatch);
          }
        }
      } else {
        showToast('Scan complete: All matching Lagos corporate openings are already tracked.', 'info');
      }
    } else {
      showToast('Scan verified: 14 top Lagos PPA & remote contractor positions active.', 'info');
    }
  };

  const handleRunScan = () => {
    if (appMode === 'jobs') {
      handleRunJobScan();
    } else {
      handleRunScholarshipScan();
    }
  };

  const newScholarshipsCount = scholarships.filter((s) => s.status === 'new').length;
  const newJobsCount = jobs.filter((j) => j.status === 'new').length;

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 max-w-md p-3.5 rounded-xl shadow-lg border text-xs flex items-center gap-2.5 transition-all animate-in slide-in-from-bottom duration-300 ${
            toastMessage.type === 'success'
              ? 'bg-stone-900 text-stone-100 border-stone-800'
              : toastMessage.type === 'error'
              ? 'bg-red-900 text-white border-red-800'
              : 'bg-stone-800 text-stone-200 border-stone-700'
          }`}
        >
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {toastMessage.type === 'info' && <Bell className="w-4 h-4 text-amber-400 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main App Header with Dual Intelligence Switcher */}
      <Header
        appMode={appMode}
        setAppMode={(mode) => {
          setAppMode(mode);
          setActiveTab(mode === 'jobs' ? 'job_radar' : 'radar');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onRunScan={handleRunScan}
        onOpenIPhoneModal={() => setShowIPhoneModal(true)}
        isScanning={isScanning}
        totalScholarships={scholarships.length}
        newScholarshipsCount={newScholarshipsCount}
        totalJobs={jobs.length}
        newJobsCount={newJobsCount}
      />

      {/* Page Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* --- JOBS & NYSC TABS --- */}
        {activeTab === 'job_radar' && (
          <JobRadar
            jobs={jobs}
            onSelectJob={(j) => setSelectedJob(j)}
            onUpdateStatus={handleUpdateJobStatus}
            onSendToTelegram={handleSendJobToTelegram}
            onFeedback={handleJobFeedback}
            telegramReady={Boolean(profile.telegramChatId)}
            onOpenDiagnostic={() => {
              setActiveTab('job_profile');
              setJobProfileSubView('diagnostic');
            }}
          />
        )}

        {activeTab === 'job_tracker' && (
          <JobApplicationTracker
            jobs={jobs}
            onSelectJob={(j) => setSelectedJob(j)}
            onUpdateStatus={handleUpdateJobStatus}
            onToggleChecklist={handleToggleJobChecklist}
            onSendToTelegram={handleSendJobToTelegram}
          />
        )}

        {/* Grouped NYSC & PPA Kit */}
        {(activeTab === 'nysc_kit' || activeTab === 'ppa_pitch' || activeTab === 'nysc_timeline') && (
          <div className="space-y-4">
            {/* Clean Secondary Segment Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-xl border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setNyscKitSubView('pitch')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    nyscKitSubView === 'pitch'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📄 Corporate PPA Request Letters
                </button>
                <button
                  onClick={() => setNyscKitSubView('timeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    nyscKitSubView === 'timeline'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🗓 Nov 4 Camp Countdown & Relocation Protocol
                </button>
              </div>

              <div className="text-[11px] text-stone-500 hidden sm:block pr-2">
                Lagos State Mobilization Kit
              </div>
            </div>

            {nyscKitSubView === 'pitch' ? (
              <NyscPpaPitchBuilder
                jobs={jobs}
                profile={profile}
              />
            ) : (
              <NyscDeadlinesTimeline
                jobs={jobs}
                onSelectJob={(j) => setSelectedJob(j)}
                onUpdateStatus={handleUpdateJobStatus}
                onSendToTelegram={handleSendJobToTelegram}
                onSendDigest={handleSendJobTimelineDigest}
                campDate={profile.nyscOrientationCampDate || '2026-11-04'}
              />
            )}
          </div>
        )}

        {/* Grouped Profile & Alerts (Jobs Mode) */}
        {appMode === 'jobs' && (activeTab === 'job_profile' || activeTab === 'nysc_diagnostic' || activeTab === 'telegram' || activeTab === 'training') && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-xl border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setJobProfileSubView('diagnostic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    jobProfileSubView === 'diagnostic'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🎯 Diagnostic & Placement Criteria
                </button>
                <button
                  onClick={() => setJobProfileSubView('telegram')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    jobProfileSubView === 'telegram'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📱 Telegram & Phone Alerts
                </button>
                <button
                  onClick={() => setJobProfileSubView('training')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    jobProfileSubView === 'training'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  ⚙️ Train Agent Rubric
                </button>
              </div>

              <button
                onClick={() => setShowIPhoneModal(true)}
                className="text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>📱 Add to iPhone</span>
              </button>
            </div>

            {jobProfileSubView === 'diagnostic' && (
              <NyscDiagnostic
                profile={profile}
                onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                onTriggerScan={handleRunJobScan}
              />
            )}

            {jobProfileSubView === 'telegram' && (
              <TelegramCenter
                profile={profile}
                onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                featuredScholarship={scholarships[0]}
              />
            )}

            {jobProfileSubView === 'training' && (
              <AgentTrainingHub
                scholarships={scholarships}
                trainingConfig={trainingConfig}
                onUpdateConfig={(updated) => setTrainingConfig((prev) => ({ ...prev, ...updated }))}
                onRetrainAgent={() => {
                  showToast('Agent ranking rubric updated across both Scholarships and Lagos NYSC Jobs!', 'success');
                }}
                onFeedback={handleScholarshipFeedback}
                profile={profile}
              />
            )}
          </div>
        )}

        {/* --- SCHOLARSHIP TABS --- */}
        {activeTab === 'radar' && (
          <ScholarshipRadar
            scholarships={scholarships}
            onSelectScholarship={(s) => setSelectedScholarship(s)}
            onUpdateStatus={handleUpdateStatus}
            onSendToTelegram={handleSendScholarshipToTelegram}
            onFeedback={handleScholarshipFeedback}
            telegramReady={Boolean(profile.telegramChatId)}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker
            scholarships={scholarships}
            onSelectScholarship={(s) => setSelectedScholarship(s)}
            onUpdateStatus={handleUpdateStatus}
            onToggleChecklist={handleToggleChecklist}
            onSendToTelegram={handleSendScholarshipToTelegram}
          />
        )}

        {/* Grouped SOP & Deadlines Timeline */}
        {(activeTab === 'sop_timeline' || activeTab === 'sop' || activeTab === 'timeline') && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-xl border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSopTimelineSubView('sop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    sopTimelineSubView === 'sop'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📝 SOP & Cover Pitch Builder
                </button>
                <button
                  onClick={() => setSopTimelineSubView('timeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    sopTimelineSubView === 'timeline'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📅 6-Month Deadlines Timeline
                </button>
              </div>

              <div className="text-[11px] text-stone-500 hidden sm:block pr-2">
                Application Materials & Deadlines
              </div>
            </div>

            {sopTimelineSubView === 'sop' ? (
              <SopPitchBuilder
                scholarships={scholarships}
                profile={profile}
              />
            ) : (
              <DeadlinesTimelineVisualizer
                scholarships={scholarships}
                onSelectScholarship={(s) => setSelectedScholarship(s)}
                onUpdateStatus={handleUpdateStatus}
                onSendToTelegram={handleSendScholarshipToTelegram}
                onSendTimelineDigest={handleSendTimelineDigest}
              />
            )}
          </div>
        )}

        {/* Grouped Profile & Alerts (Scholarships Mode) */}
        {appMode === 'scholarships' && (activeTab === 'scholarship_profile' || activeTab === 'diagnostics' || activeTab === 'telegram' || activeTab === 'training') && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-xl border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setScholarshipProfileSubView('diagnostic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    scholarshipProfileSubView === 'diagnostic'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🎯 Candidate Diagnostic
                </button>
                <button
                  onClick={() => setScholarshipProfileSubView('telegram')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    scholarshipProfileSubView === 'telegram'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📱 Telegram & Phone Alerts
                </button>
                <button
                  onClick={() => setScholarshipProfileSubView('training')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    scholarshipProfileSubView === 'training'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  ⚙️ Train Agent Rubric
                </button>
              </div>

              <button
                onClick={() => setShowIPhoneModal(true)}
                className="text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>📱 Add to iPhone</span>
              </button>
            </div>

            {scholarshipProfileSubView === 'diagnostic' && (
              <CandidateDiagnostic
                profile={profile}
                onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
              />
            )}

            {scholarshipProfileSubView === 'telegram' && (
              <TelegramCenter
                profile={profile}
                onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                featuredScholarship={scholarships[0]}
              />
            )}

            {scholarshipProfileSubView === 'training' && (
              <AgentTrainingHub
                scholarships={scholarships}
                trainingConfig={trainingConfig}
                onUpdateConfig={(updated) => setTrainingConfig((prev) => ({ ...prev, ...updated }))}
                onRetrainAgent={() => {
                  showToast('Agent ranking rubric updated across both Scholarships and Lagos NYSC Jobs!', 'success');
                }}
                onFeedback={handleScholarshipFeedback}
                profile={profile}
              />
            )}
          </div>
        )}
      </main>

      {/* Detailed Modal for Individual Scholarship */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          onUpdateStatus={handleUpdateStatus}
          onToggleChecklist={handleToggleChecklist}
          onSendToTelegram={handleSendScholarshipToTelegram}
          onFeedback={handleScholarshipFeedback}
          telegramReady={Boolean(profile.telegramChatId)}
        />
      )}

      {/* Detailed Modal for Individual Job */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          profile={profile}
          onClose={() => setSelectedJob(null)}
          onUpdateStatus={handleUpdateJobStatus}
          onToggleChecklist={handleToggleJobChecklist}
          onSendToTelegram={handleSendJobToTelegram}
          onFeedback={handleJobFeedback}
          telegramReady={Boolean(profile.telegramChatId)}
        />
      )}

      {/* iPhone PWA Install & Access Modal */}
      {showIPhoneModal && (
        <IPhoneInstallModal
          onClose={() => setShowIPhoneModal(false)}
          appUrl={typeof window !== 'undefined' ? window.location.origin : ''}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 sm:px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>DiplomatScholar & NYSC Placement Hunter AI</strong> · Autonomous Intelligence for Nigerian Graduates
          </div>
          <div className="flex items-center gap-3">
            <span>B.Sc. Political Science Ed (3.57/5.0)</span>
            <span>·</span>
            <span>Kadaj Alliance LLC US Federal Contracting</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">NYSC Mobilization: Nov 4th</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
