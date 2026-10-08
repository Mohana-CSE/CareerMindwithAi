import React from 'react';
import {
  Code,
  AlertCircle,
  BookOpen,
  FolderGit2,
  Briefcase,
  Trophy,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { IAnalysis } from '../../server/models/types';

interface CareerPathGraphViewProps {
  analysis: IAnalysis;
}

export const CareerPathGraphView: React.FC<CareerPathGraphViewProps> = ({ analysis }) => {
  const steps = [
    {
      id: 'current',
      title: 'Current Skills',
      subtitle: `${analysis.skillsDetected.filter(s => s.detected).length} Detected Skills`,
      icon: Code,
      color: 'emerald',
      status: 'completed',
    },
    {
      id: 'gaps',
      title: 'Skill Gaps',
      subtitle: `${analysis.skillGaps.length} Targeted Gaps`,
      icon: AlertCircle,
      color: 'amber',
      status: 'active',
    },
    {
      id: 'learning',
      title: 'Active Learning',
      subtitle: 'Curated Docs & Guides',
      icon: BookOpen,
      color: 'blue',
      status: 'upcoming',
    },
    {
      id: 'projects',
      title: 'Project Progression',
      subtitle: 'Beginner → Adv',
      icon: FolderGit2,
      color: 'indigo',
      status: 'upcoming',
    },
    {
      id: 'portfolio',
      title: 'Portfolio Ready',
      subtitle: 'Live Deployments',
      icon: CheckCircle,
      color: 'teal',
      status: 'upcoming',
    },
    {
      id: 'interview',
      title: 'Interview Prep',
      subtitle: 'System Design & Q&A',
      icon: Briefcase,
      color: 'purple',
      status: 'upcoming',
    },
    {
      id: 'target',
      title: analysis.topCareerMatch.title,
      subtitle: `${analysis.topCareerMatch.matchPercentage}% Goal`,
      icon: Trophy,
      color: 'emerald',
      status: 'target',
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 pt-2">
      <div className="min-w-[850px] flex items-center justify-between relative px-4">
        {/* Connector Line behind nodes */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 -translate-y-1/2 z-0 opacity-30 dark:opacity-40" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isTarget = step.status === 'target';
          const isDone = step.status === 'completed';

          return (
            <React.Fragment key={step.id}>
              <div className="relative z-10 flex flex-col items-center text-center group cursor-default">
                {/* Node bubble */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md group-hover:scale-110 ${
                    isTarget
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 ring-4 ring-emerald-500/30 font-bold'
                      : isDone
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Node Title & Details */}
                <div className="mt-3">
                  <div
                    className={`text-xs font-bold tracking-tight whitespace-nowrap ${
                      isTarget
                        ? 'text-emerald-500 dark:text-emerald-400 font-extrabold'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {step.subtitle}
                  </div>
                </div>
              </div>

              {/* Arrow divider */}
              {idx < steps.length - 1 && (
                <div className="z-10 text-slate-400/50 dark:text-slate-600">
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
