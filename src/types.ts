export interface FileItem {
  id: string;
  name: string;
  url: string;
}

export interface BannerFormData {
  // 1. Data Informasi (Teks)
  judulUtama: string;
  subJudul: string;
  deskripsi: string;
  slogan: string;

  // 2. Panel Kontak & Alamat
  whatsapp: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  alamat: string;
  kontakLain: string;

  // 3. Bahan Visual
  logos: FileItem[];
  fotoProduk: FileItem[];
  daftarNamaProduk: string;
  elemenPendukung: string;

  // 4. Spesifikasi & Referensi
  orientasi: 'Landscape' | 'Portrait' | 'Square';
  ukuranBanner: string;
  warnaDominan: string;
  temaDesain: string;
  referensiGambar: FileItem[];

  // 5. Prompt Pendukung & Perintah Khusus
  instruksiTambahan: string;

  // 6. Audio Instruction
  audioFileName: string | null;
  audioDuration: string | null;
  audioExtractionText: string;
  isAudioExtracted: boolean;
}

export interface GeneratedPromptJSON {
  jenis_desain: string;
  ukuran: {
    orientasi: string;
    rasio: string;
  };
  informasi_teks: {
    judul_utama: string;
    sub_judul: string;
    deskripsi: string;
    slogan: string;
  };
  kontak_dan_alamat: {
    whatsapp: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    facebook: string;
    alamat: string;
    info_tambahan: string;
  };
  bahan_visual: {
    logo_count: number;
    foto_produk_count: number;
    daftar_nama_produk: string[];
    elemen_pendukung: string[];
  };
  spesifikasi: {
    warna_dominan: string;
    tema: string;
    referensi_gambar_count: number;
  };
  perintah_khusus: string;
  audio_instruction?: string;
  meta: {
    generated_at: string;
    version: string;
    author: string;
  };
}
