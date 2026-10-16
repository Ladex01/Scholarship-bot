import { JobOpportunity } from '../types';

export const SEED_JOBS: JobOpportunity[] = [
  // --- US REMOTE FEDERAL PROPOSAL & BID SPECIALIST CONTRACTS (USD INCOME - HIGH PRIORITY) ---
  {
    id: 'federal-bids-pro-proposal-specialist',
    title: 'Junior US Federal Proposal & RFP Response Writer (Remote)',
    company: 'Federal Bids Pro LLC',
    location: 'Remote (US Hours / East Coast Sync, Based in Lagos)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$750 - $1,200/month (~₦1,125,000 - ₦1,800,000/month)',
    deadline: '2026-11-28',
    source: 'Indeed Global Remote',
    sourceUrl: 'https://ng.indeed.com/jobs?q=federal+proposal+rfp+writer+remote&l=Lagos',
    relevanceScore: 100,
    status: 'new',
    requirements: [
      'Direct experience analyzing US federal solicitations on SAM.gov and GovWin',
      'Track record preparing compliant technical and commercial proposals under FAR guidelines',
      'Experience issuing formal RFQ emails, evaluating subcontractor bids, and maintaining vendor registers',
      'Proficiency with Google Workspace, Microsoft 365, and Zoom'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'fbp1', label: 'Submit resume detailing Kadaj Alliance LLC US federal contracting metrics', completed: true, required: true },
      { id: 'fbp2', label: 'Provide sample compliant RFQ email & SAM.gov evaluation framework', completed: false, required: true },
      { id: 'fbp3', label: 'Schedule 30-min remote video interview', completed: false, required: true }
    ],
    notes: 'US Dollar contract. Flexible asynchronous deliverables. Perfect dual-income pairing with Lagos NYSC service.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'govcontract-partners-bid-coordinator',
    title: 'US Federal Bid Compliance & Sourcing Specialist (Remote)',
    company: 'GovContract Partners LLC',
    location: 'Remote (Global Remote / Asynchronous)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$650 - $950/month (~₦975,000 - ₦1,425,000/month)',
    deadline: '2026-11-30',
    source: 'Twitter (@RemoteGovConJobs)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 99,
    status: 'new',
    requirements: [
      'Understanding of US federal procurement life-cycle and solicitation analysis',
      'Comfort maintaining dynamic vendor/supplier registers and managing bid repositories',
      'High attention to detail in document formatting, compliance matrices, and email correspondence'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'gcp1', label: 'Submit proposal coordinator application with Kadaj Alliance portfolio', completed: false, required: true },
      { id: 'gcp2', label: 'Complete 45-minute compliance matrix assessment', completed: false, required: true }
    ],
    notes: 'Contract allows 20 hrs/week flexible scheduling. Generates steady USD inflow while serving in Lagos.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'venturedesk-sam-solicitation-analyst',
    title: 'SAM.gov Solicitation Analyst & Proposal Associate (Remote)',
    company: 'VentureDesk US Consulting',
    location: 'Remote (Asynchronous / US Timezone)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$700 - $1,100/month (~₦1,050,000 - ₦1,650,000/month)',
    deadline: '2026-12-05',
    source: 'Glassdoor Remote',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 98,
    status: 'saved',
    requirements: [
      'Experience with US public contracting platforms (SAM.gov, DIBBS, GSA eBuy)',
      'Capable of conducting multi-state supplier research and drafting outreach messages',
      'Flawless English writing and professional business communication'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'vd1', label: 'Submit cover letter highlighting SAM.gov and FAR knowledge', completed: false, required: true },
      { id: 'vd2', label: 'Confirm remote equipment and stable power/internet setup in Lagos', completed: false, required: true }
    ],
    notes: 'Long-term contractor arrangement with quarterly performance bonuses.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'global-tender-solutions-bid-assistant',
    title: 'Commercial RFP & Bids Proposal Specialist (Part-time / Remote)',
    company: 'Global Tender Solutions Inc',
    location: 'Remote (Flexible / Evening Hours)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$500 - $800/month (~₦750,000 - ₦1,200,000/month)',
    deadline: '2026-12-10',
    source: 'Indeed Global Remote',
    sourceUrl: 'https://ng.indeed.com/jobs?q=commercial+rfp+bid+specialist+remote&l=Lagos',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'Familiarity with RFP response lifecycles, commercial quoting, and bid libraries',
      'Strong research and document version control',
      'Availability for 15-20 hours per week outside regular business hours'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'gts1', label: 'Send introductory proposal resume', completed: false, required: true }
    ],
    notes: 'Evening/weekend friendly contract designed for busy professionals and corps members.',
    discoveredAt: '2026-10-13'
  },

  // --- LAGOS MAINLAND CORPORATE & NYSC PPA ROLES (IKEJA, YABA, MARYLAND, ILUPEJU, SURULERE, ISOLO) ---
  {
    id: 'sbc-procurement-nysc-ikeja',
    title: 'Commercial Procurement & Sourcing Trainee (NYSC Call-Up)',
    company: 'Seven-Up Bottling Company Plc (SBC)',
    location: 'Oregun / Ikeja (Mainland), Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦120,000 - ₦170,000/month + Lunch + HMO (Plus NYSC ₦77k)',
    deadline: '2026-11-15',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/jobs/sbc-procurement-trainee-ikeja',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'B.Sc in Political Science, Business Administration, Economics or Social Sciences (LASU 2025)',
      'Direct understanding of purchase orders, supplier evaluation, and vendor coordination',
      'Currently mobilizing for NYSC and seeking corporate PPA on Lagos Mainland'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'sbc1', label: 'Tailor resume focusing on vendor management and Kadaj Alliance procurement', completed: true, required: true },
      { id: 'sbc2', label: 'Generate SBC Corporate PPA Request Letter for submission in camp', completed: false, required: true },
      { id: 'sbc3', label: 'Submit application via Jobberman and email HR', completed: false, required: true }
    ],
    notes: 'Seven-Up Oregun Ikeja is one of the most respected manufacturing PPA hubs on Lagos Mainland. Fast track for relocation approval.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'cadbury-sourcing-nysc-ikeja',
    title: 'Central Sourcing & Commercial Contracts Officer (NYSC)',
    company: 'Cadbury Nigeria Plc (Mondelēz International)',
    location: 'Agidingbi, Ikeja (Mainland), Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦140,000 - ₦190,000/month + Subsidized Canteen + HMO',
    deadline: '2026-11-20',
    source: 'Company Career Page',
    sourceUrl: 'https://mondelezinternational.com/careers/cadbury-nigeria-sourcing-nysc',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'Minimum of Second Class Upper (2:1) in Social Sciences, Arts or Business (LASU 3.57 CGPA qualifies)',
      'Strong organizational skills with supplier registers, tender documents, and price comparisons',
      'Mobilizing for NYSC service year with readiness to resume in Ikeja'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'cad1', label: 'Prepare PPA request letter addressed to Cadbury HR Director', completed: false, required: true },
      { id: 'cad2', label: 'Submit CV on Mondelez careers portal', completed: false, required: true }
    ],
    notes: 'Agidingbi Ikeja headquarters. Hybrid work structure: 3 days onsite, 2 days remote.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'flutterwave-ops-yaba',
    title: 'Vendor Coordination & Operations Associate (NYSC / Graduate)',
    company: 'Flutterwave / Send',
    location: 'Yaba (Tech Corridor, Mainland), Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Administrative & Operations',
    salaryStipend: '₦160,000 - ₦230,000/month + Work MacBook + Health',
    deadline: '2026-11-14',
    source: 'Twitter (@NaijaJobAlert)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 98,
    status: 'saved',
    requirements: [
      'Fresh university graduate entering NYSC in Lagos',
      'High proficiency in Google Workspace, calendar management, and stakeholder email communications',
      'Experience in vendor liaison, logistics coordination, or e-commerce admin (PLSMINDS background aligns)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'flw1', label: 'Apply via Flutterwave careers with Twitter referral link', completed: false, required: true },
      { id: 'flw2', label: 'Highlight Google Workspace and vendor coordination in application', completed: false, required: true }
    ],
    notes: 'Vibrant Yaba tech hub office. Offers exceptional full-time conversion opportunities post-NYSC.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'sterling-bank-procurement-ilupeju',
    title: 'Corporate Procurement & Vendor Onboarding Officer (NYSC Trainee)',
    company: 'Sterling Bank Plc',
    location: 'Ilupeju / Marina Hub (Mainland / Island Access)',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦110,000 - ₦160,000/month + HMO Insurance',
    deadline: '2026-11-18',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/jobs/sterling-bank-procurement-officer',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'B.Sc in Political Science, Economics, Banking & Finance, or Administration',
      'Knowledge of vendor onboarding due diligence, compliance checks, and SLA monitoring',
      'Mobilizing for NYSC in November with orientation camp letter'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'st1', label: 'Submit CV highlighting vendor compliance registers', completed: false, required: true },
      { id: 'st2', label: 'Request Sterling Bank NYSC PPA placement letter', completed: false, required: true }
    ],
    notes: 'Ilupeju branch operations. Provides solid banking sector experience on CV.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'lagos-ppa-eprocurement-alausa',
    title: 'E-Procurement & Tender Compliance Governance Analyst (NYSC PPA)',
    company: 'Lagos State Public Procurement Agency (PPA) / Tech Partner',
    location: 'Alausa Secretariat, Ikeja (Mainland), Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Research & Public Policy',
    salaryStipend: '₦80,000 - ₦120,000/month (+ NYSC ₦77,000 = ₦157k - ₦197k)',
    deadline: '2026-11-22',
    source: 'Lagos State Civil Service Career Portal',
    sourceUrl: 'https://lagosstate.gov.ng/jobs/public-procurement-analyst-nysc',
    relevanceScore: 99,
    status: 'new',
    requirements: [
      'Degree in Political Science, Public Administration, Law or Social Sciences (LASU B.Sc. Ed 2025 is primary priority)',
      'Interest in public sector tender administration, anti-corruption compliance, and open contracting standards',
      'Ready to be posted directly by NYSC Lagos State Secretariat at Iyana-Ipaja'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'lpp1', label: 'Prepare formal letter addressed to General Manager, Lagos State Public Procurement Agency', completed: true, required: true },
      { id: 'lpp2', label: 'Present letter at Iyana-Ipaja NYSC Posting Desk for automatic endorsement', completed: false, required: true }
    ],
    notes: 'Located at Alausa Secretariat, Ikeja. Immediate posting authorization at NYSC Iyana-Ipaja camp.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'chi-limited-procurement-isolo',
    title: 'Supply Chain & Sourcing Operations Trainee (NYSC Call-Up)',
    company: 'Chi Limited (TGI Group)',
    location: 'Ajao Estate / Isolo (Mainland), Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦85,000 - ₦130,000/month + Free Lunch + Staff Bus',
    deadline: '2026-11-19',
    source: 'Indeed Nigeria',
    sourceUrl: 'https://ng.indeed.com/jobs?q=chi+limited+procurement+trainee+isolo&l=Lagos',
    relevanceScore: 95,
    status: 'new',
    requirements: [
      'Graduates entering NYSC service year in Lagos State',
      'Strong numeracy, supplier record keeping, and inventory tracking abilities',
      'Proficient in Microsoft Excel, Word, and Google Docs'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'chi1', label: 'Submit CV highlighting Kadaj Alliance supplier records', completed: false, required: true }
    ],
    notes: 'Major FMCG (Chivita, Hollandia). High retention into full-time roles post-service.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'gdm-group-bids-gbagada',
    title: 'Bids, Tender & Commercial Pitch Specialist',
    company: 'GDM Group / Nitro 121',
    location: 'Gbagada / Maryland (Mainland), Lagos',
    workType: 'Hybrid',
    jobType: 'Entry-Level',
    category: 'Procurement & Bidding',
    salaryStipend: '₦95,000 - ₦145,000/month + Performance Bonus',
    deadline: '2026-11-16',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'Bachelor’s degree graduate with strong proposal writing and pitch development skills',
      'Experience reviewing client briefs, RFPs, and building presentation decks',
      'Excellent oral and written English communication'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'gdm1', label: 'Submit pitch proposal portfolio and CV', completed: false, required: true }
    ],
    notes: 'Marketing & commercial agency. Very dynamic pitch environment with hybrid schedule.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'jumia-commercial-admin',
    title: 'Commercial Operations & Catalog Administration Specialist',
    company: 'Jumia Nigeria',
    location: 'Ikeja (Mainland), Lagos',
    workType: 'Hybrid',
    jobType: 'Entry-Level',
    category: 'Administrative & Operations',
    salaryStipend: '₦130,000 - ₦180,000/month',
    deadline: '2026-11-05',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/jobs/jumia-commercial-admin-ikeja',
    relevanceScore: 95,
    status: 'new',
    requirements: [
      'B.Sc in any discipline from an accredited institution (LASU 2025)',
      'Experience reviewing product listings, minimum order quantities (MOQ), and customer communications',
      'Strong online research and market competitor tracking skills'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'jm1', label: 'Highlight PLSMINDS Lagos product listing and MOQ experience on resume', completed: true, required: true },
      { id: 'jm2', label: 'Apply on Jobberman quick-apply portal', completed: false, required: true }
    ],
    notes: 'Located on Lagos Mainland (Ikeja) — ideal commute if residing on the Mainland.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'babban-gona-operations-admin',
    title: 'Operations Administration & Calendar Coordinator',
    company: 'Babban Gona',
    location: 'Ikeja (Mainland), Lagos',
    workType: 'Hybrid',
    jobType: 'Entry-Level',
    category: 'Administrative & Operations',
    salaryStipend: '₦130,000 - ₦175,000/month',
    deadline: '2026-11-08',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/jobs/babban-gona-operations-admin-lagos',
    relevanceScore: 94,
    status: 'new',
    requirements: [
      'Bachelor’s degree graduate with strong calendar, email, and administrative management skills',
      'Hands-on proficiency with Google Docs, Sheets, Slides, and Zoom conferencing',
      'Customer-centric communication and problem-solving mentality'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'bg1', label: 'Submit CV highlighting administrative and customer service skills', completed: false, required: true },
      { id: 'bg2', label: 'Attend online interview', completed: false, required: true }
    ],
    notes: 'Leading agricultural social enterprise backed by Skoll and Mastercard Foundation. Ikeja Mainland office.',
    discoveredAt: '2026-10-13'
  },

  // --- PRESTIGIOUS LAGOS ISLAND CORPORATE PPAS (VI, IKOYI, LEKKI) ---
  {
    id: 'fmn-procurement-nysc',
    title: 'Procurement & Sourcing Officer (NYSC PPA / Graduate Trainee)',
    company: 'Flour Mills of Nigeria Plc (FMN)',
    location: 'Victoria Island / Apapa, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦160,000 - ₦220,000/month + Lunch & Health (Plus NYSC ₦77k)',
    deadline: '2026-11-15',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/jobs/procurement-officer-fmn-lagos',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'B.Sc in Political Science, Business, Supply Chain, or Social Sciences',
      'Hands-on experience in vendor coordination, RFQ preparation, and procurement administration',
      'Proficiency in Microsoft Office Suite (Excel, Word) & Google Workspace',
      'Currently mobilizing for NYSC or seeking Primary Place of Assignment (PPA) in Lagos'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'fmn1', label: 'Tailor CV highlighting Kadaj Alliance US procurement and RFQ drafting', completed: true, required: true },
      { id: 'fmn2', label: 'Draft NYSC PPA Request Letter stating call-up date (4th of next month)', completed: false, required: true },
      { id: 'fmn3', label: 'Submit application via Jobberman and FMN careers portal', completed: false, required: true }
    ],
    notes: 'Actively requests NYSC PPA letters during orientation camp. Apapa/VI staff bus available across Lagos mainland.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'kpmg-procurement-analyst-nysc',
    title: 'Procurement & Contract Management Analyst (NYSC Trainee Intake)',
    company: 'KPMG Nigeria',
    location: 'Victoria Island, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦180,000 - ₦250,000/month + Full HMO & Medical',
    deadline: '2026-11-20',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'Minimum of Second Class Upper (2:1) bachelor’s degree from an accredited university (LASU 3.57/5.0 qualifies)',
      'Understanding of contracting compliance, tender evaluation, and supplier documentation',
      'Strong analytical, calendar management, and professional email correspondence skills'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'kpmg1', label: 'Draft cover letter referencing federal tender compliance and LASU academic degree', completed: false, required: true },
      { id: 'kpmg2', label: 'Upload NYSC call-up slip / green card showing Lagos posting', completed: false, required: true }
    ],
    notes: 'KPMG recruits corps members for annual contract management advisory. Top PPA prestige in West Africa.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'moniepoint-ops-procurement',
    title: 'Procurement & Administrative Operations Officer (NYSC / Entry)',
    company: 'Moniepoint (TeamApt)',
    location: 'Lekki Phase 1, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Administrative & Operations',
    salaryStipend: '₦200,000 - ₦300,000/month + Laptop + Lunch + Health',
    deadline: '2026-11-10',
    source: 'Twitter (@NaijaJobAlert)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 96,
    status: 'saved',
    requirements: [
      'Bachelor’s degree graduate ready for NYSC PPA in Lagos',
      'Demonstrated experience with vendor onboarding, inventory tracking, or procurement portals',
      'Exemplary written communication and Google Workspace proficiency'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'mp1', label: 'Submit resume via Moniepoint Greenhouse portal with Twitter link', completed: false, required: true },
      { id: 'mp2', label: 'Attach NYSC availability date (ready to resume immediately post-camp)', completed: false, required: true }
    ],
    notes: 'Fintech unicorn in Lekki. Very high PPA stipend and high retention rate to full-time post-NYSC.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'pwc-bid-proposal-associate',
    title: 'Operations & Bids Proposal Associate (Graduate Trainee / NYSC)',
    company: 'PricewaterhouseCoopers (PwC Nigeria)',
    location: 'Landmark Towers, Victoria Island, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦175,000 - ₦230,000/month + Professional Training',
    deadline: '2026-11-25',
    source: 'Indeed Nigeria',
    sourceUrl: 'https://ng.indeed.com/jobs?q=pwc+lagos+bid+proposal+associate&l=Lagos',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'Undergraduate degree with 2:1 honours classification (3.57 CGPA qualifies)',
      'Familiarity with RFP/RFQ solicitation analysis and proposal document compilation',
      'Attention to detail, proofreading, and document version management'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'pwc1', label: 'Tailor Bidding & Proposal experience on Kadaj Alliance', completed: true, required: true },
      { id: 'pwc2', label: 'Complete PwC online psychometric assessment', completed: false, required: true }
    ],
    notes: 'Bids team works on federal and multilateral commercial proposals across West Africa.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'undp-nigeria-procurement-intern',
    title: 'Procurement & Public Governance Assistant (NYSC Fellow)',
    company: 'United Nations Development Programme (UNDP Nigeria)',
    location: 'Victoria Island / Ikoyi, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Research & Public Policy',
    salaryStipend: '$400 - $550/month (~₦550,000 - ₦750,000/month)',
    deadline: '2026-11-30',
    source: 'Twitter (@JobzillaNigeria)',
    sourceUrl: 'https://jobs.undp.org/cj_view_job.cfm?job_id=undp-lagos-procurement',
    relevanceScore: 99,
    status: 'saved',
    requirements: [
      'Degree in Political Science, International Relations, Public Administration or Education (LASU B.Sc. Ed 2025 is a priority)',
      'Knowledge of public sector procurement principles and institutional governance',
      'High competence in Google Workspace, data confidentiality, and virtual stakeholder meetings'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'un1', label: 'Draft UN Personal History Form (P11) highlighting federal procurement and LASU degree', completed: false, required: true },
      { id: 'un2', label: 'Obtain NYSC posting verification letter for Lagos State', completed: false, required: true }
    ],
    notes: 'Premier diplomatic and international policy PPA in Lagos. Pays in USD or equivalent naira rate.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'dangote-central-procurement',
    title: 'Central Procurement & Vendor Management Trainee',
    company: 'Dangote Industries Limited',
    location: 'Falomo, Ikoyi, Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦160,000 - ₦230,000/month + Staff Transport & Canteen',
    deadline: '2026-11-18',
    source: 'Company Career Page',
    sourceUrl: 'https://dangote.com/careers/procurement-trainee-lagos',
    relevanceScore: 94,
    status: 'new',
    requirements: [
      'Graduates currently called up for NYSC in Lagos State',
      'Demonstrated understanding of supplier registers, RFQs, and purchase order documentation',
      'Excellent interpersonal communication and problem-solving abilities'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'dg1', label: 'Submit application on Dangote career website', completed: false, required: true },
      { id: 'dg2', label: 'Prepare NYSC PPA acceptance letter draft', completed: false, required: true }
    ],
    notes: 'Falomo, Ikoyi headquarters. Subsidized executive staff bus connects Mainland and Island.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'interswitch-bids-tender-specialist',
    title: 'Bids & Tender Proposal Specialist (NYSC PPA / Associate)',
    company: 'Interswitch Group',
    location: 'Oko Awo, Victoria Island, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦180,000 - ₦260,000/month + Health Insurance',
    deadline: '2026-11-22',
    source: 'LinkedIn Jobs',
    sourceUrl: 'https://www.linkedin.com/jobs/view/interswitch-bids-tender-lagos',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'B.Sc degree in Social Sciences, Political Science, or Business (LASU B.Sc. Ed 3.57 CGPA qualifies)',
      'Experience assessing bid opportunities on business/government portals and tender validation',
      'Advanced MS Word, PowerPoint, and proposal repository management'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'is1', label: 'Submit customized resume with Bids & Tender focus', completed: false, required: true },
      { id: 'is2', label: 'Connect with Interswitch Talent Acquisition on LinkedIn', completed: false, required: true }
    ],
    notes: 'Top Nigerian payment infrastructure giant. Regularly places corps members in permanent roles post-NYSC.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'nesg-public-policy-researcher',
    title: 'Public Policy Research & Governance Analyst (NYSC PPA)',
    company: 'Nigerian Economic Summit Group (NESG)',
    location: 'Summit House, Victoria Island, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Research & Public Policy',
    salaryStipend: '₦150,000 - ₦200,000/month + Policy Conferences',
    deadline: '2026-11-12',
    source: 'Twitter (@CareerGist_NG)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'Degree in Political Science, Education, Public Administration or Economics (LASU 2025 degree is ideal)',
      'Strong online research, report proofreading, and institutional governance analysis skills',
      'Commitment to national economic and educational reform'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'ns1', label: 'Draft policy essay highlighting Nigerian institutional governance and educational policy', completed: false, required: true },
      { id: 'ns2', label: 'Submit application to NESG HR with NYSC posting letter', completed: false, required: true }
    ],
    notes: 'Leading economic think tank in Nigeria. Interacts directly with federal ministries, ECOWAS, and World Bank.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'oando-supply-chain-intern',
    title: 'Supply Chain & Procurement Management Trainee (NYSC Call-up)',
    company: 'Oando PLC',
    location: 'Ozumba Mbadiwe, Victoria Island, Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦190,000 - ₦260,000/month + Lunch & Transport Allowance',
    deadline: '2026-11-16',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 95,
    status: 'new',
    requirements: [
      'Minimum of Second Class Upper (2:1) in Social Sciences, Engineering, or Administration (LASU 3.57 CGPA qualifies)',
      'Strong grasp of procurement documentation, purchase order tracking, and supplier compliance registers',
      'Mobilizing for NYSC in Lagos State (Batch C stream)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'oa1', label: 'Submit application via Oando portal with LASU degree certificate', completed: false, required: true },
      { id: 'oa2', label: 'Follow up with HR team regarding NYSC PPA placement letter', completed: false, required: true }
    ],
    notes: 'Iconic Victoria Island waterfront building. Outstanding corporate brand on resume.',
    discoveredAt: '2026-10-13'
  },
  // --- ADDITIONAL EXPANDED LAGOS MAINLAND & HIGH-PAYING OPPORTUNITIES ---
  {
    id: 'pz-cussons-procurement-graduate',
    title: 'Graduate Sourcing & Vendor Specialist (Mainland Hub)',
    company: 'PZ Cussons Nigeria Plc',
    location: 'Ilupeju Industrial Estate, Lagos Mainland',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦140,000 - ₦180,000/month (+ NYSC ₦77k allawee)',
    deadline: '2026-11-24',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/listings/pz-cussons-procurement-specialist',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'B.Sc. in Social Sciences, Political Science, Economics, or Business Administration (2:1 minimum, LASU 3.57 qualifies)',
      'Experience issuing RFQs and maintaining supplier registers (Kadaj Alliance US federal experience is highly valued)',
      'Familiarity with Lagos Mainland commute routes (Ilupeju / Ikorodu Road corridor)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'pz1', label: 'Draft targeted CV featuring Kadaj Alliance supplier registers and RFQ management', completed: false, required: true },
      { id: 'pz2', label: 'Generate official Corporate PPA Request Letter addressed to HR Director', completed: false, required: true },
      { id: 'pz3', label: 'Apply on Jobberman portal & email recruitment desk', completed: false, required: true }
    ],
    notes: 'Multinational FMCG giant. Regular monthly stipends, health insurance, and staff bus routes across Lagos Mainland.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'julius-berger-tendering-assistant',
    title: 'Commercial Tendering & Public Procurement Assistant',
    company: 'Julius Berger Nigeria Plc',
    location: 'Ikeja Mainland Commercial Division, Lagos',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦160,000 - ₦220,000/month + Lunch Subsidy & Medicals',
    deadline: '2026-11-22',
    source: 'Indeed Nigeria',
    sourceUrl: 'https://ng.indeed.com/viewjob?jk=julius-berger-tendering-ikeja',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'Degree in Political Science, Public Administration, Law, or Commercial Studies',
      'Knowledge of public sector bidding compliance and formal tender document organization',
      'Proficiency in Microsoft Excel and proposal formatting'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'jb1', label: 'Tailor tender compliance experience into CV', completed: false, required: true },
      { id: 'jb2', label: 'Generate Corporate NYSC PPA Request Letter to Head of Commercial Tendering', completed: false, required: true }
    ],
    notes: 'Nigeria premier construction and engineering conglomerate. Outstanding prestige for transatlantic public administration profiles.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'guinness-supply-chain-sourcing',
    title: 'Supply Chain Sourcing & Vendor Governance Analyst',
    company: 'Guinness Nigeria Plc (Diageo)',
    location: 'Ogba / Ikeja Industrial Zone, Lagos Mainland',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦150,000 - ₦205,000/month + Product Allowance & Transport',
    deadline: '2026-11-26',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'Graduate degree from recognized Nigerian University (LASU 3.57/5.0 accepted)',
      'Understanding of vendor code of conduct, ethical procurement, and supplier tracking',
      'NYSC mobilization ready for Lagos State'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'gn1', label: 'Highlight ethical procurement and compliance monitoring from Kadaj Alliance', completed: false, required: true },
      { id: 'gn2', label: 'Submit via Diageo career website', completed: false, required: true }
    ],
    notes: 'Ogba/Ikeja brewery and corporate complex. Very strong mainland logistics access.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'lagos-mwe-public-procurement-fellow',
    title: 'Policy & Public Procurement NYSC Fellow (Alausa Secretariat)',
    company: 'Lagos State Ministry of Wealth Creation & Employment',
    location: 'Alausa Secretariat, Ikeja, Lagos Mainland',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Public Policy & Diplomacy',
    salaryStipend: '₦70,000 State Allowance + ₦77,000 NYSC = ₦147,000/month',
    deadline: '2026-11-18',
    source: 'Lagos State Civil Service Portal',
    sourceUrl: 'https://lagosstate.gov.ng/mwe-careers-nysc',
    relevanceScore: 99,
    status: 'new',
    requirements: [
      'B.Sc. in Political Science, Public Administration, or Education from LASU or recognized institution',
      'Interest in state youth employment policies, artisan procurement, and MSME grants',
      'NYSC Call-up posting to Lagos State'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'mwe1', label: 'Prepare formal NYSC letter of intent for Lagos State Secretariat', completed: false, required: true },
      { id: 'mwe2', label: 'Submit LASU degree notification of results and NYSC Green Card', completed: false, required: true }
    ],
    notes: 'Government ministry posting: Offers maximum flexibility, daytime governance exposure, and ample evening bandwidth for US remote federal proposal contracts.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'niia-diplomatic-fellow',
    title: 'Diplomatic Policy Research & Transatlantic Relations Fellow',
    company: 'Nigerian Institute of International Affairs (NIIA)',
    location: '13/15 Kofo Abayomi Street, Victoria Island, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Public Policy & Diplomacy',
    salaryStipend: '₦85,000 Research Stipend + ₦77,000 NYSC = ₦162,000/month',
    deadline: '2026-11-20',
    source: 'Twitter (@CareerGist_NG)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 100,
    status: 'new',
    requirements: [
      'Degree in Political Science, International Studies, or History (LASU 3.57 CGPA is prime)',
      'High intellectual interest in Nigeria’s foreign policy, ECOWAS trade diplomacy, and multilateral governance',
      'Strong analytical writing and conference coordination skills'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'niia1', label: 'Draft 2-page policy concept note on US-Nigeria procurement trade diplomacy', completed: false, required: true },
      { id: 'niia2', label: 'Submit directly to NIIA Director-General office with NYSC posting letter', completed: false, required: true }
    ],
    notes: 'The crown jewel of diplomatic postings in Nigeria. Directly founded by Sir Abubakar Tafawa Balewa.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'interswitch-procurement-associate',
    title: 'Procurement & Strategic Sourcing Associate (Fintech)',
    company: 'Interswitch Group',
    location: 'Oko-Awo, Victoria Island / Yaba Hub, Lagos',
    workType: 'Hybrid',
    jobType: 'Graduate Trainee',
    category: 'Procurement & Bidding',
    salaryStipend: '₦180,000 - ₦260,000/month + HMO & Pension',
    deadline: '2026-11-25',
    source: 'Twitter (@JobzillaNigeria)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 97,
    status: 'new',
    requirements: [
      'Recent graduate with minimum 2:1 in Social Sciences, Business, or STEM',
      'Analytical mindset for software vendor evaluation and tech hardware procurement',
      'Strong contract negotiation and vendor register tracking'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'is1', label: 'Submit CV highlighting commercial contracts and vendor management', completed: false, required: true },
      { id: 'is2', label: 'Complete online cognitive and situational assessment', completed: false, required: true }
    ],
    notes: 'Hybrid model (2 days office, 3 days remote). Excellent balance and career springboard.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'babban-gona-sourcing-trainee',
    title: 'Agricultural Supply Chain & Sourcing Associate',
    company: 'Babban Gona',
    location: 'Yaba Tech Hub / Mainland Logistics, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Operations & SCM',
    salaryStipend: '₦125,000 - ₦165,000/month (+ NYSC ₦77k allawee)',
    deadline: '2026-11-23',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/listings/babban-gona-sourcing-trainee',
    relevanceScore: 95,
    status: 'new',
    requirements: [
      'Graduates of 2024/2025 mobilizing for NYSC in Lagos',
      'Demonstrated competence in inventory log maintenance, RFQ dispatch, and vendor communications',
      'Comfort working in Yaba Mainland tech ecosystem'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'bg1', label: 'Submit application via Babban Gona talent form', completed: false, required: true },
      { id: 'bg2', label: 'Provide Kadaj Alliance LLC recommendation letter', completed: false, required: true }
    ],
    notes: 'High social impact enterprise. Very accommodating with NYSC weekly CDS schedules.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'airtel-supply-chain-specialist',
    title: 'Commercial Supply Chain & Vendor Compliance Admin',
    company: 'Airtel Nigeria',
    location: 'Banana Island, Ikoyi / Ikeja Mainland Regional Hub, Lagos',
    workType: 'Hybrid',
    jobType: 'Graduate Trainee',
    category: 'Procurement & Bidding',
    salaryStipend: '₦175,000 - ₦235,000/month + Telecom Data & Airtime',
    deadline: '2026-11-27',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/Job/lagos-nigeria-procurement-jobs-SRCH_IL.0,13_IN177_KO14,25.htm',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'Degree in Social Sciences, Public Policy, or Business Administration',
      'Strong understanding of procurement registers, vendor qualification, and RFQ issuance',
      'Readiness to work across Mainland and Island campuses'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'at1', label: 'Apply via Airtel career portal', completed: false, required: true },
      { id: 'at2', label: 'Request Corporate PPA acceptance letter', completed: false, required: true }
    ],
    notes: 'Top 3 telecom multinational in Africa. High stability and prestige.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'honeywell-tenders-trainee',
    title: 'Corporate Tenders & Commercial Compliance Trainee',
    company: 'Honeywell Group / Pavilion Technology',
    location: 'Victoria Island & Ikeja Mainland, Lagos',
    workType: 'Hybrid',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦150,000 - ₦200,000/month + Lunch Allowance',
    deadline: '2026-11-21',
    source: 'Twitter (@NaijaJobAlert)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'Second Class Upper degree in Social Sciences, Political Science, or Law',
      'Detail-oriented reviewing tender proposals, RFQ responses, and contract clauses',
      'Mobilizing for NYSC in Lagos State'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'hw1', label: 'Submit CV and cover letter outlining SAM.gov bidding metrics', completed: false, required: true },
      { id: 'hw2', label: 'Generate Corporate NYSC PPA Request Letter', completed: false, required: true }
    ],
    notes: 'One of Nigeria’s most enduring corporate conglomerates.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'leadway-assurance-sourcing',
    title: 'Corporate Sourcing & Vendor Management Trainee',
    company: 'Leadway Assurance Company Limited',
    location: 'Iponri / Surulere, Lagos Mainland',
    workType: 'Onsite',
    jobType: 'NYSC PPA',
    category: 'Procurement & Bidding',
    salaryStipend: '₦130,000 - ₦175,000/month (+ NYSC ₦77k allawee)',
    deadline: '2026-11-19',
    source: 'Jobberman',
    sourceUrl: 'https://www.jobberman.com/listings/leadway-assurance-sourcing-trainee',
    relevanceScore: 96,
    status: 'new',
    requirements: [
      'Recent graduate with 2:1 degree in Political Science, Economics, or Arts',
      'Knowledge of vendor onboarding, procurement documentation, and purchase invoices',
      'Mainland location accessibility (Surulere / Costain / Yaba axis)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'lw1', label: 'Submit tailored CV to Leadway HR desk', completed: false, required: true },
      { id: 'lw2', label: 'Follow up with Corporate PPA Request Letter', completed: false, required: true }
    ],
    notes: 'Nigeria leading insurer. Highly structured environment with excellent training.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'bidexecs-junior-proposal-coordinator',
    title: 'Junior US Federal Proposal Coordinator (USD Contract)',
    company: 'BidExecs Global LLC',
    location: 'Remote (US East Coast Sync / Asynchronous from Lagos)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$650 - $1,100/month (~₦975,000 - ₦1,650,000/month)',
    deadline: '2026-11-29',
    source: 'Indeed Global Remote',
    sourceUrl: 'https://ng.indeed.com/jobs?q=bidexecs+proposal+coordinator+remote&l=Lagos',
    relevanceScore: 100,
    status: 'new',
    requirements: [
      'Documented experience working with US federal RFPs, RFQs, and Sources Sought on SAM.gov',
      'Understanding of compliance matrices, executive summaries, and subcontractor pricing sheets',
      'Availability for evening sync meetings (5:00 PM - 8:00 PM Lagos Time / 12:00 PM - 3:00 PM EST)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'be1', label: 'Send resume with Kadaj Alliance contract highlights to talent team', completed: false, required: true },
      { id: 'be2', label: 'Complete 30-minute proposal compliance exercise', completed: false, required: true }
    ],
    notes: 'USD contract paid directly to Nigerian domiciliary account or Geegpay/Grey virtual USD account.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'govwin-rfq-scraper-analyst',
    title: 'SAM.gov Opportunity Tracker & Bid Analyst (USD Contract)',
    company: 'GovWin Partners LLC',
    location: 'Remote (Asynchronous / Global Remote)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$700 - $1,250/month (~₦1,050,000 - ₦1,875,000/month)',
    deadline: '2026-12-05',
    source: 'Twitter (@RemoteGovConJobs)',
    sourceUrl: 'https://twitter.com/search?q=NYSC%20Lagos%20job&f=live',
    relevanceScore: 99,
    status: 'new',
    requirements: [
      'Daily monitoring and keyword filtration across SAM.gov, DLA, and GovWin databases',
      'Ability to extract NAICS codes, set-aside designations (WOSB, SDVOSB, HubZone), and submission requirements',
      'Strong email communication and spreadsheet accuracy'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'gw1', label: 'Submit profile and SAM.gov search methodology portfolio', completed: false, required: true },
      { id: 'gw2', label: 'Complete practical solicitation shredding test', completed: false, required: true }
    ],
    notes: 'Pure asynchronous USD contractor role. Zero conflict with Nigerian daytime office hours.',
    discoveredAt: '2026-10-13'
  },
  {
    id: 'apex-federal-proposal-writer',
    title: 'Remote Federal Proposal Writer & Compliance Specialist',
    company: 'Apex Federal Solutions LLC',
    location: 'Remote (Flexible US Hours / Global)',
    workType: 'Remote',
    jobType: 'Remote Contractor',
    category: 'Procurement & Bidding',
    salaryStipend: '$800 - $1,400/month (~₦1,200,000 - ₦2,100,000/month)',
    deadline: '2026-12-02',
    source: 'Remotive',
    sourceUrl: 'https://remotive.com/jobs/apex-federal-proposal-writer',
    relevanceScore: 98,
    status: 'new',
    requirements: [
      'Solid command of FAR clauses, Section L instructions, and Section M evaluation criteria',
      'Ability to draft clear past performance summaries and technical volume outlines',
      'Strong research and English composition skills (Political Science Education graduate is ideal)'
    ],
    nyscPpaFriendly: true,
    checklist: [
      { id: 'af1', label: 'Submit proposal writing sample and CV', completed: false, required: true },
      { id: 'af2', label: 'Attend virtual introductory call', completed: false, required: true }
    ],
    notes: 'High-earning contract that comfortably pays over ₦1.5 million/month while serving as an NYSC corp member.',
    discoveredAt: '2026-10-13'
  }
];

