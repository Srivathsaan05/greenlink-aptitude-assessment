import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, BrainCircuit, CheckCircle, ListChecks } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { topics } from '../data/topicsData';
import { useUser } from '../context/UserContext';

const Index: React.FC = () => {
  const { isAuthenticated, getAverageScore, scores } = useUser();
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <ListChecks className="w-6 h-6 text-green-500" />,
      title: 'Comprehensive Topics',
      description: 'Practice with 7 essential aptitude topics covering various skill areas.'
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-green-500" />,
      title: 'Difficulty Levels',
      description: 'Challenge yourself with Easy, Medium, and Hard difficulty levels.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed statistics and insights.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      title: 'Interview Tips',
      description: 'Access comprehensive resources to prepare for your job interviews.',
      link: '/interview-tips'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white -z-10"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-green-100 rounded-bl-full opacity-30 -z-10 animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                Test Your Aptitude Skills
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Enhance Your <span className="text-green-600">Logical</span> and <span className="text-green-600">Quantitative</span> Skills
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                GreenLink provides a comprehensive platform to assess and improve your aptitude skills across various domains with adaptive difficulty levels.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/topics')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors duration-300"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                {!isAuthenticated && (
                  <button
                    onClick={() => navigate('/auth')}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors duration-300"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-green-50 rounded-full blur-2xl opacity-70"></div>
                <Logo size="2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How GreenLink Helps You Excel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers comprehensive tools to test, track, and improve your aptitude skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                onClick={() => feature.link && navigate(feature.link)}
                style={{ cursor: feature.link ? 'pointer' : 'default' }}
              >
                <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                {feature.link && (
                  <div className="mt-4">
                    <span className="text-green-600 font-medium flex items-center">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Topics Preview */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Assessment Topics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Challenge yourself with our diverse range of aptitude topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.slice(0, 3).map((topic) => (
              <div 
                key={topic.id}
                className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center mb-4`}>
                  <topic.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <button
                  onClick={() => navigate(`/topics/${topic.id}`)}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  Start Practice
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/topics')}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors duration-300"
            >
              View All Topics
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-blue-50 opacity-50 -z-10"></div>
        <div className="max-w-5xl mx-auto glassmorphism rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Test Your Skills?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your assessment journey today and track your progress across all aptitude domains.
          </p>
          <button
            onClick={() => navigate('/topics')}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors duration-300"
          >
            Begin Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          {isAuthenticated && scores.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-600">
                Your current average score: 
                <span className="font-semibold text-green-600 ml-2">
                  {getAverageScore().toFixed(1)}%
                </span>
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
