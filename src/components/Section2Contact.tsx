import React from 'react';
import { Phone, MapPin, Plus } from 'lucide-react';
import { BannerFormData } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
}

const WhatsappIcon = () => (
  <svg className="w-4 h-4 shrink-0 rounded-md" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#25D366" />
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"
      fill="#FFFFFF"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 shrink-0 rounded-md" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-grad-contact" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="25%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-grad-contact)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"
      fill="#FFFFFF"
    />
    <circle cx="16.5" cy="7.5" r="1.1" fill="#FFFFFF" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 shrink-0 rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M9.8 8.5v7l6.2-3.5-6.2-3.5z" fill="#FFFFFF" />
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-4 h-4 shrink-0 rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#000000" />
    <path
      d="M16.6 8.2a4.4 4.4 0 01-2.6-1.5 4.5 4.5 0 01-.6-2.2h-2.5v11.2a2.8 2.8 0 11-2.8-2.8c.3 0 .6.05.9.15v-2.6a5.3 5.3 0 104.4 5.25V9.4a6.7 6.7 0 003.8 1.3v-2.5a4.3 4.3 0 01-.6 0z"
      fill="#FFFFFF"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 shrink-0 rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1877F2" />
    <path
      d="M15.12 12.7l.48-3.13h-3v-2.03c0-.86.24-1.44 1.47-1.44h1.57V3.3a18.3 18.3 0 00-2.28-.12c-2.26 0-3.8 1.38-3.8 3.91v2.48H6.84v3.13h2.72V20.5a10.8 10.8 0 003.36 0V12.7h2.2z"
      fill="#FFFFFF"
    />
  </svg>
);

export const Section2Contact: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              2. PANEL KONTAK & ALAMAT
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded uppercase font-semibold">
            Sosmed & Map
          </span>
        </div>

        <div className="space-y-4">
          {/* Grid 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <WhatsappIcon />
                WhatsApp
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => onChange('whatsapp', e.target.value)}
                placeholder="0812.."
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <InstagramIcon />
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => onChange('instagram', e.target.value)}
                placeholder="@brand_anda"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <YoutubeIcon />
                YouTube
              </label>
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => onChange('youtube', e.target.value)}
                placeholder="Nama Channel"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <TiktokIcon />
                TikTok
              </label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => onChange('tiktok', e.target.value)}
                placeholder="@username_tiktok"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <FacebookIcon />
                Facebook
              </label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => onChange('facebook', e.target.value)}
                placeholder="Username FB"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Alamat
              </label>
              <input
                type="text"
                value={formData.alamat}
                onChange={(e) => onChange('alamat', e.target.value)}
                placeholder="Jl. Anggrek No. 12"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Full width: Kontak Lain / Tambahan */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              Kontak Lain / Tambahan
            </label>
            <input
              type="text"
              value={formData.kontakLain}
              onChange={(e) => onChange('kontakLain', e.target.value)}
              placeholder="Website atau info lain..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
