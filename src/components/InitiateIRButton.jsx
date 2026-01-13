import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * InitiateIRButton
 * 
 * High-stakes emergency button with:
 * - Pulsing glow effect in idle state
 * - Confirmation modal before activation
 * - Countdown-to-callback timer once clicked
 * - Visual escalation through stages
 */
const InitiateIRButton = ({ className = '' }) => {
  const { theme } = useTheme();
  const [stage, setStage] = useState('idle'); // idle, confirming, countdown, connected
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
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
  
  const handleClick = () => {
    if (stage === 'idle') {
      setStage('confirming');
    }
  };
  
  const handleConfirm = () => {
    setStage('countdown');
    setCountdown(900); // Reset to 15 minutes
  };
  
  const handleCancel = () => {
    setStage('idle');
  };
  
  const handleReset = () => {
    setStage('idle');
    setCountdown(900);
  };
  
  const pulseGlow = Math.sin(pulseIntensity) * 0.5 + 0.5;
  
  // Idle state - Pulsing button
  if (stage === 'idle') {
    return (
      <div className={`relative ${className}`}>
        {/* Outer pulsing glow rings */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: `
              0 0 ${20 + pulseGlow * 30}px rgba(255, 51, 102, ${0.3 + pulseGlow * 0.3}),
              0 0 ${40 + pulseGlow * 40}px rgba(255, 51, 102, ${0.2 + pulseGlow * 0.2}),
              0 0 ${60 + pulseGlow * 60}px rgba(255, 51, 102, ${0.1 + pulseGlow * 0.1})
            `,
            transform: `scale(${1 + pulseGlow * 0.02})`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Main button */}
        <button
          onClick={handleClick}
          className={`
            relative w-full py-5 px-8 overflow-hidden
            rounded-lg
            transition-all duration-300
            border-2
            group
            ${theme === 'dark'
              ? 'bg-gradient-to-b from-red-950 to-red-900 border-red-500/50 hover:border-red-400'
              : 'bg-gradient-to-b from-red-700 to-red-800 border-red-600 hover:border-red-500'
            }
          `}
        >
          {/* Animated background sweep */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
            style={{
              transform: `translateX(${-100 + pulseGlow * 200}%)`,
            }}
          />
          
          {/* Content */}
          <div className="relative flex items-center justify-center gap-4">
            {/* Pulsing indicator */}
            <div className="relative">
              <div 
                className="w-4 h-4 rounded-full bg-red-500"
                style={{
                  boxShadow: `0 0 ${10 + pulseGlow * 10}px rgba(255, 51, 102, 0.8)`
                }}
              />
              <div 
                className="absolute inset-0 w-4 h-4 rounded-full bg-red-500 animate-ping"
                style={{ opacity: 0.5 + pulseGlow * 0.3 }}
              />
            </div>
            
            <div className="text-left">
              <div className={`
                font-mono text-xs tracking-[0.3em] uppercase
                ${theme === 'dark' ? 'text-red-400' : 'text-red-200'}
              `}>
                Emergency Protocol
              </div>
              <div className={`
                font-mono text-xl tracking-wider font-semibold
                ${theme === 'dark' ? 'text-white' : 'text-white'}
              `}>
                INITIATE IR
              </div>
            </div>
            
            {/* Arrow indicator */}
            <svg 
              className={`
                w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1
                ${theme === 'dark' ? 'text-red-400' : 'text-red-200'}
              `}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          
          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        </button>
        
        {/* Status text */}
        <div className={`
          mt-3 text-center font-mono text-xs
          ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}
        `}>
          15-Minute Response Guarantee • 24/7/365
        </div>
      </div>
    );
  }
  
  // Confirming state - Modal overlay
  if (stage === 'confirming') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-lg border-2
          ${theme === 'dark'
            ? 'bg-slate-900/95 border-red-500/50 shadow-2xl shadow-red-500/20'
            : 'bg-white border-red-400 shadow-2xl shadow-red-500/10'
          }
        `}>
          {/* Warning header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-full bg-red-500/20 animate-ping" />
            </div>
            <div>
              <div className={`font-mono text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                CONFIRM ACTIVATION
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                This will initiate emergency response protocol
              </div>
            </div>
          </div>
          
          {/* Warning message */}
          <div className={`
            p-4 rounded border mb-4
            ${theme === 'dark' ? 'bg-red-950/30 border-red-500/20' : 'bg-red-50 border-red-200'}
          `}>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              A senior incident commander will contact you within <strong>15 minutes</strong>. 
              This line is reserved for confirmed security incidents.
            </p>
          </div>
          
          {/* Confirmation checklist */}
          <div className={`space-y-2 mb-6 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Unauthorized access has been confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Internal escalation has been initiated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Decision-maker is available for callback</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className={`
                flex-1 py-3 px-4 rounded font-mono text-sm
                transition-all duration-200
                ${theme === 'dark'
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }
              `}
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              className={`
                flex-1 py-3 px-4 rounded font-mono text-sm font-semibold
                transition-all duration-200
                bg-red-600 hover:bg-red-500 text-white
                shadow-lg shadow-red-500/30
              `}
            >
              CONFIRM ACTIVATION
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Countdown state - Timer display
  if (stage === 'countdown') {
    const progress = (900 - countdown) / 900;
    const urgency = countdown < 300 ? 'high' : countdown < 600 ? 'medium' : 'low';
    
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-lg border-2
          ${theme === 'dark'
            ? 'bg-slate-900/95 border-emerald-500/50 shadow-2xl shadow-emerald-500/20'
            : 'bg-white border-emerald-400 shadow-2xl shadow-emerald-500/10'
          }
        `}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className={`font-mono text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                RESPONSE INITIATED
              </span>
            </div>
            <div className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Protocol Active
            </div>
          </div>
          
          {/* Countdown display */}
          <div className="text-center mb-6">
            <div className={`
              font-mono text-5xl font-bold tracking-wider
              ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
            `}>
              {formatTime(countdown)}
            </div>
            <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Estimated time to callback
            </div>
          </div>
          
          {/* Progress bar */}
          <div className={`
            h-2 rounded-full overflow-hidden mb-4
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}
          `}>
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          
          {/* Status steps */}
          <div className="space-y-3 mb-6">
            <StatusStep 
              complete={true} 
              active={false}
              label="Request received"
              time="Just now"
              theme={theme}
            />
            <StatusStep 
              complete={progress > 0.1} 
              active={progress <= 0.1}
              label="Commander assigned"
              time={progress > 0.1 ? "Complete" : "In progress..."}
              theme={theme}
            />
            <StatusStep 
              complete={progress > 0.3} 
              active={progress > 0.1 && progress <= 0.3}
              label="Secure channel established"
              time={progress > 0.3 ? "Complete" : progress > 0.1 ? "In progress..." : "Pending"}
              theme={theme}
            />
            <StatusStep 
              complete={false} 
              active={progress > 0.3}
              label="Callback initiated"
              time="Pending"
              theme={theme}
            />
          </div>
          
          {/* Info box */}
          <div className={`
            p-3 rounded border text-xs
            ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}
          `}>
            <strong>Keep this line open.</strong> A senior incident commander will contact you via your registered callback number.
          </div>
          
          {/* Cancel option */}
          <button
            onClick={handleReset}
            className={`
              mt-4 w-full py-2 text-center text-xs font-mono
              ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}
              transition-colors
            `}
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }
  
  // Connected state
  return (
    <div className={`relative ${className}`}>
      <div className={`
        p-6 rounded-lg border-2 text-center
        ${theme === 'dark'
          ? 'bg-emerald-950/50 border-emerald-500/50 shadow-2xl shadow-emerald-500/20'
          : 'bg-emerald-50 border-emerald-400 shadow-2xl shadow-emerald-500/10'
        }
      `}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div className={`font-mono text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
          COMMANDER CONNECTED
        </div>
        
        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Your incident response team is now active.
        </p>
        
        <button
          onClick={handleReset}
          className={`
            py-2 px-6 rounded font-mono text-sm
            ${theme === 'dark'
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }
            transition-colors
          `}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Status step component
const StatusStep = ({ complete, active, label, time, theme }) => (
  <div className="flex items-center gap-3">
    <div className={`
      w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
      ${complete 
        ? 'bg-emerald-500' 
        : active 
          ? (theme === 'dark' ? 'bg-slate-700 border-2 border-emerald-500' : 'bg-slate-200 border-2 border-emerald-500')
          : (theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200')
      }
    `}>
      {complete && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {active && !complete && (
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      )}
    </div>
    <div className="flex-1 flex items-center justify-between">
      <span className={`text-sm ${complete || active ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-slate-500' : 'text-slate-500')}`}>
        {label}
      </span>
      <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
        {time}
      </span>
    </div>
  </div>
);

export default InitiateIRButton;
