import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Star, Shield, ArrowRight, UserCheck } from 'lucide-react';
import { cabinetMembers, ministries } from '../data';

export const ProfilView: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<number>(0);

  const coreMembers = cabinetMembers.filter(m => m.department === 'Inti');

  return (
    <div className="space-y-16" id="profil-view-container">
      {/* 1. Header & Vision Mission Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="profil-header">
        <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Profil Kabinet & Struktur
        </h1>
        <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
          Mengenal lebih dekat para pengurus BEM Fakultas Ilmu Komputer periode berjalan yang berkomitmen mengayomi civitas akademika.
        </p>
      </section>

      {/* Vision & Mission Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8" id="visi-misi-bento">
        {/* Visi */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl md:col-span-1 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-emerald-500/10">
            <Star className="w-40 h-40" />
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Arah Gerakan</span>
          <h2 className="font-display font-bold text-2xl mt-2 mb-4">Visi BEM</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            "Mewujudkan BEM Fakultas Ilmu Komputer sebagai pilar kolaborasi yang responsif, adaptif, dan berintegritas demi terciptanya sinergi nyata bagi kesejahteraan mahasiswa dan kemajuan masyarakat."
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white border border-gray-100 p-8 rounded-2xl md:col-span-2 shadow-xs space-y-6">
          <h2 className="font-display font-bold text-2xl text-gray-900 border-b border-gray-100 pb-3">
            Misi Strategis Kabinet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Advokasi Responsif</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                   Membangun sistem pengaduan terpadu yang cepat tanggap, solutif, dan melindungi kerahasiaan pelapor.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Sinergi Ormawa</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                   Mengintegrasikan seluruh wadah unit kegiatan mahasiswa (UKM) dalam satu kalender kolaboratif.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Transparansi Keuangan</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Menyediakan repositori digital Laporan Pertanggungjawaban (LPJ) & anggaran yang mudah diakses publik.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Pengabdian Masyarakat</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Mengembangkan desa binaan dan program mengajar yang berdampak langsung pada komunitas lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Cabinet Organogram Cards */}
      <section className="space-y-8" id="organigram-pengurus-inti">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-gray-900">
            Badan Pengurus Harian Inti
          </h2>
          <p className="text-sm text-gray-500">Pimpinan utama perancang visi kemahasiswaan tahun ini.</p>
        </div>

        {/* Dynamic Display cards in responsive tree structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <img 
                  src={member.photo} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-left">
                  <span className="block text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                    {member.role}
                  </span>
                  <span className="block font-display font-bold text-base truncate">
                    {member.name}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-gray-100 text-xs text-left text-gray-500 space-y-1 font-medium">
                <p>Jurusan: <span className="text-gray-800 font-semibold">{member.major}</span></p>
                <p>Angkatan: <span className="text-gray-800 font-semibold">{member.year}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Ministries Explorer */}
      <section className="bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-10 space-y-8" id="kementerian-bawah-bph">
        <div className="text-left space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-gray-900">
            Kementerian & Biro Teknis
          </h2>
          <p className="text-sm text-gray-500">Mengeksplorasi pembagian program dan staf pelaksana bidang.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ministry list sidebar */}
          <div className="space-y-2 lg:col-span-1">
            {ministries.map((min, idx) => (
              <button
                key={idx}
                id={`btn-ministry-select-${idx}`}
                onClick={() => setSelectedMinistry(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedMinistry === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="truncate text-sm">{min.name}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ))}
          </div>

          {/* Ministry details panel */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-xs">
            <div className="space-y-2">
              <span className="inline-block bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                Fokus Kegiatan Kementerian
              </span>
              <h3 className="font-display font-extrabold text-xl text-gray-900">
                {ministries[selectedMinistry].name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {ministries[selectedMinistry].description}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Ministry Roster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-l-3 border-emerald-500 pl-2">Pimpinan</h4>
                <div className="space-y-2">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase">Menteri</span>
                    <span className="font-semibold text-gray-800">{ministries[selectedMinistry].leader}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase">Sekretaris Jenderal</span>
                    <span className="font-semibold text-gray-800">{ministries[selectedMinistry].sekjen}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-l-3 border-emerald-500 pl-2">Daftar Staf Ahli</h4>
                <ul className="space-y-1.5 text-gray-600 font-medium list-disc list-inside">
                  {ministries[selectedMinistry].staff.map((staffName, sidx) => (
                    <li key={sidx} className="hover:text-emerald-600 transition-colors">{staffName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
