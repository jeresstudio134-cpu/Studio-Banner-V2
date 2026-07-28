import React from 'react';
import { Sparkles } from 'lucide-react';
import { BannerFormData } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
}

export const Section5Prompts: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              5. PROMPT PENDUKUNG & PERINTAH
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-semibold uppercase">
            Custom Directives
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Instruksi Tambahan (Opsional)
            </label>
            <textarea
              rows={3}
              value={formData.instruksiTambahan}
              onChange={(e) => onChange('instruksiTambahan', e.target.value)}
              placeholder="E.g. Gunakan style ala poster film 90-an, atau tambahkan kesan mewah dengan aksen emas..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all resize-none"
            />
          </div>
          <p className="text-[10px] text-slate-400 font-mono italic">
            Gunakan kolom ini untuk arahan gaya komposisi, lighting, atau nuansa spesifik.
          </p>
        </div>
      </div>
    </div>
  );
};
