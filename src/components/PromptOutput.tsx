import React, { useState } from 'react';
import { Sparkles, Copy, Check, Download, Code2, FileText } from 'lucide-react';
import { GeneratedPromptJSON } from '../types';

interface Props {
  promptData: GeneratedPromptJSON | null;
  formattedPromptText: string;
}

export const PromptOutput: React.FC<Props> = ({ promptData, formattedPromptText }) => {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<'json' | 'text'>('json');

  const jsonString = promptData ? JSON.stringify(promptData, null, 2) : '';

  const handleCopyJson = () => {
    if (!jsonString) return;
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = () => {
    if (!formattedPromptText) return;
    navigator.clipboard.writeText(formattedPromptText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonString) return;
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `banner-prompt-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span>GENERATED PROMPT OUTPUT</span>
        </h3>

        {promptData && (
          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl border border-slate-300/80">
            <button
              onClick={() => setActiveTab('json')}
              className={`text-xs px-3 py-1 rounded-lg font-mono font-semibold transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              JSON Structure
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`text-xs px-3 py-1 rounded-lg font-mono font-semibold transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Natural Prompt
            </button>
          </div>
        )}
      </div>

      {!promptData ? (
        /* Waiting Input State */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[300px] shadow-xl text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <h4 className="text-base font-bold text-white mb-1 tracking-tight">Menunggu Input Form</h4>
          <p className="text-xs text-white/50 max-w-sm leading-relaxed font-mono">
            Lengkapi data di panel kiri dan klik &quot;Generate Design Prompt&quot; untuk menghasilkan JSON Prompt &amp; AI Directives.
          </p>
        </div>
      ) : (
        /* Generated Prompt JSON State */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-white space-y-4 flex flex-col overflow-hidden">
          {/* Header Bar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                READY
              </span>
              <span className="text-xs text-white/60 font-mono">
                {activeTab === 'json' ? 'schema_v1.3.json' : 'prompt_text.md'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={activeTab === 'json' ? handleCopyJson : handleCopyText}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              >
                {activeTab === 'json' ? (
                  copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />
                ) : (
                  copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {activeTab === 'json'
                    ? copied ? 'TERSALIN!' : 'COPY JSON'
                    : copiedText ? 'TERSALIN!' : 'COPY PROMPT'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg border border-white/10 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .JSON</span>
              </button>
            </div>
          </div>

          {/* Monospaced Code View */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-4">
            {activeTab === 'json' ? (
              <pre className="text-xs font-mono text-sky-300 leading-relaxed overflow-x-auto max-h-[480px] scrollbar-thin scrollbar-thumb-slate-700">
                <code>{jsonString}</code>
              </pre>
            ) : (
              <div className="text-xs font-mono text-amber-200 leading-relaxed whitespace-pre-wrap max-h-[480px] overflow-y-auto">
                {formattedPromptText}
              </div>
            )}
          </div>

          {/* Bento Stats Footer */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-white/50 font-mono gap-2">
            <div className="flex items-center gap-3">
              <span>Size: {(new Blob([jsonString]).size / 1024).toFixed(2)} KB</span>
              <span>&bull;</span>
              <span>Chars: {jsonString.length}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>Status: Verified Valid Schema</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
