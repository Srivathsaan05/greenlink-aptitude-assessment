
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Topic } from '../data/topicsData';
import { useUser } from '../context/UserContext';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const { getTopicScore } = useUser();
  const score = getTopicScore(topic.id);
  
  return (
    <div 
      className="relative group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="p-6">
        <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center mb-4`}>
          <topic.icon className="h-6 w-6" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {topic.questionsCount} questions
            </span>
            
            {score > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {score.toFixed(0)}% score
              </span>
            )}
          </div>
          
          <Link
            to={`/topics/${topic.id}`}
            className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-800 transition-colors duration-300"
          >
            Start
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Subtle decoration */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-transparent to-gray-100 rounded-full opacity-50 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
    </div>
  );
};

export default TopicCard;
