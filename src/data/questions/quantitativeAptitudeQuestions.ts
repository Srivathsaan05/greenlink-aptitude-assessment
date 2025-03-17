
import { Question } from '../types/questionTypes';

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

export default quantitativeAptitudeQuestions;
