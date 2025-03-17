
import { Question } from '../types/questionTypes';

// HCF and LCM Questions
const hcfLcmQuestions: Question[] = [
  // Easy Questions
  {
    id: 'hcf-easy-1',
    topicId: 'hcf-lcm',
    difficulty: 'easy',
    question: 'What is the HCF of 24 and 36?',
    options: ['6', '9', '12', '18'],
    correctAnswer: 2,
    explanation: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The highest common factor is 12.'
  },
  {
    id: 'hcf-easy-2',
    topicId: 'hcf-lcm',
    difficulty: 'easy',
    question: 'What is the LCM of 8 and 12?',
    options: ['16', '24', '36', '48'],
    correctAnswer: 1,
    explanation: 'LCM of 8 and 12 can be found by prime factorization: 8 = 2³, 12 = 2² × 3. LCM = 2³ × 3 = 24.'
  },
  {
    id: 'hcf-easy-3',
    topicId: 'hcf-lcm',
    difficulty: 'easy',
    question: 'If the HCF of two numbers is 6 and their LCM is 36, which of the following could be the two numbers?',
    options: ['6 and 36', '12 and 18', '18 and 24', '6 and 12'],
    correctAnswer: 1,
    explanation: 'For two numbers a and b, a × b = HCF × LCM. So the product of the two numbers must be 6 × 36 = 216. Among the options, 12 × 18 = 216, and their HCF is 6.'
  },
  // Medium Questions
  {
    id: 'hcf-medium-1',
    topicId: 'hcf-lcm',
    difficulty: 'medium',
    question: 'Find the HCF of 144, 180, and 192.',
    options: ['12', '18', '24', '36'],
    correctAnswer: 0,
    explanation: 'Prime factorizations: 144 = 2⁴ × 3², 180 = 2² × 3² × 5, 192 = 2⁶ × 3. The common factors are 2² × 3 = 12.'
  },
  {
    id: 'hcf-medium-2',
    topicId: 'hcf-lcm',
    difficulty: 'medium',
    question: 'The LCM of two numbers is 84 and their HCF is 4. If one of the numbers is 12, find the other number.',
    options: ['21', '24', '28', '36'],
    correctAnswer: 2,
    explanation: 'If one number is 12 and HCF is 4, then 12 = 4 × 3. Using the formula a × b = HCF × LCM, we get 12 × other = 4 × 84, so other = 4 × 84 / 12 = 28.'
  },
  {
    id: 'hcf-medium-3',
    topicId: 'hcf-lcm',
    difficulty: 'medium',
    question: 'Three bells ring at intervals of 18, 24, and 30 minutes respectively. If they ring together at 9 AM, when will they next ring together?',
    options: ['10:30 AM', '11:00 AM', '12:00 PM', '1:30 PM'],
    correctAnswer: 2,
    explanation: 'We need to find the LCM of 18, 24, and 30. LCM = 2² × 3² × 5 = 180 minutes = 3 hours. So they will ring together next at 9 AM + 3 hours = 12:00 PM.'
  },
  // Hard Questions
  {
    id: 'hcf-hard-1',
    topicId: 'hcf-lcm',
    difficulty: 'hard',
    question: 'Find the largest number that divides 1305, 4665, and 6905 to give the same remainder in each case.',
    options: ['40', '55', '65', '85'],
    correctAnswer: 2,
    explanation: 'We need to find the HCF of (4665-1305), (6905-1305), which is HCF of 3360 and 5600. This equals 1120, which is not in the options. Checking further, we need the HCF of (4665-1305) and (6905-4665), which is HCF of 3360 and 2240 = 1120. The HCF of 1120 and 1305 = 65.'
  },
  {
    id: 'hcf-hard-2',
    topicId: 'hcf-lcm',
    difficulty: 'hard',
    question: 'The product of two numbers is 2160 and their HCF is 12. How many such pairs of numbers are possible?',
    options: ['2', '4', '6', '8'],
    correctAnswer: 3,
    explanation: 'Let the two numbers be 12a and 12b, where a and b are coprime. Then 12a × 12b = 2160, so a × b = 2160 / 144 = 15. The pairs of coprime numbers with product 15 are (1,15), (3,5), (5,3), (15,1). So there are 4 possible pairs of numbers.'
  },
  {
    id: 'hcf-hard-3',
    topicId: 'hcf-lcm',
    difficulty: 'hard',
    question: 'There are three piles with 72, 108, and 180 coins. They need to be distributed equally among a certain number of people. What is the maximum number of people that can receive the same number of coins?',
    options: ['6', '12', '18', '36'],
    correctAnswer: 2,
    explanation: 'We need to find the HCF of 72, 108, and 180. Prime factorizations: 72 = 2³ × 3², 108 = 2² × 3³, 180 = 2² × 3² × 5. The HCF = 2² × 3² = 36, but the question asks for the maximum number of people, not coins per person. Each person gets (72+108+180)/36 = 10 coins, so maximum people = 36.'
  },
];

export default hcfLcmQuestions;
