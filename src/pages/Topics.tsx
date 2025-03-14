
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard';
import { topics } from '../data/topicsData';
import { BookOpen } from 'lucide-react';

const Topics: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Topics</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a topic to start practicing. Each topic has multiple difficulty levels and 25 questions per level.
            </p>
          </div>
          
          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Topics;
