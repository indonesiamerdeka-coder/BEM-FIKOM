import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Send, 
  Search, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Upload, 
  Loader2, 
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { Aspiration } from '../types';

interface AspirasiViewProps {
  aspirations: Aspiration[];
  onSubmitAspiration: (data: Omit<Aspiration, 'id' | 'status' | 'dateSubmitted'>) => void;
  newTicketId: string | null;
  onClearNewTicketId: () => void;
}

export const AspirasiView: React.FC<AspirasiViewProps> = ({ 
  aspirations, 
  onSubmitAspiration,
  newTicketId,
  onClearNewTicketId
}) => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studyProgram, setStudyProgram] = useState('');
  const [category, setCategory] = useState<'Akademis' | 'Fasilitas' | 'Finansial' | 'Lainnya'>('Akademis');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search Ticket State
  const [searchTicketId, setSearchTicketId] = useState('');
  const [searchedTicket, setSearchedTicket] = useState<Aspiration | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // File Drag-and-Drop state
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachment(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      onSubmitAspiration({
        name: isAnonymous ? 'Anonim' : name,
        email: isAnonymous ? 'secret@student.fik.ac.id' : email,
        studyProgram: isAnonymous ? 'Rahasia' : studyProgram,
        category,
        description,
        attachmentName: attachment ? attachment.name : undefined,
        isAnonymous
      });

      // Clear Form
      setName('');
      setEmail('');
      setStudyProgram('');
      setDescription('');
      setAttachment(null);
      setIsAnonymous(false);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleSearchTicket = (ticketIdToSearch: string) => {
    const trimmedId = ticketIdToSearch.trim().toUpperCase();
    if (!trimmedId) return;

    const found = aspirations.find(a => a.id.toUpperCase() === trimmedId);
    if (found) {
      setSearchedTicket(found);
      setSearchError(null);
    } else {
      setSearchedTicket(null);
      setSearchError(`Tiket "${trimmedId}" tidak ditemukan. Pastikan format ID benar (contoh: T-2026-0001)`);
    }
  };

  const getStepStatus = (currentStatus: string, stepName: string) => {
    const order = ['Menunggu', 'Diterima', 'Proses', 'Selesai'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepName);

    if (currentIndex >= stepIndex) {
      if (currentStatus === stepName) return 'active';
      return 'completed';
    }
    return 'pending';
  };

  return (
    <div className="space-y-16" id="aspirasi-view-container">
      {/* 1. Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="aspirasi-header">
        <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Aspirasi & Advokasi Mahasiswa
        </h1>
        <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
          Butuh bantuan penyelesaian masalah perkuliahan, UKT, atau infrastruktur kampus? Sampaikan laporan Anda secara legal, aman, dan dapat dilacak real-time.
        </p>
      </section>

      {/* Success Alert for newly submitted ticket */}
      <AnimatePresence>
        {newTicketId && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-left space-y-4 max-w-3xl mx-auto shadow-md"
            id="ticket-success-alert"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-green-900 text-lg">Aspirasi Berhasil Terkirim!</h3>
                <p className="text-sm text-green-700 leading-relaxed">
                  Laporan Anda telah berhasil masuk ke antrean database BEM Fakultas Ilmu Komputer. Mohon simpan Kode Tiket di bawah ini untuk melacak perkembangan penanganan di sebelah kanan halaman.
                </p>
                <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 border border-green-300 px-4 py-2 rounded-xl">
                  <span className="text-xs text-green-800 font-semibold uppercase tracking-wider font-mono">Kode Tiket:</span>
                  <span className="text-sm text-green-950 font-black font-mono tracking-widest">{newTicketId}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  handleSearchTicket(newTicketId);
                  onClearNewTicketId();
                  // Scroll to tracking section
                  const element = document.getElementById('tracking-system-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Lacak Tiket Ini Langsung</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Form & Status Tracking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" id="aspirasi-content-layout">
        
        {/* Left: Submission Form */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs text-left space-y-6" id="form-submission-section">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-display font-extrabold text-xl text-gray-900">Form Pengaduan Mahasiswa</h2>
            <p className="text-xs text-gray-500">Pilih kategori yang sesuai untuk mempercepat alur koordinasi kementerian.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Anonymous Toggle */}
            <div className="bg-slate-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="block text-sm font-semibold text-gray-900">Kirim sebagai Anonim</span>
                <span className="block text-[11px] text-gray-500">
                  Nama, email, dan jurusan Anda akan disembunyikan dari pelacakan publik.
                </span>
              </div>
              <input
                type="checkbox"
                id="checkbox-anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
            </div>

            {/* Non-anonymous fields */}
            {!isAnonymous && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="field-name" className="text-xs font-bold text-gray-700 uppercase">Nama Lengkap</label>
                    <input
                      type="text"
                      id="field-name"
                      required={!isAnonymous}
                      placeholder="Contoh: Budi Gunawan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="field-study" className="text-xs font-bold text-gray-700 uppercase">Program Studi / Jurusan</label>
                    <input
                      type="text"
                      id="field-study"
                      required={!isAnonymous}
                      placeholder="Contoh: Manajemen Informatika"
                      value={studyProgram}
                      onChange={(e) => setStudyProgram(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="field-email" className="text-xs font-bold text-gray-700 uppercase">Email Fakultas (@student.fik.ac.id)</label>
                  <input
                    type="email"
                    id="field-email"
                    required={!isAnonymous}
                    placeholder="budi@student.fik.ac.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </motion.div>
            )}

            {/* Aspiration Category */}
            <div className="space-y-1">
              <label htmlFor="field-category" className="text-xs font-bold text-gray-700 uppercase">Kategori Isu / Aspirasi</label>
              <select
                id="field-category"
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Akademis">Akademis (Kurikulum, Dosen, Herregistrasi)</option>
                <option value="Fasilitas">Fasilitas Kampus (Wifi, AC, Parkir, Kantin, Kelas)</option>
                <option value="Finansial">Finansial (Bantuan UKT, Beasiswa, Tunggakan)</option>
                <option value="Lainnya">Lainnya / Pengaduan Umum</option>
              </select>
            </div>

            {/* Description Text area */}
            <div className="space-y-1">
              <label htmlFor="field-desc" className="text-xs font-bold text-gray-700 uppercase">Deskripsi Masalah / Usulan</label>
              <textarea
                id="field-desc"
                rows={5}
                required
                placeholder="Deskripsikan secara lengkap mengenai usulan atau keluhan Anda. Masukkan nama fakultas, nomor ruang kelas, atau tanggal kejadian agar mempermudah tim kementerian mengusut."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* File Drag-and-Drop Area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase">Lampiran Pendukung (Foto / Bukti PDF - Maks 5MB)</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-500 hover:bg-slate-50'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload-input')?.click()}
              >
                <input 
                  type="file" 
                  id="file-upload-input" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                
                {attachment ? (
                  <p className="text-xs font-semibold text-emerald-600 truncate">{attachment.name}</p>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Tarik berkas Anda ke sini, atau klik untuk unggah</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Mendukung JPEG, PNG, atau PDF</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              id="btn-submit-aspirasi"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim Laporan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan Resmi</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Right: Real-time Ticket Status Checker */}
        <section className="space-y-6 text-left" id="tracking-system-section">
          {/* Quick Help Box */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Sistem Pelacakan Aspirasi Terintegrasi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahasiswa memiliki hak mengetahui status disposisi laporan secara transparan. Masukkan kode ID tiket unik Anda di bawah ini untuk melihat kementerian pelaksana, alur koordinasi rektorat, dan tanggapan formal pengurus.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>DIKONTROL SECARA VERIFIKATIF OLEH SEKJEN BEM</span>
            </div>
          </div>

          {/* Tracker Search Field */}
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xs space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="search-ticket-input" className="text-xs font-bold text-gray-700 uppercase">Cek Status Tiket Pengaduan</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    id="search-ticket-input"
                    placeholder="Contoh: T-2026-0001"
                    value={searchTicketId}
                    onChange={(e) => setSearchTicketId(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  id="btn-search-ticket"
                  onClick={() => handleSearchTicket(searchTicketId)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Periksa
                </button>
              </div>
            </div>

            {/* Error messaging */}
            {searchError && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Quick-test list helper */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Klik Contoh Tiket Aktif di Bawah:</span>
              <div className="flex flex-wrap gap-2">
                {aspirations.slice(0, 4).map((asp) => (
                  <button
                    key={asp.id}
                    id={`btn-sample-ticket-${asp.id}`}
                    onClick={() => {
                      setSearchTicketId(asp.id);
                      handleSearchTicket(asp.id);
                    }}
                    className={`px-2.5 py-1.5 border rounded-lg text-xs font-semibold font-mono tracking-wider cursor-pointer transition-all ${
                      searchTicketId.toUpperCase() === asp.id.toUpperCase()
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {asp.id} ({asp.status})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper tracking visualization card */}
          {searchedTicket && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6"
              id="visual-stepper-container"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-4 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md tracking-wider uppercase">
                    Kategori: {searchedTicket.category}
                  </span>
                  <h4 className="font-display font-extrabold text-lg text-gray-900 tracking-tight mt-1">
                    Tiket #{searchedTicket.id}
                  </h4>
                </div>

                <div className="text-right text-xs text-gray-400 font-mono">
                  <span>Tanggal:</span>
                  <p className="font-semibold text-gray-700">{searchedTicket.dateSubmitted}</p>
                </div>
              </div>

              {/* Graphical Step indicator */}
              <div className="space-y-3">
                <h5 className="font-display font-bold text-gray-700 text-xs uppercase tracking-wider">Progress Tindak Lanjut</h5>
                <div className="flex items-center justify-between relative pt-2">
                  {/* Background Track Line */}
                  <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 z-0"></div>

                  {/* 4 Steps */}
                  {['Menunggu', 'Diterima', 'Proses', 'Selesai'].map((step, idx) => {
                    const status = getStepStatus(searchedTicket.status, step);
                    
                    const markerColors = {
                      completed: 'bg-green-500 text-white border-green-500',
                      active: 'bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-100',
                      pending: 'bg-white text-gray-300 border-gray-200'
                    };

                    return (
                      <div key={idx} className="flex flex-col items-center z-10 space-y-2">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all ${markerColors[status]}`}>
                          {status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[10px] font-semibold tracking-wide ${
                          status === 'active' ? 'text-emerald-600 font-extrabold' : 'text-gray-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Ticket details body */}
              <div className="space-y-3 text-sm">
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                  <p className="font-semibold text-gray-500">
                    Pelapor: <span className="text-gray-900">{searchedTicket.isAnonymous ? 'Anonim (Dirahasiakan)' : `${searchedTicket.name} (${searchedTicket.studyProgram})`}</span>
                  </p>
                  <p className="text-gray-700 font-medium leading-relaxed italic whitespace-pre-wrap">
                    "{searchedTicket.description}"
                  </p>
                  {searchedTicket.attachmentName && (
                    <div className="flex items-center space-x-1.5 text-emerald-600 font-semibold pt-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lampiran: {searchedTicket.attachmentName}</span>
                    </div>
                  )}
                </div>

                {/* Reply section from Administrator */}
                {searchedTicket.adminReply ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">Tanggapan Kementerian Advokasi</span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {searchedTicket.adminReply}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-2.5 text-xs text-gray-500">
                    <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>Laporan Anda telah divalidasi oleh Kementerian. Tanggapan formal kementerian akan terbit segera setelah dikoordinasikan dengan pihak rektorat terkait.</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};
