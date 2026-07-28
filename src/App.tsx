import React, { useState } from 'react';
import { Header } from './components/Header';
import { Section1TextData } from './components/Section1TextData';
import { Section2Contact } from './components/Section2Contact';
import { Section3Visuals } from './components/Section3Visuals';
import { Section4Specs } from './components/Section4Specs';
import { Section5Prompts } from './components/Section5Prompts';
import { Section6Audio } from './components/Section6Audio';
import { PromptOutput } from './components/PromptOutput';
import { VercelModal } from './components/VercelModal';
import { BannerFormData, GeneratedPromptJSON } from './types';
import { ArrowRight, Trash2 } from 'lucide-react';

const initialFormData: BannerFormData = {
  judulUtama: '',
  subJudul: '',
  deskripsi: '',
  slogan: '',
  whatsapp: '',
  instagram: '',
  youtube: '',
  tiktok: '',
  facebook: '',
  alamat: '',
  kontakLain: '',
  logos: [],
  fotoProduk: [],
  daftarNamaProduk: '',
  elemenPendukung: '',
  orientasi: 'Landscape',
  ukuranBanner: '',
  warnaDominan: '',
  temaDesain: '',
  referensiGambar: [],
  instruksiTambahan: '',
  audioFileName: null,
  audioDuration: null,
  audioExtractionText: '',
  isAudioExtracted: false,
};

