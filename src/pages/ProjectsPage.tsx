import React, { useEffect, useState } from 'react';
import {
  FolderGit2,
  Search,
  Clock,
  Code2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { IProject } from '../../server/models/types';
import { useAnalysis } from '../context/AnalysisContext';

export const ProjectsPage: React.FC = () => {
  const { setSelectedProjectId, progress } = useAnalysis();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.skillsGained.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
          <FolderGit2 className="w-4 h-4" />
          <span>Project Intelligence Repository</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Production-Grade Architectures
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Don't just watch videos. Build structured, milestone-driven projects with realistic system architectures, interview defense prep, and resume bullet points.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by skill, stack (e.g. Node, React, SQL)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400">Loading project repository...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const userStatus = progress?.projectStatus?.[project._id] || 'not_started';

            return (
              <div
                key={project._id}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-5 hover:border-emerald-500/40 hover:shadow-md transition-all"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        project.difficulty === 'Beginner'
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          : project.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}
                    >
                      {project.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {project.estimatedTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.whyRecommended}
                  </p>

                  {/* Impact Scores Bar */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 mb-4 text-center text-[10px]">
                    <div>
                      <span className="text-slate-400 block">Relevance</span>
                      <span className="font-bold text-emerald-500">{project.relevanceScore || 94}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Skill Impact</span>
                      <span className="font-bold text-teal-500">{project.skillImpactScore || 88}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Resume Value</span>
                      <span className="font-bold text-indigo-500">{project.resumeImpactScore || 90}%</span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* User status badge */}
                  {userStatus !== 'not_started' && (
                    <div className="mt-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          userStatus === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}
                      >
                        {userStatus === 'completed' ? '✓ Completed by you' : '● In Progress'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedProjectId(project._id)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    View Project Blueprint
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
