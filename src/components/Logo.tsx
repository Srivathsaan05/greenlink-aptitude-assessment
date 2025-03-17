
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16',
    xl: 'h-24',
    '2xl': 'h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl'
  };

  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 transition-all duration-300 hover:opacity-90"
    >
      <div className={`flex items-center transition-all duration-300 ${sizeClasses[size]}`}>
        <svg 
          viewBox="0 0 100 100" 
          className={`${sizeClasses[size]} aspect-square`}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="45" fill="#15803d" />
          <path 
            d="M30,35 L70,35 L70,65 L30,65 Z" 
            fill="#ffffff" 
            fillOpacity="0.2"
          />
          <path 
            d="M30,50 L70,50" 
            stroke="#ffffff" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          <path 
            d="M40,35 L40,65" 
            stroke="#ffffff" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          <path 
            d="M50,35 L50,65" 
            stroke="#ffffff" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          <path 
            d="M60,35 L60,65" 
            stroke="#ffffff" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <h1 className={`font-bold ${textSizeClasses[size]} tracking-tight leading-none text-green-700`}>
            GREEN<span className="text-black font-light">LINK</span>
          </h1>
          {size === 'lg' || size === 'xl' || size === '2xl' ? (
            <p className="text-xs tracking-widest text-slate-500 uppercase mt-1">
              Aptitude Assessment
            </p>
          ) : null}
        </div>
      )}
    </Link>
  );
};

export default Logo;
