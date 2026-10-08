import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TestTube2,
  RefreshCw,
  Code,
  Database,
  Cpu
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

interface UploadPageProps {
  onNavigate: (page: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onNavigate }) => {
  const { uploadResumeFile, loadDemoMode, error, clearError } = useAnalysis();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sampleUploading, setSampleUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    clearError();
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext || '')) {
      alert('Please upload a valid PDF, DOCX, DOC, or TXT resume document.');
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmitUpload = async () => {
    if (!selectedFile) return;
    const res = await uploadResumeFile(selectedFile);
    if (res.success) {
      onNavigate('dashboard');
    }
  };

  // Sample Resume Quick-Test Buttons
  const handleSampleResume = async (type: 'frontend' | 'java' | 'ai') => {
    setSampleUploading(type);
    clearError();

    let sampleText = '';
    let filename = '';

    if (type === 'frontend') {
      filename = 'Alex_Rivera_Frontend_Developer_Resume.txt';
      sampleText = `ALEX RIVERA
Frontend Web Engineer | React & TypeScript Specialist
Email: alex.rivera@example.com | Portfolio: github.com/alexrivera-dev

SUMMARY:
Passionate Frontend Developer with 3+ years of experience engineering responsive, high-performance web applications using React, TypeScript, JavaScript ES6+, and Tailwind CSS. Strong expertise in component architecture, state management, and modern DOM optimization.

SKILLS:
• Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SCSS
• Libraries & Frameworks: React, Next.js, Redux Toolkit, Tailwind CSS, Jest, React Testing Library
• Tools & Platforms: Git, GitHub, Vite, Webpack, Figma, npm

EXPERIENCE:
Frontend Engineer | PixelCraft Solutions (2023 - Present)
• Built interactive client-facing dashboards in React and TypeScript, improving user engagement by 35%.
• Implemented responsive UI layouts and dark mode themes utilizing modern Tailwind CSS utility classes.
• Refactored legacy monolithic JavaScript codebase to modular React functional components and custom hooks.

Junior Web Developer | Apex Studio (2021 - 2023)
• Developed responsive landing pages and interactive forms using HTML5, CSS3, and modern vanilla JavaScript.
• Collaborated in Git branching workflows, pull requests, and peer code reviews.

PROJECTS:
• Responsive SaaS Task Manager: Developed an interactive Kanban sprint board in React with drag-and-drop state.
• E-Commerce Storefront SPA: Built a full responsive shopping catalog in Next.js with client-side cart caching.`;
    } else if (type === 'java') {
      filename = 'Siddharth_Sharma_Java_Backend_Resume.txt';
      sampleText = `SIDDHARTH SHARMA
Senior Java & Enterprise Backend Developer
Email: siddharth.sharma@example.com | LinkedIn: linkedin.com/in/siddharth-backend

SUMMARY:
Backend Engineer with 4 years of enterprise software engineering experience specialized in Core Java, Spring Boot, REST APIs, Microservices, and Relational Database management with PostgreSQL and Hibernate JPA.

SKILLS:
• Languages: Java 17, SQL, Bash
• Frameworks: Spring Boot, Spring Data JPA, Hibernate, Spring Security, JUnit 5
• Databases & Messaging: PostgreSQL, MySQL, Apache Kafka, Redis, Maven
• Infrastructure: Docker, Git, Linux, RESTful Web Services

EXPERIENCE:
Backend Software Engineer | Enterprise FinTech Corp (2022 - Present)
• Architected high-throughput RESTful microservices in Java and Spring Boot processing over 50,000 daily transaction requests.
• Optimized PostgreSQL relational schemas, queries, and connection pools, reducing query latency by 42%.
• Implemented distributed messaging with Apache Kafka for asynchronous order event broadcasting and audit logging.

Software Developer | DataSync Systems (2020 - 2022)
• Developed core Java OOP modules for batch ETL pipelines and automated banking statement reconciliations.
• Wrote unit and integration test suites using JUnit and Mockito achieving 88% test coverage.

PROJECTS:
• Microservices Payment Gateway: Built Spring Boot services with JWT token authentication and Kafka event streaming.
• Student & Academic Database API: Designed normalized 3NF PostgreSQL database with stored procedures and Spring Data JPA.`;
    } else {
      filename = 'Maya_Chen_AI_Machine_Learning_Resume.txt';
      sampleText = `MAYA CHEN
AI & Machine Learning Engineer | LLMs & Data Science
Email: maya.chen@example.com | GitHub: github.com/mayachen-ai

SUMMARY:
Data Scientist and AI Engineer with deep expertise in Python, Machine Learning, Deep Learning, Natural Language Processing, and LLM orchestration (LangChain, Vector DBs, RAG). Passionate about turning complex datasets into intelligent inference systems.

SKILLS:
• Languages: Python, SQL, R
• Machine Learning & AI: PyTorch, Scikit-Learn, Pandas, NumPy, Hugging Face, LLMs, Embeddings, LangChain
• Data & Vector DBs: ChromaDB, Pinecone, PostgreSQL, Matplotlib, Seaborn
• Tools: FastAPI, Docker, Git, Jupyter Notebooks

EXPERIENCE:
AI Research & Development Engineer | NeuralVanguard Labs (2023 - Present)
• Engineered end-to-end Retrieval-Augmented Generation (RAG) pipelines in Python and FastAPI utilizing dense vector embeddings.
• Implemented prompt engineering and evaluation benchmarks for LLM models, improving domain reasoning accuracy by 28%.
• Trained classification and predictive models with PyTorch and Scikit-Learn on multi-million row datasets.

Data Science Analyst | InsightAnalytics Group (2021 - 2023)
• Built statistical models, conducted A/B testing, and designed executive dashboards using Python, Pandas, and SQL.
• Cleaned, normalized, and pre-processed terabytes of messy unstructured customer behavioral data.

PROJECTS:
• Enterprise RAG Knowledge Search: Built semantic document search using Gemini embeddings, ChromaDB, and FastAPI.
• Predictive Customer Churn Engine: Trained Random Forest and XGBoost classifiers with Scikit-Learn and evaluated with ROC-AUC.`;
    }

    const file = new File([sampleText], filename, { type: 'text/plain' });
    const res = await uploadResumeFile(file);
    setSampleUploading(null);
    if (res.success) {
      onNavigate('dashboard');
    }
  };

  const handleTryDemo = async () => {
    await loadDemoMode();
    onNavigate('dashboard');
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real PDF / Document Parsing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Upload Your Resume
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Upload your real PDF or Word resume. Our AI parser extracts your actual skills, projects, and work experience with zero demo fallback.
        </p>
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Unable to analyze this resume.</h4>
              <p className="text-xs mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-500/20">
            <button
              onClick={() => {
                clearError();
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Analysis
            </button>
            <button
              onClick={handleTryDemo}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-amber-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <TestTube2 className="w-3.5 h-3.5 text-amber-500" />
              Try Demo Instead
            </button>
          </div>
        </div>
      )}

      {/* Upload Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500/60 bg-white/70 dark:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-4 max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {selectedFile ? selectedFile.name : 'Choose a file or drag & drop'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedFile
                ? `${(selectedFile.size / 1024).toFixed(1)} KB — Ready to analyze`
                : 'Supports text-based PDF, DOCX, DOC, or TXT (Up to 10MB)'}
            </p>
          </div>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-slate-950 transition-all cursor-pointer shadow-xs"
          >
            {selectedFile ? 'Change File' : 'Browse Computer'}
          </button>
        </div>
      </div>

      {/* Upload Action Button */}
      {selectedFile && (
        <div className="flex justify-center animate-in fade-in">
          <button
            onClick={handleSubmitUpload}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
          >
            Analyze {selectedFile.name}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Testing Profiles - Explicitly required in Testing section */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TestTube2 className="w-4 h-4 text-emerald-500" />
              Quick-Test Resumes (Verify Different Career Profiles)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test how real parsing extracts distinct skills, career matches, and roadmaps for 3 different developer resumes:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSampleResume('frontend')}
            disabled={sampleUploading !== null}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-left transition-all cursor-pointer group disabled:opacity-50"
          >
            <div className="flex items-center gap-2 mb-1">
              <Code className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Resume A: Frontend
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              React, TypeScript, Next.js, Redux, CSS. Target: Frontend / Full Stack.
            </p>
            <span className="text-[10px] font-semibold text-emerald-500 mt-2 block group-hover:underline">
              {sampleUploading === 'frontend' ? 'Analyzing...' : 'Test This Resume →'}
            </span>
          </button>

          <button
            onClick={() => handleSampleResume('java')}
            disabled={sampleUploading !== null}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left transition-all cursor-pointer group disabled:opacity-50"
          >
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Resume B: Java Backend
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Java, Spring Boot, PostgreSQL, Kafka, Microservices. Target: Backend.
            </p>
            <span className="text-[10px] font-semibold text-indigo-500 mt-2 block group-hover:underline">
              {sampleUploading === 'java' ? 'Analyzing...' : 'Test This Resume →'}
            </span>
          </button>

          <button
            onClick={() => handleSampleResume('ai')}
            disabled={sampleUploading !== null}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left transition-all cursor-pointer group disabled:opacity-50"
          >
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Resume C: AI & ML
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Python, PyTorch, LangChain, RAG, Scikit-Learn. Target: AI Engineer.
            </p>
            <span className="text-[10px] font-semibold text-teal-500 mt-2 block group-hover:underline">
              {sampleUploading === 'ai' ? 'Analyzing...' : 'Test This Resume →'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
