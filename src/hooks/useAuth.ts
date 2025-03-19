
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from '@/types/user';

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  education: '',
  skills: [],
  experience: [],
  photoUrl: ''
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Ensure user profile exists
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const newProfile = {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || '',
            phone: data.user.phone || data.user.user_metadata?.phone || '',
            photoUrl: ''
          };
          
          await supabase.from('profiles').insert(newProfile);
        }
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
  
  const signup = async (email: string, password: string, name: string, phone: string = '') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ 
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
      
      // Create user profile
      if (data.user) {
        const newProfile = {
          id: data.user.id,
          email: email,
          name: name,
          phone: phone,
          skills: [],
          experience: [],
          education: '',
          photoUrl: ''
        };
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(newProfile);
          
        if (profileError) {
          console.error('Error creating profile during signup:', profileError);
        }
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
          photoUrl: updatedProfile.photoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
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

  return {
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
  };
};
