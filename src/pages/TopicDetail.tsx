
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, ChevronRight, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTopicById, getDifficultyLabel, getDifficultyColor } from '../data/topicsData';
import { useUser } from '../context/UserContext';

const TopicDetail: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { scores } = useUser();
  
  const topic = getTopicById(topicId || '');
  
  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <Link to="/topics" className="text-green-600 hover:underline">
          Back to Topics
        </Link>
      </div>
    );
  }
  
  // Get scores for this topic
  const topicScores = scores.filter(score => score.topic === topic.id);
  const difficultyScores = {
    easy: topicScores.filter(score => score.difficulty === 'easy'),
    medium: topicScores.filter(score => score.difficulty === 'medium'),
    hard: topicScores.filter(score => score.difficulty === 'hard')
  };
  
  // Calculate best score for each difficulty
  const getBestScore = (difficulty: 'easy' | 'medium' | 'hard'): number => {
    const scores = difficultyScores[difficulty];
    if (scores.length === 0) return 0;
    
    const bestScore = Math.max(...scores.map(s => (s.score / s.total) * 100));
    return bestScore;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/topics')}
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Topics
            </button>
          </div>
          
          {/* Topic Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 animate-fade-in">
            <div className="flex items-center">
              <div className={`w-14 h-14 rounded-full ${topic.color} flex items-center justify-center mr-4`}>
                <topic.icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
                <p className="text-lg text-gray-600 mt-1">{topic.description}</p>
              </div>
            </div>
            
            {topicScores.length > 0 && (
              <Link
                to={`/statistics?topic=${topic.id}`}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Statistics
              </Link>
            )}
          </div>
          
          {/* Difficulty Levels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in">
            {topic.difficulties.map((difficulty) => {
              const bestScore = getBestScore(difficulty);
              const hasCompleted = difficultyScores[difficulty].length > 0;
              
              return (
                <div 
                  key={difficulty}
                  className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`h-2 ${getDifficultyColor(difficulty).replace('text-', 'bg-')}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                        {getDifficultyLabel(difficulty)}
                      </span>
                      
                      {hasCompleted && (
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-sm font-medium">{bestScore.toFixed(0)}%</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{getDifficultyLabel(difficulty)} Level</h3>
                    <p className="text-gray-600 mb-6">
                      {difficulty === 'easy' && 'Start with foundational questions to build your confidence.'}
                      {difficulty === 'medium' && 'Challenge yourself with intermediate level problems.'}
                      {difficulty === 'hard' && 'Test your expertise with advanced challenging questions.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{topic.questionsCount} questions</span>
                      <Link
                        to={`/assessment/${topic.id}/${difficulty}`}
                        className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors duration-300"
                      >
                        Start Assessment
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetail;
