
export interface DoubtRecord {
  id: string;
  question: string;
  answer: string;
  subject: string;
  timestamp: number;
  type: 'chat' | 'explanation' | 'practice' | 'code';
}

export type Subject = 'C' | 'Java' | 'DBMS' | 'OS' | 'Mathematics' | 'Data Structures' | 'Algorithms' | 'General';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  criteria: string;
}

export interface UserStats {
  points: number;
  level: number;
  badges: Badge[];
  doubtCount: number;
  practiceCount: number;
  codeCount: number;
  subjectCounts: Record<string, number>;
}

export type ThemeType = 'light' | 'midnight' | 'sepia' | 'ocean' | 'forest';
