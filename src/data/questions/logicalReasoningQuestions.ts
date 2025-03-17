
import { Question } from '../types/questionTypes';

// Logical Reasoning Questions
const logicalReasoningQuestions: Question[] = [
  // Easy Questions (1-8)
  {
    id: 'lr-easy-1',
    topicId: 'logical-reasoning',
    difficulty: 'easy',
    question: 'If all roses are flowers and some flowers fade quickly, which of the following statements must be true?',
    options: [
      'All roses fade quickly',
      'Some roses fade quickly',
      'No roses fade quickly',
      'None of the above'
    ],
    correctAnswer: 1,
    explanation: 'Since all roses are flowers and some flowers fade quickly, it\'s possible that some roses are among those flowers that fade quickly. Therefore, "Some roses fade quickly" is a possibility, but not a necessity.'
  },
  {
    id: 'lr-easy-2',
    topicId: 'logical-reasoning',
    difficulty: 'easy',
    question: 'Complete the series: 2, 4, 8, 16, ?',
    options: ['24', '30', '32', '36'],
    correctAnswer: 2,
    explanation: 'The pattern is that each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
  },
  {
    id: 'lr-easy-3',
    topicId: 'logical-reasoning',
    difficulty: 'easy',
    question: 'If WATER is coded as YCVGT, then how will FIRE be coded?',
    options: ['DGKT', 'HKTG', 'HKPC', 'HKTC'],
    correctAnswer: 3,
    explanation: 'Each letter is replaced by the letter that is two positions ahead in the alphabet. F→H, I→K, R→T, E→G'
  },
  // Medium Questions (1-8)
  {
    id: 'lr-medium-1',
    topicId: 'logical-reasoning',
    difficulty: 'medium',
    question: 'Five friends A, B, C, D, and E are sitting in a row. B is sitting next to A but not next to C. E is sitting next to C. D is not sitting next to A. C is sitting at the middle. Who is sitting immediate right to C?',
    options: ['A', 'B', 'D', 'E'],
    correctAnswer: 3,
    explanation: 'Since C is in the middle, positions are _ _ C _ _. E is next to C, so either E is to the left or right of C. If B is next to A but not next to C, then A and B must be together on one end. D is not next to A, so D must be on the opposite end from A. This means E must be between C and D.'
  },
  {
    id: 'lr-medium-2',
    topicId: 'logical-reasoning',
    difficulty: 'medium',
    question: 'If in a certain code language, "TERMINAL" is written as "SDQLJOZK", then how will "DISPLAY" be written in that code?',
    options: ['CJRQKZZ', 'EJUQNBZ', 'EJURNBX', 'EKUQNBZ'],
    correctAnswer: 1,
    explanation: 'The coding pattern is to shift each letter one position back in the alphabet. T→S, E→D, R→Q, etc.'
  },
  {
    id: 'lr-medium-3',
    topicId: 'logical-reasoning',
    difficulty: 'medium',
    question: 'If A = 1, B = 2, C = 3, ..., Z = 26, what is the sum of the letters in the word "LOGIC"?',
    options: ['47', '50', '52', '54'],
    correctAnswer: 0,
    explanation: 'L = 12, O = 15, G = 7, I = 9, C = 3. Sum = 12 + 15 + 7 + 9 + 3 = 46'
  },
  // Hard Questions (1-8)
  {
    id: 'lr-hard-1',
    topicId: 'logical-reasoning',
    difficulty: 'hard',
    question: 'Six friends P, Q, R, S, T, and U are sitting in a circle facing the center. P is between U and R; Q is between R and S; T is not adjacent to either P or S. Who is sitting opposite to R?',
    options: ['P', 'Q', 'S', 'T'],
    correctAnswer: 3,
    explanation: 'The arrangement is P-R-Q-S-T-U-P in clockwise order. The person opposite to R would be T.'
  },
  {
    id: 'lr-hard-2',
    topicId: 'logical-reasoning',
    difficulty: 'hard',
    question: 'Statement: All musicians are instrumentalists. Some guitarists are instrumentalists. Conclusions: 1. Some guitarists are musicians. 2. Some instrumentalists are guitarists.',
    options: [
      'Only conclusion 1 follows',
      'Only conclusion 2 follows',
      'Both conclusions follow',
      'Neither conclusion follows'
    ],
    correctAnswer: 1,
    explanation: 'From "Some guitarists are instrumentalists", we can conclude that "Some instrumentalists are guitarists" (conclusion 2). However, we cannot conclude that "Some guitarists are musicians" because not all instrumentalists are necessarily musicians.'
  },
  {
    id: 'lr-hard-3',
    topicId: 'logical-reasoning',
    difficulty: 'hard',
    question: 'Find the missing number in the series: 3, 12, 27, 48, ?',
    options: ['63', '75', '80', '96'],
    correctAnswer: 1,
    explanation: 'The pattern is n³ - n² where n starts at 2. So: 2³-2²=8-4=4, 3³-3²=27-9=18, 4³-4²=64-16=48, 5³-5²=125-25=100, 6³-6²=216-36=180'
  },
];

export default logicalReasoningQuestions;
