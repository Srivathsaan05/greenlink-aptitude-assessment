
import { Question } from '../types/questionTypes';

// Blood Relations Questions
const bloodRelationsQuestions: Question[] = [
  // Easy Questions
  {
    id: 'br-easy-1',
    topicId: 'blood-relations',
    difficulty: 'easy',
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather\'s only son." How is the girl in the photograph related to Rohit?',
    options: ['Sister', 'Cousin', 'Niece', 'Daughter'],
    correctAnswer: 0,
    explanation: 'Grandfather\'s only son would be Rohit\'s father. So the daughter of Rohit\'s father would be his sister.'
  },
  {
    id: 'br-easy-2',
    topicId: 'blood-relations',
    difficulty: 'easy',
    question: 'Introducing a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
    options: ['Sister', 'Mother', 'Grandmother', 'Aunt'],
    correctAnswer: 1,
    explanation: 'The only daughter of the woman\'s mother would be the woman herself. So the man\'s mother is the woman, making her his mother.'
  },
  {
    id: 'br-easy-3',
    topicId: 'blood-relations',
    difficulty: 'easy',
    question: 'If P is the brother of Q, R is the sister of Q, and S is the brother of P, which of the following statements is definitely true?',
    options: ['R and S are siblings', 'P and R are siblings', 'Q and S are siblings', 'P and Q are sisters'],
    correctAnswer: 1,
    explanation: 'P is the brother of Q, and R is the sister of Q. This means P, Q, and R are siblings. Therefore, P and R are siblings.'
  },
  // Medium Questions
  {
    id: 'br-medium-1',
    topicId: 'blood-relations',
    difficulty: 'medium',
    question: 'A is B\'s brother. C is D\'s father. E is B\'s mother. A and D are siblings. How is C related to E?',
    options: ['Brother', 'Son-in-law', 'Husband', 'Brother-in-law'],
    correctAnswer: 2,
    explanation: 'A and B are siblings (as A is B\'s brother). E is B\'s mother, so E is also A\'s mother. A and D are siblings, so D is also E\'s child. C is D\'s father, which means C is married to E. Therefore, C is E\'s husband.'
  },
  {
    id: 'br-medium-2',
    topicId: 'blood-relations',
    difficulty: 'medium',
    question: 'Pointing to a woman in a photograph, Ravi said, "The sister of her mother\'s husband is my aunt." How is the woman related to Ravi?',
    options: ['Mother', 'Sister', 'Aunt', 'Cousin'],
    correctAnswer: 0,
    explanation: 'The woman\'s mother\'s husband is the woman\'s father. The sister of the woman\'s father is Ravi\'s aunt. This means the woman\'s father is Ravi\'s father or uncle. Since the woman is directly related to her father, and Ravi calls the woman\'s father\'s sister as aunt, the woman is Ravi\'s mother.'
  },
  {
    id: 'br-medium-3',
    topicId: 'blood-relations',
    difficulty: 'medium',
    question: 'If P × Q means P is the father of Q; P - Q means P is the wife of Q; P + Q means P is the brother of Q; and P ÷ Q means P is the sister of Q, then which of the following shows that M is the maternal uncle of N?',
    options: ['N × T - M + O', 'M + O - T × N', 'M + O × T - N', 'N - T × M + O'],
    correctAnswer: 1,
    explanation: 'M + O means M is the brother of O. O - T means O is the wife of T. T × N means T is the father of N. So M is the brother of O who is the wife of T who is the father of N. This makes M the maternal uncle (mother\'s brother) of N.'
  },
  // Hard Questions
  {
    id: 'br-hard-1',
    topicId: 'blood-relations',
    difficulty: 'hard',
    question: 'A family has two generations with the following information: P is married to Q. R is the brother of T. T is the daughter of S. S is the brother of P. How is Q related to R?',
    options: ['Mother', 'Aunt', 'Sister', 'Cousin'],
    correctAnswer: 1,
    explanation: 'P is married to Q. S is the brother of P. T is the daughter of S. R is the brother of T. So T and R are children of S. Since S is P\'s brother, P is their uncle and Q is their aunt.'
  },
  {
    id: 'br-hard-2',
    topicId: 'blood-relations',
    difficulty: 'hard',
    question: 'A tells B, "The girl I pointed out yesterday at the beach is the youngest daughter of the brother-in-law of my friend\'s mother." How is the girl related to A\'s friend?',
    options: ['Niece', 'Cousin', 'Friend', 'Daughter'],
    correctAnswer: 1,
    explanation: 'Brother-in-law of A\'s friend\'s mother would be either her husband\'s brother or her sister\'s husband. In either case, their daughter would be a cousin of A\'s friend.'
  },
  {
    id: 'br-hard-3',
    topicId: 'blood-relations',
    difficulty: 'hard',
    question: 'Six members of a family – A, B, C, D, E, and F – are traveling together. B is the son of C but C is not the mother of B. A and C are a married couple. E is the brother of C. D is the daughter of A. F is the brother of B. How many male members are there in the family?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'A and C are married. C is not the mother of B but B is son of C, so C is the father and A is the mother. E is brother of C, so E is male. D is daughter of A, so D is female. F is brother of B, so F is male. B is a son, so male. The males are C, E, B, and F, so there are 4 males.'
  },
];

export default bloodRelationsQuestions;
