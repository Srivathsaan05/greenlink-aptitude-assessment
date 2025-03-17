
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
