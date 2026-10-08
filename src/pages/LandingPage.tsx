import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Code2,
  CheckCircle2,
  Award,
  TestTube2,
  Milestone,
  FolderGit2
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { loadDemoMode } = useAnalysis();

  const handleExploreDemo = async () => {
    await loadDemoMode();
    onNavigate('dashboard');
  };

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turn Your Skills Into Your Career</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            CAREERMIND AI
            <span className="block text-2xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
              "Your Resume Is Only the Beginning."
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Discover your strongest career paths, identify the skills holding you back, and get a personalized path of projects and learning to become job-ready.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('upload')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Analyze My Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <TestTube2 className="w-4 h-4 text-amber-500" />
              Explore Demo
            </button>

            <button
              onClick={() => onNavigate('careers')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Explore 14 Careers
            </button>
          </div>
        </div>

        {/* Hero Visual: Miniature Career Intelligence Dashboard Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-200/50 via-slate-100/30 to-white/10 dark:from-slate-800/60 dark:via-slate-900/40 dark:to-slate-950/20 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
          <div className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-7 space-y-6">
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                  Career Intelligence Preview
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Full Stack Developer Trajectory
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  87% Role Match
                </span>
              </div>
            </div>

            {/* Score and Gap Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Score Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Career Readiness</div>
                <div className="text-3xl font-black text-emerald-500 my-1">82%</div>
                <div className="text-[11px] text-slate-400">Technical • Projects • Experience</div>
              </div>

              {/* Skill Gap Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Top Priority Gaps</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Node.js</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500">HIGH</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">MongoDB</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">MEDIUM</span>
                </div>
              </div>

              {/* Next Best Action Box */}
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  Next Best Action
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Build REST API with Node & Express
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Directly closes largest architectural gap.
                </div>
              </div>
            </div>

            {/* Progression Bar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Project Progression Roadmap
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  1. Beginner Project
                </div>
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-semibold">
                  2. Intermediate API
                </div>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  3. Advanced SaaS
                </div>
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  4. Job Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Learn → Build System */}
      <section className="py-16 sm:py-24 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              The Signature Advantage
            </h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Learn → Build Engine
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Generic platforms send you to endless 40-hour tutorial playlists. CareerMind AI pairs every missing skill directly with a production-grade milestone project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                LEARN Fundamentals
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Concise documentation and high-signal interactive guides covering exact runtime mechanics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                BUILD Architecture
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Step-by-step milestones, database schemas, and REST endpoints bridging your actual gaps.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                APPLY Full-Stack
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Deploy containerized services with security headers, testing suites, and real traffic handling.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                PROVE & Interview
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate tailored resume bullets and practice technical design interview questions to pass screens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Trajectories Preview */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Multi-Discipline Intelligence
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            14 Software Engineering Roles Benchmarked
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            From Frontend and MERN to AI Engineers, ML, DevOps, and Cybersecurity. Compare where you stand against industry standards.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'MERN Developer',
            'Java Developer',
            'Python Developer',
            'AI Engineer',
            'ML Engineer',
            'Data Analyst',
            'Data Scientist',
            'DevOps Engineer',
            'Cloud Engineer',
            'Cybersecurity',
            'Mobile Developer',
          ].map((role, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('careers')}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center"
            >
              {role}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to benchmark your resume?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Upload your PDF resume now to extract skill evidence, rank your highest-priority gaps, and unlock your project roadmap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => onNavigate('upload')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md cursor-pointer"
            >
              Upload PDF Resume
            </button>
            <button
              onClick={handleExploreDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 cursor-pointer"
            >
              Explore Sample Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
