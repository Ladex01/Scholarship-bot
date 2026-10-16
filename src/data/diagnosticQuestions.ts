import { DiagnosticQuestion } from '../types';

export const INITIAL_DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'moi_letter',
    question: 'Do you have an official "English as Medium of Instruction" (MOI) letter from your Nigerian university?',
    rationale: 'In Canada, Germany (DAAD), Sweden, and several UK universities, this single document can waive the $250+ IELTS/TOEFL exam requirement for Nigerian graduates.',
    category: 'readiness',
    options: [
      'Yes, I have it ready in PDF',
      'No, but my university registrar can issue it quickly',
      'No, I will need to request it from my department',
      'I plan to write IELTS / Duolingo instead'
    ],
    selectedAnswer: 'Yes, I have it ready in PDF'
  },
  {
    id: 'kadaj_reference',
    question: 'Can your supervisor or executive at Kadaj Alliance LLC provide an official recommendation letter on company letterhead?',
    rationale: 'A reference letter from a US federal contracting company is an immense credibility booster in applications to US, Canadian, and UK policy schools, setting you apart from purely academic candidates.',
    category: 'career',
    options: [
      'Yes, my manager will gladly provide a strong letter of recommendation',
      'Yes, but I will need to provide a draft for them to sign',
      'I can get an employment verification letter, but need to ask about a custom recommendation',
      'Not sure yet'
    ],
    selectedAnswer: 'Yes, my manager will gladly provide a strong letter of recommendation'
  },
  {
    id: 'post_study_work_goal',
    question: 'What is your primary career trajectory immediately after graduating with your Masters?',
    rationale: 'Some scholarships (Chevening, Fulbright) require returning to Nigeria for 2 years, whereas Canadian Assistantships, DAAD, and Erasmus allow you to stay and work on 18-month to 3-year post-study work permits.',
    category: 'career',
    options: [
      'Target post-study work visa (Canada 3-yr PGWP / Germany 18-mo Jobseeker / UK PSW) for economic career growth',
      'Return to Nigeria for foreign service / diplomatic corps / ECOWAS leadership',
      'Open to either path as long as the Masters is 100% fully funded'
    ],
    selectedAnswer: 'Target post-study work visa (Canada 3-yr PGWP / Germany 18-mo Jobseeker / UK PSW) for economic career growth'
  },
  {
    id: 'app_fee_stance',
    question: 'What is your strategy regarding university application fees and credential evaluations (e.g. WES)?',
    rationale: 'Some US/Canadian universities charge $75 - $125 application fees unless a fee waiver is requested, whereas European scholarships (DAAD, Erasmus Mundus, Chevening, Swedish Institute) have $0 application fees.',
    category: 'financial',
    options: [
      'Zero application fees only (must have fee waivers or free European portals)',
      'I can afford $50 - $150 total for 1-2 top strategic Canadian/US programs',
      'I have a small budget for WES evaluation if it guarantees full funding'
    ],
    selectedAnswer: 'Zero application fees only (must have fee waivers or free European portals)'
  },
  {
    id: 'ir_specialization',
    question: 'Which specific branch of International Relations & Diplomacy resonates most with your long-term ambitions?',
    rationale: 'Tailoring your SOP around this allows the AI to pitch your 1-year US federal contracting experience with laser focus.',
    category: 'academic',
    options: [
      'International Public Procurement, Transatlantic Trade & Governance (directly connects to Kadaj Alliance)',
      'Diplomacy, Foreign Policy Analysis & Bilateral US-Africa Relations',
      'Peacebuilding, Conflict Resolution & Security Studies',
      'Global Governance, International Law & Multilateral Institutions'
    ],
    selectedAnswer: 'International Public Procurement, Transatlantic Trade & Governance (directly connects to Kadaj Alliance)'
  },
  {
    id: 'intake_timeline',
    question: 'Which academic intake cycle are you targeting to begin your studies?',
    rationale: 'Fall 2026 application deadlines close between December 2025 and March 2026. Fall 2027 applications open between August 2026 and November 2026 (e.g., Chevening opens August 2026).',
    category: 'readiness',
    options: [
      'Fall 2026 (Priority: immediate open late rounds & rolling deadlines)',
      'Fall 2027 (Priority: full cycle for Chevening, DAAD, Erasmus Mundus, Fulbright)',
      'Both: apply for any remaining Fall 2026 while gearing up for Fall 2027 prestige rounds'
    ],
    selectedAnswer: 'Both: apply for any remaining Fall 2026 while gearing up for Fall 2027 prestige rounds'
  }
];
