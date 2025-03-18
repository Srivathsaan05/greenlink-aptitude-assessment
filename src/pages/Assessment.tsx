
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, HelpCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getQuestionsByTopicAndDifficulty } from '../data/questions';
import { getTopicById, getDifficultyLabel, getDifficultyColor, Difficulty } from '../data/topicsData';
import { useUser } from '../context/UserContext';
import { Question } from '../data/types/questionTypes';

const Assessment: React.FC = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const navigate = useNavigate();
  const { addScore, isAuthenticated } = useUser();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0); // Will be set based on difficulty
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  
  const topic = getTopicById(topicId || '');
  const questions = getQuestionsByTopicAndDifficulty(
    topicId || '', 
    difficulty as Difficulty || 'easy',
    25
  );

  const timerRef = useRef<number | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (!topic || !questions.length) {
      navigate('/topics');
      return;
    }
    
    // Set time based on difficulty
    let timeAllowed = 1500; // Default: 25 minutes in seconds
    
    if (difficulty === 'easy') {
      timeAllowed = 1200; // 20 minutes
    } else if (difficulty === 'medium') {
      timeAllowed = 1800; // 30 minutes
    } else if (difficulty === 'hard') {
      timeAllowed = 2400; // 40 minutes
    }
    
    setTimeRemaining(timeAllowed);
    setStartTime(new Date());
    setQuestionStartTime(new Date());
    
    // Initialize answers array
    setAnswers(new Array(questions.length).fill(null));
    setQuestionTimes(new Array(questions.length).fill(0));
    
    // Timer
    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [topic, questions]);
  
  if (!topic || !questions.length) {
    return <div>Loading...</div>;
  }
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitting) return;
    
    setSelectedOption(optionIndex);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const saveQuestionTime = () => {
    if (questionStartTime) {
      const newQuestionTimes = [...questionTimes];
      const timeSpent = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000);
      newQuestionTimes[currentQuestionIndex] = timeSpent;
      setQuestionTimes(newQuestionTimes);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      saveQuestionTime();
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(answers[currentQuestionIndex + 1]);
      setQuestionStartTime(new Date());
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      saveQuestionTime();
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[currentQuestionIndex - 1]);
      setQuestionStartTime(new Date());
    }
  };
  
  const handleSubmitAssessment = () => {
    setIsSubmitting(true);
    
    // Save time for current question
    saveQuestionTime();
    
    // Calculate total time taken
    const totalTimeTaken = startTime 
      ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) 
      : 0;
    
    // Calculate score
    const score = answers.reduce((total, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
    
    // Add score to user context
    addScore({
      topic: topicId || '',
      difficulty: difficulty as Difficulty || 'easy',
      score,
      total: questions.length,
      timeTaken: totalTimeTaken,
      performanceRating: getPerformanceRating(score, questions.length)
    });
    
    // Navigate to results page
    navigate(`/results/${topicId}/${difficulty}`, {
      state: {
        score,
        total: questions.length,
        answers,
        questions,
        timeTaken: totalTimeTaken,
        questionTimes
      }
    });
  };
  
  const getPerformanceRating = (score: number, total: number): 'excellent' | 'good' | 'average' | 'poor' => {
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'poor';
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getTimeClass = () => {
    if (timeRemaining < 300) return 'text-red-500'; // Less than 5 minutes
    if (timeRemaining < 600) return 'text-orange-500'; // Less than 10 minutes
    return 'text-gray-700';
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = answers.filter(answer => answer !== null).length;
  
  // Get expected time per question based on difficulty
  const getExpectedTimePerQuestion = (): number => {
    switch(difficulty) {
      case 'easy': return 45; // 45 seconds
      case 'medium': return 75; // 1 minute 15 seconds
      case 'hard': return 120; // 2 minutes
      default: return 60; // 1 minute default
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Assessment Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty as Difficulty)}`}>
                  {getDifficultyLabel(difficulty as Difficulty)}
                </span>
                <h1 className="text-2xl font-bold mt-1">{topic.title} Assessment</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">
                    {answeredCount}/{questions.length} answered
                  </span>
                </div>
                <div className={`flex items-center ${getTimeClass()}`}>
                  <Clock className={`h-5 w-5 mr-2 ${
                    timeRemaining < 300 ? 'text-red-500' : 
                    timeRemaining < 600 ? 'text-orange-500' : 
                    'text-blue-500'
                  }`} />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              
              <div className="flex items-center gap-3">
                {currentQuestion.timeLimit && (
                  <span className="inline-flex items-center text-xs font-medium text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Expected: {Math.floor(currentQuestion.timeLimit / 60)}:{(currentQuestion.timeLimit % 60).toString().padStart(2, '0')}
                  </span>
                )}
                
                {answers[currentQuestionIndex] !== null ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Answered
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Unanswered
                  </span>
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-medium text-gray-900 mb-6">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    selectedOption === index 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                      selectedOption === index 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between animate-fade-in">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 border rounded-lg transition-colors duration-300 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitAssessment}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 border border-green-500 rounded-lg bg-white text-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  Next
                </button>
              )}
            </div>
          </div>
          
          {/* Question Navigation */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm animate-fade-in">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Question Navigation</h3>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-25 gap-2">
              {answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => {
                    saveQuestionTime();
                    setCurrentQuestionIndex(index);
                    setSelectedOption(answers[index]);
                    setQuestionStartTime(new Date());
                  }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
                    currentQuestionIndex === index 
                      ? 'bg-green-600 text-white' 
                      : answer !== null 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
