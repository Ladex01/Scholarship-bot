import { DiagnosticQuestion } from '../types';

export const NYSC_JOB_DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'lagos_commute_zone',
    question: 'Which Lagos geographic location works best for your daily commute?',
    rationale: 'Mainland hubs (Ikeja, Yaba, Maryland, Ilupeju, Surulere, Gbagada, Isolo) offer great proximity and reduced transit time from LASU/Ojo/Ikeja, while Island hubs (VI, Lekki, Ikoyi) provide multinational corporate headquarters.',
    category: 'career',
    options: [
      'Mainland & Island Equal: Open to Mainland (Ikeja/Yaba/Maryland/Surulere) & Island as long as paid well (₦70k+)',
      'Mainland Preferred (Ikeja / Yaba / Maryland / Surulere / Ilupeju) for easier commute',
      'Island Preferred (Victoria Island / Lekki / Ikoyi) for maximum corporate prestige',
      'Strictly Remote / Hybrid (2 days onsite max)'
    ],
    selectedAnswer: 'Mainland & Island Equal: Open to Mainland (Ikeja/Yaba/Maryland/Surulere) & Island as long as paid well (₦70k+)'
  },
  {
    id: 'nysc_callup_status',
    question: 'What is the current status of your NYSC mobilization for the 4th of next month?',
    rationale: 'Knowing you do not have a call-up letter yet and plan to apply for relocation in camp triggers our specialized "Camp Relocation & PPA Endorsement Protocol".',
    category: 'readiness',
    options: [
      'Awaiting call-up release: Will apply for relocation to Lagos State during orientation camp',
      'Posted directly to Lagos State (Green Card & Call-Up Letter confirmed)',
      'Relocating on medical or marital grounds strictly'
    ],
    selectedAnswer: 'Awaiting call-up release: Will apply for relocation to Lagos State during orientation camp'
  },
  {
    id: 'camp_relocation_channel',
    question: 'Which relocation strategy will you deploy inside camp to secure posting to Lagos?',
    rationale: 'NYSC camp relocation requires formal justification. Having a verified Corporate PPA Request Letter from a Lagos firm dramatically increases approval rates at the Camp Director desk.',
    category: 'readiness',
    options: [
      'Corporate PPA Request Letter from Lagos employer + Medical Certificate (Recommended)',
      'Corporate PPA Request Letter directly addressed to Lagos State Coordinator',
      'Medical Grounds Certificate from government hospital',
      'NYSC Camp Officials / OBS / Orientation Broadcasting Service fast-track'
    ],
    selectedAnswer: 'Corporate PPA Request Letter from Lagos employer + Medical Certificate (Recommended)'
  },
  {
    id: 'dual_income_remote',
    question: 'What is your priority for a Remote US Federal Proposal & Bidding contract?',
    rationale: 'Leveraging your 1-year Kadaj Alliance LLC background (SAM.gov, FAR compliance, RFQ emails, vendor registers) provides USD income ($600 - $1,200/mo ~ ₦900k - ₦1.8M/mo) alongside your physical Lagos PPA.',
    category: 'financial',
    options: [
      'High Priority: Remote US proposal contract is as important as the NYSC PPA itself',
      'Moderate Priority: Nice to have if workload allows (10-15 hrs/week)',
      'Focus solely on Lagos PPA for the first 3 months of NYSC'
    ],
    selectedAnswer: 'High Priority: Remote US proposal contract is as important as the NYSC PPA itself'
  },
  {
    id: 'minimum_stipend',
    question: 'What is your minimum acceptable PPA monthly stipend to broaden your search?',
    rationale: 'Lowering the minimum threshold to ₦70,000/mo broadens your opportunities to over 20+ verified corporate PPAs on both Mainland and Island, plus the federal ₦77,000 allawee (Total take-home: ₦147k - ₦380k/mo).',
    category: 'financial',
    options: [
      '₦70,000/month minimum (Broadened: Covers Mainland & Island Corporates, FMCG, Tech + ₦77k allawee)',
      '₦100,000 - ₦150,000/month (Mid-tier corporate benchmark)',
      '₦150,000 - ₦250,000/month (Top FMCG & Big 4 benchmark)',
      'Above ₦250,000/month or USD-denominated'
    ],
    selectedAnswer: '₦70,000/month minimum (Broadened: Covers Mainland & Island Corporates, FMCG, Tech + ₦77k allawee)'
  },
  {
    id: 'role_focus_priority',
    question: 'Which functional job roles do you want to prioritize in your expanded search?',
    rationale: 'Aligning this directs our AI crawler to scan Jobberman, Indeed, Glassdoor, and Twitter for Procurement, Bids/Proposals, Operations, and Policy opportunities.',
    category: 'career',
    options: [
      'Procurement, Sourcing & Bid Specialist (Kadaj Alliance + US RFP expertise)',
      'Dual: Commercial Operations Analyst (PLSMINDS) + Procurement Officer',
      'Public Policy & Governance Analyst (LASU Political Science Education degree)',
      'All of the above (Full cross-functional coverage)'
    ],
    selectedAnswer: 'Procurement, Sourcing & Bid Specialist (Kadaj Alliance + US RFP expertise)'
  }
];
