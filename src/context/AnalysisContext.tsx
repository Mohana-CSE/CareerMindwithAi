import React, { createContext, useContext, useState, useEffect } from 'react';
import { IAnalysis, IProgress } from '../../server/models/types';
import { useAuth } from './AuthContext';

interface AnalysisContextType {
  currentAnalysis: IAnalysis | null;
  isDemoMode: boolean;
  isAnalyzing: boolean;
  analysisStep: number;
  error: string | null;
  uploadResumeFile: (file: File) => Promise<{ success: boolean; error?: string }>;
  loadDemoMode: () => Promise<void>;
  loadAnalysisById: (id: string) => Promise<void>;
  clearError: () => void;
  progress: IProgress | null;
  updateProgress: (id: string, type: 'skill' | 'project' | 'roadmap', status: any) => Promise<void>;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  compareCareerRoleIds: string[];
  setCompareCareerRoleIds: (ids: string[]) => void;
}

const LAST_ANALYSIS_KEY = 'careermind_last_analysis_id';
const IS_DEMO_KEY = 'careermind_is_demo_mode';

const AnalysisContext = createContext<AnalysisContextType>({
  currentAnalysis: null,
  isDemoMode: false,
  isAnalyzing: false,
  analysisStep: 1,
  error: null,
  uploadResumeFile: async () => ({ success: false }),
  loadDemoMode: async () => {},
  loadAnalysisById: async () => {},
  clearError: () => {},
  progress: null,
  updateProgress: async () => {},
  selectedProjectId: null,
  setSelectedProjectId: () => {},
  compareCareerRoleIds: [],
  setCompareCareerRoleIds: () => {},
});

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [currentAnalysis, setCurrentAnalysis] = useState<IAnalysis | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem(IS_DEMO_KEY) === 'true';
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<IProgress | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [compareCareerRoleIds, setCompareCareerRoleIds] = useState<string[]>([]);

  // Fetch initial progress and last saved analysis if available
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // Fetch progress
        const progRes = await fetch('/api/progress', { headers });
        if (progRes.ok) {
          const progData = await progRes.json();
          if (progData.progress) setProgress(progData.progress);
        }

        // Check if there was a saved analysis or if demo mode was previously on
        const savedId = localStorage.getItem(LAST_ANALYSIS_KEY);
        const wasDemo = localStorage.getItem(IS_DEMO_KEY) === 'true';

        if (savedId) {
          const res = await fetch(`/api/analysis/${savedId}`, { headers });
          if (res.ok) {
            const data = await res.json();
            if (data.analysis) {
              setCurrentAnalysis(data.analysis);
              setIsDemoMode(Boolean(data.isDemo));
              return;
            }
          }
        }

        if (wasDemo) {
          // If the user was in demo mode, restore demo mode cleanly
          const res = await fetch('/api/analysis/demo');
          if (res.ok) {
            const data = await res.json();
            setCurrentAnalysis(data.analysis);
            setIsDemoMode(true);
          }
        }
      } catch (err) {
        console.error('Error restoring initial analysis:', err);
      }
    };

    fetchInitial();
  }, [token]);

  // Upload Real PDF Resume with sequential loading milestones
  const uploadResumeFile = async (file: File): Promise<{ success: boolean; error?: string }> => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisStep(1);

    // Simulate multi-step progress steps while processing
    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => (prev < 6 ? prev + 1 : prev));
    }, 900);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (!res.ok || !data.success || !data.analysis) {
        setIsAnalyzing(false);
        const errorMsg = data.error || 'Unable to analyze this resume.';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Step 7: Completed
      setAnalysisStep(7);
      await new Promise(r => setTimeout(r, 600));

      // Real analysis successfully processed!
      setCurrentAnalysis(data.analysis);
      setIsDemoMode(false);
      localStorage.setItem(IS_DEMO_KEY, 'false');
      localStorage.setItem(LAST_ANALYSIS_KEY, data.analysisId);

      setIsAnalyzing(false);
      return { success: true };
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      const errMsg = err?.message || 'Network error while uploading resume.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  // Explicit Demo Mode ONLY - activated when user clicks "Try Demo" or "Explore Demo"
  const loadDemoMode = async (): Promise<void> => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisStep(1);

    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => (prev < 6 ? prev + 1 : prev));
    }, 400);

    try {
      const res = await fetch('/api/analysis/demo');
      const data = await res.json();
      clearInterval(stepInterval);

      if (data.analysis) {
        setAnalysisStep(7);
        await new Promise(r => setTimeout(r, 400));
        setCurrentAnalysis(data.analysis);
        setIsDemoMode(true);
        localStorage.setItem(IS_DEMO_KEY, 'true');
        localStorage.setItem(LAST_ANALYSIS_KEY, 'demo');
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error('Failed to load demo mode:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadAnalysisById = async (id: string): Promise<void> => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/analysis/${id}`, { headers });
      const data = await res.json();
      if (data.analysis) {
        setCurrentAnalysis(data.analysis);
        setIsDemoMode(Boolean(data.isDemo));
        localStorage.setItem(IS_DEMO_KEY, String(Boolean(data.isDemo)));
        localStorage.setItem(LAST_ANALYSIS_KEY, id);
      }
    } catch (err) {
      console.error('Failed to load analysis:', err);
    }
  };

  const updateProgress = async (id: string, type: 'skill' | 'project' | 'roadmap', status: any) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/progress/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ type, status }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          setProgress(data.progress);
        }
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const clearError = () => setError(null);

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        isDemoMode,
        isAnalyzing,
        analysisStep,
        error,
        uploadResumeFile,
        loadDemoMode,
        loadAnalysisById,
        clearError,
        progress,
        updateProgress,
        selectedProjectId,
        setSelectedProjectId,
        compareCareerRoleIds,
        setCompareCareerRoleIds,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
