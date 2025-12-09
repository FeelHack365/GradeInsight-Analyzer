export interface SubjectEvaluation {
  subject: string;
  score: number;
  comment: string;
}

export interface VisualizationData {
  subjects: string[];
  scores: number[];
  average: number;
  radar_chart: { subject: string; score: number; fullMark: number }[];
}

export interface GradeReport {
  studentName: string;
  className: string;
  totalScore: number;
  averageScore: number;
  summaryComment: string;
  subjectComparisons: string; // e.g., "High score in English, needs improvement in Math"
  subjectEvaluations: SubjectEvaluation[];
  improvementPoints: string[];
  visualizationData: VisualizationData;
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}