export type Region = 'North America' | 'Europe' | 'UK' | 'Global';

export type FundingType = 
  | 'Full Tuition + Monthly Stipend + Travel'
  | 'Full Tuition + Monthly Stipend + Travel + Health Insurance'
  | 'Full Scholarship (Tuition + Monthly Stipend + Travel)'
  | 'Full Tuition + Living Grant'
  | 'Full Tuition + GTA/GRA Salary'
  | 'Full Tuition Waiver'
  | 'Full Tuition Merit Fellowship + Graduate Assistantship'
  | 'Full Course Fees + Living Costs Grant'
  | 'Tuition Grant + Living Allowance'
  | 'Tuition Fellowship + Teaching Assistantship'
  | (string & {});

export type ApplicationStatus = 
  | 'new'
  | 'saved'
  | 'preparing'
  | 'applied'
  | 'under_review'
  | 'interview'
  | 'admitted'
  | 'skipped';

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  universityOrFunder: string;
  country: string;
  region: Region;
  degreeLevel: string;
  targetFields: string[];
  fundingType: FundingType;
  fundingAmount: string;
  monthlyStipend: string;
  travelAllowance?: string;
  deadline: string; // ISO date YYYY-MM-DD
  intake: string;
  url: string;
  relevanceScore: number; // 0 - 100
  status: ApplicationStatus;
  greRequired: 'not required' | 'waived' | 'required' | (string & {});
  ieltsRequirement: string;
  cgpaRequirement: string;
  workExperienceFit: string;
  postStudyWorkOpportunity: string;
  pros: string[];
  cons: string[];
  checklist: ChecklistItem[];
  notes: string;
  appliedDate?: string;
  discoveredAt: string;
  sourceHandle?: string; // e.g. '@scholarsregion'
  specCrossReference?: {
    degreeFit: string;
    cgpaAudit: string;
    workExpAudit: string;
    testAudit: string;
    postStudyAudit: string;
    verdict: 'EXCELLENT SPEC MATCH' | 'HIGH SPEC MATCH' | 'CONDITIONAL SPEC MATCH';
  };
  userFeedback?: {
    sentiment: 'liked' | 'disliked';
    reason: string;
    timestamp: string;
  };
}

export type JobWorkType = 'Onsite' | 'Hybrid' | 'Remote';
export type JobCategory = 
  | 'Procurement & Bidding'
  | 'Administrative & Operations'
  | 'Research & Public Policy'
  | 'Executive Assistance & Logistics'
  | 'Public Policy & Diplomacy'
  | 'Operations & SCM'
  | (string & {});

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: JobWorkType;
  jobType: 'NYSC PPA' | 'Graduate Trainee' | 'Entry-Level' | 'Remote Contractor';
  category: JobCategory;
  salaryStipend: string;
  deadline: string;
  source: string;
  sourceUrl: string;
  officialPortalUrl?: string;
  relevanceScore: number;
  status: ApplicationStatus;
  roleSummary?: string;
  responsibilities?: string[];
  requirements: string[];
  benefits?: string[];
  whyAdefolabiFits?: string;
  nyscPpaFriendly: boolean;
  contactEmail?: string;
  checklist: ChecklistItem[];
  notes: string;
  appliedDate?: string;
  discoveredAt: string;
  postedDate?: string;
  userFeedback?: {
    sentiment: 'liked' | 'disliked';
    reason: string;
    timestamp: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  nationality: string;
  undergradDegree: string;
  graduationDate: string;
  cgpa: number;
  cgpaScale: number;
  usEquivCgpa: number;
  workExperienceYears: number;
  company: string;
  role: string;
  roleDescription: string;
  targetFields: string[];
  targetRegions: string[];
  passportReady: boolean;
  academicReferees: number;
  professionalReferees: number;
  hasEnglishMediumLetter: boolean;
  budgetForFees: string;
  targetIntake: string;
  telegramBotToken: string;
  telegramChatId: string;
  telegramAlertsEnabled: boolean;
  instantHighMatchAlert: boolean;
  minScoreForAlert: number;
  // NYSC Mobilization & Lagos Job Preferences
  nyscOrientationCampDate?: string; // '2026-11-04'
  nyscState?: string; // 'Lagos State'
  targetJobRoles?: string[];
  preferredLagosLocations?: string[];
  targetJobTypes?: ('NYSC PPA' | 'Graduate Trainee' | 'Entry-Level' | 'Remote Contractor')[];
  minimumAcceptableStipend?: string;
  hasCallUpLetter?: boolean;
  applyingCampRelocation?: boolean;
  wantsRemoteUsContract?: boolean;
  relocationStrategyNotes?: string;
}

export interface AgentTrainingConfig {
  likedKeywords: string[];
  dislikedKeywords: string[];
  likedSources: string[];
  dislikedSources: string[];
  priorityWeights: {
    fullFundingWeight: number;       // 1 - 10
    postStudyWorkWeight: number;     // 1 - 10
    noGreWeight: number;             // 1 - 10
    englishWaiverWeight: number;     // 1 - 10
    workExpFitWeight: number;        // 1 - 10
  };
  customInstructions: string;
  jobTraining?: {
    likedKeywords: string[];
    dislikedKeywords: string[];
    priorityWeights: {
      nyscPpaWeight: number;        // 1 - 10
      stipendWeight: number;        // 1 - 10
      biddingExperienceWeight: number; // 1 - 10
      remoteFlexibilityWeight: number; // 1 - 10
      islandVsMainlandWeight: number;  // 1 - 10
    };
    customInstructions: string;
  };
  feedbackHistory: {
    id: string;
    scholarshipTitle?: string;
    jobTitle?: string;
    type?: 'scholarship' | 'job';
    sentiment: 'liked' | 'disliked';
    reason: string;
    timestamp: string;
  }[];
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  rationale: string;
  category: 'academic' | 'financial' | 'career' | 'readiness';
  options: string[];
  selectedAnswer?: string;
}
