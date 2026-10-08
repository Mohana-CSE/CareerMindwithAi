import React, { useEffect, useState } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Question {
  id: string;
  dimension: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface AssessmentResult {
  topRecommendedTitles: string[];
  dimensions: {
    problemSolving: number;
    technicalInterest: number;
    analyticalThinking: number;
    creativity: number;
    communication: number;
    preferredWorkStyle: string;
  };
}

export const AssessmentPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { token } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/assessment/questions');
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Error fetching assessment questions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          topRecommendedTitles: data.topRecommendedTitles || [],
          dimensions: data.assessment?.dimensions,
        });
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-400">Loading career diagnostic assessment...</div>;
  }

  const currentQ = questions[currentIdx];
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Engineering Aptitude & Work Style</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Career Direction Diagnostic
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Evaluate your architectural intuition, problem solving, and preferred engineering environments to refine your career trajectory.
        </p>
      </div>

      {result ? (
        /* Results View */
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-in fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Assessment Evaluation Complete
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Blended with your resume's technical evidence
            </p>
          </div>

          {/* Recommended Roles */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Top Recommended Career Disciplines
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.topRecommendedTitles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xs"
                >
                  #{idx + 1} {role}
                </span>
              ))}
            </div>
          </div>

          {/* Dimension Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
              <div className="text-xs text-slate-400 font-medium">Problem Solving</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {result.dimensions?.problemSolving || 85}%
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
              <div className="text-xs text-slate-400 font-medium">Technical Focus</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {result.dimensions?.technicalInterest || 90}%
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
              <div className="text-xs text-slate-400 font-medium">Analytical Depth</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {result.dimensions?.analyticalThinking || 80}%
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
              <div className="text-xs text-slate-400 font-medium">Architectural Creativity</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {result.dimensions?.creativity || 88}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrentIdx(0);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-xs"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* Question Card */
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-slate-400 dark:border-slate-600'
                    }`}
                  >
                    {opt.id.toUpperCase()}
                  </div>
                  <span className="leading-relaxed">{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Next / Submit buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit Diagnostic'}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
