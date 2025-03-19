
import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { UserContextType, UserProfile, ScoreEntry, PhoneSignInOptions } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { useScores } from '@/hooks/useScores';

// Re-export the ScoreEntry type so existing imports don't break
export type { ScoreEntry } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    isAuthenticated, 
    setIsAuthenticated, 
    profile, 
    setProfile, 
    loading, 
    setLoading,
    login, 
    signup, 
    logout, 
    updateProfile,
    defaultProfile
  } = useAuth();
  
  const { 
    scores, 
    setScores, 
    addScore, 
    getTopicScore, 
    getTotalScore, 
    getAverageScore 
  } = useScores(isAuthenticated);

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
          console.log('Profile data loaded:', profileData);
          setProfile({
            name: profileData.name || '',
            email: profileData.email || session.user.email || '',
            phone: profileData.phone || '',
            education: profileData.education || '',
            skills: profileData.skills || [],
            experience: profileData.experience || [],
            photoUrl: profileData.photoUrl || ''
          });
        }
        
        // Load scores from localStorage
        const storedScores = localStorage.getItem(`greenlink_scores_${session.user.id}`);
        if (storedScores) {
          try {
            const parsedScores = JSON.parse(storedScores);
            // Convert date strings back to Date objects
            const scoresWithDates = parsedScores.map((score: any) => ({
              ...score,
              date: new Date(score.date)
            }));
            setScores(scoresWithDates);
          } catch (e) {
            console.error('Error parsing stored scores:', e);
          }
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile after sign in:', profileError);
          
          // If profile doesn't exist, create one
          if (profileError.code === 'PGRST116') {
            const { data: userData } = await supabase.auth.getUser();
            if (userData?.user) {
              const newProfile = {
                id: userData.user.id,
                email: userData.user.email || '',
                name: userData.user.user_metadata?.name || '',
                phone: userData.user.phone || userData.user.user_metadata?.phone || '',
                skills: [],
                experience: [],
                education: '',
                photoUrl: ''
              };
              
              console.log('Creating new profile:', newProfile);
              const { error: insertError } = await supabase
                .from('profiles')
                .insert(newProfile);
                
              if (insertError) {
                console.error('Error creating profile:', insertError);
              } else {
                setProfile({
                  name: newProfile.name,
                  email: newProfile.email,
                  phone: newProfile.phone,
                  education: '',
                  skills: [],
                  experience: [],
                  photoUrl: ''
                });
              }
            }
          }
        } else if (profileData) {
          console.log('Profile data loaded after sign in:', profileData);
          setProfile({
            name: profileData.name || '',
            email: profileData.email || session.user.email || '',
            phone: profileData.phone || '',
            education: profileData.education || '',
            skills: profileData.skills || [],
            experience: profileData.experience || [],
            photoUrl: profileData.photoUrl || ''
          });
        }
        
        // Load scores from localStorage
        const storedScores = localStorage.getItem(`greenlink_scores_${session.user.id}`);
        if (storedScores) {
          try {
            const parsedScores = JSON.parse(storedScores);
            // Convert date strings back to Date objects
            const scoresWithDates = parsedScores.map((score: any) => ({
              ...score,
              date: new Date(score.date)
            }));
            setScores(scoresWithDates);
          } catch (e) {
            console.error('Error parsing stored scores:', e);
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
  }, [setIsAuthenticated, setProfile, setScores, setLoading, defaultProfile]);

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
