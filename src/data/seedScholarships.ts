import { Scholarship } from '../types';

export const SEED_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'chevening-uk-2026',
    title: 'Chevening Scholarship (UK Government / FCDO)',
    universityOrFunder: 'UK Foreign, Commonwealth and Development Office',
    country: 'United Kingdom',
    region: 'UK',
    degreeLevel: 'Masters (1 Year Taught)',
    targetFields: ['International Relations', 'Diplomacy', 'Politics', 'Global Security', 'Public Policy'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition (~£28,000 - £38,000 value)',
    monthlyStipend: '£1,349/month (outside London) or £1,650/month (London)',
    travelAllowance: 'Economy class return airfare to/from Nigeria + arrival allowance',
    deadline: '2026-11-04',
    intake: 'Fall 2027 (Opens Aug 2026 / Deadline Nov 2026)',
    url: 'https://www.chevening.org/scholarships/',
    relevanceScore: 98,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Chevening removed English test requirement; UK university will accept Nigerian English-medium letter or WAEC English (C6+)',
    cgpaRequirement: 'Requires 2:1 equivalent (Upper Credit). Your 3.57/5.0 directly clears the threshold.',
    workExperienceFit: 'Requires 2,800 hours of work experience (~2 years). Your 1 year remote at Kadaj Alliance LLC gives you ~2,080 hours; combined with NYSC/undergrad internships, you easily surpass the requirement!',
    postStudyWorkOpportunity: 'Mandatory return to home country for 2 years (great for Nigerian foreign affairs/diplomatic corps or ECOWAS roles)',
    pros: [
      'Prestige recognized globally across diplomatic corps and UN agencies',
      'No application fee for the scholarship',
      'Covers 3 top UK university choices (e.g. LSE, SOAS, Oxford, Birmingham, King’s College London)'
    ],
    cons: [
      '2-year home country residency condition before returning to the UK'
    ],
    checklist: [
      { id: 'c1', label: 'Draft Leadership & Influence essay (highlight Kadaj Alliance tender negotiations)', completed: false, required: true },
      { id: 'c2', label: 'Draft Networking essay (bilateral US-Nigeria trade & federal bidding)', completed: false, required: true },
      { id: 'c3', label: 'Select 3 UK University Masters programs in IR/Diplomacy', completed: false, required: true },
      { id: 'c4', label: 'Secure 2 reference letters (Kadaj Alliance supervisor + University Lecturer)', completed: false, required: true },
      { id: 'c5', label: 'Degree Certificate & Transcript (3.57/5.0)', completed: true, required: true }
    ],
    notes: 'Position Kadaj Alliance federal contracting as high-stakes cross-border governance and public procurement diplomacy.',
    discoveredAt: '2026-10-10'
  },
  {
    id: 'daad-helmut-schmidt-ppgg',
    title: 'DAAD Helmut-Schmidt-Programme (Master’s Scholarships in Public Policy & Good Governance)',
    universityOrFunder: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    region: 'Europe',
    degreeLevel: 'Masters (2 Years Taught in English)',
    targetFields: ['International Relations', 'Public Policy', 'Good Governance', 'Peace & Conflict Studies'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Exemption + Full Living Support',
    monthlyStipend: '€934/month tax-free living allowance',
    travelAllowance: 'Flight reimbursement to Germany + €460/year study allowance + German health insurance',
    deadline: '2026-07-31',
    intake: 'Fall 2027 (Opens June 1, 2026)',
    url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    relevanceScore: 96,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Accepted via English Medium of Instruction letter from Nigerian University (DAAD certified form)',
    cgpaRequirement: 'Min 2.5 on German scale. A 3.57/5.0 in Nigeria maps to ~2.2 - 2.4 (Good / Gut), making you strongly competitive.',
    workExperienceFit: 'Specifically seeks candidates with practical experience in public administration, governance, and institutional contracting. Kadaj Alliance is a textbook fit.',
    postStudyWorkOpportunity: 'Germany provides 18-Month Jobseeker Visa for graduates, leading to EU Blue Card with fastest path to permanent residency in Europe.',
    pros: [
      'Zero tuition fees across top German universities (Willy Brandt School Erfurt, Osnabrück, Passau)',
      'Free 6-month preparatory German language course included',
      'Allows remaining in Germany on 18-month job seeker visa post-graduation'
    ],
    cons: [
      'Strict paper/portal documentation verification timeline'
    ],
    checklist: [
      { id: 'd1', label: 'DAAD Application Form & Europass CV', completed: false, required: true },
      { id: 'd2', label: 'Motivation letter linking Pol Sci Ed to Good Governance & Public Procurement', completed: false, required: true },
      { id: 'd3', label: 'Kadaj Alliance LLC reference letter with official letterhead', completed: false, required: true },
      { id: 'd4', label: 'Transcript and English Medium of Instruction letter', completed: false, required: true }
    ],
    notes: 'Outstanding economic opportunity in Germany post-studies. English-taught programs at University of Passau and Willy Brandt School of Public Policy.',
    discoveredAt: '2026-10-11'
  },
  {
    id: 'erasmus-imsiss-2026',
    title: 'Erasmus Mundus IMSISS (International Security, Intelligence & Strategic Studies)',
    universityOrFunder: 'European Commission / University of Glasgow, DCU Dublin, Charles University Prague',
    country: 'UK, Ireland, Czechia',
    region: 'Europe',
    degreeLevel: 'Joint International Masters (2 Years)',
    targetFields: ['International Relations', 'Intelligence & Security', 'Strategic Studies', 'Diplomacy'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: 'Full Tuition Waiver (€18,000/yr)',
    monthlyStipend: '€1,400/month for the full 24-month duration (€33,600 total)',
    travelAllowance: '€3,000/year travel & relocation grant + €1,000 installation cost',
    deadline: '2027-01-15',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Jan 2027)',
    url: 'https://securityintelligence-erasmus.eu/',
    relevanceScore: 97,
    status: 'saved',
    greRequired: 'not required',
    ieltsRequirement: 'English waiver eligible if undergraduate degree was taught 100% in English in Nigeria (requires university registrar letter)',
    cgpaRequirement: 'Requires 2:1 Honours equivalent. 3.57/5.0 directly qualifies.',
    workExperienceFit: 'High synergy: Federal contracting involves defense and security regulations (FAR/DFARS compliance). Positioning Kadaj Alliance experience as federal procurement security is a unique angle no other applicant will have.',
    postStudyWorkOpportunity: 'Graduates receive joint degrees and qualify for Ireland 2-Year Stamp 1G or UK Graduate Route depending on mobility pathway.',
    pros: [
      'Study across 3 European capitals (Glasgow, Dublin, Prague, Trento)',
      'Generous €1,400/mo stipend + travel support',
      'No tuition fees to pay whatsoever'
    ],
    cons: [
      'High mobility requirement (moving countries every semester)'
    ],
    checklist: [
      { id: 'e1', label: 'Personal Statement (max 1000 words focusing on intelligence & procurement security)', completed: false, required: true },
      { id: 'e2', label: '2 Academic References (or 1 Academic + 1 Kadaj Alliance)', completed: false, required: true },
      { id: 'e3', label: 'Official Transcripts and Degree Certificate', completed: true, required: true },
      { id: 'e4', label: 'English Medium of Instruction verification document', completed: false, required: true }
    ],
    notes: 'One of the best-funded scholarships in Europe with direct security/diplomatic policy networks.',
    discoveredAt: '2026-10-08'
  },
  {
    id: 'swedish-institute-sisgp',
    title: 'Swedish Institute Scholarship for Global Professionals (SI SISGP)',
    universityOrFunder: 'Swedish Ministry for Foreign Affairs / Swedish Institute',
    country: 'Sweden',
    region: 'Europe',
    degreeLevel: 'Masters (1 or 2 Years)',
    targetFields: ['International Relations', 'Peace and Conflict', 'Political Science', 'Sustainable Governance'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Fees paid directly to Swedish University',
    monthlyStipend: 'SEK 12,000/month living expenses',
    travelAllowance: 'SEK 15,000 one-time travel grant + comprehensive health & accident insurance',
    deadline: '2027-02-28',
    intake: 'Fall 2027 (Universityadmissions.se opens Oct 2026; SI opens Feb 2027)',
    url: 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/',
    relevanceScore: 95,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Exempt for Nigerian degrees where English is primary language of instruction (listed on UniversityAdmissions.se country guidelines)',
    cgpaRequirement: 'Swedish system looks for accredited bachelor with Second Class Upper (3.57/5.0 is solid).',
    workExperienceFit: 'Requires 3,000 hours of documented work/leadership experience. 1 year full-time remote (~2,080h) + prior leadership in university or community gets you over the line.',
    postStudyWorkOpportunity: 'Sweden grants a 12-month post-study work visa to look for work or start a company, leading to Swedish permanent residency.',
    pros: [
      'Membership in the prestigious SI Network for Global Professionals',
      'No GRE, seamless English waiver for Nigerian bachelor holders',
      'World-class peace & conflict departments (e.g. Uppsala University, Lund University)'
    ],
    cons: [
      'Two-step application process (first apply to university admissions, then to SI)'
    ],
    checklist: [
      { id: 's1', label: 'Apply to Uppsala or Lund University via Universityadmissions.se', completed: false, required: true },
      { id: 's2', label: 'SI Proof of Work Experience form completed by Kadaj Alliance', completed: false, required: true },
      { id: 's3', label: 'SI Proof of Leadership form', completed: false, required: true },
      { id: 's4', label: 'Curriculum Vitae on SI template', completed: false, required: true }
    ],
    notes: 'Apply to Uppsala University Peace & Conflict Studies or Lund International Relations.',
    discoveredAt: '2026-10-09'
  },
  {
    id: 'rotary-peace-fellowship-2027',
    title: 'Rotary Peace Fellowship (Duke-UNC & Bradford Centers)',
    universityOrFunder: 'The Rotary Foundation',
    country: 'USA / UK',
    region: 'North America',
    degreeLevel: 'Masters in International Development Policy / Peace Studies',
    targetFields: ['International Relations', 'Peacebuilding', 'Diplomacy', 'Conflict Transformation'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: 'Full Tuition & University Fees ($65,000/yr)',
    monthlyStipend: 'Full Room & Board stipend + monthly allowance',
    travelAllowance: 'Round-trip airfare + all internship & field study travel expenses',
    deadline: '2026-05-15',
    intake: 'Fall 2027 (Opens Feb 2026 / Deadline May 15, 2026)',
    url: 'https://www.rotary.org/en/our-programs/peace-fellowships',
    relevanceScore: 94,
    status: 'new',
    greRequired: 'waived',
    ieltsRequirement: 'Waived for Duke University / UNC with institutional verification',
    cgpaRequirement: '3.57/5.0 exceeds minimum requirement (3.0/4.0 US equivalent required)',
    workExperienceFit: 'Rotary prioritizes candidates with demonstrated commitment to cross-cultural leadership and public service. Framing remote federal contracting + Nigerian educational advocacy is highly impactful.',
    postStudyWorkOpportunity: 'In USA: 1-Year OPT (or 3-Year STEM depending on policy classification); In UK: 2-Year Graduate Route.',
    pros: [
      'Covers 100% of everything: tuition, room, board, internship travel, books',
      'Rotary Global Alumni network of 1,700+ peace leaders in 140 countries',
      'Prestigious institutions (Duke University Sanford School / UNC Chapel Hill)'
    ],
    cons: [
      'Requires endorsement from a local Rotary District (District 9110/9125 in Nigeria)'
    ],
    checklist: [
      { id: 'r1', label: 'Contact local Nigerian Rotary Club (e.g. Lagos, Abuja, Ibadan) for district endorsement', completed: false, required: true },
      { id: 'r2', label: 'Draft 3 Peace Fellowship essays', completed: false, required: true },
      { id: 'r3', label: 'Kadaj Alliance professional recommendation', completed: false, required: true },
      { id: 'r4', label: 'Academic transcripts from Nigerian university', completed: true, required: true }
    ],
    notes: 'One of the most generous fully-funded fellowships on Earth. Early outreach to a Nigerian Rotary club is key.',
    discoveredAt: '2026-10-07'
  },
  {
    id: 'fulbright-nigeria-2026',
    title: 'Fulbright Foreign Student Program (Nigeria Cohort)',
    universityOrFunder: 'US Department of State & US Mission to Nigeria (Public Affairs Section)',
    country: 'USA',
    region: 'North America',
    degreeLevel: 'Masters (2 Years)',
    targetFields: ['International Relations', 'Political Science', 'Diplomacy', 'Public Administration'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition & Mandatory Fees ($45,000 - $70,000/yr)',
    monthlyStipend: '$1,800 - $2,400/month living stipend (adjusted for US city)',
    travelAllowance: 'Roundtrip international airfare + health benefit plan (ASPE)',
    deadline: '2026-06-01',
    intake: 'Fall 2027 (Annual Nigerian portal open March to June)',
    url: 'https://ng.usembassy.gov/education-culture/fulbright/',
    relevanceScore: 93,
    status: 'new',
    greRequired: 'waived',
    ieltsRequirement: 'Fulbright sponsors and administers TOEFL/GRE fees for shortlisted finalists!',
    cgpaRequirement: 'Requires Second Class Upper (2:1). Your 3.57/5.0 fulfills this exact criteria.',
    workExperienceFit: 'Your 1-year experience as remote bid specialist for Kadaj Alliance LLC (a US federal contracting company) creates an immediate, compelling bridge to US-Nigeria diplomatic ties and public sector collaboration.',
    postStudyWorkOpportunity: 'J-1 Visa requires 2-year home country physical presence before applying for US immigrant visa; positions you for top international NGO, UN, or ECOWAS postings in West Africa.',
    pros: [
      'Fulbright pays for all standardized testing (GRE/TOEFL) for finalists',
      'Matches candidate with leading US universities (Georgetown, Columbia, Harvard Kennedy School, Tufts Fletcher)',
      'Unmatched prestige in international diplomacy'
    ],
    cons: [
      'J-1 home residency requirement (2 years)'
    ],
    checklist: [
      { id: 'f1', label: 'Study Objective Essay (focus on US-Nigeria bilateral trade & public governance)', completed: false, required: true },
      { id: 'f2', label: 'Personal Statement Essay', completed: false, required: true },
      { id: 'f3', label: '3 Confidential Letters of Reference', completed: false, required: true },
      { id: 'f4', label: 'Official University Transcripts & Degree Certificate', completed: true, required: true }
    ],
    notes: 'Leverage Kadaj Alliance LLC as living proof of bilateral US-Nigerian commercial coordination.',
    discoveredAt: '2026-10-06'
  },
  {
    id: 'mccall-macbain-mcgill',
    title: 'McCall MacBain Scholarship (McGill University)',
    universityOrFunder: 'McCall MacBain Foundation & McGill University',
    country: 'Canada',
    region: 'North America',
    degreeLevel: 'Masters (1 or 2 Years)',
    targetFields: ['Political Science', 'Public Policy', 'International Relations'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: 'Full Tuition & Fees for duration of degree',
    monthlyStipend: 'CAD $2,000/month living stipend',
    travelAllowance: 'CAD $10,000 summer funding grant for internships + relocation grant',
    deadline: '2026-08-25',
    intake: 'Fall 2027 (International applicant deadline late August)',
    url: 'https://mccallmacbainscholars.org/',
    relevanceScore: 94,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'McGill waives English test for applicants with bachelor degrees from universities where English is the language of instruction',
    cgpaRequirement: 'Requires minimum 3.0/4.0 on McGill scale. 3.57/5.0 converts to ~3.2.',
    workExperienceFit: 'Seeks exceptional character, community engagement, leadership, and entrepreneurial grit. Remote work at Kadaj Alliance exemplifies self-starter discipline.',
    postStudyWorkOpportunity: 'Canada offers up to 3-Year Post-Graduation Work Permit (PGWP) with direct pathways to Canadian Permanent Residency through Express Entry.',
    pros: [
      'Up to 3-year PGWP in Canada with strong economic opportunities',
      'CAD $2,000/mo stipend + CAD $10,000 summer internship grant',
      'Cohort leadership retreats and executive coaching'
    ],
    cons: [
      'Rigorous multi-stage interview process'
    ],
    checklist: [
      { id: 'm1', label: 'McCall MacBain online application form & 5 short essays', completed: false, required: true },
      { id: 'm2', label: '2 Reference letters (1 academic, 1 leadership/community or Kadaj Alliance)', completed: false, required: true },
      { id: 'm3', label: 'Apply to McGill MA in Political Science', completed: false, required: true }
    ],
    notes: 'Outstanding Canadian economic opportunity post-graduation with PGWP and Quebec/Federal PR pathways.',
    discoveredAt: '2026-10-10'
  },
  {
    id: 'utoronto-munk-gta',
    title: 'University of Toronto (Munk School of Global Affairs & MA Pol Sci GTA Fellowship)',
    universityOrFunder: 'University of Toronto Department of Political Science',
    country: 'Canada',
    region: 'North America',
    degreeLevel: 'Master of Arts (MA in Political Science)',
    targetFields: ['Political Science', 'International Relations', 'Comparative Politics'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'Full International Tuition Offset (~CAD $32,000/yr)',
    monthlyStipend: 'Guaranteed Graduate Teaching Assistantship (GTA) ~CAD $24,500/yr',
    travelAllowance: 'Departmental conference & research grants',
    deadline: '2026-12-15',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Dec 2026)',
    url: 'https://www.politics.utoronto.ca/graduate/programs/master-arts',
    relevanceScore: 91,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Eligible for waiver with official English Medium of Instruction letter from Nigerian University',
    cgpaRequirement: 'Requires B+ average in final two years. 3.57/5.0 sits comfortably at the B+/A- border.',
    workExperienceFit: 'Political Science Education degree is a massive advantage: you have pedagogical training, making you an ideal candidate for Graduate Teaching Assistantship positions.',
    postStudyWorkOpportunity: '3-Year Canada PGWP in Ontario (Toronto is the economic financial capital of Canada with top policy think tanks and global consultancies).',
    pros: [
      'Your Political Science Education background makes you the perfect Teaching Assistant!',
      'Ranked #1 university in Canada and top 20 globally for Political Science',
      'Immediate access to 3-Year Canadian PGWP'
    ],
    cons: [
      'Living costs in Toronto are high, though GTA package covers living basics'
    ],
    checklist: [
      { id: 'u1', label: 'SOP highlighting teaching philosophy and international contracting research', completed: false, required: true },
      { id: 'u2', label: 'Writing sample (undergraduate research paper in Political Science)', completed: false, required: true },
      { id: 'u3', label: '2 Academic Reference letters', completed: false, required: true },
      { id: 'u4', label: 'Official transcripts', completed: true, required: true }
    ],
    notes: 'Highlight your Political Science Education degree as pedagogical proof of readiness for Teaching Assistant pay.',
    discoveredAt: '2026-10-09'
  },
  {
    id: 'commonwealth-shared-uk',
    title: 'Commonwealth Shared Scholarship (UK Universities)',
    universityOrFunder: 'Commonwealth Scholarship Commission (CSC UK) & Partner Universities',
    country: 'United Kingdom',
    region: 'UK',
    degreeLevel: 'Masters (1 Year)',
    targetFields: ['International Relations', 'Peace Studies', 'Global Development', 'International Governance'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Fees paid by CSC & University',
    monthlyStipend: '£1,349/month living allowance (or £1,652/month in London)',
    travelAllowance: 'Full return flights to Nigeria + £250 warm clothing allowance + study travel grant',
    deadline: '2026-12-12',
    intake: 'Fall 2027 (Opens Nov 2026 / Deadline Dec 2026)',
    url: 'https://cscuk.fcdo.gov.uk/apply/shared-scholarships/',
    relevanceScore: 96,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Waived for Nigerian graduates across participating universities with WAEC or degree verification',
    cgpaRequirement: 'Must hold at least Upper Second Class (2:1). 3.57/5.0 directly qualifies!',
    workExperienceFit: 'Evaluated on development impact. Framing Kadaj Alliance remote federal bidding as public sector governance and transparency fits CSC development themes.',
    postStudyWorkOpportunity: 'Participants are expected to contribute to national development in Nigeria; opens doors to civil service, foreign affairs, or international organisations in West Africa.',
    pros: [
      'Full coverage of all expenses including clothing and thesis grant',
      'No application fee to CSC',
      'Covers specific development-focused IR courses at top UK universities'
    ],
    cons: [
      'Cannot be held by individuals who have already studied outside Nigeria'
    ],
    checklist: [
      { id: 'cs1', label: 'Identify eligible Commonwealth Shared courses (e.g. Birmingham, Sussex, Leeds)', completed: false, required: true },
      { id: 'cs2', label: 'Apply to university admission first to get student ID', completed: false, required: true },
      { id: 'cs3', label: 'Submit CSC Electronic Application System (EAS) form', completed: false, required: true }
    ],
    notes: 'Priority given to applicants without previous international study. Ideal for Nigerian first-time overseas students.',
    discoveredAt: '2026-10-08'
  },
  {
    id: 'ireland-fellows-africa',
    title: 'Ireland Fellows Programme - Africa (Department of Foreign Affairs)',
    universityOrFunder: 'Government of Ireland / Irish Aid',
    country: 'Ireland',
    region: 'Europe',
    degreeLevel: 'Masters (1 Year)',
    targetFields: ['International Relations', 'International Peace Studies', 'Human Rights', 'Global Governance'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Fees waived',
    monthlyStipend: '€1,200/month living stipend',
    travelAllowance: 'Return flights to Dublin, arrival allowance, health insurance, visa costs',
    deadline: '2026-07-28',
    intake: 'Fall 2027 (Stage 1 opens July 2026)',
    url: 'https://www.irishaid.ie/what-we-do/our-priority-areas/education/ireland-fellows-programme/',
    relevanceScore: 95,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'If shortlisted, British Council IELTS test is organized and funded by the Embassy of Ireland in Abuja!',
    cgpaRequirement: 'Minimum 2:1 Honours degree. 3.57/5.0 qualifies.',
    workExperienceFit: 'Requires min 1-2 years relevant experience. 1 year at Kadaj Alliance LLC in federal procurement meets the threshold.',
    postStudyWorkOpportunity: 'Ireland boasts Europe’s tech & diplomacy hub (Dublin) with English as primary language and 2-Year Stamp 1G post-graduate work rights.',
    pros: [
      'Ireland is an English-speaking EU country (no language barrier)',
      'Free visa and test funding provided by the Embassy',
      'Top institutions: Trinity College Dublin, University College Dublin'
    ],
    cons: [
      'Multi-stage selection with embassy interviews'
    ],
    checklist: [
      { id: 'ir1', label: 'Complete Stage 1 Preliminary Application Form', completed: false, required: true },
      { id: 'ir2', label: 'Employer Endorsement from Kadaj Alliance LLC', completed: false, required: true },
      { id: 'ir3', label: 'University Transcripts and degree certificate', completed: true, required: true }
    ],
    notes: 'Ireland offers 2-Year Stamp 1G post-study work visa in the EU. Dublin is the headquarters of major multilateral companies.',
    discoveredAt: '2026-10-11'
  },
  {
    id: 'flanders-master-mind',
    title: 'Master Mind Scholarship (Government of Flanders, Belgium)',
    universityOrFunder: 'Flemish Ministry of Education & Training / KU Leuven & Ghent University',
    country: 'Belgium',
    region: 'Europe',
    degreeLevel: 'Masters (1 or 2 Years)',
    targetFields: ['International Relations', 'European Studies', 'Political Science', 'Diplomacy'],
    fundingType: 'Full Tuition + Living Grant',
    fundingAmount: 'Tuition reduced to only €131/year + €10,000 living grant per year',
    monthlyStipend: '€10,000 grant paid in installments for living expenses',
    travelAllowance: 'Free student health insurance & orientation support',
    deadline: '2027-03-01',
    intake: 'Fall 2027 (Opens Dec 2026 / Deadline March 2027)',
    url: 'https://www.studyinflanders.be/scholarships/master-mind-scholarship',
    relevanceScore: 92,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'KU Leuven waives English test for graduates of universities with English medium instruction',
    cgpaRequirement: 'Requires GPA 3.5/4.0 or equivalent. Your 3.57/5.0 will be evaluated by faculty board.',
    workExperienceFit: 'Brussels is the capital of the European Union & NATO headquarters! KU Leuven is 20 minutes from Brussels by train, giving unparalleled diplomatic internships.',
    postStudyWorkOpportunity: 'Belgium offers a 1-year search year visa (Orientation Year) with unrestricted work rights across the EU.',
    pros: [
      'Heart of EU diplomacy: Brussels is right next door to KU Leuven',
      'KU Leuven is ranked #45 in the world',
      'Taught 100% in English'
    ],
    cons: [
      'Living grant of €10,000 is slightly tighter than UK/Germany stipends, though tuition is virtually zero'
    ],
    checklist: [
      { id: 'b1', label: 'Submit application to KU Leuven Master in European Studies / International Politics', completed: false, required: true },
      { id: 'b2', label: 'Request Master Mind nomination from university admissions office', completed: false, required: true },
      { id: 'b3', label: 'Motivation letter linking federal contracting to EU transatlantic diplomacy', completed: false, required: true }
    ],
    notes: 'Unbeatable geographic location: study 20 minutes from the European Parliament and NATO Headquarters.',
    discoveredAt: '2026-10-10'
  },
  {
    id: 'sciences-po-boutmy',
    title: 'Sciences Po Paris (PSIA) - Boutmy & Mastercard Foundation Scholars',
    universityOrFunder: 'Sciences Po Paris School of International Affairs & Mastercard Foundation',
    country: 'France',
    region: 'Europe',
    degreeLevel: 'Master of International Affairs (2 Years Taught in English)',
    targetFields: ['International Affairs', 'International Governance & Diplomacy', 'International Public Management'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Fees (€20,000/yr)',
    monthlyStipend: '€1,000 - €1,200/month living stipend',
    travelAllowance: 'Flight to France + health insurance + laptop grant + career mentoring',
    deadline: '2026-12-01',
    intake: 'Fall 2027 (Mastercard Foundation portal opens Oct 2026)',
    url: 'https://www.sciencespo.fr/students/en/fees-funding/bursaries-financial-aid/mastercard-foundation-scholars-program.html',
    relevanceScore: 93,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Accepts English Medium of Instruction letter from Nigerian University for PSIA English-taught tracks',
    cgpaRequirement: 'Requires Second Class Upper or minimum 3.5/5.0. 3.57 qualifies.',
    workExperienceFit: 'Sciences Po PSIA values international public policy and administrative acumen; Kadaj Alliance federal contracting stands out against typical undergrad applicants.',
    postStudyWorkOpportunity: 'France provides 1-Year Job Seeker / Business Creation Visa (RECE) for master’s graduates, convertible to Talent Passport.',
    pros: [
      'Ranked #2 globally in Politics & International Studies (behind only Harvard)',
      '100% taught in English in central Paris',
      'Mastercard Foundation covers all expenses + living stipend'
    ],
    cons: [
      'Highly selective admissions'
    ],
    checklist: [
      { id: 'p1', label: 'Apply for Mastercard Foundation Eligibility Certificate', completed: false, required: true },
      { id: 'p2', label: 'Submit Sciences Po International Graduate Application', completed: false, required: true },
      { id: 'p3', label: 'Provide 2 academic references + 1 professional reference', completed: false, required: true }
    ],
    notes: 'The premier diplomatic school in continental Europe. Faculty includes former prime ministers, UN undersecretaries, and ambassadors.',
    discoveredAt: '2026-10-09'
  },
  {
    id: 'npsia-carleton-canada',
    title: 'Norman Paterson School of International Affairs (NPSIA) - Carleton University',
    universityOrFunder: 'Carleton University Faculty of Public Affairs',
    country: 'Canada (Ottawa)',
    region: 'North America',
    degreeLevel: 'Master of Arts in International Affairs (MAIA)',
    targetFields: ['International Affairs', 'Diplomacy & Foreign Policy', 'International Trade Policy'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'Carleton International Graduate Scholarship ($10,000 - $15,000/yr offset)',
    monthlyStipend: 'Guaranteed Teaching/Research Assistantship (CAD $18,000 - $22,000/yr)',
    travelAllowance: 'Departmental travel and research subsidy',
    deadline: '2027-01-31',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Jan 31, 2027)',
    url: 'https://carleton.ca/npsia/',
    relevanceScore: 93,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Eligible for English language testing exemption with official Nigerian university letter confirming instruction in English',
    cgpaRequirement: 'Requires minimum B+ (77-79% or 3.3/4.0). 3.57/5.0 is directly in range.',
    workExperienceFit: 'Located in Ottawa (Canada’s capital). Federal contracting expertise at Kadaj Alliance LLC is directly transferable to Canadian federal and bilateral procurement and trade policy.',
    postStudyWorkOpportunity: 'Full 3-Year Post-Graduation Work Permit (PGWP) in Canada’s capital region, with direct access to Global Affairs Canada policy contractors.',
    pros: [
      'Canada’s oldest and most prestigious school of international affairs',
      'Located in Ottawa (embassies, Global Affairs Canada, NGO headquarters)',
      '3-Year PGWP and Ontario PNP immigration streams'
    ],
    cons: [
      'Winter climate in Ottawa is cold, but indoor tunnels connect campus buildings'
    ],
    checklist: [
      { id: 'np1', label: 'Statement of Intent detailing focus in International Trade / Diplomacy', completed: false, required: true },
      { id: 'np2', label: 'Writing sample (undergrad paper or policy memo)', completed: false, required: true },
      { id: 'np3', label: 'Kadaj Alliance employment letter highlighting federal bidding', completed: false, required: true }
    ],
    notes: 'Top policy school in Canada with highest rate of diplomatic placement.',
    discoveredAt: '2026-10-10'
  },
  {
    id: 'geneva-graduate-institute',
    title: 'Geneva Graduate Institute (IHEID) - Developing Country Scholarships',
    universityOrFunder: 'Graduate Institute of International and Development Studies',
    country: 'Switzerland',
    region: 'Europe',
    degreeLevel: 'Master in International and Development Studies (MINT)',
    targetFields: ['International Relations', 'Global Security', 'Trade and International Finance', 'Human Rights'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: 'Full Tuition Exemption (CHF 8,000/yr value)',
    monthlyStipend: 'CHF 20,000/year living scholarship (~$23,000 USD/yr)',
    travelAllowance: 'Financial aid travel reimbursement',
    deadline: '2027-01-15',
    intake: 'Fall 2027 (Financial aid portal opens Oct 2026)',
    url: 'https://www.graduateinstitute.ch/financial-aid',
    relevanceScore: 92,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Waived for applicants who completed an undergraduate degree entirely in English',
    cgpaRequirement: 'Requires Second Class Upper or high academic standing. 3.57 qualifies.',
    workExperienceFit: 'Located in Geneva, home to the United Nations European headquarters, WTO (World Trade Organization), and Red Cross. Remote federal procurement experience directly maps to WTO government procurement agreements (GPA)!',
    postStudyWorkOpportunity: 'Switzerland offers a 6-month post-study visa for master’s graduates to find employment in international organizations and multinationals.',
    pros: [
      'Center of global diplomacy: footsteps from the UN Palais des Nations and WTO',
      'CHF 20,000/yr scholarship covers high Geneva living costs',
      'No application fee for applicants applying for financial aid'
    ],
    cons: [
      'Competitive Swiss residency regulations after the 6-month search window'
    ],
    checklist: [
      { id: 'g1', label: 'Motivation letter linking federal procurement to WTO International Trade', completed: false, required: true },
      { id: 'g2', label: 'Financial Aid application form with tax/income proof', completed: false, required: true },
      { id: 'g3', label: 'Official academic transcripts and diploma', completed: true, required: true }
    ],
    notes: 'Frame Kadaj Alliance federal bidding into multilateral trade policy and WTO government procurement agreement research.',
    discoveredAt: '2026-10-09'
  },
  {
    id: 'ceu-vienna-excellence',
    title: 'Central European University (CEU Vienna) - Master’s Excellence Scholarship',
    universityOrFunder: 'Central European University Department of Public Policy & IR',
    country: 'Austria',
    region: 'Europe',
    degreeLevel: 'Masters in Public Policy / International Relations (1 or 2 Years)',
    targetFields: ['Public Policy', 'Global Governance', 'International Relations', 'International Affairs'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Waiver (€12,000 - €15,000/yr)',
    monthlyStipend: '€1,050/month living stipend for full duration',
    travelAllowance: 'Comprehensive health insurance + housing support in Vienna',
    deadline: '2027-02-01',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Feb 1, 2027)',
    url: 'https://www.ceu.edu/admissions/funding-fees/finaid-applicants/ma',
    relevanceScore: 96,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Waived for graduates who earned their bachelor’s degree in English from an accredited Nigerian university',
    cgpaRequirement: 'Minimum 3.5/5.0 or 2:1 Honours equivalent. 3.57 qualifies.',
    workExperienceFit: 'CEU Public Policy department values real-world administrative experience. 1 year of remote US federal bidding at Kadaj Alliance LLC is a stellar talking point for public procurement transparency modules.',
    postStudyWorkOpportunity: 'Austria provides a 12-month Red-White-Red Jobseeker Visa for Austrian university graduates with access to the European Union economic market.',
    pros: [
      'Ranked #22 globally in Politics and Public Policy',
      'Dual Austrian and US-accredited degrees',
      'Vienna consistently ranked world’s #1 most livable city'
    ],
    cons: [
      'High competition from Central/Eastern European applicants'
    ],
    checklist: [
      { id: 'ceu1', label: 'Statement of Purpose (focusing on public procurement governance)', completed: false, required: true },
      { id: 'ceu2', label: 'Writing Sample / Academic paper (undergrad Pol Sci Ed)', completed: false, required: true },
      { id: 'ceu3', label: '2 Letters of Recommendation (1 Kadaj Alliance, 1 Professor)', completed: false, required: true },
      { id: 'ceu4', label: 'Official Transcripts (3.57/5.0)', completed: true, required: true }
    ],
    notes: 'One of the most generous full funding programs in continental Europe with dual US & Austrian degrees.',
    discoveredAt: '2026-10-12'
  },
  {
    id: 'ubc-mppga-canada',
    title: 'University of British Columbia (UBC) - Master of Public Policy and Global Affairs (MPPGA)',
    universityOrFunder: 'UBC School of Public Policy and Global Affairs',
    country: 'Canada (Vancouver)',
    region: 'North America',
    degreeLevel: 'Master of Public Policy and Global Affairs (2 Years)',
    targetFields: ['Public Policy', 'Global Governance', 'International Affairs', 'Trade Diplomacy'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'MPPGA International Scholars Award + Faculty Fellowship ($25,000/yr)',
    monthlyStipend: 'Graduate Teaching Assistantship (CAD $22,000/yr)',
    travelAllowance: 'Global Policy Project field study funding',
    deadline: '2027-01-15',
    intake: 'Fall 2027 (Opens Sept 2026 / Deadline Jan 2027)',
    url: 'https://sppga.ubc.ca/master-public-policy-global-affairs/',
    relevanceScore: 94,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Exempt for applicants with degree from Nigerian university with English language of instruction',
    cgpaRequirement: 'Requires minimum B+ average (76%+) in final 2 years. 3.57/5.0 comfortably fulfills criteria.',
    workExperienceFit: 'The Global Policy Project requires candidates to conduct real client consulting. Experience delivering US federal bids for Kadaj Alliance LLC provides concrete client-facing and RFP analysis credibility.',
    postStudyWorkOpportunity: 'Full 3-Year Canada Post-Graduation Work Permit (PGWP) in British Columbia, with direct streams for BC Provincial Nominee Program (BC PNP) for tech, policy, and international trade.',
    pros: [
      'Top 35 university globally with world-renowned policy faculty',
      'Guaranteed Global Policy Project consulting with international organizations',
      'Full 3-Year Canadian PGWP work permit'
    ],
    cons: [
      'Vancouver has higher housing costs, partially offset by GTA salary'
    ],
    checklist: [
      { id: 'ubc1', label: 'Policy Memo / Statement of Intent', completed: false, required: true },
      { id: 'ubc2', label: 'Kadaj Alliance LLC reference letter', completed: false, required: true },
      { id: 'ubc3', label: 'Academic referee letter from Nigerian university', completed: false, required: true }
    ],
    notes: 'Exceptional economic pathway in Canada with 3-year PGWP and BC PNP PR nomination.',
    discoveredAt: '2026-10-12'
  },
  {
    id: 'hertie-berlin-mpp',
    title: 'Hertie School Berlin - Future of Europe & DAAD Public Policy Fellowships',
    universityOrFunder: 'Hertie School of Governance & DAAD',
    country: 'Germany (Berlin)',
    region: 'Europe',
    degreeLevel: 'Master of Public Policy (MPP) / Master of International Affairs (MIA)',
    targetFields: ['Public Policy', 'International Affairs', 'Global Governance', 'Diplomacy'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel',
    fundingAmount: '100% Tuition Waiver (€37,500 total value)',
    monthlyStipend: '€950 - €1,100/month living stipend',
    travelAllowance: 'Relocation & internship mobility grants across the EU',
    deadline: '2027-02-01',
    intake: 'Fall 2027 (Financial aid priority round Feb 1, 2027)',
    url: 'https://www.hertie-school.org/en/admissions/financial-aid-and-scholarships',
    relevanceScore: 95,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Accepted via English Medium of Instruction certificate from Nigerian university',
    cgpaRequirement: 'Requires above-average bachelor degree. 3.57/5.0 is well within their competitive range.',
    workExperienceFit: 'Hertie School focuses on digital governance, international administrative policy, and public procurement. Kadaj Alliance experience is immediately relevant to their public management curriculum.',
    postStudyWorkOpportunity: 'Germany provides 18-Month Jobseeker Visa for graduates, leading to EU Blue Card with fastest path to permanent residency in Europe.',
    pros: [
      'Berlin is the political and diplomatic center of Germany and the EU',
      'Dual degree options with Columbia SIPA, LSE, and Sciences Po',
      'Strong international student body with 60+ nationalities'
    ],
    cons: [
      'Requires separate financial aid motivation essay'
    ],
    checklist: [
      { id: 'h1', label: 'Hertie School online application and motivation letter', completed: false, required: true },
      { id: 'h2', label: 'CV highlighting Kadaj Alliance US federal bidding', completed: false, required: true },
      { id: 'h3', label: 'Academic reference letter', completed: false, required: true }
    ],
    notes: 'Located in central Berlin with direct access to European ministries, embassies, and think tanks.',
    discoveredAt: '2026-10-12',
    sourceHandle: '@scholarsregion',
    specCrossReference: {
      degreeFit: 'Direct fit: B.Sc. Pol Sci Ed fulfills social science criteria for Public Policy / International Affairs.',
      cgpaAudit: '3.57/5.0 clears the competitive threshold (equivalent to high 2:1 Honours).',
      workExpAudit: '1 year at Kadaj Alliance LLC in federal bidding matches institutional governance focus.',
      testAudit: 'No GRE required; English waived with Nigerian MOI letter.',
      postStudyAudit: '18-month German jobseeker visa + fast-track EU Blue Card.',
      verdict: 'EXCELLENT SPEC MATCH'
    }
  },
  {
    id: 'calgary-mpp-scholarsregion',
    title: 'University of Calgary - Master of Public Policy (MPP) & Graduate Assistantship',
    universityOrFunder: 'University of Calgary School of Public Policy',
    country: 'Canada (Alberta)',
    region: 'North America',
    degreeLevel: 'Master of Public Policy (1 Year Intensive)',
    targetFields: ['Public Policy', 'Global Governance', 'International Affairs', 'Energy Diplomacy'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'Full International Tuition Offset + School of Public Policy Scholarship ($20,000/yr)',
    monthlyStipend: 'Graduate Assistantship (Teaching/Research) ~CAD $21,500/yr',
    travelAllowance: 'Cap-stone policy conference travel funding',
    deadline: '2027-02-01',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Feb 1, 2027)',
    url: 'https://www.policyschool.ca/academic-programs/master-of-public-policy/',
    relevanceScore: 97,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Exempt for applicants with bachelor degree from Nigerian universities where instruction is in English',
    cgpaRequirement: 'Requires minimum 3.3/4.0 GPA. 3.57/5.0 converts to ~3.35, meeting the standard.',
    workExperienceFit: 'Featured by @scholarsregion: The Calgary School of Public Policy prioritizes applicants with procurement, regulatory, or administrative industry experience. Your Kadaj Alliance federal contracting background is an exceptional differentiator.',
    postStudyWorkOpportunity: 'Full 3-Year Canada PGWP. Alberta has zero provincial sales tax and the Alberta Advantage Immigration Program (AAIP) with direct PR streams for Master’s graduates.',
    pros: [
      'Sourced directly from @scholarsregion verified aggregator stream',
      'Intensive 1-year duration saves living costs while granting full Canadian 3-year PGWP',
      'Alberta provides rapid provincial nominee permanent residence pathways'
    ],
    cons: [
      'Intensive accelerated coursework requires solid preparation'
    ],
    checklist: [
      { id: 'uc1', label: 'Draft Policy Interest Statement emphasizing federal procurement & governance', completed: false, required: true },
      { id: 'uc2', label: 'Kadaj Alliance LLC reference letter highlighting SAM.gov compliance', completed: false, required: true },
      { id: 'uc3', label: 'Academic reference letter from Nigerian university', completed: false, required: true },
      { id: 'uc4', label: 'University transcript showing 3.57/5.0 CGPA', completed: true, required: true }
    ],
    notes: 'Direct recommendation from @scholarsregion: Outstanding policy hub in Western Canada with strong post-study retention.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@scholarsregion',
    specCrossReference: {
      degreeFit: 'Perfect match: B.Sc. Political Science Education provides the policy foundations required by Calgary.',
      cgpaAudit: '3.57/5.0 directly qualifies for admission & international scholarship consideration.',
      workExpAudit: '1-year remote bid administration at Kadaj Alliance LLC gives you real commercial policy credibility.',
      testAudit: 'No GRE required; official English Medium of Instruction letter from Nigeria waives IELTS.',
      postStudyAudit: 'Full 3-Year Post-Graduation Work Permit (PGWP) + Alberta AAIP Provincial Nominee PR stream.',
      verdict: 'EXCELLENT SPEC MATCH'
    }
  },
  {
    id: 'waterloo-magg-scholarsregion',
    title: 'University of Waterloo - Master of Arts in Global Governance (Balsillie School)',
    universityOrFunder: 'University of Waterloo & Balsillie School of International Affairs (BSIA)',
    country: 'Canada (Ontario)',
    region: 'North America',
    degreeLevel: 'Master of Arts in Global Governance (MAGG - 16 Months)',
    targetFields: ['Global Governance', 'International Relations', 'Public Policy', 'International Political Economy'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'Guaranteed Balsillie Graduate Fellowship ($15,000 CAD) + Tuition Offset',
    monthlyStipend: 'Guaranteed Graduate Teaching Assistantship (GTA) ~CAD $16,800/yr (Total package ~CAD $31,800)',
    travelAllowance: 'CIGI Internship travel grant for multilateral placements in Geneva, New York, or Ottawa',
    deadline: '2027-01-15',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Jan 15, 2027)',
    url: 'https://uwaterloo.ca/political-science/graduate-studies/master-arts-global-governance-magg',
    relevanceScore: 96,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Exempt with Nigerian University English Medium of Instruction letter',
    cgpaRequirement: 'Minimum 78% (3.57/5.0 CGPA qualifies in the Second Class Upper bracket).',
    workExperienceFit: 'Highlighted by @scholarsregion: The Balsillie School partners with the Centre for International Governance Innovation (CIGI). Federal contracting at Kadaj Alliance LLC provides concrete case studies on public procurement governance and transatlantic trade compliance.',
    postStudyWorkOpportunity: '3-Year Canada PGWP. Waterloo is known as Canada’s technology and policy innovation capital.',
    pros: [
      'Guaranteed funding package for all admitted international students (~CAD $31,800)',
      'Internship placement semester with international organizations (UN, OECD, embassies)',
      'No GRE required, seamless English waiver for Nigerian degree holders'
    ],
    cons: [
      'Requires a strong academic writing sample'
    ],
    checklist: [
      { id: 'w1', label: 'Submit Statement of Interest highlighting international procurement governance', completed: false, required: true },
      { id: 'w2', label: 'Academic writing sample (undergraduate thesis or research paper)', completed: false, required: true },
      { id: 'w3', label: 'Kadaj Alliance professional reference letter', completed: false, required: true },
      { id: 'w4', label: '2 Academic Reference letters', completed: false, required: true }
    ],
    notes: 'Flagged by @scholarsregion as one of the best-funded global governance programs in North America.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@scholarsregion',
    specCrossReference: {
      degreeFit: 'Direct match: Political Science Education is ideal for Global Governance analysis.',
      cgpaAudit: '3.57/5.0 satisfies the 78% threshold (Second Class Upper division).',
      workExpAudit: 'Remote US federal bidding at Kadaj Alliance LLC connects to global supply chain and procurement governance.',
      testAudit: 'No GRE required; English Medium of Instruction letter accepted.',
      postStudyAudit: 'Full 3-Year Canadian PGWP in Ontario with Express Entry Federal Skilled Worker points.',
      verdict: 'EXCELLENT SPEC MATCH'
    }
  },
  {
    id: 'saskatchewan-jsgs-scholarsregion',
    title: 'University of Saskatchewan (Johnson Shoyama) - Master of Public Administration (MPA)',
    universityOrFunder: 'Johnson Shoyama Graduate School of Public Policy (JSGS)',
    country: 'Canada (Saskatchewan)',
    region: 'North America',
    degreeLevel: 'Master of Public Administration (MPA - 2 Years)',
    targetFields: ['Public Policy', 'Public Administration', 'Global Governance', 'Policy Management'],
    fundingType: 'Full Tuition + GTA/GRA Salary',
    fundingAmount: 'JSGS International Graduate Entrance Scholarship ($10,000 CAD) + Tuition waiver',
    monthlyStipend: 'Graduate Research / Teaching Assistantship ~CAD $20,400/yr',
    travelAllowance: 'Canadian policy conference & simulation travel grants',
    deadline: '2027-02-15',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Feb 15, 2027)',
    url: 'https://www.schoolofpublicpolicy.sk.ca/programs/graduate-programs/master-of-public-administration.php',
    relevanceScore: 95,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Exempt for Nigerian graduates whose medium of instruction was English',
    cgpaRequirement: 'Minimum 75% over final two years. Your 3.57/5.0 exceeds this requirement.',
    workExperienceFit: 'Sourced from @scholarsregion: JSGS trains public sector administrators. Managing US federal SAM.gov bidding workflows and compliance at Kadaj Alliance LLC translates directly into public sector contract administration coursework.',
    postStudyWorkOpportunity: '3-Year Canada PGWP. Saskatchewan offers the Saskatchewan Immigrant Nominee Program (SINP) Student Category, recognized as the fastest path to Canadian Permanent Residency.',
    pros: [
      'Direct recommendation from @scholarsregion for Nigerian scholars seeking Canadian PR',
      'SINP Student Stream allows applying for Permanent Residency with minimal wait times',
      'Affordable living costs in Saskatoon with full assistantship salary'
    ],
    cons: [
      'Winter climate is cold, but university has underground walkways'
    ],
    checklist: [
      { id: 'sk1', label: 'Letter of Intent focusing on public contract management and procurement ethics', completed: false, required: true },
      { id: 'sk2', label: 'Kadaj Alliance LLC reference letter', completed: false, required: true },
      { id: 'sk3', label: 'Degree certificate and transcripts from Nigerian university', completed: true, required: true }
    ],
    notes: 'Featured on @scholarsregion: Fastest PR route in Canada via SINP post-graduation.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@scholarsregion',
    specCrossReference: {
      degreeFit: 'High synergy: B.Sc. Pol Sci Ed background is directly applicable to JSGS Public Administration.',
      cgpaAudit: '3.57/5.0 safely clears the 75% cutoff.',
      workExpAudit: 'Kadaj Alliance US federal contract administration is tailor-made for MPA procurement modules.',
      testAudit: 'No GRE required; MOI letter waives IELTS.',
      postStudyAudit: 'Fastest Canadian Permanent Residency via Saskatchewan Immigrant Nominee Program (SINP).',
      verdict: 'EXCELLENT SPEC MATCH'
    }
  },
  // --- ADDITIONAL PRESTIGIOUS GLOBAL MASTERS SCHOLARSHIPS ---
  {
    id: 'fulbright-foreign-student-nigeria',
    title: 'Fulbright Foreign Student Program (USA Government)',
    universityOrFunder: 'US Department of State / US Embassy Abuja & Lagos Consulate',
    country: 'United States',
    region: 'North America',
    degreeLevel: 'Masters (2 Years in USA)',
    targetFields: ['International Relations', 'Public Policy', 'Diplomacy', 'Global Governance'],
    fundingType: 'Full Tuition + Monthly Stipend + Travel + Health Insurance',
    fundingAmount: '100% Tuition (~$55,000/year value across top US universities)',
    monthlyStipend: '$1,800 - $2,400/month living stipend (adjusted by US city)',
    travelAllowance: 'Round-trip international flight ticket Nigeria-USA + settling-in allowance',
    deadline: '2026-06-01',
    intake: 'Fall 2027 (Opens Feb 2026 / Deadline June 2026)',
    url: 'https://foreign.fulbrightonline.org/',
    relevanceScore: 99,
    status: 'new',
    greRequired: 'waived or funded by Fulbright',
    ieltsRequirement: 'Fulbright pays for and administers official English testing or waives based on interview',
    cgpaRequirement: 'Minimum Second Class Upper (2:1). Your 3.57/5.0 clears the bar directly.',
    workExperienceFit: 'Superpower match: You have verified hands-on operational experience with US federal contracting regulations (FAR, SAM.gov, RFQ) at Kadaj Alliance LLC. This makes your US diplomacy and public policy narrative extraordinary in the eyes of the US selection panel in Lagos!',
    postStudyWorkOpportunity: 'J-1 Visa requires returning to Nigeria for 2 years, positioning you for rapid ascension into the Nigerian foreign service, ECOWAS, or international development agencies.',
    pros: [
      'The most prestigious educational exchange scholarship funded by the US Government',
      'Matches candidate directly with top US universities (Georgetown, Syracuse, Columbia, American University)',
      'All testing, visa fees, airfare, and living stipends 100% covered'
    ],
    cons: [
      'Competitive national selection interview in Lagos / Abuja'
    ],
    checklist: [
      { id: 'fb1', label: 'Draft Study Objectives essay articulating US federal procurement governance', completed: false, required: true },
      { id: 'fb2', label: 'Draft Personal Statement highlighting LASU leadership & transatlantic work', completed: false, required: true },
      { id: 'fb3', label: 'Obtain 3 letters of reference (Kadaj Alliance LLC + LASU professors)', completed: false, required: true }
    ],
    notes: 'Kadaj Alliance LLC experience gives you an unmatched authentic connection to transatlantic US governance.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@FulbrightPrgrm'
  },
  {
    id: 'columbia-sipa-international-fellowship',
    title: 'Columbia University SIPA Dean’s Merit Fellowship (New York City)',
    universityOrFunder: 'Columbia University School of International and Public Affairs (SIPA)',
    country: 'United States (New York)',
    region: 'North America',
    degreeLevel: 'Master of International Affairs (MIA - 2 Years)',
    targetFields: ['International Relations', 'International Security Policy', 'Global Governance'],
    fundingType: 'Full Tuition Merit Fellowship + Graduate Assistantship',
    fundingAmount: 'Full Tuition Grant ($68,000/yr value) + Teaching Assistantship stipend',
    monthlyStipend: '$2,500/month Graduate Assistantship stipend in New York',
    travelAllowance: 'SIPA Global Travel Grant for United Nations and embassy conferences',
    deadline: '2027-01-05',
    intake: 'Fall 2027 (Opens Sept 2026 / Early Fellowship Deadline Jan 5, 2027)',
    url: 'https://www.sipa.columbia.edu/admissions/financial-aid',
    relevanceScore: 97,
    status: 'new',
    greRequired: 'optional (test-optional policy for MIA candidates)',
    ieltsRequirement: 'Exempt with English Medium of Instruction letter from LASU',
    cgpaRequirement: '3.50+ recommended. Your 3.57/5.0 satisfies the academic criteria.',
    workExperienceFit: 'SIPA places heavy emphasis on practical public sector / commercial procurement experience. Kadaj Alliance SAM.gov bidding operations prove real-world maturity.',
    postStudyWorkOpportunity: '3-Year US STEM OPT if completing International Finance / Economic Policy concentration, or 1-year OPT leading to UN / World Bank G-4 visa sponsorship in NYC.',
    pros: [
      'Global capital of diplomacy: Located in Manhattan, 20 minutes from the United Nations Headquarters',
      'World-renowned faculty of former ambassadors, foreign ministers, and international economists',
      'Strong institutional alumni network across global governance institutions'
    ],
    cons: [
      'New York City living costs are high, requiring maximizing SIPA assistantship funding'
    ],
    checklist: [
      { id: 'cs1', label: 'Statement of Purpose connecting Nigerian governance with UN diplomacy', completed: false, required: true },
      { id: 'cs2', label: 'Video essay submission via SIPA applicant portal', completed: false, required: true },
      { id: 'cs3', label: 'Kadaj Alliance supervisor professional recommendation letter', completed: false, required: true }
    ],
    notes: 'World-class Ivy League program in the heart of New York City.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@ColumbiaSIPA'
  },
  {
    id: 'oxford-blavatnik-africa-scholarship',
    title: 'University of Oxford - Africa Public Policy Scholarship (MPP)',
    universityOrFunder: 'Blavatnik School of Government, University of Oxford',
    country: 'United Kingdom',
    region: 'UK',
    degreeLevel: 'Master of Public Policy (MPP - 1 Year)',
    targetFields: ['Public Policy', 'Public Governance', 'International Relations', 'Statecraft'],
    fundingType: 'Full Course Fees + Living Costs Grant',
    fundingAmount: '100% Course Fees (~£53,000 value) + Full Living Grant',
    monthlyStipend: '£1,550/month (~£18,622/year tax-free living allowance)',
    travelAllowance: 'Oxford Applied Policy Project global placement travel expenses covered',
    deadline: '2027-01-20',
    intake: 'Fall 2027 (Opens Sept 2026 / Deadline Jan 20, 2027)',
    url: 'https://www.bsg.ox.ac.uk/study/mpp/fees-and-funding',
    relevanceScore: 98,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'UK Oxford standard (waivable or easily cleared with standard academic test)',
    cgpaRequirement: 'Requires strong First Class or upper Second Class (2:1). Your 3.57/5.0 makes you eligible.',
    workExperienceFit: 'The Blavatnik MPP seeks individuals committed to public good and institutional transparency. Managing federal contract compliance and public vendor ethics at Kadaj Alliance LLC is exemplary evidence.',
    postStudyWorkOpportunity: '2-Year UK Graduate Route Visa (PSW), or direct fast-track into African development agencies, Tony Blair Institute, or civil service leadership.',
    pros: [
      'The highest prestige brand in global public policy and political leadership',
      'Africa Scholarship automatically evaluated upon submitting standard MPP application',
      'Historic collegiate university experience in Oxford'
    ],
    cons: [
      'High academic rigor in policy analysis and public economics'
    ],
    checklist: [
      { id: 'ox1', label: 'Policy memo writing sample (max 1,500 words on institutional procurement reform)', completed: false, required: true },
      { id: 'ox2', label: 'Personal statement on public service dedication and transatlantic ethics', completed: false, required: true },
      { id: 'ox3', label: '3 academic/professional references', completed: false, required: true }
    ],
    notes: 'The pre-eminent statecraft and governance program in Europe.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@BlavatnikSchool'
  },
  {
    id: 'erasmus-mundus-eps',
    title: 'Erasmus Mundus Joint Master in European Politics and Society (EPS)',
    universityOrFunder: 'European Commission (Erasmus+ Consortium)',
    country: 'Czech Republic / Netherlands / Spain / Poland',
    region: 'Europe',
    degreeLevel: 'Joint Master Degree (2 Years across 4 European Capitals)',
    targetFields: ['European Politics', 'International Relations', 'Diplomacy', 'Global Security'],
    fundingType: 'Full Scholarship (Tuition + Monthly Stipend + Travel)',
    fundingAmount: '100% Tuition Exemption + €1,400/month living allowance',
    monthlyStipend: '€1,400/month tax-free living allowance for full 24 months',
    travelAllowance: '€3,000/year travel & installation grant + worldwide health insurance',
    deadline: '2027-02-28',
    intake: 'Fall 2027 (Opens Nov 2026 / Deadline Feb 2027)',
    url: 'https://eps.fsv.cuni.cz/',
    relevanceScore: 97,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'English Medium of Instruction letter from LASU accepted',
    cgpaRequirement: 'Minimum 2:1 equivalent (3.57/5.0 qualifies perfectly).',
    workExperienceFit: 'Consortium spans Charles University Prague, Leiden University, Pompeu Fabra Barcelona, and Jagiellonian Krakow. International work experience at Kadaj Alliance LLC proves global agility.',
    postStudyWorkOpportunity: 'Access to European Schengen job search visas across Netherlands (Zoekjaar orientation year visa) or Spain.',
    pros: [
      'Study across two or three prestigious European capital universities with double/joint degrees',
      'Extremely generous monthly allowance (€1,400/mo) in affordable European cities',
      'No application fee'
    ],
    cons: [
      'Relocating between European cities every year'
    ],
    checklist: [
      { id: 'em1', label: 'Motivation letter detailing European-African bilateral governance', completed: false, required: true },
      { id: 'em2', label: 'Certified transcripts and degree certificate from LASU', completed: true, required: true },
      { id: 'em3', label: 'Two recommendation letters from academic referees', completed: false, required: true }
    ],
    notes: 'Funded directly by the EU. High selection rate for strong African social science graduates.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@ErasmusMundus'
  },
  {
    id: 'sciences-po-emile-boutmy',
    title: 'Sciences Po Paris - Émile Boutmy Excellence Scholarship (France)',
    universityOrFunder: 'Sciences Po (Paris School of International Affairs - PSIA)',
    country: 'France (Paris)',
    region: 'Europe',
    degreeLevel: 'Master in International Governance & Diplomacy (2 Years - Taught in English)',
    targetFields: ['International Relations', 'Diplomacy', 'Global Governance', 'Public Policy'],
    fundingType: 'Tuition Grant + Living Allowance',
    fundingAmount: 'Full Tuition Grant (€14,720/year) + €5,000/year living grant',
    monthlyStipend: '€1,000/month combined living stipend and French CAF housing subsidy',
    travelAllowance: 'Subsidized European railway travel and diplomatic summit access',
    deadline: '2026-12-01',
    intake: 'Fall 2027 (Opens Oct 2026 / Boutmy Deadline Dec 1, 2026)',
    url: 'https://www.sciencespo.fr/students/en/fees-funding/financial-aid/emile-boutmy-scholarship.html',
    relevanceScore: 96,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Accepted via English Medium of Instruction letter from LASU',
    cgpaRequirement: 'Minimum 3.50/5.0. Your 3.57/5.0 meets the criteria.',
    workExperienceFit: 'Sciences Po PSIA is Europe’s top-ranked school for international affairs. Kadaj Alliance US federal contract compliance background highlights practical cross-border acumen.',
    postStudyWorkOpportunity: 'France offers a 1-Year Jobseeker Visa (Receveur de carte de séjour - recherche d’emploi) leading to European Talent Passport.',
    pros: [
      'Alumni include French Presidents, heads of the UN, and European Commission leaders',
      '100% taught in English in Paris with optional French language classes',
      'Strong internship semester at OECD, UNESCO, or European embassies'
    ],
    cons: [
      'Early December deadline for non-EU scholarship candidates'
    ],
    checklist: [
      { id: 'sp1', label: 'Academic CV highlighting Political Science research and Kadaj Alliance LLC', completed: false, required: true },
      { id: 'sp2', label: 'Two academic reference letters submitted via Sciences Po portal', completed: false, required: true },
      { id: 'sp3', label: 'Boutmy financial motivation statement', completed: false, required: true }
    ],
    notes: 'France leading institution for political science and diplomacy.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@SciencesPo'
  },
  {
    id: 'toronto-munk-global-affairs',
    title: 'University of Toronto - Munk School Fellowship (Master of Global Affairs)',
    universityOrFunder: 'Munk School of Global Affairs & Public Policy, University of Toronto',
    country: 'Canada (Ontario)',
    region: 'North America',
    degreeLevel: 'Master of Global Affairs (MGA - 2 Years)',
    targetFields: ['Global Affairs', 'International Relations', 'Global Security', 'Development Policy'],
    fundingType: 'Tuition Fellowship + Teaching Assistantship',
    fundingAmount: 'Cad $30,000 Entrance Fellowship + Departmental Graduate Assistantship',
    monthlyStipend: 'CAD $1,800/month teaching assistantship salary in Toronto',
    travelAllowance: 'CAD $5,000 Global Internship bursary for summer placement abroad',
    deadline: '2027-01-25',
    intake: 'Fall 2027 (Opens Oct 2026 / Deadline Jan 25, 2027)',
    url: 'https://munkschool.utoronto.ca/mga/admissions/fees-financial-aid',
    relevanceScore: 98,
    status: 'new',
    greRequired: 'not required',
    ieltsRequirement: 'Waived for Nigerian university graduates whose instruction was in English',
    cgpaRequirement: 'Minimum B+ (77-79%) in final two years. 3.57/5.0 comfortably fulfills this.',
    workExperienceFit: 'The Munk School values practical analytical background. Your federal solicitation analysis and RFP review at Kadaj Alliance LLC is an ideal fit for MGA’s Global Markets & Governance stream.',
    postStudyWorkOpportunity: '3-Year Canadian Post-Graduation Work Permit (PGWP). Toronto is Canada’s economic engine with rapid Ontario Immigrant Nominee Program (OINP) PR pathway.',
    pros: [
      'Canada #1 ranked university and top 20 globally',
      'Mandatory funded international summer internship included in degree',
      'Direct pipeline to Canadian federal government, multilateral banks, and consultancies'
    ],
    cons: [
      'Toronto housing requires planning, offset by the TA salary and scholarship'
    ],
    checklist: [
      { id: 'tm1', label: 'Statement of Interest connecting transatlantic trade and procurement diplomacy', completed: false, required: true },
      { id: 'tm2', label: 'Academic writing sample or undergraduate thesis chapter', completed: false, required: true },
      { id: 'tm3', label: 'LASU degree transcripts and Kadaj Alliance professional referee', completed: false, required: true }
    ],
    notes: 'Canada premier school of global affairs with a clear path to Canadian PR.',
    discoveredAt: '2026-10-13',
    sourceHandle: '@MunkSchool'
  }
];

