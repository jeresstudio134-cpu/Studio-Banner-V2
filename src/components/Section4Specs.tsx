import React, { useRef } from 'react';
import { Palette, Plus, Trash2 } from 'lucide-react';
import { BannerFormData, FileItem } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
}

const PRESET_TEMAS = [
  '',
  'Modern Kuliner',
  'Minimalis Elegant',
  'Promo Flash Sale / Bold',
  'Retro Vintage 90s',
  'Islami / Ramadan / Hari Raya',
  'Corporate / Professional',
  'Ceria & Colorful Kids',
];

export const Section4Specs: React.FC<Props> = ({ formData, onChange }) => {
  const refInputRef = useRef<HTMLInputElement>(null);

  const isCustomTema = !PRESET_TEMAS.includes(formData.temaDesain);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FileItem[] = Array.from(files).map((f: File) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    onChange('referensiGambar', [...formData.referensiGambar, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    onChange(
      'referensiGambar',
      formData.referensiGambar.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              4. SPESIFIKASI & REFERENSI
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-semibold uppercase">
            Dimensi & Style
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Orientasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Orientasi
              </label>
              <select
                value={formData.orientasi}
                onChange={(e) => onChange('orientasi', e.target.value as any)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all cursor-pointer"
              >
                <option value="Landscape">Landscape</option>
                <option value="Portrait">Portrait</option>
                <option value="Square">Square</option>
              </select>
            </div>

            {/* Ukuran Banner */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Rasio / Ukuran Banner
              </label>
              <input
                type="text"
                value={formData.ukuranBanner}
                onChange={(e) => onChange('ukuranBanner', e.target.value)}
                placeholder="E.g. 3:1 atau 3x1"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* Warna Dominan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Warna Dominan
              </label>
              <input
                type="text"
                value={formData.warnaDominan}
                onChange={(e) => onChange('warnaDominan', e.target.value)}
                placeholder="E.g. Biru Navy & Kuning"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* Tema Desain */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tema Desain
              </label>
              <select
                value={isCustomTema ? 'Custom' : formData.temaDesain}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'Custom') {
                    onChange('temaDesain', 'Custom Tema');
                  } else {
                    onChange('temaDesain', val);
                  }
                }}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all cursor-pointer"
              >
                <option value="">Pilih Tema (Opsional)</option>
                <option value="Modern Kuliner">Modern Kuliner</option>
                <option value="Minimalis Elegant">Minimalis Elegant</option>
                <option value="Promo Flash Sale / Bold">Promo Flash Sale / Bold</option>
                <option value="Retro Vintage 90s">Retro Vintage 90s</option>
                <option value="Islami / Ramadan / Hari Raya">Islami / Ramadan / Hari Raya</option>
                <option value="Corporate / Professional">Corporate / Professional</option>
                <option value="Ceria & Colorful Kids">Ceria & Colorful Kids</option>
                <option value="Custom">✨ Custom (Ketik Tema Custom...)</option>
              </select>

              {isCustomTema && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={formData.temaDesain === 'Custom Tema' ? '' : formData.temaDesain}
                    onChange={(e) => onChange('temaDesain', e.target.value || 'Custom Tema')}
                    placeholder="Tuliskan tema custom Anda (E.g. Futuristic Cyberpunk)..."
                    className="w-full bg-amber-50/60 border border-amber-300/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          {/* Upload Referensi Desain */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Referensi Desain
            </label>
            <input
              ref={refInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="flex flex-wrap gap-2.5">
              {formData.referensiGambar.map((file) => (
                <div
                  key={file.id}
                  className="relative w-20 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 flex flex-col items-center justify-center group overflow-hidden"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => refInputRef.current?.click()}
                className="w-20 h-16 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-slate-800 flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-900 transition-all cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
