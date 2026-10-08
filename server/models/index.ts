import { getDB, saveLocalDB, generateObjectId } from '../config/db';
import {
  IUser,
  IResume,
  ISkill,
  ICareerRole,
  IProject,
  ILearningResource,
  IAnalysis,
  IProgress,
  IAssessment,
  IProjectSubmission,
  ICodingProblem
} from './types';

export class Collection<T extends { _id: string }> {
  constructor(private collectionName: keyof ReturnType<typeof getDB>) {}

  private getItems(): T[] {
    const db = getDB();
    return (db[this.collectionName] as T[]) || [];
  }

  find(predicate?: (item: T) => boolean): T[] {
    const items = this.getItems();
    if (!predicate) return [...items];
    return items.filter(predicate);
  }

  findOne(predicate: (item: T) => boolean): T | null {
    const items = this.getItems();
    const found = items.find(predicate);
    return found ? { ...found } : null;
  }

  findById(id: string): T | null {
    return this.findOne(item => item._id === id);
  }

  create(data: Omit<T, '_id'> & { _id?: string }): T {
    const items = this.getItems();
    const newItem = {
      ...data,
      _id: data._id || generateObjectId(),
    } as T;
    items.push(newItem);
    saveLocalDB();
    return { ...newItem };
  }

  updateOne(predicate: (item: T) => boolean, update: Partial<T>): T | null {
    const items = this.getItems();
    const index = items.findIndex(predicate);
    if (index === -1) return null;
    items[index] = { ...items[index], ...update };
    saveLocalDB();
    return { ...items[index] };
  }

  findByIdAndUpdate(id: string, update: Partial<T>): T | null {
    return this.updateOne(item => item._id === id, update);
  }

  deleteOne(predicate: (item: T) => boolean): boolean {
    const items = this.getItems();
    const index = items.findIndex(predicate);
    if (index === -1) return false;
    items.splice(index, 1);
    saveLocalDB();
    return true;
  }
}

export const Users = new Collection<IUser>('users');
export const Resumes = new Collection<IResume>('resumes');
export const Skills = new Collection<ISkill>('skills');
export const CareerRoles = new Collection<ICareerRole>('careerRoles');
export const Projects = new Collection<IProject>('projects');
export const LearningResources = new Collection<ILearningResource>('learningResources');
export const Analyses = new Collection<IAnalysis>('analyses');
export const ProgressCollection = new Collection<IProgress>('progress');
export const Assessments = new Collection<IAssessment>('assessments');
export const ProjectSubmissions = new Collection<IProjectSubmission>('projectSubmissions');
export const CodingProblems = new Collection<ICodingProblem>('codingProblems');

export * from './types';
