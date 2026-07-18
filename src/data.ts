import { News, BEMEvent, Program, Document, Aspiration } from './types';

export const initialNews: News[] = [
  {
    id: 'news-1',
    title: 'Hasil Diskusi Terbuka Mengenai Revitalisasi Kantin Universitas',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800',
    tag: 'KEBIJAKAN',
    date: '24 Okt 2026',
    views: 1245,
    summary: 'BEM Fakultas Ilmu Komputer telah merangkum aspirasi mahasiswa terkait fasilitas kantin yang lebih sehat, ramah lingkungan, dan terjangkau.',
    content: 'Diskusi terbuka yang diselenggarakan pada hari Kamis lalu berhasil menghimpun lebih dari 300 masukan dari mahasiswa aktif. Beberapa poin utama yang disepakati bersama pihak rektorat dan pengelola kantin meliputi standarisasi harga makanan pokok, peningkatan kebersihan wadah saji, penyediaan area pilah sampah mandiri, serta renovasi fasilitas meja dan kursi yang rusak. Implementasi tahap awal ditargetkan selesai sebelum akhir semester ganjil.'
  },
  {
    id: 'news-2',
    title: 'Penyaluran Donasi BEM Peduli untuk Korban Bencana Wilayah Selatan',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    tag: 'SOSIAL',
    date: '22 Okt 2026',
    views: 850,
    summary: 'Berkat partisipasi civitas akademika, kami berhasil mengumpulkan bantuan logistik yang kini telah diterima oleh warga terdampak.',
    content: 'Aksi tanggap bencana BEM Peduli yang berlangsung selama sepekan berhasil menggalang dana sebesar Rp 45.350.000 beserta paket bantuan logistik berupa pakaian layak pakai, obat-obatan, dan bahan makanan pokok. Tim relawan BEM telah berangkat ke lokasi bencana di Wilayah Selatan untuk mendistribusikan langsung bantuan tersebut bekerja sama dengan Badan Penanggulangan Bencana Daerah setempat.'
  },
  {
    id: 'news-3',
    title: 'Pemberian Beasiswa Berprestasi Khusus Mahasiswa Kurang Mampu',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
    tag: 'AKADEMIK',
    date: '15 Okt 2026',
    views: 1102,
    summary: 'Kementerian Advokasi Akademik BEM berhasil melobi mitra eksternal untuk mengalokasikan dana bantuan beasiswa.',
    content: 'Program beasiswa kemitraan tahun ini menyasar 50 mahasiswa berprestasi yang menghadapi kendala finansial. Pihak sponsor menyediakan subsidi UKT penuh selama dua semester beserta uang saku bulanan. Pengumuman seleksi berkas administrasi dan jadwal wawancara dapat diakses melalui menu Pusat Unduhan di situs ini.'
  },
  {
    id: 'news-4',
    title: 'Sosialisasi Alur Pengajuan Surat Rekomendasi Kegiatan Ormawa',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800',
    tag: 'INFORMASI',
    date: '10 Okt 2026',
    views: 642,
    summary: 'Kini proses pengajuan surat pengantar dan rekomendasi didelegasikan secara online guna memangkas birokrasi.',
    content: 'Untuk meningkatkan efisiensi administrasi organisasi mahasiswa (Ormawa), Sekretaris Jenderal BEM meluncurkan formulir digital terintegrasi. Mahasiswa tidak perlu lagi meminta tanda tangan fisik secara berjenjang di kantor BEM, melainkan cukup mengunggah berkas proposal yang telah disetujui pembina melalui Portal Admin.'
  }
];

export const initialEvents: BEMEvent[] = [
  {
    id: 'event-1',
    title: 'Rapat Pleno Terbuka Triwulan III',
    dateStr: '28',
    monthStr: 'OKT',
    fullDate: '2026-10-28',
    time: '14:00 - 17:00 WIB',
    location: 'Hall Utama Gedung A'
  },
  {
    id: 'event-2',
    title: 'Workshop Pengembangan Karir 2026',
    dateStr: '05',
    monthStr: 'NOV',
    fullDate: '2026-11-05',
    time: '09:00 - Selesai',
    location: 'Online via Zoom'
  },
  {
    id: 'event-3',
    title: 'Festival Budaya & Seni Mahasiswa',
    dateStr: '12',
    monthStr: 'NOV',
    fullDate: '2026-11-12',
    time: '08:00 - 22:00 WIB',
    location: 'Lapangan Olahraga Kampus'
  },
  {
    id: 'event-4',
    title: 'Dialog Interaktif Bersama Rektorat',
    dateStr: '19',
    monthStr: 'NOV',
    fullDate: '2026-11-19',
    time: '13:00 - 16:00 WIB',
    location: 'Auditorium Lantai 3'
  }
];

