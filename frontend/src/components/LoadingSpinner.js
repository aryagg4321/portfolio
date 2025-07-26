import React from 'react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12', 
    large: 'w-20 h-20'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {/* Cyberpunk Loading Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} border-4 border-red-500/20 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" 
               style={{ animationDuration: '1s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Inner Ring */}
        <div className={`absolute inset-2 border-2 border-red-500/30 rounded-full animate-spin`}
             style={{ animationDuration: '1.5s' }}>
          <div className="absolute inset-0 border-2 border-transparent border-r-red-500 rounded-full animate-spin"
               style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center">
        <p className="text-red-500 font-mono text-sm animate-pulse">
          {message}
        </p>
        <div className="flex items-center justify-center mt-2 space-x-1">
          <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;