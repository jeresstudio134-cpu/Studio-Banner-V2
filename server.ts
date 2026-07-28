import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // Initialize Gemini AI client if key exists
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route: Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // API Route: AI Extract Audio / Voice Instruction
  app.post('/api/extract-audio', async (req, res) => {
    try {
      const { audioBase64, mimeType, transcriptText } = req.body;

      if (ai) {
        let contents: any;
        if (audioBase64) {
          contents = {
            parts: [
              {
                inlineData: {
                  data: audioBase64,
                  mimeType: mimeType || 'audio/mp3',
                },
              },
              {
                text: `Dengarkan rekaman audio/instruksi lisan ini dan ekstrak data penting untuk pembuatan banner/spanduk iklan.
Formatkan hasilnya dalam bentuk list poin Markdown persis seperti contoh berikut dalam bahasa Indonesia:
- **Nama Usaha/Judul**: [Nama usaha atau judul utama]
- **Sub-judul**: [Sub-judul atau diskon/penawaran jika ada]
- **Menu yang Ditampilkan**:
  - [Menu 1]
  - [Menu 2]
- **Informasi Tambahan**: [Kontak, promo, atau catatan lainnya]

Sertakan juga JSON di akhir dengan tag \`\`\`json { "judulUtama": "...", "subJudul": "...", "daftarNamaProduk": "...", "slogan": "...", "whatsapp": "...", "alamat": "..." } \`\`\``,
              },
            ],
          };
        } else if (transcriptText) {
          contents = `Ekstrak data penting dari teks instruksi berikut untuk pembuatan banner/spanduk iklan: "${transcriptText}".
Formatkan hasilnya dalam bentuk list poin Markdown persis seperti contoh:
- **Nama Usaha/Judul**: [Nama usaha]
- **Sub-judul**: [Sub-judul/promo]
- **Menu yang Ditampilkan**:
  - [Item 1]
  - [Item 2]
- **Informasi Tambahan**: [Informasi tambahan]

Sertakan juga JSON di akhir dengan tag \`\`\`json { "judulUtama": "...", "subJudul": "...", "daftarNamaProduk": "...", "slogan": "...", "whatsapp": "...", "alamat": "..." } \`\`\``;
        } else {
          return res.status(400).json({ error: 'Audio or transcript required' });
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents,
        });

        const fullText = response.text || '';
        
        // Extract json block if present
        let parsedFields: Record<string, string> = {};
        const jsonMatch = fullText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          try {
            parsedFields = JSON.parse(jsonMatch[1]);
          } catch (e) {
            console.error('Failed to parse json block', e);
          }
        }

        // Clean markdown text (remove the json block from markdown display)
        const cleanMarkdown = fullText.replace(/```json\s*[\s\S]*?```/, '').trim();

        return res.json({
          markdownText: cleanMarkdown,
          parsedFields,
        });
      }

      // Fallback if no Gemini key: create structured sample or parse basic keywords
      const fallbackText = transcriptText || 'Mie Ayam Mama Linda dengan menu Mie Ayam Biasa, Mie Ayam Pangsit, Mie Ayam Ceker. Menerima pesanan.';
      return res.json({
        markdownText: `- **Nama Usaha/Judul**: Mie Ayam Mama Linda\n- **Menu yang Ditampilkan**:\n  - Mie Ayam Biasa\n  - Mie Ayam Pangsit\n  - Mie Ayam Ceker\n- **Informasi Tambahan**: Menerima Pesanan`,
        parsedFields: {
          judulUtama: 'Mie Ayam Mama Linda',
          subJudul: 'Spesial Bakmi & Mie Ayam Komplit',
          daftarNamaProduk: 'Mie Ayam Biasa, Mie Ayam Pangsit, Mie Ayam Ceker',
          slogan: 'Enak, Gurih & Halal',
          alamat: 'Jl. Mawar No. 15',
        },
      });
    } catch (error: any) {
      console.error('Error in extract-audio route:', error);
      res.status(500).json({ error: error.message || 'Server error extracting audio' });
    }
  });

  // Vite middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
