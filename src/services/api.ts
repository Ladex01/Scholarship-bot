import { Scholarship, UserProfile, AgentTrainingConfig, DiagnosticQuestion } from '../types';

export interface TelegramBotInfo {
  id: number;
  username: string;
  first_name: string;
}

export interface TelegramUpdate {
  chatId: number;
  username?: string;
  firstName?: string;
  text?: string;
  date: number;
}

export async function testTelegramBot(botToken?: string): Promise<{ ok: boolean; bot?: TelegramBotInfo; error?: string }> {
  try {
    const res = await fetch('/api/telegram/test-bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message || 'Network error connecting to Telegram API' };
  }
}

export async function getTelegramUpdates(botToken?: string): Promise<{ ok: boolean; updates?: TelegramUpdate[]; error?: string }> {
  try {
    const res = await fetch('/api/telegram/get-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function sendTelegramAlert(
  chatId: string,
  message: string,
  botToken?: string
): Promise<{ ok: boolean; messageId?: number; error?: string }> {
  try {
    const res = await fetch('/api/telegram/send-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message, botToken, parseMode: 'HTML' }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function runGeminiScan(
  profile: UserProfile,
  preferences: AgentTrainingConfig,
  customQuery?: string
): Promise<{ ok: boolean; scholarships?: Scholarship[]; error?: string }> {
  try {
    const res = await fetch('/api/gemini/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, preferences, customQuery }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function generateSopPitch(
  scholarshipTitle: string,
  university: string,
  profile: UserProfile
): Promise<{ ok: boolean; pitch?: string; error?: string }> {
  try {
    const res = await fetch('/api/gemini/sop-pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scholarshipTitle, university, profile }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function fetchAiDiagnostics(
  currentAnswers: Record<string, string>
): Promise<{ ok: boolean; diagnostics?: any; error?: string }> {
  try {
    const res = await fetch('/api/gemini/diagnostics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentAnswers }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function runGeminiJobScan(
  profile: UserProfile,
  preferences: AgentTrainingConfig,
  customQuery?: string
): Promise<{ ok: boolean; jobs?: any[]; error?: string }> {
  try {
    const res = await fetch('/api/gemini/scan-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, preferences, customQuery }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function generateJobPitch(
  job: any,
  profile: UserProfile
): Promise<{ ok: boolean; pitch?: string; error?: string }> {
  try {
    const res = await fetch('/api/gemini/job-pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job, profile }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function fetchNyscDiagnostics(
  currentAnswers: Record<string, string>
): Promise<{ ok: boolean; diagnostics?: any; error?: string }> {
  try {
    const res = await fetch('/api/gemini/nysc-diagnostics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentAnswers }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function sendTelegramJobAlert(
  chatId: string,
  job: any,
  botToken?: string
): Promise<{ ok: boolean; messageId?: number; error?: string }> {
  const messageHtml = `💼 <b>LAGOS JOB & NYSC PPA ALERT</b>\n\n` +
    `🏢 <b>${job.company}</b>\n` +
    `🎯 <b>${job.title}</b>\n` +
    `📍 <i>${job.location} · ${job.workType}</i>\n` +
    `💰 <b>Stipend / Salary:</b> ${job.salaryStipend}\n` +
    `🏷 <b>Category:</b> ${job.category} (${job.jobType})\n` +
    `⏰ <b>Deadline:</b> ${job.deadline}\n` +
    `🌐 <b>Source:</b> ${job.source}\n` +
    `📊 <b>Relevance Score:</b> ${job.relevanceScore}% (Kadaj Alliance LLC US Bidding Fit)\n\n` +
    `💡 <b>Why You Stand Out:</b>\n${job.whyAdefolabiFits}\n\n` +
    `🔗 <a href="${job.sourceUrl}">Open Application Link</a>\n\n` +
    `<i>Generate your Corporate PPA Request Letter on your web dashboard!</i>`;

  return sendTelegramAlert(chatId, messageHtml, botToken);
}

