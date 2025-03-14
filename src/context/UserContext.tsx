
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string[];
  experience: string[];
}

type ScoreEntry = {
  topic: string;
  difficulty: string;
  score: number;
  total: number;
  date: Date;
}

type UserContextType = {
  isAuthenticated: boolean;
  profile: UserProfile;
  scores: ScoreEntry[];
  login: (email: string, name: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addScore: (score: Omit<ScoreEntry, 'date'>) => void;
  getTopicScore: (topic: string) => number;
  getTotalScore: () => number;
  getAverageScore: () => number;
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  education: '',
  skills: [],
  experience: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('greenlink_user');
    const storedScores = localStorage.getItem('greenlink_scores');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setProfile(userData);
      setIsAuthenticated(true);
    }
    
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  // Save to localStorage whenever user data changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('greenlink_user', JSON.stringify(profile));
      localStorage.setItem('greenlink_scores', JSON.stringify(scores));
    }
  }, [isAuthenticated, profile, scores]);

  const login = (email: string, name: string) => {
    setProfile(prev => ({ ...prev, email, name }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(defaultProfile);
    localStorage.removeItem('greenlink_user');
  };

  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  const addScore = (score: Omit<ScoreEntry, 'date'>) => {
    const newScore = { ...score, date: new Date() };
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

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        profile,
        scores,
        login,
        logout,
        updateProfile,
        addScore,
        getTopicScore,
        getTotalScore,
        getAverageScore
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
