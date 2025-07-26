import React from 'react';

const NeonGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-container">
          {/* Vertical Lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse"
              style={{
                left: `${(i + 1) * 8.33}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '4s'
              }}
            />
          ))}
          
          {/* Horizontal Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
              style={{
                top: `${(i + 1) * 12.5}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '5s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Light Orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-2 h-2 bg-red-500 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i}s`,
              boxShadow: '0 0 20px rgba(255, 7, 58, 0.8), 0 0 40px rgba(255, 7, 58, 0.4)'
            }}
          />
        ))}
      </div>

      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="scanning-line absolute w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-40 animate-scan" />
        <div className="scanning-line-2 absolute w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20 animate-scan-reverse" />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-red-500 opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-red-500 opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-red-500 opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-red-500 opacity-30" />
    </div>
  );
};

export default NeonGrid;