export const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    name: 'Fakultas Ilmu Komputer Festival 2026',
    department: 'Seni & Budaya',
    status: 'BERJALAN',
    progress: 75,
    dateUpdated: '2 jam yang lalu',
    description: 'Pekan kreativitas mahasiswa yang melibatkan pameran seni, kompetisi band, bazar kuliner, dan malam puncak penghargaan seni kampus.',
    budgetTotal: 120000000,
    budgetSpent: 90000000
  },
  {
    id: 'prog-2',
    name: 'LKD Dasar Organisasi',
    department: 'PSDM',
    status: 'PERENCANAAN',
    progress: 20,
    dateUpdated: 'Kemarin',
    description: 'Latihan Kepemimpinan Dasar untuk melatih soft skills, manajemen konflik, dan administrasi bagi seluruh pengurus unit kegiatan mahasiswa baru.',
    budgetTotal: 35000000,
    budgetSpent: 7000000
  },
  {
    id: 'prog-3',
    name: 'Bakti Sosial Kampus',
    department: 'Sosial Politik',
    status: 'SELESAI',
    progress: 100,
    dateUpdated: '3 hari yang lalu',
    description: 'Penyuluhan kesehatan gratis, pembagian sembako, dan bimbingan belajar gratis untuk anak-anak jalanan di sekitar lingkungan kelurahan binaan.',
    budgetTotal: 50000000,
    budgetSpent: 50000000
  },
  {
    id: 'prog-4',
    name: 'Seminar Nasional Kewirausahaan',
    department: 'Ekonomi Kreatif',
    status: 'BERJALAN',
    progress: 90,
    dateUpdated: '5 jam yang lalu',
    description: 'Seminar interaktif menghadirkan founder startup nasional untuk melatih jiwa wirausaha muda di kalangan mahasiswa.',
    budgetTotal: 40000000,
    budgetSpent: 36000000
  },
  {
    id: 'prog-5',
    name: 'BEM Mengajar',
    department: 'Pengabdian Masyarakat',
    status: 'PERENCANAAN',
    progress: 10,
    dateUpdated: '4 hari yang lalu',
    description: 'Program pengiriman delegasi mahasiswa sebagai pengajar sukarelawan di sekolah dasar daerah tertinggal.',
    budgetTotal: 25000000,
    budgetSpent: 2500000
  }
];

export const initialDocuments: Document[] = [
  // Repositori Transparansi
  {
    id: 'doc-1',
    name: 'LPJ Kegiatan PKKMB 2026',
    period: 'September 2026',
    category: 'LPJ',
    status: 'Terverifikasi',
    fileSize: '4.2 MB',
    downloadsCount: 342
  },
  {
    id: 'doc-2',
    name: 'Realisasi Anggaran Q2 - BEM Univ',
    period: 'April - Juni 2026',
    category: 'Anggaran',
    status: 'Publik',
    fileSize: '1.8 MB',
    downloadsCount: 520
  },
  {
    id: 'doc-3',
    name: 'Rencana Kerja & Anggaran Tahunan (RKAT)',
    period: 'Tahun 2026',
    category: 'Kebijakan',
    status: 'Direvisi',
    fileSize: '3.1 MB',
    downloadsCount: 198
  },
  // Pusat Unduhan
  {
    id: 'doc-4',
    name: 'Panduan Pendaftaran Beasiswa Kemitraan 2026',
    period: 'Oktober 2026',
    category: 'Beasiswa',
    status: 'Publik',
    fileSize: '2.5 MB',
    downloadsCount: 1420
  },
  {
    id: 'doc-5',
    name: 'Template Surat Rekomendasi Kegiatan Mahasiswa',
    period: 'Tahun 2026',
    category: 'Surat Rekomendasi',
    status: 'Publik',
    fileSize: '450 KB',
    downloadsCount: 890
  },
  {
    id: 'doc-6',
    name: 'Buku Panduan Akademik dan Kemahasiswaan',
    period: 'Tahun 2026',
    category: 'Panduan Mahasiswa',
    status: 'Publik',
    fileSize: '8.7 MB',
    downloadsCount: 2310
  },
  {
    id: 'doc-7',
    name: 'AD/ART BEM Fakultas Ilmu Komputer - Amandemen 2025',
    period: 'Tahun 2025',
    category: 'AD/ART',
    status: 'Terverifikasi',
    fileSize: '1.2 MB',
    downloadsCount: 450
  }
];

