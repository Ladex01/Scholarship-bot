import React, { useState } from 'react';
import {
  Smartphone,
  Share2,
  PlusSquare,
  Copy,
  Check,
  X,
  ExternalLink,
  Send,
  Sparkles,
  QrCode
} from 'lucide-react';

interface IPhoneInstallModalProps {
  onClose: () => void;
  appUrl: string;
}

export const IPhoneInstallModal: React.FC<IPhoneInstallModalProps> = ({
  onClose,
  appUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const displayUrl = appUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(displayUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl shadow-md overflow-hidden ring-1 ring-sky-500/30 flex items-center justify-center bg-sky-500">
              <img
                src="/apple-touch-icon.png"
                alt="App Icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>DiplomatScholar App</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                  iOS Home Screen
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Install as a native full-screen app on your iPhone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual App Icon Spotlight */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 border border-sky-100 flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src="/icon.svg"
              alt="Dedicated Icon"
              className="w-16 h-16 rounded-2xl shadow-lg ring-2 ring-white"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Clean Dedicated App Icon</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Designed with a vibrant Twitter-style cobalt background and pure white diplomat crest. Instantly recognizable on your home screen dock.
            </p>
          </div>
        </div>

        {/* 3 Step Installation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Install on iPhone (Safari) in 3 Steps
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div className="text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Open in Safari</p>
                <p className="text-slate-500 text-[11px]">
                  Copy the app URL below and paste it directly into mobile Safari.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div className="text-xs text-slate-700">
                <p className="font-semibold text-slate-900 flex items-center gap-1">
                  <span>Tap the Share Button</span>
                  <Share2 className="w-3.5 h-3.5 text-sky-600 inline" />
                </p>
                <p className="text-slate-500 text-[11px]">
                  At the bottom of your Safari screen, tap the square Share icon.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div className="text-xs text-slate-700">
                <p className="font-semibold text-slate-900 flex items-center gap-1">
                  <span>Select &quot;Add to Home Screen&quot;</span>
                  <PlusSquare className="w-3.5 h-3.5 text-sky-600 inline" />
                </p>
                <p className="text-slate-500 text-[11px]">
                  Scroll down the share sheet and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code & Direct URL copy */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
          <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs shrink-0">
            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 object-contain" />
          </div>
          <div className="flex-1 space-y-1.5 text-center sm:text-left w-full">
            <span className="text-[11px] font-semibold text-slate-700 flex items-center justify-center sm:justify-start gap-1">
              <QrCode className="w-3 h-3 text-sky-600" />
              <span>Or Scan with iPhone Camera</span>
            </span>
            <div className="flex gap-1.5">
              <input
                type="text"
                readOnly
                value={displayUrl}
                className="flex-1 text-[11px] font-mono px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0 transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Telegram Bot Link */}
        <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Telegram Bot Notifications</p>
              <p className="text-[11px] text-slate-500">Connect with @Folascholarshipbot on your phone</p>
            </div>
          </div>
          <a
            href="https://t.me/Folascholarshipbot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-sky-700 border border-sky-200 hover:bg-sky-50 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Open Bot</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Modal Close Footer */}
        <div className="pt-2 flex justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
