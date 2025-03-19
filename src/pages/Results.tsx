
import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Share2, Trophy, XCircle, Clock, AlertTriangle, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTopicById, getDifficultyLabel, getDifficultyColor, Difficulty } from '../data/topicsData';
import { Question } from '../data/types/questionTypes';
import { useUser } from '../context/UserContext';
import { Progress } from '@/components/ui/progress';
import PerformanceChart from '@/components/results/PerformanceChart';
import { PerformanceMetrics } from '@/components/results/PerformanceMetrics';

const Results: React.FC = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, isAuthenticated } = useUser();
  
  const { score, total, answers, questions, timeTaken, questionTimes } = location.state || { 
    score: 0, 
    total: 0, 
    answers: [], 
    questions: [],
    timeTaken: 0,
    questionTimes: []
  };
  
  const topic = getTopicById(topicId || '');
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  if (!topic || !questions.length) {
    navigate('/topics');
    return null;
  }
  
  const percentage = Math.round((score / total) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! You've mastered this topic.";
    if (percentage >= 75) return "Great job! You have a strong understanding.";
    if (percentage >= 60) return "Good work! You're on the right track.";
    if (percentage >= 40) return "You're making progress, but need more practice.";
    return "Keep practicing! You'll improve with more study.";
  };
  
  const getPerformanceClass = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-amber-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceRating = (): 'excellent' | 'good' | 'average' | 'poor' => {
    if (percentage >= 90) return "excellent";
    if (percentage >= 70) return "good";
    if (percentage >= 50) return "average";
    return "poor";
  };

  const getPerformanceRatingDisplay = () => {
    const rating = getPerformanceRating();
    
    switch(rating) {
      case 'excellent':
        return {
          label: 'Excellent',
          icon: <Trophy className="h-5 w-5 text-yellow-500" />,
          color: 'bg-green-100 text-green-800'
        };
      case 'good':
        return {
          label: 'Good',
          icon: <Award className="h-5 w-5 text-blue-500" />,
          color: 'bg-blue-100 text-blue-800'
        };
      case 'average':
        return {
          label: 'Average',
          icon: <CheckCircle className="h-5 w-5 text-amber-500" />,
          color: 'bg-amber-100 text-amber-800'
        };
      case 'poor':
        return {
          label: 'Needs Improvement',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          color: 'bg-red-100 text-red-800'
        };
    }
  };
  
  const getTopicHighestScore = () => {
    const topicScores = scores.filter(s => s.topic === topicId && s.difficulty === difficulty);
    if (topicScores.length === 0) return 0;
    
    return Math.max(...topicScores.map(s => (s.score / s.total) * 100));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const topicHighestScore = getTopicHighestScore();
  const isNewRecord = percentage >= topicHighestScore;
  const performanceDisplay = getPerformanceRatingDisplay();

  const avgTimePerQuestion = timeTaken ? Math.round(timeTaken / total) : 0;
  
  const getQuestionPerformanceMetrics = () => {
    const answered = answers.filter(answer => answer !== null).length;
    const correct = answers.reduce((count, answer, index) => {
      if (answer === questions[index].correctAnswer) return count + 1;
      return count;
    }, 0);
    const incorrect = answered - correct;
    const skipped = total - answered;
    
    return {
      answered,
      correct,
      incorrect,
      skipped,
      correctPercentage: Math.round((correct / total) * 100),
      incorrectPercentage: Math.round((incorrect / total) * 100),
      skippedPercentage: Math.round((skipped / total) * 100)
    };
  };
  
  const metrics = getQuestionPerformanceMetrics();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-slide-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <Link
                  to="/topics"
                  className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Topics
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{topic.title} Results</h1>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty as Difficulty)}`}>
                    {getDifficultyLabel(difficulty as Difficulty)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => navigate(`/topics/${topicId}`)}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                Try Another Difficulty
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12 animate-scale-in">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Assessment Results</h2>
                {isNewRecord && (
                  <div className="flex items-center bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="h-4 w-4 mr-1" />
                    New Record!
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${getPerformanceClass()}`}>{percentage}%</span>
                    <span className="text-gray-500 ml-2">({score}/{total})</span>
                  </div>
                  <p className="text-gray-600 mt-2">{getResultMessage()}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Link
                    to={`/assessment/${topicId}/${difficulty}`}
                    className="inline-flex items-center px-4 py-2 border border-green-500 rounded-lg bg-white text-green-600 hover:bg-green-50 transition-colors duration-300"
                  >
                    Retry Assessment
                  </Link>
                  <Link
                    to={`/profile`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <PerformanceMetrics
                  score={score}
                  total={total}
                  timeTaken={timeTaken}
                  metrics={metrics}
                  performanceRating={getPerformanceRating()}
                  isNewRecord={isNewRecord}
                  topicHighestScore={topicHighestScore}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Analysis</h2>
            <PerformanceChart 
              scores={scores} 
              currentScore={{
                topic: topicId || '',
                score,
                total,
                timeTaken,
                performanceRating: getPerformanceRating()
              }} 
            />
          </div>
          
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Review</h2>
            
            <div className="space-y-6">
              {questions.map((question: Question, index: number) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const questionTime = questionTimes?.[index] || 0;
                
                return (
                  <div 
                    key={question.id}
                    className="bg-white rounded-xl border shadow-sm overflow-hidden"
                  >
                    <div className={`p-4 flex justify-between items-center ${
                      isCorrect ? 'bg-green-50 border-b border-green-100' : 'bg-red-50 border-b border-red-100'
                    }`}>
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-white text-gray-700 font-medium shadow-sm mr-3">
                          {index + 1}
                        </span>
                        {isCorrect ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Incorrect</span>
                          </div>
                        )}
                      </div>
                      
                      {questionTime > 0 && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Time: {formatTime(questionTime)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h3>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 border-green-200'
                                : optionIndex === userAnswer
                                  ? 'bg-red-50 border-red-200'
                                  : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-500 text-white'
                                  : optionIndex === userAnswer
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                              }`}>
                                {String.fromCharCode(65 + optionIndex)}
                              </div>
                              <span
                                className={`${
                                  optionIndex === question.correctAnswer
                                    ? 'font-medium'
                                    : ''
                                }`}
                              >
                                {option}
                              </span>
                              
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                              )}
                              
                              {optionIndex === userAnswer && optionIndex !== question.correctAnswer && (
                                <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Explanation:</span> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
