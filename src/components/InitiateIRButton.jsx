import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * InitiateIRButton - High-Stakes Emergency Response Button
 * 
 * Dark Mode: Crimson glow with pulsing effect
 * Light Mode: Deep gradient with intense glow that doesn't wash out
 */
const InitiateIRButton = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stage, setStage] = useState('idle');
  const [countdown, setCountdown] = useState(900);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  
  // Pulse animation
  useEffect(() => {
    if (stage !== 'idle') return;
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 0.05) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, [stage]);
  
  // Countdown timer
  useEffect(() => {
    if (stage !== 'countdown') return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setStage('connected');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);
  
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  const handleClick = () => setStage('confirming');
  const handleConfirm = () => { setStage('countdown'); setCountdown(900); };
  const handleCancel = () => setStage('idle');
  const handleReset = () => { setStage('idle'); setCountdown(900); };
  
  const pulseGlow = Math.sin(pulseIntensity) * 0.5 + 0.5;

  // IDLE STATE
  if (stage === 'idle') {
    return (
      <div className={`relative ${className}`}>
        {/* Outer pulsing glow */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: isDark
              ? `0 0 ${20 + pulseGlow * 30}px rgba(255, 51, 102, ${0.3 + pulseGlow * 0.3}),
                 0 0 ${40 + pulseGlow * 40}px rgba(255, 51, 102, ${0.2 + pulseGlow * 0.2})`
              : `0 0 ${15 + pulseGlow * 25}px rgba(185, 28, 28, ${0.4 + pulseGlow * 0.3}),
                 0 0 ${30 + pulseGlow * 35}px rgba(185, 28, 28, ${0.25 + pulseGlow * 0.2}),
                 0 0 ${50 + pulseGlow * 40}px rgba(185, 28, 28, ${0.1 + pulseGlow * 0.1})`,
            transform: `scale(${1 + pulseGlow * 0.015})`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <button
          onClick={handleClick}
          className={`
            relative w-full py-5 px-8 overflow-hidden rounded-xl
            transition-all duration-300 border-2 group
            ${isDark
              ? 'bg-gradient-to-b from-red-950 to-red-900 border-red-500/50 hover:border-red-400'
              : 'bg-gradient-to-b from-emergency-vivid to-emergency-deep border-emergency-vivid hover:border-red-500'
            }
          `}
          style={!isDark ? {
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2),
              0 4px 15px rgba(185, 28, 28, 0.4)
            `
          } : {}}
        >
          {/* Animated sweep */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ transform: `translateX(${-100 + pulseGlow * 200}%)` }}
          />
          
          <div className="relative flex items-center justify-center gap-4">
            {/* Pulsing indicator */}
            <div className="relative">
              <div 
                className="w-4 h-4 rounded-full bg-white"
                style={{ boxShadow: `0 0 ${10 + pulseGlow * 10}px rgba(255, 255, 255, 0.8)` }}
              />
              <div 
                className="absolute inset-0 w-4 h-4 rounded-full bg-white animate-ping"
                style={{ opacity: 0.5 + pulseGlow * 0.3 }}
              />
            </div>
            
            <div className="text-left">
              <div className="font-mono text-xs tracking-[0.3em] uppercase text-red-200">
                Emergency Protocol
              </div>
              <div className="font-mono text-xl tracking-wider font-semibold text-white">
                INITIATE IR
              </div>
            </div>
            
            <svg className="w-6 h-6 text-red-200 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </button>
        
        <div className={`mt-3 text-center font-mono text-xs ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
          15-Minute Response Guarantee • 24/7/365
        </div>
      </div>
    );
  }

  // CONFIRMING STATE
  if (stage === 'confirming') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-xl border-2
          ${isDark 
            ? 'bg-slate-900 border-red-500/50' 
            : 'bg-white border-emergency-vivid shadow-emergency-glow'
          }
        `}>
          <div className={`flex items-center gap-3 mb-4 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-stroke'}`}>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-red-950' : 'bg-emergency-light'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className={`font-mono text-xs ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
                CONFIRMATION REQUIRED
              </div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-ink'}`}>
                Activate Emergency Response?
              </div>
            </div>
          </div>
          
          <div className={`mb-6 text-sm ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
            This will immediately alert our Incident Response team. A senior commander will contact you within <strong className={isDark ? 'text-white' : 'text-ink'}>15 minutes</strong>.
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              className={`
                w-full py-4 px-6 rounded-lg font-mono text-sm tracking-wider font-semibold
                transition-all duration-300 border-2
                ${isDark
                  ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-500 text-white hover:from-red-500 hover:to-red-600'
                  : 'bg-gradient-to-r from-emergency-vivid to-emergency-deep border-emergency-deep text-white hover:shadow-emergency-glow-intense'
                }
              `}
              style={!isDark ? {
                boxShadow: '0 4px 20px rgba(185, 28, 28, 0.4)'
              } : {}}
            >
              CONFIRM ACTIVATION
            </button>
            
            <button
              onClick={handleCancel}
              className={`
                w-full py-3 px-6 rounded-lg font-mono text-sm tracking-wider
                transition-all duration-300 border
                ${isDark
                  ? 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  : 'bg-white border-stroke text-ink-muted hover:border-stroke-strong hover:text-ink'
                }
              `}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }

  // COUNTDOWN STATE
  if (stage === 'countdown') {
    const progress = ((900 - countdown) / 900) * 100;
    
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-xl border-2
          ${isDark 
            ? 'bg-slate-900 border-cobalt-500/50' 
            : 'bg-white border-cobalt-600 shadow-cobalt-glow'
          }
        `}>
          {/* Status header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-cobalt-400' : 'bg-cobalt-600'}`} />
                <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping ${isDark ? 'bg-cobalt-400' : 'bg-cobalt-600'}`} />
              </div>
              <span className={`font-mono text-sm font-semibold ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                RESPONSE ACTIVATED
              </span>
            </div>
            <span className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          
          {/* Countdown display */}
          <div className="text-center mb-6">
            <div className={`font-mono text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
              {formatTime(countdown)}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
              Until commander contact
            </div>
          </div>
          
          {/* Progress bar */}
          <div className={`h-2 rounded-full overflow-hidden mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div 
              className={`h-full transition-all duration-1000 rounded-full ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-600'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Status steps */}
          <div className="space-y-3">
            {[
              { label: 'Alert dispatched', done: countdown < 890 },
              { label: 'Team mobilizing', done: countdown < 840 },
              { label: 'Commander assigned', done: countdown < 780 },
              { label: 'Contact imminent', done: countdown < 300 },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-xs
                  ${step.done 
                    ? (isDark ? 'bg-emerald-500 text-white' : 'bg-tactical-vivid text-white')
                    : (isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-ink-muted')
                  }
                `}>
                  {step.done ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${
                  step.done 
                    ? (isDark ? 'text-white' : 'text-ink')
                    : (isDark ? 'text-slate-500' : 'text-ink-muted')
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleReset}
            className={`
              w-full mt-6 py-2 font-mono text-xs tracking-wider
              ${isDark ? 'text-slate-500 hover:text-slate-400' : 'text-ink-muted hover:text-ink'}
            `}
          >
            CANCEL REQUEST
          </button>
        </div>
      </div>
    );
  }

  // CONNECTED STATE
  if (stage === 'connected') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-xl border-2
          ${isDark 
            ? 'bg-slate-900 border-emerald-500/50' 
            : 'bg-white border-tactical-vivid shadow-lg'
          }
        `}>
          <div className="text-center">
            <div className={`
              w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
              ${isDark ? 'bg-emerald-500/20' : 'bg-tactical-light'}
            `}>
              <svg className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className={`font-mono text-sm mb-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`}>
              COMMANDER CONNECTED
            </div>
            <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-ink'}`}>
              Response Team Active
            </div>
            <div className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
              Your incident commander is now coordinating the response. Keep this line open.
            </div>
            
            <button
              onClick={handleReset}
              className={`
                px-6 py-2 rounded-lg font-mono text-sm
                ${isDark 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-slate-100 text-ink hover:bg-slate-200 border border-stroke'
                }
              `}
            >
              CLOSE STATUS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InitiateIRButton;
