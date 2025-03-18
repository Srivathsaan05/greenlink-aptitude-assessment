
export interface Question {
  id: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  timeLimit?: number; // Time in seconds to answer the question
}
