
import { Question } from '../types/questionTypes';

// Verbal Ability Questions
const verbalAbilityQuestions: Question[] = [
  // Easy Questions
  {
    id: 'va-easy-1',
    topicId: 'verbal-ability',
    difficulty: 'easy',
    question: 'Choose the word that is the opposite of "ABUNDANT"',
    options: ['Scarce', 'Plentiful', 'Ample', 'Sufficient'],
    correctAnswer: 0,
    explanation: 'The opposite of "abundant" (meaning plentiful) is "scarce" (meaning in short supply).'
  },
  {
    id: 'va-easy-2',
    topicId: 'verbal-ability',
    difficulty: 'easy',
    question: 'Choose the correctly spelled word:',
    options: ['Accomodate', 'Acommodate', 'Accommodate', 'Accomadate'],
    correctAnswer: 2,
    explanation: 'The correct spelling is "accommodate" with double "c" and double "m".'
  },
  {
    id: 'va-easy-3',
    topicId: 'verbal-ability',
    difficulty: 'easy',
    question: 'Complete the analogy: Bird : Nest :: Human : ?',
    options: ['Home', 'Building', 'Office', 'Room'],
    correctAnswer: 0,
    explanation: 'A bird lives in a nest, and a human lives in a home. The relationship is where they live.'
  },
  // Medium Questions
  {
    id: 'va-medium-1',
    topicId: 'verbal-ability',
    difficulty: 'medium',
    question: 'Choose the correct meaning of the idiom: "To hit the nail on the head"',
    options: [
      'To harm someone',
      'To do carpentry work',
      'To get exactly right',
      'To work hard'
    ],
    correctAnswer: 2,
    explanation: 'The idiom "to hit the nail on the head" means to be exactly right or to be precisely accurate about something.'
  },
  {
    id: 'va-medium-2',
    topicId: 'verbal-ability',
    difficulty: 'medium',
    question: 'Select the correct sentence:',
    options: [
      'Neither of the boys have completed their homework.',
      'Neither of the boys has completed his homework.',
      'Neither of the boys has completed their homework.',
      'Neither of the boys have completed his homework.'
    ],
    correctAnswer: 1,
    explanation: '"Neither" is singular, so it takes the singular verb "has". Each boy has his own homework, so the singular possessive "his" is correct.'
  },
  {
    id: 'va-medium-3',
    topicId: 'verbal-ability',
    difficulty: 'medium',
    question: 'Choose the sentence with the correct use of articles:',
    options: [
      'She gave me a useful advice about the university application.',
      'She gave me useful advices about an university application.',
      'She gave me useful advice about the university application.',
      'She gave me the useful advice about a university application.'
    ],
    correctAnswer: 2,
    explanation: '"Advice" is uncountable, so it doesn\'t use "a" or "an", and "the university" is correct because "university" begins with a consonant sound despite starting with a vowel.'
  },
  // Hard Questions
  {
    id: 'va-hard-1',
    topicId: 'verbal-ability',
    difficulty: 'hard',
    question: 'Identify the sentence that uses parallelism correctly:',
    options: [
      'She likes swimming, running, and to bike.',
      'She likes swimming, running, and biking.',
      'She likes to swim, to run, and biking.',
      'She likes to swim, running, and to bike.'
    ],
    correctAnswer: 1,
    explanation: 'Parallelism requires using the same grammatical form for similar elements. In this case, all three activities should be gerunds: swimming, running, and biking.'
  },
  {
    id: 'va-hard-2',
    topicId: 'verbal-ability',
    difficulty: 'hard',
    question: 'Select the word that best completes the sentence: The professor\'s lecture was so ________ that many students found it difficult to follow.',
    options: ['eloquent', 'concise', 'abstruse', 'lucid'],
    correctAnswer: 2,
    explanation: '"Abstruse" means difficult to understand or obscure, which fits the context of students finding it hard to follow. "Eloquent" means fluent and persuasive, "concise" means brief, and "lucid" means clear and easily understood.'
  },
  {
    id: 'va-hard-3',
    topicId: 'verbal-ability',
    difficulty: 'hard',
    question: 'Choose the sentence with no errors in grammar, punctuation, or usage:',
    options: [
      'Between you and I, the companies policies are effecting everyone\'s moral.',
      'Between you and me, the company\'s policies are affecting everyone\'s morale.',
      'Between you and I, the company\'s policies are affecting everyone\'s morale.',
      'Between you and me, the companies policies are effecting everyone\'s moral.'
    ],
    correctAnswer: 1,
    explanation: 'The correct preposition object is "me" (not "I"), "company\'s" is the singular possessive form, "affecting" is the correct verb (not "effecting"), and "morale" refers to confidence and enthusiasm (not "moral" which refers to principles).'
  },
];

export default verbalAbilityQuestions;
