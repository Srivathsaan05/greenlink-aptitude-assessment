
export interface Question {
  id: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

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

// Quantitative Aptitude Questions
const quantitativeAptitudeQuestions: Question[] = [
  // Easy Questions (1-8)
  {
    id: 'qa-easy-1',
    topicId: 'quantitative-aptitude',
    difficulty: 'easy',
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '25% of 80 = 0.25 × 80 = 20'
  },
  {
    id: 'qa-easy-2',
    topicId: 'quantitative-aptitude',
    difficulty: 'easy',
    question: 'If a train travels at 60 km/hr, how far will it travel in 2.5 hours?',
    options: ['120 km', '150 km', '180 km', '200 km'],
    correctAnswer: 1,
    explanation: 'Distance = Speed × Time = 60 km/hr × 2.5 hr = 150 km'
  },
  {
    id: 'qa-easy-3',
    topicId: 'quantitative-aptitude',
    difficulty: 'easy',
    question: 'Find the average of 15, 20, 25, 30, and 35.',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1,
    explanation: 'Average = Sum/Count = (15+20+25+30+35)/5 = 125/5 = 25'
  },
  // Medium Questions (1-8)
  {
    id: 'qa-medium-1',
    topicId: 'quantitative-aptitude',
    difficulty: 'medium',
    question: 'A car travels a certain distance at 40 km/hr and returns at 60 km/hr. Find the average speed for the entire journey.',
    options: ['45 km/hr', '48 km/hr', '50 km/hr', '52 km/hr'],
    correctAnswer: 1,
    explanation: 'Average speed = Total distance / Total time = 2d / (d/40 + d/60) = 2d / (3d/120 + 2d/120) = 2d / (5d/120) = 2 × 120 / 5 = 48 km/hr'
  },
  {
    id: 'qa-medium-2',
    topicId: 'quantitative-aptitude',
    difficulty: 'medium',
    question: 'If 8 men can complete a work in 20 days, then in how many days can 10 men complete the same work?',
    options: ['12 days', '16 days', '18 days', '24 days'],
    correctAnswer: 1,
    explanation: '8 men × 20 days = 160 man-days. So 10 men will take 160/10 = 16 days.'
  },
  {
    id: 'qa-medium-3',
    topicId: 'quantitative-aptitude',
    difficulty: 'medium',
    question: 'The price of a product is reduced by 20%. To restore it to the original price, by what percentage should the reduced price be increased?',
    options: ['20%', '25%', '40%', '80%'],
    correctAnswer: 1,
    explanation: 'If original price is x, reduced price is 0.8x. To get back to x: 0.8x × (1+p/100) = x. Solving for p: p = 25%'
  },
  // Hard Questions (1-8)
  {
    id: 'qa-hard-1',
    topicId: 'quantitative-aptitude',
    difficulty: 'hard',
    question: 'A boat takes 90 minutes to travel downstream from point A to B, but takes 120 minutes to return upstream. If the boat travels at 10 km/hr in still water, what is the speed of the current?',
    options: ['1.5 km/hr', '2 km/hr', '2.5 km/hr', '3 km/hr'],
    correctAnswer: 2,
    explanation: 'Let speed of current be c. Downstream speed = 10 + c, Upstream speed = 10 - c. If d is the distance, then: d/(10+c) = 90/60 and d/(10-c) = 120/60. Solving these equations, c = 2.5 km/hr.'
  },
  {
    id: 'qa-hard-2',
    topicId: 'quantitative-aptitude',
    difficulty: 'hard',
    question: 'A mixture of 40 liters contains milk and water in the ratio 3:1. How much water should be added to make the ratio 3:2?',
    options: ['5 liters', '8 liters', '10 liters', '12 liters'],
    correctAnswer: 2,
    explanation: 'Initially, milk = 3/4 × 40 = 30 liters, water = 1/4 × 40 = 10 liters. For the ratio to be 3:2, if milk is 30 liters, water should be 20 liters. So, water to be added = 20 - 10 = 10 liters.'
  },
  {
    id: 'qa-hard-3',
    topicId: 'quantitative-aptitude',
    difficulty: 'hard',
    question: 'The sum of the digits of a two-digit number is 15. When the digits are reversed, the new number is 9 less than twice the original number. Find the original number.',
    options: ['69', '78', '87', '96'],
    correctAnswer: 2,
    explanation: 'Let the number be 10x + y where x is tens digit and y is units digit. Given: x + y = 15 and 10y + x = 2(10x + y) - 9. Solving these equations: x = 8, y = 7, so the number is 87.'
  },
];

// Combine all questions
const allQuestions: Question[] = [
  ...logicalReasoningQuestions,
  ...quantitativeAptitudeQuestions,
  // Add questions for other topics as they are created
];

// Helper functions to get questions by topic and difficulty
export const getQuestionsByTopicAndDifficulty = (
  topicId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  limit: number = 25
): Question[] => {
  const filteredQuestions = allQuestions.filter(
    (q) => q.topicId === topicId && q.difficulty === difficulty
  );
  
  // For development purposes, if we don't have enough questions, repeat them
  if (filteredQuestions.length < limit) {
    const repeatedQuestions = [];
    for (let i = 0; i < limit; i++) {
      repeatedQuestions.push({
        ...filteredQuestions[i % filteredQuestions.length],
        id: `${filteredQuestions[i % filteredQuestions.length].id}-${Math.floor(i / filteredQuestions.length)}`
      });
    }
    return repeatedQuestions.slice(0, limit);
  }
  
  return filteredQuestions.slice(0, limit);
};

export default allQuestions;
