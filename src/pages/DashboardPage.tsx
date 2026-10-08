import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Code2,
  FolderGit2,
  Zap,
  HelpCircle,
  ExternalLink,
  Milestone,
  ShieldCheck,
  TestTube2,
  BarChart3
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { CareerPathGraphView } from '../components/CareerPathGraphView';
import { IProject } from '../../server/models/types';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { currentAnalysis, isDemoMode, setSelectedProjectId } = useAnalysis();
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'detected' | 'missing'>('all');

  if (!currentAnalysis) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Resume Analysis Loaded
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Upload your technical resume or explore our sample demo profile to generate your career intelligence report.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('upload')}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
          >
            Upload Resume
          </button>
          <button
            onClick={() => onNavigate('upload')}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-all cursor-pointer"
          >
            Try Demo
          </button>
        </div>
      </div>
    );
  }

  const {
    careerReadinessScore,
    readinessBreakdown,
    topCareerMatch,
    skillsDetected,
    skillGaps,
    nextBestAction,
    recommendedProjects,
    progressionRoadmap,
    jobReadiness,
    alternativeCareers,
  } = currentAnalysis;

  const detectedSkills = skillsDetected.filter(s => s.detected);
  const missingSkills = skillsDetected.filter(s => !s.detected);

  const filteredSkills =
    selectedFilter === 'all'
      ? skillsDetected
      : selectedFilter === 'detected'
      ? detectedSkills
      : missingSkills;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Top Welcome & State Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user ? user.name.split(' ')[0] : 'Developer'}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDemoMode
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {isDemoMode ? <TestTube2 className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              {isDemoMode ? 'DEMO MODE' : 'REAL ANALYSIS'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Here's where your career stands based on verified resume evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('upload')}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            Upload Another Resume
          </button>
          <button
            onClick={() => onNavigate('careers')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-all cursor-pointer"
          >
            Explore Careers
          </button>
        </div>
      </div>

      {/* SECTION 1: Career Readiness & Top Match */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Career Readiness Score Card */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Career Readiness
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 uppercase">
                Overall Index
              </span>
            </div>

            {/* Score Ring / Display */}
            <div className="text-center my-4">
              <div className="text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                {careerReadinessScore}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Benchmark against production expectations
              </p>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            {[
              { label: 'Technical Skills', val: readinessBreakdown.technicalSkills, color: 'bg-emerald-500' },
              { label: 'Projects & Systems', val: readinessBreakdown.projects, color: 'bg-teal-500' },
              { label: 'Experience Depth', val: readinessBreakdown.experience, color: 'bg-indigo-500' },
              { label: 'Career Alignment', val: readinessBreakdown.careerAlignment, color: 'bg-blue-500' },
              { label: 'Interview Readiness', val: readinessBreakdown.interviewReadiness, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Career Match Card */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Top Career Match
                </span>
                <span className="text-xs text-slate-400">Primary Fit</span>
              </div>
              <div className="text-2xl font-black text-emerald-500">
                {topCareerMatch.matchPercentage}% Match
              </div>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              {topCareerMatch.title}
            </h2>

            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-6">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Why this fits you
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {topCareerMatch.whyFits}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strong Skills */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Strong Skills ({topCareerMatch.strongSkills.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topCareerMatch.strongSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Missing Skills ({topCareerMatch.missingSkills.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topCareerMatch.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="font-medium">Market Growth: </span>
              <span className="font-bold text-teal-500">{topCareerMatch.careerGrowth}</span>
            </div>
            <div>
              <span className="font-medium">Learning Effort: </span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{topCareerMatch.learningEffort}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Next Best Action & Job Readiness Blocker */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Next Best Action Card (Highly Prominent) */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border-2 border-emerald-500/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Your Next Best Action
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {nextBestAction.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {nextBestAction.reason}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                if (nextBestAction.projectId) {
                  setSelectedProjectId(nextBestAction.projectId);
                } else {
                  onNavigate('projects');
                }
              }}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              {nextBestAction.buttonText || 'Start Project'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Job Readiness & Biggest Blocker */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Job Readiness Assessment
            </div>
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
                <div className="text-[10px] text-slate-400">Technical</div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{jobReadiness.technicalReadiness}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
                <div className="text-[10px] text-slate-400">Projects</div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{jobReadiness.projectReadiness}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
                <div className="text-[10px] text-slate-400">Resume Proof</div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{jobReadiness.resumeReadiness}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
                <div className="text-[10px] text-slate-400">Interview Q&A</div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{jobReadiness.interviewReadiness}%</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
              Your Biggest Blocker
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {jobReadiness.biggestBlocker}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Career Path Graph */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Career Transformation Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive roadmap from your current resume skills to your target career role
            </p>
          </div>
        </div>
        <CareerPathGraphView analysis={currentAnalysis} />
      </div>

      {/* SECTION 4: Skill Intelligence & Explainable Evidence */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Skill Intelligence & Evidence
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explainable AI: Each skill status is grounded in specific evidence extracted from your uploaded resume.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All ({skillsDetected.length})
            </button>
            <button
              onClick={() => setSelectedFilter('detected')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedFilter === 'detected'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Detected ({detectedSkills.length})
            </button>
            <button
              onClick={() => setSelectedFilter('missing')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedFilter === 'missing'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Missing ({missingSkills.length})
            </button>
          </div>
        </div>

        {/* Skill Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.detected
                  ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50'
                  : 'bg-rose-50/30 dark:bg-rose-950/10 border-rose-200/40 dark:border-rose-900/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {item.skill}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.level === 'Advanced'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : item.level === 'Intermediate'
                      ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                      : item.level === 'Beginner'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {item.level}
                </span>
              </div>

              {/* Progress Bar for Proficiency */}
              {item.detected && (
                <div className="mb-3 space-y-1">
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${item.proficiencyScore}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Explainable Evidence */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {item.detected ? 'Evidence: ' : 'Reason: '}
                </span>
                {item.evidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Ranked Skill Gap Prioritization */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Skill Gap Prioritization
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ranked by direct return on career readiness. Closing HIGH priority gaps delivers the fastest score jump.
          </p>
        </div>

        <div className="space-y-3">
          {skillGaps.map((gap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      gap.priority === 'HIGH'
                        ? 'bg-rose-500 text-white'
                        : gap.priority === 'MEDIUM'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {gap.priority} PRIORITY
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {gap.skill}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {gap.reason}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] text-slate-400 block">Est. Time to Learn</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{gap.timeToLearn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: Unique Project Intelligence (Beginner, Intermediate, Advanced) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recommended Project Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dynamically assigned based on your skill gaps. Build these to prove job-ready architecture.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Projects <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      proj.difficulty === 'Beginner'
                        ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        : proj.difficulty === 'Intermediate'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{proj.estimatedTime}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {proj.whyRecommended}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Skills Gained
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.skillsGained.slice(0, 4).map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setSelectedProjectId(proj._id)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  View Project Blueprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: Roadmap Stages Progression */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Engineering Progression Roadmap
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From current resume benchmark to final placement readiness
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {progressionRoadmap.map((step) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div
                key={step.step}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isInProgress
                    ? 'bg-teal-500/10 border-teal-500/40 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400">Step {step.step}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isInProgress ? (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                    ) : null}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {step.stage}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">
                    {step.title}
                  </p>
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {step.status.replace('_', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
