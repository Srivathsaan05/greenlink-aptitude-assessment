
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
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
  );
};

export default CallToAction;
