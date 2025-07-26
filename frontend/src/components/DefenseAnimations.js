import React, { useState, useEffect } from 'react';

const DefenseAnimations = () => {
  const [currentScene, setCurrentScene] = useState(0);
  
  const scenes = [
    { name: 'command_center', duration: 6000 },
    { name: 'tactical_soldier', duration: 5000 },
    { name: 'intelligence_hq', duration: 7000 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, scenes[currentScene].duration);

    return () => clearInterval(interval);
  }, [currentScene, scenes]);

  return (
    <div className="w-full h-[600px] relative overflow-hidden bg-black/50 rounded-lg border border-red-500/30">
      {/* Scene Indicator */}
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

      {/* Command Center Scene */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        currentScene === 0 ? 'opacity-100' : 'opacity-0'
      }`}>
        <CommandCenter />
      </div>

      {/* Tactical Soldier Scene */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        currentScene === 1 ? 'opacity-100' : 'opacity-0'
      }`}>
        <TacticalSoldier />
      </div>

      {/* Intelligence HQ Scene */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        currentScene === 2 ? 'opacity-100' : 'opacity-0'
      }`}>
        <IntelligenceHQ />
      </div>
    </div>
  );
};

// Command Center Animation Component
const CommandCenter = () => {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-red-900/20 to-black">
      {/* Main Screen */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 h-48 border-2 border-red-500/50 rounded-lg bg-black/70 overflow-hidden">
        <div className="w-full h-full relative">
          {/* Scanning Line */}
          <div className="absolute inset-0">
            <div className="scanning-radar absolute w-full h-px bg-red-500 opacity-80 animate-scan-vertical"></div>
          </div>
          
          {/* Radar Grid */}
          <div className="absolute inset-4">
            <div className="w-full h-full border border-red-500/30 rounded-full relative">
              <div className="absolute inset-4 border border-red-500/20 rounded-full">
                <div className="absolute inset-4 border border-red-500/20 rounded-full">
                  {/* Radar Sweep */}
                  <div className="radar-sweep absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute w-1/2 h-px bg-gradient-to-r from-red-500 to-transparent top-1/2 left-1/2 origin-left transform animate-radar-sweep"></div>
                  </div>
                  
                  {/* Target Blips */}
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{top: '30%', left: '60%'}}></div>
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{top: '70%', left: '40%', animationDelay: '0.5s'}}></div>
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{top: '45%', left: '80%', animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Text */}
          <div className="absolute bottom-2 left-2 text-red-500 text-xs font-mono">
            <div className="animate-pulse">SECTOR SCAN: ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Side Panels */}
      <div className="absolute top-12 left-8 w-24 h-32 border border-red-500/40 bg-black/60 rounded">
        <div className="p-2 space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-2 bg-red-500/30 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>

      <div className="absolute top-12 right-8 w-24 h-32 border border-red-500/40 bg-black/60 rounded">
        <div className="p-2 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-3 rounded animate-pulse ${i % 2 === 0 ? 'bg-red-500/40' : 'bg-red-500/20'}`} style={{ animationDelay: `${i * 0.3}s` }}></div>
          ))}
        </div>
      </div>

      {/* Bottom Console */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-16 border border-red-500/40 bg-black/70 rounded flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-red-500/20 p-1">
            <div className={`w-full h-full rounded animate-pulse ${i % 3 === 0 ? 'bg-red-500/40' : 'bg-red-500/20'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
          </div>
        ))}
      </div>

      {/* Floating Data */}
      <div className="absolute top-20 right-20 text-red-500 text-xs font-mono space-y-1 animate-pulse">
        <div>THREAT LEVEL: LOW</div>
        <div>UNITS DEPLOYED: 12</div>
        <div>COMM STATUS: ACTIVE</div>
      </div>
    </div>
  );
};

// Tactical Soldier Animation Component
const TacticalSoldier = () => {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-black via-red-900/10 to-black flex items-center justify-center">
      {/* Soldier Silhouette */}
      <div className="relative">
        {/* Main Soldier Shape */}
        <div className="relative w-32 h-80">
          {/* Body */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-red-500/40 to-red-500/20 rounded-lg border border-red-500/60">
            {/* Chest Armor Details */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 border border-red-500/80 rounded animate-pulse"></div>
            <div className="absolute top-8 left-2 w-3 h-3 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-8 right-2 w-3 h-3 bg-red-500 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Head/Helmet */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500/30 rounded-full border-2 border-red-500/60">
            {/* Visor */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-500/60 rounded animate-pulse"></div>
            {/* HUD Elements */}
            <div className="absolute -right-4 top-1 w-6 h-2 border border-red-500/80 rounded animate-pulse"></div>
          </div>
          
          {/* Arms */}
          <div className="absolute top-16 -left-4 w-8 h-24 bg-red-500/30 rounded-lg border border-red-500/50 transform rotate-12"></div>
          <div className="absolute top-16 -right-4 w-8 h-24 bg-red-500/30 rounded-lg border border-red-500/50 transform -rotate-12">
            {/* Weapon */}
            <div className="absolute -right-2 top-4 w-12 h-3 bg-red-500/60 rounded animate-pulse"></div>
          </div>
          
          {/* Legs */}
          <div className="absolute bottom-0 left-3 w-6 h-20 bg-red-500/30 rounded-lg border border-red-500/50"></div>
          <div className="absolute bottom-0 right-3 w-6 h-20 bg-red-500/30 rounded-lg border border-red-500/50"></div>
        </div>

        {/* Equipment Glow Effects */}
        <div className="absolute -inset-4 opacity-50">
          {/* Tactical Lights */}
          <div className="absolute top-8 -left-2 w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-12 -right-2 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-0 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0">
        {/* Targeting Reticle */}
        <div className="absolute top-24 right-32 w-16 h-16 border-2 border-red-500/60 rounded-full animate-pulse">
          <div className="absolute inset-2 border border-red-500/40 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/60"></div>
          <div className="absolute left-1/2 top-0 w-px h-full bg-red-500/60"></div>
        </div>

        {/* Status Indicators */}
        <div className="absolute top-16 left-16 text-red-500 text-xs font-mono space-y-1">
          <div className="animate-pulse">ARMOR: 100%</div>
          <div className="animate-pulse" style={{ animationDelay: '0.3s' }}>AMMO: 89%</div>
          <div className="animate-pulse" style={{ animationDelay: '0.6s' }}>HEALTH: 100%</div>
        </div>

        {/* Motion Lines */}
        <div className="absolute bottom-32 right-20 opacity-60">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="absolute h-px bg-red-500/40 animate-slide-right" 
                 style={{ 
                   width: `${(i + 1) * 8}px`, 
                   top: `${i * 4}px`, 
                   animationDelay: `${i * 0.1}s` 
                 }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Intelligence HQ Animation Component
const IntelligenceHQ = () => {
  return (
    <div className="w-full h-full relative bg-gradient-to-t from-red-900/10 to-black">
      {/* Holographic Displays */}
      <div className="absolute top-16 left-8 w-40 h-24 border border-red-500/50 bg-red-500/5 rounded perspective-1000 transform rotate-x-12">
        <div className="p-4 h-full">
          {/* World Map Hologram */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border border-red-500/30 rounded"></div>
            {/* Continents outline */}
            <div className="absolute top-2 left-4 w-8 h-4 border border-red-500/60 rounded-sm animate-pulse"></div>
            <div className="absolute top-1 right-6 w-6 h-3 border border-red-500/60 rounded-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-2 left-8 w-10 h-5 border border-red-500/60 rounded-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Active Points */}
            <div className="absolute top-3 left-6 w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-8 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
            <div className="absolute bottom-4 left-12 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Data Stream Display */}
      <div className="absolute top-12 right-8 w-32 h-40 border border-red-500/50 bg-black/60 rounded overflow-hidden">
        <div className="p-2 space-y-1">
          {/* Streaming Data Lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex space-x-1">
              <div className={`w-2 h-2 rounded-sm animate-pulse ${i % 3 === 0 ? 'bg-red-500/60' : 'bg-red-500/30'}`} 
                   style={{ animationDelay: `${i * 0.2}s` }}></div>
              <div className={`flex-1 h-2 rounded-sm animate-pulse ${i % 2 === 0 ? 'bg-red-500/40' : 'bg-red-500/20'}`}
                   style={{ animationDelay: `${i * 0.15}s` }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Holographic Table */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-32 perspective-1000">
        <div className="w-full h-full border-2 border-red-500/40 bg-red-500/5 rounded-lg transform rotate-x-12 overflow-hidden">
          {/* 3D Tactical Display */}
          <div className="p-4 h-full relative">
            {/* Grid Base */}
            <div className="absolute inset-0 opacity-40">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-px">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-red-500/20"></div>
                ))}
              </div>
            </div>
            
            {/* 3D Objects */}
            <div className="relative z-10">
              {/* Building/Structure Representations */}
              <div className="absolute top-4 left-8 w-4 h-6 bg-red-500/40 border border-red-500/60 animate-pulse transform rotate-y-12"></div>
              <div className="absolute top-2 right-6 w-6 h-4 bg-red-500/30 border border-red-500/50 animate-pulse transform rotate-y-45" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-4 left-12 w-5 h-5 bg-red-500/50 border border-red-500/70 animate-pulse transform rotate-y-90" style={{ animationDelay: '1s' }}></div>
              
              {/* Movement Paths */}
              <div className="absolute top-6 left-6 w-8 h-px bg-red-500/60 animate-pulse"></div>
              <div className="absolute top-8 left-14 w-6 h-px bg-red-500/60 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Data Panels */}
      <div className="absolute top-32 left-20 text-red-500 text-xs font-mono space-y-1">
        <div className="animate-pulse">INTEL SOURCES: 47</div>
        <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>ACTIVE OPERATIONS: 8</div>
        <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>THREAT ANALYSIS: UPDATING...</div>
      </div>

      <div className="absolute bottom-32 right-20 text-red-500 text-xs font-mono space-y-1">
        <div className="animate-pulse">SATELLITE UPLINK: ACTIVE</div>
        <div className="animate-pulse" style={{ animationDelay: '0.3s' }}>ENCRYPTION: AES-256</div>
        <div className="animate-pulse" style={{ animationDelay: '0.6s' }}>CLEARANCE: TOP SECRET</div>
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="scanning-line absolute w-full h-px bg-red-500/60 animate-scan-slow"></div>
        <div className="scanning-line-2 absolute w-full h-px bg-red-500/40 animate-scan-reverse-slow" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
};

export default DefenseAnimations;