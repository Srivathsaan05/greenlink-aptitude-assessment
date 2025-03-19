
import { Question } from './types/questionTypes';
import logicalReasoningQuestions from './questions/logicalReasoningQuestions';
import quantitativeAptitudeQuestions from './questions/quantitativeAptitudeQuestions';
import verbalAbilityQuestions from './questions/verbalAbilityQuestions';
import hcfLcmQuestions from './questions/hcfLcmQuestions';
import bloodRelationsQuestions from './questions/bloodRelationsQuestions';
import percentagesQuestions from './questions/percentagesQuestions';
import ratioProportionsQuestions from './questions/ratioProportionsQuestions';

// Combine all questions
const allQuestions: Question[] = [
  ...logicalReasoningQuestions,
  ...quantitativeAptitudeQuestions,
  ...verbalAbilityQuestions,
  ...hcfLcmQuestions,
  ...bloodRelationsQuestions,
  ...percentagesQuestions,
  ...ratioProportionsQuestions,
  // Add questions for other topics as they are created
];

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper functions to get questions by topic and difficulty
export const getQuestionsByTopicAndDifficulty = (
  topicId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  limit: number = 25
): Question[] => {
  // Filter questions by topic and difficulty
  const filteredQuestions = allQuestions.filter(
    (q) => q.topicId === topicId && q.difficulty === difficulty
  );
  
  // Shuffle the questions to get random selection
  const shuffledQuestions = shuffleArray(filteredQuestions);
  
  // If we don't have enough questions, generate unique variations
  if (shuffledQuestions.length < limit) {
    const uniqueQuestions: Question[] = [];
    
    // Add all original questions first
    uniqueQuestions.push(...shuffledQuestions);
    
    // Generate variations for remaining needed questions
    const remainingNeeded = limit - uniqueQuestions.length;
    for (let i = 0; i < remainingNeeded; i++) {
      // Get a question to use as a base (cycling through available ones)
      const baseQuestion = shuffledQuestions[i % shuffledQuestions.length];
      
      // Create a variation with a unique ID and slightly modified question text
      const variation: Question = {
        ...baseQuestion,
        id: `${baseQuestion.id}-var-${i+1}`,
        question: `${baseQuestion.question} (Variation ${i+1})`,
      };
      
      uniqueQuestions.push(variation);
    }
    
    return uniqueQuestions;
  }
  
  // If we have enough questions, just return the first 'limit' questions
  return shuffledQuestions.slice(0, limit);
};

export default allQuestions;
