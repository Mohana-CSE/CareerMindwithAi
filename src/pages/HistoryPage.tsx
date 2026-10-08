import React, { useEffect, useState } from 'react';
import {
  History as HistoryIcon,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  FileText,
  RotateCcw
} from 'lucide-react';
import { IAnalysis } from '../../server/models/types';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';

export const HistoryPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { loadAnalysisById } = useAnalysis();
  const { token, user } = useAuth();
  const [history, setHistory] = useState<IAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/analysis/history', { headers });
        const data = await res.json();
        if (data.history) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  const handleSelectAnalysis = async (id: string) => {
    await loadAnalysisById(id);
    onNavigate('dashboard');
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
          <HistoryIcon className="w-4 h-4" />
          <span>Analysis History & Snapshots</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Your Resume Intelligence Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review previous resume upload reports, track score growth, and inspect historical skill gap progressions.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-slate-400">Loading analysis history...</div>
      ) : history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Past Analysis Saved
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Upload your resume to begin tracking your career readiness score across time.
          </p>
          <button
            onClick={() => onNavigate('upload')}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-xs"
          >
            Upload Resume Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {item.topCareerMatch.title}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {item.topCareerMatch.matchPercentage}% Match
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span>•</span>
                  <span>Readiness: <strong className="text-slate-700 dark:text-slate-300">{item.careerReadinessScore}%</strong></span>
                  <span>•</span>
                  <span>Gaps: {item.skillGaps.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSelectAnalysis(item._id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Load Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
