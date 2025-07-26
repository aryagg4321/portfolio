import React, { useState, useEffect } from 'react';

const DefenseSlideshow = () => {
  const [currentScene, setCurrentScene] = useState(0);
  
  const scenes = [
    { 
      name: 'army_base', 
      duration: 6000,
      image: 'https://customer-assets.emergentagent.com/job_quantum-ai-dev/artifacts/7p9evjjc_Screenshot%202025-07-27%20at%2012.18.32%20AM.png',
      title: 'Future Army Base',
      description: 'Advanced military infrastructure'
    },
    { 
      name: 'tactical_soldier', 
      duration: 5000,
      image: 'https://customer-assets.emergentagent.com/job_quantum-ai-dev/artifacts/qb8wssne_Screenshot%202025-07-27%20at%2012.20.02%20AM.png',
      title: 'Tactical Soldier',
      description: 'Next-gen combat systems'
    },
    { 
      name: 'intelligence_hq', 
      duration: 7000,
      image: 'https://customer-assets.emergentagent.com/job_quantum-ai-dev/artifacts/gxre13bh_Screenshot%202025-07-27%20at%2012.23.10%20AM.png',
      title: 'Intelligence Command',
      description: 'Strategic operations center'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, scenes[currentScene].duration);

    return () => clearInterval(interval);
  }, [currentScene, scenes]);

  return (
    <div className="w-full h-[600px] relative overflow-hidden bg-black/50 rounded-lg border border-red-500/30">
      {/* Scene Indicators */}
      <div className="absolute top-4 left-4 z-20 flex space-x-2">
        {scenes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentScene ? 'bg-red-500 shadow-red-500/50 shadow-lg' : 'bg-red-500/30'
            }`}
          />
        ))}
      </div>

      {/* Scene Title */}
      <div className="absolute top-4 right-4 z-20 text-right">
        <div className="text-red-500 font-mono text-sm font-bold animate-pulse">
          {scenes[currentScene].title}
        </div>
        <div className="text-red-400/80 font-mono text-xs">
          {scenes[currentScene].description}
        </div>
      </div>

      {/* Images with transitions */}
      {scenes.map((scene, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentScene ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          
          {/* Futuristic Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10"></div>
          
          {/* Scanning Line Effect */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="scanning-line absolute w-full h-px bg-red-500/60 animate-scan-slow"></div>
          </div>
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-500/60"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-red-500/60"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-red-500/60"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-500/60"></div>
        </div>
      ))}

      {/* HUD-style overlay */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="bg-black/70 border border-red-500/30 p-2 rounded font-mono text-xs">
          <div className="text-red-500 mb-1">DEFENSE SYSTEMS</div>
          <div className="text-red-400/80">STATUS: OPERATIONAL</div>
          <div className="text-red-400/80">CLEARANCE: AUTHORIZED</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/20 z-20">
        <div 
          className="h-full bg-red-500 transition-all duration-100 animate-pulse"
          style={{ 
            width: `${((Date.now() % scenes[currentScene].duration) / scenes[currentScene].duration) * 100}%`,
            animation: `progress-fill ${scenes[currentScene].duration}ms linear infinite`
          }}
        ></div>
      </div>

      {/* Glitch effect overlay (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-black animate-glitch-1"></div>
        <div className="absolute inset-0 w-full h-full bg-red-500/10 animate-glitch-2"></div>
      </div>
    </div>
  );
};

export default DefenseSlideshow;