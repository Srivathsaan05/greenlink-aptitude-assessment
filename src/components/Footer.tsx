
import React from 'react';
import Logo from './Logo';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const developers = [
    {
      name: 'Srivathsaan K',
      email: 'srivathsaank@gmail.com',
      phone: '+918072640538',
    },
    {
      name: 'KrishnaRaj A',
      email: 'krishna00042004@gmail.com',
      phone: '+919940058987',
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-gray-600 text-sm max-w-xs">
              GreenLink is a comprehensive aptitude assessment platform designed to help you test and improve your skills.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Developers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developers.map((dev, index) => (
                <div key={index} className="glassmorphism p-4 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 mb-2">{dev.name}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                      <a 
                        href={`mailto:${dev.email}`} 
                        className="hover:text-green-600 transition-colors duration-300"
                      >
                        {dev.email}
                      </a>
                    </li>
                    <li className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      <a 
                        href={`tel:${dev.phone}`} 
                        className="hover:text-green-600 transition-colors duration-300"
                      >
                        {dev.phone}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GreenLink Aptitude Assessment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
