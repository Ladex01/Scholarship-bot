import React from 'react';
import { RefreshCw, Briefcase, GraduationCap, Smartphone, Check, Send } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  appMode: 'scholarships' | 'jobs';
  setAppMode: (mode: 'scholarships' | 'jobs') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
  onRunScan: () => void;
  onOpenIPhoneModal: () => void;
  isScanning: boolean;
  totalScholarships: number;
  newScholarshipsCount: number;
  totalJobs: number;
  newJobsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  activeTab,
  setActiveTab,
  profile,
  onRunScan,
  onOpenIPhoneModal,
  isScanning,
  totalScholarships,
  totalJobs,
}) => {
  const telegramConnected = Boolean(profile.telegramChatId && profile.telegramChatId.trim().length > 0);

  // Clean 4 primary tabs per mode
  const jobNavTabs = [
    { id: 'job_radar', label: 'Opportunities', count: totalJobs },
    { id: 'job_tracker', label: 'Applications Pipeline' },
    { id: 'nysc_kit', label: 'NYSC & PPA Kit' },
    { id: 'job_profile', label: 'Profile & Alerts' },
  ];

  const scholarshipNavTabs = [
    { id: 'radar', label: 'Scholarships', count: totalScholarships },
    { id: 'tracker', label: 'Pipeline & Deadlines' },
    { id: 'sop_timeline', label: 'SOP Pitch Builder' },
    { id: 'scholarship_profile', label: 'Profile & Alerts' },
  ];

  const currentTabs = appMode === 'jobs' ? jobNavTabs : scholarshipNavTabs;

  const isTabActive = (tabId: string) => {
    if (activeTab === tabId) return true;
    if (tabId === 'nysc_kit' && (activeTab === 'nysc_timeline' || activeTab === 'ppa_pitch')) return true;
    if (tabId === 'job_profile' && (activeTab === 'nysc_diagnostic' || activeTab === 'telegram' || activeTab === 'training')) return true;
    if (tabId === 'sop_timeline' && (activeTab === 'timeline' || activeTab === 'sop')) return true;
    if (tabId === 'scholarship_profile' && (activeTab === 'diagnostics' || activeTab === 'telegram' || activeTab === 'training')) return true;
    return false;
  };

  return (
    <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand with New Dedicated Electric-Blue App Icon */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onOpenIPhoneModal} title="Install on iPhone">
            <img
              src="/icon.svg"
              alt="DiplomatScholar Icon"
              className="w-9 h-9 rounded-xl shadow-xs ring-1 ring-sky-500/20 transition-transform group-hover:scale-105"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base">
                DiplomatScholar
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-semibold text-sky-600">
                {appMode === 'jobs' ? 'NYSC Lagos & Remote' : 'Fully Funded Masters'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {appMode === 'jobs'
                ? 'Lagos Mainland ₦70k+ · Island · US Remote Contracts · PPA Letter Kit'
                : 'International Relations & Diplomacy · North America & Europe · 100% Tuition Waived'}
            </p>
          </div>
        </div>

        {/* Center: Clean Segmented Mode Selector */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              setAppMode('jobs');
              setActiveTab('job_radar');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              appMode === 'jobs'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-sky-600" />
            <span>Lagos Jobs & NYSC</span>
            <span className="text-[10px] text-slate-400 font-mono">({totalJobs})</span>
          </button>

          <button
            onClick={() => {
              setAppMode('scholarships');
              setActiveTab('radar');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              appMode === 'scholarships'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Scholarships</span>
            <span className="text-[10px] text-slate-400 font-mono">({totalScholarships})</span>
          </button>
        </div>

        {/* Right Actions: Clean, refined, non-intrusive */}
        <div className="flex items-center gap-2">
          {/* Telegram Status Pill */}
          {telegramConnected && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>@Folascholarshipbot</span>
            </div>
          )}

          {/* Add to iPhone button */}
          <button
            onClick={onOpenIPhoneModal}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Install app icon on iPhone Home Screen"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Add to iPhone</span>
            <span className="sm:hidden">iPhone</span>
          </button>

          {/* Clean Live Scan Button */}
          <button
            onClick={onRunScan}
            disabled={isScanning}
            className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-xl text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Live Scan'}</span>
          </button>
        </div>
      </div>

      {/* Secondary Clean Navigation */}
      <div className="border-t border-slate-200/80 bg-slate-50/50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto py-1 scrollbar-none">
          {/* Mobile Mode Switcher */}
          <div className="flex sm:hidden items-center gap-1 shrink-0 py-0.5">
            <button
              onClick={() => {
                setAppMode('jobs');
                setActiveTab('job_radar');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                appMode === 'jobs' ? 'bg-sky-600 text-white' : 'text-slate-600'
              }`}
            >
              Jobs ({totalJobs})
            </button>
            <button
              onClick={() => {
                setAppMode('scholarships');
                setActiveTab('radar');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                appMode === 'scholarships' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              Scholarships ({totalScholarships})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {currentTabs.map((tab) => {
              const active = isTabActive(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-1.5 px-3 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="text-[10px] text-slate-400 font-normal">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
