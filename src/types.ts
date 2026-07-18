export interface Aspiration {
  id: string;
  name: string;
  studyProgram: string;
  email: string;
  category: 'Akademis' | 'Fasilitas' | 'Finansial' | 'Lainnya';
  description: string;
  attachmentName?: string;
  isAnonymous: boolean;
  status: 'Menunggu' | 'Diterima' | 'Proses' | 'Selesai';
  adminReply?: string;
  dateSubmitted: string;
}

export interface Program {
  id: string;
  name: string;
  department: string;
  status: 'PERENCANAAN' | 'BERJALAN' | 'SELESAI';
  progress: number; // 0 to 100
  dateUpdated: string;
  description: string;
  budgetTotal: number;
  budgetSpent: number;
}

export interface Document {
  id: string;
  name: string;
  period: string;
  category: 'LPJ' | 'Anggaran' | 'Kebijakan' | 'Beasiswa' | 'Surat Rekomendasi' | 'Panduan Mahasiswa' | 'AD/ART';
  status: 'Terverifikasi' | 'Publik' | 'Direvisi';
  fileSize: string;
  downloadsCount: number;
}

export interface News {
  id: string;
  title: string;
  image: string;
  tag: 'KEBIJAKAN' | 'SOSIAL' | 'AKADEMIK' | 'INFORMASI';
  date: string;
  views: number;
  summary: string;
  content: string;
}

export interface BEMEvent {
  id: string;
  title: string;
  dateStr: string; // e.g. "28"
  monthStr: string; // e.g. "OKT"
  fullDate: string; // e.g. "2026-10-28"
  time: string;
  location: string;
}
