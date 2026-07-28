import React, { useRef } from 'react';
import { Image, Plus, Trash2 } from 'lucide-react';
import { BannerFormData, FileItem } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
}

export const Section3Visuals: React.FC<Props> = ({ formData, onChange }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const fotoInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logos' | 'fotoProduk'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FileItem[] = Array.from(files).map((f: File) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    onChange(field, [...formData[field], ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (field: 'logos' | 'fotoProduk', id: string) => {
    onChange(
      field,
      formData[field].filter((item) => item.id !== id)
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              3. BAHAN VISUAL
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-semibold uppercase">
            PNG/JPG
          </span>
        </div>

        <div className="space-y-4">
          {/* Upload Logo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Logo (Bisa Lebih Dari Satu)
            </label>
            <input
              ref={logoInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'logos')}
            />
            <div className="flex flex-wrap gap-2.5">
              {formData.logos.map((file) => (
                <div
                  key={file.id}
                  className="relative w-20 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 flex flex-col items-center justify-center group overflow-hidden"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile('logos', file.id)}
                    className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="w-20 h-16 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-slate-800 flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-900 transition-all cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Foto Produk */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Foto Produk (Bisa Lebih Dari Satu)
            </label>
            <input
              ref={fotoInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'fotoProduk')}
            />
            <div className="flex flex-wrap gap-2.5">
              {formData.fotoProduk.map((file) => (
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
                    onClick={() => removeFile('fotoProduk', file.id)}
                    className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fotoInputRef.current?.click()}
                className="w-20 h-16 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-slate-800 flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-900 transition-all cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Daftar Nama Produk */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Daftar Nama Produk (Jika foto tidak ada/kurang)
            </label>
            <input
              type="text"
              value={formData.daftarNamaProduk}
              onChange={(e) => onChange('daftarNamaProduk', e.target.value)}
              placeholder="E.g. Sate Ayam, Gule Kambing, Es Teh..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-1 italic font-mono">
              AI akan merumuskan deskripsi visual berdasarkan nama produk.
            </p>
          </div>

          {/* Elemen Pendukung Lain */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Elemen Pendukung Lain
            </label>
            <input
              type="text"
              value={formData.elemenPendukung}
              onChange={(e) => onChange('elemenPendukung', e.target.value)}
              placeholder="E.g. Ornamen batik, ikon diskon..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
