import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * InitiateIRButton - Functional Emergency Response System
 * 
 * Stages:
 * 1. IDLE - Pulsing emergency button
 * 2. FORM - Contact information collection
 * 3. SUBMITTING - API call in progress
 * 4. COUNTDOWN - Waiting for commander contact
 * 5. CONNECTED - Confirmation screen
 * 6. ERROR - Error state with retry
 */
const InitiateIRButton = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [stage, setStage] = useState('idle');
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [countdown, setCountdown] = useState(900);
  const [incidentId, setIncidentId] = useState(null);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    organization: '',
    incidentType: 'ransomware',
    severity: 'high',
    description: '',
    affectedSystems: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Pulse animation for idle state
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

  const pulseGlow = Math.sin(pulseIntensity) * 0.5 + 0.5;

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.contactName.trim()) {
      errors.contactName = 'Name is required';
    }
    
    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = 'Invalid email format';
    }
    
    if (!formData.contactPhone.trim()) {
      errors.contactPhone = 'Phone is required';
    } else if (formData.contactPhone.replace(/\D/g, '').length < 10) {
      errors.contactPhone = 'Invalid phone number';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Please describe the incident';
    } else if (formData.description.length < 20) {
      errors.description = 'Please provide more detail (min 20 characters)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Submit incident
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStage('submitting');
    setError(null);

    try {
      const response = await fetch('/api/initiate-ir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIncidentId(data.incidentId);
        setCountdown(900); // 15 minutes
        setStage('countdown');
      } else {
        throw new Error(data.error || 'Failed to submit incident');
      }
    } catch (err) {
      console.error('IR submission error:', err);
      setError(err.message);
      setStage('error');
    }
  };

  // Reset to initial state
  const handleReset = () => {
    setStage('idle');
    setFormData({
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      organization: '',
      incidentType: 'ransomware',
      severity: 'high',
      description: '',
      affectedSystems: '',
    });
    setFormErrors({});
    setIncidentId(null);
    setError(null);
    setCountdown(900);
  };

  // Common styling classes
  const inputClass = `
    w-full px-4 py-3 rounded-lg font-mono text-sm transition-all
    ${isDark 
      ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cobalt-500' 
      : 'bg-white border border-stroke text-ink placeholder-ink-muted focus:border-cobalt-600 shadow-sm'
    }
    focus:outline-none focus:ring-2 focus:ring-cobalt-500/20
  `;

  const labelClass = `block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`;
  
  const errorClass = 'text-xs text-red-500 mt-1';

  // ==========================================
  // IDLE STATE - Pulsing Emergency Button
  // ==========================================
  if (stage === 'idle') {
    return (
      <div className={`relative ${className}`}>
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: isDark
              ? `0 0 ${20 + pulseGlow * 30}px rgba(255, 51, 102, ${0.3 + pulseGlow * 0.3}),
                 0 0 ${40 + pulseGlow * 40}px rgba(255, 51, 102, ${0.2 + pulseGlow * 0.2})`
              : `0 0 ${15 + pulseGlow * 25}px rgba(185, 28, 28, ${0.4 + pulseGlow * 0.3}),
                 0 0 ${30 + pulseGlow * 35}px rgba(185, 28, 28, ${0.25 + pulseGlow * 0.2})`,
            transform: `scale(${1 + pulseGlow * 0.015})`,
          }}
        />
        
        <button
          onClick={() => setStage('form')}
          className={`
            relative w-full py-5 px-8 overflow-hidden rounded-xl
            transition-all duration-300 border-2 group
            ${isDark
              ? 'bg-gradient-to-b from-red-950 to-red-900 border-red-500/50 hover:border-red-400'
              : 'bg-gradient-to-b from-emergency-vivid to-emergency-deep border-emergency-vivid hover:border-red-500'
            }
          `}
          style={!isDark ? {
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 15px rgba(185,28,28,0.4)'
          } : {}}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ transform: `translateX(${-100 + pulseGlow * 200}%)` }}
          />
          
          <div className="relative flex items-center justify-center gap-4">
            <div className="relative">
              <div 
                className="w-4 h-4 rounded-full bg-white"
                style={{ boxShadow: `0 0 ${10 + pulseGlow * 10}px rgba(255,255,255,0.8)` }}
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
            
            <svg className="w-6 h-6 text-red-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </button>
        
        <div className={`mt-3 text-center font-mono text-xs ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
          15-Minute Response Guarantee • 24/7/365
        </div>
      </div>
    );
  }

  // ==========================================
  // FORM STATE - Contact Information
  // ==========================================
  if (stage === 'form') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          rounded-xl border-2 overflow-hidden
          ${isDark ? 'bg-slate-900 border-red-500/30' : 'bg-white border-emergency-vivid/50 shadow-lg'}
        `}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${isDark ? 'bg-red-950/30 border-slate-800' : 'bg-emergency-light border-stroke'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900' : 'bg-emergency-medium'}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className={`font-mono text-xs ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
                  EMERGENCY RESPONSE
                </div>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-ink'}`}>
                  Incident Details
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Contact Info Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Your Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className={inputClass}
                />
                {formErrors.contactName && <p className={errorClass}>{formErrors.contactName}</p>}
              </div>
              <div>
                <label className={labelClass}>Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
                {formErrors.contactPhone && <p className={errorClass}>{formErrors.contactPhone}</p>}
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className={inputClass}
                />
                {formErrors.contactEmail && <p className={errorClass}>{formErrors.contactEmail}</p>}
              </div>
            </div>

            {/* Incident Type & Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Incident Type</label>
                <select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="ransomware">Ransomware Attack</option>
                  <option value="data-breach">Data Breach</option>
                  <option value="apt">Advanced Persistent Threat</option>
                  <option value="phishing">Phishing / BEC</option>
                  <option value="malware">Malware Infection</option>
                  <option value="insider">Insider Threat</option>
                  <option value="ddos">DDoS Attack</option>
                  <option value="other">Other / Unknown</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Severity</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="critical">🔴 Critical - Business Down</option>
                  <option value="high">🟠 High - Major Impact</option>
                  <option value="medium">🟡 Medium - Contained</option>
                  <option value="low">🔵 Low - Investigating</option>
                </select>
              </div>
            </div>

            {/* Affected Systems */}
            <div>
              <label className={labelClass}>Affected Systems</label>
              <input
                type="text"
                name="affectedSystems"
                value={formData.affectedSystems}
                onChange={handleInputChange}
                placeholder="e.g., Domain controllers, file servers, email..."
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>What's Happening? *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the incident: what you've observed, when it started, what's been affected..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
              {formErrors.description && <p className={errorClass}>{formErrors.description}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className={`
                  flex-1 py-4 rounded-lg font-mono text-sm tracking-wider font-semibold
                  transition-all duration-300
                  ${isDark
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600'
                    : 'bg-gradient-to-r from-emergency-vivid to-emergency-deep text-white shadow-emergency-glow hover:shadow-emergency-glow-intense'
                  }
                `}
              >
                🚨 DISPATCH RESPONSE TEAM
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={`
                  px-6 py-4 rounded-lg font-mono text-sm
                  ${isDark ? 'text-slate-400 hover:text-white' : 'text-ink-muted hover:text-ink'}
                `}
              >
                Cancel
              </button>
            </div>

            <p className={`text-center text-xs ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
              By submitting, you agree to be contacted immediately by our response team.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // SUBMITTING STATE
  // ==========================================
  if (stage === 'submitting') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-8 rounded-xl border-2 text-center
          ${isDark ? 'bg-slate-900 border-cobalt-500/50' : 'bg-white border-cobalt-600 shadow-lg'}
        `}>
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className={`
              absolute inset-0 rounded-full border-4 border-t-transparent animate-spin
              ${isDark ? 'border-cobalt-500' : 'border-cobalt-600'}
            `} />
            <div className="absolute inset-2 rounded-full bg-cobalt-500/20 animate-pulse" />
          </div>
          <div className={`font-mono text-sm mb-2 ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
            DISPATCHING RESPONSE TEAM
          </div>
          <div className={isDark ? 'text-slate-400' : 'text-ink-muted'}>
            Alerting commanders and preparing response...
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // COUNTDOWN STATE
  // ==========================================
  if (stage === 'countdown') {
    const progress = ((900 - countdown) / 900) * 100;
    
    return (
      <div className={`relative ${className}`}>
        <div className={`
          rounded-xl border-2 overflow-hidden
          ${isDark ? 'bg-slate-900 border-cobalt-500/50' : 'bg-white border-cobalt-600 shadow-cobalt-glow'}
        `}>
          {/* Status header */}
          <div className={`px-6 py-4 border-b ${isDark ? 'bg-cobalt-950/50 border-slate-800' : 'bg-cobalt-50 border-stroke'}`}>
            <div className="flex items-center justify-between">
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
                {incidentId}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Countdown */}
            <div className="text-center mb-6">
              <div className={`font-mono text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                {formatTime(countdown)}
              </div>
              <div className={isDark ? 'text-slate-400' : 'text-ink-muted'}>
                Commander will contact you at <strong>{formData.contactPhone}</strong>
              </div>
            </div>

            {/* Progress bar */}
            <div className={`h-2 rounded-full overflow-hidden mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div 
                className={`h-full transition-all duration-1000 ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-600'}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status steps */}
            <div className="space-y-3">
              {[
                { label: 'Incident logged', done: true },
                { label: 'Team notified', done: countdown < 880 },
                { label: 'Commander assigned', done: countdown < 840 },
                { label: 'Preparing briefing', done: countdown < 600 },
                { label: 'Contact imminent', done: countdown < 300 },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                    ${step.done 
                      ? (isDark ? 'bg-emerald-500 text-white' : 'bg-tactical-vivid text-white')
                      : (isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-ink-muted')
                    }
                  `}>
                    {step.done ? '✓' : i + 1}
                  </div>
                  <span className={step.done ? (isDark ? 'text-white' : 'text-ink') : (isDark ? 'text-slate-500' : 'text-ink-muted')}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <div className={`text-xs font-mono mb-1 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                INCIDENT SUMMARY
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-ink'}`}>
                <strong>{formData.incidentType.replace('-', ' ').toUpperCase()}</strong> at {formData.organization || 'your organization'}
              </div>
            </div>

            <button
              onClick={handleReset}
              className={`w-full mt-4 py-2 font-mono text-xs ${isDark ? 'text-slate-500 hover:text-slate-400' : 'text-ink-muted hover:text-ink'}`}
            >
              CANCEL REQUEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CONNECTED STATE
  // ==========================================
  if (stage === 'connected') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-xl border-2
          ${isDark ? 'bg-slate-900 border-emerald-500/50' : 'bg-white border-tactical-vivid shadow-lg'}
        `}>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-emerald-500/20' : 'bg-tactical-light'}`}>
              <svg className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className={`font-mono text-sm mb-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`}>
              COMMANDER CONNECTED
            </div>
            <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
              Response Team Active
            </div>
            <div className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
              Incident <strong className="font-mono">{incidentId}</strong> is being handled.
            </div>
            <div className={`p-3 rounded-lg mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                If you haven't received a call, contact us directly:
              </div>
              <a href="tel:+18005551234" className={`font-mono text-lg font-bold ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                1-800-555-1234
              </a>
            </div>
            
            <button
              onClick={handleReset}
              className={`px-6 py-2 rounded-lg font-mono text-sm ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-ink border border-stroke'}`}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  if (stage === 'error') {
    return (
      <div className={`relative ${className}`}>
        <div className={`
          p-6 rounded-xl border-2
          ${isDark ? 'bg-slate-900 border-red-500/50' : 'bg-white border-emergency-vivid shadow-lg'}
        `}>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-red-500/20' : 'bg-emergency-light'}`}>
              <svg className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <div className={`font-mono text-sm mb-2 ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
              SUBMISSION FAILED
            </div>
            <div className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
              {error || 'Unable to submit incident request'}
            </div>
            
            <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-red-950/30' : 'bg-emergency-light'}`}>
              <div className={`text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-ink'}`}>
                <strong>Call our emergency line directly:</strong>
              </div>
              <a href="tel:+18005551234" className={`font-mono text-2xl font-bold ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
                1-800-555-1234
              </a>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setStage('form')}
                className={`flex-1 py-3 rounded-lg font-mono text-sm ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-ink'}`}
              >
                TRY AGAIN
              </button>
              <button
                onClick={handleReset}
                className={`px-6 py-3 rounded-lg font-mono text-sm ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InitiateIRButton;
