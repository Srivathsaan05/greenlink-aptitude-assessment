
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string[];
  experience: string[];
  photoUrl?: string;
}

// Export the ScoreEntry type so it can be imported by other components
export type ScoreEntry = {
  topic: string;
  difficulty: string;
  score: number;
  total: number;
  date: Date;
  timeTaken?: number; // Time taken in seconds
  performanceRating?: 'excellent' | 'good' | 'average' | 'poor';
}

type PhoneSignInOptions = {
  signUp?: boolean;
  name?: string;
}

type UserContextType = {
  isAuthenticated: boolean;
  profile: UserProfile;
  scores: ScoreEntry[];
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  addScore: (score: Omit<ScoreEntry, 'date'>) => void;
  getTopicScore: (topic: string) => number;
  getTotalScore: () => number;
  getAverageScore: () => number;
  loginWithPhone: (phone: string, options?: PhoneSignInOptions) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  loading: boolean;
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  education: '',
  skills: [],
  experience: [],
  photoUrl: ''
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [phoneLoginData, setPhoneLoginData] = useState<{ phone: string, options?: PhoneSignInOptions }>({ phone: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize user session and profile
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check active session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setLoading(false);
        return;
      }
      
      if (session) {
        setIsAuthenticated(true);
        
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profileData) {
          setProfile({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            education: profileData.education || '',
            skills: profileData.skills || [],
            experience: profileData.experience || []
          });
        }
        
        // Load scores from localStorage
        const storedScores = localStorage.getItem('greenlink_scores');
        if (storedScores) {
          setScores(JSON.parse(storedScores));
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        
        // Get user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          setProfile({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            education: profileData.education || '',
            skills: profileData.skills || [],
            experience: profileData.experience || []
          });
          
          // Load scores from localStorage
          const storedScores = localStorage.getItem('greenlink_scores');
          if (storedScores) {
            setScores(JSON.parse(storedScores));
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setProfile(defaultProfile);
        setScores([]);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && scores.length > 0) {
      localStorage.setItem('greenlink_scores', JSON.stringify(scores));
    }
  }, [isAuthenticated, scores]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      navigate('/');
      toast({
        title: "Login successful",
        description: "You've been logged in successfully.",
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const loginWithPhone = async (phone: string, options?: PhoneSignInOptions) => {
    try {
      setLoading(true);
      setPhoneLoginData({ phone, options });
      
      const { error } = await supabase.auth.signInWithOtp({ 
        phone,
        options: {
          shouldCreateUser: options?.signUp || false
        }
      });
      
      if (error) {
        toast({
          title: "Phone verification failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error) {
      console.error('Phone login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const verifyOTP = async (phone: string, otp: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });
      
      if (error) {
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // If signing up, update the profile with the provided name
      if (phoneLoginData.options?.signUp && phoneLoginData.options?.name) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          await supabase
            .from('profiles')
            .update({
              name: phoneLoginData.options.name,
              phone: phone,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
        }
      }
      
      navigate('/');
      toast({
        title: "Verification successful",
        description: "You've been logged in successfully.",
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string, phone: string = '') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            phone
          }
        }
      });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      navigate('/');
      toast({
        title: "Signup successful",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setProfile(defaultProfile);
      setScores([]);
      localStorage.removeItem('greenlink_scores');
      navigate('/');
      toast({
        title: "Logged out",
        description: "You've been logged out successfully.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not found');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedProfile.name,
          phone: updatedProfile.phone,
          education: updatedProfile.education,
          skills: updatedProfile.skills,
          experience: updatedProfile.experience,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Update profile error:', error);
      toast({
        title: "Update failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        profile,
        scores,
        login,
        signup,
        logout,
        updateProfile,
        addScore,
        getTopicScore,
        getTotalScore,
        getAverageScore,
        loginWithPhone,
        verifyOTP,
        loading
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
