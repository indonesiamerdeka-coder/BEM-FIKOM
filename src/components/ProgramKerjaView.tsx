import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  Download, 
  SlidersHorizontal, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  FileText,
  DollarSign,
  PieChart
} from 'lucide-react';
import { Program, Document } from '../types';

interface ProgramKerjaViewProps {
  programs: Program[];
  documents: Document[];
  onDownloadDoc: (docId: string) => void;
}

export const ProgramKerjaView: React.FC<ProgramKerjaViewProps> = ({ 
  programs, 
  documents,
  onDownloadDoc
}) => {
  const [progSearch, setProgSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'SEMUA' | 'PERENCANAAN' | 'BERJALAN' | 'SELESAI'>('SEMUA');
  const [docSearch, setDocSearch] = useState('');
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('SEMUA');

  // Filter Programs
  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(progSearch.toLowerCase()) || 
                          prog.department.toLowerCase().includes(progSearch.toLowerCase());
    const matchesStatus = statusFilter === 'SEMUA' || prog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Transparency Documents (LPJ, Anggaran, Kebijakan)
  const transparencyDocs = documents.filter(doc => 
    doc.category === 'LPJ' || doc.category === 'Anggaran' || doc.category === 'Kebijakan'
  );

  const filteredDocs = transparencyDocs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(docSearch.toLowerCase()) ||
                          doc.period.toLowerCase().includes(docSearch.toLowerCase());
    const matchesCategory = docCategoryFilter === 'SEMUA' || doc.category === docCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Finance visualizer data helper
  const totalBudget = programs.reduce((sum, p) => sum + p.budgetTotal, 0);
  const totalSpent = programs.reduce((sum, p) => sum + p.budgetSpent, 0);
  const absorptionRate = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Format currency to IDR
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-16" id="proker-view-container">
      {/* 1. Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="proker-header">
        <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Transparansi Kerja & LPJ
        </h1>
        <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
          Wujud komitmen akuntabilitas publik BEM Fakultas Ilmu Komputer. Pantau langsung kemajuan program kerja, realisasi keuangan, dan unduh dokumen resmi.
        </p>
      </section>

      {/* 2. Interactive Budget Absorption Visualizer */}
      <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8" id="finance-visualizer">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left space-y-1">
            <span className="inline-flex items-center space-x-1.5 bg-green-50 text-green-600 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Laporan Keuangan Real-Time</span>
            </span>
            <h2 className="font-display font-extrabold text-2xl text-gray-900">
              Visualisasi Serapan Anggaran BEM
            </h2>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex gap-6 text-sm">
            <div>
              <span className="block text-gray-400 text-xs uppercase">Total Anggaran Kabinet</span>
              <span className="font-bold text-gray-800 font-mono text-base">{formatIDR(totalBudget)}</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <span className="block text-gray-400 text-xs uppercase">Total Serapan Aktual</span>
              <span className="font-bold text-green-600 font-mono text-base">{formatIDR(totalSpent)}</span>
            </div>
          </div>
        </div>

        {/* Visualizer Chart Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-gray-100">
          {/* Radial absorption rate */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-40 h-40">
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="#e2e8f0" 
                  strokeWidth="8" 
                  fill="transparent" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * absorptionRate) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900 font-mono leading-none">
                  {absorptionRate.toFixed(1)}%
                </span>
                <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase font-bold tracking-wider">
                  Rasio Serapan
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium text-center">
              Seluruh dana diaudit secara independen oleh Senat Mahasiswa.
            </p>
          </div>

          {/* Department breakdown list with customized micro bars */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display font-bold text-gray-900 text-sm">
              Rasio Serapan per Bidang Kerja (Top Program)
            </h4>
            <div className="space-y-3">
              {programs.map((p) => {
                const percent = p.budgetTotal > 0 ? (p.budgetSpent / p.budgetTotal) * 100 : 0;
                return (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-700">{p.name} ({p.department})</span>
                      <span className="text-gray-500 font-mono">
                        {formatIDR(p.budgetSpent)} / {formatIDR(p.budgetTotal)} ({percent.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filterable Programs Directory */}
      <section className="space-y-8" id="programs-directory-panel">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900">
              Daftar Rencana & Kemajuan Program
            </h2>
            <p className="text-sm text-gray-500">
              Lihat status pelaksanaan masing-masing kementerian secara terbuka.
            </p>
          </div>

          {/* Program Filters & Search */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="proker-search-input"
                placeholder="Cari program..."
                value={progSearch}
                onChange={(e) => setProgSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <select
              id="status-filter-select"
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="SEMUA">Semua Status</option>
              <option value="PERENCANAAN">Perencanaan</option>
              <option value="BERJALAN">Berjalan</option>
              <option value="SELESAI">Selesai</option>
            </select>
          </div>
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((prog) => {
            const statusColors = {
              'PERENCANAAN': 'bg-emerald-50 text-emerald-600 border-emerald-100',
              'BERJALAN': 'bg-teal-50 text-teal-600 border-teal-100',
              'SELESAI': 'bg-green-50 text-green-600 border-green-100'
            };

            return (
              <div 
                key={prog.id}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-gray-400 uppercase">
                      KEMENTERIAN {prog.department}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[prog.status]}`}>
                      {prog.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-gray-900 text-base leading-tight">
                    {prog.name}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Progress Bar with label */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                      <span className="text-gray-400">Kemajuan Program</span>
                      <span className="text-gray-900">{prog.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          prog.status === 'SELESAI' ? 'bg-green-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${prog.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Sistem: diperbarui {prog.dateUpdated}</span>
                    </span>
                    <span>Anggaran: {formatIDR(prog.budgetTotal)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Repositori Transparansi (LPJ & Anggaran) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-8" id="transparency-document-repository">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="text-left space-y-1">
            <h2 className="font-display font-extrabold text-2xl text-white">
              Repositori Transparansi Digital
            </h2>
            <p className="text-sm text-slate-400">
              Unduh Laporan Pertanggungjawaban (LPJ) & Rincian Anggaran secara legal.
            </p>
          </div>

          {/* Doc filter tools */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto text-slate-900">
            <div className="relative flex-1 sm:w-48 text-white">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="doc-search-input"
                placeholder="Cari berkas..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              id="doc-category-filter"
              value={docCategoryFilter}
              onChange={(e: any) => setDocCategoryFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-700 bg-slate-800 text-white rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="SEMUA">Semua Kategori</option>
              <option value="LPJ">LPJ (Laporan)</option>
              <option value="Anggaran">Anggaran (Keuangan)</option>
              <option value="Kebijakan">Kebijakan (Regulasi)</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto" id="docs-table-container">
          {filteredDocs.length === 0 ? (
            <p className="text-center text-slate-500 py-10">Tidak ditemukan dokumen LPJ/Anggaran yang cocok.</p>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-4">Nama Berkas Laporan</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4">Periode</th>
                  <th className="py-4 px-4">Ukuran</th>
                  <th className="py-4 px-4 text-center">Status Audit</th>
                  <th className="py-4 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredDocs.map((doc) => {
                  const statusColors = {
                    'Terverifikasi': 'text-green-400 bg-green-500/10 border-green-500/20',
                    'Publik': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                    'Direvisi': 'text-red-400 bg-red-500/10 border-red-500/20'
                  };

                  return (
                    <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="text-white font-display font-semibold truncate max-w-xs sm:max-w-md">
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">{doc.period}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">{doc.fileSize}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${statusColors[doc.status]}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onDownloadDoc(doc.id)}
                          className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-emerald-500/25 transition-all"
                          id={`btn-download-${doc.id}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh ({doc.downloadsCount})</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};
