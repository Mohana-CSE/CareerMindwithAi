import React from 'react';
import { Loader2, CheckCircle, FileSearch, Sparkles, Brain, Compass, Milestone, Rocket } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export const AnalysisLoadingModal: React.FC = () => {
  const { isAnalyzing, analysisStep } = useAnalysis();

  if (!isAnalyzing) return null;

  const steps = [
    { num: 1, title: 'Reading your resume', icon: FileSearch },
    { num: 2, title: 'Extracting your skills & evidence', icon: Brain },
    { num: 3, title: 'Understanding your engineering profile', icon: Sparkles },
    { num: 4, title: 'Finding your career matches', icon: Compass },
    { num: 5, title: 'Identifying skill gaps & blockers', icon: Milestone },
    { num: 6, title: 'Building your project roadmap', icon: Rocket },
    { num: 7, title: 'Preparing your career intelligence report', icon: CheckCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-2">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analyzing Career Intelligence
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Evaluating your resume with Google Gemini 3.8 Flash AI...
          </p>
        </div>

        {/* Steps list */}
        <div className="space-y-3">
          {steps.map(step => {
            const isDone = analysisStep > step.num;
            const isCurrent = analysisStep === step.num;
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className={`flex items-center gap-3.5 p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30'
                    : isDone
                    ? 'opacity-80'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isCurrent
                      ? 'text-emerald-700 dark:text-emerald-300 font-semibold'
                      : isDone
                      ? 'text-slate-700 dark:text-slate-300 line-through'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {analysisStep >= 7 && (
          <div className="text-center pt-2 text-xs font-semibold text-emerald-500 animate-pulse">
            Your Career Intelligence Report is Ready!
          </div>
        )}
      </div>
    </div>
  );
};
