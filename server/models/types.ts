export interface IUser {
  _id: string;
  name: string;
  email: string;
  passwordHash?: string;
  targetCareerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResume {
  _id: string;
  userId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  extractedText: string;
  charCount: number;
  wordCount: number;
  createdAt: string;
}

export interface ISkill {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'ai_ml' | 'languages' | 'tools' | 'soft_skills';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  demandScore: number;
}

export interface ICareerRole {
  _id: string;
  title: string;
  category: string;
  summary: string;
  growthRate: string;
  avgSalary: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced';
  requiredSkills: string[];
  optionalSkills: string[];
  learningRoadmap: {
    stage: string;
    description: string;
    skills: string[];
  }[];
  suggestedProjectIds: string[];
}

export interface IProject {
  _id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  skillsGained: string[];
  techStack: string[];
  whyRecommended: string;
  features: string[];
  resumeValue: string;
  prerequisites: string[];
  goal: string;
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    auth?: string;
    ai?: string;
    deployment?: string;
    services?: string;
    broker?: string;
    caching?: string;
  };
  milestones: {
    title: string;
    tasks: string[];
  }[];
  interviewQuestions: {
    question: string;
    sampleAnswer: string;
  }[];
  resumeBulletPoints: string[];
  relevanceScore?: number;
  skillImpactScore?: number;
  resumeImpactScore?: number;
}

export interface ILearningResource {
  _id: string;
  skill: string;
  title: string;
  provider: string;
  url: string;
  type: 'documentation' | 'course' | 'interactive' | 'tutorial';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tier: 'Learn Now' | 'Learn Next' | 'Optional';
  estimatedTime: string;
  reason: string;
}

export interface ISkillEvidence {
  skill: string;
  detected: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Not Detected';
  evidence: string;
  proficiencyScore: number; // 0 to 100
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  priorityReason?: string;
}

export interface IAnalysis {
  _id: string;
  userId: string;
  resumeId: string;
  isDemo: boolean;
  timestamp: string;
  careerReadinessScore: number; // 0 to 100
  readinessBreakdown: {
    technicalSkills: number;
    projects: number;
    experience: number;
    careerAlignment: number;
    interviewReadiness: number;
  };
  topCareerMatch: {
    roleId: string;
    title: string;
    matchPercentage: number;
    whyFits: string;
    strongSkills: string[];
    missingSkills: string[];
    careerGrowth: string;
    learningEffort: string;
  };
  alternativeCareers: {
    title: string;
    matchPercentage: number;
    skillGapCount: number;
  }[];
  skillsDetected: ISkillEvidence[];
  skillGaps: {
    skill: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    reason: string;
    timeToLearn: string;
  }[];
  nextBestAction: {
    title: string;
    reason: string;
    projectId?: string;
    actionType: 'project' | 'course' | 'practice';
    buttonText: string;
  };
  recommendedProjects: IProject[];
  progressionRoadmap: {
    step: number;
    stage: 'You Are Here' | 'Beginner Project' | 'Intermediate Project' | 'Advanced Project' | 'Portfolio Ready' | 'Interview Ready' | 'Job Ready';
    title: string;
    description: string;
    status: 'completed' | 'in_progress' | 'upcoming';
  }[];
  jobReadiness: {
    technicalReadiness: number;
    projectReadiness: number;
    resumeReadiness: number;
    interviewReadiness: number;
    biggestBlocker: string;
  };
  careerPathGraph: {
    nodes: { id: string; label: string; type: string }[];
    edges: { from: string; to: string; label?: string }[];
  };
}

export interface IProgress {
  _id: string;
  userId: string;
  skillStatus: Record<string, 'not_started' | 'learning' | 'completed'>;
  projectStatus: Record<string, 'not_started' | 'learning' | 'completed'>;
  completedRoadmapSteps: number[];
  solvedProblemIds?: string[];
  updatedAt: string;
}

export interface IProjectSubmission {
  _id: string;
  userId: string;
  projectId: string;
  githubUrl: string;
  liveDemoUrl?: string;
  notes?: string;
  submittedAt: string;
  evaluation: {
    score: number; // 0 to 100
    status: 'PASSED' | 'NEEDS_REVISION';
    grade: string;
    strengths: string[];
    improvements: string[];
    architectureReview: string;
    securityCheck: string;
    interviewTip: string;
  };
}

export interface ICodingProblem {
  _id: string;
  title: string;
  platform: 'LeetCode' | 'NeetCode' | 'HackerRank' | 'BigFrontend';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skill: string;
  category: string;
  url: string;
  whyRecommended: string;
  estimatedMinutes: number;
}

export interface IAssessment {
  _id: string;
  userId: string;
  answers: Record<string, string>;
  dimensions: {
    problemSolving: number;
    technicalInterest: number;
    analyticalThinking: number;
    creativity: number;
    communication: number;
    preferredWorkStyle: string;
  };
  recommendedRoleTitles: string[];
  createdAt: string;
}
