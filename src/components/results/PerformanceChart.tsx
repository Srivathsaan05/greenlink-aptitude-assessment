
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScoreEntry } from '@/context/UserContext';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

type PerformanceChartProps = {
  scores: ScoreEntry[];
  selectedTab?: string;
};

const getMetricValue = (
  metric: 'average' | 'correct' | 'time' | 'rating',
  allScores?: ScoreEntry[] | ScoreEntry
): number => {
  if (!allScores) return 0;
  
  // If it's an array, calculate based on all scores
  if (Array.isArray(allScores)) {
    if (allScores.length === 0) return 0;
    
    switch (metric) {
      case 'average':
        const totalScore = allScores.reduce((sum, entry) => sum + entry.score, 0);
        const totalPossible = allScores.reduce((sum, entry) => sum + entry.total, 0);
        return totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
      
      case 'correct':
        return allScores.reduce((sum, entry) => sum + entry.score, 0);
      
      case 'time':
        const scoresWithTime = allScores.filter(entry => entry.timeTaken);
        if (scoresWithTime.length === 0) return 0;
        const totalTime = scoresWithTime.reduce((sum, entry) => sum + (entry.timeTaken || 0), 0);
        return Math.round(totalTime / scoresWithTime.length);
      
      case 'rating':
        const ratings = {
          excellent: allScores.filter(entry => entry.performanceRating === 'excellent').length,
          good: allScores.filter(entry => entry.performanceRating === 'good').length,
          average: allScores.filter(entry => entry.performanceRating === 'average').length,
          poor: allScores.filter(entry => entry.performanceRating === 'poor').length,
        };
        const bestRating = Object.entries(ratings).sort((a, b) => b[1] - a[1])[0];
        return bestRating[1];
    }
  }
  
  // If it's a single score entry, return the appropriate value
  return 0;
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  scores,
  selectedTab = 'overview',
}) => {
  // Group by topic
  const topicData = React.useMemo(() => {
    const topicsMap = new Map();
    scores.forEach((score) => {
      if (!topicsMap.has(score.topic)) {
        topicsMap.set(score.topic, {
          name: score.topic,
          score: 0,
          total: 0,
          count: 0,
        });
      }
      const topic = topicsMap.get(score.topic);
      topic.score += score.score;
      topic.total += score.total;
      topic.count += 1;
    });

    return Array.from(topicsMap.values()).map((topic) => ({
      ...topic,
      percentage: Math.round((topic.score / topic.total) * 100),
    }));
  }, [scores]);

  // Group by difficulty
  const difficultyData = React.useMemo(() => {
    const difficultiesMap = new Map();
    scores.forEach((score) => {
      if (!difficultiesMap.has(score.difficulty)) {
        difficultiesMap.set(score.difficulty, {
          name: score.difficulty,
          score: 0,
          total: 0,
        });
      }
      const difficulty = difficultiesMap.get(score.difficulty);
      difficulty.score += score.score;
      difficulty.total += score.total;
    });

    return Array.from(difficultiesMap.values()).map((difficulty) => ({
      ...difficulty,
      percentage: Math.round((difficulty.score / difficulty.total) * 100),
    }));
  }, [scores]);

  if (scores.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Data</CardTitle>
          <CardDescription>
            Complete assessments to see your performance
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-center text-gray-500">No data available yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Data</CardTitle>
        <CardDescription>
          Visual representation of your assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicData}
                  nameKey="name"
                  dataKey="percentage"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {topicData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${Math.round(value as number)}%`,
                    'Score',
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="topics" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value) => [
                    `${Math.round(value as number)}%`,
                    'Score',
                  ]}
                />
                <Legend />
                <Bar dataKey="percentage" name="Score %" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="difficulty" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value) => [
                    `${Math.round(value as number)}%`,
                    'Score',
                  ]}
                />
                <Legend />
                <Bar dataKey="percentage" name="Score %" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
