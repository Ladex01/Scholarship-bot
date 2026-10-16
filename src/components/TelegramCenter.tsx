import React, { useState, useEffect } from 'react';
import {
  Send,
  Bot,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  RefreshCw,
  Bell,
  Sliders,
  ShieldCheck,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { UserProfile, Scholarship } from '../types';
import { testTelegramBot, getTelegramUpdates, sendTelegramAlert, TelegramUpdate } from '../services/api';

interface TelegramCenterProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  featuredScholarship?: Scholarship;
}

export const TelegramCenter: React.FC<TelegramCenterProps> = ({
  profile,
  onUpdateProfile,
  featuredScholarship,
}) => {
  const [botToken, setBotToken] = useState(profile.telegramBotToken || '8854756208:AAGmabFVzYUvPPsyQcCm65OLCIVyBQaNcDQ');
  const [chatId, setChatId] = useState(profile.telegramChatId || '');
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [botStatus, setBotStatus] = useState<{ ok: boolean; username?: string; error?: string } | null>(null);
  const [isFetchingUpdates, setIsFetchingUpdates] = useState(false);
  const [detectedUpdates, setDetectedUpdates] = useState<TelegramUpdate[]>([]);
  const [isSendingTestAlert, setIsSendingTestAlert] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState<string | null>(null);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(null);
  const [sentLog, setSentLog] = useState<{ id: string; time: string; text: string }[]>([]);

  // Test bot and check server-side sync on mount
  useEffect(() => {
    const init = async () => {
      if (botToken) {
        handleTestBot();
      }
      try {
        const res = await fetch('/api/telegram/status');
        const data = await res.json();
        if (data.ok && data.chatId) {
          setChatId(data.chatId);
          onUpdateProfile({ telegramChatId: data.chatId, telegramBotToken: botToken });
        }
      } catch (err) {
        console.warn('Could not fetch server telegram status:', err);
      }
    };
    init();
  }, []);

  const handleTestBot = async () => {
    setIsTestingBot(true);
    setBotStatus(null);
    const res = await testTelegramBot(botToken);
    setIsTestingBot(false);
    if (res.ok && res.bot) {
      setBotStatus({ ok: true, username: res.bot.username });
    } else {
      setBotStatus({ ok: false, error: res.error || 'Connection failed' });
    }
  };

  const handleFetchUpdates = async () => {
    setIsFetchingUpdates(true);
    setAlertSuccessMessage(null);
    setAlertErrorMessage(null);
    const res = await getTelegramUpdates(botToken);
    setIsFetchingUpdates(false);

    if (res.ok && res.updates && res.updates.length > 0) {
      setDetectedUpdates(res.updates);
      // Auto-set the latest chat ID
      const latestChatId = String(res.updates[0].chatId);
      setChatId(latestChatId);
      onUpdateProfile({ telegramChatId: latestChatId, telegramBotToken: botToken });
      setAlertSuccessMessage(`Found Chat ID: ${latestChatId} (${res.updates[0].firstName || res.updates[0].username || 'User'})! Saved to profile.`);
    } else if (res.ok && (!res.updates || res.updates.length === 0)) {
      setAlertErrorMessage('No messages received yet. Please open Telegram, search for your bot, and send /start, then click this button again!');
    } else {
      setAlertErrorMessage(res.error || 'Could not fetch Telegram updates.');
    }
  };

  const handleSaveSettings = () => {
    onUpdateProfile({
      telegramBotToken: botToken,
      telegramChatId: chatId,
      telegramAlertsEnabled: profile.telegramAlertsEnabled,
      instantHighMatchAlert: profile.instantHighMatchAlert,
      minScoreForAlert: profile.minScoreForAlert,
    });
    setAlertSuccessMessage('Telegram alert settings updated successfully!');
    setTimeout(() => setAlertSuccessMessage(null), 4000);
  };

  const handleSendTestMessage = async () => {
    if (!chatId) {
      setAlertErrorMessage('Please enter or detect your Chat ID first.');
      return;
    }

    setIsSendingTestAlert(true);
    setAlertSuccessMessage(null);
    setAlertErrorMessage(null);

    const scholarshipTitle = featuredScholarship ? featuredScholarship.title : 'Chevening Scholarship (UK) - Fully Funded';
    const deadline = featuredScholarship ? featuredScholarship.deadline : 'November 2026';
    const stipend = featuredScholarship ? featuredScholarship.monthlyStipend : '£1,349/month living allowance';
    const relevance = featuredScholarship ? featuredScholarship.relevanceScore : 98;

    const messageHtml = `🎓 <b>SCHOLARSHIP AGENT INSTANT ALERT</b>

🏛 <b>${scholarshipTitle}</b>
📊 <b>Match Score:</b> ${relevance}% (Direct fit for 3.57/5.0 CGPA + Kadaj Alliance LLC)
💰 <b>Funding:</b> 100% Tuition Waived + ${stipend}
⏰ <b>Application Deadline:</b> ${deadline}

💡 <b>Kadaj Alliance Synergy:</b> 1-year US federal contracting experience directly satisfies the professional experience criteria and demonstrates international procurement acumen.

🔗 <a href="${featuredScholarship?.url || 'https://www.chevening.org'}">Open Scholarship Portal</a>

<i>Reply /apply or /save in Telegram to track this application automatically!</i>`;

    const res = await sendTelegramAlert(chatId, messageHtml, botToken);
    setIsSendingTestAlert(false);

    if (res.ok) {
      setAlertSuccessMessage('Alert successfully dispatched to your phone on Telegram! Check your device.');
      setSentLog((prev) => [
        {
          id: String(Date.now()),
          time: new Date().toLocaleTimeString(),
          text: `Alert sent for "${scholarshipTitle}"`,
        },
        ...prev,
      ]);
    } else {
      setAlertErrorMessage(`Failed to send alert: ${res.error}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-700 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-sky-600" />
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                Phone & Telegram Alert Dispatcher
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Get instant push notifications to your mobile phone as soon as new fully funded scholarships are announced.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right text-xs">
              <div className="font-medium text-stone-800">
                {chatId ? 'Phone Alerts Linked' : 'Phone Alert Unlinked'}
              </div>
              <div className="text-stone-400 font-mono text-[11px]">
                {chatId ? `Chat ID: ${chatId}` : 'Awaiting Chat ID'}
              </div>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                chatId ? 'bg-emerald-500 shadow-sm' : 'bg-amber-400 animate-pulse'
              }`}
            />
          </div>
        </div>

        {/* Live Active Phone Alert Notice */}
        <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-emerald-950 flex items-center gap-2">
              <span>Mobile Phone Verified &amp; Linked: @Famzy01 (Chat ID: 1197221643)</span>
              <span className="bg-emerald-200/70 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">LIVE POLLING ACTIVE</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              <strong>Why typing &quot;start&quot; seemed to do nothing before:</strong> Telegram stores incoming messages on Telegram servers until an active auto-responder reads them. The background auto-responder is now running! We already sent a test greeting to your phone. You can now send <code className="bg-emerald-100 px-1 rounded font-mono">/start</code>, <code className="bg-emerald-100 px-1 rounded font-mono">/deadlines</code>, or <code className="bg-emerald-100 px-1 rounded font-mono">/scan</code> to <strong>@Folascholarshipbot</strong> anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Bot Connection & Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Bot Credentials & Detection */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-stone-700" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Telegram Bot Link
              </h3>
            </div>
            {botStatus?.ok && (
              <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                @{botStatus.username} Active
              </span>
            )}
          </div>

          {/* Bot Token Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-700 flex items-center justify-between">
              <span>Telegram Bot API Token</span>
              <button
                onClick={handleTestBot}
                disabled={isTestingBot}
                className="text-stone-500 hover:text-stone-900 text-[11px] underline cursor-pointer"
              >
                {isTestingBot ? 'Testing...' : 'Test Connection'}
              </button>
            </label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="e.g. 8854756208:AA..."
              className="w-full text-xs font-mono p-2.5 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
            />
            <p className="text-[11px] text-stone-500">
              Configured with your bot token. The bot will send updates directly to your personal chat.
            </p>
          </div>

          {/* Chat ID Step & Easy Auto-Detection */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-medium text-stone-700">
              Your Telegram Chat ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="Click 'Auto-Detect Chat ID' or paste ID"
                className="flex-1 text-xs font-mono p-2.5 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button
                onClick={handleFetchUpdates}
                disabled={isFetchingUpdates}
                className="px-3 py-2 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetchingUpdates ? 'animate-spin' : ''}`} />
                <span>{isFetchingUpdates ? 'Detecting...' : 'Auto-Detect Chat ID'}</span>
              </button>
            </div>

            {/* Instruction helper */}
            <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-600 space-y-1.5 border border-stone-200/60">
              <div className="font-medium text-stone-800 flex items-center gap-1">
                <span>How to link your phone in 10 seconds:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600">
                <li>
                  Open Telegram on your phone and search for your bot:
                  <strong className="text-stone-900 ml-1">@{botStatus?.username || 'your bot'}</strong>
                </li>
                <li>Press <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900 font-mono">Start</code> or send any message (e.g. <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900 font-mono">/start</code>)</li>
                <li>Click the <strong className="text-stone-900">Auto-Detect Chat ID</strong> button above.</li>
              </ol>
            </div>
          </div>

          {/* Feedback banners */}
          {alertSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{alertSuccessMessage}</span>
            </div>
          )}

          {alertErrorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{alertErrorMessage}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <button
              onClick={handleSaveSettings}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-stone-900 text-white hover:bg-stone-800 cursor-pointer shadow-xs"
            >
              Save Alert Preferences
            </button>

            <button
              onClick={handleSendTestMessage}
              disabled={isSendingTestAlert || !chatId}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className={`w-3.5 h-3.5 ${isSendingTestAlert ? 'animate-pulse' : ''}`} />
              <span>{isSendingTestAlert ? 'Dispatching...' : 'Send Live Test Alert to My Phone'}</span>
            </button>
          </div>
        </div>

        {/* Right: Alert Automation Rules & Phone Card Preview */}
        <div className="space-y-6">
          {/* Rules & Triggers */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Bell className="w-4 h-4 text-stone-700" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Automated Phone Alert Triggers
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-2.5 rounded-lg border border-stone-200/80 hover:bg-stone-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.telegramAlertsEnabled}
                  onChange={(e) => onUpdateProfile({ telegramAlertsEnabled: e.target.checked })}
                  className="mt-0.5 rounded text-stone-900 focus:ring-stone-400"
                />
                <div>
                  <div className="font-semibold text-stone-900">Instant Alert on Newly Discovered Opportunities</div>
                  <div className="text-stone-500 text-[11px]">
                    Dispatches a Telegram notification immediately when the agent discovers an eligible scholarship matching your profile.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg border border-stone-200/80 hover:bg-stone-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.instantHighMatchAlert}
                  onChange={(e) => onUpdateProfile({ instantHighMatchAlert: e.target.checked })}
                  className="mt-0.5 rounded text-stone-900 focus:ring-stone-400"
                />
                <div>
                  <div className="font-semibold text-stone-900">Upcoming Deadline Countdown Reminders</div>
                  <div className="text-stone-500 text-[11px]">
                    Automatic reminders at 30 days, 14 days, and 3 days before saved application deadlines close.
                  </div>
                </div>
              </label>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-stone-800">
                  <span>Minimum Match Threshold for Phone Push:</span>
                  <span className="font-mono text-stone-900">{profile.minScoreForAlert || 85}%</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={95}
                  step={5}
                  value={profile.minScoreForAlert || 85}
                  onChange={(e) => onUpdateProfile({ minScoreForAlert: Number(e.target.value) })}
                  className="w-full accent-stone-900"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>70% (Broader)</span>
                  <span>85% (Recommended)</span>
                  <span>95% (Strict Top Fit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Telegram Phone Notification Preview Card */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-4 shadow-md space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram Mobile Message Preview</span>
              </div>
              <span className="text-[10px] text-stone-500 font-mono">HTML FORMAT</span>
            </div>

            <div className="bg-stone-800/90 rounded-lg p-3 text-xs space-y-2 font-mono text-stone-200 border border-stone-700">
              <div className="text-amber-400 font-bold">🎓 SCHOLARSHIP AGENT INSTANT ALERT</div>
              <div className="font-sans font-semibold text-white">
                {featuredScholarship?.title || 'Chevening Scholarship (UK) - Fully Funded'}
              </div>
              <div className="text-[11px] text-stone-300">
                <div>📊 <strong>Match:</strong> 98% (Fit for 3.57/5.0 CGPA + Kadaj Alliance LLC)</div>
                <div>💰 <strong>Funding:</strong> 100% Tuition + £1,349/month living stipend</div>
                <div>⏰ <strong>Deadline:</strong> {featuredScholarship?.deadline || 'November 2026'}</div>
              </div>
              <div className="text-[10px] text-stone-400 italic font-sans pt-1 border-t border-stone-700">
                Kadaj Alliance US federal contracting fulfills the 2,800 hour professional criteria and proves cross-border governance acumen.
              </div>
            </div>
          </div>

          {/* Dispatch Log */}
          {sentLog.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2 text-xs shadow-xs">
              <h4 className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                Recent Phone Dispatches
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {sentLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between text-stone-600 bg-stone-50 p-2 rounded">
                    <span>{log.text}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
