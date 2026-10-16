import { UserProfile, AgentTrainingConfig } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Adefolabi Ladejobi (@Famzy01)',
  email: 'ladjob2864@gmail.com',
  nationality: 'Nigerian',
  undergradDegree: 'Bachelor of Science in Political Science Education (Lagos State University / LASU)',
  graduationDate: 'October 2025',
  cgpa: 3.57,
  cgpaScale: 5.0,
  usEquivCgpa: 3.12, // WES / ECTS calculated equivalent
  workExperienceYears: 2,
  company: 'Kadaj Alliance LLC & PLSMINDS Lagos',
  role: 'Procurement Specialist & Administrative Officer',
  roleDescription: 'Hands-on experience in U.S. federal procurement (SAM.gov, RFQ, FAR regulations, vendor matching) at Kadaj Alliance LLC, plus Lagos e-commerce administrative management, product listing quality assurance, and market research at PLSMINDS.',
  targetFields: [
    'Procurement & Supply Chain Management',
    'Bid & Proposal Administration',
    'Administrative Operations & Executive Support',
    'International Relations & Public Policy',
    'Global Governance & Diplomacy'
  ],
  targetRegions: ['Canada', 'USA', 'United Kingdom', 'Germany', 'Sweden', 'Ireland', 'Belgium', 'France', 'Switzerland', 'Austria'],
  passportReady: true,
  academicReferees: 2,
  professionalReferees: 1, // Kadaj Alliance supervisor
  hasEnglishMediumLetter: true,
  budgetForFees: '$0 - Low (Prioritizing $0 application fee waivers & fully sponsored programs)',
  targetIntake: 'Fall 2026 / Fall 2027',
  telegramBotToken: '8854756208:AAGmabFVzYUvPPsyQcCm65OLCIVyBQaNcDQ',
  telegramChatId: '1197221643',
  telegramAlertsEnabled: true,
  instantHighMatchAlert: true,
  minScoreForAlert: 85,
  nyscOrientationCampDate: '2026-11-04',
  nyscState: 'Lagos State',
  targetJobRoles: [
    'Procurement & Sourcing Specialist',
    'Bids & Tender Proposal Specialist',
    'US Federal Proposal Specialist (Remote)',
    'Commercial Operations & Catalog Specialist',
    'Administrative Operations & Public Policy Analyst'
  ],
  preferredLagosLocations: [
    'Lagos Mainland (Ikeja, Yaba, Maryland, Ilupeju, Surulere, Gbagada, Isolo)',
    'Victoria Island',
    'Ikoyi',
    'Lekki',
    'Remote (US / Global Hours)'
  ],
  targetJobTypes: ['NYSC PPA', 'Graduate Trainee', 'Entry-Level', 'Remote Contractor'],
  minimumAcceptableStipend: '₦70,000/month (Broadened search: ₦70k - ₦300k+ / $600 - $1,200/mo)',
  hasCallUpLetter: false,
  applyingCampRelocation: true,
  wantsRemoteUsContract: true,
  relocationStrategyNotes: 'Awaiting call-up letter release. Executing in-camp relocation protocol to Lagos: Applying with Corporate PPA Request Letter from Lagos employer + medical/administrative endorsement.',
};

