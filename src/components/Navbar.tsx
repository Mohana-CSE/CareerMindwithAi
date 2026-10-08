import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  FolderGit2,
  GraduationCap,
  History,
  LayoutDashboard,
  Upload,
  User as UserIcon,
  LogOut,
  BrainCircuit,
  CheckCircle2,
  TestTube2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isGuest, logout, setIsAuthModalOpen } = useAuth();
  const { currentAnalysis, isDemoMode } = useAnalysis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Analyze Resume', icon: Upload },
    { id: 'careers', label: 'Careers', icon: Compass },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'assessment', label: 'Assessment', icon: BrainCircuit },
    { id: 'history', label: 'History', icon: History },
  ];

  const handleNav = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 bg-white/80 dark:bg-slate-950/80 border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-sm group-hover:shadow-emerald-500/25 transition-all">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                CareerMind <span className="text-emerald-500 dark:text-emerald-400">AI</span>
              </span>
            </div>
            <p className="hidden sm:block text-[10px] font-medium tracking-wider uppercase text-slate-600 dark:text-slate-300">
              Turn Skills Into Your Career
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'opacity-70'}`} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Badges, Theme Toggle, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Analysis State Badge */}
          {currentAnalysis && (
            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-xs ${
                isDemoMode
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              }`}
            >
              {isDemoMode ? (
                <>
                  <TestTube2 className="w-3.5 h-3.5" />
                  <span>DEMO MODE</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>REAL ANALYSIS</span>
                </>
              )}
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-medium">
                <UserIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate max-w-[100px] text-slate-800 dark:text-slate-200">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 rounded-xl text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-100/80 dark:bg-slate-800/80 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 transition-all shadow-xs cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {currentAnalysis && (
            <div className="mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Current Mode:</span>
              <span className={isDemoMode ? 'text-amber-500 font-bold' : 'text-emerald-500 font-bold'}>
                {isDemoMode ? 'DEMO MODE' : 'REAL ANALYSIS'}
              </span>
            </div>
          )}
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
