
import { Question } from '../types/questionTypes';

// Ratio and Proportions Questions
const ratioProportionsQuestions: Question[] = [
  // Easy Questions
  {
    id: 'rp-easy-1',
    topicId: 'ratio-proportions',
    difficulty: 'easy',
    question: 'If the ratio of boys to girls in a class is 3:5, and there are 24 boys, how many girls are there?',
    options: ['30', '35', '40', '45'],
    correctAnswer: 2,
    explanation: 'If boys : girls = 3 : 5, and boys = 24, then girls = (5/3) × 24 = 40.'
  },
  {
    id: 'rp-easy-2',
    topicId: 'ratio-proportions',
    difficulty: 'easy',
    question: 'If 15 workers can build a wall in 12 days, how many workers would be needed to build the same wall in 6 days?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    explanation: 'The work is inversely proportional to the number of workers. Using the formula, (15 × 12) / (x × 6) = 1, which gives x = 30 workers.'
  },
  {
    id: 'rp-easy-3',
    topicId: 'ratio-proportions',
    difficulty: 'easy',
    question: 'Two numbers are in the ratio 4:7. If their sum is 132, find the smaller number.',
    options: ['48', '52', '44', '84'],
    correctAnswer: 0,
    explanation: 'If the numbers are 4x and 7x, then 4x + 7x = 132, so 11x = 132, and x = 12. The smaller number is 4x = 48.'
  },
  // Medium Questions
  {
    id: 'rp-medium-1',
    topicId: 'ratio-proportions',
    difficulty: 'medium',
    question: 'Three partners A, B, and C start a business with investments in the ratio 5:7:8. After 6 months, A invests an additional amount equal to half of his initial investment. If the total profit after a year is $4800, what is B\'s share?',
    options: ['$1200', '$1400', '$1600', '$1800'],
    correctAnswer: 1,
    explanation: 'A\'s investment for first 6 months = 5x, next 6 months = 7.5x. A\'s weighted investment = (5x × 6 + 7.5x × 6)/12 = 6.25x. Ratio of profits = 6.25 : 7 : 8 = 25 : 28 : 32. B\'s share = (28/85) × 4800 = 1400.'
  },
  {
    id: 'rp-medium-2',
    topicId: 'ratio-proportions',
    difficulty: 'medium',
    question: 'A mixture of 40 liters of milk and water contains 10% water. How much water should be added to make the water content 25%?',
    options: ['8 liters', '10 liters', '12 liters', '14 liters'],
    correctAnswer: 1,
    explanation: 'Water in original mixture = 10% of 40 = 4 liters. Milk = 36 liters. If x liters of water is added, then (4+x)/(40+x) = 25/100. Solving, 100(4+x) = 25(40+x), so 400+100x = 1000+25x, which gives 75x = 600, so x = 8 liters.'
  },
  {
    id: 'rp-medium-3',
    topicId: 'ratio-proportions',
    difficulty: 'medium',
    question: 'The ratio of the present ages of A and B is 5:7. Five years ago, the ratio was 4:6. What will be the ratio of their ages after 5 years?',
    options: ['6:8', '3:4', '8:10', '5:6'],
    correctAnswer: 1,
    explanation: 'Let current ages be 5x and 7x. Five years ago, ages were 5x-5 and 7x-5, with ratio 4:6 = 2:3. So (5x-5)/(7x-5) = 2/3, which gives 15x-15 = 14x-10, so x = 5. Current ages are 25 and 35. After 5 years, ages will be 30 and 40, with ratio 30:40 = 3:4.'
  },
  // Hard Questions
  {
    id: 'rp-hard-1',
    topicId: 'ratio-proportions',
    difficulty: 'hard',
    question: 'In a mixture of milk and water, the ratio of milk to water is 5:3. If 8 liters of water is added, the ratio becomes 5:5. Find the quantity of milk in the original mixture.',
    options: ['20 liters', '30 liters', '40 liters', '50 liters'],
    correctAnswer: 0,
    explanation: 'Let milk be 5x and water be 3x initially. After adding 8 liters of water, 5x/(3x+8) = 5/5 = 1. So 5x = 3x+8, which gives 2x = 8, so x = 4. Milk = 5x = 20 liters.'
  },
  {
    id: 'rp-hard-2',
    topicId: 'ratio-proportions',
    difficulty: 'hard',
    question: 'Three pipes A, B, and C can fill a tank in 12, 15, and 20 hours respectively. If all three pipes are opened simultaneously, after how many hours should pipe C be closed so that the tank is full in exactly 6 hours from the start?',
    options: ['2 hours', '3 hours', '4 hours', '5 hours'],
    correctAnswer: 0,
    explanation: 'Rate of filling by all pipes = 1/12 + 1/15 + 1/20 = 5/60 + 4/60 + 3/60 = 12/60 = 1/5 tank per hour. In 6 hours, the tank will be filled 6 × (1/5) = 6/5 times, which is more than needed. If C is closed after t hours, then the work done in 6 hours = t × (1/5) + (6-t) × (1/5 - 1/20) = t/5 + (6-t)(4/20) = t/5 + (6-t)/5 = 6/5 - t/20. Setting this equal to 1, we get 6/5 - t/20 = 1, so t/20 = 6/5 - 1 = 1/5, which gives t = 4 hours.'
  },
  {
    id: 'rp-hard-3',
    topicId: 'ratio-proportions',
    difficulty: 'hard',
    question: 'The ratio of the number of boys to girls in a school is 5:4. If 10 more boys and 5 more girls join the school, the ratio becomes 6:5. Find the total number of students in the school initially.',
    options: ['72', '90', '108', '126'],
    correctAnswer: 1,
    explanation: 'Let the number of boys and girls be 5x and 4x. After new students join, the ratio becomes (5x+10)/(4x+5) = 6/5. Solving, 5(5x+10) = 6(4x+5), so 25x+50 = 24x+30, which gives x = 2. Initial students = 5x+4x = 9x = 18, so total = 90.'
  },
];

export default ratioProportionsQuestions;
