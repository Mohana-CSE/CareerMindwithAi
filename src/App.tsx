import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';
import { TechnologyBackground } from './components/TechnologyBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareersPage } from './pages/CareersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CoursesPage } from './pages/CoursesPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AnalysisLoadingModal } from './components/AnalysisLoadingModal';
import { AuthModal } from './pages/AuthModal';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const { selectedProjectId, setSelectedProjectId } = useAnalysis();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'upload':
        return <UploadPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'careers':
        return <CareersPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'assessment':
        return <AssessmentPage onNavigate={setCurrentPage} />;
      case 'history':
        return <HistoryPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300 relative selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* Decorative Developer-Themed Background */}
      <TechnologyBackground />

      {/* Main Navbar */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Body View */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* SaaS Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Global Interactive Modals */}
      <AnalysisLoadingModal />
      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnalysisProvider>
          <MainApp />
        </AnalysisProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
