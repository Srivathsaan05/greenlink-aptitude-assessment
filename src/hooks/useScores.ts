
import { useState, useEffect } from 'react';
import { ScoreEntry } from '@/types/user';
import { supabase } from "@/integrations/supabase/client";

export const useScores = (isAuthenticated: boolean) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    const saveScores = async () => {
      if (isAuthenticated && scores.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          localStorage.setItem(`greenlink_scores_${user.id}`, JSON.stringify(scores));
        }
      }
    };
    
    saveScores();
  }, [isAuthenticated, scores]);

  const addScore = (score: Omit<ScoreEntry, 'date'>) => {
    // Add performance rating based on score percentage
    const percentage = Math.round((score.score / score.total) * 100);
    let performanceRating: 'excellent' | 'good' | 'average' | 'poor' = 'average';
    
    if (percentage >= 90) performanceRating = 'excellent';
    else if (percentage >= 70) performanceRating = 'good';
    else if (percentage >= 50) performanceRating = 'average';
    else performanceRating = 'poor';
    
    const newScore = { 
      ...score, 
      date: new Date(),
      performanceRating 
    };
    
    setScores(prev => [...prev, newScore]);
  };

  const getTopicScore = (topic: string): number => {
    const topicScores = scores.filter(score => score.topic === topic);
    if (topicScores.length === 0) return 0;
    
    const totalScore = topicScores.reduce((acc, curr) => acc + curr.score, 0);
    const totalQuestions = topicScores.reduce((acc, curr) => acc + curr.total, 0);
    
    return totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
  };

  const getTotalScore = (): number => {
    if (scores.length === 0) return 0;
    return scores.reduce((acc, curr) => acc + curr.score, 0);
  };

  const getAverageScore = (): number => {
    if (scores.length === 0) return 0;
    
    const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
    const totalQuestions = scores.reduce((acc, curr) => acc + curr.total, 0);
    
    return totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
  };

  return {
    scores,
    setScores,
    addScore,
    getTopicScore,
    getTotalScore,
    getAverageScore
  };
};
