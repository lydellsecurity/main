import React, { useState, useEffect } from 'react';

/**
 * EmergencyDial Component
 * 
 * A specialized UI component for active breach situations
 * Promises 15-minute response time with visual urgency indicators
 */
const EmergencyDial = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [avgResponse, setAvgResponse] = useState(11);
  
  // Simulate live response time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation between 8-14 minutes
      setAvgResponse(Math.floor(Math.random() * 6) + 8);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Pulse animation intensity based on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered]);
  
  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow effect */}
      <div className={`
        absolute -inset-4 bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 
        blur-2xl transition-all duration-700 rounded-3xl
        ${isHovered ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}
      `} />
      
      {/* Main container */}
      <div className="
        relative overflow-hidden
        border border-red-500/40 
        bg-gradient-to-b from-slate-900/95 to-slate-950/95 
        backdrop-blur-md 
        rounded-lg
        shadow-2xl shadow-red-500/10
      ">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        
        {/* Scan line effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent
          transform transition-transform duration-1000
          ${isHovered ? 'translate-y-full' : '-translate-y-full'}
        `} />
        
        {/* Content */}
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Animated status indicator */}
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                <div className="absolute -inset-1 bg-red-500/30 rounded-full animate-pulse" />
              </div>
              <span className="font-mono text-xs md:text-sm text-red-400 tracking-[0.2em] uppercase">
                Active Incident?
              </span>
            </div>
            
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          
          {/* Main headline */}
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
              15-Minute
              <span className="block text-red-400">Response</span>
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-red-500 to-transparent" />
          </div>
          
          {/* Description */}
          <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-sm">
            Direct line to senior incident commanders. No call centers. No tier-one triage. 
            <span className="text-slate-300"> Practitioners who've contained nation-state actors.</span>
          </p>
          
          {/* CTA Button */}
          <button className={`
            group/btn relative w-full py-4 px-6 overflow-hidden
            bg-gradient-to-r from-red-600 via-red-500 to-red-600
            hover:from-red-500 hover:via-red-400 hover:to-red-500
            text-white font-mono text-sm tracking-[0.15em] uppercase
            rounded-md transition-all duration-300
            border border-red-400/30
            shadow-lg shadow-red-500/30
            ${isHovered ? 'shadow-xl shadow-red-500/40' : ''}
          `}>
            {/* Button shimmer effect */}
            <div className="
              absolute inset-0 w-1/2 h-full 
              bg-gradient-to-r from-transparent via-white/20 to-transparent
              -skew-x-12 -translate-x-full
              group-hover/btn:translate-x-[200%]
              transition-transform duration-700
            " />
            
            <span className="relative flex items-center justify-center gap-3">
              {/* Phone icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              Initiate Secure Line
            </span>
          </button>
          
          {/* Secure channels info */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span>Signal</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span>Wire</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span>Secure Voice</span>
          </div>
          
          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Average response */}
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
              <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">
                Avg Response
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl text-emerald-400">{avgResponse}</span>
                <span className="font-mono text-sm text-emerald-400/70">min</span>
              </div>
              <div className="text-[10px] text-slate-600 mt-1">Rolling 90-day</div>
            </div>
            
            {/* Response team status */}
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
              <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">
                Team Status
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-mono text-lg text-emerald-400">READY</span>
              </div>
              <div className="text-[10px] text-slate-600 mt-1">24/7/365</div>
            </div>
          </div>
          
          {/* Bottom note */}
          <div className="mt-6 p-3 bg-red-500/5 border border-red-500/20 rounded">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <div>
                <div className="text-xs text-red-400 font-medium mb-1">Breach Confirmation</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  If you've confirmed unauthorized access, don't wait. Every minute increases blast radius.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </div>
    </div>
  );
};

export default EmergencyDial;
