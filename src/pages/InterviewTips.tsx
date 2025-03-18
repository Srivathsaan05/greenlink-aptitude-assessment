import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Youtube, FileText, Presentation, BookOpen, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const InterviewTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('videos');

  const videoResources = [
    {
      id: 1,
      title: 'Mastering the Technical Interview',
      author: 'Tech Interview Pro',
      duration: '15:42',
      views: '1.2M',
      thumbnail: 'https://i.imgur.com/4NZ6uLY.jpg',
      category: 'technical',
      tags: ['algorithms', 'data structures', 'coding'],
      description: 'Learn essential strategies to tackle coding questions in technical interviews.'
    },
    {
      id: 2,
      title: 'How to Answer Behavioral Questions',
      author: 'Career Guide',
      duration: '12:18',
      views: '956K',
      thumbnail: 'https://i.imgur.com/3fB3MFc.jpg',
      category: 'behavioral',
      tags: ['soft skills', 'communication', 'STAR method'],
      description: 'Master the STAR method to effectively answer behavioral interview questions.'
    },
    {
      id: 3,
      title: 'Resume Writing Tips for Tech Jobs',
      author: 'Resume Expert',
      duration: '18:05',
      views: '789K',
      thumbnail: 'https://i.imgur.com/2GJLuK4.jpg',
      category: 'resume',
      tags: ['resume', 'job application', 'ATS'],
      description: 'Optimize your resume to pass ATS systems and impress recruiters.'
    },
    {
      id: 4,
      title: 'System Design Interview: Step by Step',
      author: 'System Design Pro',
      duration: '24:30',
      views: '1.5M',
      thumbnail: 'https://i.imgur.com/5tJ3QXs.jpg',
      category: 'technical',
      tags: ['system design', 'architecture', 'scalability'],
      description: 'A comprehensive guide to answering system design questions in tech interviews.'
    },
    {
      id: 5,
      title: 'Negotiating Your Job Offer',
      author: 'Salary Negotiator',
      duration: '16:24',
      views: '675K',
      thumbnail: 'https://i.imgur.com/8RCgzL2.jpg',
      category: 'career',
      tags: ['negotiation', 'salary', 'benefits'],
      description: 'Expert tips on how to negotiate the best compensation package.'
    },
    {
      id: 6,
      title: 'Common Interview Mistakes to Avoid',
      author: 'Interview Coach',
      duration: '14:16',
      views: '890K',
      thumbnail: 'https://i.imgur.com/DZw9f9Y.jpg',
      category: 'general',
      tags: ['mistakes', 'preparation', 'etiquette'],
      description: 'Learn what not to do during interviews to increase your chances of success.'
    }
  ];

  const pdfResources = [
    {
      id: 1,
      title: 'Comprehensive Interview Preparation Guide',
      author: 'Career Services',
      pages: 45,
      category: 'general',
      description: 'A complete guide covering all aspects of interview preparation.'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Cheat Sheet',
      author: 'Tech Interview Prep',
      pages: 20,
      category: 'technical',
      description: 'Quick reference for common algorithms and data structures.'
    },
    {
      id: 3,
      title: '101 Most Common Interview Questions',
      author: 'Interview Expert',
      pages: 35,
      category: 'behavioral',
      description: 'Compilation of frequently asked questions with sample answers.'
    },
    {
      id: 4,
      title: 'Resume Writing Best Practices',
      author: 'Resume Consultant',
      pages: 18,
      category: 'resume',
      description: 'Learn how to create an eye-catching and effective resume.'
    },
    {
      id: 5,
      title: 'Technical Interview Handbook',
      author: 'Senior Tech Recruiter',
      pages: 75,
      category: 'technical',
      description: 'Comprehensive guide to ace technical interviews at top tech companies.'
    }
  ];

  const pptResources = [
    {
      id: 1,
      title: 'Interview Preparation Masterclass',
      author: 'Career Development',
      slides: 65,
      category: 'general',
      description: 'A visual presentation on mastering all types of interviews.'
    },
    {
      id: 2,
      title: 'Body Language and Communication Skills',
      author: 'Communication Expert',
      slides: 42,
      category: 'behavioral',
      description: 'How to effectively communicate and present yourself during interviews.'
    },
    {
      id: 3,
      title: 'Technical Problem Solving Strategies',
      author: 'Tech Interview Coach',
      slides: 58,
      category: 'technical',
      description: 'Illustrated approaches to common technical interview problems.'
    },
    {
      id: 4,
      title: 'Job Market Trends 2023',
      author: 'Industry Analyst',
      slides: 35,
      category: 'career',
      description: 'Current trends and opportunities in the tech job market.'
    }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Steps to Interview Success',
      author: 'Career Expert',
      readTime: '8 min',
      category: 'general',
      description: 'A step-by-step guide to preparing for and acing your interview.'
    },
    {
      id: 2,
      title: 'How to Solve Any Coding Problem',
      author: 'Senior Developer',
      readTime: '12 min',
      category: 'technical',
      description: 'A systematic approach to tackling coding problems in interviews.'
    },
    {
      id: 3,
      title: 'The Art of the Follow-up Email',
      author: 'Recruitment Specialist',
      readTime: '5 min',
      category: 'general',
      description: 'How to write effective follow-up emails that make a lasting impression.'
    },
    {
      id: 4,
      title: 'Crafting Your Personal Brand Story',
      author: 'Personal Branding Coach',
      readTime: '10 min',
      category: 'behavioral',
      description: 'Tell your career story in a compelling way that resonates with interviewers.'
    },
    {
      id: 5,
      title: 'Remote Interview Success Strategies',
      author: 'Virtual Workplace Expert',
      readTime: '7 min',
      category: 'general',
      description: 'Tips for performing your best in remote and virtual interviews.'
    },
    {
      id: 6,
      title: 'Psychological Tricks to Calm Interview Nerves',
      author: 'Workplace Psychologist',
      readTime: '9 min',
      category: 'behavioral',
      description: 'Practical techniques to manage anxiety and stress before and during interviews.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Preparation Resources</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive resources to help you prepare for interviews, build your resume, and land your dream job.
            </p>
          </div>
          
          <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  <span className="hidden sm:inline">Videos</span>
                </TabsTrigger>
                <TabsTrigger value="pdfs" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">PDFs</span>
                </TabsTrigger>
                <TabsTrigger value="presentations" className="flex items-center gap-2">
                  <Presentation className="h-4 w-4" />
                  <span className="hidden sm:inline">Presentations</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Articles</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoResources.map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Video+Thumbnail";
                        }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <p className="text-xs text-gray-500">{video.views} views</p>
                      <Button variant="ghost" size="sm" className="text-sm">
                        Watch
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* PDFs Tab */}
            <TabsContent value="pdfs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pdfResources.map(pdf => (
                  <Card key={pdf.id}>
                    <CardHeader className="flex flex-row items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <FileText className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{pdf.title}</CardTitle>
                        <CardDescription>By {pdf.author}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{pdf.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {pdf.category}
                        </Badge>
                        <p className="text-xs text-gray-500">{pdf.pages} pages</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Download PDF
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Presentations Tab */}
            <TabsContent value="presentations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pptResources.map(ppt => (
                  <Card key={ppt.id}>
                    <CardHeader className="flex flex-row items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Presentation className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{ppt.title}</CardTitle>
                        <CardDescription>By {ppt.author}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{ppt.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {ppt.category}
                        </Badge>
                        <p className="text-xs text-gray-500">{ppt.slides} slides</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Presentation
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {articles.map(article => (
                  <Card key={article.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{article.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {article.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs">
                            {article.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-gray-500">{article.author}</p>
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{article.readTime} read</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Read article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 bg-green-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready for your interview?</h2>
                <p className="text-gray-600 mb-6">
                  Put your knowledge to the test and see how well you're prepared by taking our assessments.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Practice real questions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Track your progress</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Identify strengths & weaknesses</span>
                  </div>
                </div>
                <Button className="mt-6" onClick={() => window.location.href = '/topics'}>
                  Take an Assessment
                </Button>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/3">
                <img 
                  src="https://i.imgur.com/9ZdKDT0.png" 
                  alt="Interview preparation" 
                  className="w-full max-w-xs mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Interview+Prep";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewTips;
