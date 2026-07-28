import React from 'react';
import { X, Globe, Check, Code2, Terminal, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">
            ▲
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Panduan Deploy ke Vercel</h3>
            <p className="text-xs text-slate-500">
              Aplikasi ini siap di-deploy langsung ke Vercel sebagai aplikasi React SPA / Fullstack Node.js.
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-700">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Export Repository / Zip</span>
            </div>
            <p className="text-slate-600 pl-6">
              Unduh zip proyek ini dari menu AI Studio atau dorong (push) ke repository GitHub Anda.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">2</span>
              <span>Import Proyek di Vercel Dashboard</span>
            </div>
            <p className="text-slate-600 pl-6">
              Buka <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">vercel.com/new</code>, pilih repository GitHub Anda, pilih Framework Preset <b>Vite</b>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Environment Variables (Opsional untuk AI Audio)</span>
            </div>
            <p className="text-slate-600 pl-6">
              Tambahkan variabel <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> pada settings Vercel jika ingin menggunakan ekstraksi AI Gemini.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
