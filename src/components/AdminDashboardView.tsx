import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Plus, 
  MessageSquare, 
  FilePlus, 
  DollarSign, 
  CheckCircle, 
  Save, 
  Clock, 
  FileText,
  AlertCircle,
  UserCheck,
  Megaphone
} from 'lucide-react';
import { Aspiration, Program, News } from '../types';

interface AdminDashboardViewProps {
  aspirations: Aspiration[];
  programs: Program[];
  newsList: News[];
  onUpdateAspiration: (updated: Aspiration) => void;
  onAddProgram: (program: Omit<Program, 'id' | 'dateUpdated'>) => void;
  onAddNews: (news: Omit<News, 'id' | 'views'>) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  aspirations,
  programs,
  newsList,
  onUpdateAspiration,
  onAddProgram,
  onAddNews
}) => {
  // Roles toggle simulation
  const [adminRole, setAdminRole] = useState<'TEKNIS' | 'KONTEN'>('TEKNIS');

  // Selected aspiration to edit/reply
  const [activeAsp, setActiveAsp] = useState<Aspiration | null>(null);
  const [replyText, setReplyText] = useState('');
  const [statusVal, setStatusVal] = useState<Aspiration['status']>('Menunggu');

  // Form: Add Program
  const [progName, setProgName] = useState('');
  const [progDept, setProgDept] = useState('Seni & Budaya');
  const [progStatus, setProgStatus] = useState<Program['status']>('PERENCANAAN');
  const [progProgress, setProgProgress] = useState(10);
  const [progDesc, setProgDesc] = useState('');
  const [progBudget, setProgBudget] = useState(25000000);
  const [progSpent, setProgSpent] = useState(0);
  const [progSuccessMsg, setProgSuccessMsg] = useState(false);

  // Form: Add News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTag, setNewsTag] = useState<News['tag']>('KEBIJAKAN');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsSuccessMsg, setNewsSuccessMsg] = useState(false);

  // Totals for Dashboard stats
  const totalAspirations = aspirations.length;
  const solvedAspirations = aspirations.filter(a => a.status === 'Selesai').length;
  const pendingAspirations = aspirations.filter(a => a.status === 'Menunggu' || a.status === 'Diterima').length;
  const totalBudget = programs.reduce((sum, p) => sum + p.budgetTotal, 0);

  // Select aspiration to manage
  const handleSelectAsp = (asp: Aspiration) => {
    setActiveAsp(asp);
    setReplyText(asp.adminReply || '');
    setStatusVal(asp.status);
  };

  const handleSaveAspReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsp) return;

    onUpdateAspiration({
      ...activeAsp,
      status: statusVal,
      adminReply: replyText
    });

    setActiveAsp(null);
    setReplyText('');
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progName.trim()) return;

    onAddProgram({
      name: progName,
      department: progDept,
      status: progStatus,
      progress: Number(progProgress),
      description: progDesc,
      budgetTotal: Number(progBudget),
      budgetSpent: Number(progSpent)
    });

    setProgName('');
    setProgDesc('');
    setProgBudget(25000000);
    setProgSpent(0);
    setProgSuccessMsg(true);
    setTimeout(() => setProgSuccessMsg(false), 3000);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    onAddNews({
      title: newsTitle,
      tag: newsTag,
      summary: newsSummary || newsContent.slice(0, 100) + '...',
      content: newsContent,
      image: newsImage.trim() || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    });

    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImage('');
    setNewsSuccessMsg(true);
    setTimeout(() => setNewsSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-10" id="admin-view-container">
      {/* 1. Header with Role Selection Toggle */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md" id="admin-header-panel">
        <div className="text-left space-y-1.5">
          <div className="inline-flex items-center space-x-1 bg-emerald-500/25 px-2.5 py-1 rounded text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <span>🛡️ MODE ADMINISTRATOR BEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Control Center Kabinet
          </h1>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Pusat pembaruan informasi, persetujuan beasiswa, penanganan aspirasi sengketa, dan penerbitan laporan pertanggungjawaban.
          </p>
        </div>

        {/* Role Privileges Simulation toggle */}
        <div className="bg-slate-800 p-1.5 rounded-xl border border-slate-700 flex space-x-1 shrink-0">
          <button
            id="role-teknis-toggle"
            onClick={() => {
              setAdminRole('TEKNIS');
              setActiveAsp(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              adminRole === 'TEKNIS'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Tim Advokasi (Teknis)</span>
          </button>
          <button
            id="role-konten-toggle"
            onClick={() => {
              setAdminRole('KONTEN');
              setActiveAsp(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              adminRole === 'KONTEN'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Tim Kominfo (Konten)</span>
          </button>
        </div>
      </section>

      {/* 2. Admin KPIs statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="admin-stats-grid">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono text-gray-900">{totalAspirations}</span>
            <span className="text-[11px] text-gray-500 font-medium">Laporan Masuk</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono text-gray-900">{pendingAspirations}</span>
            <span className="text-[11px] text-gray-500 font-medium">Butuh Tindakan</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono text-gray-900">{solvedAspirations}</span>
            <span className="text-[11px] text-gray-500 font-medium">Selesai Ditindak</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono text-gray-900">{programs.length}</span>
            <span className="text-[11px] text-gray-500 font-medium">Program Kerja</span>
          </div>
        </div>
      </section>

      {/* 3. Role-based Conditional Dashboard Views */}
      <div id="admin-main-workspaces">
        {adminRole === 'TEKNIS' ? (
          /* =====================================
             A. TIM TEKNIS: ADVOKASI & DISPOSISI 
             ===================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Table of Aspirations (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-gray-900">
                    Daftar Masuk Aspirasi Mahasiswa
                  </h3>
                  <p className="text-xs text-gray-500">Klik "Tindak Lanjuti" untuk merespon aduan atau merubah status.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Otoritas Advokasi
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase">
                      <th className="py-3 px-2">Tiket ID</th>
                      <th className="py-3 px-2">Pelapor</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {aspirations.map((asp) => {
                      const pillColors = {
                        'Menunggu': 'bg-red-50 text-red-600 border-red-100',
                        'Diterima': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                        'Proses': 'bg-teal-50 text-teal-600 border-teal-100',
                        'Selesai': 'bg-green-50 text-green-600 border-green-100'
                      }[asp.status];

                      return (
                        <tr key={asp.id} className="hover:bg-gray-50/50">
                          <td className="py-3 px-2 font-mono font-bold text-gray-900">{asp.id}</td>
                          <td className="py-3 px-2">
                            <span className="block font-semibold">
                              {asp.isAnonymous ? 'Anonim' : asp.name}
                            </span>
                            {!asp.isAnonymous && (
                              <span className="block text-[10px] text-gray-400">{asp.studyProgram}</span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-gray-500">{asp.category}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${pillColors}`}>
                              {asp.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleSelectAsp(asp)}
                              className="px-3 py-1 bg-slate-900 hover:bg-emerald-600 hover:text-white text-white text-[10px] font-semibold rounded-md cursor-pointer transition-colors"
                              id={`btn-manage-asp-${asp.id}`}
                            >
                              Tindak Lanjuti
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Selected Aspiration Detailing & Reply Form (1 col) */}
            <div className="lg:col-span-1">
              {activeAsp ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border-2 border-emerald-200 rounded-3xl p-6 text-left space-y-6 shadow-sm"
                  id="active-asp-admin-card"
                >
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <h3 className="font-display font-bold text-gray-900 text-sm sm:text-base">
                      Tanggapi Tiket #{activeAsp.id}
                    </h3>
                    <button
                      onClick={() => setActiveAsp(null)}
                      className="text-gray-400 hover:text-gray-900 text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                    <p className="font-semibold text-gray-500">
                      Pengadu: <span className="text-gray-900">{activeAsp.isAnonymous ? 'Anonim (Rahasia)' : `${activeAsp.name} (${activeAsp.studyProgram})`}</span>
                    </p>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{activeAsp.description}"
                    </p>
                  </div>

                  <form onSubmit={handleSaveAspReply} className="space-y-4">
                    {/* Status Dropdown */}
                    <div className="space-y-1">
                      <label htmlFor="admin-status-dropdown" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Set Status Advokasi</label>
                      <select
                        id="admin-status-dropdown"
                        value={statusVal}
                        onChange={(e: any) => setStatusVal(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Menunggu">Menunggu Verifikasi</option>
                        <option value="Diterima">Diterima / Valid</option>
                        <option value="Proses">Dalam Proses Penanganan</option>
                        <option value="Selesai">Tuntas / Selesai</option>
                      </select>
                    </div>

                    {/* Reply Textarea */}
                    <div className="space-y-1">
                      <label htmlFor="admin-reply-textarea" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Tanggapan Resmi Pengurus</label>
                      <textarea
                        id="admin-reply-textarea"
                        rows={4}
                        required
                        placeholder="Ketik tanggapan formal kementerian..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                      id="btn-save-reply"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan & Tanggapi</span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400 text-xs h-full flex flex-col justify-center items-center space-y-3">
                  <UserCheck className="w-8 h-8 text-gray-300" />
                  <p>Pilih salah satu aspirasi di tabel kiri untuk dikoordinasikan secara formal.</p>
                </div>
              )}
            </div>

            {/* Form: Add Program (Visible to Advokasi/Teknis Role as well) */}
            <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs text-left space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-display font-extrabold text-lg text-gray-900">
                  Daftarkan Program Kerja Baru
                </h3>
                <p className="text-xs text-gray-500">Mendaftarkan inisiatif atau melacak alur kegiatan kabinet baru.</p>
              </div>

              {progSuccessMsg && (
                <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-green-100">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Program baru berhasil didaftarkan ke Portal Kerja!</span>
                </div>
              )}

              <form onSubmit={handleCreateProgram} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="f-prog-name" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Program Kerja</label>
                    <input
                      type="text"
                      id="f-prog-name"
                      required
                      placeholder="Contoh: Diskusi Terbuka Isu Lingkungan"
                      value={progName}
                      onChange={(e) => setProgName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="f-prog-dept" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Kementerian Penanggungjawab</label>
                    <select
                      id="f-prog-dept"
                      value={progDept}
                      onChange={(e) => setProgDept(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Seni & Budaya">Seni & Budaya</option>
                      <option value="PSDM">PSDM</option>
                      <option value="Sosial Politik">Sosial Politik</option>
                      <option value="Ekonomi Kreatif">Ekonomi Kreatif</option>
                      <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label htmlFor="f-prog-status" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Status</label>
                      <select
                        id="f-prog-status"
                        value={progStatus}
                        onChange={(e: any) => setProgStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="PERENCANAAN">PERENCANAAN</option>
                        <option value="BERJALAN">BERJALAN</option>
                        <option value="SELESAI">SELESAI</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="f-prog-prog" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Progres (%)</label>
                      <input
                        type="number"
                        id="f-prog-prog"
                        min="0"
                        max="100"
                        required
                        value={progProgress}
                        onChange={(e) => setProgProgress(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label htmlFor="f-prog-budget" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Alokasi Anggaran (Rp)</label>
                      <input
                        type="number"
                        id="f-prog-budget"
                        required
                        value={progBudget}
                        onChange={(e) => setProgBudget(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="f-prog-spent" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Realisasi Serapan (Rp)</label>
                      <input
                        type="number"
                        id="f-prog-spent"
                        required
                        value={progSpent}
                        onChange={(e) => setProgSpent(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <label htmlFor="f-prog-desc" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Deskripsi Singkat Program</label>
                    <textarea
                      id="f-prog-desc"
                      rows={2}
                      required
                      placeholder="Terangkan tujuan rincian dari pelaksanaan kegiatan..."
                      value={progDesc}
                      onChange={(e) => setProgDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    id="btn-submit-prog-admin"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Daftarkan Program</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        ) : (
          /* =====================================
             B. TIM KONTEN: ANNOUNCEMENT & BERITA
             ===================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            
            {/* Form: Add News (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-display font-extrabold text-lg text-gray-900">
                  Terbitkan Kabar Kabinet Terbaru
                </h3>
                <p className="text-xs text-gray-500">Buat rilis berita pers, pengumuman, atau sosialisasi kebijakan akademik.</p>
              </div>

              {newsSuccessMsg && (
                <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-green-100">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Kabar kabinet berhasil diterbitkan dan langsung tayang di Beranda!</span>
                </div>
              )}

              <form onSubmit={handleCreateNews} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="f-news-title" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Judul Kabar Utama</label>
                    <input
                      type="text"
                      id="f-news-title"
                      required
                      placeholder="Contoh: Alokasi Subsidi Internet Semester Genap"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="f-news-tag" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Tag Kategori</label>
                    <select
                      id="f-news-tag"
                      value={newsTag}
                      onChange={(e: any) => setNewsTag(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="KEBIJAKAN">KEBIJAKAN (Regulasi & Rektorat)</option>
                      <option value="SOSIAL">SOSIAL (Pengabdian & Donasi)</option>
                      <option value="AKADEMIK">AKADEMIK (Beasiswa & Prestasi)</option>
                      <option value="INFORMASI">INFORMASI (Agenda Umum)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="f-news-img" className="text-[10px] font-mono font-bold text-gray-500 uppercase">URL Gambar Cover (Unsplash/Optional)</label>
                  <input
                    type="text"
                    id="f-news-img"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newsImage}
                    onChange={(e) => setNewsImage(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="f-news-summary" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Ringkasan Berita Singkat</label>
                  <input
                    type="text"
                    id="f-news-summary"
                    required
                    placeholder="Rangkuman 1 kalimat agar memancing minat baca mahasiswa..."
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="f-news-content" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Isi Berita Lengkap</label>
                  <textarea
                    id="f-news-content"
                    rows={6}
                    required
                    placeholder="Tuliskan berita lengkap di sini..."
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
                  id="btn-publish-news"
                >
                  <FilePlus className="w-4 h-4" />
                  <span>Terbitkan Kabar Berita</span>
                </button>
              </form>
            </div>

            {/* Right: Published News List Summary (1 col) */}
            <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">
                Kabar Terbit ({newsList.length})
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {newsList.map((news) => (
                  <div key={news.id} className="p-3 bg-slate-50 rounded-xl space-y-1 border border-gray-100">
                    <div className="flex justify-between text-[9px] font-mono font-bold text-gray-400">
                      <span>{news.tag}</span>
                      <span>{news.date}</span>
                    </div>
                    <h4 className="font-display font-semibold text-xs text-gray-900 truncate">
                      {news.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
