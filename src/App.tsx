import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, 
  X, 
  Download, 
  CheckCircle2, 
  Heart 
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProfilView } from './components/ProfilView';
import { ProgramKerjaView } from './components/ProgramKerjaView';
import { AspirasiView } from './components/AspirasiView';
import { DownloadCenterView } from './components/DownloadCenterView';
import { AdminDashboardView } from './components/AdminDashboardView';

import { 
  initialNews, 
  initialEvents, 
  initialPrograms, 
  initialDocuments, 
  initialAspirations 
} from './data';
import { News, BEMEvent, Program, Document, Aspiration } from './types';

export default function App() {
  // Page Tab state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [showBanner, setShowBanner] = useState(true);

  // Core Reactive Data States
  const [newsList, setNewsList] = useState<News[]>(initialNews);
  const [events, setEvents] = useState<BEMEvent[]>(initialEvents);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [aspirations, setAspirations] = useState<Aspiration[]>(initialAspirations);

  // New ticket alerts
  const [newTicketId, setNewTicketId] = useState<string | null>(null);

  // Global Toast notifier state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Is Admin simulator toggle
  const [isAdmin, setIsAdmin] = useState(false);

  // Handlers
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadDoc = (docId: string) => {
    // Increment download counter
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === docId) {
          triggerToast(`📥 Berhasil mengunduh: ${doc.name}`);
          return { ...doc, downloadsCount: doc.downloadsCount + 1 };
        }
        return doc;
      })
    );
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSubmitAspiration = (newAspData: Omit<Aspiration, 'id' | 'status' | 'dateSubmitted'>) => {
    // Generate a fresh unique ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `T-2026-${randomNum}`;
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newAspiration: Aspiration = {
      id,
      ...newAspData,
      status: 'Menunggu',
      dateSubmitted: timestamp
    };

    setAspirations(prev => [newAspiration, ...prev]);
    setNewTicketId(id);
    triggerToast(`✨ Tiket ${id} berhasil dikirimkan!`);
  };

  const handleUpdateAspiration = (updatedAsp: Aspiration) => {
    setAspirations(prev => 
      prev.map(a => a.id === updatedAsp.id ? updatedAsp : a)
    );
    triggerToast(`💾 Berhasil mengupdate status tiket ${updatedAsp.id}`);
  };

  const handleAddProgram = (progData: Omit<Program, 'id' | 'dateUpdated'>) => {
    const id = `prog-${Math.floor(Math.random() * 10000)}`;
    const newProg: Program = {
      id,
      ...progData,
      dateUpdated: 'Baru saja'
    };

    setPrograms(prev => [newProg, ...prev]);
    triggerToast(`💼 Program "${progData.name}" berhasil didaftarkan.`);
  };

  const handleAddNews = (newsData: Omit<News, 'id' | 'views'>) => {
    const id = `news-${Math.floor(Math.random() * 10000)}`;
    const newNews: News = {
      id,
      ...newsData,
      views: 1
    };

    setNewsList(prev => [newNews, ...prev]);
    triggerToast(`📢 Kabar "${newsData.title}" berhasil diterbitkan.`);
  };

  // Helper count totals
  const totalAspirations = aspirations.length;
  const solvedAspirationsCount = aspirations.filter(a => a.status === 'Selesai').length;
  const programsCount = programs.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800 selection:bg-emerald-100 selection:text-emerald-900" id="bem-app-root">
      
      {/* 1. Global Announcement Ticker */}
      {showBanner && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 flex justify-between items-center z-50 shadow-xs" id="global-announcement-bar">
          <div className="flex items-center space-x-2 mx-auto">
            <Megaphone className="w-4 h-4 shrink-0 animate-bounce" />
            <span className="truncate">
              📢 <strong>Pengumuman:</strong> Rapat Pleno Terbuka Triwulan III diselenggarakan 28 Oktober 2026. Semua mahasiswa aktif diundang hadir!
            </span>
          </div>
          <button 
            onClick={() => setShowBanner(false)} 
            className="text-white hover:bg-emerald-700/30 p-1 rounded transition-colors"
            title="Tutup banner"
            id="btn-close-announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Sticky Navbar */}
      <Navbar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* 3. Main Content Render Frame */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10" id="bem-main-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'home' && (
              <HomeView 
                newsList={newsList} 
                events={events} 
                onNavigate={handleTabChange}
                aspirationsCount={totalAspirations}
                solvedAspirationsCount={solvedAspirationsCount}
                programsCount={programsCount}
              />
            )}

            {currentTab === 'profil' && (
              <ProfilView />
            )}

            {currentTab === 'proker' && (
              <ProgramKerjaView 
                programs={programs} 
                documents={documents}
                onDownloadDoc={handleDownloadDoc}
              />
            )}

            {currentTab === 'aspirasi' && (
              <AspirasiView 
                aspirations={aspirations}
                onSubmitAspiration={handleSubmitAspiration}
                newTicketId={newTicketId}
                onClearNewTicketId={() => setNewTicketId(null)}
              />
            )}

            {currentTab === 'unduhan' && (
              <DownloadCenterView 
                documents={documents}
                onDownloadDoc={handleDownloadDoc}
              />
            )}

            {currentTab === 'admin' && (
              <AdminDashboardView 
                aspirations={aspirations}
                programs={programs}
                newsList={newsList}
                onUpdateAspiration={handleUpdateAspiration}
                onAddProgram={handleAddProgram}
                onAddNews={handleAddNews}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Elegant Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* 5. Custom Floating Toast message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 border border-slate-800 text-sm font-semibold"
            id="bem-toast-notifier"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
