import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileDown, 
  Search, 
  Download, 
  FileSpreadsheet, 
  BookOpen, 
  GraduationCap, 
  Scale, 
  CheckCircle,
  FileCode
} from 'lucide-react';
import { Document } from '../types';

interface DownloadCenterViewProps {
  documents: Document[];
  onDownloadDoc: (docId: string) => void;
}

export const DownloadCenterView: React.FC<DownloadCenterViewProps> = ({ 
  documents,
  onDownloadDoc
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('SEMUA');

  // Filter public download materials (excluding pure LPJ/Budget which are tracked in Transparency)
  const publicDocs = documents.filter(doc => 
    doc.category !== 'LPJ' && doc.category !== 'Anggaran'
  );

  const filteredDocs = publicDocs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'SEMUA' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const docCategories = [
    { id: 'SEMUA', label: 'Semua Kategori', icon: <FileDown className="w-4 h-4" /> },
    { id: 'Beasiswa', label: 'Peluang Beasiswa', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'Surat Rekomendasi', label: 'Surat & Berkas', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'Panduan Mahasiswa', label: 'Panduan Kampus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'AD/ART', label: 'AD/ART & Regulasi', icon: <Scale className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-16" id="download-center-view">
      {/* 1. Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="download-header">
        <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Pusat Unduhan Publik
        </h1>
        <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
          Akses cepat dan legal untuk mendapatkan panduan administrasi, pengajuan dispensasi, aturan lembaga AD/ART, dan informasi beasiswa terbaru.
        </p>
      </section>

      {/* 2. Main Search & Filter layout */}
      <section className="space-y-8" id="download-content-grid">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs">
          {/* Categories Sidebar on horizontal space */}
          <div className="flex flex-wrap gap-2">
            {docCategories.map((cat) => (
              <button
                key={cat.id}
                id={`btn-dl-cat-${cat.id}`}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-1.5 cursor-pointer transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="dl-search-input"
              placeholder="Cari buku panduan/template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* 3. Filtered documents display */}
        {filteredDocs.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-xs">
            Tidak ditemukan dokumen publik yang sesuai dengan pencarian Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const categoryIcon = {
                'Beasiswa': <GraduationCap className="w-10 h-10 text-emerald-500" />,
                'Surat Rekomendasi': <FileSpreadsheet className="w-10 h-10 text-emerald-500" />,
                'Panduan Mahasiswa': <BookOpen className="w-10 h-10 text-teal-500" />,
                'AD/ART': <Scale className="w-10 h-10 text-emerald-500" />,
                'Kebijakan': <FileCode className="w-10 h-10 text-teal-600" />
              }[doc.category] || <FileDown className="w-10 h-10 text-gray-500" />;

              return (
                <motion.div
                  key={doc.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left space-y-6"
                  whileHover={{ y: -2 }}
                >
                  <div className="space-y-4">
                    {/* Icon & Size badge */}
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        {categoryIcon}
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {doc.fileSize}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-gray-400 tracking-wider uppercase block">
                        Kategori: {doc.category}
                      </span>
                      <h3 className="font-display font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
                        {doc.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-mono">
                        Diterbitkan: {doc.period}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">
                      <span className="font-bold text-gray-900 font-mono">{doc.downloadsCount}</span> kali diunduh
                    </div>

                    <button
                      onClick={() => onDownloadDoc(doc.id)}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-slate-900 hover:bg-emerald-600 hover:text-white text-white font-semibold text-xs rounded-xl cursor-pointer transition-all"
                      id={`dl-card-btn-${doc.id}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Document Request Callout */}
      <section className="bg-slate-50 border border-gray-100 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6" id="doc-request-banner">
        <div className="text-left space-y-1">
          <h3 className="font-display font-bold text-lg text-gray-900">
            Kesulitan menemukan berkas yang dicari?
          </h3>
          <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
            Jika panduan atau dokumen kebijakan eksternal yang Anda butuhkan belum tersedia di Pusat Unduhan ini, Anda dapat mengajukannya langsung ke Kementerian Sekretaris Kabinet BEM.
          </p>
        </div>

        <button
          onClick={() => {
            const element = document.getElementById('bem-navbar');
            if (element) {
              const aspirasiLink = document.getElementById('nav-link-aspirasi');
              if (aspirasiLink) aspirasiLink.click();
            }
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          Minta Dokumen via Advokasi
        </button>
      </section>
    </div>
  );
};