export const DEFAULT_TRAINING_CONFIG: AgentTrainingConfig = {
  likedKeywords: [
    'fully funded',
    'monthly stipend',
    'no gre',
    'english waiver',
    'post-study work visa',
    'kadaj alliance federal contracting',
    'graduate teaching assistantship',
    'living allowance'
  ],
  dislikedKeywords: [
    'tuition only',
    'partial scholarship',
    'requires gre',
    'mandatory return without work rights',
    'high application fee without waiver'
  ],
  likedSources: [
    'Chevening',
    'DAAD',
    'Erasmus Mundus',
    'Swedish Institute',
    'Carleton NPSIA',
    'University of Toronto',
    'McGill McCall MacBain',
    'Rotary Peace'
  ],
  dislikedSources: [],
  priorityWeights: {
    fullFundingWeight: 10,
    postStudyWorkWeight: 9,
    noGreWeight: 8,
    englishWaiverWeight: 8,
    workExpFitWeight: 9,
  },
  customInstructions: `1. Prioritize opportunities that cover 100% tuition PLUS a living stipend/salary (min £1,300, €900, or CAD $1,800/mo).
2. Prioritize countries with strong post-study work authorization (Canada PGWP up to 3 years, UK Graduate Route 2 years, Germany 18-month Jobseeker / EU Blue Card, Ireland 2-year Stamp 1G).
3. Recognize the applicant's 3.57/5.0 CGPA as a valid UK/European 2:1 (Second Class Upper) equivalent, qualifying them for top programs without disqualification.
4. Leverage the applicant's 1-year US federal contracting experience at Kadaj Alliance LLC as a unique superpower in public procurement, diplomacy, and transatlantic governance.
5. Highlight programs that accept an English Medium of Instruction letter from a Nigerian university to waive IELTS/TOEFL fees.`,
  jobTraining: {
    likedKeywords: [
      'NYSC PPA',
      'Procurement',
      'Bids and Tender',
      'Vendor Management',
      'Federal Contracting',
      'SAM.gov',
      'US RFP Proposal',
      'Lagos Mainland',
      'Ikeja',
      'Yaba',
      'Victoria Island',
      'Remote USD',
      '₦70k+ Stipend'
    ],
    dislikedKeywords: [
      'Strictly Commission',
      'Primary School Teacher PPA',
      'No PPA Stipend',
      'Unpaid Intern',
      'Below ₦70,000'
    ],
    priorityWeights: {
      nyscPpaWeight: 10,
      stipendWeight: 9,
      biddingExperienceWeight: 10,
      remoteFlexibilityWeight: 10,
      islandVsMainlandWeight: 8,
    },
    customInstructions: `1. Search across both Lagos Mainland (Ikeja, Yaba, Maryland, Ilupeju, Surulere, Gbagada, Isolo) and Island (VI, Lekki, Ikoyi) offering a minimum PPA stipend of ₦70,000/month (broadened up to ₦300,000/month).
2. Prioritize Remote US Federal Proposal & SAM.gov Bid Specialist roles ($500 - $1,400/month) as equally vital as the NYSC PPA to establish a dual USD income stream.
3. Tailor corporate PPA Request Letters to support in-camp relocation to Lagos State for corps members waiting for call-up letters or posted to another state.
4. Align roles directly with Adefolabi's Kadaj Alliance LLC (US federal contracting, RFQ emails, vendor registers) and PLSMINDS (catalog and MOQ operations).`
  },
  feedbackHistory: [
    {
      id: 'fb-init-1',
      scholarshipTitle: 'Chevening UK Scholarships',
      type: 'scholarship',
      sentiment: 'liked',
      reason: '100% funded with £1,349/mo stipend and Kadaj Alliance US federal contracting meets the 2,800 hours work experience requirement.',
      timestamp: '2026-10-12T10:00:00Z'
    },
    {
      id: 'fb-init-2',
      scholarshipTitle: 'DAAD Helmut-Schmidt-Programme',
      type: 'scholarship',
      sentiment: 'liked',
      reason: 'Zero tuition, €934/mo stipend, and 18-month German post-study work visa with rapid path to EU Blue Card.',
      timestamp: '2026-10-12T10:15:00Z'
    },
    {
      id: 'fb-init-job-1',
      jobTitle: 'Flour Mills of Nigeria - Procurement & Sourcing Officer (NYSC PPA)',
      type: 'job',
      sentiment: 'liked',
      reason: 'Top corporate PPA with ₦160k-₦220k stipend + staff bus, directly using Kadaj Alliance RFQ and vendor experience.',
      timestamp: '2026-10-13T08:00:00Z'
    }
  ]
};
