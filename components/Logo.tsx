import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      xmlns="http://www.w3.org/2000/svg" 
      preserveAspectRatio="xMidYMid meet"
      className={`${className} fill-current text-white`}
    >
      <g fill="currentColor">
        <path d="M142.9,228.4c-0.2-2.1-0.3-4.2-0.3-6.4c0-54.8,55.8-100.8,126.9-106.8c66.3-5.6,131.2,16.2,185.3,47.2
            c-50.4-18.4-106.4-32.3-162.7-27.6c-67.6,5.7-118.6,48.2-118.6,98.6c0,2.1,0.1,4.2,0.3,6.3C161.4,235.8,150.2,232.5,142.9,228.4z"/>
        
        <path d="M285.4,181.8c-76.8,0-139,62.2-139,139s62.2,139,139,139c51.9,0,97.2-28.5,121.3-70.6l-58.4-30.8
            c-13.6,19.2-36.1,31.8-61.5,31.8c-41.9,0-76-34.1-76-76s34.1-76,76-76c22.1,0,41.9,9.5,55.7,24.6l64.2-34.8
            C375.4,204.8,333.3,181.8,285.4,181.8z"/>
      </g>
    </svg>
  );
};

export default Logo;