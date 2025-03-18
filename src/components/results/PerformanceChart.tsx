
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { ScoreEntry } from '@/context/UserContext';

interface PerformanceChartProps {
  scores: ScoreEntry[];
  currentScore: {
    topic: string;
    score: number;
    total: number;
    timeTaken?: number;
    performanceRating?: 'excellent' | 'good' | 'average' | 'poor';
  };
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ scores, currentScore }) => {
  // Filter scores for the current topic
  const topicScores = scores.filter(score => score.topic === currentScore.topic);
  
  // Prepare data for the bar chart
  const barData = topicScores.map((score, index) => ({
    name: `Attempt ${index + 1}`,
    Score: Math.round((score.score / score.total) * 100),
    Time: score.timeTaken ? Math.round(score.timeTaken / 60) : 0, // Convert to minutes
  }));
  
  // Add current score if it's not already in the scores array
  if (barData.length === 0 || barData[barData.length - 1].Score !== Math.round((currentScore.score / currentScore.total) * 100)) {
    barData.push({
      name: `Current Attempt`,
      Score: Math.round((currentScore.score / currentScore.total) * 100),
      Time: currentScore.timeTaken ? Math.round(currentScore.timeTaken / 60) : 0,
    });
  }
  
  // Prepare data for the radar chart - performance by category
  const strengthsData = [
    { category: 'Knowledge', value: getMetricValue('knowledge', currentScore) },
    { category: 'Speed', value: getMetricValue('speed', currentScore) },
    { category: 'Accuracy', value: getMetricValue('accuracy', currentScore) },
    { category: 'Consistency', value: getMetricValue('consistency', topicScores, currentScore) },
  ];
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h3>
        <div className="h-72 w-full">
          <ChartContainer 
            className="h-72" 
            config={{
              score: { 
                label: 'Score %',
                theme: { light: '#8B5CF6', dark: '#A78BFA' } 
              },
              time: { 
                label: 'Time (min)',
                theme: { light: '#14B8A6', dark: '#2DD4BF' } 
              }
            }}
          >
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
              <YAxis yAxisId="right" orientation="right" stroke="#14B8A6" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar yAxisId="left" dataKey="Score" name="Score %" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="Time" name="Time (min)" fill="var(--color-time)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analysis</h3>
        <div className="h-80 w-full">
          <ChartContainer 
            className="h-80" 
            config={{
              performance: { 
                label: 'Performance',
                theme: { light: '#8B5CF6', dark: '#A78BFA' } 
              }
            }}
          >
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={strengthsData}
            >
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="var(--color-performance)"
                fill="var(--color-performance)"
                fillOpacity={0.5}
              />
              <Tooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate metrics for radar chart
function getMetricValue(
  metric: 'knowledge' | 'speed' | 'accuracy' | 'consistency',
  currentScore: { score: number; total: number; timeTaken?: number; performanceRating?: string; },
  allScores?: ScoreEntry[]
): number {
  const scorePercentage = (currentScore.score / currentScore.total) * 100;
  
  switch (metric) {
    case 'knowledge':
      // Knowledge is based on score percentage
      return scorePercentage;
      
    case 'speed':
      // Speed is inversely related to time taken - lower time is better
      // Calculate a percentage where 100% means completed in optimal time or faster
      if (!currentScore.timeTaken) return 50; // Default value if timing data missing
      
      // Expected time based on difficulty (e.g., 30s per question for medium difficulty)
      const expectedTimePerQuestion = 30; // seconds
      const expectedTotalTime = currentScore.total * expectedTimePerQuestion;
      
      // Faster than expected = 100%, 2x slower than expected = 0%
      let speedPercentage = 100 - ((currentScore.timeTaken - expectedTotalTime) / expectedTotalTime) * 50;
      return Math.max(0, Math.min(100, speedPercentage)); // Clamp to 0-100
      
    case 'accuracy':
      // Accuracy is based on the ratio of correct to attempted
      if (currentScore.total === 0) return 0;
      return scorePercentage;
      
    case 'consistency':
      // Consistency is based on variance across attempts
      if (!allScores || allScores.length < 2) return scorePercentage; // Not enough data, use current score
      
      // Get previous scores percentages
      const previousScores = allScores.map(s => (s.score / s.total) * 100);
      
      // Calculate standard deviation (rough approximation)
      const mean = previousScores.reduce((sum, score) => sum + score, 0) / previousScores.length;
      const variance = previousScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / previousScores.length;
      const stdDev = Math.sqrt(variance);
      
      // Convert to a 0-100 scale where lower deviation is better
      // 0% std deviation = 100% consistency, 50% std deviation = 0% consistency
      const consistencyScore = 100 - (stdDev * 2);
      return Math.max(0, Math.min(100, consistencyScore)); // Clamp to 0-100
  }
}
