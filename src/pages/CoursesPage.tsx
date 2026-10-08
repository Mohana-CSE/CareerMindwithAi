import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Code2,
  CheckCircle2,
  Check,
  Zap,
  Filter,
  Flame,
  Target
} from 'lucide-react';
import { ILearningResource, ICodingProblem } from '../../server/models/types';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';

export const CoursesPage: React.FC = () => {
  const { currentAnalysis } = useAnalysis();
  const { token } = useAuth();

  // Mode: Documentation vs LeetCode Problems
  const [mainSection, setMainSection] = useState<'docs' | 'leetcode'>('docs');

  // Courses state
  const [resources, setResources] = useState<{
    learnNow: ILearningResource[];
    learnNext: ILearningResource[];
    optional: ILearningResource[];
  }>({
    learnNow: [],
    learnNext: [],
    optional: [],
  });
  const [activeCourseTab, setActiveCourseTab] = useState<'learnNow' | 'learnNext' | 'optional'>('learnNow');
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);

  // LeetCode problems state
  const [problems, setProblems] = useState<(ICodingProblem & { isSolved?: boolean })[]>([]);
  const [selectedProblemCategory, setSelectedProblemCategory] = useState<string>('All');
  const [isProblemsLoading, setIsProblemsLoading] = useState(true);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = currentAnalysis
          ? `/api/courses/recommended?analysisId=${currentAnalysis._id}`
          : '/api/courses/recommended';
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setResources({
            learnNow: data.learnNow || [],
            learnNext: data.learnNext || [],
            optional: data.optional || [],
          });
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setIsCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [currentAnalysis]);

  // Fetch LeetCode / Problem Solving Challenges
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const url = currentAnalysis
          ? `/api/coding-problems/recommended?analysisId=${currentAnalysis._id}`
          : '/api/coding-problems/recommended';
        const res = await fetch(url, { headers });
        const data = await res.json();
        if (data.success && data.problems) {
          setProblems(data.problems);
          setSolvedCount(data.solvedCount || 0);
        }
      } catch (err) {
        console.error('Error fetching coding problems:', err);
      } finally {
        setIsProblemsLoading(false);
      }
    };

    fetchProblems();
  }, [currentAnalysis, token]);

  // Toggle problem solved
  const handleToggleSolved = async (problemId: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/coding-problems/${problemId}/toggle`, {
        method: 'PUT',
        headers,
      });
      const data = await res.json();
      if (data.success) {
        setProblems(prev =>
          prev.map(p => (p._id === problemId ? { ...p, isSolved: data.isSolved } : p))
        );
        setSolvedCount(prev => (data.isSolved ? prev + 1 : Math.max(0, prev - 1)));
      }
    } catch (err) {
      console.error('Error toggling problem solved status:', err);
    }
  };

  const currentCourseList = resources[activeCourseTab];

  const problemCategories = ['All', ...Array.from(new Set(problems.map(p => p.category)))];

  const filteredProblems = problems.filter(p => {
    if (selectedProblemCategory === 'All') return true;
    return p.category === selectedProblemCategory;
  });

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Learning & Problem Solving Hub</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Targeted Technical Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Bridge knowledge gaps with verified official documentation, then solidify interview speed with curated LeetCode & BigFrontend algorithmic challenges.
          </p>
        </div>

        {/* Primary View Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setMainSection('docs')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              mainSection === 'docs'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Official Guides & Docs
          </button>
          <button
            onClick={() => setMainSection('leetcode')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              mainSection === 'leetcode'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-500" />
            LeetCode Challenges
            {solvedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-slate-950">
                {solvedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mainSection === 'docs' ? (
        /* SECTION 1: DOCUMENTATION & COURSES */
        <div className="space-y-6">
          {/* Sub-tabs: Learn Now | Learn Next | Optional */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveCourseTab('learnNow')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCourseTab === 'learnNow'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>🔥 Learn Now (High Priority)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                {resources.learnNow.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCourseTab('learnNext')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCourseTab === 'learnNext'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>⚡ Learn Next (Expansion)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold">
                {resources.learnNext.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCourseTab('optional')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCourseTab === 'optional'
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span>✨ Optional Electives</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold">
                {resources.optional.length}
              </span>
            </button>
          </div>

          {/* Resource Cards */}
          {isCoursesLoading ? (
            <div className="py-20 text-center text-slate-400">Loading verified courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourseList.map((res) => (
                <div
                  key={res._id}
                  className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {res.skill}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {res.estimatedTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {res.reason}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>Provider: <strong className="text-slate-700 dark:text-slate-300">{res.provider}</strong></span>
                      <span className="capitalize">{res.level}</span>
                    </div>
                  </div>

                  {/* Direct Link */}
                  <div className="pt-2">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      Open Official Resource
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* SECTION 2: LEETCODE & PROBLEM SOLVING CHALLENGES */
        <div className="space-y-6">
          {/* Progress / Status banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Technical Interview Readiness
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Solved {solvedCount} of {problems.length} Curated Problems
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Practicing algorithmic problem solving directly accelerates live coding round performance.
              </p>
            </div>

            <div className="w-full sm:w-48 space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>Completion</span>
                <span>{Math.round((solvedCount / Math.max(1, problems.length)) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(solvedCount / Math.max(1, problems.length)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            {problemCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedProblemCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedProblemCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Problem Cards Grid */}
          {isProblemsLoading ? (
            <div className="py-20 text-center text-slate-400">Loading recommended LeetCode challenges...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((prob) => {
                const isSolved = Boolean(prob.isSolved);

                return (
                  <div
                    key={prob._id}
                    className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                      isSolved
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-slate-200 dark:border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div>
                      {/* Badges bar */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              prob.platform === 'LeetCode'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                : prob.platform === 'BigFrontend'
                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                                : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                            }`}
                          >
                            {prob.platform}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              prob.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : prob.difficulty === 'Medium'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>

                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          ~{prob.estimatedMinutes}m
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {prob.title}
                        </h4>
                        {isSolved && (
                          <span className="p-1 rounded-full bg-emerald-500 text-slate-950 shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 mb-2 font-mono">
                        Skill Target: <strong className="text-emerald-500">{prob.skill}</strong> • {prob.category}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {prob.whyRecommended}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Solve on {prob.platform}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleToggleSolved(prob._id)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isSolved
                            ? 'bg-emerald-500 text-slate-950 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
