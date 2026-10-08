import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                CareerMind <span className="text-emerald-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Turn your skills into your career. AI-powered career intelligence telling you what you know, what you're missing, and what to build next.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('upload')} className="hover:text-emerald-500 transition-colors">
                  Resume Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-500 transition-colors">
                  Career Readiness Score
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-emerald-500 transition-colors">
                  Role Gap Detection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assessment')} className="hover:text-emerald-500 transition-colors">
                  Skills Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Learning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Learn → Build
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-emerald-500 transition-colors">
                  Beginner Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-emerald-500 transition-colors">
                  Intermediate Architectures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-emerald-500 transition-colors">
                  Advanced SaaS Systems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-emerald-500 transition-colors">
                  Curated Courses
                </button>
              </li>
            </ul>
          </div>

          {/* Built for Developers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Developer Ecosystem
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Powered by Google Gemini 3.8 Flash with structured schema extraction and explainable skill evidence.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <span>● Production AI Pipeline</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} CareerMind AI. Built for ambitious software engineers.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hackathons & Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
