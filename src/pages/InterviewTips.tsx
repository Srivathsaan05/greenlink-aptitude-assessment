
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourceTabs from '@/components/interview-tips/ResourceTabs';
import CallToAction from '@/components/interview-tips/CallToAction';

const InterviewTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('videos');

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
          
          <ResourceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <CallToAction />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewTips;
