import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Megaphone,
  Trash2,
  Edit3,
  Search,
  LogOut,
  FolderOpen,
  X,
  PlusCircle,
  FileCheck2,
  ListFilter
} from 'lucide-react';
import { Aspiration, Program, News, Document, CabinetMember, Ministry } from '../types';

interface AdminDashboardViewProps {
  aspirations: Aspiration[];
  programs: Program[];
  newsList: News[];
  documents: Document[];
  cabinetMembers: CabinetMember[];
  ministries: Ministry[];
  onUpdateAspiration: (updated: Aspiration) => void;
  onDeleteAspiration: (id: string) => void;
  onAddProgram: (program: Omit<Program, 'id' | 'dateUpdated'>) => void;
  onUpdateProgram: (program: Program) => void;
  onDeleteProgram: (id: string) => void;
  onAddNews: (news: Omit<News, 'id' | 'views'>) => void;
  onUpdateNews: (news: News) => void;
  onDeleteNews: (id: string) => void;
  onAddDocument: (doc: Omit<Document, 'id' | 'downloadsCount'>) => void;
  onUpdateDocument: (doc: Document) => void;
  onDeleteDocument: (id: string) => void;
  onAddCabinetMember: (member: Omit<CabinetMember, 'id'>) => void;
  onUpdateCabinetMember: (member: CabinetMember) => void;
  onDeleteCabinetMember: (id: string) => void;
  onAddMinistry: (min: Omit<Ministry, 'id'>) => void;
  onUpdateMinistry: (min: Ministry) => void;
  onDeleteMinistry: (id: string) => void;
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  aspirations,
  programs,
  newsList,
  documents,
  cabinetMembers,
  ministries,
  onUpdateAspiration,
  onDeleteAspiration,
  onAddProgram,
  onUpdateProgram,
  onDeleteProgram,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  onAddCabinetMember,
  onUpdateCabinetMember,
  onDeleteCabinetMember,
  onAddMinistry,
  onUpdateMinistry,
  onDeleteMinistry,
  onLogout
}) => {
  // Roles toggle simulation
  const [adminRole, setAdminRole] = useState<'TEKNIS' | 'KONTEN'>('TEKNIS');
  
  // Tab inside roles
  const [activeSubTab, setActiveSubTab] = useState<string>('aspirasi'); // 'aspirasi' | 'proker' for TEKNIS, 'berita' | 'dokumen' for KONTEN

  // ----------------------------------------------------
  // SEARCH & FILTER STATES
  // ----------------------------------------------------
  const [aspSearch, setAspSearch] = useState('');
  const [aspFilter, setAspFilter] = useState<string>('ALL');
  
  const [progSearch, setProgSearch] = useState('');
  const [progFilter, setProgFilter] = useState<string>('ALL');

  const [newsSearch, setNewsSearch] = useState('');
  const [newsFilter, setNewsFilter] = useState<string>('ALL');

  const [docSearch, setDocSearch] = useState('');
  const [docFilter, setDocFilter] = useState<string>('ALL');

  // Delete protection confirmation states
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // ----------------------------------------------------
  // ASPIRASI CRUD STATES
  // ----------------------------------------------------
  const [activeAsp, setActiveAsp] = useState<Aspiration | null>(null);
  const [replyText, setReplyText] = useState('');
  const [statusVal, setStatusVal] = useState<Aspiration['status']>('Menunggu');
  const [isAddingAspOffline, setIsAddingAspOffline] = useState(false);
  
  // Offline Aspirasi Form State
  const [offName, setOffName] = useState('');
  const [offMajor, setOffMajor] = useState('Teknik Informatika');
  const [offEmail, setOffEmail] = useState('');
  const [offCat, setOffCat] = useState<Aspiration['category']>('Fasilitas');
  const [offDesc, setOffDesc] = useState('');
  const [offIsAnon, setOffIsAnon] = useState(false);

  // ----------------------------------------------------
  // PROGRAM CRUD STATES
  // ----------------------------------------------------
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [progName, setProgName] = useState('');
  const [progDept, setProgDept] = useState('Seni & Budaya');
  const [progStatus, setProgStatus] = useState<Program['status']>('PERENCANAAN');
  const [progProgress, setProgProgress] = useState(10);
  const [progDesc, setProgDesc] = useState('');
  const [progBudget, setProgBudget] = useState(25000000);
  const [progSpent, setProgSpent] = useState(0);
  const [progSuccessMsg, setProgSuccessMsg] = useState(false);

  // ----------------------------------------------------
  // NEWS CRUD STATES
  // ----------------------------------------------------
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTag, setNewsTag] = useState<News['tag']>('KEBIJAKAN');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsSuccessMsg, setNewsSuccessMsg] = useState(false);

  // ----------------------------------------------------
  // DOCUMENT CRUD STATES
  // ----------------------------------------------------
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [docName, setDocName] = useState('');
  const [docPeriod, setDocPeriod] = useState('');
  const [docCategory, setDocCategory] = useState<Document['category']>('LPJ');
  const [docStatus, setDocStatus] = useState<Document['status']>('Publik');
  const [docSize, setDocSize] = useState('1.5 MB');
  const [docSuccessMsg, setDocSuccessMsg] = useState(false);

  // ----------------------------------------------------
  // CABINET MEMBERS & MINISTRIES CRUD STATES
  // ----------------------------------------------------
  const [editingMember, setEditingMember] = useState<CabinetMember | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberDept, setMemberDept] = useState('Inti');
  const [memberPhoto, setMemberPhoto] = useState('');
  const [memberMajor, setMemberMajor] = useState('Teknik Informatika');
  const [memberYear, setMemberYear] = useState('2023');

  const [editingMin, setEditingMin] = useState<Ministry | null>(null);
  const [minName, setMinName] = useState('');
  const [minDesc, setMinDesc] = useState('');
  const [minLeader, setMinLeader] = useState('');
  const [minSekjen, setMinSekjen] = useState('');
  const [minStaff, setMinStaff] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  // Totals for Dashboard stats
  const totalAspirations = aspirations.length;
  const solvedAspirations = aspirations.filter(a => a.status === 'Selesai').length;
  const pendingAspirations = aspirations.filter(a => a.status === 'Menunggu' || a.status === 'Proses').length;
  const totalBudget = programs.reduce((sum, p) => sum + p.budgetTotal, 0);

  // ----------------------------------------------------
  // HANDLERS: ASPIRASI
  // ----------------------------------------------------
  const handleSelectAsp = (asp: Aspiration) => {
    setIsAddingAspOffline(false);
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

  const handleCreateOfflineAspirasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offDesc.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `T-2026-${randomNum}`;
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const offlineAsp: Aspiration = {
      id,
      name: offIsAnon ? 'Anonim' : (offName || 'Mahasiswa Offline'),
      studyProgram: offIsAnon ? '' : offMajor,
      email: offEmail || 'offline@student.fik.ac.id',
      category: offCat,
      description: offDesc,
      isAnonymous: offIsAnon,
      status: 'Diterima',
      dateSubmitted: timestamp,
      adminReply: 'Dicatat secara offline oleh tim kementerian advokasi.'
    };

    onUpdateAspiration(offlineAsp); // This registers or updates the aspiration list
    
    // Clear form
    setOffName('');
    setOffDesc('');
    setOffEmail('');
    setIsAddingAspOffline(false);
  };

  const handleDeleteAspAction = (id: string) => {
    onDeleteAspiration(id);
    if (activeAsp?.id === id) {
      setActiveAsp(null);
    }
    setDeleteConfirmId(null);
  };

  // ----------------------------------------------------
  // HANDLERS: PROGRAM KERJA
  // ----------------------------------------------------
  const handleSelectEditProgram = (prog: Program) => {
    setEditingProgram(prog);
    setProgName(prog.name);
    setProgDept(prog.department);
    setProgStatus(prog.status);
    setProgProgress(prog.progress);
    setProgDesc(prog.description);
    setProgBudget(prog.budgetTotal);
    setProgSpent(prog.budgetSpent);
  };

  const handleCancelProgramForm = () => {
    setEditingProgram(null);
    setProgName('');
    setProgDesc('');
    setProgBudget(25000000);
    setProgSpent(0);
    setProgProgress(10);
    setProgStatus('PERENCANAAN');
  };

  const handleSaveProgramForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progName.trim()) return;

    if (editingProgram) {
      // Edit / Update mode
      onUpdateProgram({
        ...editingProgram,
        name: progName,
        department: progDept,
        status: progStatus,
        progress: Number(progProgress),
        description: progDesc,
        budgetTotal: Number(progBudget),
        budgetSpent: Number(progSpent)
      });
      setEditingProgram(null);
    } else {
      // Add / Create mode
      onAddProgram({
        name: progName,
        department: progDept,
        status: progStatus,
        progress: Number(progProgress),
        description: progDesc,
        budgetTotal: Number(progBudget),
        budgetSpent: Number(progSpent)
      });
    }

    setProgName('');
    setProgDesc('');
    setProgBudget(25000000);
    setProgSpent(0);
    setProgProgress(10);
    setProgSuccessMsg(true);
    setTimeout(() => setProgSuccessMsg(false), 3000);
  };

  const handleDeleteProgAction = (id: string) => {
    onDeleteProgram(id);
    if (editingProgram?.id === id) {
      handleCancelProgramForm();
    }
    setDeleteConfirmId(null);
  };

  // ----------------------------------------------------
  // HANDLERS: NEWS
  // ----------------------------------------------------
  const handleSelectEditNews = (news: News) => {
    setEditingNews(news);
    setNewsTitle(news.title);
    setNewsTag(news.tag);
    setNewsSummary(news.summary);
    setNewsContent(news.content);
    setNewsImage(news.image);
  };

  const handleCancelNewsForm = () => {
    setEditingNews(null);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImage('');
  };

  const handleSaveNewsForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    if (editingNews) {
      // Update
      onUpdateNews({
        ...editingNews,
        title: newsTitle,
        tag: newsTag,
        summary: newsSummary || newsContent.slice(0, 100) + '...',
        content: newsContent,
        image: newsImage.trim() || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800'
      });
      setEditingNews(null);
    } else {
      // Create
      onAddNews({
        title: newsTitle,
        tag: newsTag,
        summary: newsSummary || newsContent.slice(0, 100) + '...',
        content: newsContent,
        image: newsImage.trim() || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }

    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImage('');
    setNewsSuccessMsg(true);
    setTimeout(() => setNewsSuccessMsg(false), 3000);
  };

  const handleDeleteNewsAction = (id: string) => {
    onDeleteNews(id);
    if (editingNews?.id === id) {
      handleCancelNewsForm();
    }
    setDeleteConfirmId(null);
  };

  // ----------------------------------------------------
  // HANDLERS: DOCUMENTS
  // ----------------------------------------------------
  const handleSelectEditDoc = (doc: Document) => {
    setEditingDoc(doc);
    setDocName(doc.name);
    setDocPeriod(doc.period);
    setDocCategory(doc.category);
    setDocStatus(doc.status);
    setDocSize(doc.fileSize);
  };

  const handleCancelDocForm = () => {
    setEditingDoc(null);
    setDocName('');
    setDocPeriod('');
    setDocSize('1.5 MB');
  };

  const handleSaveDocForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docPeriod.trim()) return;

    if (editingDoc) {
      onUpdateDocument({
        ...editingDoc,
        name: docName,
        period: docPeriod,
        category: docCategory,
        status: docStatus,
        fileSize: docSize
      });
      setEditingDoc(null);
    } else {
      onAddDocument({
        name: docName,
        period: docPeriod,
        category: docCategory,
        status: docStatus,
        fileSize: docSize
      });
    }

    setDocName('');
    setDocPeriod('');
    setDocSize('1.5 MB');
    setDocSuccessMsg(true);
    setTimeout(() => setDocSuccessMsg(false), 3000);
  };

  const handleDeleteDocAction = (id: string) => {
    onDeleteDocument(id);
    if (editingDoc?.id === id) {
      handleCancelDocForm();
    }
    setDeleteConfirmId(null);
  };

  // ----------------------------------------------------
  // HANDLERS: CABINET PROFILE
  // ----------------------------------------------------
  const handleSelectEditMember = (mb: CabinetMember) => {
    setEditingMember(mb);
    setMemberName(mb.name);
    setMemberRole(mb.role);
    setMemberDept(mb.department);
    setMemberPhoto(mb.photo);
    setMemberMajor(mb.major);
    setMemberYear(mb.year);
    // cancel any ministry edit to avoid confusion
    handleCancelMinForm();
  };

  const handleCancelMemberForm = () => {
    setEditingMember(null);
    setMemberName('');
    setMemberRole('');
    setMemberDept('Inti');
    setMemberPhoto('');
    setMemberMajor('Teknik Informatika');
    setMemberYear('2023');
  };

  const handleSaveMemberForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberRole.trim()) return;

    const memberData = {
      name: memberName,
      role: memberRole,
      department: memberDept,
      photo: memberPhoto.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
      major: memberMajor,
      year: memberYear
    };

    if (editingMember) {
      onUpdateCabinetMember({ ...editingMember, ...memberData });
    } else {
      onAddCabinetMember(memberData);
    }

    handleCancelMemberForm();
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  const handleDeleteMemberAction = (id: string) => {
    onDeleteCabinetMember(id);
    if (editingMember?.id === id) {
      handleCancelMemberForm();
    }
    setDeleteConfirmId(null);
  };

  const handleSelectEditMin = (min: Ministry) => {
    setEditingMin(min);
    setMinName(min.name);
    setMinDesc(min.description);
    setMinLeader(min.leader);
    setMinSekjen(min.sekjen);
    setMinStaff(min.staff ? min.staff.join(', ') : '');
    // cancel any member edit to avoid confusion
    handleCancelMemberForm();
  };

  const handleCancelMinForm = () => {
    setEditingMin(null);
    setMinName('');
    setMinDesc('');
    setMinLeader('');
    setMinSekjen('');
    setMinStaff('');
  };

  const handleSaveMinForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!minName.trim() || !minDesc.trim()) return;

    const staffArray = minStaff
      ? minStaff.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const minData = {
      name: minName,
      description: minDesc,
      leader: minLeader,
      sekjen: minSekjen,
      staff: staffArray
    };

    if (editingMin) {
      onUpdateMinistry({ ...editingMin, ...minData });
    } else {
      onAddMinistry(minData);
    }

    handleCancelMinForm();
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  const handleDeleteMinAction = (id: string) => {
    onDeleteMinistry(id);
    if (editingMin?.id === id) {
      handleCancelMinForm();
    }
    setDeleteConfirmId(null);
  };

  // ----------------------------------------------------
  // DATA FILTERING CALCULATIONS
  // ----------------------------------------------------
  const filteredAspirations = aspirations.filter(asp => {
    const matchesSearch = 
      (asp.isAnonymous ? 'anonim' : asp.name).toLowerCase().includes(aspSearch.toLowerCase()) ||
      asp.description.toLowerCase().includes(aspSearch.toLowerCase()) ||
      asp.category.toLowerCase().includes(aspSearch.toLowerCase()) ||
      asp.id.toLowerCase().includes(aspSearch.toLowerCase());
    
    const matchesFilter = aspFilter === 'ALL' || asp.status === aspFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = 
      prog.name.toLowerCase().includes(progSearch.toLowerCase()) ||
      prog.department.toLowerCase().includes(progSearch.toLowerCase()) ||
      prog.description.toLowerCase().includes(progSearch.toLowerCase());
    
    const matchesFilter = progFilter === 'ALL' || prog.status === progFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredNews = newsList.filter(news => {
    const matchesSearch = 
      news.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      news.summary.toLowerCase().includes(newsSearch.toLowerCase()) ||
      news.content.toLowerCase().includes(newsSearch.toLowerCase());
    
    const matchesFilter = newsFilter === 'ALL' || news.tag === newsFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(docSearch.toLowerCase()) ||
      doc.category.toLowerCase().includes(docSearch.toLowerCase()) ||
      doc.period.toLowerCase().includes(docSearch.toLowerCase());
    
    const matchesFilter = docFilter === 'ALL' || doc.category === docFilter;
    return matchesSearch && matchesFilter;
  });


  return (
    <div className="space-y-10" id="admin-view-container">
      
      {/* 1. Header Control Panel */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md" id="admin-header-panel">
        <div className="text-left space-y-1.5 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 bg-emerald-500/25 px-2.5 py-1 rounded text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <span>🛡️ MODE ADMINISTRATOR BEM</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-1 rounded">
              Role: Tim {adminRole === 'TEKNIS' ? 'Advokasi & Teknis' : 'Kominfo & Konten'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Control Center Kabinet
          </h1>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Pusat manajemen terpadu (CRUD) untuk mengatur aspirasi pengaduan, mendaftarkan agenda program kerja, mengunggah dokumen transparansi, dan merilis kabar berita terbaru.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          {/* Role selection */}
          <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex space-x-1 w-full sm:w-auto">
            <button
              id="role-teknis-toggle"
              onClick={() => {
                setAdminRole('TEKNIS');
                setActiveSubTab('aspirasi');
                setActiveAsp(null);
                setEditingProgram(null);
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                adminRole === 'TEKNIS'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Tim Teknis</span>
            </button>
            <button
              id="role-konten-toggle"
              onClick={() => {
                setAdminRole('KONTEN');
                setActiveSubTab('berita');
                setEditingNews(null);
                setEditingDoc(null);
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                adminRole === 'KONTEN'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Tim Konten</span>
            </button>
          </div>

          {/* Secure Logout Action */}
          <button
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center space-x-1 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-red-500/25"
            id="btn-admin-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </section>

      {/* 2. Admin KPIs statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="admin-stats-grid">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black font-mono text-gray-900 leading-none">{totalAspirations}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 block">Aduan Masuk</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black font-mono text-gray-900 leading-none">{pendingAspirations}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 block">Butuh Tindakan</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black font-mono text-gray-900 leading-none">{solvedAspirations}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 block">Tuntas Diselesaikan</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center space-x-4 text-left">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black font-mono text-gray-900 leading-none">{programs.length}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 block">Program Kerja Aktif</span>
          </div>
        </div>
      </section>

      {/* 3. Sub-Tab Workspace Switcher based on Admin Role */}
      <div className="border-b border-gray-200 pb-0.5 flex space-x-6 text-left" id="admin-workspace-tabs">
        {adminRole === 'TEKNIS' ? (
          <>
            <button
              onClick={() => { setActiveSubTab('aspirasi'); setActiveAsp(null); }}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'aspirasi'
                  ? 'border-emerald-600 text-emerald-600 font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              📬 Advokasi & Aspirasi Mahasiswa ({aspirations.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('proker'); handleCancelProgramForm(); }}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'proker'
                  ? 'border-emerald-600 text-emerald-600 font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              💼 Agenda Program Kerja ({programs.length})
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setActiveSubTab('berita'); handleCancelNewsForm(); }}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'berita'
                  ? 'border-emerald-600 text-emerald-600 font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              📢 Rilis Berita & Kabar ({newsList.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('dokumen'); handleCancelDocForm(); }}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'dokumen'
                  ? 'border-emerald-600 text-emerald-600 font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              📄 Berkas Transparansi & Unduhan ({documents.length})
            </button>
            <button
              id="admin-tab-profil"
              onClick={() => { setActiveSubTab('profil'); handleCancelMemberForm(); handleCancelMinForm(); }}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'profil'
                  ? 'border-emerald-600 text-emerald-600 font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              👥 Profil Kabinet & Struktur ({cabinetMembers.length + ministries.length})
            </button>
          </>
        )}
      </div>

      {/* 4. Main Sub-Tab Workspaces */}
      <div id="admin-subtab-viewport">
        <AnimatePresence mode="wait">
          
          {/* ==================================================== */}
          {/* TAB: ASPIRASI WORKSPACE */}
          {/* ==================================================== */}
          {activeSubTab === 'aspirasi' && adminRole === 'TEKNIS' && (
            <motion.div
              key="subtab-aspirasi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Side: Aspiration Table */}
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-gray-900">
                      Aduan Resmi Mahasiswa
                    </h3>
                    <p className="text-xs text-gray-500">Gunakan kolom filter status untuk melacak aduan yang belum tertangani.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveAsp(null);
                      setIsAddingAspOffline(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 cursor-pointer transition-all shrink-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Catat Aduan Manual</span>
                  </button>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="relative sm:col-span-7">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari ID, pengadu, atau deskripsi..."
                      value={aspSearch}
                      onChange={(e) => setAspSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-5 flex items-center space-x-2">
                    <ListFilter className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={aspFilter}
                      onChange={(e) => setAspFilter(e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="Menunggu">Menunggu Verifikasi</option>
                      <option value="Diterima">Diterima / Valid</option>
                      <option value="Proses">Dalam Proses</option>
                      <option value="Selesai">Tuntas / Selesai</option>
                    </select>
                  </div>
                </div>

                {/* Table list */}
                <div className="overflow-x-auto">
                  {filteredAspirations.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      Tidak ada aspirasi mahasiswa yang cocok dengan kriteria pencarian.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase">
                          <th className="py-3 px-2">ID Tiket</th>
                          <th className="py-3 px-2">Mahasiswa</th>
                          <th className="py-3 px-2">Kategori</th>
                          <th className="py-3 px-2">Status</th>
                          <th className="py-3 px-2 text-right">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {filteredAspirations.map((asp) => {
                          const pillColors = {
                            'Menunggu': 'bg-red-50 text-red-600 border-red-100',
                            'Diterima': 'bg-blue-50 text-blue-600 border-blue-100',
                            'Proses': 'bg-teal-50 text-teal-600 border-teal-100',
                            'Selesai': 'bg-green-50 text-green-600 border-green-100'
                          }[asp.status];

                          const isConfirming = deleteConfirmId === asp.id;

                          return (
                            <tr key={asp.id} className={`hover:bg-slate-50/50 transition-colors ${activeAsp?.id === asp.id ? 'bg-emerald-50/20' : ''}`}>
                              <td className="py-3 px-2 font-mono font-bold text-gray-900">{asp.id}</td>
                              <td className="py-3 px-2">
                                <span className="block font-bold text-gray-900">
                                  {asp.isAnonymous ? 'Anonim' : asp.name}
                                </span>
                                {!asp.isAnonymous && (
                                  <span className="block text-[10px] text-gray-400">{asp.studyProgram}</span>
                                )}
                              </td>
                              <td className="py-3 px-2 text-gray-500 font-semibold">{asp.category}</td>
                              <td className="py-3 px-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${pillColors}`}>
                                  {asp.status}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="inline-flex items-center space-x-1.5">
                                  <button
                                    onClick={() => handleSelectAsp(asp)}
                                    className="p-1.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg cursor-pointer transition-colors"
                                    title="Tindak Lanjuti / Edit"
                                    id={`edit-asp-${asp.id}`}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {/* Delete confirmation inline trigger */}
                                  {isConfirming ? (
                                    <div className="flex items-center space-x-1 bg-red-50 border border-red-100 p-1 rounded-lg">
                                      <button
                                        onClick={() => handleDeleteAspAction(asp.id)}
                                        className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 transition-colors"
                                      >
                                        Yakin?
                                      </button>
                                      <button
                                        onClick={() => setDeleteConfirmId(null)}
                                        className="p-0.5 text-gray-400 hover:text-gray-900"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setDeleteConfirmId(asp.id)}
                                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                                      title="Hapus Aduan"
                                      id={`del-asp-${asp.id}`}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Right Side: Dynamic Form Area */}
              <div className="lg:col-span-1">
                {activeAsp ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border-2 border-emerald-500 rounded-3xl p-6 text-left space-y-6 shadow-md"
                    id="active-asp-admin-card"
                  >
                    <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                      <h3 className="font-display font-extrabold text-gray-900 text-sm sm:text-base">
                        Disposisi Resmi Tiket #{activeAsp.id}
                      </h3>
                      <button
                        onClick={() => setActiveAsp(null)}
                        className="text-gray-400 hover:text-gray-900 text-xs font-bold cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
                      >
                        Batal
                      </button>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                      <p className="font-bold text-slate-500">
                        Pengadu: <span className="text-slate-900 font-extrabold">{activeAsp.isAnonymous ? 'Anonim (Sandi Terjaga)' : `${activeAsp.name} (${activeAsp.studyProgram})`}</span>
                      </p>
                      <p className="text-gray-700 leading-relaxed italic bg-white p-2.5 rounded-lg border border-gray-100 font-medium">
                        "{activeAsp.description}"
                      </p>
                    </div>

                    <form onSubmit={handleSaveAspReply} className="space-y-4">
                      {/* Status Dropdown */}
                      <div className="space-y-1">
                        <label htmlFor="admin-status-dropdown" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Perbarui Progres Advokasi</label>
                        <select
                          id="admin-status-dropdown"
                          value={statusVal}
                          onChange={(e: any) => setStatusVal(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        >
                          <option value="Menunggu">Menunggu Verifikasi</option>
                          <option value="Diterima">Diterima / Valid</option>
                          <option value="Proses">Dalam Proses Penanganan</option>
                          <option value="Selesai">Tuntas / Selesai</option>
                        </select>
                      </div>

                      {/* Reply Textarea */}
                      <div className="space-y-1">
                        <label htmlFor="admin-reply-textarea" className="text-[10px] font-mono font-bold text-gray-500 uppercase">Tanggapan Resmi Kementerian</label>
                        <textarea
                          id="admin-reply-textarea"
                          rows={4}
                          required
                          placeholder="Ketik disposisi resmi atau solusi konkret yang telah dikoordinasikan dengan rektorat..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
                        id="btn-save-reply"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan & Beri Tanggapan</span>
                      </button>
                    </form>
                  </motion.div>
                ) : isAddingAspOffline ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border-2 border-slate-900 rounded-3xl p-6 text-left space-y-5 shadow-md"
                  >
                    <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                      <h3 className="font-display font-extrabold text-gray-900 text-sm">
                        Catat Aspirasi Manual (Offline)
                      </h3>
                      <button
                        onClick={() => setIsAddingAspOffline(false)}
                        className="text-gray-400 hover:text-gray-900 text-xs font-bold"
                      >
                        Batal
                      </button>
                    </div>

                    <form onSubmit={handleCreateOfflineAspirasi} className="space-y-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Pelapor</label>
                        <input
                          type="text"
                          disabled={offIsAnon}
                          placeholder={offIsAnon ? 'Menggunakan Anonim' : 'Nama Mahasiswa'}
                          value={offName}
                          onChange={(e) => setOffName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {/* Study Program & Email */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Program Studi</label>
                          <select
                            disabled={offIsAnon}
                            value={offMajor}
                            onChange={(e) => setOffMajor(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                          >
                            <option value="Teknik Informatika">Informatika</option>
                            <option value="Sistem Informasi">Sistem Informasi</option>
                            <option value="Sains Data">Sains Data</option>
                            <option value="Manajemen">Manajemen</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Kategori</label>
                          <select
                            value={offCat}
                            onChange={(e: any) => setOffCat(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                          >
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Akademis">Akademis</option>
                            <option value="Finansial">Finansial</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Rangkuman Keluhan</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Masukkan rincian aduan yang disampaikan secara lisan atau tatap muka..."
                          value={offDesc}
                          onChange={(e) => setOffDesc(e.target.value)}
                          className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {/* Anon toggle */}
                      <label className="flex items-center space-x-2 text-xs font-semibold text-gray-600 select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={offIsAnon}
                          onChange={(e) => setOffIsAnon(e.target.checked)}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>Sembunyikan identitas mahasiswa (Anonim)</span>
                      </label>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Catat dalam Buku Advokasi</span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400 text-xs h-full flex flex-col justify-center items-center space-y-3">
                    <UserCheck className="w-8 h-8 text-gray-300 animate-pulse" />
                    <p className="font-semibold text-gray-500 max-w-[200px] mx-auto">
                      Pilih salah satu aduan di sebelah kiri atau klik tombol manual untuk mencatat aduan tatap muka.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* TAB: PROGRAM KERJA CRUD */}
          {/* ==================================================== */}
          {activeSubTab === 'proker' && adminRole === 'TEKNIS' && (
            <motion.div
              key="subtab-proker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Side: Program Kerja List */}
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-gray-900">
                      Evaluasi Agenda & Program Kerja
                    </h3>
                    <p className="text-xs text-gray-500">Perbarui progres pencapaian persenan atau alokasi sisa serealitas anggaran.</p>
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="relative sm:col-span-7">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari program atau kementerian..."
                      value={progSearch}
                      onChange={(e) => setProgSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-5 flex items-center space-x-2">
                    <ListFilter className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={progFilter}
                      onChange={(e) => setProgFilter(e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="PERENCANAAN">PERENCANAAN</option>
                      <option value="BERJALAN">BERJALAN</option>
                      <option value="SELESAI">SELESAI</option>
                    </select>
                  </div>
                </div>

                {/* Table List */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase">
                        <th className="py-3 px-2">Nama Program</th>
                        <th className="py-3 px-2">Kementerian</th>
                        <th className="py-3 px-2">Progres</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredPrograms.map((prog) => {
                        const statusColors = {
                          'PERENCANAAN': 'bg-amber-50 text-amber-700 border-amber-100',
                          'BERJALAN': 'bg-blue-50 text-blue-700 border-blue-100',
                          'SELESAI': 'bg-green-50 text-green-700 border-green-100'
                        }[prog.status];

                        const isConfirming = deleteConfirmId === prog.id;

                        return (
                          <tr key={prog.id} className={`hover:bg-slate-50/50 transition-colors ${editingProgram?.id === prog.id ? 'bg-emerald-50/20' : ''}`}>
                            <td className="py-3 px-2">
                              <span className="block font-bold text-gray-900 leading-tight">{prog.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Anggaran: Rp {(prog.budgetTotal).toLocaleString('id-ID')}</span>
                            </td>
                            <td className="py-3 px-2 text-gray-600 font-semibold">{prog.department}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${prog.progress}%` }} />
                                </div>
                                <span className="font-bold text-gray-800 font-mono">{prog.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColors}`}>
                                {prog.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <div className="inline-flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleSelectEditProgram(prog)}
                                  className="p-1.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg cursor-pointer transition-colors"
                                  title="Edit Program Kerja"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                {isConfirming ? (
                                  <div className="flex items-center space-x-1 bg-red-50 border border-red-100 p-1 rounded-lg">
                                    <button
                                      onClick={() => handleDeleteProgAction(prog.id)}
                                      className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                                    >
                                      Yakin?
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirmId(null)}
                                      className="p-0.5 text-gray-400 hover:text-gray-900"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirmId(prog.id)}
                                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                                    title="Hapus Program Kerja"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side: Program Form (Add/Edit) */}
              <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-gray-900 text-sm">
                    {editingProgram ? '📝 Edit Program Kerja' : '💼 Daftarkan Program Baru'}
                  </h3>
                  {editingProgram && (
                    <button
                      onClick={handleCancelProgramForm}
                      className="text-xs font-bold text-gray-400 hover:text-gray-900 bg-slate-100 px-2 py-1 rounded"
                    >
                      Batal
                    </button>
                  )}
                </div>

                {progSuccessMsg && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Perubahan program kerja berhasil disimpan!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProgramForm} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Program Kerja</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Diskusi Terbuka Isu Lingkungan"
                      value={progName}
                      onChange={(e) => setProgName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Kementerian Penanggungjawab</label>
                    <select
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

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Status</label>
                      <select
                        value={progStatus}
                        onChange={(e: any) => setProgStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 focus:outline-none"
                      >
                        <option value="PERENCANAAN">PERENCANAAN</option>
                        <option value="BERJALAN">BERJALAN</option>
                        <option value="SELESAI">SELESAI</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Progres (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={progProgress}
                        onChange={(e) => setProgProgress(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Alokasi Anggaran (Rp)</label>
                      <input
                        type="number"
                        required
                        value={progBudget}
                        onChange={(e) => setProgBudget(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Realisasi Serapan (Rp)</label>
                      <input
                        type="number"
                        required
                        value={progSpent}
                        onChange={(e) => setProgSpent(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Terangkan tujuan rincian dari pelaksanaan kegiatan..."
                      value={progDesc}
                      onChange={(e) => setProgDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-all"
                  >
                    {editingProgram ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{editingProgram ? 'Simpan Perubahan' : 'Daftarkan Program Kerja'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* TAB: NEWS / BERITA CRUD */}
          {/* ==================================================== */}
          {activeSubTab === 'berita' && adminRole === 'KONTEN' && (
            <motion.div
              key="subtab-berita"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
            >
              {/* Left Side: Table of News */}
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-display font-extrabold text-lg text-gray-900">
                    Daftar Kabar Kabinet Terbit
                  </h3>
                  <p className="text-xs text-gray-500">Koreksi tulisan rilis berita atau hapus berita hoaks kemahasiswaan.</p>
                </div>

                {/* Search & Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="relative sm:col-span-7">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari judul atau isi berita..."
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-5 flex items-center space-x-2">
                    <ListFilter className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={newsFilter}
                      onChange={(e) => setNewsFilter(e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="ALL">Semua Kategori</option>
                      <option value="KEBIJAKAN">KEBIJAKAN</option>
                      <option value="SOSIAL">SOSIAL</option>
                      <option value="AKADEMIK">AKADEMIK</option>
                      <option value="INFORMASI">INFORMASI</option>
                    </select>
                  </div>
                </div>

                {/* News Row Lists */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredNews.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      Tidak ada berita yang cocok dengan filter pencarian.
                    </div>
                  ) : (
                    filteredNews.map((news) => {
                      const isConfirming = deleteConfirmId === news.id;

                      return (
                        <div 
                          key={news.id} 
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            editingNews?.id === news.id ? 'bg-emerald-50/35 border-emerald-200' : 'bg-slate-50 border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3 text-left overflow-hidden">
                            <img 
                              src={news.image} 
                              alt="thumbnail" 
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="overflow-hidden">
                              <div className="flex items-center space-x-2 text-[9px] font-mono font-extrabold text-gray-400">
                                <span className="bg-slate-200 px-1.5 py-0.5 rounded text-gray-700">{news.tag}</span>
                                <span>•</span>
                                <span>{news.date}</span>
                                <span>•</span>
                                <span>👁️ {news.views}</span>
                              </div>
                              <h4 className="font-display font-bold text-xs text-gray-900 mt-1 truncate">
                                {news.title}
                              </h4>
                              <p className="text-[10px] text-gray-500 line-clamp-1">
                                {news.summary}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => handleSelectEditNews(news)}
                              className="p-1.5 bg-white text-slate-700 hover:text-emerald-600 rounded-lg border border-gray-200 hover:border-emerald-200 shadow-3xs cursor-pointer transition-colors"
                              title="Edit Rilis Berita"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {isConfirming ? (
                              <div className="flex items-center space-x-1 bg-red-50 border border-red-100 p-1 rounded-lg">
                                <button
                                  onClick={() => handleDeleteNewsAction(news.id)}
                                  className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                                >
                                  Ya?
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="p-0.5 text-gray-400 hover:text-gray-900"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(news.id)}
                                className="p-1.5 bg-white text-slate-400 hover:text-red-600 rounded-lg border border-gray-200 hover:border-red-200 shadow-3xs cursor-pointer transition-colors"
                                title="Hapus Berita"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Side: News Form */}
              <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-gray-900 text-sm">
                    {editingNews ? '📝 Edit Kabar Kabinet' : '📢 Terbitkan Kabar Baru'}
                  </h3>
                  {editingNews && (
                    <button
                      onClick={handleCancelNewsForm}
                      className="text-xs font-bold text-gray-400 hover:text-gray-900 bg-slate-100 px-2 py-1 rounded"
                    >
                      Batal
                    </button>
                  )}
                </div>

                {newsSuccessMsg && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Rilis berita berhasil diperbarui & diterbitkan!</span>
                  </div>
                )}

                <form onSubmit={handleSaveNewsForm} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Judul Kabar Utama</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Alokasi Subsidi UKT 2026"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Tag Kategori</label>
                      <select
                        value={newsTag}
                        onChange={(e: any) => setNewsTag(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                      >
                        <option value="KEBIJAKAN">KEBIJAKAN</option>
                        <option value="SOSIAL">SOSIAL</option>
                        <option value="AKADEMIK">AKADEMIK</option>
                        <option value="INFORMASI">INFORMASI</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">URL Gambar Cover</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newsImage}
                      onChange={(e) => setNewsImage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Ringkasan Berita Singkat</label>
                    <input
                      type="text"
                      required
                      placeholder="Rangkuman 1 kalimat agar memancing minat baca..."
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Isi Berita Lengkap</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tuliskan berita lengkap di sini..."
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <FilePlus className="w-4 h-4" />
                    <span>{editingNews ? 'Simpan Berita' : 'Terbitkan Berita'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* TAB: DOCUMENTS CRUD */}
          {/* ==================================================== */}
          {activeSubTab === 'dokumen' && adminRole === 'KONTEN' && (
            <motion.div
              key="subtab-dokumen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
            >
              {/* Left Side: Table of Documents */}
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-gray-900">
                      Pusat Dokumen & Transparansi Anggaran
                    </h3>
                    <p className="text-xs text-gray-500">Kelola unduhan panduan herregistrasi, beasiswa, dan laporan pertanggungjawaban (LPJ).</p>
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="relative sm:col-span-7">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari berkas panduan, LPJ, AD/ART..."
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-5 flex items-center space-x-2">
                    <ListFilter className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={docFilter}
                      onChange={(e) => setDocFilter(e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl text-xs bg-slate-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="ALL">Semua Kategori</option>
                      <option value="LPJ">LPJ (Laporan)</option>
                      <option value="Anggaran">Anggaran</option>
                      <option value="Kebijakan">Kebijakan</option>
                      <option value="Beasiswa">Beasiswa</option>
                      <option value="Surat Rekomendasi">Surat Rekomendasi</option>
                      <option value="Panduan Mahasiswa">Panduan Mahasiswa</option>
                      <option value="AD/ART">AD/ART</option>
                    </select>
                  </div>
                </div>

                {/* Table list */}
                <div className="overflow-x-auto">
                  {filteredDocs.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      Tidak ada dokumen transparansi yang ditemukan.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase">
                          <th className="py-3 px-2">Nama Berkas</th>
                          <th className="py-3 px-2">Kategori</th>
                          <th className="py-3 px-2">Periode</th>
                          <th className="py-3 px-2">Unduhan</th>
                          <th className="py-3 px-2 text-right">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {filteredDocs.map((doc) => {
                          const statusColors = {
                            'Terverifikasi': 'bg-green-50 text-green-700 border-green-100',
                            'Publik': 'bg-blue-50 text-blue-700 border-blue-100',
                            'Direvisi': 'bg-red-50 text-red-700 border-red-100'
                          }[doc.status];

                          const isConfirming = deleteConfirmId === doc.id;

                          return (
                            <tr key={doc.id} className={`hover:bg-slate-50/50 transition-colors ${editingDoc?.id === doc.id ? 'bg-emerald-50/20' : ''}`}>
                              <td className="py-3 px-2 font-bold text-gray-900">
                                <div className="flex items-center space-x-2">
                                  <FolderOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span className="leading-tight">{doc.name}</span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono block ml-6 mt-0.5">Ukuran: {doc.fileSize}</span>
                              </td>
                              <td className="py-3 px-2">
                                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold text-[9px] uppercase">
                                  {doc.category}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-gray-500 font-semibold">{doc.period}</td>
                              <td className="py-3 px-2 font-mono font-bold text-slate-700">📥 {doc.downloadsCount}</td>
                              <td className="py-3 px-2 text-right">
                                <div className="inline-flex items-center space-x-1.5">
                                  <button
                                    onClick={() => handleSelectEditDoc(doc)}
                                    className="p-1.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg cursor-pointer transition-colors"
                                    title="Edit Detail Dokumen"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {isConfirming ? (
                                    <div className="flex items-center space-x-1 bg-red-50 border border-red-100 p-1 rounded-lg">
                                      <button
                                        onClick={() => handleDeleteDocAction(doc.id)}
                                        className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                                      >
                                        Yakin?
                                      </button>
                                      <button
                                        onClick={() => setDeleteConfirmId(null)}
                                        className="p-0.5 text-gray-400 hover:text-gray-900"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setDeleteConfirmId(doc.id)}
                                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                                      title="Hapus Dokumen"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Right Side: Document Form (Add / Edit) */}
              <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-gray-900 text-sm">
                    {editingDoc ? '📝 Edit Berkas Dokumen' : '📄 Unggah Berkas Transparansi'}
                  </h3>
                  {editingDoc && (
                    <button
                      onClick={handleCancelDocForm}
                      className="text-xs font-bold text-gray-400 hover:text-gray-900 bg-slate-100 px-2 py-1 rounded"
                    >
                      Batal
                    </button>
                  )}
                </div>

                {docSuccessMsg && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Informasi berkas dokumen berhasil diperbarui!</span>
                  </div>
                )}

                <form onSubmit={handleSaveDocForm} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Berkas / Panduan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Buku Saku Kemahasiswaan 2026"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Periode Penerbitan / Rilis</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Oktober 2026"
                      value={docPeriod}
                      onChange={(e) => setDocPeriod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Kategori Berkas</label>
                      <select
                        value={docCategory}
                        onChange={(e: any) => setDocCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                      >
                        <option value="LPJ">LPJ</option>
                        <option value="Anggaran">Anggaran</option>
                        <option value="Kebijakan">Kebijakan</option>
                        <option value="Beasiswa">Beasiswa</option>
                        <option value="Surat Rekomendasi">Surat Rekomendasi</option>
                        <option value="Panduan Mahasiswa">Panduan Mahasiswa</option>
                        <option value="AD/ART">AD/ART</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Akses / Status</label>
                      <select
                        value={docStatus}
                        onChange={(e: any) => setDocStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                      >
                        <option value="Publik">Publik</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Direvisi">Direvisi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Ukuran Berkas Estimasi</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 2.5 MB atau 850 KB"
                      value={docSize}
                      onChange={(e) => setDocSize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>{editingDoc ? 'Simpan Berkas' : 'Daftarkan Unduhan'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* TAB: CABINET PROFILE CRUD */}
          {/* ==================================================== */}
          {activeSubTab === 'profil' && adminRole === 'KONTEN' && (
            <motion.div
              key="subtab-profil"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-left"
            >
              {/* Left & Middle Side: List of Members & Ministries */}
              <div className="xl:col-span-2 space-y-8">
                
                {/* 1. Pengurus Harian Inti section */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-gray-900">
                        Badan Pengurus Harian Inti
                      </h3>
                      <p className="text-xs text-gray-500">Membentuk kerangka kepemimpinan utama kabinet.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cabinetMembers.map((member) => {
                      const isConfirming = deleteConfirmId === member.id;
                      return (
                        <div key={member.id} className="flex bg-slate-50 border border-slate-100 rounded-2xl p-4 gap-4 items-center group relative hover:shadow-xs transition-all">
                          <img 
                            src={member.photo} 
                            alt={member.name} 
                            className="w-14 h-14 rounded-full object-cover border border-gray-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="block text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-wider">{member.role}</span>
                            <h4 className="font-display font-extrabold text-sm text-gray-900 truncate">{member.name}</h4>
                            <p className="text-[11px] text-gray-400 font-medium truncate">{member.major} • Angkatan {member.year}</p>
                          </div>
                          
                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => handleSelectEditMember(member)}
                              className="p-1.5 hover:bg-emerald-100 hover:text-emerald-700 text-gray-500 rounded-lg transition-colors cursor-pointer"
                              title="Edit Pengurus"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {isConfirming ? (
                              <div className="flex items-center space-x-1 bg-red-100 border border-red-200 p-1 rounded-lg">
                                <button
                                  onClick={() => handleDeleteMemberAction(member.id)}
                                  className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-bold"
                                >
                                  Ya?
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-gray-500 text-[9px] font-bold hover:text-gray-900 px-1"
                                >
                                  X
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(member.id)}
                                className="p-1.5 hover:bg-red-100 hover:text-red-600 text-gray-400 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Pengurus"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Kementerian & Biro Teknis section */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-gray-900">
                        Kementerian & Biro Teknis
                      </h3>
                      <p className="text-xs text-gray-500">Kementerian operasional pembantu pengurus inti.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {ministries.map((min) => {
                      const isConfirming = deleteConfirmId === min.id;
                      return (
                        <div key={min.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3 hover:border-emerald-100 hover:shadow-2xs transition-all text-left">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <h4 className="font-display font-extrabold text-base text-gray-900">{min.name}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{min.description}</p>
                            </div>
                            
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => handleSelectEditMin(min)}
                                className="p-1.5 hover:bg-emerald-100 hover:text-emerald-700 text-gray-500 rounded-lg transition-colors cursor-pointer"
                                title="Edit Kementerian"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {isConfirming ? (
                                <div className="flex items-center space-x-1 bg-red-100 border border-red-200 p-1 rounded-lg">
                                  <button
                                    onClick={() => handleDeleteMinAction(min.id)}
                                    className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-bold"
                                  >
                                    Ya?
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="text-gray-500 text-[9px] font-bold hover:text-gray-900 px-1"
                                  >
                                    X
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(min.id)}
                                  className="p-1.5 hover:bg-red-100 hover:text-red-600 text-gray-400 rounded-lg transition-colors cursor-pointer"
                                  title="Hapus Kementerian"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200/50 text-xs">
                            <div className="space-y-1">
                              <span className="block text-[10px] text-gray-400 uppercase font-mono tracking-wider">Pimpinan</span>
                              <p className="font-medium text-gray-700">Menteri: <span className="font-bold text-gray-900">{min.leader || '-'}</span></p>
                              <p className="font-medium text-gray-700">Sekjen: <span className="font-bold text-gray-900">{min.sekjen || '-'}</span></p>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[10px] text-gray-400 uppercase font-mono tracking-wider">Staf Ahli ({min.staff ? min.staff.length : 0})</span>
                              <p className="font-medium text-gray-600 truncate">
                                {min.staff && min.staff.length > 0 ? min.staff.join(', ') : 'Belum ada staf.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Side: Double Edit Form (Members Form AND Ministries Form) */}
              <div className="xl:col-span-1 space-y-6">
                
                {/* A. Cabinet Member Edit/Add form */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <h3 className="font-display font-extrabold text-gray-900 text-sm">
                      {editingMember ? '👤 Edit Data Pengurus Inti' : '👤 Tambah Pengurus Inti'}
                    </h3>
                    {editingMember && (
                      <button
                        onClick={handleCancelMemberForm}
                        className="text-xs font-bold text-gray-400 hover:text-gray-900 bg-slate-100 px-2 py-1 rounded"
                      >
                        Batal
                      </button>
                    )}
                  </div>

                  {profileSuccessMsg && (
                    <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg flex items-center space-x-2 border border-emerald-100">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Data profil kabinet berhasil diperbarui!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveMemberForm} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Fahri Ramadhan"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Jabatan / Peran</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Ketua BEM / Bendahara"
                        value={memberRole}
                        onChange={(e) => setMemberRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Jurusan</label>
                        <select
                          value={memberMajor}
                          onChange={(e) => setMemberMajor(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700"
                        >
                          <option value="Teknik Informatika">Informatika</option>
                          <option value="Sistem Informasi">Sistem Informasi</option>
                          <option value="Sains Data">Sains Data</option>
                          <option value="Teknik Komputer">Teknik Komputer</option>
                          <option value="Hukum">Hukum</option>
                          <option value="Manajemen">Manajemen</option>
                          <option value="Akuntansi">Akuntansi</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Angkatan</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 2023"
                          value={memberYear}
                          onChange={(e) => setMemberYear(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">URL Foto Pengurus</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={memberPhoto}
                        onChange={(e) => setMemberPhoto(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingMember ? 'Simpan Perubahan' : 'Tambah Pengurus'}</span>
                    </button>
                  </form>
                </div>

                {/* B. Ministry Edit/Add form */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-left space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <h3 className="font-display font-extrabold text-gray-900 text-sm">
                      {editingMin ? '🏛️ Edit Data Kementerian' : '🏛️ Tambah Kementerian Baru'}
                    </h3>
                    {editingMin && (
                      <button
                        onClick={handleCancelMinForm}
                        className="text-xs font-bold text-gray-400 hover:text-gray-900 bg-slate-100 px-2 py-1 rounded"
                      >
                        Batal
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveMinForm} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Nama Kementerian</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kementerian Dalam Negeri"
                        value={minName}
                        onChange={(e) => setMinName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Deskripsi / Fokus</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Rangkum fokus kementerian ini..."
                        value={minDesc}
                        onChange={(e) => setMinDesc(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Menteri</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Menteri"
                          value={minLeader}
                          onChange={(e) => setMinLeader(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Sekjen</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Sekjen"
                          value={minSekjen}
                          onChange={(e) => setMinSekjen(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">Daftar Staf Ahli (Pisahkan dengan Koma)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso, Kiki Mahendra, Alya Yasmin"
                        value={minStaff}
                        onChange={(e) => setMinStaff(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingMin ? 'Simpan Perubahan' : 'Tambah Kementerian'}</span>
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