export default function App() {
  const [formData, setFormData] = useState<BannerFormData>(initialFormData);
  const [credits, setCredits] = useState<number>(998);
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPromptJSON | null>(null);
  const [formattedPromptText, setFormattedPromptText] = useState<string>('');
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);

  const handleFieldChange = (field: keyof BannerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyExtractedData = (fields: Record<string, string>) => {
    setFormData((prev) => ({
      ...prev,
      judulUtama: fields.judulUtama || prev.judulUtama,
      subJudul: fields.subJudul || prev.subJudul,
      deskripsi: fields.deskripsi || prev.deskripsi,
      daftarNamaProduk: fields.daftarNamaProduk || prev.daftarNamaProduk,
      slogan: fields.slogan || prev.slogan,
      whatsapp: fields.whatsapp || prev.whatsapp,
      alamat: fields.alamat || prev.alamat,
    }));
  };

  const handleResetForm = () => {
    setFormData({ ...initialFormData, logos: [], fotoProduk: [], referensiGambar: [] });
    setGeneratedPrompt(null);
    setFormattedPromptText('');
  };

  const formatToRatio = (val: string): string => {
    if (!val) return '';
    const trimmed = val.trim();
    // Match patterns like 3x1, 3x1m, 3 x 1, 3:1, 16x9
    const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*[:xX*]\s*(\d+(?:\.\d+)?)/);
    if (match) {
      return `${match[1]}:${match[2]}`;
    }
    return trimmed.replace(/x/gi, ':');
  };

  const handleGeneratePrompt = () => {
    // Generate JSON structure with empty values if form fields are empty
    const jsonOutput: GeneratedPromptJSON = {
      jenis_desain: formData.temaDesain ? `Banner Spanduk ${formData.temaDesain}` : '',
      ukuran: {
        orientasi: formData.orientasi,
        rasio: formatToRatio(formData.ukuranBanner),
      },
      informasi_teks: {
        judul_utama: formData.judulUtama || '',
        sub_judul: formData.subJudul || '',
        deskripsi: formData.deskripsi || '',
        slogan: formData.slogan || '',
      },
      kontak_dan_alamat: {
        whatsapp: formData.whatsapp || '',
        instagram: formData.instagram || '',
        youtube: formData.youtube || '',
        tiktok: formData.tiktok || '',
        facebook: formData.facebook || '',
        alamat: formData.alamat || '',
        info_tambahan: formData.kontakLain || '',
      },
      bahan_visual: {
        logo_count: formData.logos.length,
        foto_produk_count: formData.fotoProduk.length,
        daftar_nama_produk: formData.daftarNamaProduk
          ? formData.daftarNamaProduk.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        elemen_pendukung: formData.elemenPendukung
          ? formData.elemenPendukung.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      },
      spesifikasi: {
        warna_dominan: formData.warnaDominan || '',
        tema: formData.temaDesain || '',
        referensi_gambar_count: formData.referensiGambar.length,
      },
      perintah_khusus: formData.instruksiTambahan || '',
      ...(formData.audioExtractionText
        ? { audio_instruction: formData.audioExtractionText.replace(/\n/g, ' ') }
        : {}),
      meta: {
        generated_at: new Date().toISOString(),
        version: '2',
        author: 'Prompt Studio Banner By Jeres Studio',
      },
    };

    // Format natural prompt for AI image generator
    const promptParts: string[] = [];

    promptParts.push(
      jsonOutput.informasi_teks.judul_utama
        ? `Commercial advertising banner design for "${jsonOutput.informasi_teks.judul_utama}".`
        : `Commercial advertising banner design.`
    );

    const orientationInfo = `Orientation: ${jsonOutput.ukuran.orientasi}${
      jsonOutput.ukuran.rasio ? ` (Aspect Ratio ${jsonOutput.ukuran.rasio})` : ''
    }.`;
    promptParts.push(orientationInfo);

    if (jsonOutput.spesifikasi.tema || jsonOutput.spesifikasi.warna_dominan) {
      const themeParts: string[] = [];
      if (jsonOutput.spesifikasi.tema) themeParts.push(`Theme: ${jsonOutput.spesifikasi.tema}`);
      if (jsonOutput.spesifikasi.warna_dominan)
        themeParts.push(`Color Scheme: ${jsonOutput.spesifikasi.warna_dominan}`);
      promptParts.push(themeParts.join(', ') + '.');
    }

    if (jsonOutput.informasi_teks.judul_utama) {
      promptParts.push(`Main Title Text: "${jsonOutput.informasi_teks.judul_utama}".`);
    }
    if (jsonOutput.informasi_teks.sub_judul) {
      promptParts.push(`Subtitle Text: "${jsonOutput.informasi_teks.sub_judul}".`);
    }
    if (jsonOutput.informasi_teks.deskripsi) {
      promptParts.push(`Description: "${jsonOutput.informasi_teks.deskripsi}".`);
    }
    if (jsonOutput.informasi_teks.slogan) {
      promptParts.push(`Slogan: "${jsonOutput.informasi_teks.slogan}".`);
    }

    if (jsonOutput.bahan_visual.daftar_nama_produk.length > 0) {
      promptParts.push(
        `Products & Visual Features: ${jsonOutput.bahan_visual.daftar_nama_produk.join(', ')}.`
      );
    }
    if (jsonOutput.bahan_visual.elemen_pendukung.length > 0) {
      promptParts.push(
        `Supporting Elements: ${jsonOutput.bahan_visual.elemen_pendukung.join(', ')}.`
      );
    }

    const contacts: string[] = [];
    if (jsonOutput.kontak_dan_alamat.whatsapp)
      contacts.push(`WhatsApp (${jsonOutput.kontak_dan_alamat.whatsapp})`);
    if (jsonOutput.kontak_dan_alamat.instagram)
      contacts.push(`Instagram (${jsonOutput.kontak_dan_alamat.instagram})`);
    if (jsonOutput.kontak_dan_alamat.youtube)
      contacts.push(`YouTube (${jsonOutput.kontak_dan_alamat.youtube})`);
    if (jsonOutput.kontak_dan_alamat.tiktok)
      contacts.push(`TikTok (${jsonOutput.kontak_dan_alamat.tiktok})`);
    if (jsonOutput.kontak_dan_alamat.facebook)
      contacts.push(`Facebook (${jsonOutput.kontak_dan_alamat.facebook})`);
    if (jsonOutput.kontak_dan_alamat.alamat)
      contacts.push(`Location address (${jsonOutput.kontak_dan_alamat.alamat})`);
    if (jsonOutput.kontak_dan_alamat.info_tambahan)
      contacts.push(`Other info (${jsonOutput.kontak_dan_alamat.info_tambahan})`);

    if (contacts.length > 0) {
      promptParts.push(`Contact details section with ${contacts.join(', ')}.`);
    }

    if (jsonOutput.perintah_khusus) {
      promptParts.push(`Instructions: ${jsonOutput.perintah_khusus}.`);
    }

    promptParts.push(
      'High resolution, 8k typography rendering, professional marketing banner composition.'
    );

    const naturalTextPrompt = promptParts.join('\n');

    setGeneratedPrompt(jsonOutput);
    setFormattedPromptText(naturalTextPrompt);
    setCredits((prev) => Math.max(0, prev - 1));

    // Scroll smoothly to output
    setTimeout(() => {
      const outputElem = document.getElementById('prompt-output-section');
      if (outputElem) {
        outputElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-800 pb-20">
      {/* Top Navigation Header */}
      <Header
        credits={credits}
        onOpenVercelGuide={() => setIsVercelModalOpen(true)}
        onLogout={() => alert('Logout berhasil')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Title Section / Bento Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Konfigurasi Desain
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Lengkapi data di bawah ini untuk membangun struktur PROMPT yang valid.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider">
              6 Modules Active
            </span>
          </div>
        </div>

        {/* 6 Bento Grid Sections */}
        <div className="grid grid-cols-12 gap-5">
          {/* Module 1 */}
          <div className="col-span-12 lg:col-span-6">
            <Section1TextData formData={formData} onChange={handleFieldChange} />
          </div>

          {/* Module 2 */}
          <div className="col-span-12 lg:col-span-6">
            <Section2Contact formData={formData} onChange={handleFieldChange} />
          </div>

          {/* Module 3 */}
          <div className="col-span-12 lg:col-span-6">
            <Section3Visuals formData={formData} onChange={handleFieldChange} />
          </div>

          {/* Module 4 */}
          <div className="col-span-12 lg:col-span-6">
            <Section4Specs formData={formData} onChange={handleFieldChange} />
          </div>

          {/* Module 5 */}
          <div className="col-span-12 lg:col-span-6">
            <Section5Prompts formData={formData} onChange={handleFieldChange} />
          </div>

          {/* Module 6 */}
          <div className="col-span-12 lg:col-span-6">
            <Section6Audio
              formData={formData}
              onChange={handleFieldChange}
              onApplyExtractedData={handleApplyDataExtracted}
            />
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGeneratePrompt}
            className="sm:col-span-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all cursor-pointer active:scale-[0.99] group"
          >
            <span>Generate Design Prompt</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetForm}
            className="sm:col-span-1 bg-white hover:bg-rose-50/80 border border-rose-200 text-rose-600 font-semibold py-4 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>Kosongkan Form</span>
          </button>
        </div>

        {/* Output Section */}
        <div id="prompt-output-section" className="pt-4">
          <PromptOutput
            promptData={generatedPrompt}
            formattedPromptText={formattedPromptText}
          />
        </div>
      </main>

      {/* Vercel Deployment Modal */}
      <VercelModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />
    </div>
  );

  function handleApplyDataExtracted(fields: Record<string, string>) {
    handleApplyExtractedData(fields);
  }
}
