
export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string[];
  experience: string[];
  photoUrl?: string;
}

export type ScoreEntry = {
  topic: string;
  difficulty: string;
  score: number;
  total: number;
  date: Date;
  timeTaken?: number; // Time taken in seconds
  performanceRating?: 'excellent' | 'good' | 'average' | 'poor';
}

export type PhoneSignInOptions = {
  signUp?: boolean;
  name?: string;
}

export type UserContextType = {
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
