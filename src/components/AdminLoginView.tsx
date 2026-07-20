import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Mail, Lock, LogIn, CheckCircle } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  triggerToast: (msg: string) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, triggerToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      // Valid credentials: email admin@student.fik.ac.id (or admin) and password admin123 (or admin)
      const isValidEmail = email.toLowerCase() === 'admin@student.fik.ac.id' || email === 'admin';
      const isValidPassword = password === 'admin123' || password === 'admin';

      if (isValidEmail && isValidPassword) {
        triggerToast('🔐 Login Berhasil! Selamat datang di Dashboard BEM.');
        onLoginSuccess();
      } else {
        setError('Email atau password salah. Silakan periksa kembali!');
        triggerToast('❌ Login Gagal. Periksa kredensial Anda.');
      }
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto my-12" id="admin-login-view">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
      >
        {/* Decorative Top Banner */}
        <div className="bg-slate-950 px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-emerald-600/20 to-transparent pointer-events-none" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full mx-auto flex items-center justify-center mb-3"
          >
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
          </motion.div>
          <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
            Admin Control Center
          </h2>
          <p className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase mt-1">
            BEM Fakultas Ilmu Komputer
          </p>
        </div>

        {/* Credentials Info Notice */}
        <div className="bg-emerald-50 border-y border-emerald-100 px-6 py-4 text-left">
          <h4 className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kredensial Akun Administrator</span>
          </h4>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            Gunakan akun resmi di bawah ini untuk mengakses dashboard:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] font-mono bg-white p-2 rounded-lg border border-emerald-100 shadow-2xs">
            <div>
              <span className="block text-gray-400 font-bold uppercase">Email / User</span>
              <span className="text-gray-800 font-semibold select-all">admin@student.fik.ac.id</span>
            </div>
            <div>
              <span className="block text-gray-400 font-bold uppercase">Password</span>
              <span className="text-gray-800 font-semibold select-all">admin123</span>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="p-6 sm:p-8 text-left">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-600 font-semibold mb-4"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                Alamat Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="login-email"
                  required
                  placeholder="admin@student.fik.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="login-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Remember & Secure Text */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                <span>Ingat Sesi Saya</span>
              </label>
              <span className="font-semibold text-emerald-600 hover:underline cursor-pointer">Lupa Sandi?</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold tracking-wider transition-all duration-250 cursor-pointer flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-80 cursor-wait' : ''
              }`}
              id="btn-login-submit"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>MASUK SEKARANG</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
