export type ParaType = 'project' | 'area' | 'resource' | 'archive';

export interface Note {
  id: number;
  title: string;
  content: string;
  para_id: number | null;
  tags: string[];
  stage: 'capture' | 'organize' | 'distill' | 'express';
  created_at: string;
  updated_at: string;
}

export interface ParaItem {
  id: number;
  type: ParaType;
  title: string;
  description: string;
  status?: 'active' | 'completed' | 'archived';
  due_date?: string;
}
