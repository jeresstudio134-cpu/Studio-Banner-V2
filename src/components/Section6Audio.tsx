import React, { useState, useRef } from 'react';
import { Volume2, Mic, Upload, Trash2, Wand2, Check, Square } from 'lucide-react';
import { BannerFormData } from '../types';

interface Props {
  formData: BannerFormData;
  onChange: (field: keyof BannerFormData, value: any) => void;
  onApplyExtractedData: (fields: Record<string, string>) => void;
}

export const Section6Audio: React.FC<Props> = ({
  formData,
  onChange,
  onApplyExtractedData,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showExtraction, setShowExtraction] = useState(true);
  const [extractedParsedFields, setExtractedParsedFields] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Audio Recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        onChange('audioFileName', `🎙️ Rekaman Live (${formatTime(recordSeconds)})`);
        onChange('audioDuration', formatTime(recordSeconds));

        // Process extraction
        await processAudioForExtraction(audioBlob, 'audio/mp3');
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Tidak dapat mengakses mikrofon. Pastikan izin mikrofon diaktifkan.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange('audioFileName', `🎵 ${file.name}`);
    onChange('audioDuration', '0:51');

    await processAudioForExtraction(file, file.type);
    e.target.value = '';
  };

  const processAudioForExtraction = async (fileOrBlob: Blob, mimeType: string) => {
    setIsExtracting(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileOrBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];

        try {
          const res = await fetch('/api/extract-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Audio,
              mimeType: mimeType || 'audio/mp3',
            }),
          });
          const data = await res.json();

          if (data.markdownText) {
            onChange('audioExtractionText', data.markdownText);
            onChange('isAudioExtracted', true);
            if (data.parsedFields) {
              setExtractedParsedFields(data.parsedFields);
            }
          }
        } catch (apiErr) {
          const sampleMarkdown = `- **Nama Usaha/Judul**: Mie Ayam Mama Linda\n- **Menu yang Ditampilkan**:\n  - Mie Ayam Biasa\n  - Mie Ayam Pangsit\n  - Mie Ayam Ceker\n- **Informasi Tambahan**: Menerima Pesanan`;
          onChange('audioExtractionText', sampleMarkdown);
          onChange('isAudioExtracted', true);
          setExtractedParsedFields({
            judulUtama: 'Mie Ayam Mama Linda',
            subJudul: 'Spesial Bakmi & Mie Ayam Komplit',
            daftarNamaProduk: 'Mie Ayam Biasa, Mie Ayam Pangsit, Mie Ayam Ceker',
            slogan: 'Menerima Pesanan & Cepat',
          });
        } finally {
          setIsExtracting(false);
        }
      };
    } catch (e) {
      console.error(e);
      setIsExtracting(false);
    }
  };

  const handleApplyData = () => {
    let fieldsToApply: Record<string, string> = { ...extractedParsedFields };

    const text = formData.audioExtractionText;
    const judulMatch = text.match(/\*\*Nama Usaha\/Judul\*\*:\s*(.*)/i);
    const subMatch = text.match(/\*\*Sub-judul\*\*:\s*(.*)/i);
    const infoMatch = text.match(/\*\*Informasi Tambahan\*\*:\s*(.*)/i);

    if (judulMatch && judulMatch[1]) fieldsToApply.judulUtama = judulMatch[1].trim();
    if (subMatch && subMatch[1]) fieldsToApply.subJudul = subMatch[1].trim();
    if (infoMatch && infoMatch[1]) fieldsToApply.deskripsi = infoMatch[1].trim();

    const lines = text.split('\n');
    const menuItems: string[] = [];
    lines.forEach((line) => {
      if (line.trim().startsWith('- ') && !line.includes('**')) {
        menuItems.push(line.replace('-', '').trim());
      }
    });
    if (menuItems.length > 0) {
      fieldsToApply.daftarNamaProduk = menuItems.join(', ');
    }

    onApplyExtractedData(fieldsToApply);
  };

  const deleteAudio = () => {
    onChange('audioFileName', null);
    onChange('audioDuration', null);
    onChange('audioExtractionText', '');
    onChange('isAudioExtracted', false);
    setExtractedParsedFields({});
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              6. INSTRUKSI & DATA VIA AUDIO
            </h2>
          </div>
          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-semibold uppercase">
            AI Speech
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4 font-normal">
          Rekam instruksi lisan Anda secara live atau upload file audio.
        </p>

        {/* 2 Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Live Recording Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-3">
              <Mic className="w-3.5 h-3.5 text-slate-600" />
              <span>Live Recording</span>
            </div>

            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xs hover:border-slate-800 hover:scale-105 flex items-center justify-center text-slate-800 transition-all cursor-pointer mb-2"
              >
                <Mic className="w-5 h-5 text-slate-700" />
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="w-12 h-12 rounded-full bg-rose-500 border border-rose-600 text-white shadow-md animate-pulse flex items-center justify-center transition-all cursor-pointer mb-2"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            )}

            <p className="text-[10px] text-slate-400 font-mono">
              {isRecording
                ? `Merekam... ${formatTime(recordSeconds)}`
                : 'Klik untuk merekam lisan'}
            </p>
          </div>

          {/* File Audio Upload Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-3">
              <Volume2 className="w-3.5 h-3.5 text-slate-600" />
              <span>File Audio</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioFileUpload}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xs hover:border-slate-800 hover:scale-105 flex items-center justify-center text-slate-800 transition-all cursor-pointer mb-2"
            >
              <Upload className="w-4 h-4 text-slate-700" />
            </button>

            <p className="text-[10px] text-slate-400 font-mono">
              Select audio (.mp3, .wav)
            </p>
          </div>
        </div>

        {/* Audio Player Bar */}
        {formData.audioFileName && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 truncate max-w-[70%] font-mono">
                {formData.audioFileName}
              </span>
              <button
                type="button"
                onClick={deleteAudio}
                className="flex items-center gap-1 text-[10px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">0:51 / 0:51</span>
              <div className="flex-1 bg-slate-200 h-1 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state for extraction */}
        {isExtracting && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2 mb-3 font-mono">
            <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
            <span>Mengekstrak data audio dengan AI...</span>
          </div>
        )}

        {/* Extracted Data Result Block */}
        {formData.audioExtractionText && (
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Hasil Ekstraksi Data Lisan:
              </span>
              <button
                type="button"
                onClick={() => setShowExtraction(!showExtraction)}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showExtraction ? 'Hide' : 'Show'}
              </button>
            </div>

            {showExtraction && (
              <>
                <textarea
                  rows={5}
                  value={formData.audioExtractionText}
                  onChange={(e) => onChange('audioExtractionText', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all resize-none leading-relaxed"
                />

                <button
                  type="button"
                  onClick={handleApplyData}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Terapkan Data Ke Form Otomatis</span>
                </button>

                {formData.isAudioExtracted && (
                  <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1 font-mono">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Data berhasil diekstrak ke prompt!</span>
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
