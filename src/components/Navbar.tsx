import React, { useState } from 'react';
import { Cpu, Menu, X, LayoutDashboard, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, isAdmin, onToggleAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'profil', label: 'Profil Kabinet' },
    { id: 'proker', label: 'Program Kerja' },
    { id: 'aspirasi', label: 'Aspirasi & Advokasi' },
    { id: 'unduhan', label: 'Pusat Unduhan' },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs backdrop-blur-md bg-opacity-95" id="bem-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center space-x-3 cursor-pointer group"
              id="bem-brand-btn"
            >
              <div className="bg-emerald-600 text-white p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-display font-bold text-lg text-gray-900 tracking-tight leading-none">
                  BEM FAKULTAS
                </span>
                <span className="block text-[10px] font-mono text-gray-500 tracking-widest mt-0.5 uppercase">
                  ILMU KOMPUTER
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {/* Admin Toggle / Button */}
            <button
              id="btn-nav-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100" id="bem-mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="my-2 border-t border-gray-100"></div>

            <button
              id="nav-mobile-admin"
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center space-x-2 block px-3 py-2.5 rounded-md text-base font-medium transition-all ${
                currentTab === 'admin'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
