
import React from 'react';
import { Award, Clock, CheckCircle, AlertTriangle, Trophy, TrendingUp, Brain, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PerformanceMetricsProps {
  score: number;
  total: number;
  timeTaken: number;
  metrics: {
    answered: number;
    correct: number;
    incorrect: number;
    skipped: number;
    correctPercentage: number;
    incorrectPercentage: number;
    skippedPercentage: number;
  };
  performanceRating: 'excellent' | 'good' | 'average' | 'poor';
  isNewRecord: boolean;
  topicHighestScore: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  score,
  total,
  timeTaken,
  metrics,
  performanceRating,
  isNewRecord,
  topicHighestScore
}) => {
  const percentage = Math.round((score / total) * 100);
  const avgTimePerQuestion = timeTaken ? Math.round(timeTaken / total) : 0;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const getPerformanceClass = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-amber-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };
  
  const getPerformanceRatingDisplay = () => {
    switch(performanceRating) {
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
  
  const performanceDisplay = getPerformanceRatingDisplay();
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Total Time</span>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xl font-semibold">{formatTime(timeTaken)}</p>
          <p className="text-xs text-gray-500 mt-1">
            Avg. {avgTimePerQuestion}s per question
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Performance</span>
            {performanceDisplay.icon}
          </div>
          <div className="flex items-center">
            <span className={`px-2 py-0.5 rounded text-sm font-medium ${performanceDisplay.color}`}>
              {performanceDisplay.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isNewRecord ? 'New personal best!' : `Personal best: ${Math.round(topicHighestScore)}%`}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Question Breakdown</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-green-600">Correct ({metrics.correct})</span>
                <span>{metrics.correctPercentage}%</span>
              </div>
              <Progress value={metrics.correctPercentage} className="h-1 bg-gray-200" indicatorClassName="bg-green-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-600">Incorrect ({metrics.incorrect})</span>
                <span>{metrics.incorrectPercentage}%</span>
              </div>
              <Progress value={metrics.incorrectPercentage} className="h-1 bg-gray-200" indicatorClassName="bg-red-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Skipped ({metrics.skipped})</span>
                <span>{metrics.skippedPercentage}%</span>
              </div>
              <Progress value={metrics.skippedPercentage} className="h-1 bg-gray-200" indicatorClassName="bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <Brain className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Knowledge</span>
          </div>
          <p className={`text-xl font-bold mt-auto ${getPerformanceClass()}`}>{percentage}%</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Speed</span>
          </div>
          <p className="text-xl font-bold mt-auto text-teal-600">
            {avgTimePerQuestion < 15 ? 'Excellent' : 
             avgTimePerQuestion < 25 ? 'Good' : 
             avgTimePerQuestion < 35 ? 'Average' : 'Slow'}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <Target className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Accuracy</span>
          </div>
          <p className="text-xl font-bold mt-auto text-blue-600">
            {metrics.answered > 0 ? Math.round((metrics.correct / metrics.answered) * 100) : 0}%
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Progress</span>
          </div>
          <p className="text-xl font-bold mt-auto text-amber-600">
            {isNewRecord ? '+' + (percentage - topicHighestScore).toFixed(1) + '%' : 'No change'}
          </p>
        </div>
      </div>
    </div>
  );
};
