import React, { useEffect, useRef, useState } from 'react';

// Animated grid background component
const GridBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let pulses = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Grid configuration
    const gridSize = 40;
    const primaryColor = 'rgba(0, 102, 255, 0.15)';
    const pulseColor = 'rgba(0, 212, 255, 0.6)';
    
    // Create random pulse points
    const createPulse = () => {
      if (pulses.length < 5 && Math.random() < 0.02) {
        pulses.push({
          x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
          y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
          radius: 0,
          maxRadius: 200,
          opacity: 1
        });
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base grid
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw intersection points
      ctx.fillStyle = 'rgba(0, 102, 255, 0.3)';
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw and update pulses
      createPulse();
      
      pulses = pulses.filter(pulse => {
        pulse.radius += 2;
        pulse.opacity = 1 - (pulse.radius / pulse.maxRadius);
        
        if (pulse.opacity <= 0) return false;
        
        // Draw pulse ring
        ctx.strokeStyle = `rgba(0, 212, 255, ${pulse.opacity * 0.6})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw pulse center
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse.opacity})`;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D14 100%)' }}
    />
  );
};

// Scanning line effect
const ScanLine = () => {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan"
      />
    </div>
  );
};

// Status indicator component
const StatusIndicator = ({ status = 'ready' }) => {
  const statusConfig = {
    ready: { color: 'bg-emerald-400', text: 'READY', pulse: true },
    active: { color: 'bg-amber-400', text: 'ENGAGED', pulse: true },
    critical: { color: 'bg-red-500', text: 'CRITICAL', pulse: true }
  };
  
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.pulse && (
          <div className={`absolute inset-0 w-2 h-2 rounded-full ${config.color} animate-ping`} />
        )}
      </div>
      <span className="text-slate-400">STATUS:</span>
      <span className="text-slate-200">{config.text}</span>
    </div>
  );
};

// Trust badges component
const TrustBadges = () => {
  const institutions = [
    'Federal Reserve System',
    'NYSE Infrastructure', 
    'Cisco Security Operations'
  ];
  
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
        Trusted By
      </span>
      <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 font-light">
        {institutions.map((name, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-cobalt-500 rounded-full" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Emergency dial component
const EmergencyDial = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        absolute inset-0 bg-red-500/20 blur-xl transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
      
      <div className="relative border border-red-500/30 bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </div>
          <span className="font-mono text-sm text-red-400 tracking-wider">
            ACTIVE INCIDENT?
          </span>
        </div>
        
        <h3 className="text-2xl font-light text-white mb-2">
          15-Minute Response
        </h3>
        
        <p className="text-sm text-slate-400 mb-6 max-w-xs">
          Direct line to senior incident commanders. No tier-one triage.
        </p>
        
        <button className="
          w-full py-3 px-6 
          bg-gradient-to-r from-red-600 to-red-500 
          hover:from-red-500 hover:to-red-400
          text-white font-mono text-sm tracking-wider
          rounded transition-all duration-300
          border border-red-400/20
          shadow-lg shadow-red-500/20
        ">
          INITIATE SECURE LINE
        </button>
        
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500">Avg Response:</span>
            <span className="text-emerald-400">11 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Hero Section
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-obsidian">
      {/* Animated background */}
      <GridBackground />
      <ScanLine />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50 z-10" />
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12">
        {/* Top bar */}
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-cobalt-500/50 flex items-center justify-center">
              <div className="w-4 h-4 bg-cobalt-500" />
            </div>
            <span className="font-mono text-lg tracking-widest text-white">
              LYDELL<span className="text-cobalt-400">SECURITY</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <StatusIndicator status="ready" />
            <div className="h-4 w-px bg-slate-700" />
            <nav className="flex gap-6 text-sm text-slate-400">
              <a href="#response" className="hover:text-white transition-colors">Response</a>
              <a href="#pedigree" className="hover:text-white transition-colors">Pedigree</a>
              <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
            </nav>
          </div>
        </nav>
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-16 items-start">
          {/* Left column - Main messaging */}
          <div className={`
            transition-all duration-1000 delay-300
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-cobalt-500" />
              <span className="font-mono text-xs text-cobalt-400 tracking-widest uppercase">
                Incident Response Specialists
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              When the Network
              <br />
              <span className="text-slate-400">Falls Silent,</span>
              <br />
              We Restore
              <br />
              <span className="relative">
                the Signal
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-cobalt-500 to-transparent" />
              </span>
            </h1>
            
            {/* Subhead */}
            <p className="text-lg text-slate-400 max-w-xl mb-12 leading-relaxed">
              Twenty years defending the institutions that move markets.
              Now available to organizations that refuse to be the next headline.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <button className="
                px-8 py-4 
                bg-cobalt-500 hover:bg-cobalt-400
                text-white font-mono text-sm tracking-wider
                transition-all duration-300
                border border-cobalt-400/30
              ">
                ESTABLISH CONTACT
              </button>
              <button className="
                px-8 py-4
                bg-transparent hover:bg-slate-800/50
                text-slate-300 font-mono text-sm tracking-wider
                transition-all duration-300
                border border-slate-600 hover:border-slate-500
              ">
                VIEW RESPONSE PROTOCOL
              </button>
            </div>
            
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-8 py-8 border-t border-slate-800">
              <div>
                <div className="font-mono text-3xl text-white mb-1">47<span className="text-cobalt-400">min</span></div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Avg Containment</div>
              </div>
              <div>
                <div className="font-mono text-3xl text-white mb-1">20<span className="text-cobalt-400">+</span></div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="font-mono text-3xl text-white mb-1">0</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Breaches Missed</div>
              </div>
            </div>
          </div>
          
          {/* Right column - Emergency dial */}
          <div className={`
            transition-all duration-1000 delay-500
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <EmergencyDial />
            
            {/* Additional info card */}
            <div className="mt-6 p-4 border border-slate-800 bg-slate-900/50 rounded-lg">
              <div className="font-mono text-xs text-slate-500 mb-2">
                CURRENT THREAT LEVEL
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                </div>
                <span className="font-mono text-sm text-amber-400">ELEVATED</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Active campaigns targeting identity infrastructure. SSO/MFA compromises trending.
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust badges */}
        <div className={`
          mt-24 pt-12 border-t border-slate-800/50
          transition-all duration-1000 delay-700
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}>
          <TrustBadges />
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
