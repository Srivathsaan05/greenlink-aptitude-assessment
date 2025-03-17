
import { Question } from '../types/questionTypes';

// Percentages Questions
const percentagesQuestions: Question[] = [
  // Easy Questions
  {
    id: 'pct-easy-1',
    topicId: 'percentages',
    difficulty: 'easy',
    question: 'What is 15% of 120?',
    options: ['12', '15', '18', '24'],
    correctAnswer: 2,
    explanation: '15% of 120 = (15/100) × 120 = 18'
  },
  {
    id: 'pct-easy-2',
    topicId: 'percentages',
    difficulty: 'easy',
    question: '30 is what percent of 150?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 1,
    explanation: '(30/150) × 100 = 20%'
  },
  {
    id: 'pct-easy-3',
    topicId: 'percentages',
    difficulty: 'easy',
    question: 'If the price of a shirt increases from $40 to $50, what is the percentage increase?',
    options: ['20%', '25%', '30%', '10%'],
    correctAnswer: 1,
    explanation: 'Percentage increase = (Increase/Original) × 100 = (10/40) × 100 = 25%'
  },
  // Medium Questions
  {
    id: 'pct-medium-1',
    topicId: 'percentages',
    difficulty: 'medium',
    question: 'A number is increased by 20% and then decreased by 20%. What is the net percentage change in the number?',
    options: ['0% (no change)', '4% decrease', '4% increase', '2% decrease'],
    correctAnswer: 1,
    explanation: 'If original number is x, after 20% increase it becomes 1.2x. After 20% decrease, it becomes 1.2x × 0.8 = 0.96x, which is a 4% decrease.'
  },
  {
    id: 'pct-medium-2',
    topicId: 'percentages',
    difficulty: 'medium',
    question: 'If 75% of a number is 120, what is 40% of that number?',
    options: ['64', '80', '160', '96'],
    correctAnswer: 0,
    explanation: 'If 75% of x is 120, then x = 120/(75/100) = 120 × (100/75) = 160. So 40% of x = 40% of 160 = (40/100) × 160 = 64.'
  },
  {
    id: 'pct-medium-3',
    topicId: 'percentages',
    difficulty: 'medium',
    question: 'In an election between two candidates, the winner got 65% of the total valid votes. If the winner got 2600 votes and 20% of the total votes were invalid, how many votes were cast in the election?',
    options: ['4000', '4500', '5000', '5500'],
    correctAnswer: 2,
    explanation: 'If winner got 65% of valid votes, and 2600 votes, then valid votes = 2600/(65/100) = 4000. If valid votes are 80% of total, then total votes = 4000/(80/100) = 5000.'
  },
  // Hard Questions
  {
    id: 'pct-hard-1',
    topicId: 'percentages',
    difficulty: 'hard',
    question: 'A solution contains 25% alcohol. How much water should be added to 80 liters of this solution to make it 20% alcoholic?',
    options: ['15 liters', '20 liters', '25 liters', '30 liters'],
    correctAnswer: 1,
    explanation: 'Alcohol in original solution = 25% of 80 = 20 liters. If x liters of water is added, then 20/(80+x) = 20/100, so 20 × 100 = 20 × (80+x), therefore 2000 = 1600 + 20x, so x = 20 liters.'
  },
  {
    id: 'pct-hard-2',
    topicId: 'percentages',
    difficulty: 'hard',
    question: 'A man sold two articles for $9600 each. On one he gained 20% and on the other he lost 20%. Find his total gain or loss percentage.',
    options: ['No gain or loss', '2% loss', '4% loss', '4% gain'],
    correctAnswer: 2,
    explanation: 'For the first article, CP = 9600/1.2 = 8000. For the second article, CP = 9600/0.8 = 12000. Total CP = 8000 + 12000 = 20000. Total SP = 9600 + 9600 = 19200. Loss = 800, Loss percentage = (800/20000) × 100 = 4%.'
  },
  {
    id: 'pct-hard-3',
    topicId: 'percentages',
    difficulty: 'hard',
    question: 'In an alloy, zinc and copper are in the ratio 2:3. If 5 kg of zinc is added, the ratio becomes 3:4. Find the initial weight of the alloy.',
    options: ['25 kg', '30 kg', '35 kg', '40 kg'],
    correctAnswer: 1,
    explanation: 'Let the initial weights of zinc and copper be 2x and 3x. After adding 5 kg of zinc, the new ratio is 3:4, so (2x+5)/3x = 3/4. Solving, 8x+20 = 9x, so x = 20. Initial weight = 2x+3x = 5x = 5 × 6 = 30 kg.'
  },
];

export default percentagesQuestions;