export const initialAspirations: Aspiration[] = [
  {
    id: 'T-2026-0001',
    name: 'Rendi Pratama',
    studyProgram: 'Sistem Informasi',
    email: 'rendi@student.fik.ac.id',
    category: 'Fasilitas',
    description: 'Mohon penambahan tempat sampah pilah di area kantin utama karena tumpukan sampah plastik sering mengganggu pemandangan.',
    attachmentName: 'foto_kantin_kotor.jpg',
    isAnonymous: false,
    status: 'Selesai',
    adminReply: 'Terima kasih atas laporan Anda. Tempat sampah pilah baru telah diletakkan di 4 titik strategis sekitar kantin utama.',
    dateSubmitted: '2026-07-10 10:15'
  },
  {
    id: 'T-2026-0002',
    name: 'Anonim',
    studyProgram: 'Teknik Informatika',
    email: 'secret@student.fik.ac.id',
    category: 'Akademis',
    description: 'Prosedur pengumpulan berkas tugas akhir di portal universitas sering kali mengalami error server ketika mendekati batas waktu.',
    isAnonymous: true,
    status: 'Proses',
    adminReply: 'BEM telah berkoordinasi dengan Puskom / Biro IT Kampus untuk meningkatkan kapasitas server portal tugas akhir selama minggu tenggat waktu.',
    dateSubmitted: '2026-07-14 15:30'
  },
  {
    id: 'T-2026-0003',
    name: 'Citra Amelia',
    studyProgram: 'Manajemen',
    email: 'citra.amelia@student.fik.ac.id',
    category: 'Finansial',
    description: 'Keterlambatan pencairan dana beasiswa UKT untuk semester genap membuat beberapa mahasiswa kesulitan melakukan herregistrasi.',
    attachmentName: 'syarat_registrasi.pdf',
    isAnonymous: false,
    status: 'Diterima',
    adminReply: 'Aspirasi Anda telah kami terima dan akan diteruskan ke Biro Kemahasiswaan siang ini untuk dicarikan dispensasi herregistrasi.',
    dateSubmitted: '2026-07-17 09:00'
  },
  {
    id: 'T-2026-0004',
    name: 'Dwi Saputra',
    studyProgram: 'Teknik Sipil',
    email: 'dwi@student.fik.ac.id',
    category: 'Fasilitas',
    description: 'Lampu penerangan di koridor belakang gedung rekayasa padam, sangat gelap dan membahayakan mahasiswa saat kuliah malam.',
    isAnonymous: false,
    status: 'Menunggu',
    dateSubmitted: '2026-07-18 01:20'
  }
];

export interface CabinetMember {
  name: string;
  role: string;
  department: string;
  photo: string;
  major: string;
  year: string;
}

export const cabinetMembers: CabinetMember[] = [
  {
    name: 'Fahri Ramadhan',
    role: 'Ketua Umum',
    department: 'Inti',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    major: 'Teknik Informatika',
    year: '2023'
  },
  {
    name: 'Siti Aminah',
    role: 'Wakil Ketua Umum',
    department: 'Inti',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
    major: 'Hukum',
    year: '2023'
  },
  {
    name: 'Andi Wijaya',
    role: 'Sekretaris Jenderal',
    department: 'Inti',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    major: 'Manajemen',
    year: '2023'
  },
  {
    name: 'Larasati Putri',
    role: 'Bendahara Umum',
    department: 'Inti',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    major: 'Akuntansi',
    year: '2023'
  }
];

export const ministries = [
  {
    name: 'Kementerian Sosial & Masyarakat',
    description: 'Berfokus pada pengabdian masyarakat, advokasi isu-isu sosial, dan pemberdayaan komunitas di sekitar kampus.',
    leader: 'Reza Pahlevi',
    sekjen: 'Dian Astuti',
    staff: ['Budi Santoso', 'Kiki Mahendra', 'Alya Yasmin']
  },
  {
    name: 'Kementerian Akademik & Riset',
    description: 'Memfasilitasi pengembangan kompetensi akademik, olimpiade, dan iklim riset bagi mahasiswa.',
    leader: 'Hendra M.',
    sekjen: 'Siska Fitri',
    staff: ['Rian Adit', 'Luthfi T.']
  },
  {
    name: 'Kementerian Hubungan Luar',
    description: 'Menjalin kerjasama strategis dengan organisasi eksternal, alumni, dan institusi pemerintahan.',
    leader: 'Joko P.',
    sekjen: 'Mira N.',
    staff: ['Eko D.']
  }
];
