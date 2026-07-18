import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Search, 
  TrendingUp, 
  Clock, 
  MessageSquarePlus, 
  ShieldAlert, 
  CheckCircle,
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { News, BEMEvent } from '../types';

interface HomeViewProps {
  newsList: News[];
  events: BEMEvent[];
  onNavigate: (tabId: string) => void;
  aspirationsCount: number;
  solvedAspirationsCount: number;
  programsCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  newsList, 
  events, 
  onNavigate,
  aspirationsCount,
  solvedAspirationsCount,
  programsCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('SEMUA');
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const tags = ['SEMUA', 'KEBIJAKAN', 'SOSIAL', 'AKADEMIK', 'INFORMASI'];

  // Filter news
  const filteredNews = newsList.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'SEMUA' || news.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-16" id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white rounded-3xl overflow-hidden py-16 sm:py-24 px-6 sm:px-12 shadow-xl" id="home-hero">
        {/* Background Decorative Graphic */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-15"></div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <span>✨ BEM Fakultas Ilmu Komputer 2026/2027</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Sinergi Nyata, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300">
              Aspirasi Bermakna
            </span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            Situs resmi Badan Eksekutif Mahasiswa (BEM) Fakultas Ilmu Komputer. Kami hadir sebagai jembatan advokasi, agen perubahan, dan pusat informasi transparan untuk kemajuan mahasiswa.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('aspirasi')}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              id="hero-btn-suara"
            >
              <MessageSquarePlus className="w-5 h-5" />
              <span>Sampaikan Aspirasi</span>
            </button>
            <button
              onClick={() => onNavigate('proker')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3.5 rounded-xl font-medium transition-all cursor-pointer"
              id="hero-btn-proker"
            >
              <span>Lihat Laporan Kerja</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Panel */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="home-stats-grid">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 font-mono">{programsCount}</span>
            <span className="text-xs text-gray-500 font-medium">Program Kerja Terlacak</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 font-mono">{aspirationsCount}</span>
            <span className="text-xs text-gray-500 font-medium">Aspirasi Masuk</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 font-mono">
              {solvedAspirationsCount}
            </span>
            <span className="text-xs text-gray-500 font-medium">Aspirasi Tuntas (100%)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 font-mono">7+</span>
            <span className="text-xs text-gray-500 font-medium">Dokumen Transparansi</span>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid (News Feed & Upcoming Events Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" id="home-main-sections">
        {/* Left Column: News Feed (2 cols space on wide screens) */}
        <section className="lg:col-span-2 space-y-8" id="home-news-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-gray-900">
                Kabar Terbaru Kabinet
              </h2>
              <p className="text-sm text-gray-500">
                Pembaruan informasi, agenda kebijakan, dan laporan aksi BEM.
              </p>
            </div>

            {/* News Search bar */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="news-search-input"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Tags Pills */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                id={`news-tag-${tag}`}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider cursor-pointer transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* News List */}
          {filteredNews.length === 0 ? (
            <div className="bg-gray-50 p-10 rounded-xl text-center text-gray-500">
              Tidak ada berita yang cocok dengan kriteria pencarian Anda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((news) => (
                <motion.div
                  key={news.id}
                  layoutId={`news-card-${news.id}`}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                  onClick={() => setSelectedNews(news)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-emerald-600 tracking-wider">
                      {news.tag}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-400 space-x-3 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{news.date}</span>
                        </span>
                        <span>•</span>
                        <span>{news.views} Pembaca</span>
                      </div>
                      <h3 className="font-display font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>

                    <div className="flex items-center text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                      <span>Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Upcoming Events Calendar */}
        <section className="space-y-6" id="home-events-section">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-display font-extrabold text-2xl text-gray-900">
              Agenda Mendatang
            </h2>
            <p className="text-sm text-gray-500">
              Jangan lewatkan kegiatan publik BEM terdekat.
            </p>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-white border border-gray-100 p-4 rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center space-x-4"
              >
                {/* Date Emblem */}
                <div className="flex flex-col items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl w-14 h-14 shrink-0 font-mono">
                  <span className="text-xl font-bold leading-none">{event.dateStr}</span>
                  <span className="text-[10px] font-bold tracking-wider mt-0.5">{event.monthStr}</span>
                </div>

                {/* Event Details */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <h4 className="font-display font-bold text-sm text-gray-900 truncate">
                    {event.title}
                  </h4>
                  <div className="space-y-0.5 text-xs text-gray-500 font-medium">
                    <p className="flex items-center">
                      <Clock className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
                      <span>{event.time}</span>
                    </p>
                    <p className="truncate">
                      Loc: <span className="text-gray-700">{event.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Advocacy Help Center Box */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15">
              <ShieldAlert className="w-32 h-32 text-white" />
            </div>
            
            <h3 className="font-display font-bold text-lg leading-tight">
              Butuh Pendampingan Akademis atau Fasilitas?
            </h3>
            
            <p className="text-xs text-emerald-100 leading-relaxed">
              Tim Advokasi Mahasiswa BEM siap mendengarkan laporan kendala biaya kuliah (UKT), dugaan pungutan liar, atau kerusakan fasilitas kelas.
            </p>

            <button
              onClick={() => onNavigate('aspirasi')}
              className="w-full bg-white text-emerald-700 font-semibold text-xs py-2.5 rounded-lg hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer block text-center"
            >
              Ajukan Pengaduan Sekarang
            </button>
          </div>
        </section>
      </div>

      {/* 4. News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="news-modal">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Header Image */}
            <div className="relative h-64 w-full">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                id="btn-close-news-modal"
              >
                <span className="sr-only">Tutup</span>
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider">
                {selectedNews.tag}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center text-xs text-gray-400 space-x-3 font-mono">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedNews.date}</span>
                </span>
                <span>•</span>
                <span>{selectedNews.views} Pembaca</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl text-gray-900 leading-tight">
                {selectedNews.title}
              </h2>

              <p className="text-sm font-semibold text-gray-700 border-l-4 border-emerald-500 pl-3 leading-relaxed">
                {selectedNews.summary}
              </p>

              <hr className="border-gray-100" />

              <div className="text-sm text-gray-600 leading-relaxed space-y-4 whitespace-pre-line">
                {selectedNews.content}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Tutup Berita
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
