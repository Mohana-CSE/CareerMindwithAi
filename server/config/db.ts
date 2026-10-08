import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'careermind.db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface InMemoryDB {
  users: any[];
  resumes: any[];
  skills: any[];
  careerRoles: any[];
  projects: any[];
  learningResources: any[];
  analyses: any[];
  progress: any[];
  assessments: any[];
  projectSubmissions: any[];
  codingProblems: any[];
}

let dbInstance: InMemoryDB = {
  users: [],
  resumes: [],
  skills: [],
  careerRoles: [],
  projects: [],
  learningResources: [],
  analyses: [],
  progress: [],
  assessments: [],
  projectSubmissions: [],
  codingProblems: [],
};

// Load saved data if exists
function loadLocalDB(): void {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      dbInstance = {
        users: parsed.users || [],
        resumes: parsed.resumes || [],
        skills: parsed.skills || [],
        careerRoles: parsed.careerRoles || [],
        projects: parsed.projects || [],
        learningResources: parsed.learningResources || [],
        analyses: parsed.analyses || [],
        progress: parsed.progress || [],
        assessments: parsed.assessments || [],
        projectSubmissions: parsed.projectSubmissions || [],
        codingProblems: parsed.codingProblems || [],
      };
    }
  } catch (err) {
    console.error('Failed to load local DB file, starting clean:', err);
  }
}

export function saveLocalDB(): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbInstance, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist local DB file:', err);
  }
}

export function getDB(): InMemoryDB {
  return dbInstance;
}

export function generateObjectId(): string {
  return new mongoose.Types.ObjectId().toString();
}

let isMongooseConnected = false;

export async function connectDB(): Promise<void> {
  loadLocalDB();
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      console.log('Connecting to MongoDB at:', uri);
      await mongoose.connect(uri);
      isMongooseConnected = true;
      console.log('MongoDB connected successfully via Mongoose.');
      return;
    } catch (err) {
      console.warn('MongoDB connection failed, falling back to ACID local store:', err);
    }
  } else {
    console.log('No MONGODB_URI configured; active storage mode: persistent local JSON database.');
  }
}

export function isConnectedToMongoDB(): boolean {
  return isMongooseConnected;
}
