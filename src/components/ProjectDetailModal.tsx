import React, { useEffect, useState } from 'react';
import {
  X,
  Clock,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  HelpCircle,
  FileText,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Send,
  Github,
  Globe,
  ShieldAlert,
  Award,
  AlertCircle,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { IProject, IProjectSubmission } from '../../server/models/types';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ projectId, onClose }) => {
  const { progress, updateProgress } = useAnalysis();
  const { token } = useAuth();
  const [project, setProject] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'submit'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Submission Form State
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [latestEvaluation, setLatestEvaluation] = useState<IProjectSubmission | null>(null);
  const [pastSubmissions, setPastSubmissions] = useState<IProjectSubmission[]>([]);

  useEffect(() => {
    if (!projectId) {
      setProject(null);
      setLatestEvaluation(null);
      setActiveTab('overview');
      return;
    }

    const fetchProjectAndSubmissions = async () => {
      setIsLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // Fetch project
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        if (data.project) {
          setProject(data.project);
        }

        // Fetch submissions
        const subRes = await fetch(`/api/projects/${projectId}/submissions`, { headers });
        const subData = await subRes.json();
        if (subData.submissions && subData.submissions.length > 0) {
          setPastSubmissions(subData.submissions);
          setLatestEvaluation(subData.submissions[0]);
        } else {
          setPastSubmissions([]);
          setLatestEvaluation(null);
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectAndSubmissions();
  }, [projectId, token]);

  if (!projectId) return null;

  const currentStatus = (project && progress?.projectStatus?.[project._id]) || 'not_started';

  const handleStatusChange = (status: 'not_started' | 'learning' | 'completed') => {
    if (project) {
      updateProgress(project._id, 'project', status);
    }
  };

  const copyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) {
      setSubmitError('Please provide a valid GitHub repository URL.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/projects/${projectId}/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          githubUrl: githubUrl.trim(),
          liveDemoUrl: liveDemoUrl.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to evaluate submission.');
      } else {
        setLatestEvaluation(data.submission);
        setPastSubmissions(prev => [data.submission, ...prev]);
        if (data.submission.evaluation.status === 'PASSED') {
          handleStatusChange('completed');
        }
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error evaluating submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                  project?.difficulty === 'Beginner'
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    : project?.difficulty === 'Intermediate'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                {project?.difficulty} Project
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {project?.estimatedTime}
              </span>
              {latestEvaluation && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  AI Evaluated: {latestEvaluation.evaluation.score}/100 ({latestEvaluation.evaluation.grade})
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project?.title || 'Loading Project...'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Blueprint & Architecture
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'submit'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-500" />
            Submit Solution & AI Review
            {latestEvaluation && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-sm">
          {isLoading || !project ? (
            <div className="py-20 text-center text-slate-400">Loading project architecture & milestones...</div>
          ) : activeTab === 'submit' ? (
            /* SUBMIT SOLUTION & EVALUATE TAB */
            <div className="space-y-8">
              {/* Submission Form Card */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-500" />
                    Submit Your Project for AI Recruiter Evaluation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Provide your repository and live demo. Google Gemini 3.8 Flash will evaluate your architecture, code completeness, security best practices, and interview defense.
                  </p>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      GitHub Repository URL *
                    </label>
                    <div className="relative">
                      <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        required
                        placeholder="https://github.com/your-username/my-project"
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Live Demo / Cloud URL (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="https://my-project-live.run.app"
                        value={liveDemoUrl}
                        onChange={e => setLiveDemoUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Architecture Notes / Implemented Highlights
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe key patterns, schemas, middleware, or trade-offs you built..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Running AI Evaluation...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Evaluate Project with AI
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Latest AI Evaluation Report */}
              {latestEvaluation && (
                <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/30 space-y-6 animate-in fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                        Evaluation Report
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        AI Code & Architecture Review
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-xs">
                        <div className="text-[10px] text-slate-400 font-semibold">Score</div>
                        <div className="text-2xl font-black text-emerald-500">
                          {latestEvaluation.evaluation.score}/100
                        </div>
                      </div>
                      <div className="text-center px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-xs">
                        <div className="text-[10px] text-slate-400 font-semibold">Grade</div>
                        <div className="text-2xl font-black text-teal-500">
                          {latestEvaluation.evaluation.grade}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                      latestEvaluation.evaluation.status === 'PASSED'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {latestEvaluation.evaluation.status === 'PASSED'
                        ? 'PASSED RECRUITMENT BENCHMARK — Project readiness successfully boosted!'
                        : 'NEEDS REFACTOR — Review feedback below to elevate this project.'}
                    </span>
                  </div>

                  {/* Architecture & Security Review */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        Architecture Assessment
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {latestEvaluation.evaluation.architectureReview}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" />
                        Security & Robustness Check
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {latestEvaluation.evaluation.securityCheck}
                      </p>
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Key Strengths Observed
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
                        {latestEvaluation.evaluation.strengths.map((str, i) => (
                          <li key={i}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Recommended Improvements
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
                        {latestEvaluation.evaluation.improvements.map((imp, i) => (
                          <li key={i}>{imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interview Defense Tip */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1.5 text-xs">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                      Hiring Manager Interview Defense Tip
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {latestEvaluation.evaluation.interviewTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* OVERVIEW TAB (Full Architecture & Blueprint) */
            <>
              {/* Impact Scores & Status Action */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                <div className="text-center p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Career Relevance</div>
                  <div className="text-xl font-bold text-emerald-500">{project.relevanceScore || 94}%</div>
                </div>
                <div className="text-center p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skill Impact</div>
                  <div className="text-xl font-bold text-teal-500">{project.skillImpactScore || 88}%</div>
                </div>
                <div className="text-center p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Resume Impact</div>
                  <div className="text-xl font-bold text-indigo-500">{project.resumeImpactScore || 91}%</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Your Progress</div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStatusChange(currentStatus === 'completed' ? 'learning' : 'completed')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currentStatus === 'completed'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : currentStatus === 'learning'
                          ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                      }`}
                    >
                      {currentStatus === 'completed' ? '✓ Completed' : currentStatus === 'learning' ? 'In Progress' : 'Start Project'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Goal & Why Recommended */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    Project Goal
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {project.goal}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-teal-500/5 border border-teal-500/20">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-teal-600 dark:text-teal-400">
                    <Flame className="w-4 h-4" />
                    Why CareerMind Recommended It
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {project.whyRecommended}
                  </p>
                </div>
              </div>

              {/* Skills gained & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Skills You Will Master
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsGained.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.prerequisites.map((req, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features to Build */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  Key Features To Build
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture breakdown */}
              {project.architecture && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    System Architecture
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(project.architecture).map(([layer, desc]) => (
                      <div
                        key={layer}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80"
                      >
                        <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                          {layer} Layer
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Milestones */}
              {project.milestones && project.milestones.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                    Implementation Milestones
                  </h3>
                  <div className="space-y-3">
                    {project.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80"
                      >
                        <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mb-2">
                          {milestone.title}
                        </div>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300">
                          {milestone.tasks.map((task, tIdx) => (
                            <li key={tIdx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interview Preparation Questions */}
              {project.interviewQuestions && project.interviewQuestions.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    Interview Defense & Questions
                  </h3>
                  <div className="space-y-3">
                    {project.interviewQuestions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2"
                      >
                        <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-start gap-2">
                          <span className="text-amber-500 font-bold">Q:</span>
                          <span>{q.question}</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-amber-500/40 leading-relaxed">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">Recommended Answer: </span>
                          {q.sampleAnswer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ready-to-use Resume Description */}
              {project.resumeBulletPoints && project.resumeBulletPoints.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                      <FileText className="w-4 h-4" />
                      Professional Resume Description (Bullet Points)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Copy and paste directly into your resume's Technical Projects section:
                  </p>
                  <div className="space-y-2">
                    {project.resumeBulletPoints.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start justify-between gap-3 text-xs leading-relaxed font-mono"
                      >
                        <span className="text-slate-200">• {bullet}</span>
                        <button
                          onClick={() => copyBullet(bullet, bIdx)}
                          className="shrink-0 p-1.5 rounded-lg bg-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-all text-slate-300 cursor-pointer"
                          title="Copy bullet"
                        >
                          {copiedIndex === bIdx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
          <div>
            {activeTab === 'overview' ? (
              <button
                onClick={() => setActiveTab('submit')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Ready to Submit & Evaluate?
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                ← Back to Blueprint
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
