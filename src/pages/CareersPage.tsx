import React, { useEffect, useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { ICareerRole } from '../../server/models/types';
import { useAnalysis } from '../context/AnalysisContext';
import { CareerCompareModal } from '../components/CareerCompareModal';

export const CareersPage: React.FC = () => {
  const { currentAnalysis, compareCareerRoleIds, setCompareCareerRoleIds } = useAnalysis();
  const [careers, setCareers] = useState<ICareerRole[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('/api/careers');
        const data = await res.json();
        if (data.careers) {
          setCareers(data.careers);
        }
      } catch (err) {
        console.error('Error fetching careers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const categories = ['All', ...Array.from(new Set(careers.map(c => c.category)))];

  const filteredCareers = careers.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleCompare = (roleId: string) => {
    if (compareCareerRoleIds.includes(roleId)) {
      setCompareCareerRoleIds(compareCareerRoleIds.filter(id => id !== roleId));
    } else {
      if (compareCareerRoleIds.length >= 3) {
        alert('You can compare up to 3 careers simultaneously.');
        return;
      }
      setCompareCareerRoleIds([...compareCareerRoleIds, roleId]);
    }
  };

  const detectedSkillNames = new Set(
    currentAnalysis?.skillsDetected.filter(s => s.detected).map(s => s.skill.toLowerCase()) || []
  );

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Career Explorer & Benchmarks</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore 14 Engineering Paths
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Analyze skill prerequisites, market salaries, growth metrics, and compare up to 3 roles.
          </p>
        </div>

        {/* Compare Floating / Header Action */}
        {compareCareerRoleIds.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md flex items-center gap-2 cursor-pointer animate-in fade-in"
            >
              <Scale className="w-4 h-4" />
              Compare ({compareCareerRoleIds.length}/3) Selected
            </button>
            <button
              onClick={() => setCompareCareerRoleIds([])}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles, skills (e.g. React, Python)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400">Loading career profiles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const isComparing = compareCareerRoleIds.includes(career._id);
            const strong = career.requiredSkills.filter(s =>
              detectedSkillNames.has(s.toLowerCase())
            );
            const matchPct = currentAnalysis
              ? Math.max(30, Math.round((strong.length / Math.max(1, career.requiredSkills.length)) * 100))
              : null;

            return (
              <div
                key={career._id}
                className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-5 transition-all ${
                  isComparing
                    ? 'ring-2 ring-emerald-500 border-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {career.category}
                    </span>
                    <button
                      onClick={() => toggleCompare(career._id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isComparing
                          ? 'bg-emerald-500 text-slate-950 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {isComparing ? 'Selected' : 'Compare'}
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {career.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {career.summary}
                  </p>

                  {/* Compensation & Growth */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Avg Salary</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{career.avgSalary}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Growth</span>
                      <span className="font-bold text-teal-500">{career.growthRate}</span>
                    </div>
                  </div>

                  {/* If user has analysis loaded: Show their match percentage! */}
                  {matchPct !== null && (
                    <div className="mb-4 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        Your Resume Match
                      </span>
                      <span className="text-sm font-black text-emerald-500">{matchPct}%</span>
                    </div>
                  )}

                  {/* Required skills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Core Required Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.map((s, idx) => {
                        const hasSkill = detectedSkillNames.has(s.toLowerCase());
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                              hasSkill
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {hasSkill && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer comparison trigger */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Difficulty: <span className="font-bold text-slate-700 dark:text-slate-300">{career.difficulty}</span>
                  </span>
                  <button
                    onClick={() => {
                      if (!compareCareerRoleIds.includes(career._id)) {
                        setCompareCareerRoleIds([...compareCareerRoleIds.slice(0, 2), career._id]);
                      }
                      setIsCompareOpen(true);
                    }}
                    className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Breakdown <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareOpen && (
        <CareerCompareModal
          careerIds={compareCareerRoleIds}
          onClose={() => setIsCompareOpen(false)}
        />
      )}
    </div>
  );
};
