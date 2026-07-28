import React from 'react';
import { Type } from 'lucide-react';
import { BannerFormData } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
}

export const Section1TextData: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              1. DATA INFORMASI (TEKS)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded uppercase font-semibold">
            Form Teks
          </span>
        </div>

        <div className="space-y-4">
          {/* Row 1: Judul Utama & Sub-judul */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Judul Utama
              </label>
              <input
                type="text"
                value={formData.judulUtama}
                onChange={(e) => onChange('judulUtama', e.target.value)}
                placeholder="E.g. Promo Merdeka"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Sub-judul
              </label>
              <input
                type="text"
                value={formData.subJudul}
                onChange={(e) => onChange('subJudul', e.target.value)}
                placeholder="E.g. Diskon hingga 50%"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Informasi Data / Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Informasi Data / Deskripsi
            </label>
            <textarea
              rows={3}
              value={formData.deskripsi}
              onChange={(e) => onChange('deskripsi', e.target.value)}
              placeholder="Detail penawaran, syarat, dsb.."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all resize-none"
            />
          </div>

          {/* Row 3: Slogan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Slogan
            </label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => onChange('slogan', e.target.value)}
              placeholder="E.g. Cepat, Murah, Enak"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
