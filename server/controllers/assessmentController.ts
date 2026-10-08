import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Assessments, CareerRoles } from '../models';

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    dimension: 'technicalInterest',
    question: 'When starting a new software project, which layer do you enjoy crafting the most?',
    options: [
      { id: 'a', text: 'Crafting responsive user interfaces, animations, and intuitive micro-interactions.', score: { frontend: 3, fullstack: 2 } },
      { id: 'b', text: 'Designing database schemas, high-throughput REST APIs, and server caching.', score: { backend: 3, fullstack: 2 } },
      { id: 'c', text: 'Integrating intelligent LLMs, fine-tuning neural networks, or prompt engineering pipelines.', score: { ai: 3, ml: 2 } },
      { id: 'd', text: 'Automating CI/CD pipelines, Docker containers, and cloud infrastructure reliability.', score: { devops: 3, cloud: 2 } },
    ],
  },
  {
    id: 'q2',
    dimension: 'problemSolving',
    question: 'How do you approach an unexpected system bug or performance bottleneck?',
    options: [
      { id: 'a', text: 'Inspect browser dev tools, component re-renders, and network waterfall cascades.', score: { frontend: 3 } },
      { id: 'b', text: 'Analyze server CPU profiles, query execution plans (EXPLAIN ANALYZE), and locks.', score: { backend: 3, database: 2 } },
      { id: 'c', text: 'Evaluate training loss curves, vector similarity distances, and precision/recall metrics.', score: { ai: 3, ml: 3 } },
      { id: 'd', text: 'Review Docker logs, Kubernetes pod events, and network firewall policies.', score: { devops: 3, security: 2 } },
    ],
  },
  {
    id: 'q3',
    dimension: 'analyticalThinking',
    question: 'Which type of data problem excites you most?',
    options: [
      { id: 'a', text: 'Building visual dashboards and graphs that transform raw numbers into business decisions.', score: { data_analyst: 3, frontend: 1 } },
      { id: 'b', text: 'Uncovering statistical trends, causal inference, and building predictive forecasting models.', score: { data_scientist: 3, ml: 2 } },
      { id: 'c', text: 'Normalizing complex multi-tenant relational schemas with foreign key constraints.', score: { backend: 3, database: 3 } },
      { id: 'd', text: 'Indexing millions of high-dimensional embeddings for sub-millisecond semantic retrieval.', score: { ai: 3, backend: 2 } },
    ],
  },
  {
    id: 'q4',
    dimension: 'creativity',
    question: 'Where does your technical creativity shine best?',
    options: [
      { id: 'a', text: 'Modern design aesthetics, smooth typography, and accessible UI interactions.', score: { frontend: 3, mobile: 2 } },
      { id: 'b', text: 'Designing clean domain-driven service boundaries and decoupled microservices.', score: { backend: 3, fullstack: 2 } },
      { id: 'c', text: 'Prompting multi-agent workflows that solve ambiguous natural language challenges.', score: { ai: 3 } },
      { id: 'd', text: 'Hardening attack surfaces and anticipating adversarial penetration vectors.', score: { security: 3 } },
    ],
  },
  {
    id: 'q5',
    dimension: 'preferredWorkStyle',
    question: 'What type of engineering environment do you thrive in?',
    options: [
      { id: 'a', text: 'Fast-paced product teams where UI changes directly impact customer happiness daily.', score: { frontend: 2, fullstack: 2 } },
      { id: 'b', text: 'Core infrastructure teams where uptime, 99.99% availability, and scale matter most.', score: { devops: 3, backend: 2 } },
      { id: 'c', text: 'Cutting-edge innovation labs exploring generative AI, embeddings, and autonomous agents.', score: { ai: 3, ml: 2 } },
      { id: 'd', text: 'Security and compliance teams defending mission-critical infrastructure against threats.', score: { security: 3 } },
    ],
  },
  {
    id: 'q6',
    dimension: 'communication',
    question: 'When presenting your work, what story do you like to tell?',
    options: [
      { id: 'a', text: 'Demonstrating the live interactive app flow and user delight.', score: { frontend: 2, mobile: 2 } },
      { id: 'b', text: 'Explaining how response times were slashed from 450ms down to 18ms under peak load.', score: { backend: 3 } },
      { id: 'c', text: 'Sharing model evaluation benchmarks and automated reasoning accuracy gains.', score: { ai: 3, data_scientist: 2 } },
      { id: 'd', text: 'Highlighting zero-downtime blue/green rollouts and automated disaster recovery.', score: { devops: 3 } },
    ],
  },
];

export async function getAssessmentQuestions(_req: AuthenticatedRequest, res: Response) {
  return res.json({
    success: true,
    questions: ASSESSMENT_QUESTIONS,
  });
}

export async function submitAssessment(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?._id || 'guest-user';
    const { answers } = req.body; // map of qId -> optionId ('a', 'b', 'c', 'd')

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, error: 'Valid answers map required.' });
    }

    const scores: Record<string, number> = {
      frontend: 0,
      backend: 0,
      fullstack: 0,
      ai: 0,
      ml: 0,
      data_analyst: 0,
      data_scientist: 0,
      devops: 0,
      cloud: 0,
      security: 0,
      mobile: 0,
    };

    for (const q of ASSESSMENT_QUESTIONS) {
      const chosenOptionId = answers[q.id];
      const opt = q.options.find(o => o.id === chosenOptionId);
      if (opt && opt.score) {
        for (const [key, val] of Object.entries(opt.score)) {
          scores[key] = (scores[key] || 0) + val;
        }
      }
    }

    // Map top domain scores to actual career role titles
    const scoreToRoles: Record<string, string> = {
      frontend: 'Frontend Developer',
      backend: 'Backend Developer',
      fullstack: 'Full Stack Developer',
      ai: 'AI Engineer',
      ml: 'ML Engineer',
      data_analyst: 'Data Analyst',
      data_scientist: 'Data Scientist',
      devops: 'DevOps Engineer',
      cloud: 'Cloud Engineer',
      security: 'Cybersecurity Analyst',
      mobile: 'Mobile Developer',
    };

    const sortedDomains = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topRecommendedTitles = sortedDomains.slice(0, 3).map(([key]) => scoreToRoles[key] || 'Full Stack Developer');

    const saved = Assessments.create({
      userId,
      answers,
      dimensions: {
        problemSolving: Math.round(75 + (scores.backend + scores.ai) * 2),
        technicalInterest: Math.round(80 + (scores.fullstack + scores.frontend) * 2),
        analyticalThinking: Math.round(70 + (scores.data_analyst + scores.data_scientist) * 2),
        creativity: Math.round(82 + (scores.frontend + scores.ai) * 2),
        communication: 80,
        preferredWorkStyle: sortedDomains[0]?.[0] || 'fullstack',
      },
      recommendedRoleTitles: topRecommendedTitles,
      createdAt: new Date().toISOString(),
    });

    return res.json({
      success: true,
      assessment: saved,
      topRecommendedTitles,
    });
  } catch (err: any) {
    console.error('Submit assessment error:', err);
    return res.status(500).json({ success: false, error: 'Failed to process assessment.' });
  }
}
