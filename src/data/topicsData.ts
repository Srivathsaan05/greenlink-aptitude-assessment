
import { BookCheck, Brain, Calculator, ChartBar, ClipboardCheck, FileSpreadsheet, Languages, Percentage, Repeat, Users } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  difficulties: Difficulty[];
  questionsCount: number;
}

export const topics: Topic[] = [
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    description: 'Enhance your critical thinking skills with puzzles and logical problems.',
    icon: Brain,
    color: 'bg-blue-50 text-blue-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'quantitative-aptitude',
    title: 'Quantitative Aptitude',
    description: 'Master mathematical problems that assess your numerical abilities.',
    icon: Calculator,
    color: 'bg-purple-50 text-purple-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'verbal-ability',
    title: 'Verbal Ability',
    description: 'Improve your language proficiency and communication skills.',
    icon: Languages,
    color: 'bg-amber-50 text-amber-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'hcf-lcm',
    title: 'HCF and LCM',
    description: 'Practice problems related to Highest Common Factor and Least Common Multiple.',
    icon: ClipboardCheck,
    color: 'bg-green-50 text-green-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'blood-relations',
    title: 'Blood Relations',
    description: 'Test your ability to understand complex family relationships.',
    icon: Users,
    color: 'bg-red-50 text-red-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'percentages',
    title: 'Percentages',
    description: 'Master problems involving percentage calculations and applications.',
    icon: Percentage,
    color: 'bg-indigo-50 text-indigo-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  },
  {
    id: 'ratio-proportions',
    title: 'Ratio and Proportions',
    description: 'Learn to solve problems involving ratios, proportions, and variations.',
    icon: Repeat,
    color: 'bg-teal-50 text-teal-600',
    difficulties: ['easy', 'medium', 'hard'],
    questionsCount: 25
  }
];

export const getDifficultyLabel = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return 'Unknown';
  }
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getTopicById = (id: string): Topic | undefined => {
  return topics.find(topic => topic.id === id);
};
