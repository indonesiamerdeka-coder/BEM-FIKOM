import React from 'react';
import { Cpu, Mail, Phone, MapPin, Globe, Instagram, Youtube, Heart } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="bem-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-display font-bold text-lg text-white tracking-tight leading-none">
                  BEM FAKULTAS
                </span>
                <span className="block text-[10px] font-mono text-blue-400 tracking-widest mt-0.5 uppercase">
                  ILMU KOMPUTER
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Wadah representasi resmi mahasiswa BEM Fakultas Ilmu Komputer. Berkomitmen mewujudkan integrasi aspirasi, inovasi program, dan pelayanan advokasi yang transparan dan akuntabel.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition-colors" title="Instagram BEM">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition-colors" title="YouTube BEM">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-md hover:bg-blue-600 hover:text-white transition-colors" title="Situs Univ">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4 border-l-2 border-blue-500 pl-3">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onTabChange('home')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Beranda Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('profil')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Struktur & Profil Kabinet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('proker')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Program Kerja & LPJ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('aspirasi')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Formulir Advokasi & Aspirasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('unduhan')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Dokumen & Pusat Unduhan
                </button>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4 border-l-2 border-blue-500 pl-3">
              Kontak Sekretariat
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Gedung Student Center, Lantai 2, Kampus BEM Fakultas Ilmu Komputer
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-slate-400">bem@fik.ac.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-slate-400">+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

          {/* Jam Pelayanan */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4 border-l-2 border-blue-500 pl-3">
              Jam Layanan Advokasi
            </h3>
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-800 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Senin - Jumat</span>
                <span className="text-blue-400 font-medium font-mono">09:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sabtu</span>
                <span className="text-blue-400 font-medium font-mono">09:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Minggu & Libur</span>
                <span className="text-red-400 font-medium">Tutup</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic">
                * Aspirasi online via website tetap dapat dikirimkan 24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BEM Fakultas Ilmu Komputer. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Dikelola oleh Tim Teknis & Kominfo BEM
            <Heart className="w-3.5 h-3.5 text-red-500 mx-1 fill-red-500" />
            untuk Civitas Akademika.
          </p>
        </div>
      </div>
    </footer>
  );
};
