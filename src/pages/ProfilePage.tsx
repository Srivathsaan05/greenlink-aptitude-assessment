
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { User, Briefcase, GraduationCap, Edit, Check, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { profile, scores, updateProfile, isAuthenticated, getTopicScore, getAverageScore } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Group scores by topic for charts
  const topicData = React.useMemo(() => {
    const topics = new Map();
    scores.forEach(score => {
      if (!topics.has(score.topic)) {
        topics.set(score.topic, {
          name: score.topic,
          score: 0,
          total: 0,
          attempts: 0
        });
      }
      const topicStats = topics.get(score.topic);
      topicStats.score += score.score;
      topicStats.total += score.total;
      topicStats.attempts += 1;
    });
    return Array.from(topics.values()).map(topic => ({
      ...topic,
      percentage: (topic.score / topic.total) * 100
    }));
  }, [scores]);

  // Performance by difficulty
  const difficultyData = React.useMemo(() => {
    const difficulties = new Map();
    scores.forEach(score => {
      if (!difficulties.has(score.difficulty)) {
        difficulties.set(score.difficulty, {
          name: score.difficulty,
          score: 0,
          total: 0
        });
      }
      const diffStats = difficulties.get(score.difficulty);
      diffStats.score += score.score;
      diffStats.total += score.total;
    });
    return Array.from(difficulties.values()).map(diff => ({
      ...diff,
      percentage: (diff.score / diff.total) * 100
    }));
  }, [scores]);

  const pieColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditedProfile(prev => ({ ...prev, skills }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const experience = e.target.value.split('\n').filter(exp => exp.trim() !== '');
    setEditedProfile(prev => ({ ...prev, experience }));
  };

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditing(false);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Profile</CardTitle>
                  {isEditing ? (
                    <Button size="sm" variant="ghost" onClick={handleSaveProfile}>
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
                <div className="flex flex-col items-center mt-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile.photoUrl} alt={profile.name} />
                    <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="text-center font-semibold text-lg mb-1"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="text-sm"
                      disabled
                    />
                  ) : (
                    <p className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="text-sm"
                    />
                  ) : (
                    <p className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.phone || 'Not provided'}
                    </p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Education</p>
                  {isEditing ? (
                    <Textarea
                      name="education"
                      value={editedProfile.education}
                      onChange={handleInputChange}
                      className="text-sm"
                      rows={3}
                    />
                  ) : (
                    <p className="flex items-start text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      {profile.education || 'Not provided'}
                    </p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Skills</p>
                  {isEditing ? (
                    <Input
                      value={editedProfile.skills.join(', ')}
                      onChange={handleSkillChange}
                      className="text-sm"
                      placeholder="Separate skills with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No skills added</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Experience</p>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.experience.join('\n')}
                      onChange={handleExperienceChange}
                      className="text-sm"
                      rows={4}
                      placeholder="Enter each experience on a new line"
                    />
                  ) : (
                    <div className="text-sm">
                      {profile.experience.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {profile.experience.map((exp, index) => (
                            <li key={index} className="text-sm">
                              {exp}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No experience added</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats and Data */}
            <div className="md:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment Overview</CardTitle>
                      <CardDescription>
                        Your overall performance across all assessments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <p className="text-sm font-medium text-green-600 mb-1">Overall Score</p>
                          <p className="text-3xl font-bold text-green-700">{Math.round(getAverageScore())}%</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-sm font-medium text-blue-600 mb-1">Assessments Taken</p>
                          <p className="text-3xl font-bold text-blue-700">{scores.length}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4 text-center">
                          <p className="text-sm font-medium text-amber-600 mb-1">Topics Covered</p>
                          <p className="text-3xl font-bold text-amber-700">{new Set(scores.map(s => s.topic)).size}</p>
                        </div>
                      </div>
                      
                      {topicData.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-base font-medium mb-4">Topic Performance</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={topicData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  innerRadius={40}
                                  dataKey="percentage"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {topicData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${Math.round(value as number)}%`, 'Score']} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button onClick={() => navigate('/topics')} className="h-auto py-4 flex flex-col items-center justify-center">
                          <BookOpen className="h-5 w-5 mb-2" />
                          <span>Continue Learning</span>
                        </Button>
                        <Button onClick={() => setActiveTab('resume')} variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                          <Briefcase className="h-5 w-5 mb-2" />
                          <span>Update Resume</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>
                        Detailed performance breakdown by difficulty and topic
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {difficultyData.length > 0 ? (
                        <>
                          <h3 className="text-base font-medium mb-4">Performance by Difficulty</h3>
                          <div className="h-64 mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={difficultyData}>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value) => [`${Math.round(value as number)}%`, 'Score']} />
                                <Legend />
                                <Bar dataKey="percentage" name="Score %" fill="#3B82F6" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <h3 className="text-base font-medium mb-4">Topics Proficiency</h3>
                          <div className="space-y-4">
                            {topicData.map((topic, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <p className="text-sm font-medium">{topic.name}</p>
                                  <p className="text-sm text-gray-500">{Math.round(topic.percentage)}%</p>
                                </div>
                                <Progress value={topic.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500">Complete assessments to see performance analytics</p>
                          <Button onClick={() => navigate('/topics')} className="mt-4">
                            Take an Assessment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* History Tab */}
                <TabsContent value="history" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment History</CardTitle>
                      <CardDescription>
                        Records of your past assessments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {scores.length > 0 ? (
                        <div className="space-y-4">
                          {scores.slice().reverse().map((score, index) => {
                            const percentage = Math.round((score.score / score.total) * 100);
                            return (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{score.topic}</h3>
                                    <div className="flex items-center mt-1">
                                      <Badge variant="outline" className="mr-2">
                                        {score.difficulty}
                                      </Badge>
                                      <p className="text-xs text-gray-500">{formatDate(score.date)}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className={`font-bold ${
                                      percentage >= 80 ? 'text-green-600' :
                                      percentage >= 60 ? 'text-blue-600' :
                                      percentage >= 40 ? 'text-amber-600' : 'text-red-600'
                                    }`}>
                                      {percentage}%
                                    </p>
                                    <p className="text-xs text-gray-500">{score.score}/{score.total}</p>
                                  </div>
                                </div>
                                {score.timeTaken && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Time taken: {Math.floor(score.timeTaken / 60)}m {score.timeTaken % 60}s
                                  </p>
                                )}
                                {score.performanceRating && (
                                  <Badge 
                                    className={`mt-2 ${
                                      score.performanceRating === 'excellent' ? 'bg-green-100 text-green-800' :
                                      score.performanceRating === 'good' ? 'bg-blue-100 text-blue-800' :
                                      score.performanceRating === 'average' ? 'bg-amber-100 text-amber-800' :
                                      'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {score.performanceRating.charAt(0).toUpperCase() + score.performanceRating.slice(1)}
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500">You haven't taken any assessments yet</p>
                          <Button onClick={() => navigate('/topics')} className="mt-4">
                            Take an Assessment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Resume Tab */}
                <TabsContent value="resume" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Builder</CardTitle>
                      <CardDescription>
                        Create and manage your professional resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-medium mb-3">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                              <Input value={profile.name} className="text-sm" readOnly />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                              <Input value={profile.email} className="text-sm" readOnly />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                              <Input value={profile.phone} className="text-sm" readOnly />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-medium mb-3">Education</h3>
                          <Textarea 
                            value={profile.education} 
                            className="text-sm" 
                            rows={3} 
                            placeholder="Enter your educational background"
                            readOnly
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Update this information in your profile to reflect it here
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-medium mb-3">Skills</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {profile.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Update skills in your profile to reflect them here
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-medium mb-3">Experience</h3>
                          <div className="space-y-3">
                            {profile.experience.length > 0 ? (
                              profile.experience.map((exp, index) => (
                                <div key={index} className="border rounded-lg p-3">
                                  <p>{exp}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No experience added</p>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Update experience in your profile to reflect it here
                          </p>
                        </div>
                        
                        <Button className="w-full">
                          Generate Resume PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
